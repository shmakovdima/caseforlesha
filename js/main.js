//some css checkers 


function preparing_html() {
	var html_width = $(document).width();
	var html_height = $(document).height();
}






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


$(document).on("click", "#steps_controller-checkout_but" , function(){

	if ($(this).hasClass("active")) {
		$(".alert_save").addClass("active");
	}
});

$(document).on("click", ".no_write" , function(){
		$(".alert_write").removeClass("active");
});



$(document).on("keydown", ".input_write" , function(event){
	if (event.keyCode==13) {
		$(".ok_write").click();
	}

});

$(document).on("click", ".ok_write" , function(){
	$(".alert_write").removeClass("active");
	svg_text.select("text")
		.text($(".input_write").val());
					var text_width = $(".svg_text text").width()+text_width_constant;
					var text_height = $(".svg_text text").height()+text_height_constant;
						
					restart_depend();
});




$(document).on("click",".yes_save", function(){
	$(".alert_block").removeClass("active");
	save_image();
});

$(document).on("click",".no_button", function(){
	$(".alert_block").removeClass("active");
});

$(document).on("click",".yes_device", function(){
	$(".alert_block").removeClass("active");
	remove_setting(); 
	set_step($("#header-menu-item-1"), 1);
});

$(document).on("click","#change_color_but", function(){
	click_text();
});

$(document).on("click", ".library-color_row" , function(){
	set_font_color($(this).data('color_id'),$(this).data('color'));
});

$(document).on("click", "#steps_controller-next_but" , function(){
	if ($(this).hasClass("active")) {
		var id = parseInt($(".header-menu-selected").attr("data-menu-id"))+1;
		change_step($("#header-menu-item-"+id));	
	}
	
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
	  url: location.href+"get_data.php",
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
	
	if ($("body").width()<1980) {
		$(".library-smiles").css("top", 65+$("#right-6 .category_buttons").height()+"px");
	}else{
		$(".library-smiles").css("top", 105+$("#right-6 .category_buttons").height()+"px");
	}

	



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
	
	if ($("body").width()<1980) {
		$(".library-backgrouds").css("top", 40+$("#right-5 .category_buttons").height()+"px");
	}else{
		$(".library-backgrouds").css("top", 90+$("#right-5 .category_buttons").height()+"px");	
	}
	
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
var fonts="";

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

	if ($("body").width()>1979) {
  		for(value in config.devices) {	
  			config.devices[value].width=config.devices[value].width*1.5; 
  			config.devices[value].height=config.devices[value].height*1.5; 
  		}

  		config.desctop_font_size = parseInt(config.desctop_font_size)*1.5;
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
	$(".alert_write").addClass("active");
	$(".input_write").val(svg_text.select("text").text());
}

function change_step(obj) {
	$("#steps_controller-next_but").addClass("active");
	var id = $(obj).data('menuId');

	$(".g_texts").css("display", "none");
	$(".g_smiles").css("display", "none");
	
	if ($(obj).hasClass('header-menu-selected')) {
		return;
	}
	
	d3.selectAll(".control_text").classed("work", false);
	d3.selectAll(".control_smile").classed("work", false);
	
	if (id =="1") {

		$(".alert_device").addClass("active");

		
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
			$("#steps_controller-next_but").removeClass("active");
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
	
	
	$("#steps_controller-checkout_but").removeClass("active");
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
	$("#steps_controller-checkout_but").addClass("active");
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
	svg_fonts_container.selectAll("style").remove();

	var text = "@font-face {   font-family: 'snappy dna';   src: url(data:application/font-ttf;charset=utf-8;base64,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/80ADABT/2gADABU/+oADABV/6IADABW/5oADABX/6kADABY/7AADABZ/6kADABa/7cADABb/3YADABc/2AADQAL/5MADQAN/5oADQBD/28ADQBE/6kADQBF/6IADQBG/2gADQBH/6kADQBI/5oADQBJ/2gADQBK/7cADQBL/6kADQBM/zUADQBN/6kADQBO/6kADQBP/7AADQBQ/8YADQBR/6kADQBS/7cADQBT/2AADQBU/78ADQBV/6kADQBW/5MADQBX/7AADQBY/6kADQBZ/7cADQBa/6IADQBb/2cADQBc/5oADgALAJEADgAMAL0ADgAjAXIADgAkAY8ADgAlAVYADgAmAVUADgAnAboADgAoAawADgApAZ4ADgAqAWsADgArAbQADgAsATEADgAtAY8ADgAuAUcADgAvAQ0ADgAwAQwADgAxAYgADgAyATgADgAzAUYADgA0AYEADgA1AWsADgA2APcADgA3AVUADgA4AVUADgA5ASIADgA6AVUADgA7AckADgA8AXkAEABD/9wAEABFACwAEABHACQAEABI/9wAEABKACwAEABLADoAEABM/30AEABNACwAEABOAEEAEABPACwAEABQADoAEABRADMAEABSADMAEABUADoAEABVADoAEABXADoAEABYAEkAEABZACQAEgAjAHsAEgAkASkAEgAlAIoAEgAmARQAEgAnAXIAEgAoAVUAEgApAKcAEgAqAP4AEgArAXIAEgAsAKcAEgAtAQwAEgAuANkAEgAvATgAEgAwASIAEgAxAO8AEgAyAYgAEgAzAQwAEgA0ARsAEgA1AF4AEgA2AQUAEgA3AMQAEgA4AOgAEgA5AKcAEgA6AQwAEgA7AO8AEgA8AMQAEgBD/6IAEgBEAMsAEgBIAHsAEgBKAO8AEgBLAJEAIwBD//gAIwBEACYAIwBKADwAIwBLADQAIwBM/60AIwBNAEQAIwBOACYAIwBPACYAIwBQACYAIwBSABcAIwBUAC0AIwBYABcAIwBZABYAJABD/zUAJABEAC0AJABF/8sAJABG/3EAJABH/7wAJABI/8sAJABJ/2IAJABKABcAJABLACYAJABM/xAAJABNABcAJABOADUAJABPACYAJABQADUAJABR/7wAJABT/0wAJABUAEQAJABV/9oAJABW//EAJABX/+IAJABYAC0AJABa/9MAJABb/3kAJABc/48AJQBD/8sAJQBEADwAJQBFAAgAJQBG/6YAJQBHAAgAJQBI/2IAJQBJ/8sAJQBK/9oAJQBL//kAJQBM/1sAJQBNAAgAJQBPAA8AJQBR//8AJQBT/7wAJQBUAB4AJQBW/10AJQBXADUAJQBYAB4AJQBZAAcAJQBb/9sAJQBc/+IAJgBD/6YAJgBG/8QAJgBI/8QAJgBJ/+kAJgBKAA8AJgBLABcAJgBM/0wAJgBNABcAJgBOAA8AJgBPAB4AJgBQABcAJgBRAAoAJgBSAAgAJgBT/9MAJgBUAB4AJgBVAA4AJgBW//gAJgBYABcAJgBZABcAJgBa/8sAJgBb/+kAJgBc/8sAJwBD/8MAJwBF/8sAJwBG/7wAJwBI/48AJwBJ/9oAJwBM/48AJwBT/9oAJwBW/6YAJwBX/+kAJwBY/+kAJwBa/8sAJwBc/9oAKAAL/sgAKABD/j0AKABE/4cAKABF/pAAKABG/nIAKABH/o8AKABI/0QAKABJ/jUAKABK/7wAKABL/9oAKABM/uMAKABN/8QAKABO/9oAKABP/4AAKABQ/1sAKABR/swAKABS/vkAKABT/mMAKABU/1MAKABV/wEAKABW/z0AKABX/q4AKABY/y4AKABZ/yYAKABa/wgAKABb/oEAKABc/nkAKQAL/8YAKQBD/2IAKQBE/+kAKQBF/7sAKQBG/1sAKQBH/6YAKQBI/4UAKQBJ/3EAKQBK/9oAKQBL//EAKQBM/wEAKQBN/+IAKQBR/7wAKQBS/+IAKQBT/4AAKQBV/8sAKQBW/7UAKQBX/+IAKQBY//gAKQBa/9oAKQBb/60AKQBc/48AKgBD/+kAKgBEABYAKgBG/+IAKgBI/9oAKgBKAC0AKgBLADUAKgBM/54AKgBNAB4AKgBOADQAKgBPAC0AKgBQACYAKgBSAA8AKgBT/9MAKgBUAC0AKgBYAA8AKgBc/9MAKwAL/78AKwBD/60AKwBE/+IAKwBF/54AKwBG/60AKwBH/6YAKwBI/48AKwBJ/6YAKwBKAB4AKwBLABcAKwBM/5cAKwBNABYAKwBP/+kAKwBQ/8sAKwBR/54AKwBS/7wAKwBT/48AKwBU/9MAKwBV/8sAKwBW/6YAKwBX/6YAKwBY/60AKwBZ/8sAKwBa/5cAKwBb/6YAKwBc/7wALABD/3kALABE/9oALABF/8MALABG/48ALABH/7wALABI/7wALABJ/48ALABR/9kALABS/9oALABT/4gALABV/9MALABW/+IALABX/8sALABa/9MALABb/60ALABc/5cALQBD/8QALQBE/+IALQBF/+IALQBG/8QALQBH/9MALQBI/5cALQBJ/+IALQBK/+kALQBL//gALQBM/3EALQBN//EALQBO/+IALQBP//kALQBR/+IALQBS//gALQBT/9MALQBV/9oALQBW/9MALQBY//AALQBZ//8ALQBa/60ALQBb//EALQBc/8sALgAL/9wALgBD//EALgBE/8sALgBF/8sALgBH/8QALgBI/3kALgBM/9MALgBO/8QALgBR/7wALgBT/9sALgBW/4gALgBX/8QALgBY/9MALgBa/9MALwALABUALwBD/9MALwBFABUALwBG//kALwBHACcALwBI/9oALwBJAAgALwBM/48ALwBNAB4ALwBOABcALwBPACYALwBQAC0ALwBRABcALwBSAB4ALwBUADwALwBV/+IALwBW/7wALwBX/8sALwBYAA8ALwBZAB4ALwBa/9MAMAAL/7AAMABD/60AMABE/9MAMABF/54AMABG/54AMABH/54AMABI/3kAMABJ/9MAMABK/8sAMABL/7UAMABM/0QAMABN/9MAMABO/+IAMABP/+kAMABQ/9oAMABR/+kAMABS/+IAMABT/7UAMABV/7UAMABW/6YAMABX/9oAMABY/+IAMABa/48AMABb/9oAMABc/7wAMQAL/80AMQBD/4AAMQBF/5cAMQBG/4AAMQBH/6YAMQBI/9oAMQBJ/4gAMQBK/9oAMQBLAA8AMQBM/x8AMQBN/+kAMQBOABwAMQBP//EAMQBR/6YAMQBS/8sAMQBT/4gAMQBUACYAMQBV/9MAMQBW/8sAMQBX/9oAMQBa/9MAMQBb/7UAMQBc/4gAMgAL/5oAMgBD/p8AMgBE//EAMgBF/1sAMgBG/wgAMgBH/1sAMgBI/6YAMgBJ/q4AMgBLABcAMgBM/y4AMgBNAB4AMgBOADUAMgBPACYAMgBR/5cAMgBS/7wAMgBT/x8AMgBV/7wAMgBW/8QAMgBX/6YAMgBZ/9MAMgBa/8QAMgBb/vkAMgBc/xcAMwBD/9MAMwBF/+IAMwBG/+IAMwBH/+kAMwBI/8QAMwBJ/9oAMwBM/4AAMwBNABcAMwBOAA8AMwBT/8QAMwBUAB4AMwBW/9oAMwBX/+IAMwBa/9MAMwBb/9oAMwBc/+IANAAL/28ANABD/uMANABE/9oANABF/z0ANABG/tsANABH/x8ANABI/2oANABJ/tMANABLABYANABM/x8ANABOAA8ANABPAAgANABQ/8sANABR/1sANABS/4AANABT/wEANABU/8wANABV/3kANABW/5cANABX/2oANABY/8QANABZ/60ANABa/60ANABb/0QANABc/zUANQBD//gANQBI/7UANQBLAA8ANQBM/6YANQBR//8ANQBa/9MANgAL/uwANgBD/sQANgBE/6YANgBF/vIANgBG/tMANgBH/swANgBI/0wANgBJ/sQANgBK/zUANgBM/xcANgBP/zwANgBQ/yYANgBR/uMANgBS/vIANgBT/swANgBU/wEANgBV/wgANgBW/z0ANgBX/uMANgBY/xcANgBZ/xAANgBa/wgANgBb/wgANgBc/tsANwAL/8YANwBD/6YANwBE/7UANwBF/7UANwBG/60ANwBH/7wANwBI/4AANwBJ/7UANwBK/7wANwBL/7UANwBM/4AANwBN/8QANwBO/9MANwBP/9MANwBQ/8QANwBR/7wANwBS/8sANwBT/60ANwBU/8QANwBV/9MANwBW/48ANwBX/8sANwBY/8sANwBZ/9oANwBa/7wANwBb/7UANwBc/7wAOAAL/+oAOABD/6IAOABF/9wAOABG/7AAOABH/9wAOABJ/7cAOABR/9wAOABT/7cAOABUABYAOABb/8YAOABc/80AOQBD/98AOQBG/98AOQBI/8oAOQBKAA8AOQBLACEAOQBM/2gAOQBNACEAOQBOABYAOQBPABYAOQBQACEAOQBSAAsAOQBT/98AOQBUACsAOQBZACEAOQBa/98AOQBc/98AOgBD/8oAOgBE//IAOgBG/9UAOgBH//UAOgBI/34AOgBJ/98AOgBM/3MAOgBT/98AOgBUACEAOgBVACAAOgBW/+oAOgBXAAsAOgBYACEAOgBZACEAOgBc/+oAOwBD/9UAOwBF/+oAOwBG/9UAOwBH/+oAOwBI/98AOwBJ//YAOwBLACsAOwBM/54AOwBNACsAOwBOABkAOwBPACsAOwBQACEAOwBT/98AOwBUACsAOwBYACEAOwBc//UAPAAL/0MAPABD/ycAPABE/9UAPABF/1IAPABG/wYAPABH/0cAPABI/1IAPABJ/vAAPABKABYAPABLACsAPABM/0cAPABNAEEAPABOABYAPABP/7QAPABQ/7QAPABR/2gAPABS/2gAPABT/z0APABU/2gAPABV/34APABW/4kAPABX/zIAPABY/3MAPABZ/2gAPABa/ycAPABb/0cAPABc/xEAQwAEAFcAQwAK/9QAQwAL/7AAQwAN/7cAQwAOAPcAQwASAEkAQwAiAF4AQwBD/30AQwBE/7AAQwBF/7AAQwBG/5oAQwBH/78AQwBI/4QAQwBJ/6kAQwBK/78AQwBL/7cAQwBM/28AQwBN/78AQwBO/8YAQwBP/80AQwBQ/9sAQwBR/80AQwBS/9wAQwBT/5MAQwBU/9QAQwBV/9QAQwBW/5sAQwBX/9QAQwBY/74AQwBZ/8YAQwBa/6kAQwBb/6EAQwBc/5oARAAEAEkARAAKACQARAAL//EARAAN/+MARAAOASoARAAQAB0ARAAiAIMARABD/4wARABF/+MARABG/7cARABH/+MARABI/80ARABJ/7cARABM/0MARABQABYARABR/+MARABT/78ARABUABYARABW/9wARABa/9QARABb/9QARABc/8YARQAEAHsARQAGAB0ARQAL/6IARQAN/80ARQAOARQARQAQADMARQAiAHQARQBD/7AARQBF/+MARQBG/78ARQBH/9QARQBI/7cARQBJ/80ARQBM/3YARQBN//gARQBR/9wARQBS//EARQBT/9QARQBV//kARQBW/78ARQBa/4wARQBb/80ARQBc/78ARgAEAHQARgAL/7cARgAN/7AARgAOAP4ARgAeAB0ARgAiAIMARgBD/6IARgBE/7cARgBF/7cARgBG/5MARgBH/5oARgBI/1IARgBJ/5oARgBK/74ARgBL/78ARgBM/2EARgBN/8YARgBO/7cARgBP/7cARgBQ/9QARgBR/7cARgBS/7gARgBT/5MARgBU/7AARgBV/9wARgBW/30ARgBX/6kARgBY/7AARgBZ/7AARgBa/5MARgBb/5MARgBc/7AARwAEAFcARwAK/8YARwAL/8YARwAN/5MARwAOASkARwAiAEgARwBD/2cARwBE/6kARwBF/3YARwBG/4UARwBH/4wARwBI/0MARwBJ/6IARwBK/7cARwBL/80ARwBM/0MARwBN/7cARwBO/6MARwBP/8YARwBQ/9QARwBR/8YARwBS/8YARwBT/6IARwBU/6AARwBV/9wARwBW/30ARwBX/7AARwBY/7AARwBZ/8YARwBa/5oARwBb/6IARwBc/30ASAAEAGYASAAOARMASAAPACwASAAQADMASAAiAK4ASABD/9QASABF//EASABG/9QASABI/6IASABJ/+oASABM/5MASABQAB0ASABT/9QASABUABYASABW/+oASABX/+sASABa/9wASABb//IASABc/+oASQAEAFcASQAL/78ASQAN/78ASQAOAP4ASQAiAJEASQBW/78ASgAEAHsASgAL/8YASgAN/78ASgAOAPcASgAQABYASgAeACQASgAiAHsASgBD/78ASgBE/78ASgBF/78ASgBG/5MASgBH/5YASgBI/4UASgBJ/6kASgBK/80ASgBL/78ASgBM/28ASgBN/9QASgBO/80ASgBP/9QASgBQ/9QASgBR/8YASgBS/+oASgBT/5oASgBU/8YASgBV/80ASgBW/5MASgBX/8YASgBY/78ASgBZ/+IASgBa/6kASgBb/6kASgBc/80ASwAEAG0ASwAL/6kASwAN/6kASwAOAQwASwAQACwASwAiAJgASwBD/2gASwBE/8YASwBF/54ASwBG/4QASwBH/78ASwBI/3YASwBJ/5oASwBK/80ASwBL/7cASwBM/2gASwBN/9QASwBO/9QASwBP/80ASwBQ/+MASwBR/80ASwBS/80ASwBT/5oASwBU/78ASwBV//EASwBW/4wASwBX/7cASwBY/78ASwBZ/9QASwBa/5oASwBb/9QASwBc/7cATAAEAFcATAAL/7AATAAN/6kATAAOAQwATAAiAIoATABD/5oATABE/80ATABF/6IATABG/30ATABH/6kATABI/6kATABJ/6IATABK/9QATABL/74ATABM/0sATABN/8YATABO/80ATABP/9wATABQ/+oATABR/7gATABS/+oATABT/4wATABU//kATABV/7AATABW/7cATABX/8YATABY/9wATABZ/8YATABa/+oATABb/6kATABc/5oATQAEAG0ATQAL/68ATQAN/9QATQAOASIATQAPACwATQAdAFcATQAeADoATQAiAKAATQBD/80ATQBE/+MATQBF/9wATQBG/8YATQBH/9QATQBI/6IATQBJ/80ATQBK/+MATQBL/+MATQBM/5oATQBN/+oATQBO/+MATQBP//EATQBR/9QATQBS//IATQBT/9QATQBU/+MATQBV/9QATQBW/5MATQBX/9QATQBY/9QATQBZ/+MATQBa/8YATQBb/9wATQBc/8YATgAEAJEATgAL/6kATgAN/5MATgAOAQUATgAPAB0ATgAQAFAATgAeACwATgAiALUATgBD/68ATgBE/9QATgBF/80ATgBG/78ATgBH/78ATgBI/28ATgBJ/80ATgBK/+MATgBL//EATgBM/5MATgBN//EATgBO/8MATgBP/+MATgBQAAcATgBR/8YATgBS/9wATgBT/8YATgBV/7cATgBW/4UATgBX/9QATgBY/9wATgBa/7AATgBb//EATgBc/7cATwAEAGYATwAGAF4ATwAKACQATwAOATAATwAPAB0ATwAQAEkATwAdAEEATwAeADoATwAiAKcATwBD//EATwBG/+MATwBI/+MATwBJ/+oATwBKAB0ATwBLABYATwBM/78ATwBNACwATwBOAB0ATwBPAB0ATwBQADMATwBSAB0ATwBT/+oATwBUAEEATwBVAA8ATwBW//kATwBXAA8ATwBYACwATwBZAB0ATwBa//kAUAAEAGYAUAAGAEgAUAAKAB0AUAALAA8AUAAOARsAUAAPAFAAUAAQAEkAUAAdAEkAUAAeAEEAUAAiAKAAUABD/+oAUABEABYAUABI/+oAUABKACQAUABLAB0AUABM/9QAUABNACwAUABOAB0AUABPACUAUABQADMAUABRAAcAUABSABYAUABT//EAUABUACQAUABW/+MAUABXABYAUABYABYAUABZAA8AUQAEAEkAUQAL/6EAUQAN/78AUQAOATEAUQAQAEEAUQAiAFAAUQBD/7AAUQBE/80AUQBF/7cAUQBG/7cAUQBH/7cAUQBI/4wAUQBJ/68AUQBK/80AUQBL/80AUQBM/zwAUQBN/9QAUQBO/78AUQBP/9QAUQBQ/8UAUQBR/8YAUQBS/9wAUQBT/7cAUQBU/8YAUQBV/7AAUQBW/6IAUQBX/80AUQBY/8wAUQBZ/+oAUQBa/5MAUQBb/8YAUQBc/6kAUgAEAEkAUgAKAB0AUgAN/+oAUgAOARsAUgAQADoAUgAiAFcAUgBD/7AAUgBF//kAUgBG/8YAUgBH/+oAUgBI/8YAUgBJ/80AUgBM/1IAUgBNAAcAUgBPAAcAUgBQAA8AUgBR/+oAUgBT/8YAUgBUAA8AUgBW/9wAUgBa/80AUgBb/9QAUgBc/8YAUwAEAGYAUwAN/+oAUwAOAQ0AUwAPADoAUwARAEkAUwAdAFcAUwAeACwAUwAiAIMAUwBW/9wAVAAEAFcAVAAL/7cAVAAN/5MAVAAOAPAAVAAdAEkAVAAeADMAVAAiAEEAVABD/5MAVABE/6kAVABF/78AVABG/6kAVABH/78AVABI/0QAVABJ/7AAVABK/9QAVABL/8YAVABM/3YAVABN/80AVABO/74AVABP/80AVABQ/8YAVABR/40AVABS/74AVABT/5MAVABU/6EAVABV/80AVABW/30AVABX/7AAVABY/4UAVABZ/6EAVABa/4wAVABb/6IAVABc/6EAVQAEAG0AVQAKACQAVQAL/7cAVQAN/6kAVQAOAU4AVQAP/8YAVQAiAHQAVQBD/3YAVQBE/7cAVQBF/7AAVQBG/5MAVQBH/6kAVQBI/1IAVQBJ/4wAVQBK/8YAVQBL/8YAVQBM/x8AVQBN/80AVQBO/6kAVQBP/+MAVQBR/7AAVQBS/80AVQBT/5MAVQBU/+oAVQBV/7AAVQBW/9UAVQBY/8YAVQBZ/80AVQBa/28AVQBb/80AVQBc/6kAVgAEAFAAVgAL/7AAVgAN/6kAVgAOAXkAVgAdADMAVgAiAFcAVgBD/4UAVgBE/7cAVgBF/7cAVgBG/5MAVgBH/7AAVgBI/2AAVgBJ/5oAVgBK/78AVgBL/7cAVgBM/1IAVgBN/7cAVgBO/80AVgBP/8YAVgBQ/9QAVgBR/4sAVgBS/7AAVgBT/30AVgBU/8YAVgBV/9QAVgBW/28AVgBX/7cAVgBY/8YAVgBZ/7cAVgBa/5oAVgBb/5oAVgBc/4sAVwAEAFAAVwAL/7AAVwAN/6kAVwAOAWsAVwAdAEkAVwAiAF4AVwBD/7EAVwBE/80AVwBF/7cAVwBG/5oAVwBH/7cAVwBI/5MAVwBJ/7cAVwBK/8YAVwBL/70AVwBM/4wAVwBN/9QAVwBO/8YAVwBP/9QAVwBR/80AVwBS/9wAVwBT/8YAVwBU/80AVwBV/80AVwBW/6kAVwBX/80AVwBY/8YAVwBZ//EAVwBa/7EAVwBb/9sAVwBc/7cAWAAEAGYAWAAKACwAWAAL/+oAWAAOAXkAWAAQACQAWAAR/9MAWAAiAK4AWABD/8YAWABEAA8AWABF/+oAWABG/78AWABH/+MAWABI/9QAWABJ/8YAWABKAAcAWABLAAcAWABM/2AAWABNAA8AWABQAA8AWABR/+MAWABT/80AWABUACQAWABW/+MAWABYAAcAWABa/9QAWABb/9wAWABc/80AWQAEAEkAWQAOAUcAWQAQADoAWQAiAF4AWQBD/+sAWQBI/7AAWQBM/5oAWQBNAA4AWQBPABYAWQBQAB0AWQBT//kAWQBUAAcAWQBVAA8AWQBW/9QAWQBXABYAWQBYAAcAWQBa/9wAWQBc/+oAWgAEAEkAWgAL/28AWgAN/80AWgAOAUAAWgAQACwAWgASAIoAWgAiAIMAWgBD/9wAWgBE/+oAWgBF/9QAWgBG/80AWgBH/9QAWgBI/4wAWgBJ/8YAWgBK/+MAWgBL/+MAWgBM/4UAWgBN/9wAWgBO/9wAWgBR/+MAWgBT/9wAWgBV/+MAWgBW/5MAWgBX/9wAWgBY/+MAWgBa/7AAWgBb//EAWgBc/6gAWwAEADoAWwAL/7AAWwAN/8YAWwAOAT8AWwAQADoAWwASAGYAWwAiAEEAWwBD/8YAWwBE/+MAWwBF/9wAWwBG/9wAWwBH/9QAWwBI/5oAWwBJ/+MAWwBK/+oAWwBL/+oAWwBM/7AAWwBN/+oAWwBO/9wAWwBP/+oAWwBR/9wAWwBT/9QAWwBW/8YAWwBZ/+oAWwBa/8YAWwBb/+MAWwBc/7cAXAAEAEEAXAAL/78AXAAN/3YAXAAOASoAXAAP/9QAXAAQ/8YAXAAR/7wAXAAiAK4AXABD/2cAXABF/5oAXABG/3YAXABH/6IAXABI/+MAXABJ/2gAXABM/y4AXABOAA8AXABR/7cAXABS/9QAXABT/3YAXABUACwAXABV/80AXABW/78AXABX/9QAXABYAB0AXABb/5MAXABc/28AAAAAABAAAABoCQYFAAEBAQEBAQEDAQIEAgIBAwEDAQEBAQEBAQEBAQEBAQEBAgMEAwUDAwMDAgMDBAUEAwQEBAQEBAQFBAQEAQEBAQEBBAICBAIDAwMBAwICAwICAgMCAgIDAgMDAwMBAQYBAQEAAAAKBgUAAQEBAQIBAQQBAgQCAgEDAQQBAQEBAQEBAQEBAQEBAQECAwUEBQQEBAMCAwMEBQQEBQQFBAQFBAYEBAUBAQEBAQEEAwMEAwMDAwIDAgIDAgMCAwMDAgMCAwMDAwEBBgEBAQAAAAsHBgABAQECAgEBBAECBAMCAQMBBAEBAQEBAQEBAQEBAQEBAQIDBQQGBAQEAwIEAwUGBQQFBQUEBQUEBgQEBQEBAQEBAQQDAwQDAwQDAgMDAgMCAwMDAwMDAwIDAwMEAQEHAQEBAAAADAgGAAEBAQICAQEFAQMFAwIBBAEFAQEBAQEBAQEBAQEBAQEBAwQGBQYEBAUEAwQEBQYFBAUFBgUFBgUHBQUGAQEBAQEBBQMDBQMDBAMCAwMCBAIDAwQDAwMEAgQDAwQBAQgBAQEAAAANCAcAAQEBAgIBAQUBAwUDAwEEAQUBAQEBAQEBAQEBAQEBAQEDBAYFBwUFBQQDBAQFBwYFBgUGBQYGBQcFBQYBAQEBAQEFBAMFBAQEBAIEAwIEAgMDBAMDAwQDBAQEBAEBCAEBAQAAAA4JBwABAQECAgEBBQEDBgMDAQQBBQEBAQEBAQEBAQEBAQEBAQMEBwUHBQUFBAMFBAYHBgUGBgcGBgcGCAYGBgEBAQEBAQYEBAYEBAUEAgQDAgQDBAMEBAQDBAMEBAQFAQEJAQEBAAAADwoIAAEBAQICAQEGAQMGBAMBBQEGAQEBAQEBAQEBAQEBAQEBAwUHBggFBgYEAwUFBggGBgcGBwYGBwYIBgYHAQEBAQEBBgQEBgQEBQQCBAQDBQMEBAQEBAQFAwQEBAUBAQoBAQEAAAAQCggAAgIBAgICAgYCBAYEAwEFAQYCAgICAgICAgICAQECAgIDBQgGCAYGBgUDBQUHCQcGBwcHBgcIBgkGBgcCAgICAgIGBAQGBAUGBAMFBAMFAwQEBQQEBAUDBQUFBQICCgICAgAAABELCQACAgECAwICBwIEBwQDAQUBBwICAgICAgICAgIBAQICAgQFCAcJBgYHBQQGBQcJBwYIBwgHBwgHCgcHCAICAgICAgcFBAcFBQYFAwUEAwUDBAQFBQQEBQQFBQUGAgILAgICAAAAEgsJAAICAQMDAgIHAgQHBAQBBQEHAgICAgICAgICAgEBAgICBAUJBwkHBwcFBAYFCAoIBwgHCAcICQcKBwcIAgICAgICBwUFBwUFBgUDBQQDBQMFBAUFBQQGBAUFBQYCAgsCAgIAAAATDAoAAgIBAwMCAgcCBAgFBAEGAQcCAgICAgICAgICAQECAgIEBgkHCgcHBwYEBgYICggHCQgJBwgJCAsIBwkCAgICAgIIBQUIBQUHBQMGBQMGBAUFBgUFBQYEBgUGBgICDAICAgAAABQNCgACAgEDAwICCAIFCAUEAQYBCAICAgICAgICAgIBAQICAgQGCggKBwcIBgQHBggLCQcJCAkICQkICwgICQICAgICAggFBQgFBgcGAwYFAwYEBQUGBQUFBgQGBgYHAgINAgICAAAAFQ0LAAICAQMDAgIIAgUJBQQBBgEIAgICAgICAgICAgEBAgICBQYKCAsICAgGBAcGCQsJCAkJCggJCggMCAgKAgICAgICCAYFCAYGBwYDBgUEBgQFBQYGBQUGBAYGBgcCAg0CAgIAAAAWDgsAAgIBAwMCAggCBQkFBAEHAQgCAgICAgICAgICAQECAgIFBwoICwgICQYFBwcJDAkICgkKCQkKCQwJCQoCAgICAgIJBgYJBgYIBgQGBQQHBAYFBgYGBQcFBwYGBwICDgICAgAAABcPDAACAgIDAwICCQIFCQYFAQcBCQICAgICAgICAgIBAQICAgUHCwkMCAgJBwUIBwoMCgkKCgsJCgsJDQkJCwICAgICAgkGBgkGBwgGBAcFBAcEBgYHBgYGBwUHBwcIAgIPAgICAAAAGA8MAAICAgMEAgIJAgUKBgUBBwEJAgICAgICAgICAgEBAgICBQcLCQwJCQkHBQgHCg0KCQsKCwkKCwoOCgkLAgICAgICCQcGCgcHCAcEBwYEBwUGBgcGBgYHBQcHBwgCAg8CAgIAAAAAAADtAZAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAILBgMFAwICAgQAAAAAAAAAAAAAAAAAAAAAAAAAAABAACDwAgZH/NAAAAZHAzAAAAABAACAAAAAAMQDegAAYAAFJQJ1MC1TbmFwcHkgICAgICAgIP////83///+MC1TUjAwAAAAAAAAAAEAAAAAAADlSOfPXw889QADCAAAAAAAsuMgiwAAAACy4yCL/5P80AT0BkcAAAAIAAEAAQAAAAAAAQAABkf80AAABRn/k/+tBPQAAQAAAAAAAAAAAAAAAAAAAGMAAQAAAGMAUwADAAAAAAACAAgAQAAKAAAAQAB5AAEAAQ==);}";

		
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
			.attr("width", config.devices[desctop.device_id].width)
			.attr("height",config.devices[desctop.device_id].height)
			.attr("patternTransform", "rotate("+(-rotate)+","+center.x+","+center.y+")translate("+(-center.x*(icon_scale-1))+", "+(-center.y*(icon_scale-1))+")scale("+icon_scale+")") 
				.append("image")
					.attr("width", config.devices[desctop.device_id].width)
					.attr("height", config.devices[desctop.device_id].height)
					.classed("pattern_image", true)
					.attr("x",0)
					.attr("y", 0)
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
						setTimeout(function() { 
							d3.selectAll(".control_smile."+current_smile).classed("work", true);
						 }, 50);
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
					
						d3.select("#wood")
							   .attr("patternTransform", "rotate("+(-rotate)+","+center.x+","+center.y+")translate("+(-center.x*(icon_scale-1))+", "+(-center.y*(icon_scale-1))+")scale("+icon_scale+")"); 
					
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
						
					d3.select("#wood")
							   .attr("patternTransform", "rotate("+(-rotate)+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); 
					
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
						
						d3.select("#wood")
							   .attr("patternTransform", "rotate("+(-rotate)+","+rotate_x+","+rotate_y+")translate("+(-rotate_x*(icon_scale-1))+", "+(-rotate_y*(icon_scale-1))+")scale("+icon_scale+")"); 
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


	return;
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
						setTimeout(function() { 
							d3.selectAll(".control_text").classed("work", true);
						}, 50);
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
						

						var width_smile = parseFloat(d3.select(".image_smile."+current_smile).attr("width"));
						var height_smile = parseFloat(d3.select(".image_smile."+current_smile).attr("height"));


						var constant = height_smile/width_smile; 
						
						var deltax = dx - newx;
							
						var deltay = dy - newy;
							
						if (
							(parseInt(d3.select("image."+current_smile).attr("height"))+deltay)<10		
						) return;

						if (
							(parseInt(d3.select("image."+current_smile).attr("height"))+deltax)<10		
						) return;

						d3.select(".image_smile."+current_smile).attr("width", smile_width_stretch + deltax);
						d3.select(".image_smile."+current_smile).attr("height", smile_height_stretch + deltax*constant);


						restart_depend_smile();
					})
					.on('dragend', function() {
						setTimeout(function() { 
							d3.selectAll(".control_smile."+current_smile).classed("work", true);
						}, 50);
						
					});


function restart_depend_smile() {
	var text_width = parseFloat(d3.select(".image_smile."+current_smile).attr("width"))+text_width_constant;
	var text_height =  parseFloat(d3.select(".image_smile."+current_smile).attr("height"))+text_height_constant;


	var center = {
		x: parseFloat(d3.select(".image_smile."+current_smile).attr("x"))-10,
		y:  parseFloat(d3.select(".image_smile."+current_smile).attr("y"))-10
	};

	console.log(text_width +" " +text_height);

	svg_controls.select("rect.control_smile_main."+current_smile)
		.attr("x", center.x)
		.attr("y", center.y)
		.attr("width", text_width)
		.attr("height", text_height);
		

	svg_controls.select("rect.control_smile_back."+current_smile)
		.attr("x", center.x+3)
		.attr("y", center.y+3)
		.attr("width", text_width-6)
		.attr("height", text_height-6);
		
	svg_controls.select(".move_button."+current_smile)
		.attr("cx", center.x)
		.attr("cy", center.y);

	svg_controls.select(".rotate_button."+current_smile)
		.attr("cx", center.x+text_width)
		.attr("cy", center.y);

	svg_controls.select(".stretch_button."+current_smile)
		.attr("cx", center.x+text_width)
		.attr("cy", center.y+text_height);

	svg_controls.select(".delete_button."+current_smile)
		.attr("cx", center.x)
		.attr("cy", center.y+text_height);
	
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

jQuery(function($){
	$(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".alert_block_item"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		   && (div.has(e.target).length === 0)
			) {
			$(".alert_block").removeClass("active");
			
		}
	});
});
