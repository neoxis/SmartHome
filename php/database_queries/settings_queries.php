<?php
	include("../init.php");
	
	$exe_func = $_GET['function'];
	call_user_func($exe_func);
	
	function getTMDBapiKey() {
		if(init() == true) {
			global $conn;
			$sql = "SELECT value FROM `settings` WHERE `setting`='tmdb_api_key'";
			$result = $conn->query($sql);
			$api_key = $result->fetch_assoc()['value'];
			echo json_encode(array("api_key" => $api_key));
		}
	}

?>