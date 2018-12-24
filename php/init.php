<?php

function init()
{
	 $username = "root";
	 $password = "root";
	 $dbServer = "localhost";
	 $dbName   = "smarthome";

	// Create connection
	global $conn;
	$conn = new mysqli($dbServer, $username, $password, $dbName);

	// Check connection
	if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }
	else return true;
}
?>