//function for location of user - called by location button
function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(posFunction);
  }
}

function posFunction(position){
  var lat = document.getElementById("latitude");
  lat.value = position.coords.latitude;
  var long = document.getElementById("longitude");
  long.value = position.coords.longitude;
}
