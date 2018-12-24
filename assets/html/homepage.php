<!DOCTYPE html>
<html>
<head>
 <!-- prevents favion 404 error -->
 <link rel="shortcut icon" href="#" />
 <link href="/css/smarthome.css" rel="stylesheet"></link>
 <script type="text/javascript" src="/js/smarthome.js"></script>
</head>
<body onload="startUp()">
 <h1>SmartHome Dashboard</h1>
 <div class="grid">
  <div class="tile yellow" onclick="media()">
   <span>Media Library</span>
  </div>
  <div class="tile blue" onclick="games()">
   <span>Games</span>
  </div>
  <div class="tile tileM green" onclick="openPage('html','media_library')">
  </div>
  <div id="t_clock" class="tile red" onclick="timer()">
  </div>           
  <div class="tile tileM yellow" onclick="php()">
  </div>
  <div class="tile blue">
  </div>
 </div>
</body>
</html>