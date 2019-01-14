<?php
	header('Access-Control-Allow-Origin: *');
	$data = file_get_contents("php://input");
	if (!empty($data))
	{
		$fileName = time(0).".mp3";
		file_put_contents($fileName, $data);
		echo ($fileName);
	}
?>