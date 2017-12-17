
var model = [
  {name: 'Mummy Pot', address:'44 white park road newalk NJ 071122'},
  {name: 'Cityplay22', address:'44 white park road newalk NJ 071122'},
  {name: 'TigerMart', address:'44 white park road newalk NJ 071122'},
  {name: 'Oceonview', address:'44 white park road newalk NJ 071122'},
  {name: 'Boypharm', address:'44 white park road newalk NJ 071122'},
  {name: 'Bestdeal', address:'44 white park road newalk NJ 071122'},
  {name: 'Shopbig', address:'44 white park road newalk NJ 071122'},
  {name: 'Mesuem906', address:'44 white park road newalk NJ 071122'}
];



var viewModel = function(){
  var map;
  var localLocation = {lat: 40.733679, lng: -74.170804};
  var myPlaces = ko.observableArray();
  var marker;

  var updateArray = function () {
    model.forEach(function(PlaceItem){
      myPlaces.push(PlaceItem);
    });
  };

  var configureBindingHandlers = function() {
		ko.bindingHandlers.mapper2 = {
				init: function(element, valueAccessor){
					map = new google.maps.Map(element, {
						zoom: 13
					});
					centerMap(localLocation);
          var marker = new google.maps.Marker({
            position: localLocation,
            map: map,
            title: 'Hello World!'
          });
				}
		};
	};


  var centerMap = function (location) {
		map.setCenter(location);
		google.maps.event.trigger(map, 'resize');
	}

  init = function () {
    configureBindingHandlers();
    marker.setMap(map);
    updateArray();
    ko.applyBindings(viewModel);
  };

  $(init);

  return{
    map: map,
    myPlaces: myPlaces,
    marker: marker,

  };
}();
