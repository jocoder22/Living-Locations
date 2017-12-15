
var myApp = function(){

  var model = [
    {name: 'Mummy Pot', address:'44 white park road newalk NJ 071122'},
    {name: 'Cityplay22', address:'44 white park road newalk NJ 071122'},
    {name: 'TigerMart', address:'44 white park road newalk NJ 071122'},
    {name: 'Oceonview', address:'44 white park road newalk NJ 071122'},
    {name: 'Boypharm', address:'44 white park road newalk NJ 071122'},
    {name: 'Bestdeal', address:'44 white park road newalk NJ 071122'},
    {name: 'Shopbig', address:'44 white park road newalk NJ 071122'},
    {name: 'Mesuem90', address:'44 white park road newalk NJ 071122'}
  ]


  var map;
  var myPlaces =  ko.obervableArray([]);

  var updateMyPlaces = function () {
    model.forEach(function(modelitem){
      myPlaces.push(modelitem);
      console.log(myPlaces());
    });
  };


  showMap = function () {
    map = new google.maps.Map({
      center: {lat: 40.733679, lng: -74.170804},
      zoom: 10
    });

  };

  init = function () {
    ko.applyBinding(myApp);
  };

  $(init);

  return{
    map: map,
    myPlaces: myPlaces
  };
}();
