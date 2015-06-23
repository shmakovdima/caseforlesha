<?php

ini_set('display_errors',1);
error_reporting(E_ALL);
mb_internal_encoding("UTF-8");
$config = array(
		//Конфигурации
			"default_text"=>"Текст",
			"devices_desctop_path"=>"img/devices/desctop/",
			"devices_library_path"=>"img/devices/library/",
			"patterns_path_big"=>"img/patterns/big/",
			"patterns_path_small"=>"img/patterns/small/",
			"desctop_font_size"=>"50",
			"desctop_font_path"=>"fonts/",
			"desctop_bg_path"=>'img/backgrounds/',
			"smiles_path"=>'img/smiles/',
			"desctop_material_path"=>'img/materials/library/',
			"chech_material_path" =>'img/materials/chech/',
			"material_mask_path"=>"img/materials/mask/"	,
			"material_mask_camera"=>"img/materials/camera/",
		//Девайсы (номер => девайс)
		"devices"=>array(
			array(
				 "id"=>"iphone6plus", //id важен, так как по нему идет выбор чехла
				 "name"=>"iPhone 6 Plus",
				 "lib_img"=>"device-1.png",
				 "desctop_img"=>"device-1.png",
				 "width"=>232,
				 "height"=>472,
				 "default"=>true
				),
			array(
					   "id"=>"iphone6",	
					   "name"=>"iPhone 6",
					   "lib_img"=>"device-2.png",
					   "desctop_img"=>"device-2.png",
					   "width"=>200,
					   "height"=>408
				),
			//Для остальных width и height не было, пока поставил 0
			array(
					   "id"=>2,	
					   "name"=>"iPhone 5s",
					   "lib_img"=>"device-3.png",
					   "desctop_img"=>"device-1.png",
					   "width"=>0,
					   "height"=>0
				),
			array(
					   "id"=>3,	
					   "name"=>"iPhone 5c",
					   "lib_img"=>"device-4.png",
					   "desctop_img"=>"device-1.png",
					   "width"=>0,
					   "height"=>0
				),
			array(
						"id"=>4,	
						"name" => "iPhone 4s",
						"lib_img" => "device-6.png",
						"desctop_img" => "device-1.png",
						"width"=>0,
					    "height"=>0
        		),
			array(
						 "id"=>5,	
						 "name" => "iPhone 4",
						 "lib_img" => "device-7.png",
						 "desctop_img" => "device-1.png",
						 "width"=>0,
					   	 "height"=>0
				),
			array(
						"id"=>6,	
						"name" => "Galaxy S5",
						"lib_img" => "device-8.png",
						"desctop_img" => "device-1.png",
						"width"=>0,
						"height"=>0
        		),
  			array(
						 "id"=>7,
						 "name" => "Galaxy S4",
						 "lib_img" => "device-9.png",
						 "desctop_img" => "device-1.png",
						 "width"=>0,
						 "height"=>0
				),
			array(
						"id"=>8,
						 "name" => "Galaxy S4",
						 "lib_img" => "device-9.png",
						 "desctop_img" => "device-1.png",
						 "width"=>0,
						 "height"=>0
			),
			array(
						 "id"=>9,
						 "name" => "Galaxy S4",
						 "lib_img" => "device-9.png",
						 "desctop_img" => "device-1.png",
						 "width"=>0,
						 "height"=>0
				),
			array(
						 "id"=>10,
						 "name" => "Galaxy S4",
						 "lib_img" => "device-9.png",
						 "desctop_img" => "devi.style();ce-1.png",
						 "width"=>0,
						 "height"=>0
				),
			array(
						 "id"=>11,
						 "name" => "Galaxy S4",
						 "lib_img" => "device-9.png",
						 "desctop_img" => "device-1.png",
						 "width"=>0,
						 "height"=>0
				)
		),
		/*Материалы*/
		"materials" => array(
			//id device
			"iphone6"=>array(
				array(
					"name" => "Soft Touch",
					"descr_1" => "матовый белый",
					"descr_2" => "Бархатистый, приятный на ощупь чехол. Аккуратно! Сильно пачкается.",
					"lib_img" => "material-1.png",
				
					"colors"=> array(
									//цвет - вид (hex, rgb, transparent или название цвета)
										array(		
											"color"=>"transparent",
											"desctop_img" => "material-1.png",
											"desctop_mask" => "white_mask.png", //обрезка
											"desctop_camera" => "camera.png",
											"default"=>true
										),
										array(	
											"color"=>"#0000ff",
											"desctop_img" => "material-1.png",
											"desctop_mask" => "material-1.png",
											"desctop_camera" => "camera.png"
										),
										 array(
											"color"=>"red",
											"desctop_img" => "material-1.png",
											"desctop_mask" => "material-1.png",
											"desctop_camera" => "camera.png"
										)
								)
				)
			),
			

			"iphone6plus"=>array(
				array(
					"name" => "Soft Touch",
					"descr_1" => "матовый белый",
					"descr_2" => "Бархатистый, приятный на ощупь чехол. Аккуратно! Сильно пачкается.",
					"lib_img" => "material-1.png",
					"default"=>true,
					"colors"=> array(
									array(		
											"color"=>"transparent",
											"desctop_img" => "material-1.png",
											"desctop_mask" => "white_mask.png", //обрезка
											"desctop_camera" => "camera.png",
											"default"=>true
									),
										array(	
											"color"=>"#0000ff",
											"desctop_img" => "material-1.png",
											"desctop_mask" => "white_mask.png",
											"desctop_camera" => "camera.png"
										),
										 array(
											"color"=>"red",
											"desctop_img" => "material-1.png",
											"desctop_mask" => "white_mask.png",
											"desctop_camera" => "camera.png"
										)
								)
				),
				array(
					"name" => "Soft Touch",
					"descr_1" => "матовый белый",
					"descr_2" => "Бархатистый, приятный на ощупь чехол. Аккуратно! Сильно пачкается.",
					"lib_img" => "material-1.png",
					"colors"=> array(
									//цвет - вид (hex, rgb, transparent или название цвета)
										array(		
											"color"=>"transparent",
											"desctop_img" => "material-1.png",
											"desctop_mask" => "white_mask.png", //обрезка
											"desctop_camera" => "camera.png",
										)
									
									)
				),
				array(
					"name" => "Силикон + пластик",
					"descr_1" => "прозрачный",
					"descr_2" => "Тонкий. Силиконовые бока максимально защищают телефон. Высокое качест.",
					"lib_img" => "material-1.png"
				)
			)
			
		),
		//Цвета текста
		"colors" => array(
			array("#cccccc"),
			array("#444444"),
			array("#cccccc"),
			array("#cccccc"),
			array("#cccccc"),
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),	
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),
			array("#cccccc"),
			array("#cccccc"),
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),	
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),				
			array("#cccccc"),
			array("#cccccc"),
			array("#cccccc"),
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),	
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),					
			array("#cccccc"),
			array("#cccccc"),
			array("#cccccc"),
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),	
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc"),		
			array("#cccccc")				
		),
		"fonts"=> array(
			/*Только в */
				array(
						"name" => "Waltograph",
						"filename" => "Waltograph.ttf"
					),
				array(
						"name" => "snappy dna",
						"filename" => "snappy_dna.ttf",
						"default"=>true
					),

				array(
						"name" => "SimplyGlamorous",
						"filename" => "SimplyGlamorous.ttf"
					),

				array(
						"name" => "Remachine Script",
						"filename" => "Remachine_Script_Personal_Use.otf"
					),

				array(
						"name" => "Mustang",
						"filename" => "Mustang.otf"
					),

				array(
						"name" => "LeagueGothic-CondensedRegular",
						"filename" =>"LeagueGothic-CondensedRegular.otf"
					),

				array(
						"name" => "Jellyka - Love and Passion",
						"filename" => "Jellyka_Love_and_Passion.ttf"
					),

				array(
						"name" => "Feathergraphy Decoration",
						"filename" => "Feathergraphy_Decoration.ttf"
					),

				 array(
						"name" => "Bira",
						"filename" => "Bira_PERSONAL_USE_ONLY.ttf"
					),

				array(
						"name" => "AngillaTattoo",
						"filename" => "AngillaTattoo_PERSONAL_USE_ONLY.ttf"
					),

				array(
						"name" => "AGLettericaExtraCompressed Roman",
						"filename" => "AGLettericaExtraCompressed Roman.ttf"
					)
		),
		
		"backgrounds" => array(
			array(
				"link"=>"1/",
				"name"=>"категория 1",
				array( 
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					)
				)
			),
			array(
				"link"=>"2/",
				"name"=>"категория 2",
				array( 
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					)
				)
			),
			array(
				"link"=>"3/",
				"name"=>"категория 3",
				array( 
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					)
				)
			),
			array(
				"link"=>"4/",
				"name"=>"категория 4",
				array( 
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					)
				)
			),
			array(
				"link"=>"5/",
				"name"=>"категория 5",
				array( 
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					),
					array(
						"big"=>"bg1.jpg",
						"small"=>"bg1.jpg"
					)
				)
			)
		),
		"paterns"=> array(
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),		
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				),
			array(
				"big"=>"file1.jpg",
				"small"=>"file1.jpg"
				)	
		),
		"smiles"=>array(
			array(
				"link"=>"1/",
				"name"=>"emoji",
				"images"=>array(
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
						array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
				)
			),
			array(
				"link"=>"2/",
				"name"=>"иконки",
				"images"=>array(
					
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					)
					
				)
			),
			array(
				"link"=>"3/",
				"name"=>"пиктограммы",
				"images"=>array(
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					),
					array(
						"big"=>"smile1.png",
						"small"=>"smile1.png"
					)
				)
			),

		)
			

	);


	$result =  json_encode($config, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	
	echo $result;

 



?>