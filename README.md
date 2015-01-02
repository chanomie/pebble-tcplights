# pebble-tcplights

Pebble App to control the TCP Connected lights.

Requires that your companion phone be on the same WiFi network as your TCP Hub.
Your phone should be able to load http://lighting.local in the web browser and see the
standard TCP Connected web interface.

## TCP Connected API

The TCP Connected API makes form encoded requests to 
`http://lighting.local/gwr/gop.php`
passing the main content as a block of XML in a field named "data".

The response is an XML block of content with Content-Type: text/xml.

### Login Call (GWRLogin)
The login call is currently skipped because it provides no use.  It sends a
username/password of 'admin/admin' and gets back a session token of '1234567890'. 

Because, SECURITY! For now, you can skip this call and just use the hard-coded
session token in all your other calls.

Request:
```
POST
cmd:GWRLogin
fmt:xml
data:
<gip>
  <version>1</version>
  <email>admin</email>
  <password>admin</password>
</gip>
```

Response:
```
<gip>
   <version>1</version>
   <rc>200</rc>
   <token>1234567890</token>
</gip>
```

### Get Scenes (SceneGetList)
Get a list of the configured scenes for you devices.

Request:
```
cmd:SceneGetList
fmt:xml
data:
<gip>
  <version>1</version>
  <token>1234567890</token>
  <islocal>1</islocal>
</gip>
```

Example Response:
```
<gip>
  <version>1</version>
  <rc>200</rc>
  <enable>1</enable>
  <scene>
    <sid>1</sid>
    <active>1</active>
    <name>Home</name>
    <desc></desc>
    <order>0</order>
    <type>manualcustom</type>
    <icon>img/scene/on/home.png</icon>
  </scene>
  <scene>
    <sid>2</sid>
    <active>1</active><name>Away</name>
    <desc></desc>
    <order>1</order>
    <type>manualcustom</type>
    <icon>img/scene/on/away.png</icon>
  </scene>
</gip>
```

### Batch Commands (GWRBatch)
Runs a batch of commands against the hub.

Request:
```
cmd:GWRBatch
fmt:xml
data:
<gwrcmds>
  <gwrcmd>
    <gcmd>SceneGetList</gcmd>
    <gdata>
      <gip>
        <version>1</version>
        <token>1234567890</token>
        <islocal>1</islocal>
      </gip>
    </gdata>
  </gwrcmd>
</gwrcmds>
```

Example Response:
```
<gwrcmds>
  <gwrcmd>
    <gcmd>SceneGetList</gcmd>
    <gdata>
      <gip>
        <version>1</version>
        <rc>200</rc>
        <enable>1</enable>
        <scene>
          <sid>1</sid>
          <active>1</active>
          <name>Home</name>
          <desc></desc>
          <order>0</order>
          <type>manualcustom</type>
          <icon>img/scene/on/home.png</icon>
        </scene>
        <scene>
          <sid>2</sid>
          <active>1</active>
          <name>Away</name>
          <desc></desc>
          <order>1</order>
          <type>manualcustom</type>
          <icon>img/scene/on/away.png</icon>
        </scene>
      </gip>
    </gdata>
  </gwrcmd>
</gwrcmds>
``` 


## Development
This is being developed in CloudPebble so I don't have build instructions here.