// NOTE: This example will not work locally in all browsers. 
// Please try it out on the website for the book http://javascriptbook.com/code/c08/
// or run it on your own server.

$(function() {                                    // When the DOM is ready

  var timesAndTitles;                                      // Declare global variable
  $.ajax({
    beforeSend: function(xhr) {                   // Before requesting data
      if (xhr.overrideMimeType) {                 // If supported
        xhr.overrideMimeType("application/json"); // set MIME to prevent errors
      }
    }
  });
  
  
  
  

  // FUNCTION THAT COLLECTS DATA FROM THE JSON FILE
  function loadTimetable() {                    // Declare function
    $.getJSON('data/example.json')              // Try to collect JSON data
    .done( function(data){                      // If successful
      timesAndTitles = data;                             // Store it in a variable
    }).fail( function(x) {                       // If a problem: show message
      $('#event').html('Sorry! We could not load the timetable at the moment');
      console.log(x.statusText + ", o sea " + x.status);
    });
  }

  loadTimetable();                              // Call the function






  // CLICK ON THE EVENT TO LOAD A TIMETABLE 
  $('#content').on('click', '#event a', function(e) {  // User clicks on event y en anchor

    e.preventDefault();                                // Prevent loading page
    var loc = this.id.toUpperCase();                   // Get value of id attr

    var newContent = '';                               // Build up timetable by
    for (var i = 0; i < timesAndTitles[loc].length; i++) {      // looping through events
      newContent += '<li><span class="time">' + timesAndTitles[loc][i].time + '</span>';
      newContent += '<a href="descriptions.html#';
      newContent += timesAndTitles[loc][i].title.replace(/ /g, '-') + '">'; 
      //Using javascript modifier g - Global replace. Replace all instances of the matched string in the provided text.
      newContent += timesAndTitles[loc][i].title + '</a></li>';
    }

    $('#sessions').html('<ul>' + newContent + '</ul>'); // Display times on page

    $('#event a.current').removeClass('current');       // Update selected item
    $(this).addClass('current');

    $('#details').text('');                             // Clear third column
  });





  // CLICK ON A SESSION TO LOAD THE DESCRIPTION
  $('#content').on('click', '#sessions li a', function(e) { // Click on session
    e.preventDefault();                                     // Prevent loading
    var fragment = this.href;                               // Title is in href

    fragment = fragment.replace('#', ' #');                 // Add space after#
    $('#details').load(fragment,
    										  //texas almuerza no es un fragmento de descriptions.html, so aunque tendra exito loadeando descriptions.html,
    										  //no podra pardear el fragmento #texas-almuerza y #details quedara vacio. cuanndo eso pase
    										  // carga en #details el fragmento #noDefinido
    										  //El problema surge pq el tituto de session texasAlmuerza no matchea con ningun fragmento de descriptions.html
    										  //cuando eso pase entonces carga el fragmento #noDefinido
    										  function(respuesta, estatus){	
    											 if($('#details').text() == "") jQuery('#details').load('descriptions.html #noDefinido');
											  }
						);                         

    $('#sessions a.current').removeClass('current');        // Update selected
    $(this).addClass('current');
  });





  // codigo de navegacion principal ; lo mismo de pasados ejemplos
  // CLICK ON PRIMARY NAVIGATION
  $('nav a').on('click', function(e) {                       // Click on nav
    e.preventDefault();                                      // Prevent loading
    var url = this.href;                                     // Get URL to load

    $('nav a.current').removeClass('current');               // Update nav
    $(this).addClass('current');

    $('#container').remove();                                // Remove old part
    $('#content').load(url + ' #container').hide().fadeIn('slow'); // Add new
  });





});