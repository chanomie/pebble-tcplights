# pebble-tcplights

*Important* Sadly this project has been retired. In early 2015, TCP lights rolled out
a security update.  Part of these update was to require that the REST API calls to
the TCP Hub needed to go through https, but the certificate on the hub is self-signed.
iOS is unwilling to make the call to the service that has a certificate it cannot verify.
Additionally, TCP has announced that they are going to stop development of their hub
and software, and just make the bulbs while partnering with WeMo for the software.
There is already a fantastic Pebble App to control the WeMo system.  Go use it and enjoy.

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

### Get Gateway Info (GatewayGetInfo)

Request:
```
cmd:GatewayGetInfo
fmt:xml
data:
<gip>
  <version>1</version>
  <token>1234567890</token>
  <fwnew>1</fwnew>
</gip>
```

Example Response:
```
<gip>
  <version>1</version>
  <rc>200</rc>
  <gateway>
    <gid>138787592000000</gid>
    <online>1</online>
    <primary>1</primary>
    <fwversion>3.0.39</fwversion>
    <fwnew>3.0.39</fwnew>
    <mac>D4:A9:28:01:01:01</mac>
    <serial>16G1-1168-00000</serial>
    <lastreboot></lastreboot>
    <lastseen></lastseen>
    <lanip>172.16.1.40/24</lanip>
    <externalip></externalip>
    <gipserver>tcp.greenwavereality.com</gipserver>
  </gateway>
</gip>
```

### RoomGetCarousel

Request:
```
cmd:RoomGetCarousel
fmt:xml
data:
<gip>
  <version>1</version>
  <token>1234567890</token>
  <fields>name,image,imageurl,control,power,product,class,realtype,status</fields>
</gip>
```

Example Response:
```
<gip>
  <version>1</version>
  <rc>200</rc>
  <room>
    <rid>2</rid>
    <name>Bedroom</name>
    <desc></desc>
    <known>1</known>
    <type>0</type>
    <color>004fd9</color>
    <colorid>2</colorid>
    <img>img/room/blue.png</img>
    <power>0</power>
    <poweravg>0</poweravg>
    <energy>0</energy>
    <device>
      <did>359863807828863444</did>
      <known>1</known>
      <lock>0</lock>
      <state>1</state>
      <level>100</level>
      <node>0</node>
      <port>0</port>
      <nodetype>61440</nodetype>
      <name>Bedroom Bed</name>
      <desc></desc>
      <colorid>2</colorid>
      <imgs>products/device/GENERIC.png</imgs>
      <imgm>products/device/GENERIC.png</imgm>
      <imgb>products/device/GENERIC.png</imgb>
      <imgs_s>products/device/GENERIC.png</imgs_s>
      <imgm_s>products/device/GENERIC.png</imgm_s>
      <imgb_s>products/device/GENERIC.png</imgb_s>
      <image>1</image>
      <type>multilevel</type>
      <rangemin>0</rangemin>
      <rangemax>99</rangemax>
      <power>0.022</power>
      <poweravg>0</poweravg>
      <energy>0</energy>
      <score>0</score>
      <productid>1</productid>
      <prodbrand></prodbrand>
      <prodmodel></prodmodel>
      <prodtype>Light Fixture</prodtype>
      <prodtypeid>159</prodtypeid>
      <classid>2</classid>
      <class></class>
      <subclassid>1</subclassid>
      <subclass></subclass>
      <other>
        <rcgroup></rcgroup>
        <manufacturer></manufacturer>
        <capability>productinfo,identify,meter_power,switch_binary,switch_multilevel</capability>
        <bulbpower>11</bulbpower>
      </other>
    </device>
    <device>
      <did>360145282805574100</did>
      <known>1</known>
      <lock>0</lock>
      <state>1</state>
      <level>100</level>
      <node>0</node>
      <port>0</port>
      <nodetype>61440</nodetype>
      <name>Bedroom TV</name>
      <desc></desc>
      <colorid>2</colorid>
      <imgs>products/device/GENERIC.png</imgs>
      <imgm>products/device/GENERIC.png</imgm>
      <imgb>products/device/GENERIC.png</imgb>
      <imgs_s>products/device/GENERIC.png</imgs_s>
      <imgm_s>products/device/GENERIC.png</imgm_s>
      <imgb_s>products/device/GENERIC.png</imgb_s>
      <image>1</image>
      <type>multilevel</type>
      <rangemin>0</rangemin>
      <rangemax>99</rangemax>
      <power>0.022</power>
      <poweravg>0</poweravg>
      <energy>0</energy>
      <score>0</score>
      <productid>1</productid>
      <prodbrand></prodbrand>
      <prodmodel></prodmodel>
      <prodtype>Light Fixture</prodtype>
      <prodtypeid>159</prodtypeid>
      <classid>2</classid>
      <class></class>
      <subclassid>1</subclassid>
      <subclass></subclass>
      <other>
        <rcgroup></rcgroup>
        <manufacturer></manufacturer>
        <capability>productinfo,identify,meter_power,switch_binary,switch_multilevel</capability>
        <bulbpower>11</bulbpower>
      </other>
    </device>
  </room>
</gip>
```


## UserGetListDefaultRooms

Request:
```
cmd:UserGetListDefaultRooms
fmt:xml
data:
<gip>
  <version>1</version>
  <token>1234567890</token>
</gip>
```

Example Response:
```
<gip>
  <version>1</version>
  <rc>200</rc>
  <room>
    <id>1</id>
    <name>Other</name>
    <desc>Other</desc>
  </room>
  <room>
    <id>2</id>
    <name>Living Room</name>
    <desc>Living Room</desc>
  </room>
  <room>
    <id>3</id>
    <name>Bedroom</name>
    <desc>Bedroom</desc>
  </room>
  <room>
    <id>4</id>
    <name>Kitchen</name>
    <desc>Kitchen</desc>
  </room>
  <room>
    <id>5</id>
    <name>Dining Room</name>
    <desc>Dining Room</desc>
  </room>
  <room>
    <id>6</id>
    <name>Family Room</name>
    <desc>Family Room</desc>
  </room>
  <room>
    <id>7</id>
    <name>Bathroom</name>
    <desc>Bathroom</desc>
  </room>
  <room>
    <id>8</id>
    <name>Garage</name>
    <desc>Garage</desc>
  </room>
  <room>
    <id>9</id>
    <name>Laundry Room</name>
    <desc>Laundry Room</desc>
  </room>
  <room>
    <id>10</id>
    <name>Utility Room</name>
    <desc>Utility Room</desc>
  </room>
  <room>
    <id>11</id>
    <name>Office</name>
    <desc>Office</desc>
  </room>
  <room>
    <id>12</id>
    <name>Hallway / Stairway</name>
    <desc>Hallway / Stairway</desc>
  </room>
  <room>
    <id>13</id>
    <name>Exterior</name>
    <desc>Exterior</desc>
  </room>
</gip>
```

## UserGetListDefaultColors

Request:
```
cmd:UserGetListDefaultColors
fmt:xml
data:
<gip>
  <version>1</version>
  <token>1234567890</token>
</gip>
```

Example Response:
```
<gip>
  <version>1</version>
  <rc>200</rc>
  <color>
    <id>0</id>
    <name>Black</name>
    <value>000000</value>
  </color>
  <color>
    <id>1</id>
    <name>Green</name>
    <value>00bd1f</value>
  </color>
  <color>
    <id>2</id>
    <name>Blue</name>
    <value>004fd9</value>
  </color>
  <color>
    <id>3</id>
    <name>Red</name>
    <value>e30000</value>
  </color>
  <color>
    <id>4</id>
    <name>Yellow</name>
    <value>dde500</value>
  </color>
  <color>
    <id>5</id>
    <name>Purple</name>
    <value>845fcf</value>
  </color>
  <color>
    <id>6</id>
    <name>Orange</name>
    <value>fa8a00</value>
  </color>
  <color>
    <id>7</id>
    <name>Aqua</name>
    <value>4bc3de</value>
  </color>
  <color>
    <id>8</id>
    <name>Pink</name>
    <value>ff59b7</value>
  </color>
  <color>
    <id>9</id>
    <name>White</name>
    <value>ffffff</value>
  </color>
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