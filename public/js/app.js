// //put the sliders in place with id tags
var bedSlider = document.getElementById('bedroomSlider');
var bathSlider = document.getElementById('bathroomSlider');
var sqftSlider = document.getElementById('sqftSlider');

// //inniciate slider
noUiSlider.create(bedSlider, {
	start: [ 1, 4 ],
	connect: true,
	range: {
		'min': 1,
		'max': 10
	}
});

noUiSlider.create(bathSlider, {
	start: [ 2, 5 ],
	connect: true,
	range: {
		'min': 1,
		'max': 6
	}
});

noUiSlider.create(sqftSlider, {
	start: [ 800, 3500 ],
	connect: true,
	range: {
		'min': 500,
		'max': 5000
	}
});

// //slider update

var bedMinMax = [
	document.getElementById('minBed'),
	document.getElementById('maxBed')
];

var bathMinMax = [
	document.getElementById('minBath'),
	document.getElementById('maxBath')
];

var sqftMinMax = [
	document.getElementById('minSqft'),
	document.getElementById('maxSqft')
];

// //slider listener

bedSlider.noUiSlider.on('update', function( values, handle ) {
	bedMinMax[handle].innerHTML = Math.round(values[handle]);
	// update hidden fields
	if(handle == 0) {
		document.getElementById('hiddenMinBed').value = Math.round(values[0])
	}
	else if(handle == 1) {
		document.getElementById('hiddenMaxBed').value = Math.round(values[1])
	}

});


bathSlider.noUiSlider.on('update', function( values, handle ) {
	bathMinMax[handle].innerHTML = Math.round(values[handle]);
	// update hidden fields
	if(handle == 0) {
		document.getElementById('hiddenMinBath').value = Math.round(values[0])
	}
	else if(handle == 1) {
		document.getElementById('hiddenMaxBath').value = Math.round(values[1])
	}

});

sqftSlider.noUiSlider.on('update', function( values, handle ) {
	sqftMinMax[handle].innerHTML = Math.round(values[handle]/100)*100;
	// update hidden fields
	if(handle == 0) {
		document.getElementById('hiddenMinSqft').value = Math.round(values[0])
	}
	else if(handle == 1) {
		document.getElementById('hiddenMaxSqft').value = Math.round(values[1]*100)/100;
	}

});

