 $(document).ready(function(event) {
  //particlesJS.load('particles-js', 'particles.json');
  //particlesJS.load("particles-js", particlesJSON)

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
       minDate:'-1995/06/16',
       maxDate:0,
       theme:'dark',

    }).attr('readonly','readonly');
    
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


const particlesJSON = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

particlesJS("particles-js", particlesJSON)