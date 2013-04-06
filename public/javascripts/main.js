var socket = io.connect();

$(document).ready(function() {

   	var room = '<ul class="room"><li id="id">#</li><li id="name">Name</li><li id="host">Host</li><li id="type">Type</li><li id="free">Free</li><li id="password">Password</li></ul>'; // Izpis za sobe
   	var type = '<select><option value="2">2P</option><option value="3">3P</option><option value="4">4P</option></select>'; // Izpis za tip igre
   	var default_text = '';
   	
   	var url = $(location).attr('href');
   	var game_id = url.split("/")[4];
   	
   	$('#game_type').append(type);
   	
   	$('#create_game').click(function() {

   		for (var a = 0; a < 10; a++)
	   		$('#rooms').append(room);
   	});

   	$('input[type=text]').focus(function() {

   		default_text = $(this).val();
   		$(this).val('');
   	}).blur(function() {

   		if ($(this).val().length == 0) {

   			$(this).val(default_text);
   			default_text = $(this).val();
   		}
   	});
});