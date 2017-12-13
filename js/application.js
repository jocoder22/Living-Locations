var mapper;
function showMap(){
  mapper = new google.maps.Map(document.getElementById('map'),{
    center: {lat: 41.90385, lng: -72.75893},
    zoom: 13
  });
}
