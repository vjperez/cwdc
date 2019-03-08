jQuery(document).ready(
	function(){
		var look = jQuery.urlParam('look');
		switch(look) {
			//you can join the null case and busca case together, should avoid requesting portada.html
			//twice when there is NO look parameter (null)
			case null:
				//jQuery(window.location).attr('href', window.location.pathname + '?look=busca');
			break;
			case 'busca':
				jQuery('#navBusca').hide();
				jQuery.get('looks/busca.html', function(datosDeRespuesta, estatus, xhrObjeto){
					//console.log(datosDeRespuesta);
					var mainDeBusca = jQuery(datosDeRespuesta).filter('#main');
					//console.log(mainDeBusca);
					jQuery('#containerForMain').html(mainDeBusca);
				});
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					//This code runs when get isCompleted and IF the get was requesting busca.html
					if(settingsObjeto.url === 'looks/busca.html'){ // === means true without type coersion - the type and value most both be equal
						jQuery('form').submit(function(evento){
							evento.preventDefault(); //not making a submit (GET request) here. Lets do it at look=opciones
							var que = jQuery('#queId').val();
							que = jQuery.cleanStr(que); // clean function returns cleaned str
							var donde = jQuery('#dondeId').val();
							donde = jQuery.cleanStr(donde); // clean function returns cleaned str
							alert('que=(' + que  + ')\ndonde=(' +  donde + ')');
							if(que.length > 0 || donde.length > 0){//i'm looking for a non empty cleaned str
								jQuery(window.location).attr('href', window.location.pathname + '?look=opciones&que=' + que.replace(/ /g, ':') + '&donde=' + donde.replace(/ /g, ':'));
							}else{
								jQuery.feedback('form#queDondeForm h3', 'Buscas algo?');
							}
						});
					}
				});
			break;
			case 'opciones':
			//This look completely depends on the amount of options to be presented.  It doesn't make
			//much sense to do a GET request for html, like other looks.  It is better to build mainDeOpciones
			//concatenating strings inside an each loop, with the requested JSON datos.
				var que = jQuery.urlParam('que');
				var donde = jQuery.urlParam('donde');
				que = que.replace(/:/g, ' ');// here each string with ',' as delimiter is converted into a string with ' ' as delimiter. The server receives 'limpia carro' not 'limpia,carro'
				donde = donde.replace(/:/g, ' ');// here each string with ',' as delimiter is converted into a string with ' ' as delimiter
				jQuery.getJSON('escritos/opciones.php', {que:que, donde:donde} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					//alert('datos: automatically parsed to object object by getJSON ' + datos + '\nxhrObjetoForDONE status ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE statustext ' + xhrObjetoForDONE.statusText + '\nestatusForDONE ' + estatusForDONE );
					var mainDeOpciones = '<div id="main" class="contenido margen">';
					jQuery.each(datos, function(buscaMode, cuaTuples){

						jQuery.each(cuaTuples, function(queryIndex, trios){
							mainDeOpciones += '<div class="ver-borde opcionesfotos">';
							if(buscaMode.indexOf("buscaBoth") > -1){
								mainDeOpciones += '<h3>' + queryIndex + ': ' + que + ' + ' + donde + '</h3>';
							}else if (buscaMode.indexOf("buscaQue") > -1){
								mainDeOpciones += '<h3>' + queryIndex + ': ' + que + '</h3>';
							}else if (buscaMode.indexOf("buscaDonde") > -1){
								mainDeOpciones += '<h3>' + queryIndex + ': ' + donde + '</h3>';
							}
							jQuery.each(trios, function(index, pares){
								jQuery.each(pares, function(meId, fotoSrc){
									mainDeOpciones += '<a href="portada.html?look=profile&meId=' + meId + '"><img class="ancho-sensi-cell-1de2 ancho-sensi-ipad-1de3 ancho-sensi-desk-1de4 alto-sensi-cell-1de2 alto-sensi-ipad-1de3 alto-sensi-desk-1de4 ver-borde" ';
									mainDeOpciones += ' src="imagenes/profile/' + fotoSrc + '"></a>';
								});
							}); // each in trios
							mainDeOpciones += '</div>'; // <div class="ver-borde opcionesfotos">
						}); // each in cuaTuples

					}); // each in datos
					mainDeOpciones += '</div>'; //  <div id="main" class="contenido margen">
					jQuery('#containerForMain').html(mainDeOpciones);
				})
				.fail(	jQuery.fallas  );
			break;
			case 'profile':
				//get meId then
				var meId = jQuery.urlParam('meId');
				//request get JSON data for that meId
				jQuery.getJSON('escritos/getMicroEmpreData.php', {meId:meId} )
				.done(function(datos, estatusForDONE, xhrObjetoForDONE){
					//alert('datos: automatically parsed to object object by getJSON : ' + datos + '\nxhrObjetoForDONE status ' + xhrObjetoForDONE.status + '\nxhrObjetoForDONE statustext ' + xhrObjetoForDONE.statusText + '\nestatusForDONE ' + estatusForDONE );
					//Once the data is in, get profile look
					jQuery.get('looks/profile.html', function(datosDeRespuesta, estatus, xhrObjeto){
						var mainDeProfile = jQuery(datosDeRespuesta).filter('#main');
						jQuery('#containerForMain').html(mainDeProfile);
					});
					//Once the look is in (ajaxComplete), then insert json data into profile look
					jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/profile.html'){
						//insert json data into profile look
						var date = new Date(datos.revisado).toString();
						jQuery('#video h5').text('Revisado: ' + date.substring(0, -1+date.indexOf('00:00:00')));
						jQuery('#video h1').text(datos.nombre);
						//alert('url: ' + datos.videoUrl + '\nEmpre id: ' + datos.microEmpreId + ' de tipo: ' + typeof datos.microEmpreId);
						jQuery('#video iframe').attr('src', datos.videoUrl);
						//alert(datos.quienSocialHandle);
						if(datos.quienSocialHandle.tt != '')   jQuery('#quien h3.tt').text(datos.quienSocialHandle.tt);
						if(datos.quienSocialHandle.fbk != '')  jQuery('#quien h3.fbk').text(datos.quienSocialHandle.fbk);
						if(datos.quienSocialHandle.igrm != '') jQuery('#quien h3.igrm').text(datos.quienSocialHandle.igrm);
						if(datos.quienSocialHandle.phn != '')  jQuery('#quien h3.phn').text(datos.quienSocialHandle.phn);
						//following code works when there are 5 or less images coming from getJSON.
						//the html is prepared for a max of 5 images, this code removes excess html when less than 5 images come
						//alert(datos.quienFotoSrc);
						jQuery('#quien #profilefotos img').each(function(index){
							if(index < datos.quienFotoSrc.length) { jQuery(this).attr('src', 'imagenes/profile/subidas/' + datos.quienFotoSrc[index]); }
							else { jQuery(this).remove(); }
						});
						//alert(datos.cuando);
						if(datos.cuando.lun  != '') jQuery('#cuando td.lun').text(datos.cuando.lun);
						if(datos.cuando.mar  != '') jQuery('#cuando td.mar').text(datos.cuando.mar);
						if(datos.cuando.mier != '') jQuery('#cuando td.mier').text(datos.cuando.mier);
						if(datos.cuando.jue  != '') jQuery('#cuando td.jue').text(datos.cuando.jue);
						if(datos.cuando.vier != '') jQuery('#cuando td.vier').text(datos.cuando.vier);
						if(datos.cuando.sab  != '') jQuery('#cuando td.sab').text(datos.cuando.sab);
						if(datos.cuando.dom  != '') jQuery('#cuando td.dom').text(datos.cuando.dom);
						//following code works when there are 10 or less 'que' coming from getJSON.
						//the html is prepared for a max of 10 'que', this code removes excess html when less than 10 'que' come
						//alert(datos.que);
						jQuery('#que li a').each(function(index){
							if(index < datos.que.length) {
								jQuery(this).text(datos.que[index]);
								jQuery(this).attr('href', window.location.pathname + '?look=opciones&que=' + datos.que[index].replace(/ /g, ':') + '&donde=');
							} else { jQuery(this).remove(); }
						});
						//following code works when there are 5 or less 'donde' coming from getJSON.
						//the html is prepared for a max of 5 'donde', this code removes excess html when less than 5 'donde' come
						//alert(datos.donde);
						jQuery('#donde li a').each(function(index){
							if(index < datos.donde.length) {
								jQuery(this).text(datos.donde[index]);
								jQuery(this).attr('href', window.location.pathname + '?look=opciones&que=' + '&donde=' + datos.donde[index].replace(/ /g, ':'));
							}else { jQuery(this).remove(); }
						});
						//alert('a tu casa: ' + datos.atucasa + '\ntipo: ' + typeof datos.atucasa);
						var clase = 'no'; if(datos.atucasa) clase = 'si';
						jQuery('#donde h3 span').attr('class', clase);
						jQuery('#donde h3').append(clase);

						
						//show only 1 social handle with class current
						var $icon = jQuery('div#quien ul li').click(function(evento){
							evento.preventDefault();
							jQuery('div#quien ul li img').removeClass('current');
							var $imgToFocus = jQuery(evento.currentTarget).find('img');
							var $socialClass = $imgToFocus.attr('class'); // grab the name this class, used to select h3 with same class
							$imgToFocus.addClass('current');

							jQuery('div#quien h3').removeClass('current');
							jQuery('div#quien h3.' + $socialClass).addClass('current');
						});
						
						
						//hide, show on click
						jQuery.toggleOnClick();						
						
					}//if
					});//ajax complete

				})//done
				.fail(  jQuery.fallas  );//fail
			break;
			case 'login':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
				//get login look
				jQuery.get('looks/login.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeLogin = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeLogin);
				});
				//once look is in, use jQuery on loaded elements to get values
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//This code runs when get isCompleted and IF the get was requesting login.html
					if(settingsObjeto.url === 'looks/login.html'){
						jQuery('form#loginForm').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) from html action.
							var user = jQuery('#usernameId').val();
							var pass = jQuery('#passwordId').val();
							if( jQuery.areValidUserYPass(user, pass, pass, "generalFeedback", 'form#loginForm h3') ){
								//Valid values son los q cumplen estas 3 cosas.
								//Estas cosas se pueden chequear antes del post y evito post sin sentido
								// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
								//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
								jQuery.post('escritos/login.php', {user:user, pass:pass} )
								.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
									//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
									//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
									try{
										//alert('datosJSONStr: ' + datosJSONStr);
										datosJSObj = JSON.parse(datosJSONStr);
										//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
									}catch(errorParseo){
										jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/login.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
									}
									if(datosJSObj.loguea){
										jQuery(window.location).attr('href', window.location.pathname + '?look=editDuenoShowEmpresas&duenoId=' + datosJSObj.duenoId);
									}else{
										//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
										jQuery.feedback('form#loginForm h3', 'Trata otra vez.');
									}
								})
								.fail(  jQuery.fallas  );//fail
							}
						});
					}//if
				});//ajax complete
			break;
			case 'creaDueno':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
				//get creaDueno look
				jQuery.get('looks/creaDueno.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeRegistro = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeRegistro);
				});
				//once look is in, use jQuery on loaded elements to get values
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//This code runs when get isCompleted and IF the get was requesting creaDueno.html
					if(settingsObjeto.url === 'looks/creaDueno.html'){
						jQuery('form#creaDuenoForm').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) from html action
							var usertb = jQuery('#usernameId').val();
							var pass01 = jQuery('#passwordId').val();
							var pass02 = jQuery('#passwordConfirmId').val();
							if( jQuery.areValidUserYPass(usertb, pass01, pass02, 'fullFeedback', 'form#creaDuenoForm h3') ){
								//Valid values son los q cumplen estas 3 cosas.
								//Estas cosas se pueden chequear antes del post y evito post sin sentido
								// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
								//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
								jQuery.post('escritos/creaDueno.php', {usertb:usertb, pass01:pass01} )//check here that password are equal
								.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
									//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
									//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
									try{
										//alert('datosJSONStr: ' + datosJSONStr);
										datosJSObj = JSON.parse(datosJSONStr);
										//alert('datosJSObj.registrado: ' + datosJSObj.registrado + '\ndatosJSObj.feedback: ' + datosJSObj.feedback + '\ndatosJSObj.duenoId: ' + datosJSObj.duenoId);
									}catch(errorParseo){
										jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/creaDueno.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
									}
									if(datosJSObj.registrado){
										jQuery(window.location).attr('href', window.location.pathname + '?look=editDuenoShowEmpresas&duenoId=' + datosJSObj.duenoId);
									}else{ // usuario es repetido en el database, por eso se chequea despues del post
										jQuery.feedback('form#creaDuenoForm h3', datosJSObj.feedback);
									}
								})
								.fail(  jQuery.fallas  );  //failing post
							}
						});
					}//if
				});//ajax complete
			break;
			case 'editDuenoShowEmpresas':
				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();
				//get duenoId
				var duenoId = jQuery.urlParam('duenoId');

				jQuery.get('looks/editDuenoShowEmpresas.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeDuenoData = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeDuenoData);
				});
				//once look is in, use jQuery to update look with profile values
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/editDuenoShowEmpresas.html'){

						//do this when form submitted ; editDuenoShowEmpresas task 1
						jQuery('form#editDuenoDataForm').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) from html action.
							var user = 'valorDummy';
							var pass01 = jQuery('#passwordId').val();
							var pass02 = jQuery('#passwordConfirmId').val();
							if( jQuery.areValidUserYPass(user, pass01, pass02, 'fullFeedback', 'form#editDuenoDataForm h3') ){
								//Valid values son los q cumplen estas 3 cosas.
								//Estas cosas se pueden chequear antes del post y evito post sin sentido
								// 1)lenght >= 4; 2)only numbers or letters; 3)both pass are equal;
								//Si tengo valores q fueron registrables entonces, Making a submit (POST request) here. Not in look=editDuenoShowEmpresas
								jQuery.post('escritos/editDuenoContrasena.php', {duenoId:duenoId, pass01:pass01} )
								.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
									//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
									//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
									try{
										//alert('datosJSONStr: ' + datosJSONStr);
										datosJSObj = JSON.parse(datosJSONStr);
										//alert('datosJSObj.loguea: ' + datosJSObj.loguea);
									}catch(errorParseo){
										jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server en escritos/editDuenoContrasena.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
									}
									if(datosJSObj.cambiado){
										jQuery.feedback('form#editDuenoDataForm h3', 'Tu contrasena fue cambiada.');
									}else{
										jQuery.feedback('form#editDuenoDataForm h3', 'Trata otra vez. No cambiamos NADA !');
									}
								})
								.fail(  jQuery.fallas  );//fail
							}
						});

						//show empresas ; editDuenoShowEmpresas task 2
						jQuery.getJSON('escritos/showEmpresasGetIds.php', {duenoId:duenoId} )
						.done(function(datos, estatusForDONE, xhrObjetoForDONE){
							var labelAndTable = '<label class="notHidable">Micro Empresas:</label>';
							labelAndTable   +=  '<table class="hidaxxxble">';
								jQuery.each(datos, function(index, meId, nombre){
									labelAndTable += '<tr><td><a class="link" href="portada.html?look=editMicroEmpre&meId=' + datos[index].meId + '&duenoId=' + duenoId + '">' + datos[index].nombre + '</a></td></tr>';
								});
							labelAndTable += '</table>';
							jQuery('#labelAndTableContainer').html(labelAndTable);
						})
						.fail(  jQuery.fallas  );//fail
						
						
						//hide, show on click ; editDuenoShowEmpresas task 3
						jQuery.toggleOnClick();

					}//if
				});//ajaxComplete


			break;
			case 'editMicroEmpre':
				//this code is very similar to profile case code - should make functions to simplify

				//remove navegation before requesting new html.  Less likely user will notice it going away.
				jQuery('#navBusca').hide(); jQuery('#navLogin').hide(); jQuery('#navSignUp').hide();

				jQuery.get('looks/editMicroEmpre.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeMicroEmpreData = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeMicroEmpreData);
				});


				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					if(settingsObjeto.url === 'looks/editMicroEmpre.html'){
						//get meId
						var meId = jQuery.urlParam('meId');
						//get duenoId
						var duenoId = jQuery.urlParam('duenoId');

						//task 1 when ajax complete ; if already existing micro empre then get that data
						if(meId > 0){ //in the db showEmpresasGetIds, zero is used for crear empresa
							//get profile data
							jQuery.getJSON('escritos/getMicroEmpreData.php', {meId:meId} )
							.done(function(datos, estatusForDONE, xhrObjetoForDONE){
										//nombre y video
										jQuery('form#editMicroEmpreForm input[name=nombre]').val(datos.nombre);
										jQuery('form#editMicroEmpreForm textarea[name=videoUrl]').val(datos.videoUrl);
										//quien
										jQuery('form#editMicroEmpreForm input[name=red1]').val(datos.quienSocialHandle.fbk);
										jQuery('form#editMicroEmpreForm input[name=red2]').val(datos.quienSocialHandle.tt);
										jQuery('form#editMicroEmpreForm input[name=red3]').val(datos.quienSocialHandle.igrm);
										jQuery('form#editMicroEmpreForm input[name=red4]').val(datos.quienSocialHandle.phn);

										//falta each para array de fotos

										//cuando
										jQuery('form#editMicroEmpreForm input[name=dia1]').val(datos.cuando.lun);
										jQuery('form#editMicroEmpreForm input[name=dia2]').val(datos.cuando.mar);
										jQuery('form#editMicroEmpreForm input[name=dia3]').val(datos.cuando.mier);
										jQuery('form#editMicroEmpreForm input[name=dia4]').val(datos.cuando.jue);
										jQuery('form#editMicroEmpreForm input[name=dia5]').val(datos.cuando.vier);
										jQuery('form#editMicroEmpreForm input[name=dia6]').val(datos.cuando.sab);
										jQuery('form#editMicroEmpreForm input[name=dia7]').val(datos.cuando.dom);

										//following code works when there are 10 or less 'que' coming from getJSON.
										//the html is prepared for a max of 10 'que'
										jQuery('form#editMicroEmpreForm input[name^=que]').each(function(index){
											if(index < datos.que.length) { jQuery(this).val(datos.que[index]); }
											else {  } //en el task3 aqui, entran al arreglo de ques, solo los cleaned ques que no son vacioStrs,
													  // ; en html profile solo se muestran los input field q entraron al arreglo los demas se remueven
										});

										//following code works when there are 5 or less 'donde' coming from getJSON.
										//the html is prepared for a max of 5 'donde'
										jQuery('form#editMicroEmpreForm input[name^=donde]').each(function(index){
											if(index < datos.donde.length) { jQuery(this).val(datos.donde[index]); }
											else {  } //en el task3 aqui, entran al arreglo de dondes, solo los cleaned dondes que no son vacioStrs,
													  // ; en html profile solo se muestran los input field q entraron al arreglo los demas se remueven
										});

										jQuery('form#editMicroEmpreForm input[value=si]').prop('checked', datos.atucasa);
										jQuery('form#editMicroEmpreForm input[value=no]').prop('checked', !datos.atucasa);

							})
							.fail(  jQuery.fallas  );
						}

						//task 2 when ajax complete ; handle form submit
						jQuery('form#editMicroEmpreForm').submit(function(evento){
							evento.preventDefault(); //not making a submit (POST request) from html action
							var formData = new FormData(this);

							//nombre y video
							
							//quienSocialHandle is a JS array object, it is stringified before sending it
							var quienSocialHandle = {fbk:jQuery('form#editMicroEmpreForm input[name=red1]').val(), tt:jQuery('form#editMicroEmpreForm input[name=red2]').val(),
													igrm:jQuery('form#editMicroEmpreForm input[name=red3]').val(),phn:jQuery('form#editMicroEmpreForm input[name=red4]').val()};
							formData.delete("red1"); //sending reds in array so delete them individually from formData
							formData.delete("red2"); //sending reds in array so delete them individually from formData
							formData.delete("red3"); //sending reds in array so delete them individually from formData
							formData.delete("red4"); //sending reds in array so delete them individually from formData
							quienSocialHandle = JSON.stringify(quienSocialHandle);
							formData.append('quienSocialHandle', quienSocialHandle);
							
							//falta quien foto src
							for(var i=0; i < jQuery('form#editMicroEmpreForm input#fotosId')[0].files.length; i++){
								alert(jQuery('form#editMicroEmpreForm input#fotosId')[0].files[i].name + ' size en bytes: ' +jQuery('form#editMicroEmpreForm input#fotosId')[0].files[i].size )
							}
							
							//cuando is a JS array object, it is stringified before sending it
							var cuando = {lun:jQuery('form#editMicroEmpreForm input[name=dia1]').val(), mar:jQuery('form#editMicroEmpreForm input[name=dia2]').val(),
										  mier:jQuery('form#editMicroEmpreForm input[name=dia3]').val(), jue:jQuery('form#editMicroEmpreForm input[name=dia4]').val(),
										  vier:jQuery('form#editMicroEmpreForm input[name=dia5]').val(), sab:jQuery('form#editMicroEmpreForm input[name=dia6]').val(),
										  dom:jQuery('form#editMicroEmpreForm input[name=dia7]').val()};
							formData.delete("dia1"); //sending dias in array so delete them individually from formData
							formData.delete("dia2"); //sending dias in array so delete them individually from formData
							formData.delete("dia3"); //sending dias in array so delete them individually from formData
							formData.delete("dia4"); //sending dias in array so delete them individually from formData
							formData.delete("dia5"); //sending dias in array so delete them individually from formData
							formData.delete("dia6"); //sending dias in array so delete them individually from formData
							formData.delete("dia7"); //sending dias in array so delete them individually from formData
							cuando = JSON.stringify(cuando);
							formData.append('cuando', cuando);							
							
							//sending ques in array
							var que = new Array();
							jQuery('form#editMicroEmpreForm input[name^=que]').each(function(index){
								var cleanedQue = jQuery.cleanStr(jQuery(this).val());
								if(jQuery.isVacioStr(cleanedQue)) {  } else { que[index] = cleanedQue; }
								formData.delete(jQuery(this).attr("name")); //sending ques in array so delete them individually from formData
							});
							que = JSON.stringify(que); //alert(que);
							formData.append('que', que);
							
							//sending dondes in array
							var donde = new Array();
							jQuery('form#editMicroEmpreForm input[name^=donde]').each(function(index){
								var cleanedDonde = jQuery.cleanStr(jQuery(this).val());
								if(jQuery.isVacioStr(cleanedDonde)) {  } else { donde[index] = cleanedDonde; }
								formData.delete(jQuery(this).attr("name")); //sending dondes in array so delete them individually from formData
							});
							donde = JSON.stringify(donde);  //alert(donde);
							formData.append('donde', donde);

							formData.append('duenoId', duenoId);
							formData.append('meId', meId);
							
							if(jQuery.haveAtLeast1Handle() & jQuery.have5OrLessFotos()){ // post only validated data ;  evaluate both AND clauses using &
									jQuery.ajax({method:"POST", url:"escritos/editMicroEmpreData.php", data:formData, processData:false, contentType:false, cache:false})
									.done(function(datosJSONStr, estatusForDONE, xhrObjetoForDONE){
										//el getJSON no entra al .done y cae en .fail si detecta errores de parseo.
										//Con el post tengo yo que usar un try block para detectar errores de parseo y mandarlo a jQuery fallas
										try{
											//alert('datosJSONStr: ' + datosJSONStr);
											datosJSObj = JSON.parse(datosJSONStr);
											//alert('datosJSObj.registrado: ' + datosJSObj.registrado + '\ndatosJSObj.feedback: ' + datosJSObj.feedback + '\ndatosJSObj.duenoId: ' + datosJSObj.duenoId);
										}catch(errorParseo){
											jQuery.fallas(new Object(), 'Error parsing la siguiente respuesta del server desde escritos/editMicroEmpreData.php<br>' + errorParseo.name + ' : ' + errorParseo.message, datosJSONStr);
										}
										if(datosJSObj.actualizado){
											jQuery(window.location).attr('href', window.location.pathname + '?look=profile&meId=' + datosJSObj.meId);
										}else{
											//jQuery.feedback('form#editMicroEmpreForm h3', datosJSObj.feedback);
										}
									})
									.fail(  jQuery.fallas  );  //failing post
							}
						});
						
						
/*
						//task 3 when ajax complete; hide, show on click ;
						jQuery.toggleOnClick();
*/						

					}//if
				});//ajaxComplete
			break;
			case 'faq':
				jQuery.get('looks/faq.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeFaq = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeFaq);
				});
				jQuery(document).ajaxComplete(function(evento, xhrObjeto, settingsObjeto){
					//alert('settingsObjeto.url ' + settingsObjeto.url + '\nxhrObjeto status ' + xhrObjeto.status + '\nxhrObjeto statustext ' + xhrObjeto.statusText);
					//This code runs when get isCompleted and IF the get was requesting faq.html
					if(settingsObjeto.url === 'looks/faq.html'){ // === means true without type coersion - the type and value most both be equal
						jQuery.toggleOnClick();
					}
				});
			break;
			default :
				jQuery.get('looks/default.html', function(datosDeRespuesta, estatus, xhrObjeto){
					var mainDeDefault = jQuery(datosDeRespuesta).filter('#main');
					jQuery('#containerForMain').html(mainDeDefault);
				});
			break;
		}//switch

	}); // ready function and statement


/*
var pathname = window.location.pathname; // Returns path only- http://localhost/WebDevelopmentStuff/mio/portada.html - saca parametros viejos
var url      = window.location.href;     // Returns full URL - http://localhost/WebDevelopmentStuff/mio/portada.html - deja parametros viejos
var origin   = window.location.origin;   // Returns base URL - localhost/
*/
