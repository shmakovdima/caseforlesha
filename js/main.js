var canvas, devices_desctop_img_obj, desctop_text, devices_desctop_bg_obj;

$(document).ready(function() {

	canvas = new fabric.Canvas('device');

	set_device (0);


	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

	$('#header-menu li').click(function() {

		change_step ($(this));
	
	});


	$('.icon-question').click(function() {

		var id = $(this).data('answerId');
		//alert ($('#answer_block-' + id).attr('display'));
		if ($('#answer_block-' + id).css('display') == 'block') {

			$('#answer_block-' + id).hide();

		} else {

			$('#answer_block-' + id).show();

		}
	});

	$('.library_tab_but').click(function() {

		var id = $(this).data('tabId');

		$('.library_tab_but').removeClass('library_tab_but-selected');
		$(this).addClass('library_tab_but-selected');

		$('.library_smiles').hide();
		$('#library_smiles-' + id).show();
	});

	$('.library-device_row').click(function() {
		set_device ($(this).data('deviceId'));
	});

	$('.library-case_row').click(function() {
		set_material ($(this).data('materialId'));
	});

	$('.library-font_row').click(function() {
		set_font ($(this).data('fontId'));
	});

	$('.library-color_row').click(function() {
		set_font_color ($(this).data('fontColorId'));
	});

	$('.library-pattern_row').click(function() {
		set_font_pattern ($(this).data('fontPatternId'));
	});

	$('.library-background_row').click(function() {
		set_bg ($(this).data('bgId'));
	});

});


function set_bg (bg_id) {

	desctop.bg_id = bg_id;

	//canvas.remove(desctop_text);

	//desctop_text = new fabric.IText('text', {
	fabric.Image.fromURL(config.http_server + config.desctop_bg_path + config.backgrounds[desctop.bg_id].filename,  function(img) {
		devices_desctop_bg_obj = img.set({
			left: 0,
			top: 0,
			selectable: false,
			clipTo: function (ctx) {
				ctx.arc(0, 0, 100, 0, Math.PI * 2, true);
			}
		});

		canvas.add(devices_desctop_bg_obj).setActiveObject(img);
	});

	//canvas.add(desctop_text);

	$('.library-background_row').removeClass('library-background_row-selected');
	$('#library-background_row-' + bg_id).addClass('library-background_row-selected');
}

function set_material (material_id) {

	desctop.material_id = material_id;

	//$('#device').css('background-image', 'url(' + config.devices_desctop_path + config.devices[device_id].desctop_img + ')');

	canvas.remove(devices_desctop_img_obj);

	canvas.setHeight(config.materials[desctop.material_id].height);
	canvas.setWidth(config.materials[desctop.material_id].width);
	//console.log(config.http_server + config.devices_desctop_path + config.devices[desctop.device_id].desctop_img);
	//var devices_desctop_img_element = document.getElementById('devices_desctop_img-' + device_id);
	fabric.Image.fromURL(config.http_server + config.desctop_material_path + config.materials[desctop.material_id].desctop_img,  function(img) {
		devices_desctop_img_obj = img.set({
			left: 0,
			top: 0,
			selectable: false,
		});

		canvas.add(devices_desctop_img_obj);
	});


	$('.library-case_row').removeClass('library-case_row-selected');
	$('#library-case_row-' + material_id).addClass('library-case_row-selected');
}

function set_device (device_id) {

	desctop.device_id = device_id;

	//$('#device').css('background-image', 'url(' + config.devices_desctop_path + config.devices[device_id].desctop_img + ')');

	canvas.remove(devices_desctop_img_obj);

	canvas.setHeight(config.devices[desctop.device_id].height);
	canvas.setWidth(config.devices[desctop.device_id].width);
	//console.log(config.http_server + config.devices_desctop_path + config.devices[desctop.device_id].desctop_img);
	//var devices_desctop_img_element = document.getElementById('devices_desctop_img-' + device_id);
	fabric.Image.fromURL(config.http_server + config.devices_desctop_path + config.devices[desctop.device_id].desctop_img,  function(img) {
		devices_desctop_img_obj = img.set({
			left: 0,
			top: 0,
			selectable: false,
		});

		canvas.add(devices_desctop_img_obj);
	});

	

	$('.library-device_row').removeClass('library-device_row-selected');
	$('#library-device_row-' + device_id).addClass('library-device_row-selected');
}

function set_font (font_id) {

	desctop.font_id = font_id;

	canvas.remove(desctop_text);

	desctop_text = new fabric.IText('text', {
		left: 100,
		top: 100,
		fill: '#f55',
		fontFamily: config.fonts[font_id].name,
		fontSize: config.desctop_font_size,
	});

	canvas.add(desctop_text);

	$('.library-font_row').removeClass('library-font_row-selected');
	$('#library-font_row-' + font_id).addClass('library-font_row-selected');
}

function set_font_pattern (font_pattern_id) {

	desctop.font_pattern_id = font_pattern_id;

	//desctop_text.set({fill: config.color[font_color_id].code})

	fabric.util.loadImage(config.http_server + config.patterns_path + config.patterns[desctop.font_pattern_id].filename, function(img) {
		desctop_text.fill = new fabric.Pattern({
			source: img,
			repeat: 'repeat'
		});
		canvas.renderAll();
	});


	$('.library-color_row').removeClass('library-color_row-selected');

	$('.library-pattern_row').removeClass('library-pattern_row-selected');
	$('#library-pattern_row-' + font_pattern_id).addClass('library-pattern_row-selected');
}

function set_font_color (font_color_id) {

	desctop.font_color_id = font_color_id;

	desctop_text.set({
		fill: config.colors[font_color_id].code,
		fontSize: config.desctop_font_size,
	});
	canvas.renderAll();

	$('.library-pattern_row').removeClass('library-pattern_row-selected');

	$('.library-color_row').removeClass('library-color_row-selected');
	$('#library-color_row-' + font_color_id).addClass('library-color_row-selected');
}

function change_step (obj) {

	var id = $(obj).data('menuId');

	$('.header-menu-selected').removeClass('header-menu-selected');
	$(obj).addClass('header-menu-selected');

	$('.right_content_block').hide();
	$('#right-' + id).show();

	$('.info_block').hide();
	$('#info_block-' + id).show();

	$('.device_colors').hide();
	$('#device_colors-' + id).show();
}