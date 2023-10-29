from django.http import HttpResponse, Http404, HttpResponseBadRequest, QueryDict
from .models import *
from itertools import chain
from django.core import serializers
import json
from django.db.models import Q
from .serializers import *
from statistics import mean
from typing import List
import random

# Create your views here.

#TODO: What to return in these cases? is message good enough?


def viewListings(request):

    if request.method == 'GET':
        listings = Listing.objects.filter(isListed=True)
        if request.GET.__contains__('search'):
            listings = listings.filter(Q(title__icontains=request.GET.get('search')) | Q(
                description__icontains=request.GET.get('search')) | Q(speciesCZ__icontains=request.GET.get('search')) | Q(speciesLat__icontains=request.GET.get('search')))
        if request.GET.__contains__('loc'):
            listings = listings.filter(
                locationName__icontains=request.GET.get('loc'))
        if request.GET.__contains__('zip'):
            listings = listings.filter(
                locationZip=request.GET.get('zip'))
        if request.GET.__contains__('diff'):
            listings = listings.filter(
                difficulty=request.GET.get('diff'))
        if request.GET.__contains__('ttype'):
            listings = listings.filter(
                tradeType=request.GET.get('ttype'))
        if request.GET.__contains__('height'):
            listings = listings.filter(
                size=request.GET.get('height'))
        if request.GET.__contains__('maxprice'):
            listings = listings.filter(
                price__lte = request.GET.get('maxprice'))
        if request.GET.__contains__('minprice'):
            listings = listings.filter(
                price__gte = request.GET.get('minprice'))
        if request.GET.__contains__('ptype'):
            listings = listings.filter(
                plantType=request.GET.get('ptype'))
        if request.GET.__contains__('cat'):
            listings = listings.filter(
                category_id=request.GET.get('cat'))
        if request.GET.__contains__('auth'):
            listings = listings.filter(
                author_id=request.GET.get('auth'))
        if request.GET.__contains__('instructions'):
            if request.GET.get('instructions') == 'true':
                listings = listings.exclude(instructions='')
        if request.GET.__contains__('favorite'):
            if request.GET.get('favorite') == 'true':
                listings = listings.filter(isFavorite=True)
            else:
                listings = listings.filter(isFavorite=False)
        if request.GET.__contains__('environment'):
            listings = listings.filter(
                environment=request.GET.get('environment'))

        listings = listings.select_related('author').prefetch_related('image_listing')
        serializer = ListingSerializerMainPage(listings, many=True)
        return HttpResponse(json.dumps(serializer.data), content_type = 'text/json')


    if request.method == 'POST':
        payload = json.loads(request.body)
        # if not ( payload.keys() >= {'title', 'description' , 'category' , 'tradeType', 'locationN', 'locationZ'}):
        #     return HttpResponse(json.dumps({'Error' : 'Listing has missing fields'}), content_type = 'text/json')
        listing = Listing()
        listing.title = payload['title']
        listing.description = payload['description']
        if 'instructions' in payload:
            listing.instructions = payload['instructions']

        cat = Category.objects.filter(name=payload['category']).all().first()
        listing.category = cat
        
        if 'author' in payload:
            listing.author_id = payload['author']
        else:
            listing.author_id = 1

        if 'difficulty' in payload and payload['difficulty'] != '':
            listing.difficulty = payload['difficulty']

        if 'price' in payload and payload['price'] != '':
            listing.price = payload['price']

        if 'environment' in payload and payload['environment'] != '':
            listing.environment = payload['environment']

        if 'plantType' in payload and payload['plantType'] != '':
            listing.plantType = payload['plantType']

        if 'size' in payload and payload['size'] != '':
            listing.size = payload['size']

        if 'speciesCZ' in payload and payload['speciesCZ'] != '':
            listing.speciesCZ = payload['speciesCZ']

        if 'speciesLat' in payload and payload['speciesLat'] != '':
            listing.speciesLat = payload['speciesLat']

        listing.tradeType = payload['tradeType']

        listing.locationName = payload['locationN']

        listing.locationZip = payload['locationZ']
        listing.mainImage_id = 1

        listing.save()
        if not 'images' in payload:
            payload['images'] = [
                '/img/1/1.jpg',
                '/img/1/2.jpg',
                '/img/1/3.jpg',
                '/img/1/4.jpg',
                '/img/1/5.jpg',
            ]
        for imagePath in payload['images']:
            image = Image()
            image.path = imagePath
            image.listing = listing
            image.save()
        
        return HttpResponse(json.dumps({'Success' : listing.id}), content_type = 'text/json')
    
    if request.method == 'PUT':
        payload = json.loads(request.body)
        if 'favoriteId' in payload:
            listing = Listing.objects.filter(id=payload['favoriteId']).all().first()
            listing.isFavorite = not listing.isFavorite
            listing.save()
            return HttpResponse(json.dumps({'Success' : listing.id, 'Listing set to' : 'Favorite' if listing.isFavorite else 'Not favorite' }), content_type = 'text/json')
        return HttpResponseBadRequest()

    return HttpResponseBadRequest(json.dumps({'Error' : f'{request.method} not supported'}), content_type='text/json')


        


def listing(request, id):
    listings = Listing.objects.filter(id=id).all()
    listing = listings.first()
    if not listings:
        return Http404()

    if request.method == 'GET':
        listing = Listing.objects.filter(id = id).select_related('author').prefetch_related('image_listing')
        serializer = ListingSerializerFull(listing.first(), many=False)
        return HttpResponse(json.dumps(serializer.data), content_type = 'text/json')
    if request.method == 'PUT':
        

        payload = json.loads(request.body)

        
        listing.title = payload['title']
        listing.description = payload['description']
        listing.category_id = payload['category']
        listing.author_id = payload['author']
        listing.difficulty = payload['difficulty']
        if 'price' in payload:
            listing.price = payload['price']
        listing.plantType = payload['plantType']
        listing.size = payload['size']
        listing.tradeType = payload['tradeType']
        listing.save()
        #TODO: IMAGES change?

    if request.method == 'DELETE':
        listings.first().delete()
        return HttpResponse(json.dumps({'success': 'Object deleted', 'id': id}), content_type='text/json')
    if request.method == 'POST':
        payload = json.loads(request.body)

        comment = Comment()
        comment.text = payload['text']
        comment.listing = listing
        comment.author_id = 1
        if 'parentCommentId' in payload:
            comment.parentComment_id = payload['parentCommentId']
        comment.save()

        return HttpResponse(json.dumps({'Success': 'Comment added.', 'id': comment.id}), content_type='text/json')

def viewUsers(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializerFull(users, many=True)
        return HttpResponse(json.dumps(serializer.data), content_type = 'text/json')
    if request.method == 'PUT':
        payload = json.loads(request.body)
        if 'favoriteId' in payload:
            user = User.objects.filter(id=payload['favoriteId']).all().first()
            user.isFavorite = not user.isFavorite
            user.save()
            return HttpResponse(json.dumps({'Success' : user.id, 'User set to' : 'Favorite' if user.isFavorite else 'Not favorite' }), content_type = 'text/json')
        return HttpResponseBadRequest()

    return HttpResponseBadRequest(json.dumps({'Error' : f'{request.method} not supported'}), content_type='text/json')

def viewUser(request,id):
    user = User.objects.get(id=id)
    if not user:
        return Http404()

    if request.method == 'GET':
        user = User.objects.filter(id = id).prefetch_related('rating_ratee').prefetch_related('listing_author')
        serializer = UserSerializerFull(user.first(), many=False)
        return HttpResponse(json.dumps(serializer.data), content_type='text/json')

    if request.method == 'DELETE':
        user.delete()
        return HttpResponse(json.dumps({'success': 'User deleted', 'id': id}), content_type='text/json')

    if request.method == 'POST':
        rating = Rating()

        payload = json.loads(request.body)

        rating.text = payload['text']
        rating.rating = payload['rating']
        rating.ratee = user
        rating.author_id = 1
        rating.save()

        userRatings = Rating.objects.filter(ratee_id = id)
        user.averageRating = mean([ rating.rating for rating in userRatings ])
        user.save()

        return HttpResponse(json.dumps({'Success': 'Rating added.', 'id': rating.id}), content_type='text/json')

    return HttpResponseBadRequest(json.dumps({'Error' : f'{request.method} not supported'}), content_type='text/json')

def commentDelete(request, id):
    comment = Comment.objects.get(id=id)
    if not comment:
        return Http404()

    if request.method == 'DELETE':
        comment.delete()
        return HttpResponse(json.dumps({'Success': 'Comment deleted.', 'id': id}), content_type='text/json')

    return HttpResponseBadRequest(json.dumps({'Error' : 'No other methods supported'}), content_type='text/json')

def ratingDelete(request, id):
    rating = Rating.objects.get(id=id)
    if not rating:
        return Http404()

    if request.method == 'DELETE':
        rating.delete()
        return HttpResponse(json.dumps({'Success': 'Rating deleted.', 'id': id}), content_type='text/json')

    return HttpResponseBadRequest(json.dumps({'Error' : f'{request.method} not supported'}), content_type='text/json')


def seedData(request):

# ====================================================== #
#                     SEED CATEGORIES                    #
# ====================================================== #

    for categoryName in CategoryChoices.choices:
        cat = Category()
        cat.name = categoryName[0]
        cat.save()

# ====================================================== #
#                       SEED USERS                       #
# ====================================================== #

    user1_MS = User()
    user1_MS.name = 'Marek'
    user1_MS.surname = 'Stolár'
    user1_MS.averageRating = 3
    user1_MS.save()

    user2_SS = User()
    user2_SS.name = 'Samko'
    user2_SS.surname = 'Sadík'
    user2_SS.averageRating = 4
    user2_SS.save()

    user3_AC = User()
    user3_AC.name = 'Adam'
    user3_AC.surname = 'Conway'
    user3_AC.save()
    
    user4_IT = User()
    user4_IT.name = 'Igor'
    user4_IT.surname = 'Toman'
    user4_IT.save()
    
    user5_MV = User()
    user5_MV.name = 'Marie'
    user5_MV.surname = 'Valníková'
    user5_MV.save()

# ====================================================== #
#                     SEED LISTINGS                      #
# ====================================================== #
    listings: List[Listing] = []

# USER 1 LISTINGS
    listing1 = Listing()
    listing1.title = 'Daruji Sedmikrásku'
    listing1.description = 'Daruji sedmikrásku za odvoz :)'
    listing1.difficulty = DifficultyChoices.EASY
    listing1.tradeType = TradeTypeChoices.FREE
    listing1.size = HeightChoices.TWENTY_FIFTY
    listing1.plantType = PlantTypeChoices.ALIVE_PLANT
    listing1.author = user1_MS
    listing1.category_id = 5
    listing1.environment = PlantEnvironment.OUTSIDE
    listing1.locationName = 'Brno'
    listing1.locationZip = '61600'
    listing1.speciesCZ = 'Sedmikráska'
    listing1.isFavorite = True
    listing1.views = random.random()*100
    listing1.save()
    listings.append(listing1)

    listing2 = Listing()
    listing2.title = 'Prodám Orchidej'
    listing2.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac mollis nisl. Aenean elementum, mi ac feugiat dictum, urna nibh pulvinar erat, in blandit orci orci non sem. Integer venenatis euismod velit non suscipit. Nunc finibus scelerisque nulla, nec convallis leo tristique vitae. Mauris eleifend fringilla enim eu auctor. Pellentesque rutrum, magna sed sollicitudin gravida, tellus ante ornare purus, vitae suscipit est lacus in tellus. Proin convallis auctor dolor, vitae porttitor urna orci. '
    listing2.difficulty = DifficultyChoices.MEDIUM
    listing2.tradeType = TradeTypeChoices.CASH
    listing2.size = HeightChoices.TWENTY_FIFTY
    listing2.price = 152
    listing2.plantType = PlantTypeChoices.ALIVE_PLANT
    listing2.author = user1_MS
    listing2.category_id = 5
    listing2.environment = PlantEnvironment.INSIDE
    listing2.locationName = 'Brno'
    listing2.locationZip = '61600'
    listing2.speciesLat = 'Orchidaceae'
    listing2.views = random.random()*100
    listing2.save()
    listings.append(listing2)

    listing3 = Listing()
    listing3.title = 'Prodám Kaktusy'
    listing3.description = 'Prodám 5 kaktusů'
    listing3.difficulty = DifficultyChoices.HARD
    listing3.tradeType = TradeTypeChoices.FREE
    listing3.size = HeightChoices.ONE_TWENTY
    listing3.price = 0
    listing3.plantType = PlantTypeChoices.ALIVE_PLANT
    listing3.author = user1_MS
    listing3.category_id = 1
    listing3.environment = PlantEnvironment.ANYWHERE
    listing3.locationName = 'Brno'
    listing3.locationZip = '61600'
    listing3.speciesCZ = 'Kaktus'
    listing3.isFavorite = True
    listing3.views = random.random()*100
    listing3.save()
    listings.append(listing3)

# USER 2 LISTINGS
    listing4 = Listing()
    listing4.title = 'Prodám Pampelišku'
    listing4.description = 'Bude to ale fasa drahá pampeliška. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat pulvinar ligula. Nam tempus, sapien quis bibendum sollicitudin, libero odio dictum felis, eget tincidunt nibh dui id felis aenean. '
    listing4.difficulty = DifficultyChoices.EASY
    listing4.tradeType = TradeTypeChoices.CASH
    listing4.size = HeightChoices.ONE_TWENTY
    listing4.price = 1200
    listing4.plantType = PlantTypeChoices.ALIVE_PLANT
    listing4.author = user2_SS
    listing4.category_id = 6
    listing4.environment = PlantEnvironment.OUTSIDE
    listing4.locationName = 'Praha - Haje'
    listing4.locationZip = '14900'
    listing4.speciesCZ = 'Pampeliška'
    listing4.speciesLat = 'Taraxacum'
    listing4.views = random.random()*100
    listing4.save()
    listings.append(listing4)

    listing5 = Listing()
    listing5.title = 'Vyměním Růže'
    listing5.description = 'Rád bych vyměnil růže za fikusy.'
    listing5.difficulty = DifficultyChoices.EASY
    listing5.tradeType = TradeTypeChoices.TRADE
    listing5.size = HeightChoices.TWENTY_FIFTY
    listing5.plantType = PlantTypeChoices.ALIVE_PLANT
    listing5.author = user2_SS
    listing5.category_id = 5
    listing5.environment = PlantEnvironment.OUTSIDE
    listing5.locationName = 'Praha - Haje'
    listing5.locationZip = '14900'
    listing5.speciesCZ = 'Růže'
    listing5.views = random.random()*100
    listing5.save()
    listings.append(listing5)

    listing6 = Listing()
    listing6.title = 'Prodám Tulipány'
    listing6.description = '5 kusů tulipánů.'
    listing6.difficulty = DifficultyChoices.EASY
    listing6.tradeType = TradeTypeChoices.CASH
    listing6.size = HeightChoices.TWENTY_FIFTY
    listing6.price = 200
    listing6.plantType = PlantTypeChoices.ALIVE_PLANT
    listing6.author = user2_SS
    listing6.category_id = 5
    listing6.environment = PlantEnvironment.OUTSIDE
    listing6.locationName = 'Praha - Haje'
    listing6.locationZip = '14900'
    listing6.speciesCZ = 'Tulipán'
    listing6.views = random.random()*100
    listing6.save()
    listings.append(listing6)

# USER 3 LISTINGS
    listing7 = Listing()
    listing7.title = 'Lilie'
    listing7.description = 'a'
    listing7.difficulty = DifficultyChoices.EASY
    listing7.tradeType = TradeTypeChoices.CASH
    listing7.size = HeightChoices.TWENTY_FIFTY
    listing7.price = 200
    listing7.plantType = PlantTypeChoices.ALIVE_PLANT
    listing7.author = user3_AC
    listing7.category_id = 5
    listing7.environment = PlantEnvironment.UNKNOWN
    listing7.locationName = 'Praha - Haje'
    listing7.locationZip = '14900'
    listing7.speciesCZ = 'Lilie'
    listing7.views = random.random()*100
    listing7.save()
    listings.append(listing7)

# Hvozdík zahradní
    listing8 = Listing()
    listing8.title = 'Hvozdik Zahradní'
    listing8.description = 'Is Hvozdík'
    listing8.difficulty = DifficultyChoices.EASY
    listing8.tradeType = TradeTypeChoices.CASH
    listing8.size = HeightChoices.TWENTY_FIFTY
    listing8.price = 200
    listing8.plantType = PlantTypeChoices.ALIVE_PLANT
    listing8.category_id = 5
    listing8.environment = PlantEnvironment.OUTSIDE
    listing8.author = user3_AC
    listing8.views = random.random()*100
    listing8.save()
    listings.append(listing8)
# Hyacint
    listing9 = Listing()
    listing9.title = 'Hyacint'
    listing9.description = 'Is Hyacint'
    listing9.difficulty = DifficultyChoices.EASY
    listing9.tradeType = TradeTypeChoices.CASH
    listing9.size = HeightChoices.TWENTY_FIFTY
    listing9.price = 200
    listing9.plantType = PlantTypeChoices.ALIVE_PLANT
    listing9.category_id = 5
    listing9.environment = PlantEnvironment.OUTSIDE
    listing9.author = user3_AC
    listing9.views = random.random()*100
    listing9.save()
    listings.append(listing9)

# USER 4 LISTINGS
    listing10 = Listing()
    listing10.title = 'Chryzantéma'
    listing10.description = 'Is Chryzantéma'
    listing10.difficulty = DifficultyChoices.MEDIUM
    listing10.tradeType = TradeTypeChoices.CASH
    listing10.size = HeightChoices.TWENTY_FIFTY
    listing10.price = 200
    listing10.plantType = PlantTypeChoices.ALIVE_PLANT
    listing10.category_id = 5
    listing10.environment = PlantEnvironment.INSIDE
    listing10.author = user4_IT
    listing10.views = random.random()*100
    listing10.save()
    listings.append(listing10)

    listing11 = Listing()
    listing11.title = 'Narcis'
    listing11.description = 'Is Narcis'
    listing11.difficulty = DifficultyChoices.MEDIUM
    listing11.tradeType = TradeTypeChoices.CASH
    listing11.size = HeightChoices.TWENTY_FIFTY
    listing11.price = 200
    listing11.plantType = PlantTypeChoices.ALIVE_PLANT
    listing11.category_id = 5
    listing11.environment = PlantEnvironment.INSIDE
    listing11.author = user4_IT
    listing11.views = random.random()*100
    listing11.save()
    listings.append(listing11)

    listing12 = Listing()
    listing12.title = 'Vlčí Mák'
    listing12.description = 'Vlčí Mák'
    listing12.difficulty = DifficultyChoices.EASY
    listing12.tradeType = TradeTypeChoices.CASH
    listing12.size = HeightChoices.TWENTY_FIFTY
    listing12.price = 200
    listing12.plantType = PlantTypeChoices.ALIVE_PLANT
    listing12.category_id = 6
    listing12.environment = PlantEnvironment.INSIDE
    listing12.author = user4_IT
    listing12.views = random.random()*100
    listing12.save()
    listings.append(listing12)

# USER 5 LISTINGS
    listing13 = Listing()
    listing13.title = 'Slunečnice'
    listing13.description = 'Is Slunečnice'
    listing13.difficulty = DifficultyChoices.EASY
    listing13.tradeType = TradeTypeChoices.CASH
    listing13.size = HeightChoices.TWENTY_FIFTY
    listing13.price = 200
    listing13.plantType = PlantTypeChoices.ALIVE_PLANT
    listing13.category_id = 7
    listing13.environment = PlantEnvironment.OUTSIDE
    listing13.author = user5_MV
    listing13.views = random.random()*100
    listing13.save()
    listings.append(listing13)

    listing14 = Listing()
    listing14.title = '???'
    listing14.description = 'But for real ???'
    listing14.difficulty = DifficultyChoices.HARD
    listing14.tradeType = TradeTypeChoices.CASH
    listing14.size = HeightChoices.TWENTY_FIFTY
    listing14.price = 200
    listing14.plantType = PlantTypeChoices.ALIVE_PLANT
    listing14.category_id = 8
    listing14.environment = PlantEnvironment.ANYWHERE
    listing14.author = user5_MV
    listing14.views = random.random()*100
    listing14.save()
    listings.append(listing14)

    listing15 = Listing()
    listing15.title = 'Hvězdník'
    listing15.description = 'Is Hvězdník'
    listing15.difficulty = DifficultyChoices.EASY
    listing15.tradeType = TradeTypeChoices.CASH
    listing15.size = HeightChoices.TWENTY_FIFTY
    listing15.price = 200
    listing15.plantType = PlantTypeChoices.ALIVE_PLANT
    listing15.category_id = 8
    listing15.environment = PlantEnvironment.INSIDE
    listing15.author = user5_MV
    listing15.views = random.random()*100
    listing15.save()
    listings.append(listing15)


# ====================================================== #
#                     SEED COMMENTS                      #
# ====================================================== #

    comment = Comment()
    comment.text = 'Nice listing yo!'
    comment.author = user1_MS
    comment.listing = listing1
    comment.save()

    comment2 = Comment()
    comment2.text = 'Bad listing :('
    comment2.author = user1_MS
    comment2.listing = listing2
    comment2.save()

    comment3 = Comment()
    comment3.text = 'Die'
    comment3.author = user2_SS
    comment3.listing = listing2
    comment3.parentComment = comment2
    comment3.save()

    comment4 = Comment()
    comment4.text = 'Live'
    comment4.author = user3_AC
    comment4.listing = listing2
    comment4.parentComment = comment2
    comment4.save()

    comment5 = Comment()
    comment5.text = 'I like apples'
    comment5.author = user4_IT
    comment5.listing = listing2
    comment5.save()

    


# ====================================================== #
#                       SEED IMAGES                      #
# ====================================================== #

    for listing in listings:
        mainImage = Image()
        mainImage.path = f'/img/{listing.id}/1.jpg'
        mainImage.listing = listing
        mainImage.save()
        listing.mainImage = mainImage
        listing.save()
        for imageIndex in range (2,6):
            image = Image()
            image.path = f'/img/{listing.id}/{imageIndex}.jpg'
            image.listing = listing
            image.save()

# ====================================================== #
#                      SEED RATINGS                      #
# ====================================================== #

    rating1 = Rating()
    rating1.ratee = user2_SS
    rating1.author = user1_MS
    rating1.rating = 4
    rating1.text = 'Mr. CoolGuy'
    rating1.save()

    rating2 = Rating()
    rating2.ratee = user1_MS
    rating2.author = user2_SS
    rating2.rating = 3
    rating2.text = 'Yes'
    rating2.save()

    return HttpResponse(json.dumps({'Success': 'Seed successful'}), content_type='text/json')