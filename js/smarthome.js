function home() { location.href='../html/homepage.php'; }

function media() { location.href='../assets/html/media_library.html'; }

function games() { location.href='../assets/html/games.html'; }

function timer() { location.href='../assets/html/timer.html'; }

function php() {
	location.href='/php/homepage.php';
}

// :-( breaks with homepage.php
function openPage(directory, webpageFile) { 
	URL = '../' + String(directory) + '/' + String(webpageFile) + '.html';
	location.href=URL; 
}

function openPhpMyAdmin() {
	window.open('/phpmyadmin', '_blank');
}
function openGitSmartHome() {
	window.open('https://github.com/neoxis/SmartHome', '_blank');
}
function internalTempHandler() {
	$.getJSON('/php/database_queries/tile_queries.php', {'function': 'getTempWidgetIDs'}, function(e) {
		getInternalTemp(e.result);
		setInterval(function() { getInternalTemp(e.result); }, 3000);
	});
}

function getInternalTemp(tile_ids) {
	$.getJSON('/php/internal_temp.php', {}, function(e) {
		celcius_temp = parseFloat(e.internal_temp.slice(5,-3));
		fahrenheit_temp = ((celcius_temp * 9 / 5) + 32).toFixed(1);
		thermometer = '';
		if(celcius_temp < 15) {
			thermometer = 'fa fa-thermometer-0';
		}
		else if(celcius_temp < 30) {
			thermometer = 'fa fa-thermometer-1';
		}
		else if(celcius_temp < 45) {
			thermometer = 'fa fa-thermometer-2';
		}
		else if(celcius_temp < 60) {
			thermometer = 'fa fa-thermometer-3';
		}
		else {
			thermometer = 'fa fa-thermometer';
		}
		html = "<table style='width:100%;height:100%;'>";
		html += "<tr><td rowspan='2'><i class='" + thermometer + "' style='font-size:60px;'></td><td align='right'>" + celcius_temp + '&#8451;' + "</td>";
		html += "<tr><td align='right'>" + fahrenheit_temp + '&#8457;' + "</td></tr>";
		html += "</table>";
		for (let tile_id of tile_ids) {
			if($("#" + tile_id).length) {
				$("#" + tile_id).empty();
				$("#" + tile_id).append(html);
			}
		}
	});
}

function editMenu(e, id, order) {
	e.preventDefault();
	html =  '<ul class="menu-options">';
	//advanced edit
	html += '<li onclick="editTile(' + id + ')">Edit</li><hr>';
	//quick edit
	html += '<li id="edit-color" onclick="getTileColorChoices(event,' + id + ')">Recolor</li>';
	html += '<li id="edit-order" onclick="getTileOrderChoices(event,' + order + ')">Reorder</li>';
	html += '<li id="edit-size" onclick="getTileSizeChoices(event,' + id + ')">Resize</li>';
	//delete
	html += '<hr><li onclick="deleteTile(' + id + ')">Delete</li>';
	html += '</ul>';
	$('.edit-menu').empty();
	$('.edit-menu').append(html);
	$('.edit-menu').css('left', e.pageX);
	$('.edit-menu').css('top', e.pageY);
	$('.edit-menu').fadeIn(200, closeOutMenu());
}
function getTileOrderChoices(e, order) {
	e.stopPropagation();
	$.getJSON('/php/database_queries/tile_queries.php', {'function':'getTileCount'}, function(e) {
		//alert(e.tile_count);
		html =  '<table class="edit-order-choices"><tr width="100%">';
		html += '<td><i onclick="set_order_value(event,\'1\')" class="fa fa-angle-double-left" style="font-size:24px"></i></td>';
		html += '<td><i onclick="set_order_value(event,\'--\')" class="fa fa-angle-left" style="font-size:24px"></i></td>';
		html += '<td width="30%" align="center"><p id="order-value">' + order + '</p></td>';
		html += '<td><i onclick="set_order_value(event,\'' + e.tile_count + '++\')"class="fa fa-angle-right" style="font-size:24px"></i></td>';
		html += '<td><i onclick="set_order_value(event,\'' + e.tile_count + '\')" class="fa fa-angle-double-right" style="font-size:24px"></i></td>';
		html += '<td align="right"><i class="fa fa-check-square-o" style="font-size:24px"></i></td>';
		html += '</tr></table>';
		$('li#edit-order').html(html);
		$('li#edit-order').prop("onclick", null).off("click");
	});
	//alert(order);
}
function set_order_value(e, order_value) {
	e.stopPropagation();
	if(order_value.endsWith('--')) {
		val = parseInt($('#order-value').text());
		if(val > 1) {
			val = --val;
		}
		$('#order-value').text(val);
	}
	else if(order_value.endsWith('++')) {
		val = parseInt($('#order-value').text());
		if(val < parseInt(order_value)) {
			val = ++val;
		}
		$('#order-value').text(val);
	}
	else {
		$('#order-value').text(order_value);
	}
}

function getTileSizeChoices(e, id) {
	e.stopPropagation();
	sizes = ['small','medium','large'];
	colors = ['red','blue','green'];
	html =  '';
	for(i = 0; i < sizes.length; i++) {
		html += '<div class="size-choice-' + sizes[i] + ' ' + colors[i] + '" onclick="changeTileSize(' + id + ',\'' + sizes[i] + '\')"></div>';
	}
	$('li#edit-size').html(html);
	$('li#edit-size').prop("onclick", null).off("click");
}
function changeTileSize(id, size) {
	//alert(size);
	$.getJSON('/php/database_queries/tile_queries.php', {'function':'changeTileSize', 'id':id, 'size':size}, function(e) {
		if(e.result) {
			location.reload();
		}
	});
}

function getTileColorChoices(e, id) {
	e.stopPropagation();
	colors = ['red','blue','green','yellow'];
	html = '';
	for(i = 0; i < colors.length; i++) {
		html += '<div class="color-choice ' + colors[i] + '" onclick="changeTileColor(' + id + ',\'' + colors[i] + '\')"></div>';
	}
	$('li#edit-color').html(html);
	$('li#edit-color').prop("onclick", null).off("click");
}

function changeTileColor(id, color) {
	$.getJSON('/php/database_queries/tile_queries.php', {'function':'changeTileColor', 'id':id, 'color':color}, function(e) {
		if(e.result) {
			location.reload();
		}
	});
}

function closeOutMenu() {
	$(document).on("click",function(e){
		e.stopPropagation();
		$(".edit-menu").hide();        
		$(document).off("click");
  });
}

function createTile() {
	$.getJSON('/php/database_queries/tile_queries.php', {'function': 'getstuff'}, function(e) {
		//alert(current_id);
		html = "<h1>Create Tile</h1>";
		html += "<table>"
		tile_elements = ["Size", "Color", "Order", "On Click", "Widget"];
		for(i = 0; i < tile_elements.length; i++) {
			if (tile_elements[i] == "Size") {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><input id='tile_size' value='Small' readonly='readonly' onclick='hideAllTileOptions();$(\"#tile_size_choices\").show();'></input></td></tr>"
			}
			else if (tile_elements[i] == "Color") {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><input id='tile_color' value='Red' readonly='readonly'onclick='hideAllTileOptions();$(\"#tile_color_choices\").show();'></input></td></tr>"
			}
			else if (tile_elements[i] == "Order") {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><input id='tile_order' type='number' min='1' max='" + (Number(e.tile_count)+1).toString() + "' value='" + (Number(e.tile_count)+1).toString() + "' onclick=''></input></td></tr>"
			}
			else if (tile_elements[i] == "On Click") {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><select id='tile_directory'>";
				html += "<option value='-99'> -- On Click Action -- </option>";
				html += e.directories;
				html += "</select></td></tr>";
			}
			else if (tile_elements[i] == "Widget") {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><select id='tile_widget'>";
				html += "<option value='-99'> -- On Select Widget -- </option>";
				html += "<option value='temp_'> Internal Temp </option>";
				html += "</select></td></tr>";
			}
			//else {
			//	html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><input></input></td></tr>"
			//}
		}
		html += "</table>"
		$('.modal-content').empty();
		$('.modal-content').append(html);
		$('.modal-content').append("<button id='create'>Create</button>");
		$('.modal-content').append("<button id='close_modal'>Cancel</button>");
		$('.modal-content').append(createTileChoices());
		$('#close_modal').click(function() {
			$('.modal').hide();
		});
		$('#tile_order').change(function() {
			tile_count = parseInt(e.tile_count) + 1;
			var order = parseInt($('#tile_order').val()) || -99;
			if(order == '-99') {
				$('#tile_order').val(tile_count);
			}
			else if (order > tile_count) {
				$('#tile_order').val(tile_count);
			}
			else if (order < 1) {
				$('#tile_order').val(1);
			}
		});
		$('#create').click(function() {
			tile_id = '';
			tile_class = '';
			tile_onclick = $('#tile_directory').val();
			tile_body = '<span>' + $('#tile_directory option:selected').text() + '</span>';
			tile_order = $('#tile_order').val();
			
			//size
			if ($('#tile_size').val() == 'Small') {
				tile_class += "tile ";
			}
			else if ($('#tile_size').val() == 'Medium') {
				tile_class += "tile tileM ";
			}
			else if ($('#tile_size').val() == 'Large') {
				tile_class += "tile tileL ";
			}
			//color
			tile_class += $('#tile_color').val().toLowerCase();
			//on click
			if (tile_onclick == '-99') {
				tile_onclick = '';
				tile_body = '';
			}
			//widget
			if ($('#tile_widget').val() != '-99') {
				current_id = (parseInt(e.previous_id) + 1).toString();
				tile_id = $('#tile_widget').val() + current_id;
				tile_body = '';
			} 
			$.getJSON('/php/database_queries/tile_queries.php', {'function': 'createTile','tile_id': tile_id, 'tile_class': tile_class, 'tile_onclick': tile_onclick, 'tile_body': tile_body, 'tile_order': tile_order}, function(e) {
					location.reload();
			});
		});
		$('.modal').show();
	});
}

function getSizeAndColor(class_attribute) {
	var size_and_color = [];
	temp = class_attribute.split(' ');
	if($.inArray('tileM', temp) != -1) {
		size_and_color.push('Medium');
	}
	else if($.inArray('tileL', temp) != -1) {
		size_and_color.push('Large');
	}
	else { size_and_color.push('Small'); }
	
	color = temp[temp.length -1];
	color = color.charAt(0).toUpperCase() + color.slice(1);
	size_and_color.push(color);
	return size_and_color
}

function getWidget(tile_id) {
	if(tile_id.indexOf('temp') != -1) {
		return "Internal Temp";
	}
	else if(tile_id.indexOf('clock') != -1) {
		return "Clock";
	}
	else {
		return "";
	}
}

function getOnClick(tile_onclick) {
	if(tile_onclick.indexOf('media') != -1) {
		return "Media Library";
	}
	else if(tile_onclick.indexOf('games') != -1) {
		return "Games";
	}
	else if(tile_onclick.indexOf('timer') != -1) {
		return "Timer";
	}
	else {
		return "";
	}
}

function editTile(id) {
	$.getJSON('/php/database_queries/tile_queries.php', {'function': 'getTileAttributes', 'id': id}, function(e) {
		size_and_color = getSizeAndColor(e.attributes.tile_class);
		//alert(size_and_color);
		html  = "<h1>Edit Tile</h1>";
		html += "<table>";
		tile_elements = ["Size", "Color", "Order", "On Click", "Widget"];
		for(i = 0; i < tile_elements.length; i++) {
			if(tile_elements[i] == "Size") {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><input value='" + size_and_color[0] + "'></input></td></tr>"
			}
			else if(tile_elements[i] == "Color") {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><input value='" + size_and_color[1] + "'></input></td></tr>"
			}
			else if(tile_elements[i] == "Order") {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><input value='" + e.attributes.tile_order + "'></input></td></tr>"
			}
			else if(tile_elements[i] == "On Click") {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><input value='" + getOnClick(e.attributes.tile_onclick) + "'></input></td></tr>"
			}
			else if(tile_elements[i] == "Widget") {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><input value='" + getWidget(e.attributes.tile_id) + "'></input></td></tr>"
			}
			else {
				html += "<tr><td>" + tile_elements[i] + "</td><td align='right'><input></input></td></tr>";
			}
		}
		html += "</table>";
		$('.modal-content').empty();
		$('.modal-content').append(html);
		$('.modal-content').append("<button id='create'>Update</button>");
		$('.modal-content').append("<button id='close_modal'>Cancel</button>");
		$('#close_modal').click(function() {
			$('.modal').hide();
		});
		$('.modal').show();
	});
}

function deleteTile(id) {
	$.getJSON('/php/database_queries/tile_queries.php', {'function': 'deleteTile', 'id': id}, function(e) {
		if (e.result) {
			location.reload();
		}
		else {
			alert("ERROR: Tile could not be removed");
		}
	});
}

function createTileChoices() {
	//tile sizes
	html  = "<div id='tile_size_choices' style='display:none;'>";
	html += "<div onclick='makeTileSizeSelection(\"Small\")' class='tile red'></div>";
	html += "<div onclick='makeTileSizeSelection(\"Medium\")' class='tile tileM blue'></div>";
	html += "<div onclick='makeTileSizeSelection(\"Large\")' class='tile tileL green'></div>";
	html += "</div>";
	
	//tile colors
	html += "<div id='tile_color_choices' style='display:none;margin: auto; width:220px;'>";
	html += "<div onclick='makeTileColorSelection(\"Red\")' class='tile red'>";
	html += "</div>";
	html += "<div onclick='makeTileColorSelection(\"Blue\")' class='tile blue'>";
	html += "</div>";
	html += "<div onclick='makeTileColorSelection(\"Green\")' class='tile green'>";
	html += "</div>";
	html += "<div onclick='makeTileColorSelection(\"Yellow\")' class='tile yellow'>";
	html += "</div>";
	html += "</div>";
	
	//tile directory
	html += "<div id='tile_directory_choices' style='display:none;'>";
	html += "<p>worked</p>";
	html += "</div>";
	return html;
}

function makeTileSizeSelection(selection) {
	$('#tile_size').val(selection);
	hideAllTileOptions();
}

function makeTileColorSelection(selection) {
	$('#tile_color').val(selection);
	hideAllTileOptions();
}

function hideAllTileOptions() {
	$('#tile_size_choices').hide();
	$('#tile_color_choices').hide();
	$('#tile_directory_choices').hide();
}

function startUp() {
	clock.start();
	internalTempHandler();
}
var clock = {
	canvas: document.createElement("canvas"),
	start: function() {
		var self = this;
		this.canvas.width = 100;
		this.canvas.height = 100;
		this.context = this.canvas.getContext("2d");
		if (document.getElementById("t_clock") !== null) {
			document.getElementById("t_clock").append(this.canvas);
			this.parent_color = window.getComputedStyle(document.getElementById("t_clock")).getPropertyValue("background-color");
			this.radius = this.canvas.height / 2;
			this.context.translate(this.radius, this.radius);
			updateClock();
			self.interval = setInterval(updateClock, 1000);
		}
	},
	drawFace: function() {
		this.context.beginPath();
		this.context.arc(0,0,this.radius,0,2*Math.PI);
		//var parent_color = window.getComputedStyle(document.getElementById("t_clock")).getPropertyValue("background-color");
		this.context.fillStyle = this.parent_color;
		this.context.fill();
	},
	drawNumbers: function() {
		var ang;
		var num;
		this.context.font = "bold " + this.radius*0.35 + "px Century";
		this.context.textBaseline="middle";
		this.context.textAlign="center";
		for(num = 1; num < 13; num++){
			ang = num * Math.PI / 6;
			this.context.rotate(ang);
			this.context.translate(0, -this.radius*0.86);
			this.context.rotate(-ang);
			this.context.fillStyle="white"
			this.context.fillText(num.toString(), 0, 0);
			this.context.rotate(ang);
			this.context.translate(0, this.radius*0.86);
			this.context.rotate(-ang);
		}
	},
	drawTime: function() {
		var now = new Date();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		// minute
		minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
		this.drawHand(this.context, minute, this.radius * 0.75, this.radius * 0.1, this.radius);
		// hour
		hour = hour % 12;
		hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
		this.drawHand(this.context, hour, this.radius * 0.55, this.radius * 0.1, this.radius);
		//seconds
		second = (second * Math.PI / 30);
		this.drawHand(this.context, second, this.radius * 0.95, this.radius * 0.06, this.radius);
		
		this.context.beginPath();
		this.context.arc(0, 0, this.radius * 0.055, 0, 2 * Math.PI);
		this.context.fillStyle = '#333333';
		this.context.fill();
	},
	drawHand: function(context, pos, length, width, radius) {
		context.beginPath();
		context.lineWidth = width;
		context.lineCap = "round";
		context.moveTo(0,0);
		context.rotate(pos);
		context.lineTo(0, -length);
		if (length == radius*0.95) {
			context.strokeStyle = "#333333";
		} else {
			context.strokeStyle = "white";
		}
		context.stroke();
		context.rotate(-pos);
	}
}

function updateClock(){
	clock.drawFace();
	//clock.drawNumbers();
	clock.drawTime();
}