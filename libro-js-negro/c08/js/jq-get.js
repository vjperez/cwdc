// NOTE: This example will only work if you run it on a web server (it will not work locally)

// This first variable creates the t-shirt options, the HTML for it is shown on p395
var vote = '<br><br><div id="vote"><div class="third"><a href="http://localxxxhost/WebDevelopmentStuff/libro-js-negro/c08/jq-get.html?tshirt=gray"><img src="img/t-gray.png" id="gray" alt="gris" /></a></div><div class="third"><a href="http://example.org?tshirt=yellow" id="yellow"><img src="img/t-yellow.png" id="yellow" alt="yellow" /></a></div><div class="third"><a href="http://example.org?tshirt=green"><img src="img/t-green.png" id="green" alt="green" /></a></div></div>';
$('#selecciona').append(vote);

// This adds ratings to the side bar
$('#selecciona a').on('click', function(evento) {
  evento.preventDefault();
  var queryString = 'vote=' + $(evento.target).attr('id');
  $.get('http://localhost/WebDevelopmentStuff/libro-js-negro/c08/php/votes.php', queryString, function(datos, estatus, xhrObjeto) {
    $('#selecciona').html(datos);
	console.log('el estatus es ' + estatus + '\nxhrObjeto.status es ' + xhrObjeto.status + '\nxhrObjeto.statusText es ' + xhrObjeto.statusText);
  });
});



// despues que corra el php en un server el p id='selecciona' debe ser cambiado por lo que envie el server