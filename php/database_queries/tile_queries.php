<?php
	include("../init.php");
	
	$exe_func = $_GET['function'];
	call_user_func($exe_func);
	
	function getTempWidgetIDs() {
		if (init() == true) {
			global $conn;
			$sql = "SELECT `tile_id` FROM tiles WHERE tile_id LIKE '%temp%'";
			$result = $conn->query($sql);
			$tile_divs;
			$index = 0;
			while($row = $result->fetch_assoc()) {
				$tile_divs[$index++] = $row['tile_id'];
			}
			echo json_encode(array("result" => $tile_divs));
		}
	}
	
	function getTileAttributes() {
		$tile_id = $_GET['id'];
		if(init() == true) {
			global $conn;
			$sql = "SELECT * FROM `tiles` WHERE `id`=" . $tile_id;
			$result = $conn->query($sql);
			$attributes = $result->fetch_assoc();
			echo json_encode(array("attributes" => $attributes));
		}
	}
	
	function getstuff() {
		if(init() == true) {
			$html = "";
			global $conn;
			
			$sql = "SELECT * FROM webpages ORDER BY display_name";
			$result = $conn->query($sql);
			while($row = $result->fetch_assoc()) {
				$html .= "<option value='" . $row["file_path"] . "'>" . $row["display_name"] . "</option>";
			}
		
			$sql = "SELECT COUNT(id) AS count FROM tiles";
			$result = $conn->query($sql);
			$tile_count = $result->fetch_assoc()['count'];
			
			$sql = "SELECT id FROM `tiles` ORDER BY id DESC LIMIT 1";
			$result = $conn->query($sql);
			$last_tile_id = $result->fetch_assoc()['id'];
			echo json_encode(array("directories" => $html, "tile_count" => $tile_count, "previous_id" => $last_tile_id));
		}
	}
	
	function getTileCount() {
		if(init() == true) {
			global $conn;
			$sql = "SELECT COUNT(id) AS count FROM tiles";
			$result = $conn->query($sql);
			$tile_count = $result->fetch_assoc()['count'];
			echo json_encode(array("tile_count" => $tile_count));
		}
	}
	
	function createTile() {
		$tile_id = $_GET['tile_id'];
		$tile_class = $_GET['tile_class'];
		$tile_onclick = $_GET['tile_onclick'];
		$tile_body = $_GET['tile_body'];
		$tile_order = (int) $_GET['tile_order'];
		
		if(init() == true) {
			global $conn;
			$sql = "SELECT COUNT(id) AS count FROM tiles";
			$result = $conn->query($sql);
			$tile_count = $result->fetch_assoc()['count'];
			
			if($tile_order < $tile_count + 1) {
				$sql = "UPDATE tiles set `tile_order` = `tile_order` + 1 WHERE `tile_order`>=" . $tile_order;
				$result = $conn->query($sql);
			}
			
			$sql = "INSERT INTO tiles (`tile_id`,`tile_class`,`tile_onclick`,`tile_body`,`tile_order`) VALUES ('" .
				$tile_id . "','" .
				$tile_class . "','" .
				$tile_onclick . "','" .
				$tile_body . "'," .
				$tile_order . ")";
			$result = $conn->query($sql);
			echo json_encode(array("result" => $result));
		}
	}
	
	function changeTileColor() {
		$id = $_GET['id'];
		$color = $_GET['color'];
		if (init() == true) {
			global $conn;
			$sql = "SELECT `tile_class` FROM `tiles` WHERE `id`=" . $id;
			$result = $conn->query($sql);
			$tile_class = $result->fetch_assoc()['tile_class'];
			$tile_color = explode(' ', $tile_class);
			$tile_color = $tile_color[count($tile_color) -1];
			
			$sql = "UPDATE tiles SET `tile_class` = '" . str_replace($tile_color,$color,$tile_class) . "' WHERE `id`=" . $id;
			$result = $conn->query($sql);
			echo json_encode(array("result" => $result));
		}
	}
	
	function changeTileSize() {
		$id = $_GET['id'];
		$size = $_GET['size'];
		if (init() == true) {
			global $conn;
			$sql = "SELECT `tile_class` FROM `tiles` WHERE `id`=" . $id;
			$result = $conn->query($sql);
			$tile_class = $result->fetch_assoc()['tile_class'];
			$tile_color = explode(' ', $tile_class);
			$tile_color = $tile_color[count($tile_color) -1];
			
			if($size == 'small') {
				$size = 'tile';
			}
			else if($size == 'medium') {
				$size = 'tile tileM';
			}
			else {
				$size = 'tile tileL';
			}
			$sql = "UPDATE tiles SET `tile_class` = '" . $size . " " . $tile_color . "' WHERE `id`=" . $id;
			$result = $conn->query($sql);
			echo json_encode(array("result" => $result));
		}
	}
	
	function changeTileOrder() {
		$id = $_GET['id'];
		$tile_order = $_GET['order'];
		if (init() == true) {
			global $conn;
			$sql = "SELECT COUNT(id) AS count FROM tiles";
			$result = $conn->query($sql);
			$tile_count = $result->fetch_assoc()['count'];
			if($tile_order == $tile_count) {
				$sql = "UPDATE tiles set `tile_order` = `tile_order` - 1 WHERE `tile_order`=" . $tile_order;
				$result = $conn->query($sql);
			}
			else if($tile_order < $tile_count + 1) {
				$sql = "UPDATE tiles set `tile_order` = `tile_order` + 1 WHERE `tile_order`>=" . $tile_order;
				$result = $conn->query($sql);
			}
			
			$sql = "UPDATE tiles SET `tile_order` = '" . $tile_order . "' WHERE `id`=" . $id;
			$result = $conn->query($sql);
			
			echo json_encode(array("result" => $result));
		}
	}
	
	function deleteTile() {
		$id = $_GET['id'];
		if (init() == true) {
			global $conn;
			//grab order
			$sql = "SELECT `tile_order` FROM `tiles` WHERE `id`=" . $id;
			$result = $conn->query($sql);
			$del_order = $result->fetch_assoc()['tile_order'];
			//delete
			$sql = "DELETE FROM tiles WHERE id='" . $id . "'";
			$result = $conn->query($sql);
			//update order variable
			$sql = "UPDATE tiles set `tile_order` = `tile_order` - 1 WHERE `tile_order`>" . $del_order;
			$result2 = $conn->query($sql);
			echo json_encode(array("result" => ($result && $result2)));
		}
	}
?>