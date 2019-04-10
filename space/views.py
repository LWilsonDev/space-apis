from django.shortcuts import render
import requests
import reverse_geocoder as rg
import pprint
import json
from django.http import Http404, HttpResponse
from django.conf import settings
from .forms import DateForm
from django.contrib import messages
from datetime import date



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
def apod(request):

    if request.method=='POST':
        form = DateForm(request.POST)
        if form.is_valid():
            the_date = form.cleaned_data['date']
            response=requests.get('https://api.nasa.gov/planetary/apod?date={}&api_key={}'.format(the_date.date(), settings.API_KEY))
            data=response.json()
        else:
            return HttpResponse('no because {}'.format(form))


    else:
        form=DateForm()
        response=requests.get('https://api.nasa.gov/planetary/apod?api_key={}'.format(settings.API_KEY))
        data=response.json()
    if data['media_type'] == 'video':
        video = True
    else:
        video = False
    context = {
    'data': data,
    'form': form,
    'video': video,
    }
    return render(request, 'space/apod.html', context)


#Data looks like: {'copyright': 'Cory Schmitz', 'date': '2019-04-09', 'explanation': "Sometimes Saturn disappears. It doesn't really go away, though, it just disappears from view when our Moon moves in front.  Such a Saturnian eclipse was visible along a small swath of Earth -- from Brazil to Sri Lanka -- near the end of last month. The featured color image is a digital fusion of the clearest images captured by successive videos of the event taken in red, green, and blue, and taken separately for Saturn and the comparative bright Moon.  The exposures were taken from South Africa just before occultation -- and also just before sunrise. When Saturn re-appeared on the other side of the Moon almost two hours later, the Sun had risen. This year, eclipses of Saturn by the Moon occur almost monthly, but, unfortunately, are visible only to those with the right location and with clear and dark skies.   Follow APOD on Instagram: English or Persian", 'hdurl': 'https://apod.nasa.gov/apod/image/1904/SaturnMoon_Schmitz_1445.jpg', 'media_type': 'image', 'service_version': 'v1', 'title': 'Moon Occults Saturn', 'url': 'https://apod.nasa.gov/apod/image/1904/SaturnMoon_Schmitz_960.jpg'}

# to add a date query: https://api.nasa.gov/planetary/apod?date=2019-02-02&api_key={}.format(settings.API_KEY)
