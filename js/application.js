
var model = [
  {name: 'Robert Treat Center', address: '50 Park Pl,', city: 'Newark, NJ 07102', localLocation:[{lat: 40.739037 , lng: -74.168635}]},
  {name: 'Newark Museum', address: '49 Washington St,', city: 'Newark, NJ 07102', localLocation:[{lat: 40.743108 , lng: -74.171716 }]},
  {name: 'University Hospital', address: '150 Bergen St,', city:'Newark, NJ 07103', localLocation:[{lat: 40.740356 , lng: -74.190241 }]},
  {name: 'Newark ShopRite', address: '206 Springfield Ave', city:'Newark, NJ 07103', localLocation:[{lat: 40.736670 , lng: -74.186159 }]},
  {name: 'CityPlex 12', address: '360-394 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.733553 , lng: -74.196379 }]},
  {name: "Applebee Grill", address: '383 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.732625 , lng: -74.196325 }]},
  {name: "Wendy's Place", address: '427 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.732158 , lng: -74.199454 }]},
  {name: 'Home Depot', address: '399-443 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.731358 , lng: -74.198435 }] }];


var viewModel = function(){
  var map;
  var markers = [];
  var myPlaces = ko.observableArray();


  var updateArray = function () {
    model.forEach(function(PlaceItem){
      myPlaces.push(PlaceItem);
    });
  };


  var configureBindingHandlers = function() {
		ko.bindingHandlers.mapper = {
				init: function(element, valueAccessor){
					map = new google.maps.Map(element, {
            center: myPlaces()[4].localLocation[0],
						zoom: 12
					});

          var bounds = new google.maps.LatLngBounds();
          var infowindowcontainer = new google.maps.InfoWindow();

          for (var i = 0; i < model.length; i++) {
            var maklocation = myPlaces()[i].localLocation[0];
            var makaddress = myPlaces()[i].address;
            var maktitle = myPlaces()[i].name;
            var makcity = myPlaces()[i].city;
            var marker = new google.maps.Marker({
              position: maklocation,
              map: map,
              name: maktitle,
              animation: google.maps.Animation.DROP,
              cursor: '<h4>' + maktitle + '</h4>' + makaddress + '<br>' + makcity,
              id: i
            });
            markers.push(marker);
            console.log(marker.name);
            marker.addListener('mouseover', function(){
              populateInfoWindow(this, infowindowcontainer);
            });
            bounds.extend(markers[i].position);
          }
        map.fitBounds(bounds);



          function populateInfoWindow(marker, infowindow) {
            if (infowindow.marker != marker) {
              infowindow.marker = marker;
              infowindow.setContent(marker.cursor);
              infowindow.open(map, marker);
              marker.addListener('click', function(){
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {marker.setAnimation(null);}, 1000);
              });

              marker.addListener('mouseout', function(){
                infowindow.close(map, marker);
              });

            }
          }

				}
		};
	};

  init = function () {
    configureBindingHandlers();
    updateArray();
    ko.applyBindings(viewModel);
  };

  $(init);

  return{
    map: map,
    myPlaces: myPlaces,
  };
}();
