<?php
	include('init.php');

	buildHomePage();
	function buildHomePage(){
		if(init() == true)
		{
			$sql = "SELECT * FROM tiles ORDER BY tile_order";
			global $conn;
			$result = $conn->query($sql);
			
			echo '<link rel="shortcut icon" href="#" />
						<link href="/css/smarthome.css" rel="stylesheet"></link>
						<script type="text/javascript" src="/js/smarthome.js"></script>
						<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
						<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
						<body onload="startUp()">
							<div class="modal">
								<div class="modal-content"></div>
							</div>
							<div class="edit-menu"></div>
							<div class="header" >
								<h1>SmartHome Dashboard</h1>
								<i onclick="createTile()" class="fa fa-plus-square-o"></i>
								<i onclick="openPhpMyAdmin()" class="fa fa-database"></i>
							</div>
							<div class="grid">'; //return false to kill right click default action
			while($row = $result->fetch_assoc()) {
				echo '<div id="'. $row['tile_id'] . '" class="' . $row['tile_class'] . '" onclick="' . $row['tile_onclick'] . '" oncontextmenu="editMenu(event,' . $row['id'] . ');return false;">';
				echo $row['tile_body'];
				echo '</div>';
			}
			echo '</div>';
		}
	}
?>