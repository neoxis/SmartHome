<?php
	$output = shell_exec('/opt/vc/bin/vcgencmd measure_temp');
	echo json_encode(array("internal_temp" => $output));
?>