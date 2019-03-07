 $(document).ready(function(event) {

   detectBrowser();

   $('.question1').on('click', function(){
     $('.num-answer').show();
   });
   $('.question2').on('click', function(){
     $('.spaceperson').show();
   });


   // get location on page load
   req = $.ajax({
     url : "",
     type : "GET",
     success: function(data) {
       //console.log(data);
       $('.location-text').html('<span>' + data['name']+ ', ' + data['admin1'] + " " + data['cc'] + '</span>');
       var lat = data['lat'];
       var lng = data['lon'];
       var location = {lat: parseFloat(lat), lng: parseFloat(lng)};
       initMap(location);
     }
   });

   // get new location on button click
   $('.location-btn').on('click', function(){
      var locationText = $('.location-text').html();

      req = $.ajax({
        url : "",
        type : "GET",
        success: function(data) {
          console.log(data);
          $('.location-text').html('<span>' + data['name']+ ', ' + data['admin1'] + " " + data['cc'] + '</span>');
          var lat = data['lat'];
          var lng = data['lon'];
          var location = {lat: parseFloat(lat), lng: parseFloat(lng)};
          initMap(location);
        }

   });

 });
});

function detectBrowser() {
var useragent = navigator.userAgent;
var mapdiv = document.getElementById("map");

if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
 mapdiv.style.width = '100%';
 mapdiv.style.height = '100%';
} else {
 mapdiv.style.width = '80%';
 mapdiv.style.height = '400px';
}
}

// Initialize and add the map
function initMap(location) {
var map = new google.maps.Map(
  document.getElementById('map'), {zoom: 3, center: location});
// The marker, positioned at Uluru
var marker = new google.maps.Marker({position: location, map: map});
}
