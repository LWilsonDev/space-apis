from django.shortcuts import render
import requests
import reverse_geocoder as rg
import pprint
import json
from django.http import Http404, HttpResponse



def space_station(request):
        # Make a get request to get the latest position of the international space station from the opennotify api.
        #Get astronaut numbers from API
        response = requests.get("http://api.open-notify.org/astros.json")
        data = response.json()
        res = data["number"]
        spaceperson = data['people']
        place = get_location()

        if request.is_ajax():
            data = json.dumps(place)
            return HttpResponse(data, content_type='application/json')

        return render(request, 'space/space_station.html', {'res':res, 'spaceperson':spaceperson, 'place':place})

def get_location():
    #Get ISS location
    response = requests.get("http://api.open-notify.org/iss-now.json")

    data = response.json()
    #Get long and lat from data
    pos = data['iss_position']
    lat = pos['latitude']
    long = pos['longitude']
    #put long and lat into tuple for rg.search
    coordinates= (lat, long)
    #turn coordinates into a readable location - city name and country code
    place_data = (rg.search(coordinates))
    place = place_data[0]
    return place
    # place looks like: OrderedDict([('lat', '-54.28111'), ('lon', '-36.5092'), ('name', 'Grytviken'), ('admin1', ''), ('admin2', ''), ('cc', 'GS')])



    #return obj['iss_position']['latitude'], obj['data']['iss_position']['latitude']
