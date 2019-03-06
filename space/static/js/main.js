 $(document).ready(function(event) {


   $('.question1').on('click', function(){
     $('.num-answer').show();
   });
   $('.question2').on('click', function(){
     $('.spaceperson').show();
   });
   $('.question3').on('click', function(){
     $('.location-div').show();
   });


   req = $.ajax({
     url : "/space/space_station",
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

   $('.location-btn').on('click', function(){
      var locationText = $('.location-text').html();
      //console.log(locationText);

      req = $.ajax({
        url : "/space/space_station",
        type : "GET",
        success: function(data) {
          console.log(data);
          $('.location-text').html('<span>' + data['name']+ ', ' + data['admin1'] + ', ' + data['cc'] + '</span>');
          var lat = data['lat'];
          var lng = data['lon'];
          var location = {lat: parseFloat(lat), lng: parseFloat(lng)};
          initMap(location);
        }

   });

 });
});

// Initialize and add the map
function initMap(location) {
var map = new google.maps.Map(
  document.getElementById('map'), {zoom: 3, center: location});
// The marker, positioned at Uluru
var marker = new google.maps.Marker({position: location, map: map});
}
