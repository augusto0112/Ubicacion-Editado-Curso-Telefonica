var app = {
	inicio: function () {
		'use strict';
		this.iniciaFastClick();

	},

	iniciaFastClick: function () {
		'use strict';
		var FastClick = window.FastClick;
		FastClick.attach(document.body);
	},

	dispositivoListo: function () {
		'use strict';
		
		navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
	},

	pintaCoordenadasEnMapa: function (position) {
		'use strict';

		var base = {
			'Map': L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29vdHlmZXIiLCJhIjoiY2l1MGlrb2M3MDAwMDJ6bXAxY3dlOXdkYiJ9.RBfUsuzHfLrofEyMR8IVlA', {
				'attribution': 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
				'maxZoom': 18
			})
		};
		
		var lat = position.coords.latitude;
		var long = position.coords.longitude;
		
		var map = L.map('map', {
			'center': [ lat , long ],
			'zoom': 13,
			'layers': [ base.Map ]
		});

		var control = L.control.layers(base).addTo(map);

		/*var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
		L.tileLayer('https://api.mapbox.com/styles/v1/augusto0112/cj02r3b9b001k2rrrbqg37yzk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXVndXN0bzAxMTIiLCJhIjoiY2owMnBibG50MDgxZDJxb3gzajFrZmphNSJ9.Tc_i6S8d7seFbjM-mJRw9Q', {
		  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		  maxZoom: 18
		}).addTo(miMapa);*/

		app.pintaMarcador([position.coords.latitude, position.coords.longitude], 'Estoy aquí: ' + position.coords.latitude + ', ' + position.coords.longitude, map);

		map.on('click', function (evento) {
			var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
			app.pintaMarcador(evento.latlng, texto, map);
		});
	},

	pintaMarcador: function (latlng, texto, mapa) {
		'use strict';
		var marcador = L.marker(latlng).addTo(mapa);
		marcador.bindPopup(texto).openPopup();
	},

	errorAlSolicitarLocalizacion: function (error) {
		'use strict';
		console.log(error.code + ': ' + error.message);
	}

};

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function () {
		'use strict';
		app.inicio();
	}, false);
	document.addEventListener('deviceready', function () {
		'use strict';
		app.dispositivoListo();
	}, false);
}