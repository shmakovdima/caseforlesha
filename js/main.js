var canvas, devices_desctop_img_obj, desctop_text, devices_desctop_bg_obj;

var default_devices_id="";

//var this_object = randomHash(10);


var newx, prevx;
var newy, prevy;




//d3 global

var svg, svg_mask_container, svg_device, svg_material_body, svg_background, svg_text, svg_smiles ,svg_mask_body,  svg_camera;


/*FROM DIMA*/
var result_url; //Result link to picture
var back_canvas; //Back of phone


var text_width_constant=20;
var text_height_constant=20;

var desctop = {
		device_id: "",
		material_id: "",
		font_id: "",
		text: "",
		font_color_id: "",
		font_pattern_id: "",
};


var steps = [];
var cur_step=1;

var config = {}; //Return config


$(document).on("click", ".library-color_row" , function(){
	set_font_color($(this).data('color_id'),$(this).data('color'));
});

$(document).on("click", "#steps_controller-next_but" , function(){
	var id = parseInt($(".header-menu-selected").attr("data-menu-id"))+1;
	change_step($("#header-menu-item-"+id));
});


$(document).on("click", ".library-device_row" , function(){
	set_device($(this).data('deviceId'));
	change_step($("#header-menu-item-2"));
});

$(document).on("click", ".chech_colors div" , function(){
	set_material_color($(this).data('material_id'), $(this).data('material_color'));
});


$(document).on("click", ".library-background_row" , function() {
		set_bg($(this).data('bgId'));
});

$(document).on("click", "#steps_controller-checkout_but" , function(){
	save_image();
});

$(document).on("click", ".library-pattern_row" , function(){
		set_font_pattern($(this).data('fontPatternId'));
});

$(document).on("click", ".library-case_row" , function(){
		set_material($(this).data('materialId'));
});

$(document).on("click", "#right-6 .library_tab_but" , function(){
		var id = $(this).data('tabId');
		$('#right-6 .library_tab_but').removeClass('library_tab_but-selected');
		$(this).addClass('library_tab_but-selected');
		$('.library-smiles').hide();
		$('#library_smiles-' + id).show();
});


$(document).on("click", ".library-smile_row" , function() {
		set_smile($(this).attr('data-smile-id'));
});




$(document).on("click", ".library-font_row" , function(){
		set_font($(this).data('fontId'));
});

$(document).on("click", "#right-5 .library_tab_but" , function(){
		var id = $(this).data('tabId');
		$('#right-5 .library_tab_but').removeClass('library_tab_but-selected');
		$(this).addClass('library_tab_but-selected');
		$('.library-backgrouds').hide();
		$('#library_backgrouds-' + id).show();
});

$(document).on("click", "#info_block-5 .icon-close" , function(){
	svg_background.selectAll("image").remove();
	$(".library-background_row").removeClass("library-background_row-selected");
	$("#info_block-5 .icon-close").css("display","none");
});


$(document).ready(function() {
	preparing_data();
	
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

	$('#header-menu li').on("click", function() {
		change_step($(this));
	});

	$('.icon-question').on("click", function() {

		var id = $(this).data('answerId');
	
		if ($('#answer_block-' + id).css('display') == 'block') {

			$('#answer_block-' + id).hide();

		} else {
			$('#answer_block-' + id).show();
		}
	});

});

var object_id;
function preparing_data(){
	$.ajax({
	  type: "POST",
	  dataType: "json",
	  url: location.href+"config.php",
	  success: function(data){
	  	config=data;
		prepare_devices();
	  }
  	});
	
	//svg_generation
	
	svg =d3.select(".center_device_svg");
	svg_mask_container = svg.append("defs")
							.classed("svg_mask_container", true);
	
	svg_fonts_container = svg.append("defs")
							.classed("svg_fonts_container", true);
	
	
	svg_device = svg.append("g")
			.classed("svg_device", true);
	svg_material_body = svg.append("g")
			.classed("svg_material_body", true);
	svg_background = svg.append("g")
			.classed("svg_background", true);
	svg_text = svg.append("g")
			.classed("svg_text", true);
	svg_smiles = svg.append("g")
			.classed("svg_smiles", true);
	svg_mask_body = svg.append("g")
			.classed("svg_mask_body", true);
	svg_camera = svg.append("g")
			.classed("svg_camera", true);
	svg_controls = svg.append("g")
			.classed("svg_controls", true);
	
	
	steps.push(cur_step);
	object_id = randomHash(10);
	desctop.text = config.default_text;
}

function setup_patterns() {
	
	for(value in config.paterns) {	
			var small = config.patterns_path_small+config.paterns[value].small;
			var big = config.patterns_path_big+config.paterns[value].big;
			console.log((value) % 5);
			if (value == 0) {
				var html_text="";
				 html_text+='<div class="library-pattern_row library-pattern_row-first" style="background: url('+small+');" data-url="'+big+'" data-font-pattern-id="'+value+'" id="library-pattern_row-'+value+'"></div>';
			}else{
				if(((value) % 5) == 0) {
					console.log("first"+value);
					html_text="";
					html_text+='<div class="library-pattern_row library-pattern_row-first" style="background: url('+small+');" data-url="'+big+'" data-font-pattern-id="'+value+'" id="library-pattern_row-'+value+'"></div>';
				}else{
					if(((value) % 5) == 4) {
						console.log("last"+value);
						html_text="";
						html_text+='<div class="library-pattern_row library-pattern_row-last" style="background: url('+small+');" data-url="'+big+'" data-font-pattern-id="'+value+'" id="library-pattern_row-'+value+'"></div>';
					}else{
						console.log("норм"+value);
						html_text="";
						html_text+='<div class="library-pattern_row " style="background: url('+small+');" data-url="'+big+'" data-font-pattern-id="'+value+'" id="library-pattern_row-'+value+'"></div>';
					}
					
				}
			}
		$(".library_pattern").append(html_text);
	}
	/*
	
									<div class="library-pattern_row" style="background: url(img/patterns/file1.jpg);" data-font-pattern-id="1" data-url="img/patterns/file1.jpg" id="library-pattern_row-1"></div>
									<div class="library-pattern_row" style="background: url(img/patterns/file1.jpg);" data-font-pattern-id="2" data-url="img/patterns/file1.jpg" id="library-pattern_row-2"></div>
									<div class="library-pattern_row" style="background: url(img/patterns/file1.jpg);" data-font-pattern-id="3" data-url="img/patterns/file1.jpg" id="library-pattern_row-3"></div>
									<div class="library-pattern_row library-pattern_row-last" style="background: url(img/patterns/file1.jpg);" data-url="img/patterns/file1.jpg" data-font-pattern-id="4" id="library-pattern_row-4"></div>
	*/
}


function setup_font() {
	
	
	var path = config.desctop_font_path;
	for (value in config.fonts) {
		var html_text = "";
		if (config.fonts[value].default == true){               
			desctop.font_id = config.fonts[value].name;
			console.log("IРИФТ"+desctop.font_id);
			html_text+='<div class="library-font_row library-font_row-selected"  data-font_url = "'+path+config.fonts[value].filename+'" data-font="'+config.fonts[value].name+'" style="font-family: '+config.fonts[value].name+';" data-font-id="'+value+'" id="library-font_row-'+value+'">'+config.fonts[value].name+'</div>';
		}else{
			html_text+='<div class="library-font_row"  data-font_url = "'+path+config.fonts[value].filename+'" data-font="'+config.fonts[value].name+'" style="font-family: '+config.fonts[value].name+';" data-font-id="'+value+'" id="library-font_row-'+value+'">'+config.fonts[value].name+'</div>';
		}
		
		$(".library_font").append(html_text);
	}
}





function setup_smiles(){
	var smiles = config.smiles;	
	var desctop_bg_path = config.smiles_path;
	
	for (value in smiles) {	
			
		
			var html_text="";

			var path = desctop_bg_path + smiles[value].link;

			category = smiles[value]["images"];
		
			console.log(category);
		
		
			if (value==0) {
			
				html_text+='<div class="library_6  library-smiles" id="library_smiles-'+value+'">';
				
			}else{
				html_text="";
				html_text+='<div class="library_6  library-smiles" id="library_smiles-'+value+'" style="display: none;">';	
			}
			
			html_text+='<div class="library_in">';
		
		
			for(value1 in category) {
				console.log(category[value1].small);
				var hash = randomHash(4);
				if (value1 == 0) {
					html_text+='<div class="library-smile_row library-smile_row-first" style="background-image: url('+path+category[value1].small+');" data-url="'+path+category[value1].big+'" id="library-smile_row-'+value1+hash+'" data-smile-id="'+value1+hash+'"></div>';
				}else{
					if((value1 % 5) == 0) {
						html_text+='<div class="library-smile_row library-smile_row-first" style="background-image: url('+path+category[value1].small+');" data-url="'+path+category[value1].big+'" id="library-smile_row-'+value1+hash+'" data-smile-id="'+value1+hash+'"></div>';
					}else{
						if((value1 % 5) == 4) {
							html_text+='<div class="library-smile_row library-background_row-last" style="background-image: url('+path+category[value1].small+');" data-url="'+path+category[value1].big+'" id="library-smile_row-'+value1+hash+'" data-smile-id="'+value1+hash+'"></div>';
						}else{
							html_text+='<div class="library-smile_row " style="background-image: url('+path+category[value1].small+');" data-url="'+path+category[value1].big+'" id="library-smile_row-'+value1+hash+'" data-smile-id="'+value1+hash+'"></div>';
						}
					}
				}
			}
		
			html_text+="</div></div>";
		$("#right-6").append(html_text);
		
		if (value==0) {
			 html_text ="";
			html_text = '<div class="library_tab_but library_tab_but-selected" data-tab-id="'+value+'">'+smiles[value].name+'</div>';
			
		}else{
			html_text ="";
			html_text = '<div class="library_tab_but" data-tab-id="'+value+'">'+smiles[value].name+'</div>';
			
		}
		$("#right-6 .category_buttons").append(html_text);
	}
	
	$(".library-smiles").css("top", 65+$("#right-6 .category_buttons").height()+"px");

	
}



function setup_backgrounds() {
	
	var backgrounds = config.backgrounds;
	
	var desctop_bg_path = config.desctop_bg_path;
	
	
	for (value in backgrounds) {	
			
		
			var html_text="";

			var path = desctop_bg_path + backgrounds[value].link;

			category = backgrounds[value][0];
			console.log(backgrounds[value]);
		
			if (value==0) {
				console.log("Да ноль же");
				html_text+='<div class="library_5  library-backgrouds" id="library_backgrouds-'+value+'">';
				
			}else{
				html_text="";
				html_text+='<div class="library_5  library-backgrouds" id="library_backgrouds-'+value+'" style="display: none;">';	
			}
			
			html_text+='<div class="library_in">';
		
		
			for(value1 in category) {
				console.log(category[value1].small);
				var hash = randomHash(4);
				if (value1 == 0) {
					html_text+='<div class="library-background_row library-background_row-first" style="background-image: url('+path+category[value1].small+');" data-url="'+path+category[value1].big+'" id="library-background_row-'+value1+hash+'" data-bg-id="'+value1+hash+'"></div>';
				}else{
					if((value1 % 4) == 0) {
						html_text+='<div class="library-background_row library-background_row-first" style="background-image: url('+path+category[value1].small+');" data-url="'+path+category[value1].big+'" id="library-background_row-'+value1+hash+'" data-bg-id="'+value1+hash+'"></div>';
					}else{
						if((value1 % 4) == 3) {
							html_text+='<div class="library-background_row library-background_row-last" style="background-image: url('+path+category[value1].small+');" data-url="'+path+category[value1].big+'" id="library-background_row-'+value1+hash+'" data-bg-id="'+value1+hash+'"></div>';
						}else{
							html_text+='<div class="library-background_row " style="background-image: url('+path+category[value1].small+');" data-url="'+path+category[value1].big+'" id="library-background_row-'+value1+hash+'" data-bg-id="'+value1+hash+'"></div>';
						}
					}
				}
			}
		
		/*
			
									<div class="library-background_row" style="background-image: url(img/backgrounds/1/bg1.jpg);" id="library-background_row-1" data-url="img/backgrounds/1/bg1.jpg" data-bg-id="1"></div>
									<div class="library-background_row" style="background-image: url(img/backgrounds/1/bg1.jpg);" id="library-background_row-2" data-url="img/backgrounds/1/bg1.jpg" data-bg-id="2"></div>
									<div class="library-background_row library-background_row-last" style="background-image: url(img/backgrounds/1/bg1.jpg);" data-url="img/backgrounds/1/bg1.jpg" id="library-background_row-3" data-bg-id="3"></div>
									<div class="library-background_row library-background_row-first" style="background-image: url(img/backgrounds/1/bg1.jpg);" data-url="img/backgrounds/1/bg1.jpg" id="library-background_row-4" data-bg-id="4"></div>
									<div class="library-background_row" style="background-image: url(img/backgrounds/1/bg1.jpg);" id="library-background_row-5" data-url="img/backgrounds/1/bg1.jpg" data-bg-id="5"></div>
							
		
		
		*/
		
			html_text+="</div></div>";
		$("#right-5").append(html_text);
		
		if (value==0) {
			 html_text ="";
			html_text = '<div class="library_tab_but library_tab_but-selected" data-tab-id="'+value+'">'+backgrounds[value].name+'</div>';
			
		}else{
			html_text ="";
			html_text = '<div class="library_tab_but" data-tab-id="'+value+'">'+backgrounds[value].name+'</div>';
			
		}
		$("#right-5 .category_buttons").append(html_text);
	}
	
	$(".library-backgrouds").css("top", 40+$("#right-5 .category_buttons").height()+"px");
}

function setup_colors() {
	
	for( value in config.colors) {	
			
		var html_text="";

		if (value == 0) {
			html_text="";
			 html_text+='<div class="library-color_row library-color_row-first" data-color="'+config.colors[value][0]+'" data-color_id="'+value+'" style="background: '+config.colors[value][0]+';" id="library-color_row-'+value+'"></div>';
		
		}else{
				if((value % 10) == 9) {
					console.log(value);
					html_text="";
					html_text+='<div class="library-color_row library-color_row-last" data-color_id="'+value+'" data-color="'+config.colors[value][0]+'" style="background: '+config.colors[value][0]+';" id="library-color_row-'+value+'"></div>';
				}else{
					if((value % 10) == 0) {
						console.log(value);
						html_text="";
						 html_text+='<div class="library-color_row library-color_row-first" data-color_id="'+value+'" data-color="'+config.colors[value][0]+'" style="background: '+config.colors[value][0]+';" id="library-color_row-'+value+'"></div>';
					}else{
						console.log(value);
						html_text="";
						 html_text+='<div class="library-color_row" data-color_id="'+value+'" data-color="'+config.colors[value][0]+'" style="background: '+config.colors[value][0]+';" id="library-color_row-'+value+'"></div>';				
					}
				}
		}
			
		$(".library_color").append(html_text);
	}
	
}


function prepare_devices(){
	for(value in config.devices) {	
		var html_text = "";
		if (config.devices[value].default == true) {
			if (default_devices_id!="") {
				console.log("Несколько устройств по дефолту, возможно "+config.devices[value].name+", неверный");
			}
			html_text+='<div class="library-device_row library-device_row-selected" id="library-device_row-'+value+'" data-device-id="'+value+'">';
			default_devices_id = value;

		}else{
			html_text+='<div class="library-device_row" id="library-device_row-'+value+'" data-device-id="'+value+'">';
		}
		
		html_text+=config.devices[value].name;
		
		var path = config["devices_library_path"];

		html_text+='<div style="background: url('+path+config.devices[value].lib_img+') bottom center no-repeat;"></div>';
		
		
		$(".library_of_devices").append(html_text);	
	}	
	
	set_device(default_devices_id);
}

function set_default_text(){
	svg_text.append("text")
								.text(desctop.text)
								.style("text-anchor", "middle")
								.style("alignment-baseline", "middle")
								.style("font-family", desctop.font_id)
								.style("font-size",config.desctop_font_size)
								.attr("x",config.devices[desctop.device_id].width/2)
								.attr("y", config.devices[desctop.device_id].height/2);
		
	var text_width = $(".svg_text text").width()+text_width_constant;
	var text_height = $(".svg_text text").height()+text_height_constant;
	
	svg_controls.append("rect")
		.classed("control_text", true)
		.classed("work", true)
		.attr("id", "control_text_rect")
		.attr("width", text_width)
		.attr("height", text_height)
		.attr("x", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("y", config.devices[desctop.device_id].height/2-text_height/2-5)
		
		.call(drag_rect)
		.on("dblclick", click_text);
	
	console.log(config.devices[desctop.device_id].width/2-text_width/2);
	
	//Растяжение
	svg_controls.append("circle")
		.classed("control_text", true)
		.classed("stretch_button",true)
		.call(drag_stretch)
		.classed("work",true)
		.attr("r", 12.5)
		.attr("cx", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2-5);
	
	svg_controls.append("circle")
		.classed("control_text", true)
		.classed("rotate_button",true)
		.attr("data-rotate", 0)
		.classed("work",true)
		.attr("r", 12.5)
		.call(rotate_text)
		.attr("cx", config.devices[desctop.device_id].width/2+text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2-5);
	
	svg_controls.append("circle")
		.classed("control_text", true)
		.classed("move_button",true)
		.classed("work",true)
		.attr("r", 12.5)
		.call(drag_text)
		.attr("cx", config.devices[desctop.device_id].width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2-5);
	
	
	
	$("#header-menu-item-3").addClass("header-menu-active");
	//svg_controls.append("image").
}


function set_smiles_image(url) {
		
	object_id = randomHash(10);

	svg_smiles.append("image")
								.text(desctop.text)
								.classed("image_smile", true)
								.attr("data-object_id", object_id)
								.classed(object_id, true)
								.style("text-anchor", "middle")
								.style("alignment-baseline", "middle")
								.style("font-family", desctop.font_id)
								.style("font-size",config.desctop_font_size)
								.attr("width", 62)
								.attr("height", 62)
								.attr("x",config.devices[desctop.device_id].width/2-31)
								.attr("y", config.devices[desctop.device_id].height/2-31);
	
	getImageBase64( url, function (data) {
		d3.selectAll(".image_smile."+object_id)
      		.attr("xlink:href", "data:image/png;base64," + data); // replace link by data URI
		
		
		$("#header-menu-item-6").addClass("header-menu-active");
	});
	
	
	var text_width = parseFloat($(".image_smile."+object_id).attr("width"))+text_width_constant;
	var text_height = parseFloat($(".image_smile."+object_id).attr("height"))+text_height_constant;
	
	svg_controls.append("rect")
		.classed("control_smile", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("work", true)
		.attr("id", "control_smile_rect")
		.attr("width", text_width)
		.attr("height", text_height)
		.attr("x", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("y", config.devices[desctop.device_id].height/2-text_height/2)
		
		.call(drag_text);
	//	.on("dblclick", click_text);
	
	console.log(config.devices[desctop.device_id].width/2-text_width/2);
	
	//Растяжение

	
	svg_controls.append("circle")
		.classed("control_smile", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("rotate_button",true)
		.attr("data-rotate", 0)
		.classed("work",true)
		.attr("r", 12.5)
	//	.call(rotate_text)
		.attr("cx", config.devices[desctop.device_id].width/2+text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2);
	
	svg_controls.append("circle")
		.classed("control_smile", true)
		.classed("stretch_button",true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.call(drag_stretch)
		.classed("work",true)
		.attr("r", 12.5)
		.attr("cx", config.devices[desctop.device_id].width/2+text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2+text_height/2);
	
	
	svg_controls.append("circle")
		.classed("control_smile", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("move_button",true)
		.classed("work",true)
		.attr("r", 12.5)
	//	.call(drag_text)
		.attr("cx", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2);
	
	//REMOVE BUTTON
	svg_controls.append("circle")
		.classed("control_smile", true)
		.classed("stretch_button",true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.call(drag_stretch)
		.classed("work",true)
		.attr("r", 12.5)
		.attr("cx", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2+text_height/2);
	
}



function click_text(){
		swal({  
						title: "Вставьте текст",  
						type: "input",  
						showCancelButton: true,   
						closeOnConfirm: true,   
						animation: "slide-from-top",   
						inputPlaceholder: "Write something"
				}, function(inputValue){   

						if (inputValue === false) return false;     
						  
					svg_text.select("text")
								.text(inputValue);
					var text_width = $(".svg_text text").width()+text_width_constant;
					var text_height = $(".svg_text text").height()+text_height_constant;
					
					
					restart_depend();
				});
}

function change_step(obj) {
	$("#steps_controller-next_but").css("visibility", "visible");
	var id = $(obj).data('menuId');
	
	if ($(obj).hasClass('header-menu-selected')) {
		return;
	}
	
	d3.selectAll(".control_text").classed("work", false);
	
	if (id =="1") {
		swal({   
			title: "Вы уверены, что хотите выбрать другой девайс?",   
			text: "Макет нужно будет сделать заново",   
			type: "warning",   showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Да, очистить макет",   
			cancelButtonText: "Отмена",   
			closeOnConfirm: true,   
			closeOnCancel: true 
		}, function(isConfirm){   
		if (isConfirm) {     
			remove_setting(); 
			set_step(obj, id);
		} else {     

		} });
		
	} else {
				
		set_step(obj, id);

		if (id=="4") {
			if ($(".library_font div").length==0) setup_font();
			if ($(".svg_camera").find('image').length==0) set_material_default();
			if (!($(".library_color div").length>0)) {
				setup_colors();
				setup_patterns();
			}
			if ($(".svg_text text").length==0) {
				set_default_text();				
			}
			d3.selectAll(".control_text").classed("work", true);

		}

		if (id=="2") {
			if (!($(".library_check div").length>0)) {
				set_check();
			}
		}

		if (id=="3") {
			
			if ($(".library_font div").length==0) setup_font();
			
			if ($(".svg_camera").find('image').length==0) set_material_default();
			
			if ($(".svg_text text").length==0) {
					set_default_text();	
			}
			
			d3.selectAll(".control_text").classed("work", true);
			

		}
		if (id=="5"){
			if (!($(".library-backgrouds div").length>0)) {
				setup_backgrounds();
			}
			
			if ($(".svg_camera").find('image').length==0) set_material_default();
				
		}
		if (id=="6"){
			$("#steps_controller-next_but").css("visibility", "hidden");
			if ($(".svg_camera").find('image').length==0) set_material_default();
			if (!($("#right-6 .category_buttons div").length>0)) {
				setup_smiles();
			}
		}
	}
}


function set_step(obj, id) {
	$('.header-menu-selected').removeClass('header-menu-selected');
		$(obj).addClass('header-menu-selected');
		$('.right_content_block').hide();
		$('#right-' + id).show();
		$('.info_block').hide();
		$('#info_block-' + id).show();
		$('.device_colors').hide();
		$('#device_colors-' + id).show();
}

function remove_setting() {
	
	
	$("#steps_controller-checkout_but").css("visibility", "hidden");
	$("#header-menu li").removeClass("header-menu-active");
	$("#header-menu-item-1").addClass("header-menu-active");
	
	
	desctop.material_id="";
	desctop.text= config.default_text;
	desctop.font_color_id="";
	desctop.font_pattern_id="";
	
	//Remove
	svg_text.selectAll("text").remove();
	svg_controls.selectAll('rect').remove();
	svg_controls.selectAll('circle').remove();
	svg_background.selectAll("image").remove();
	svg_mask_body.selectAll("rect").remove();
	svg_material_body.selectAll("image").remove();
	svg_camera.selectAll("image").remove();

	//Удаление параметров
	$(".library-background_row").removeClass("library-background_row-selected");
	$(".library-smile_row").removeClass("library-smile_row-selected");
	$(".library-color_row").removeClass("library-color_row-selected");
	$('.library-pattern_row').removeClass('library-pattern_row-selected');
	$("#info_block-5 .icon-close").css("display", "none");
	
	$(".library_check").find("div").remove();
	$(".chech_colors").find("div").remove();
}


function set_material(material_id) {
	
	$("#steps_controller-checkout_but").css("visibility", "visible");
	
	$("#header-menu-item-2").addClass("header-menu-active");
	var id_device = config.devices[desctop.device_id].id;
	desctop.material_id = material_id;		
	
	$(".library-case_row").removeClass("library-case_row-selected");
	$("#library-case_row-"+material_id).addClass("library-case_row-selected");
	set_material_color_default(material_id);
}


function set_material_default() {
	console.log("Ставлю дефолтный чехол");	
	var id_device = config.devices[desctop.device_id].id;
	if (config.materials[id_device].length>1) {
		var breakpoint = true;
		for (value in config.materials[id_device]) {
			console.log(breakpoint);
			if (config.materials[id_device][value].default==true) {
				if (breakpoint==false) {
					console.log("Ошибка, несколько дефолтных чехлов при телефоне" + id_device);
				}else{
					 set_material(value);
					 console.log(value);
					 breakpoint = false;
				}
			}
		}
	}else{
		set_material(0);
	}
}



function set_material_color_default(material_id) {
	
	
	console.log("Cтавлю дефолтный цвет");
	$(".device_colors").find("div").remove();

	var id_device = config.devices[desctop.device_id].id;
	console.log(material_id +" "+  material_id );
	if (config.materials[id_device][material_id].colors.length>1) {
			var breakpoint = true;
			for (value in config.materials[id_device][material_id].colors) {
				var color = config.materials[id_device][material_id].colors[value].color;
				var html_text = '<div data-material_id="'+material_id+'" data-material_color="'+value+'" id ="button_material_color-'+0+'" style="background:'+color+'"></div>';
				
				$(".device_colors").append(html_text);
				
				if (config.materials[id_device][material_id].colors[value].default==true) {
					if (breakpoint==false) {
						console.log("Ошибка, несколько дефолтных чехлов при телефоне" + id_device);
					}else{
					   set_material_color(material_id, value);
					   console.log(config.materials[id_device][material_id].colors[value].color);
					   breakpoint = false;
					}
				}
			}
	}else{
		
		var color = config.materials[id_device][material_id].colors[0].color;
		
		//var html_text = '<div  data-material_id="'+material_id+'" data-material_color="'+0+'" style="background:'+color+'" id ="button_material_color-'+0+'"></div>';
		//$(".device_colors").append(html_text);
		set_material_color(material_id ,0);
	}
}

function set_material_color(material_id, material_color) {
	var id_device = config.devices[desctop.device_id].id;
	
	var color_object = config.materials[id_device][material_id].colors[material_color];

	$(".chech_colors").find("div").removeClass("device_colors-selected");
	
	$("#button_material_color-"+material_color).addClass("device_colors-selected");
	
	svg_mask_container.selectAll("mask").remove();
	svg_material_body.selectAll("image").remove();
	svg_camera.selectAll("image").remove();
	svg_mask_body.selectAll("rect").remove();
	
	
	svg_material_body
		.append("image")
			.attr("width", config.devices[desctop.device_id].width+"px")
			.attr("height", config.devices[desctop.device_id].height+"px")
			//.attr("xlink:href", path + config.devices[desctop.device_id].desctop_img)
			.classed("material_body", true);
	
	
	var path = config.chech_material_path;
		
	
	
	getImageBase64( path+color_object.desctop_img, function (data) {
		d3.select(".material_body")
      		.attr("xlink:href", "data:image/png;base64," + data); // replace link by data URI
	});
	
	svg_mask_container
			.append("mask")
			.attr("id", "mask1")
			.attr("x", "0")
			.attr("y", "0")
			.attr("width", "100%")
			.attr("height", "100%")
				.append("image")
				.classed("mask_image", true)
				.attr("x", "0")
				.attr("y", "0")
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("preserveAspectRatio", "xMidYMid slice");
	
	var path = config.material_mask_path;
	
	getImageBase64(path+color_object.desctop_mask, function (data) {
		d3.select(".mask_image")
      		.attr("xlink:href", "data:image/png;base64," + data); // replace link by data URI
	});
	
	svg_mask_body
		.append("rect")
			.attr("width", config.devices[desctop.device_id].width+"px")
			.attr("height", config.devices[desctop.device_id].height+"px")
			//.attr("xlink:href", path + config.devices[desctop.device_id].desctop_img)
			.classed("mask_body", true)
			.style("fill","#E8E8E8")
			.style("mask","url(#mask1)");
	
	
	var path = config.material_mask_camera;
	
	svg_camera
		.append("image")
			.attr("width", config.devices[desctop.device_id].width+"px")
			.attr("height", config.devices[desctop.device_id].height+"px")
		
			.classed("camera", true);
	
	getImageBase64( path+color_object.desctop_camera, function (data) {
		d3.select(".camera")
      		.attr("xlink:href", "data:image/png;base64," + data); // replace link by data URI
	});
	
	
	console.log(color_object);

}

function set_check() {
	var id_device = config.devices[desctop.device_id].id;
	var lib_path =  config.desctop_material_path;

	for (value in config.materials[id_device]) {	
		
		var html_text = "";
		
		html_text+='<div class="library-case_row" id="library-case_row-'+value+'" data-material-id="'+value+'" style="background-image: url('+lib_path+config.materials[id_device][value].lib_img+');">';
		html_text+='<div class="library-case_row-block-1">'+config.materials[id_device][value].name+'</div>';	
		html_text+='<div class="library-case_row-block-2">'+config.materials[id_device][value].descr_1+'</div>';	
		html_text+='<div class="library-case_row-block-3">'+config.materials[id_device][value].descr_2+'</div>';	
		

		html_text+='</div>';


		$(".library_check").append(html_text);	
	}	
	set_material_default();

}

function set_device(device_id) {
	
	
	$("#header-menu-item-1").addClass("header-menu-active");
	desctop.device_id = parseInt(device_id);
	svg_device.selectAll("image").remove();
	remove_setting();
	
	var path = config.devices_desctop_path;
	
	svg
		.attr("width", config.devices[desctop.device_id].width+"px")
		.attr("height", config.devices[desctop.device_id].height+"px");
	
	svg
		.selectAll("g")
			.attr("width", config.devices[desctop.device_id].width+"px")
			.attr("height", config.devices[desctop.device_id].height+"px");
	svg_device
		.append("image")
			.attr("width", config.devices[desctop.device_id].width+"px")
			.attr("height", config.devices[desctop.device_id].height+"px")
			//.attr("xlink:href", path + config.devices[desctop.device_id].desctop_img)
			.classed("device_image", true);
	

	//Магия в base64
	getImageBase64(path + config.devices[desctop.device_id].desctop_img, function (data) {
		d3.select(".device_image")
      		.attr("xlink:href", "data:image/png;base64," + data); // replace link by data URI
	});
		
	$('.library-device_row').removeClass('library-device_row-selected');
	$('#library-device_row-' + device_id).addClass('library-device_row-selected');
	
	//$('#device').css('background-image', 'url(' + config.devices_desctop_path + config.devices[device_id].desctop_img + ')');
}


function set_smile(smile_id) {
	var url = d3.select("#library-smile_row-"+smile_id).attr("data-url");
	
	set_smiles_image(url)
	
	$(".library-smile_row").removeClass("library-smile_row-selected");
	$("#library-smile_row-"+smile_id).addClass("library-smile_row-selected");
}


function set_bg(bg_id) {
	desctop.bg_id = bg_id;
	var url = d3.select("#library-background_row-"+bg_id).attr("data-url");
	svg_background.selectAll("image").remove();

	svg_background
		.append("image")
			.attr("width", config.devices[desctop.device_id].width+"px")
			.attr("height", config.devices[desctop.device_id].height+"px")
			//.attr("xlink:href", path + config.devices[desctop.device_id].desctop_img)
			.classed("device_background", true);
	
	getImageBase64( url, function (data) {
		d3.select(".device_background")
			.attr("preserveAspectRatio", "xMidYMid slice")
      		.attr("xlink:href", "data:image/png;base64," + data); // replace link by data URI
	});
	$(".library-background_row").removeClass("library-background_row-selected");
	$("#library-background_row-"+bg_id).addClass("library-background_row-selected");
	$("#info_block-5 .icon-close").css("display", "block");
	
	//Append mask and camera
	//required data
	$("#header-menu-item-5").addClass("header-menu-active");
		
}



function set_font(font_id) {

	desctop.font_id = d3.select("#library-font_row-"+font_id).attr("data-font");
	
	var url = d3.select("#library-font_row-"+font_id).attr("data-font_url");
	
	
	console.log(url);
	
	
	svg_fonts_container.selectAll("font-face").remove();
	svg_fonts_container
		.append("font-face")
			.attr("font-family", desctop.font_id)
				  .append("font-face-src")
				  	.append("font-face-uri")
				  		.classed("this_is_font",true);


	
		getImageBase64( url, function (data) {
			d3.selectAll(".this_is_font")
				.attr("xlink:href", "data:font/ttf;base64," + data); // replace link by data URI
		});
	
	
		
		$("#header-menu-item-6").addClass("header-menu-active");
	
	
	
	svg_text.select("text")
		.style("font-family", desctop.font_id);

	$('.library-font_row').removeClass('library-font_row-selected');
	$('#library-font_row-' + font_id).addClass('library-font_row-selected');
	restart_depend();
}



function set_font_color(color_id,color) {
	$("#header-menu-item-4").addClass("header-menu-active");
	svg_text.selectAll("text").style("fill",color);
	$(".library-color_row").removeClass("library-color_row-selected");
	$('.library-pattern_row').removeClass('library-pattern_row-selected');
	$("#library-color_row-"+color_id).addClass("library-color_row-selected");
}

function set_font_pattern(font_pattern_id) {
	$("#header-menu-item-4").addClass("header-menu-active");

	desctop.font_pattern_id = font_pattern_id;
	
	var url = d3.select('#library-pattern_row-' + font_pattern_id).attr("data-url");
	
	svg_mask_container.selectAll("pattern").remove();
	
	svg_mask_container.append("pattern")
			.attr("id", "wood")
			.attr("patternUnits", "userSpaceOnUse")
			.attr("width", "100%")
			.attr("height", "100%")
				.append("image")
					.attr("width", "100%")
					.attr("height", "100%")
					.classed("pattern_image", true)
					.attr("x", "0")
					.attr("y", "0")
					.attr("preserveAspectRatio", "xMidYMid slice");
	
	
	getImageBase64(url, function (data) {
		d3.select(".pattern_image")
      		.attr("xlink:href", "data:image/png;base64," + data); // replace link by data URI
	});
	
	svg_text.selectAll("text").style("fill","url(#wood)");
	
	$('.library-color_row').removeClass('library-color_row-selected');

	
	$(".library-color_row").removeClass("library-color_row-selected");
	$('.library-pattern_row').removeClass('library-pattern_row-selected');
	$('#library-pattern_row-' + font_pattern_id).addClass('library-pattern_row-selected');
}






// это в base 64

var converterEngine = function (input) { // fn BLOB => Binary => Base64 ?
    var uInt8Array = new Uint8Array(input),
        i = uInt8Array.length;
    var biStr = []; //new Array(i);
    while (i--) {
        biStr[i] = String.fromCharCode(uInt8Array[i]);
    }
    var base64 = window.btoa(biStr.join(''));
   
    return base64;
};

var getImageBase64 = function (url, callback) {
    // 1. Loading file from url:
    var xhr = new XMLHttpRequest(url);
    xhr.open('GET', url, true); // url is the url of a PNG image.
    xhr.responseType = 'arraybuffer';
    xhr.callback = callback;
    xhr.onload = function (e) {
        if (this.status == 200) { // 2. When loaded, do:
            var imgBase64 = converterEngine(this.response); // convert BLOB to base64
            this.callback(imgBase64); //execute callback function with data
        }
    };
    xhr.send();
};




function save_image() {
	
	$(".svg_controls").css("display","none");
	
	
	
	/*
	html2canvas(document.body, {
		  onrendered: function(canvas) {
			document.body.appendChild(canvas);
		  }
	});
	*/
	
	
			
	
	
	
	var svg = document.querySelector("svg");
	var svgData = new XMLSerializer().serializeToString( svg );

	var canvas = document.createElement( "canvas" );

	canvas.width = $("#device").width();
	canvas.height = $("#device").height();
	
	var ctx = canvas.getContext( "2d" );
	
	
	

	var img = document.createElement("img");
	
	img.setAttribute( "src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));

	
	$("body").append(img);
	
	
	img.onload = function() {


					ctx.drawImage( img, 0, 0 );
		// Now is done
			
		
		$.ajax({ 
			type: "POST", 
			url: location.href+"save_png.php",
			dataType: 'text',
			data: {
				image : canvas.toDataURL("image/png" )
			},
			success: function(data){
				sweetAlert("Успешно", data, "success");
			},
			fail: function(data){
				sweetAlert("Ошибка", data, "error");
			}
		});
		
		$("body").append(img);
		$(".svg_controls").css("display","block");

			
			

	};
}


function get_angle(center, point){ 
	var x = point.x - center.x; 
	var y = point.y - center.y; 
	if(x==0) return (y>0) ? 180 : 0; 
	var a = Math.atan(y/x)*180/Math.PI; 
	a = (x > 0) ? a+90 : a+270; 
	return a; 
}

var rotate, prev_rotate, center;
var rotate_text =  d3.behavior.drag() 					
					.on('dragstart', function() {	
						d3.event.sourceEvent.stopPropagation();
						
						newx = parseFloat(d3.select(this).attr("cx"));
						newy = parseFloat(d3.select(this).attr("cy"));
						
						rotate = d3.select(this).attr("data-rotate");
						
						icon_scale = 1;
						
						var M = d3.mouse(svg_text.node());
								prevx = M[0];
								prevy = M[1];
						
						var point = {
							x: newx,
							y: newy
						};
						
						center = {
							x: parseFloat(d3.select(".svg_text text").attr("x")),
							y: parseFloat(d3.select(".svg_text text").attr("y"))
						};
						
						
						prev_rotate = get_angle(center, point);
						
						console.log(prev_rotate);
					
					})
					.on('drag', function() {	
						
						var M = d3.mouse(svg_controls.node());

						newx = parseFloat(d3.select(this).attr("cx"));
						newy = parseFloat(d3.select(this).attr("cy"));
						
						var point = {
							x: M[0],
							y: M[1]
						};
						

						var rotate_angle = get_angle(center, point);
						
						rotate = (rotate_angle-prev_rotate);
							
						d3.select(this).attr("data-rotate", rotate);
						
						console.log(rotate);
						
					/*
						//alert(icon_scale);
				 		var width_element = d3.select(this).attr("width");
				 		var height_element = d3.select(this).attr("height");

				 		if ((d3.event.x<0)|| (d3.event.y<0) || (d3.event.x>(svg_width)) || (d3.event.y>(svg_height))) {
							return;	 
						}
					
					*/
						
					
						
						d3.selectAll(".svg_text text, .svg_controls .control_text")
                                         .attr("transform", "rotate("+rotate+","+center.x+","+center.y+")translate("+(-center.x*(icon_scale-1))+", "+(-center.y*(icon_scale-1))+")scale("+icon_scale+")"); 

					})
					.on('dragend', function() {
						
					});




var icon_scale = 1;
var rotate_x;
var rotate_y;


var drag_text =  d3.behavior.drag() 					
					.on('dragstart', function() {	
						d3.event.sourceEvent.stopPropagation();
						
				
							newx = parseFloat(d3.select(this).attr("cx"));
							newy = parseFloat(d3.select(this).attr("cy"));
						
						
						
						d3.event.sourceEvent.stopPropagation();
						rotate = d3.select(".control_text.rotate_button").attr("data-rotate");
						
						d3.selectAll(".svg_text text, .svg_controls rect.control_text").each(function (d) {
   							 d3.select(this)
								 .attr("data-prevx", parseFloat(d3.select(this).attr("x")))
							 	 .attr("data-prevy", parseFloat(d3.select(this).attr("y")));
 						});
					
						d3.selectAll("circle.control_text").each(function (d) {
							d3.select(this)
								 .attr("data-prevx", parseFloat(d3.select(this).attr("cx")))
							 	 .attr("data-prevy", parseFloat(d3.select(this).attr("cy")));	
						});
						var M = d3.mouse(svg_text.node());
						prevx = M[0];
						prevy = M[1];
						
					})
					.on('drag', function() {
											
						var dx = (newx+(d3.event.x-prevx));
						var dy = (newy+(d3.event.y-prevy));
						
						var deltax = dx - newx;
							
						var deltay = dy - newy;
						
						
						d3.selectAll(".svg_text text").each(function (d) {
							d3.select(this)
								 .attr("x", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("y", parseFloat(d3.select(this).attr("data-prevy"))+deltay);
								
							rotate_x = parseFloat(d3.select(this).attr("data-prevx"))+deltax;
							rotate_y = parseFloat(d3.select(this).attr("data-prevy"))+deltay;
							
							d3.select(this)
								.attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); 
 						});
					
						if (check_coords()===false) {
							/*
							rotate_x = parseFloat(d3.select(".svg_text text").attr("data-prevx_check"));
							rotate_y = parseFloat(d3.select(".svg_text text").attr("data-prevy_check"));
							
							d3.select(".svg_text text")
								.attr('x',rotate_x)
								.attr('y',rotate_x)
								.attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); 
							*/
							console.log("ok");
							return;
							
						}
					
						
						d3.selectAll(".svg_text text")
							 .attr("data-prevx_check", rotate_x)
						 	 .attr("data-prevy_check", rotate_y)
							 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); ;

						
						d3.selectAll(".svg_controls rect.control_text").each(function (d) {
   							 d3.select(this)
							 	 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")")
								 .attr("x", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("y", parseFloat(d3.select(this).attr("data-prevy"))+deltay);
 						});
					
						
						d3.selectAll("circle.control_text").each(function (d) {
							d3.select(this)
								 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")")
								 .attr("cx", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("cy", parseFloat(d3.select(this).attr("data-prevy"))+deltay);	
						});
						
						
					})
					.on('dragend', function() {
						
					});

var drag_rect =  d3.behavior.drag() 					
					.on('dragstart', function() {	
						d3.event.sourceEvent.stopPropagation();
						
				
							newx = parseFloat(d3.select(this).attr("x"));
							newy = parseFloat(d3.select(this).attr("y"));
						
						
						
						d3.event.sourceEvent.stopPropagation();
						rotate = d3.select(".control_text.rotate_button").attr("data-rotate");
						
						d3.selectAll(".svg_text text, .svg_controls rect.control_text").each(function (d) {
   							 d3.select(this)
								 .attr("data-prevx", parseFloat(d3.select(this).attr("x")))
							 	 .attr("data-prevy", parseFloat(d3.select(this).attr("y")));
 						});
					
						d3.selectAll("circle.control_text").each(function (d) {
							d3.select(this)
								 .attr("data-prevx", parseFloat(d3.select(this).attr("cx")))
							 	 .attr("data-prevy", parseFloat(d3.select(this).attr("cy")));	
						});
						var M = d3.mouse(svg_text.node());
						prevx = M[0];
						prevy = M[1];
						
					})
					.on('drag', function() {
											
						var dx = (newx+(d3.event.x-prevx));
						var dy = (newy+(d3.event.y-prevy));
						
						var deltax = dx - newx;
							
						var deltay = dy - newy;
						
						
						d3.selectAll(".svg_text text").each(function (d) {
							d3.select(this)
								 .attr("x", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("y", parseFloat(d3.select(this).attr("data-prevy"))+deltay);
								
							rotate_x = parseFloat(d3.select(this).attr("data-prevx"))+deltax;
							rotate_y = parseFloat(d3.select(this).attr("data-prevy"))+deltay;
							
							d3.select(this)
								.attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); 
 						});
					
						
					
						
						d3.selectAll(".svg_text text")
							 .attr("data-prevx_check", rotate_x)
						 	 .attr("data-prevy_check", rotate_y)
							 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); ;

						
						d3.selectAll(".svg_controls rect.control_text").each(function (d) {
   							 d3.select(this)
							 	 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")")
								 .attr("x", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("y", parseFloat(d3.select(this).attr("data-prevy"))+deltay);
 						});
					
						
						d3.selectAll("circle.control_text").each(function (d) {
							d3.select(this)
								 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")")
								 .attr("cx", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("cy", parseFloat(d3.select(this).attr("data-prevy"))+deltay);	
						});
						
						
					})
					.on('dragend', function() {
						
					});

function check_coords(){
	var coords = screenCoordsForRect(document.getElementById("control_text_rect"));	
	console.log(coords);
	
	var coord_screen = document.getElementById("device").getBoundingClientRect();
	
	coords.nw.x-=coord_screen.left;
	coords.ne.x-=coord_screen.left;
	coords.se.x-=coord_screen.left;
	coords.sw.x-=coord_screen.left;
	
	coords.nw.y-=coord_screen.top;
	coords.ne.y-=coord_screen.top;
	coords.se.y-=coord_screen.top;
	coords.sw.y-=coord_screen.top;
	
	
	//console.log(coord_screen.left);
	
	if (((coords.nw.x-5)<0) || ((coords.nw.y-5)<0)) {console.log("nw");  return false;}
	
	if (((coords.ne.x+5)>config.devices[desctop.device_id].width) || ((coords.nw.y-5)<0)) {console.log("ne");  return false;}
	
	if (((coords.sw.x-5)<0) || ((coords.sw.y+5)>config.devices[desctop.device_id].height)) {console.log("sw");  return false;}
	
	if (((coords.se.x+5)>config.devices[desctop.device_id].width) || ((coords.se.y+5)>config.devices[desctop.device_id].height)) {console.log("sw");  return false;}
	
	return true;
}

var svg = document.querySelector('svg');
var pt  = svg.createSVGPoint();
function screenCoordsForRect(rect){
  var corners = {};
  var matrix  = rect.getScreenCTM();
	

  pt.x = rect.x.animVal.value;
  pt.y = rect.y.animVal.value;

  corners.nw = pt.matrixTransform(matrix);
  pt.x += rect.width.animVal.value;
  corners.ne = pt.matrixTransform(matrix);
  pt.y += rect.height.animVal.value;
  corners.se = pt.matrixTransform(matrix);
  pt.x -= rect.width.animVal.value;
  corners.sw = pt.matrixTransform(matrix);
  return corners;
}

var drag_stretch =  d3.behavior.drag() 					
					.on('dragstart', function() {	
						d3.event.sourceEvent.stopPropagation();
						newx = parseFloat(d3.select(this).attr("cx"));
						newy = parseFloat(d3.select(this).attr("cy"));
						d3.event.sourceEvent.stopPropagation();
						d3.selectAll(".svg_text text")
							.attr("data-font_size", parseInt(d3.selectAll(".svg_text text").style("font-size")));
						//	.style("font-size", config.desctop_font_size)
						rotate = d3.select(".control_text.rotate_button").attr("data-rotate");
						
						var M = d3.mouse(svg_text.node());
						prevx = M[0];
						prevy = M[1];
						
					})
					.on('drag', function() {
						
						var dx = (newx+(d3.event.x-prevx));
						var dy = (newy+(d3.event.y-prevy));
						
						
						var deltax = dx - newx;
							
						var deltay = dy - newy;
						
						console.log(parseInt(d3.selectAll(".svg_text text")
							.style("font-size")));
						
						if ((parseInt(d3.select(".svg_text text").attr("data-font_size"))-deltay)<10) return;
						d3.selectAll(".svg_text text")
							.style("font-size", parseInt(d3.select(".svg_text text").attr("data-font_size"))-deltay);
						restart_depend();
					})
					.on('dragend', function() {
						
					});

function restart_depend() {
	
	var text_width = $(".svg_text text").width()+text_width_constant;
	var text_height = $(".svg_text text").height()+text_height_constant;
	
	var text_x = parseFloat(d3.select(".svg_text text").attr("x"));
	var text_y =parseFloat(d3.select(".svg_text text").attr("y"));
	
	svg_controls.select("rect.control_text")
	
		.attr("width", text_width)
		.attr("height", text_height)
		.attr("x", text_x-text_width/2)
		.attr("y",text_y-text_height/2-5);
		
	
	
	d3.select(".control_text.stretch_button")
		.attr("cx", text_x-text_width/2)
		.attr("cy",  text_y-text_height/2-5);
	
	
	d3.select(".control_text.rotate_button")
		.attr("cx", text_x+text_width/2)
		.attr("cy",  text_y-text_height/2-5);
	
	
	d3.select(".control_text.move_button")
		.attr("cx", text_x)
		.attr("cy",  text_y-text_height/2-5);
	
}



var randomHash = (function () {
    var letters = 'qwertyuiopasdfghk';
    return function (len) {
        var result = '';
        for (var i=0; i <  len; i++) {
            result += letters[Math.floor(Math.random() * letters.length)];
        };
        return result;
    };
})();



//SVG DOM injection


