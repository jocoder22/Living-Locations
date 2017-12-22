
var model = [
  {name: 'Robert Treat Center', address: '50 Park Pl,', city: 'Newark, NJ 07102', localLocation:[{lat: 40.739037 , lng: -74.168635}]},
  {name: 'Newark Museum', address: '49 Washington St,', city: 'Newark, NJ 07102', localLocation:[{lat: 40.743108 , lng: -74.171716 }]},
  {name: 'University Hospital', address: '150 Bergen St,', city:'Newark, NJ 07103', localLocation:[{lat: 40.740356 , lng: -74.190241 }]},
  {name: 'CityPlex 12', address: '360-394 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.733553 , lng: -74.196379 }]},
  {name: "Applebee's Grill", address: '383 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.732625 , lng: -74.196325 }]},
  {name: "Wendy's Place", address: '427 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.732158 , lng: -74.199454 }]},
  {name: 'Home Depot', address: '399-443 Springfield Ave Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.731358 , lng: -74.198435 }] }];


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
   myLocation2 = myPlaces()[4].localLocation[0];
 };


  var configureBindingHandlers = function() {
		ko.bindingHandlers.mapper = {
				init: function(element, valueAccessor){
					map = new google.maps.Map(element, {
            center: myLocation2,
						zoom: 15
					});

          var defaultIcon = makeMarkerIcon('9e4545',  21);
          var highlightedIcon = makeMarkerIcon('e50615', 41);
          var bounds = new google.maps.LatLngBounds();
          var infowindowcontainer = new google.maps.InfoWindow();
          for (var i = 0; i < model.length; i++) {
            var maklocation = model[i].localLocation[0];
            var makaddress = model[i].address;
            var maktitle = model[i].name;
            var makcity = model[i].city;
            var marker = new google.maps.Marker({
              position: maklocation,
              map: map,
              //title: maktitle,
              animation: google.maps.Animation.DROP,
              cursor: maktitle + '<br>' + makaddress + '<br>' + makcity,
              icon: defaultIcon,
              id: i
            });

            markers.push(marker);


            marker.addListener('mouseover', function(){
              populateInfoWindow(this, infowindowcontainer);
            });

            //marker.addListener('click', function(){
            //  populateInfoWindow(this, infowindowcontainer);
            //});

            marker.addListener('mouseover', function() {
              this.setIcon(highlightedIcon);
            });

            marker.addListener('mouseout', function() {
              this.setIcon(defaultIcon);
            });

            bounds.extend(markers[i].position);

          }
          map.fitBounds(bounds);



          function populateInfoWindow(marker, infowindow) {
            if (infowindow.marker != marker) {
              infowindow.marker = marker;
              infowindow.setContent(marker.cursor);
              marker.setAnimation(google.maps.Animation.BOUNCE);
              infowindow.open(map, marker);

              marker.addListener('mouseout', function(){
                infowindow.close(map, marker);

              });

              marker.addListener('click', function(){
                marker.setAnimation(null);
              });

              //marker.addListener('dblclick', function(){
              //  infowindow.setMarker(null);
              //});
            }
          }




          function makeMarkerIcon(markerColor, a) {
            var markerImage = new google.maps.MarkerImage( 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +  '|60|_|%E2%80%A2',
              new google.maps.Size(a, 34),
              new google.maps.Point(0, 0),
              new google.maps.Point(10, 34),
              new google.maps.Size(a, 34));
            return markerImage;
          }




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
