/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

var splashCard = new UI.Card({
  title: 'TCP Lighting',
  icon: 'images/menu_icon.png',
  body: 'Looking for hub, should take less than 5s...'
});

splashCard.show();
tcpSceneMenu();

function tcpSceneMenu() {
  ajax(
    {
      url: 'http://lighting.local/gwr/gop.php',
      method: 'post',
      data: {
        cmd: 'GWRBatch',
        fmt: 'xml',
        data: '<gwrcmds><gwrcmd><gcmd>SceneGetList</gcmd><gdata><gip><version>1</version><token>1234567890</token><islocal>1</islocal></gip></gdata></gwrcmd></gwrcmds>'
      }
    },
    function(data) {
      var sceneXmlArray = data.match(/<scene>.*?<\/scene>/g),
          sceneItemsArray =[];
    
      console.log("Response is: " + data);
      if(sceneXmlArray) {
        sceneXmlArray.forEach(function(sceneXml) {
          var sceneId = sceneXml.replace(/.*<sid>([0-9]*)<\/sid>.*/,"$1"),
              sceneName = sceneXml.replace(/.*<name>(.*)<\/name>.*/,"$1"),
              sceneItem = {
                subtitle: sceneId,
                title: sceneName
              };
        
          sceneItemsArray.push(sceneItem);
          console.log("1:" + sceneXml);
          console.log(sceneId + ":" + sceneName);
        });
      
        var sceneMenu = new UI.Menu({
          sections: [{
            title: 'Scenes',
            items: sceneItemsArray
          }]
        });
      
        sceneMenu.on('select', function(e) {
          console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
          console.log('The item is titled "' + e.item.title + '"');
          console.log('The item is subtitled "' + e.item.subtitle + '"');
          tcpChangeScene(e.item.subtitle, e.item.title);
        });
      
        sceneMenu.show();
        splashCard.hide();
      } else {
        displayError(1, "No available scenes.");
      }
    },
    function(error) {
      displayError(2, "Failed to get scene list: " + error);
    }
  );  
}

function tcpChangeScene(sceneId, sceneName) {
  var sceneCommand =
      "<gip><version>1</version><token>1234567890</token><sid>" + sceneId + "</sid></gip>";
  
  var sceneUpdateCard = new UI.Card({
    title: 'TCP Lighting',
    icon: 'images/menu_icon.png',
    body: 'Activating Scene: ' + sceneName
  });
  
  sceneUpdateCard.show();
  ajax(
    {
      url: 'http://lighting.local/gwr/gop.php',
      method: 'post',
      data: {
        cmd: 'SceneRun',
        fmt: 'xml',
        data: sceneCommand
      }
    },
    function(data) {
      sceneUpdateCard.hide();
    },
    function(error) {
      sceneUpdateCard.hide();
      displayError(3, "Failed to set scene: " + error);
    }
  );
}

function displayError(errorCode, error) {
  console.log("[" + errorCode + "] " + error);
  var errorCard = new UI.Card({
    title: 'Error',
    subtitle: errorCode,
    body: error,
    scrollable: true
  });  
  errorCard.show();
}

