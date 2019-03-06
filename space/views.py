from django.shortcuts import render
import requests
import reverse_geocoder as rg
import pprint
import json
from django.http import Http404, HttpResponse



def space_station(request):
        # Make a get request to get the latest position of the international space station from the opennotify api.
        # Set up the parameters we want to pass to the API.
        # This is the latitude and longitude of New York City.
        parameters = {"lat": 40.71, "lon": -74}
        # This gets the same data as the command above
        # Get the response from the API endpoint.
        response = requests.get("http://api.open-notify.org/astros.json")
        data = response.json()
# 9 people are currently in space.
        res = data["number"]
        spaceperson = data['people']
        place = get_location()

        if request.is_ajax():
            data = json.dumps(place)
            return HttpResponse(data, content_type='application/json')

        return render(request, 'space/space_station.html', {'res':res, 'spaceperson':spaceperson, 'place':place})

def get_location():
    response = requests.get("http://api.open-notify.org/iss-now.json")

    data = response.json()
    pos = data['iss_position']
    lat = pos['latitude']
    long = pos['longitude']
    coordinates= (lat, long)
    place_data = (rg.search(coordinates))
    place = place_data[0]

    return place



    #return obj['iss_position']['latitude'], obj['data']['iss_position']['latitude']
