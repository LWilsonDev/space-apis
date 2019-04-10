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

   $(function () {
     $("#id_date").datetimepicker({

       format:'Y-m-d',
       timepicker:false,
       minDate:'-1990/06/16',
       maxDate:0,
       theme:'dark',

    });
   });

  
 });

function call_ajax(){
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
};


// Initialize and add the map
function initMap(location) {
var map = new google.maps.Map(
  document.getElementById('map'), {zoom: 3, center: location});
var marker = new google.maps.Marker({position: location, map: map});
}
