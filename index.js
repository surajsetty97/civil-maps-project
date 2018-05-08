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

//display locations based on user request
var count = 0;
function showLocations(){
  var lat = document.getElementById("latitude");
  var long = document.getElementById("longitude");
  var poi = document.getElementById("poi");
  if(lat.value===null || long.value===null || poi.value===null){
    document.getElementById("error").innerHTML="Make sure all fields have correct values";
  }
  else{
    document.getElementById("error").innerHTML="";
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    count = 0;
    service.nearbySearch({
      location: {lat: Number(lat.value), lng: Number(long.value)},
      type: [poi.value],
      rankBy: google.maps.places.RankBy.DISTANCE
    }, callback);
  }
}

function callback(results, status, pagination) {
  console.log(results.length);
  if(status === google.maps.places.PlacesServiceStatus.OK){
    var length = results.length;
    if(count==1){
      length = 5;
    }
    for(var i = 0; i<length; i++) {
      var photo = '';
      if(results[i].photos!==undefined){
        photo = results[i].photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});
      }
      generateImage(photo, results[i].name);
    }
    if(count==0){
      count++;
      pagination.nextPage();
    }
  }
}

function generateImage(image, name){
  var img = document.createElement("img");
  img.setAttribute("src", image);
  var title = document.createElement("p");
  title.innerHTML = name;
  var div = document.createElement("div");
  div.setAttribute("class", "item");
  div.appendChild(img);
  div.appendChild(title);
  document.getElementById("container").appendChild(div);
}
