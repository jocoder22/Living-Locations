
var myApp = function(){

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


  var map;
  var localLocation = {lat: 40.733679, lng: -74.170804};
  var myPlaces = ko.observableArray();

  ko.utils.arrayForEach(model, function(item) {
    myPlaces.push(item);
  });


  var updateArray = function () {
    model.forEach(function(PlaceItem){
      myPlaces.push(PlaceItem);
    });
  };

  var configureBindingHandlers = function() {
		ko.bindingHandlers.mapper2 = {
				init: function(element, valueAccessor){
					map = new google.maps.Map(element, {
						zoom: 15
					});
					centerMap(localLocation);
				}
		};
	};

  var centerMap = function (location) {
		map.setCenter(location);
		google.maps.event.trigger(map, 'resize');
	}

  showMap = function () {
    map = new google.maps.Map({
      center: {lat: 40.733679, lng: -74.170804},
      zoom: 10
    });

  };

  init = function () {
    configureBindingHandlers();
    updateArray();
    ko.applyBindings(myApp);
  };

  $(init);

  return{
    map: map,
    myPlaces: myPlaces,
    updateArray: updateArray
  };
}();
