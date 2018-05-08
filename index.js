//masonry init

var container = document.querySelector('#container');
var msnry = new Masonry( container, {
  columnWidth: 200,
  gutter: 10,
  itemSelector: '.item'
});

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

//display locations based on user request - called by poi button
var count = 0;
function showLocations(){
  //reset page look
  var myNode = document.getElementById("container");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  var lat = document.getElementById("latitude");
  var long = document.getElementById("longitude");
  var poi = document.getElementById("poi");
  if(lat.value=="" || long.value=="" || poi.value==""){
    document.getElementById("error").innerHTML="Make sure all fields have correct values";
  }
  else{
    document.getElementById("error").innerHTML="";
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    count = 0;
    console.log(poi.value);
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
        generateImage(photo, results[i].name);
      }
      else{
        generateStreetView(results[i].geometry.location, results[i].name);
      }
    }
    if(count==0){
      count++;
      pagination.nextPage();
    }
  }
}

//creates image
function generateImage(image, name){
  var img = document.createElement("img");
  img.setAttribute("src", image);
  addToDocument(img, name);
}

//creates street view
function generateStreetView(latLong, name){
  var viewDiv = document.createElement("div");
  viewDiv.setAttribute("class", "view");
  var streetView = new google.maps.StreetViewPanorama(
    viewDiv, {
      position: latLong,
      pov: {
        heading: 34,
        pitch: 10
      }
    });
  addToDocument(viewDiv, name);
}

function addToDocument(node, name){
  var title = document.createElement("p");
  title.innerHTML = name;
  var div = document.createElement("div");
  div.setAttribute("class", "item");
  var button = document.createElement("button");
  button.innerHTML="Pin this!";
  div.appendChild(node);
  div.appendChild(title);
  div.appendChild(button);
  document.getElementById("container").appendChild(div);
  msnry.appended(div);
  msnry.reloadItems()
  msnry.layout();
}
