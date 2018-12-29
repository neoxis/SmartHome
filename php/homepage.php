<?php
	include('init.php');

	buildHomePage();
	function buildHomePage(){
		if(init() == true)
		{
			$sql = "SELECT * FROM tiles ORDER BY tile_order";
			global $conn;
			$result = $conn->query($sql);

			$html = '<link href="/css/smarthome.css" rel="stylesheet"></link>
						<script type="text/javascript" src="/js/smarthome.js"></script>
						<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
						<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
						<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
						<body onload="startUp()">
							<div class="modal">
								<div class="modal-content"></div>
							</div>
							<div class="edit-menu"></div>
							<div class="header">
								<h1>SmartHome Dashboard</h1>
								<i onclick="createTile()" class="fa fa-plus"></i>
								<i onclick="openPhpMyAdmin()" class="fa fa-database"></i>
								<i onclick="openGitSmartHome()" class="fa fa-git"></i>
								<i oncontextmenu="toggleSettingsDropdown(event)" onclick="alert(\'To be implemented\')" class="fa fa-gear dropdown">
								<div class="icon-dropdown-content">
									<a onclick="openIconReference(event)"><i class="fa fa-font-awesome"></i>&nbsp;&nbsp;Icon Reference</a>
								</div>
								</i>
							</div>
							<div class="grid">'; //return false to kill right click default action
			while($row = $result->fetch_assoc()) {
				$html .= '<div id="'. $row['tile_id'] . '" class="' . $row['tile_class'];
				if($row['tile_id'] == '' && $row['tile_onclick'] == '') {
					$html .= ' empty-tile';
				}
				$html .= '" onclick="' . $row['tile_onclick'] . '" oncontextmenu="editMenu(event,' . $row['id'] . ',' . $row['tile_order'] . ');">';
				$html .= $row['tile_body'];
				$html .= '</div>';
			}
			$html .= '</div>';
			echo $html;
		}
	}
?>