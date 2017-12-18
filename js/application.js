
var model = [
  {name: 'Robert Treat Center', address: '1 Center St, Newark, NJ 07102', localLocation:[{lat: 40.740631 , lng: -74.167341 }]},
  {name: 'Center for Law and Justice', address: '123 Washington St, Newark, NJ 07102', localLocation:[{lat: 40.740842 , lng: -74.173199 }]},
  {name: 'Newark Museum', address: '49 Washington St, Newark, NJ 07102', localLocation:[{lat: 40.743108 , lng: -74.171716 }]},
  {name: 'New Jersey Institute of Technology', address: '323 Dr Martin Luther King Jr Blvd, Newark, NJ 07102', localLocation:[{lat: 40.742345 , lng: -74.179335 }]},
  {name: 'University Hospital', address: '150 Bergen St, Newark, NJ 07103', localLocation:[{lat: 40.740356 , lng: -74.190241 }]},
  {name: 'CityPlex 12', address: '360-394 Springfield Ave, Newark, NJ 07103', localLocation:[{lat: 40.733553 , lng: -74.196379 }]},
  {name: "Applebee's Grill", address: '383 Springfield Ave, Newark, NJ 07103', localLocation:[{lat: 40.732625 , lng: -74.196325 }]},
  {name: "Wendy's Place", address: '427 Springfield Ave, Newark, NJ 07103', localLocation:[{lat: 40.732158 , lng: -74.199454 }]},
  {name: 'Home Depot', address: '399-443 Springfield Ave Springfield Ave, Newark, NJ 07103', localLocation:[{lat: 40.731358 , lng: -74.198435 }] }];



var viewModel = function(){
  var map;
  var myPlaces = ko.observableArray();
  var myLocation2;

  var updateArray = function () {
    model.forEach(function(PlaceItem){
      myPlaces.push(PlaceItem);
    });
  };

  // var myLocation = ko.computed(function(){
    //var mylatlng = myPlaces()[0].lat + ',' + myPlaces()[0].lng;
    //return mylatlng;
  //});

 var myLocation = model[1].localLocation[0];

 var setmylocation = function (){
   myLocation2 = myPlaces()[2].localLocation[0];
 };


  var configureBindingHandlers = function() {
		ko.bindingHandlers.mapper = {
				init: function(element, valueAccessor){
					map = new google.maps.Map(element, {
            center: myLocation2,
						zoom: 15
					});
          //centerMap(myLocation);
          var marker = new google.maps.Marker({
            position: myLocation2,
            map: map,
            title: 'Hello World!'
          });
				}
		};
	};

  //var centerMap = function (onelocation) {
    //map.setCenter(onelocation);
    //google.maps.event.trigger(map, 'resize');
  //}

  init = function () {
    configureBindingHandlers();
    updateArray();
    setmylocation();
    ko.applyBindings(viewModel);
  };

  $(init);

  return{
    map: map,
    myPlaces: myPlaces,
  };
}();
