<?php



	mb_internal_encoding("UTF-8");

	include 'config.php';

	$path = $config["desctop_font_path"];

	$count = count($config["fonts"]);


	for ($i=0; $i<$count; $i++) {

		if (file_exists($path.$config["fonts"][$i]["filename"]) ){
				$text = "@font-face { font-family: '".$config["fonts"][$i]["name"]."';";
				$text.=" src: url(";
				$text.=base64DataUri($path.$config["fonts"][$i]["filename"]);
				$text.=");";
				$text.="}";
				echo $text;
		}

	
		
    }


?>