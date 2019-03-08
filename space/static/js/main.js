 $(document).ready(function(event) {
   $.ajaxSetup({ cache: false });

   $('.question1').on('click', function(){
     $('.num-answer').show();
   });
   $('.question2').on('click', function(){
     $('.spaceperson').show();
   });

   // get location on page load
   call_ajax();

   // get new location on button click
   $('.location-btn').on('click', function(){
      call_ajax();
   });

 });

function call_ajax(){
  req = $.ajax({
    url : "/",
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
};


// Initialize and add the map
function initMap(location) {
var map = new google.maps.Map(
  document.getElementById('map'), {zoom: 3, center: location});
// The marker, positioned at Uluru
var marker = new google.maps.Marker({position: location, map: map});
}
