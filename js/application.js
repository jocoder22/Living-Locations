
var model = [
  {name: 'Robert Treat Center', address: '50 Park Pl, Newark, NJ 07102', localLocation:[{lat: 40.739037 , lng: -74.168635}]},
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
  var markers = [];

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
   myLocation2 = myPlaces()[5].localLocation[0];
 };


  var configureBindingHandlers = function() {
		ko.bindingHandlers.mapper = {
				init: function(element, valueAccessor){
					map = new google.maps.Map(element, {
            center: myLocation2,
						zoom: 15
					});
          //centerMap(myLocation);
          var bounds = new google.maps.LatLngBounds();
          var infowindowcontainer = new google.maps.InfoWindow();
          for (var i = 0; i < model.length; i++) {
            var maklocation = model[i].localLocation[0];
            var maktitle = model[i].name;
            var marker = new google.maps.Marker({
              position: maklocation,
              map: map,
              title: maktitle,
              animation: google.maps.Animation.DROP,
              id: i

            });

            markers.push(marker);


            //marker.addListener('mouseover', function(){
            //  populateInfoWindow(this, infowindowcontainer);
            //});

            marker.addListener('click', function(){
              populateInfoWindow(this, infowindowcontainer);
            });
           bounds.extend(markers[i].position);

          }
          map.fitBounds(bounds);



          function populateInfoWindow(marker, infowindow) {
            if (infowindow.marker != marker) {
              infowindow.marker = marker;
              infowindow.setContent('<div>' + marker.title + '</div>');
              infowindow.open(map, marker);

              //marker.addListener('mouseout', function(){
              //  infowindow.close(map, marker);
              //});

              marker.addListener('closeclick', function(){
                infowindow.close(map, marker);
              });

              marker.addListener('doubleclick', function(){
                infowindow.setMarker(null);
              });
              map.fitBounds(bounds);

            }
            map.fitBounds(bounds);


          }
          map.fitBounds(bounds);



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
