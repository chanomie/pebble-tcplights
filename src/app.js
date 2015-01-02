/**
 * TCP Lighting is a Pebble Watch App designed to control the Connected by TCP
 * WiFi home lighting system.
 *
 * The project is hosted on Github: 
 *   https://github.com/chanomie/pebble-tcplights
 *
 * Copyright 2014-2015 Jordan Reed
 */

/** Import the main Pebble UI Class. */
var UI = require('ui');

/** Import the Pebble Ajax library. */
var ajax = require('ajax');

/**
 * This is the location of the lighting service on the local network. The
 * fefault location of this is lighting.local.
 *
 * @type {string}
 */
var lightingService = 'http://lighting.local/gwr/gop.php';

/**
 * This is the session token for running commands.  Since the token code
 * is currently always 123467890 it is currently a constant and the login
 * call is skipped.
 * @const
 * @type {string}
 */
var sessionToken = "1234567890";

/**
 * The splash card that is shown as the application is loading.
 *
 * @type {UI.Card}
 */
var splashCard = new UI.Card({
  title: 'TCP Lighting',
  icon: 'images/menu_icon.png',
  body: 'Looking for hub, should take less than 5s...'
});

splashCard.show();
tcpGetScenes();

/**
 * Runs the scene menu.
 * 1. Makes the AJAX call to SceneGetList
 * 2. On Success passes the result in displaySceneMenu
 */
function tcpGetScenes() {
  var sceneGetListCommand =
      "<gip><version>1</version><token>" + sessionToken + "</token><islocal>1</islocal></gip>";

  ajax(
    {
      url: lightingService,
      method: 'post',
      data: {
        cmd: 'SceneGetList',
        fmt: 'xml',
        data: sceneGetListCommand
      }
    },
    displaySceneMenu,
    function(error) {
      displayError(2, "Failed to get scene list.  The most common problem "
                   + "is that http://lighting.local isn't available. "
                   + "Make sure your phone is on your home WiFi and check "
                   + "if it can load lighting.local in the browser.\n" + error);
    }
  );  
}

/**
 * Takes the list of scenes and displays a menu with all the scenes.  Each
 * menu item triggers a call to tcpChangeScene.
 *
 * @param {string} sceneGetListResult the xml string returned from the SceneGetList command
 */
function displaySceneMenu(sceneGetListResult) {
      var sceneXmlArray = sceneGetListResult.match(/<scene>.*?<\/scene>/g),
          sceneItemsArray =[];
    
      console.log("Response is: " + sceneGetListResult);
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
}

/**
 * Makes an AJAX call to SceneRun to run a new scene.
 *
 * @param {number} sceneId The scene id to run
 * @param {string} sceneName the name of the scene being run.
 */
function tcpChangeScene(sceneId, sceneName) {
  var sceneCommand =
      "<gip><version>1</version><token>" + sessionToken + "</token><sid>" + sceneId + "</sid></gip>";
  
  var sceneUpdateCard = new UI.Card({
    title: 'TCP Lighting',
    icon: 'images/menu_icon.png',
    body: 'Activating Scene: ' + sceneName
  });
  
  sceneUpdateCard.show();
  ajax(
    {
      url: lightingService,
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

/**
 * Display an error on the screen.
 * 
 * @param {number} errorCode a unique error code
 * @param {string} the string to display
 */
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
