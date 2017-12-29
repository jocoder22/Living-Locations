



var model = [
  {name: 'Robert Treat Center', address: '50 Park Pl,', city: 'Newark, NJ 07102', localLocation:[{lat: 40.739037 , lng: -74.168635}]},
  {name: 'Newark Museum', address: '49 Washington St,', city: 'Newark, NJ 07102', localLocation:[{lat: 40.743108 , lng: -74.171716}]},
  {name: 'University Hospital', address: '150 Bergen St,', city:'Newark, NJ 07103', localLocation:[{lat: 40.740356 , lng: -74.190241 }]},
  {name: 'Newark ShopRite', address: '206 Springfield Ave', city:'Newark, NJ 07103', localLocation:[{lat: 40.736670 , lng: -74.186159 }]},
  {name: 'CityPlex 12', address: '360-394 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.733553 , lng: -74.196379 }]},
  {name: "Applebee Grill", address: '383 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.732625 , lng: -74.196325 }]},
  {name: "Wendy's Place", address: '427 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.732158 , lng: -74.199454 }]},
  {name: 'Home Depot', address: '399-443 Springfield Ave,', city: 'Newark, NJ 07103', localLocation:[{lat: 40.731358 , lng: -74.198435 }]}];






var myAddress = ['50 Park Pl, Newark NJ 07102', '49 Washington St, Newark NJ 07102', '150 Bergen St, Newark NJ 07103', '25 Lafayette St, Newark, NJ 07102', '360-394 Springfield Ave, Newark NJ 07103', '383 Springfield Ave, Newark NJ 07103', '94 William St, Newark, NJ 07102','399-443 Springfield Ave, Newark NJ 07103'];


var viewModel = function(){
  var map;
  var markers = [];
  var myPlaces = ko.observableArray();
  var myPlaces3 = ko.observableArray();
  var placeNames = ko.observableArray();
  var query1 = ko.observable('');


  model.forEach(function(data) {
    myPlaces.push(data);
    placeNames.push(data.name.toLowerCase());
  });



  var filterPlace = ko.computed(function () {
    var myFilter = query1().toLowerCase();
    if (!myFilter) {
      //return myPlaces();
      return myPlaces();
    } else {
      //return ko.utils.arrayFilter(myPlaces(), function (item) {
      return ko.utils.arrayFilter(myPlaces(), function (item) {
        //myPlaces2(item.name().toLowerCase().indexOf(myFilter) !== -1);
        return item.name.toLowerCase().indexOf(myFilter) >=0;
        //return ko.utils.stringStartsWith(item.name().toLowerCase(), myFilter);
        //return myPlaces(myPlaces2()); //>=0
      });
    }
  });


  console.log(myPlaces());
  console.log(placeNames());
  console.log("this is filterPlace:  " + filterPlace());


  var ArrayJason = [];
  var ArrayJason2;

  $(function(){
    for (var i = 0; i < myAddress.length; i++) {
      var foursquareUrl = 'https://api.foursquare.com/v2/venues/search?limit=1&near=' + myAddress[i] + '&client_id=RMJLP0XC1CPMPOE4IINGN4RSBFUVTP10D1N0OO0RLBCCNPFK&client_secret=2OAXA5CSE43HQRNUYEEFV2FYR3SLB3CHVN0FCLXEGIUVCUUP&v=20170801'


      $.getJSON(foursquareUrl, function(data){
        format: 'json'
        //dataType: 'JSON'
      }).done(function(data){
        var listings = [];
        //var data2 = JSON.parse(data);
        var resp = data.response.venues[0]; var llresp = resp.location;
        listings.name = resp.name;
        listings.stats = resp.stats;
        listings.lat = llresp.lat;
        listings.lng = llresp.lng;
        listings.address = llresp.formattedAddress;
        //listings.localLocation = '[{ lat: llresp.lat  , lng:  llresp.lng  }]';
        console.log(listings);
        //ArrayJason.push(listings);
        myPlaces3.push(listings);

      }).fail(function(xhr, errorType, exception) {
        alert( xhr.status + " " + errorType+"\n\ " + exception);
      });
    }

  });

  //var ArrayJasonParse = JSON.parse(ArrayJason);
  //ArrayJason2 = ko.mapping.fromJS(ArrayJason)
  //ArrayJason2.forEach(function(data) {
    //myPlaces3.push(data);
  //});

  console.log(myPlaces3());
  //console.log(myPlaces3()[0].lat());
  //console.log(myPlaces3()[4].lat());



  //var boundMarker = function(marker){
  //  marker.setAnimation(google.maps.Animation.BOUNCE);
  //  setTimeout(function () {marker.setAnimation(null);}, 1000);
  //};







  var configureBindingHandlers = function() {
		ko.bindingHandlers.mapper = {
				init: function(element, valueAccessor){
					map = new google.maps.Map(element, {
            center: model[3].localLocation[0],
            //center: myPlaces3()[0].localLocation[0],
						zoom: 12
					});

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
              name: maktitle,
              animation: google.maps.Animation.DROP,
              cursor: '<h4>' + maktitle + '</h4>' + makaddress + '<br>' + makcity,
              id: i
            });

            markers.push(marker);

            this.showMarker = function(){
              populateInfoWindow(this, infowindowcontainer);
            }

            marker.addListener('mouseover', function(){
              populateInfoWindow(this, infowindowcontainer);
            });
            //var boundMarker = function(marker){
            //  marker.setAnimation(google.maps.Animation.BOUNCE);
              //setTimeout(function () {marker.setAnimation(null);}, 1000);
            //};

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
    //updateArray();
    //boundMarker();
    filterPlace();
    ko.applyBindings(viewModel);
  };

  $(init);

  return{
    map: map,
    myPlaces: myPlaces,
    //myPlaces3: myPlaces3,
    query1: query1,
    filterPlace: filterPlace,
  };
}();



var result22 = {"meta":{"code":200,"requestId":"5a4023f54c1f6770958c259c"},"notifications":[{"type":"notificationTray","item":{"unreadCount":0}}],"response":{"venues":[{"id":"4f32c28419836c91c7f77e80","name":"CityPlex 12","contact":{"phone":"9736425555","formattedPhone":"(973) 642-5555"},"location":{"address":"360 Springfield Ave","lat":40.73333,"lng":-74.19541,"labeledLatLngs":[{"label":"display","lat":40.73333,"lng":-74.19541}],"postalCode":"07103","cc":"US","city":"Newark","state":"NJ","country":"United States","formattedAddress":["360 Springfield Ave","Newark, NJ 07103"]},"categories":[{"id":"4bf58dd8d48988d17f941735","name":"Movie Theater","pluralName":"Movie Theaters","shortName":"Movie Theater","icon":{"prefix":"https:\/\/ss3.4sqi.net\/img\/categories_v2\/arts_entertainment\/movietheater_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":20,"usersCount":14,"tipCount":1},"url":"http:\/\/cityplex12.com","allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"hereNow":{"count":0,"summary":"Nobody here","groups":[]},"referralId":"v-1514152949","venueChains":[{"id":"556cdd65aceaff43eb03dde7"}],"hasPerk":false}],"confident":false,"geocode":{"what":"","where":"383 Springfield Ave, Newark, NJ 07103","feature":{"cc":"US","displayName":"383 Springfield Ave","woeType":100},"parents":[]}}}

//ko.mapping.fromJS(data, viewModel);
