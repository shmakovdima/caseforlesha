var canvas, devices_desctop_img_obj, desctop_text, devices_desctop_bg_obj;

var default_devices_id="";

//var this_object = randomHash(10);


var newx, prevx;
var newy, prevy;

current_smile = "";

//d3 global
var g_texts , g_smiles, svg, svg_mask_container, svg_device, svg_material_body, svg_background, svg_text, svg_smiles ,svg_mask_body,  svg_camera;


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
	
	svg = d3.select(".center_device_svg");

	svg_controls_svg = d3.select(".controls_device_svg");
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


	svg_controls  = svg_controls_svg .append("g")
			.classed("svg_controls", true);

	g_texts = svg_controls
				.append("g")
					.classed("g_texts", true);

	g_smiles = svg_controls.append("g")
					.classed("g_smiles", true);
	
	steps.push(cur_step);
	object_id = randomHash(10);
	desctop.text = config.default_text;
}

function setup_patterns() {
	
	for(value in config.paterns) {	
			var small = config.patterns_path_small+config.paterns[value].small;
			var big = config.patterns_path_big+config.paterns[value].big;
	
			if (value == 0) {
				var html_text="";
				 html_text+='<div class="library-pattern_row library-pattern_row-first" style="background: url('+small+');" data-url="'+big+'" data-font-pattern-id="'+value+'" id="library-pattern_row-'+value+'"></div>';
			}else{
				if(((value) % 5) == 0) {
				
					html_text="";
					html_text+='<div class="library-pattern_row library-pattern_row-first" style="background: url('+small+');" data-url="'+big+'" data-font-pattern-id="'+value+'" id="library-pattern_row-'+value+'"></div>';
				}else{
					if(((value) % 5) == 4) {
					
						html_text="";
						html_text+='<div class="library-pattern_row library-pattern_row-last" style="background: url('+small+');" data-url="'+big+'" data-font-pattern-id="'+value+'" id="library-pattern_row-'+value+'"></div>';
					}else{
					
						html_text="";
						html_text+='<div class="library-pattern_row " style="background: url('+small+');" data-url="'+big+'" data-font-pattern-id="'+value+'" id="library-pattern_row-'+value+'"></div>';
					}
					
				}
			}
		$(".library_pattern").append(html_text);
	}
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});	
}


function setup_font() {
		
	var path = config.desctop_font_path;
	for (value in config.fonts) {
		var html_text = "";
		if (config.fonts[value].default == true){               
			desctop.font_id = config.fonts[value].name;
		
			html_text+='<div class="library-font_row library-font_row-selected"  data-font_url = "'+config.fonts[value].filename+'" data-font="'+config.fonts[value].name+'" style="font-family: '+config.fonts[value].name+';" data-font-id="'+value+'" id="library-font_row-'+value+'">'+config.fonts[value].name+'</div>';
		}else{
			html_text+='<div class="library-font_row"  data-font_url = "'+config.fonts[value].filename+'" data-font="'+config.fonts[value].name+'" style="font-family: '+config.fonts[value].name+';" data-font-id="'+value+'" id="library-font_row-'+value+'">'+config.fonts[value].name+'</div>';
		}
	
		$(".library_font").append(html_text);


			/*	 <font-face font-family="Waltograph">
							  <font-face-src>
								<font-face-url></font-face-url>
							  </font-face-src>
    					</font-face> */
	}
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});
}





function setup_smiles(){
	var smiles = config.smiles;	
	var desctop_bg_path = config.smiles_path;
	
	for (value in smiles) {	
			
		
			var html_text="";

			var path = desctop_bg_path + smiles[value].link;

			category = smiles[value]["images"];
		
			
		
			if (value==0) {
			
				html_text+='<div class="library_6  library-smiles" id="library_smiles-'+value+'">';
				
			}else{
				html_text="";
				html_text+='<div class="library_6  library-smiles" id="library_smiles-'+value+'" style="display: none;">';	
			}
			
			html_text+='<div class="library_in">';
		
		
			for(value1 in category) {
			
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
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

	
}



function setup_backgrounds() {
	
	var backgrounds = config.backgrounds;
	
	var desctop_bg_path = config.desctop_bg_path;
	
	
	for (value in backgrounds) {	
			
		
			var html_text="";

			var path = desctop_bg_path + backgrounds[value].link;

			category = backgrounds[value][0];
		
		
			if (value==0) {
				
				html_text+='<div class="library_5  library-backgrouds" id="library_backgrouds-'+value+'">';
				
			}else{
				html_text="";
				html_text+='<div class="library_5  library-backgrouds" id="library_backgrouds-'+value+'" style="display: none;">';	
			}
			
			html_text+='<div class="library_in">';
		
		
			for(value1 in category) {
				
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
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

}

function setup_colors() {
	
	for( value in config.colors) {	
			
		var html_text="";

		if (value == 0) {
			html_text="";
			 html_text+='<div class="library-color_row library-color_row-first" data-color="'+config.colors[value][0]+'" data-color_id="'+value+'" style="background: '+config.colors[value][0]+';" id="library-color_row-'+value+'"></div>';
		
		}else{
				if((value % 10) == 9) {
				
					html_text="";
					html_text+='<div class="library-color_row library-color_row-last" data-color_id="'+value+'" data-color="'+config.colors[value][0]+'" style="background: '+config.colors[value][0]+';" id="library-color_row-'+value+'"></div>';
				}else{
					if((value % 10) == 0) {
						
						html_text="";
						 html_text+='<div class="library-color_row library-color_row-first" data-color_id="'+value+'" data-color="'+config.colors[value][0]+'" style="background: '+config.colors[value][0]+';" id="library-color_row-'+value+'"></div>';
					}else{
						
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
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});
}

function set_default_text(){
	svg_text.append("text")
								.text(desctop.text)
								.style("text-anchor", "middle")
								.style("alignment-baseline", "middle")
								.style("font-family", desctop.font_id)
								.style("font-size",config.desctop_font_size+"px")
								.attr("x",config.devices[desctop.device_id].width/2)
								.attr("y", config.devices[desctop.device_id].height/2)
								.on("click", click_text_control);
		
	var text_width = $(".svg_text text").width()+text_width_constant;
	var text_height = $(".svg_text text").height()+text_height_constant;
	
	g_texts.append("rect")
		.classed("control_text", true)
		.classed("work", true)
		.attr("id", "control_text_rect")
		.attr("width", text_width)
		.attr("height", text_height)
		.attr("x", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("y", config.devices[desctop.device_id].height/2-text_height/2-5)
		.call(drag_rect)
		.on('click', click_text_control)
		.on("dblclick", click_text);

	g_texts.append("rect")
		.classed("control_text", true)
		.classed("doubled_rect", true)
		.classed("work", true)
		.attr("id", "control_text_rect_appered")
		.attr("width", text_width-6)
		.attr("height", text_height-6)
		.attr("x", config.devices[desctop.device_id].width/2-text_width/2+3)
		.attr("y", config.devices[desctop.device_id].height/2-text_height/2-5+3)
		.call(drag_rect)
		.on('click', click_text_control)
		.on("dblclick", click_text);


	
	//Растяжение
	g_texts.append("circle")
		.classed("control_text", true)
		.classed("stretch_button",true)
		.call(drag_stretch)
		.classed("work",true)
		.attr("r", 12.5)
		.attr("cx", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2-5);
	
	g_texts.append("circle")
		.classed("control_text", true)
		.classed("rotate_button",true)
		.attr("data-rotate", 0)
		.classed("work",true)
		.attr("r", 12.5)
		.call(rotate_text)
		.attr("cx", config.devices[desctop.device_id].width/2+text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2-5);
	
	g_texts.append("circle")
		.classed("control_text", true)
		.classed("move_button",true)
		.classed("work",true)
		.attr("r", 12.5)
		.call(drag_text)
		.attr("cx", config.devices[desctop.device_id].width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2-5);
	
	
	
	$("#header-menu-item-3").addClass("header-menu-active");
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

	//svg_controls.append("image").
}


function set_smiles_image(url) {
		
	object_id = randomHash(10);

	svg_smiles.append("image")
								.classed("image_smile", true)
								.attr("data-object_id", object_id)
								.classed(object_id, true)
								.attr("id",object_id )
								.attr("width", 62)
								.attr("height", 62)
								.attr("x",config.devices[desctop.device_id].width/2-31)
								.attr("y", config.devices[desctop.device_id].height/2-31);
	
	getImageBase64( url, function (data) {
		d3.selectAll(".image_smile."+object_id)
      		.attr("xlink:href", "data:image/png;base64," + data); // replace link by data URI
		$("#header-menu-item-6").addClass("header-menu-active");
	});
	
	d3.selectAll('.control_smile').classed("work",false);
	
	var text_width = parseFloat($(".image_smile."+object_id).attr("width"))+text_width_constant;
	var text_height = parseFloat($(".image_smile."+object_id).attr("height"))+text_height_constant;
	
	g_smiles.append("rect")
		.classed("control_smile", true)
		.classed("control_smile_main", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("work", true)
		.attr("id", "control_smile_rect")
		.attr("width", text_width)
		.attr("height", text_height)
		.attr("x", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("y", config.devices[desctop.device_id].height/2-text_height/2)
		.on("click", control_smile_click)
		.call(drag_smile_rect);

	g_smiles.append("rect")
		.classed("control_smile", true)
		.classed("control_smile_back", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("work", true)
		.attr("id", "control_smile_rect")
		.attr("width", text_width-6)
		.attr("height", text_height-6)
		.attr("x", config.devices[desctop.device_id].width/2-text_width/2+3)
		.attr("y", config.devices[desctop.device_id].height/2-text_height/2+3)
		.on("click", control_smile_click)
		.call(drag_smile_rect);
	//	.on("dblclick", click_text);
	
	
	
	//Растяжение

	
	g_smiles.append("circle")
		.classed("control_smile", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("rotate_button",true)
		.attr("data-rotate", 0)
		.classed("work",true)
		.attr("r", 12.5)
		.call(rotate_smile)
		.attr("cx", config.devices[desctop.device_id].width/2+text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2);
	
	g_smiles.append("circle")
		.classed("control_smile", true)
		.classed("stretch_button",true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.call(drag_stretch_smile)
		.classed("work",true)
		.attr("r", 12.5)
		.attr("cx", config.devices[desctop.device_id].width/2+text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2+text_height/2);
	
	
	g_smiles.append("circle")
		.classed("control_smile", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("move_button",true)
		.classed("work",true)
		.attr("r", 12.5)
		.call(drag_smile)
		.attr("cx", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2);
	
	//REMOVE BUTTON
	g_smiles.append("circle")
		.classed("control_smile", true)
		.classed("delete_button",true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.on("click", delete_smile)
		.classed("work",true)
		.attr("r", 12.5)
		.attr("cx", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2+text_height/2);
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

}

function click_text_control(){
	d3.selectAll(".control_text").classed("work", true);
}

function control_smile_click(){
	d3.selectAll(".control_smile").classed("work", false);
	var current_smile = d3.select(this).attr("data-object_id");
	console.log(current_smile);
	d3.selectAll(".control_smile."+current_smile).classed("work", true);
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

	$(".g_texts").css("display", "none");
	$(".g_smiles").css("display", "none");
	
	if ($(obj).hasClass('header-menu-selected')) {
		return;
	}
	
	d3.selectAll(".control_text").classed("work", false);
	d3.selectAll(".control_smile").classed("work", false);
	
	if (id =="1") {
		swal({   
			title: "Вы уверены, что хотите выбрать другой девайс?",   
			text: "Макет нужно будет сделать заново",   
			type: "warning",   showCancelButton: true,   
			confirmButtonColor: "#669AC4",   
			confirmButtonText: "Да",   
			cancelButtonText: "Нет",   
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
			$(".g_texts").css("display", "block");
			d3.selectAll(".control_text").classed("work", true);
		}
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
			$(".g_texts").css("display", "block");
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
			$(".g_smiles").css("display", "block");

		}
	}
}


function set_step(obj, id) {

	if ($(".alert_out_svg").hasClass("active")) return;

	$('.header-menu-selected').removeClass('header-menu-selected');
		$(obj).addClass('header-menu-selected');
		$('.right_content_block').hide();
		$('#right-' + id).show();
		$('.info_block').hide();
		$('#info_block-' + id).show();
		$('.device_colors').hide();
		$('#device_colors-' + id).show();
		$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

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
	svg_smiles.selectAll("image").remove();
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
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

}


function set_material_default() {
	console.log("Ставлю дефолтный чехол");	
	var id_device = config.devices[desctop.device_id].id;
	if (config.materials[id_device].length>1) {
		var breakpoint = true;
		for (value in config.materials[id_device]) {
	
			if (config.materials[id_device][value].default==true) {
				if (breakpoint==false) {
					console.log("Ошибка, несколько дефолтных чехлов при телефоне" + id_device);
				}else{
					 set_material(value);
					
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
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

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
	
	
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

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
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});


}

function set_device(device_id) {
	
	
	$("#header-menu-item-1").addClass("header-menu-active");
	desctop.device_id = parseInt(device_id);
	svg_device.selectAll("image").remove();
	remove_setting();
	
	var path = config.devices_desctop_path;
	
	d3.selectAll("svg")
		.attr("width", config.devices[desctop.device_id].width+"px")
		.attr("height", config.devices[desctop.device_id].height+"px");
	
	d3.selectAll("svg")
		.selectAll("g")
			.attr("width", config.devices[desctop.device_id].width+"px")
			.attr("height", config.devices[desctop.device_id].height+"px");
	svg_device
		.append("image")
			.attr("width", config.devices[desctop.device_id].width+"px")
			.attr("height", config.devices[desctop.device_id].height+"px")
			.attr("xlink:href", path + config.devices[desctop.device_id].desctop_img)
			.classed("device_image", true);
	
	svg_controls_svg.style("margin-top", "-"+config.devices[desctop.device_id].height+"px" )

	//Магия в base64
	getImageBase64(path + config.devices[desctop.device_id].desctop_img, function (data) {
		d3.select(".device_image")
      		.attr("xlink:href", "data:image/png;base64," + data); // replace link by data URI
	});
		
	$('.library-device_row').removeClass('library-device_row-selected');
	$('#library-device_row-' + device_id).addClass('library-device_row-selected');
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

	//$('#device').css('background-image', 'url(' + config.devices_desctop_path + config.devices[device_id].desctop_img + ')');
}


function set_smile(smile_id) {
	var url = d3.select("#library-smile_row-"+smile_id).attr("data-url");
	
	set_smiles_image(url)
	
	$(".library-smile_row").removeClass("library-smile_row-selected");
	$("#library-smile_row-"+smile_id).addClass("library-smile_row-selected");
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

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
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

		
}



function set_font(font_id) {

	desctop.font_id = d3.select("#library-font_row-"+font_id).attr("data-font");
	
	var url = d3.select("#library-font_row-"+font_id).attr("data-font_url");
	
	

	
	svg_fonts_container.selectAll("font-face").remove();
	svg_fonts_container
		.append("font-face")
			.attr("font-family", desctop.font_id)
				  .append("font-face-src")
				  	.append("font-face-uri")
				  		.classed("this_is_font",true)
				  			.attr("xlink:href", url);

				  				/*
	
		getImageBase64( url, function (data) {
			d3.selectAll(".this_is_font")
				.attr("xlink:href", "data:font/ttf;base64," + data); // replace link by data URI
		});
		*/
	
		
		$("#header-menu-item-6").addClass("header-menu-active");
	
	
	
	svg_text.select("text")
		.style("font-family", desctop.font_id);

	$('.library-font_row').removeClass('library-font_row-selected');
	$('#library-font_row-' + font_id).addClass('library-font_row-selected');
	restart_depend();
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

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

	rotate = parseFloat(d3.select(".control_text.rotate_button").attr("data-rotate"));
	console.log(rotate);
	
	center = {
							x: parseFloat(d3.select(".svg_text text").attr("x")),
							y: parseFloat(d3.select(".svg_text text").attr("y"))
	};

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
					.attr("preserveAspectRatio", "xMidYMid slice")
					.attr("transform", "rotate("+(-rotate)+","+center.x+","+center.y+")translate("+(-center.x*(icon_scale-1))+", "+(-center.y*(icon_scale-1))+")scale("+icon_scale+")"); 
	
	getImageBase64(url, function (data) {
		d3.select(".pattern_image")
      		.attr("xlink:href", "data:image/png;base64," + data); // replace link by data URI
	});
	
	svg_text.selectAll("text").style("fill","url(#wood)");
	
	$('.library-color_row').removeClass('library-color_row-selected');

	
	$(".library-color_row").removeClass("library-color_row-selected");
	$('.library-pattern_row').removeClass('library-pattern_row-selected');
	$('#library-pattern_row-' + font_pattern_id).addClass('library-pattern_row-selected');
	$('.library, .library_2, .library_3, .library_4, .library_5, .library_6').perfectScrollbar({wheelSpeed: 30, wheelPropagation: false, minScrollbarLength: 1});

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

var smile_width, smile_height;

var rotate_smile = d3.behavior.drag() 					
					.on('dragstart', function() {
						d3.event.sourceEvent.stopPropagation();

						current_smile = d3.select(this).attr("data-object_id");

						d3.selectAll(".control_smile."+current_smile).classed("work", true);	

						newx = parseFloat(d3.select(this).attr("cx"));
						newy = parseFloat(d3.select(this).attr("cy"));

						smile_width =  parseFloat($(".image_smile."+current_smile).attr("width"));
						smile_height =  parseFloat($(".image_smile."+current_smile).attr("height"));

						console.log(smile_width);

						rotate = d3.select(this).attr("data-rotate");
						
						icon_scale = 1;

						var M = d3.mouse(svg_smiles.node());
								prevx = M[0];
								prevy = M[1];

						var point = {
							x: newx,
							y: newy
						};

						center = {
							x: (parseFloat(d3.select("image.image_smile."+current_smile).attr("x")) + smile_width/2) ,
							y: (parseFloat(d3.select("image.image_smile."+current_smile).attr("y")) + smile_height/2)
						};


						prev_rotate = get_angle(center, point);


					})
					.on('drag', function() {	
						svg_width = config.devices[desctop.device_id].width;
						svg_height = config.devices[desctop.device_id].width;

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
									
						d3.selectAll("image.image_smile."+current_smile+", .svg_controls .control_smile."+current_smile)
                                         .attr("transform", "rotate("+rotate+","+center.x+","+center.y+")translate("+(-center.x*(icon_scale-1))+", "+(-center.y*(icon_scale-1))+")scale("+icon_scale+")"); 

					})
					.on('dragend', function() {
						
					});

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
						
					
					
					})
					.on('drag', function() {	
						
						svg_width = config.devices[desctop.device_id].width;
						svg_height = config.devices[desctop.device_id].width;

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
			
						
						check_alert();

						
						d3.selectAll(".svg_text text, .svg_controls .control_text")
                                         .attr("transform", "rotate("+rotate+","+center.x+","+center.y+")translate("+(-center.x*(icon_scale-1))+", "+(-center.y*(icon_scale-1))+")scale("+icon_scale+")"); 

						d3.select(this).attr("data-rotate", rotate);

						d3.select("#wood image")
							 .attr("transform", "rotate("+(-rotate)+","+center.x+","+center.y+")translate("+(-center.x*(icon_scale-1))+", "+(-center.y*(icon_scale-1))+")scale("+icon_scale+")"); 
					})
					.on('dragend', function() {
						click_text_control();
					});

var icon_scale = 1;
var rotate_x;
var rotate_y;


var drag_smile =  d3.behavior.drag() 					
					.on('dragstart', function() {
						d3.event.sourceEvent.stopPropagation();
						
						d3.selectAll(".control_smile").classed("work", false);
						current_smile = d3.select(this).attr("data-object_id");
						d3.selectAll(".control_smile."+current_smile).classed("work", true);
				
						newx = parseFloat(d3.select(this).attr("cx"));
						newy = parseFloat(d3.select(this).attr("cy"));
						d3.event.sourceEvent.stopPropagation();
						rotate = d3.select(".control_smile.rotate_button."+current_smile).attr("data-rotate");

						d3.selectAll("image.image_smile."+current_smile+", .svg_controls rect.control_smile."+current_smile).each(function (d) {
   							 d3.select(this)
								 .attr("data-prevx", parseFloat(d3.select(this).attr("x")))
							 	 .attr("data-prevy", parseFloat(d3.select(this).attr("y")));
 						});
					
						d3.selectAll("circle.control_smile."+current_smile).each(function (d) {
							d3.select(this)
								 .attr("data-prevx", parseFloat(d3.select(this).attr("cx")))
							 	 .attr("data-prevy", parseFloat(d3.select(this).attr("cy")));	
						});
						var M = d3.mouse(svg_text.node());
						prevx = M[0];
						prevy = M[1];
					})
					.on('drag', function() {
						var coord_x, coord_y;

						var dx = (newx+(d3.event.x-prevx));
						var dy = (newy+(d3.event.y-prevy));
						
						var deltax = dx - newx;
							
						var deltay = dy - newy;
						
						
						d3.selectAll("image.image_smile."+current_smile).each(function (d) {
							d3.select(this)
								 .attr("x", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("y", parseFloat(d3.select(this).attr("data-prevy"))+deltay);
								
							coord_x = parseFloat(d3.select(this).attr("data-prevx"))+deltax;
							coord_y = parseFloat(d3.select(this).attr("data-prevy"))+deltay;

							
							smile_width =  parseFloat($(".image_smile."+current_smile).attr("width"));
							smile_height =  parseFloat($(".image_smile."+current_smile).attr("height"));

							rotate_x=coord_x+smile_width/2;
							rotate_y=coord_y+smile_height/2;
							
							d3.select(this)
								.attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); 
 						});


						d3.selectAll("image.image_smile."+current_smile)
							 .attr("data-prevx_check", coord_x)
						 	 .attr("data-prevy_check", coord_y)
							 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); ;

						
						d3.selectAll(".svg_controls rect.control_smile."+current_smile).each(function (d) {
   							 d3.select(this)
							 	 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")")
								 .attr("x", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("y", parseFloat(d3.select(this).attr("data-prevy"))+deltay);
 						});
					
						
						d3.selectAll("circle.control_smile."+current_smile).each(function (d) {
							d3.select(this)
								 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")")
								 .attr("cx", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("cy", parseFloat(d3.select(this).attr("data-prevy"))+deltay);	
						});



					})
					.on('dragend', function() {
						
					});

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


					
						check_alert();
					
						
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



var drag_smile_rect = d3.behavior.drag() 					
					 .on('dragstart', function() {
						d3.event.sourceEvent.stopPropagation();

						d3.selectAll(".control_smile").classed("work", false);
						current_smile = d3.select(this).attr("data-object_id");
						d3.selectAll(".control_smile."+current_smile).classed("work", true);

						

						rotate = d3.select(".control_smile.rotate_button."+current_smile).attr("data-rotate");

						d3.selectAll("image.image_smile."+current_smile+", .svg_controls rect.control_smile."+current_smile).each(function (d) {
   							 d3.select(this)
								 .attr("data-prevx", parseFloat(d3.select(this).attr("x")))
							 	 .attr("data-prevy", parseFloat(d3.select(this).attr("y")));
 						});

 						d3.selectAll("circle.control_smile."+current_smile).each(function (d) {
							d3.select(this)
								 .attr("data-prevx", parseFloat(d3.select(this).attr("cx")))
							 	 .attr("data-prevy", parseFloat(d3.select(this).attr("cy")));	
						});


						var M = d3.mouse(svg_controls.node());

						newx = parseFloat(d3.select(this).attr("x"));
						newy = parseFloat(d3.select(this).attr("y"));

						prevx = M[0];
						prevy = M[1];


					})
					.on('drag', function() {

						var dx = (newx+(d3.event.x-prevx));
						var dy = (newy+(d3.event.y-prevy));
						
						var deltax = dx - newx;
							
						var deltay = dy - newy;

						console.log(current_smile);

						console.log(deltax);


						d3.selectAll(".svg_smiles image.image_smile."+current_smile).each(function (d) {
							d3.select(this)
								 .attr("x", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("y", parseFloat(d3.select(this).attr("data-prevy"))+deltay);
								
							coord_x = parseFloat(d3.select(this).attr("data-prevx"))+deltax;
							coord_y = parseFloat(d3.select(this).attr("data-prevy"))+deltay;

							
							smile_width =  parseFloat($(".image_smile."+current_smile).attr("width"));
							smile_height =  parseFloat($(".image_smile."+current_smile).attr("height"));

							rotate_x=coord_x+smile_width/2;
							rotate_y=coord_y+smile_height/2;
							
							d3.select(this)
								.attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); 
 						});

 						d3.selectAll(".svg_smiles image.image_smile."+current_smile)
							 .attr("data-prevx_check", coord_x)
						 	 .attr("data-prevy_check", coord_y)
							 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); ;

						
						d3.selectAll(".svg_controls rect.control_smile."+current_smile).each(function (d) {
   							 d3.select(this)
							 	 .attr("transform", "rotate("+rotate+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")")
								 .attr("x", parseFloat(d3.select(this).attr("data-prevx"))+deltax)
							 	 .attr("y", parseFloat(d3.select(this).attr("data-prevy"))+deltay);
 						});
					
						
						d3.selectAll("circle.control_smile."+current_smile).each(function (d) {
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
							click_text_control();
				
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
					
						
					
						check_alert();

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

var delete_smile = function(){
	var current_smile  = d3.select(this).attr("data-object_id");
	d3.selectAll("."+current_smile).remove();

	if ($(".svg_smiles image").length==0) {
		$("#header-menu-item-6").removeClass("header-menu-active");
	}
	current_smile = "";
};

function check_alert() {
	if (check_coords()===false) {
		$(".alert_out_svg").addClass("active");
	}else{
		$(".alert_out_svg").removeClass("active");
	}
}


function get_center(id){
	var center = new Array();
	var coords = screenCoordsForRect(document.getElementById(id));	
	var coord_screen = document.getElementById("device").getBoundingClientRect();
	coords.nw.x-=coord_screen.left;
	coords.ne.x-=coord_screen.left;
	coords.se.x-=coord_screen.left;
	coords.sw.x-=coord_screen.left;
	
	coords.nw.y-=coord_screen.top;
	coords.ne.y-=coord_screen.top;
	coords.se.y-=coord_screen.top;
	coords.sw.y-=coord_screen.top;


	return 
}

function check_coords(){
	var coords = screenCoordsForRect(document.getElementById("control_text_rect_appered"));	

	var coord_screen = document.getElementById("device").getBoundingClientRect();
	
	coords.nw.x-=coord_screen.left;
	coords.ne.x-=coord_screen.left;
	coords.se.x-=coord_screen.left;
	coords.sw.x-=coord_screen.left;
	
	coords.nw.y-=coord_screen.top;
	coords.ne.y-=coord_screen.top;
	coords.se.y-=coord_screen.top;
	coords.sw.y-=coord_screen.top;
	
	if (((coords.nw.x-0)<0) || ((coords.nw.y-0)<0)) {  return false;}
	
	if (((coords.ne.x+0)>config.devices[desctop.device_id].width) || ((coords.nw.y-0)<0)) {  return false;}
	
	if (((coords.sw.x-0)<0) || ((coords.sw.y+0)>config.devices[desctop.device_id].height)) {  return false;}
	
	if (((coords.se.x+0)>config.devices[desctop.device_id].width) || ((coords.se.y+0)>config.devices[desctop.device_id].height)) {  return false;}
	
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
						click_text_control();
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
						
				
						
						if ((parseInt(d3.select(".svg_text text").attr("data-font_size"))-deltay)<10) return;
						d3.selectAll(".svg_text text")
							.style("font-size", (parseInt(d3.select(".svg_text text").attr("data-font_size"))-deltay)+"px");
						restart_depend();
					})
					.on('dragend', function() {
						
					});

var smile_height_stretch, smile_width_stretch;



var drag_stretch_smile =  d3.behavior.drag() 					
					.on('dragstart', function() {	
						d3.event.sourceEvent.stopPropagation();

						current_smile = d3.select(this).attr("data-object_id");
						d3.selectAll(".control_smile."+current_smile).classed("work", true);						
						newx = parseFloat(d3.select(this).attr("cx"));
						newy = parseFloat(d3.select(this).attr("cy"));
						d3.event.sourceEvent.stopPropagation();
						
						rotate = d3.select(".control_smile.rotate_button."+current_smile).attr("data-rotate");
						
						var M = d3.mouse(svg_text.node());
						prevx = M[0];
						prevy = M[1];
						smile_width_stretch =  parseFloat($("image."+current_smile).attr("width"));

						smile_height_stretch =  parseFloat($("image."+current_smile).attr("height"));
						
					})
					.on('drag', function() {
						
						var dx = (newx+(d3.event.x-prevx));
						var dy = (newy+(d3.event.y-prevy));
						
						
						var deltax = dx - newx;
							
						var deltay = dy - newy;
							
						if (
							(parseInt(d3.select("image."+current_smile).attr("height"))+deltay)<10		
						) return;

						if (
							(parseInt(d3.select("image."+current_smile).attr("height"))+deltax)<10		
						) return;

						d3.select(".image_smile."+current_smile).attr("width", smile_width_stretch + (deltax));
						d3.select(".image_smile."+current_smile).attr("height", smile_height_stretch+ deltay);


						restart_depend_smile();
					})
					.on('dragend', function() {
						
					});


function restart_depend_smile() {
	/*
		g_smiles.append("rect")
		.classed("control_smile", true)
		.classed("control_smile_main", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("work", true)
		.attr("id", "control_smile_rect")
		.attr("width", text_width)
		.attr("height", text_height)
		.attr("x", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("y", config.devices[desctop.device_id].height/2-text_height/2)
		.on("click", control_smile_click)
		.call(drag_smile_rect);

	g_smiles.append("rect")
		.classed("control_smile", true)
		.classed("control_smile_back", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("work", true)
		.attr("id", "control_smile_rect")
		.attr("width", text_width-6)
		.attr("height", text_height-6)
		.attr("x", config.devices[desctop.device_id].width/2-text_width/2+3)
		.attr("y", config.devices[desctop.device_id].height/2-text_height/2+3)
		.on("click", control_smile_click)
		.call(drag_smile_rect);
	//	.on("dblclick", click_text);
	
	
	
	//Растяжение

	
	g_smiles.append("circle")
		.classed("control_smile", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("rotate_button",true)
		.attr("data-rotate", 0)
		.classed("work",true)
		.attr("r", 12.5)
		.call(rotate_smile)
		.attr("cx", config.devices[desctop.device_id].width/2+text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2);
	
	g_smiles.append("circle")
		.classed("control_smile", true)
		.classed("stretch_button",true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.call(drag_stretch_smile)
		.classed("work",true)
		.attr("r", 12.5)
		.attr("cx", config.devices[desctop.device_id].width/2+text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2+text_height/2);
	
	
	g_smiles.append("circle")
		.classed("control_smile", true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.classed("move_button",true)
		.classed("work",true)
		.attr("r", 12.5)
		.call(drag_smile)
		.attr("cx", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2-text_height/2);
	
	//REMOVE BUTTON
	g_smiles.append("circle")
		.classed("control_smile", true)
		.classed("delete_button",true)
		.attr("data-object_id", object_id)
		.classed(object_id, true)
		.on("click", delete_smile)
		.classed("work",true)
		.attr("r", 12.5)
		.attr("cx", config.devices[desctop.device_id].width/2-text_width/2)
		.attr("cy",  config.devices[desctop.device_id].height/2+text_height/2);
	*/
/*
	var text_width = parseFloat($(".image_smile."+current_smile).attr("width"));
	var text_height = parseFloat($(".image_smile."+current_smile).attr("height"));
	

	var text_x = parseFloat(d3.select("image."+current_smile).attr("x"));
	var text_y =parseFloat(d3.select("image."+current_smile).attr("y"));
	
	svg_controls.select("rect.control_smile_main."+current_smile)
		.attr("width", text_x-text_width)
		.attr("height", text_y-text_height/2)
		.attr("x", text_x)
		.attr("y",text_y);
		

	svg_controls.select("rect.control_smile_back."+current_smile)
		.attr("width", text_width-6)
		.attr("height", text_height-6)
		.attr("x", text_x+3)
		.attr("y", text_y+3)

	d3.select(".control_smile.stretch_button."+current_smile)
		.attr("cx", text_x-text_width/2)
		.attr("cy",  text_y-text_height/2-5);
	
	
	d3.select(".control_smile.rotate_button."+current_smile)
		.attr("cx", text_x+text_width/2)
		.attr("cy",  text_y-text_height/2-5);
	
	
	d3.select(".control_smile.move_button."+current_smile)
		.attr("cx", text_x)
		.attr("cy",  text_y-text_height/2-5);

	*/
}
function restart_depend() {
	
	var text_width = $(".svg_text text").width()+text_width_constant;
	var text_height = $(".svg_text text").height()+text_height_constant;
	
	var text_x = parseFloat(d3.select(".svg_text text").attr("x"));
	var text_y =parseFloat(d3.select(".svg_text text").attr("y"));
	
	svg_controls.select("rect#control_text_rect")
		.attr("width", text_width)
		.attr("height", text_height)
		.attr("x", text_x-text_width/2)
		.attr("y",text_y-text_height/2-5);
		

	svg_controls.select("rect.control_text.doubled_rect")
		.attr("width", text_width-6)
		.attr("height", text_height-6)
		.attr("x", text_x-text_width/2+3)
		.attr("y", text_y-text_height/2-5+3)



	d3.select(".control_text.stretch_button")
		.attr("cx", text_x-text_width/2)
		.attr("cy",  text_y-text_height/2-5);
	
	
	d3.select(".control_text.rotate_button")
		.attr("cx", text_x+text_width/2)
		.attr("cy",  text_y-text_height/2-5);
	
	
	d3.select(".control_text.move_button")
		.attr("cx", text_x)
		.attr("cy",  text_y-text_height/2-5);

	check_alert();
	
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
jQuery(function($){
	$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".control_text"); // тут указываем ID элемента

		if (!div.is(e.target) // если клик был не по нашему блоку
		    && (div.has(e.target).length === 0)
		    && (e.target.closest("svg")!==null)) { // и не по его дочерним элементам
			d3.selectAll(".control_text").classed("work", false); // скрываем его
		}
	});
});

jQuery(function($){
	$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".control_smile"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && (div.has(e.target).length === 0)
		    && (e.target.closest("svg")!==null)) { // и не по его дочерним элементам
			d3.selectAll(".control_smile").classed("work", false); // скрываем его
		}
	});
});