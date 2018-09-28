// first nodelist (html collection) is live ; second nodelist is static
// after changing element attributes in the DOM, the first list should have different elements
// after changing element attributes in the DOM, the second list should have the same elements only the class attribute should
// change from hot to cool 



document.write(els.toString() + '  :  ' + els2.toString() + '<br><br>');
document.write('Elementos (getElementsByClassName) antes de cambiar hot a cool ...<br>');
for(var i=0; i < els.length; i++){
	document.write('element id es:: ' + els[i].id.toString() + ',   element class es:: ' + els[i].className.toString());
	document.write('<br>');
}

document.write('<br><br>');
document.write('Elementos (querySelectorAll) antes de cambiar hot a cool ...<br>');
for(var i=0; i < els2.length; i++){
	document.write('element id es:: ' + els2[i].id.toString() + ',   element class es:: ' + els2[i].className.toString());
	document.write('<br>');
}
document.write('<br><br><br>Up to this point both selectors appear similar both after changing a class from hot a cool ...<br>');

// this 2 variables appear to be a reference to same list, because changing ONLY the second causes a change in BOTH lists!

els2[0].className = 'cool';


document.write('<br><br><br>Elementos (getElementsByClassName) despues de cambiar hot a cool ...<br>');
for(var i=0; i < els.length; i++){
	document.write('element id es:: ' + els[i].id.toString() + ',   element class es:: ' + els[i].className.toString());
	document.write('<br>');
}

document.write('<br><br>');
document.write('Elementos (querySelectorAll) despues de cambiar hot a cool ...<br>');
for(var i=0; i < els2.length; i++){
	document.write('element id es:: ' + els2[i].id.toString() + ',   element class es:: ' + els2[i].className.toString());
	document.write('<br>');
}