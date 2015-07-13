<!DOCTYPE html>





<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
<link rel="stylesheet" type="text/css" href="css/sweet-alert.css">	
<link rel="stylesheet" type="text/css" href="css/main.css">
<link rel="stylesheet" type="text/css" href="css/perfect-scrollbar.css">

</head>

<body>
<div class="alert_write"> 
	
	<div class="alert_opacity"></div>
	<div class="alert_write_block">
		<div class="alert_write_item">
			<input type="text" class="input_write" placeholder="Введите текст">
			<button class="btn_write no_write"></button>
			<button class="btn_write ok_write"></button>
		</div>
		<span>Вы можете написать любой текст,<br>
не превышая 20 знаков</span>
	</div>
</div>
<div class="alert_out_svg">
	<div class="alert_out_svg-overlay">
	</div>
	<span class="alert_out_svg-text">Осторожно!<br>Ваш текст выходит за границу печатной области чехла</span>
</div>

<div class="alert_block alert_device">
	<div class="alert_block_item">
			<div class="alert_block_item-overlay"></div>
			<h2>Вы хотите выбрать новый девайс?</h2>
			<div class="left_button buttons_block">
				<button class="btn no_device no_button">Нет</button>
			</div>
			<div class="right_button buttons_block">
				<button class="btn yes_device yes_button">Да</button>
			</div>
			<span>Выбирая новый девайс,<br>
		Вам придется начать все оформление сначала.</span>
	
	</div>
</div>

<div class="alert_block alert_save">
	<div class="alert_block_item">
			<div class="alert_block_item-overlay"></div>
			<h2>Отправить чехол в корзину?</h2>
			<div class="left_button buttons_block">
				<button class="btn no_device no_button">Нет</button>
			</div>
			<div class="right_button buttons_block">
				<button class="btn yes_save yes_button">Да</button>
			</div>
			<span>Поместив чехол в корзину,<br>
		Вы не сможете более отредактировать его.</span>
	
	</div>
</div>


<div id="header">
	<ul id="header-menu">
		<li id="header-logo">
			<a href="index.html"></a>
		</li>
		<li data-menu-id="1" id="header-menu-item-1" class="header-menu-selected">
			<span>ДЕВАЙС</span>
		</li>
		<li data-menu-id="2" id="header-menu-item-2">
			<span>ЧЕХОЛ</span>
		</li>
		<li data-menu-id="3" id="header-menu-item-3">
			<span>ТЕКСТ</span>
		</li>
		<li data-menu-id="4" id="header-menu-item-4">
			<span>ЦВЕТ</span>
		</li>
		<li data-menu-id="5" id="header-menu-item-5">
			<span>ФОН</span>
		</li>
		<li data-menu-id="6" id="header-menu-item-6">
			<span>СМАЙЛЫ</span>
		</li>
	</ul>
</div>
<div id="main">
	<div id="left">
		<div id="phone"><a href="tel:79037905810"> +7 (903) 790-58-10</a></div>
		<div id="left_menu">
			<div id="cart">6 ТОВАРОВ</div>
			<div id="price">
				<div id="phone_model">iPhone 6</div>
				<div id="price_total">1500 Р</div>
				<div id="price-point"></div>
			</div>
			<div id="left_menu-shipping">О ДОСТАВКЕ</div>
			<div id="left_menu-help" class="left_menu-selected">НУЖНА ПОМОЩЬ</div>
		</div>
	</div>
	<div id="center">
		<div id="center_in" >
				<svg  xmlns="http://www.w3.org/2000/svg"  id="device" class="center_device_svg">
					<defs>
						<style type="text/css">
						<?php 
							include 'filesetup.php';
						?>
						</style>
					</defs>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg"  class="controls_device_svg">
					<defs>
						<pattern id="move" x="0" y="0" patternUnits="objectBoundingBox" height="25" width="25">
						  <image x="0" y="0" xlink:href="img/buttons/move.png" height="25" width="25"></image>
						</pattern>
						<pattern id="move_active" x="0" y="0" patternUnits="objectBoundingBox" height="25" width="25">
						  <image x="0" y="0" xlink:href="img/buttons/move_active.png" height="25" width="25"></image>
						</pattern>
						
						<pattern id="stretch" x="0" y="0" patternUnits="objectBoundingBox" height="25" width="25">
						  <image x="0" y="0" xlink:href="img/buttons/stretch.png" height="25" width="25"></image>
						</pattern>
						<pattern id="stretch_active" x="0" y="0" patternUnits="objectBoundingBox" height="25" width="25">
						  <image x="0" y="0" xlink:href="img/buttons/stretch_active.png" height="25" width="25"></image>
						</pattern>
						
						<pattern id="rotate" x="0" y="0" patternUnits="objectBoundingBox" height="25" width="25">
						  <image x="0" y="0" xlink:href="img/buttons/rotate.png" height="25" width="25"></image>
						</pattern>
						<pattern id="rotate_active" x="0" y="0" patternUnits="objectBoundingBox" height="25" width="25">
						  <image x="0" y="0" xlink:href="img/buttons/rotate_active.png" height="25" width="25"></image>
						</pattern>
						<pattern id="delete" x="0" y="0" patternUnits="objectBoundingBox" height="25" width="25">
						  <image x="0" y="0" xlink:href="img/buttons/delete.png" height="25" width="25"></image>
						</pattern>
						<pattern id="delete_active" x="0" y="0" patternUnits="objectBoundingBox" height="25" width="25">
						  <image x="0" y="0" xlink:href="img/buttons/delete_active.png" height="25" width="25"></image>
						</pattern>
  					</defs>
				</svg>		

			<div class="device_colors chech_colors" id="device_colors-2" style="display: none;">
				<div class="device_colors-selected"></div>
				<div></div>
				<div></div>
			</div>
			
			<div class="info_block" id="info_block-1">
				<div class="icon-question" data-answer-id="1"></div>
				<div class="icon-close"></div>
				<div class="answer_block" id="answer_block-1">
					<div class="info_block-row">
						<div class="info_block-point"></div>
						Нажмите в правом боковом меню на устройство, для которого хотите создать чехол.
						<br><br>
						<span class="font-blue">Если Вашего устройства нет в списке, а Вы очень хотите заказать чехол, напишите нам.</span>
					</div>
				</div>
			</div>
			<div class="info_block" id="info_block-2" style="display: none;">
				<div class="icon-question" data-answer-id="2"></div>
				<div class="icon-close"></div>
				<div class="answer_block" id="answer_block-2">
					<div class="info_block-row">
						<div class="info_block-point"></div>
						В правом меню отображены доступные для заказа чехлы.<br><br>
						Чтобы выбрать чехол, просто кликните на необходимый Вам.<br><br>
						<span class="font-blue">Для прозрачных чехлов важно выбрать цвет самого устройства, чтобы не ошибиться с макетом.</span>
					</div>
				</div>
			</div>
			<div class="info_block" id="info_block-3" style="display: none;">
				<div class="icon-question" data-answer-id="3"></div>
				<div class="answer_block" id="answer_block-3">
					<div class="info_block-row">
						<div class="info_block-point"></div>
						Вы можете написать текст как вдоль чехла, так и поперек.<br><br>
						Впишите ваш текст и он отобразится справа во всех доступных шрифтах.<br><br>
						<span class="font-red">Размещайте текст внутри чехла, не выходите за его пределы.</span>
					</div>
					<div class="info_block-row">
						<p class="info_block-1-2-1">2 клика по области, чтобы изменить текст<br><br> или нажмите здесь
						<span id="change_color_but">ИЗМЕНИТЬ ТЕКСТ</span>
						</p>
						<p class="info_block-1-2-2">1 клик - работать с объектом</p>
						<p class="info_block-1-2-3">крутите и вертите</p>
						<p class="info_block-1-2-4">потяните за угол, чтобы растянуть</p>
						<p class="info_block-1-2-5">перемещение по чехлу</p>
					</div>
				</div>
			</div>
			<div class="info_block" id="info_block-4">
				<div class="icon-question" data-answer-id="4"></div>
				<div class="answer_block" id="answer_block-4">
					<div class="info_block-row">
						<div class="info_block-point"></div>
					
						Выберите в правом меню необходимый цвет надписи. 
						<br><br>
						Вы также можете выбрать паттерн, который заполнит текст узором, добавив потрясающий эффект.
						<br><br>
						<span class="font-blue">Подвигайте текст по чехлу после добавления паттерна для выбора наилучшего отображения узора.</span>
					</div>
					<div class="info_block-row">
						<p class="info_block-1-2-1">2 клика по области, чтобы изменить текст<br><br> или нажмите здесь
						<span id="change_color_but">ИЗМЕНИТЬ Текст</span>
						</p>
						<p class="info_block-1-2-2">1 клик - работать с объектом</p>
						<p class="info_block-1-2-3">крутите и вертите</p>
						<p class="info_block-1-2-4">потяните за угол, чтобы растянуть</p>
						<p class="info_block-1-2-5">перемещение по чехлу</p>
					</div>
				</div>
			</div>
			<div class="info_block" id="info_block-5">
				<div class="icon-question" data-answer-id="5"></div>
				<div class="icon-close"></div>
				<div class="answer_block" id="answer_block-5">
					<div class="info_block-row">
						<div class="info_block-point"></div>
						В правом меню выберите фон чехла на свой вкус.
						<br><br>
						Чтобы удалить фон, нажмите на крестик.
						<br><br>
						Вы можете вернуться в раздел “цвет”, Ваш фон сохранится.
						<br><br>
						<span class="font-blue">Можно пропустить этот шаг, нажав кнопку “смайлы” или кнопку “заказать”.</span>
					</div>
				</div>
			</div>
			<div class="info_block" id="info_block-6">
				<div class="icon-question" data-answer-id="6"></div>
				<div class="icon-close"></div>
				<div class="answer_block" id="answer_block-6">
					<div class="info_block-row">
						<div class="info_block-point"></div>

						В правом меню выберите смайлы или иконки, перетащив их на чехол.
						<br><br>
						Растягивайте/уменьшайте их, потянув за уголок. Перемещайте их по чехлу
на свое усмотрение.
						<br><br>
					
						<span class="font-blue">Если Вы не хотите использовать смайлы, пропустите этот шаг, нажав “заказать”.</span>
					</div>
						<div class="info_block-row">
						<p class="info_block-1-2-2">1 клик - работать с объектом</p>
						<p class="info_block-1-2-3">крутите и вертите</p>
						<p class="info_block-1-2-4">потяните за угол, чтобы растянуть</p>
						<p class="info_block-1-2-5">перемещение по чехлу</p>
						<p class="info_block-1-2-6">удалить</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="right">
		<div id="right-1" class="right_content_block">
			<div class="right_menu_title">Выберите устройство</div>
			<div class="library">
				<div class="library_in library_of_devices">
						
				</div>		
			</div>
		</div>
		<div id="right-2" class="right_content_block" style="display: none;">
			<div class="right_menu_title">Выберите чехол</div>
			<div class="library_2">
				<div class="library_in library_check">
					
				</div>
			</div>
		</div>
		<div id="right-3" class="right_content_block" style="display: none;">
			<div class="right_menu_title">Выберите шрифт</div>
			<div class="library_2 ">
				<div class="library_in library_font">
					
				</div>
			</div>
		</div>
		<div id="right-4" class="right_content_block" style="display: none;">
			<div class="right_menu_title">Выберите цвет</div>
			<div class="library_3">
				<div class="library_in library_color">
								
							</div>
			</div>
			<div class="right_menu_title_2">или<br>Выберите паттерн</div>
			<div class="library_4">
				<div class="library_in library_pattern">
								
						</div>
			</div>
		</div>
		<div id="right-5" class="right_content_block" style="display: none;">
			<div class="right_menu_title">Выберите фон</div>
			<div class="category_buttons">
				
			</div>
			
		</div>
		<div id="right-6" class="right_content_block" style="display: none;">
			<div class="right_menu_title">Выберите смайл</div>
			<div class="category_buttons">
				
			</div>
		</div>
		<div id="steps_controller">
			<div id="steps_controller-checkout_but"><div>ЗАКАЗАТЬ</div></div>
			<div id="steps_controller-next_but" class=" active"><div>ДАЛЕЕ</div></div>
		</div>
	</div>
</div>
<div id="footer">
	<div id="gallery_but">
		<div id="gallery_but-point"></div>
		ВДОХНОВИТЬСЯ
	</div>
</div>

</body>
<script type="text/javascript" src="js/d3.min.js"></script>
<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/perfect-scrollbar.js"></script>
<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
<script type="text/javascript" src="js/html2canvas.js"></script>

<script type="text/javascript" src="js/canvg.js"></script>
<script type="text/javascript" src="js/sweet-alert.min.js"></script>	

	
</html>




