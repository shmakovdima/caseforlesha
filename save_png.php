<?php
$dir = "uploaded_png";


if(isset($_POST['image'])) {
		$image = $_POST['image'];
		$image = str_replace('data:image/png;base64,', '', $image);

		$year = date('Y');
  		$month =date('m');
 		$day = date('d');

	    $data = array();

		if (is_dir($dir)) {

		}else{
			mkdir($dir);
		}


		$dir.="/".$year;

		if (is_dir($dir)) {

		}else{
			mkdir($dir);
		}


		$dir.="/".$month;

		if (is_dir($dir)) {
		
		}else{
			mkdir($dir);
		}

		$dir.="/".$day;
	
		if (is_dir($dir)) {
		
		}else{
			mkdir($dir);
		}

		$id = generatePassword();

		file_put_contents($dir.'/'.$id.'.png', base64_decode($image));

		echo $dir.'/'.$id.'.png';

		
}else{
	echo $data['errors'] = "Произошла ошибка, попробуйте еще раз";
}
function generatePassword($length = 24){
		  $chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
		  $numChars = strlen($chars);
		  $string = '';
		  for ($i = 0; $i < $length; $i++) {
			$string .= substr($chars, rand(1, $numChars) - 1, 1);
		  }
		  return $string;
		}

