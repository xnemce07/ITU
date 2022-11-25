from django.shortcuts import render
from django.http import HttpResponse, Http404
from .models import *
from itertools import chain
from django.core import serializers
import json

# Create your views here.


def viewListings(request):

    if request.method == 'GET':
        listings = Listing.objects.all()
        response = serializers.serialize('json', listings)
        return HttpResponse(response, content_type='text/json')
    elif request.method == 'POST':
        for des_object in serializers.deserialize('json', request.body):
            des_object.object.save()
            return HttpResponse(json.dumps({'Success' : des_object.object.id}), content_type = 'text/json')
        # payload = json.loads(request.body)
        # listing = Listing()
        # listing.title = payload['title']
        # listing.description = payload['description']
        # listing.category_id = payload['category']
        # listing.author_id = payload['author']
        # listing.difficulty = payload['difficulty']
        # if 'price' in payload:
        #     listing.price = payload['price']
        # listing.plantType = payload['plantType']
        # listing.size = payload['size']
        # listing.tradeType = payload['tradeType']
        # listing.save()
        # return HttpResponse(json.dumps({'Success' : listing.id}), content_type = 'text/json')

def listing(request, id):
    listing = Listing.objects.filter(id = id).all()
    
    if not listing:
        return Http404()

    if request.method == 'GET':
        comments = Comment.objects.select_related('listing').all()
        combined = list(chain(listing, comments))
        response = serializers.serialize('json', combined)
        return HttpResponse(response, content_type='text/json')
    if request.method == 'PUT':
        # for des_object in serializers.deserialize('json', request.body):
        #     des_object.save()
        #     return HttpResponse(json.dumps({'id' : des_object.id}), content_type = 'text/json')
        listing = Listing.objects.filter(id = id).first()
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
        return HttpResponse(json.dumps({'success' : listing.id}), content_type = 'text/json')
    if request.method == 'DELETE':
        listing.delete()
        return HttpResponse(json.dumps({'success' : 'Object deleted'}), content_type = 'text/json')

def seedData(request):

    cat = Category()
    for categoryName in CategoryChoices.choices:
        cat = Category()
        cat.name = categoryName
        cat.save()

    marek = User()
    marek.name = 'Marek'
    marek.surname = 'Stolár'
    marek.save()

    listing = Listing()
    listing.title = 'New plant'
    listing.description = 'This is new plant to test my api.'
    listing.difficulty = DifficultyChoices.MEDUIM
    listing.tradeTypeChoices = TradeTypeChoices.CASH
    listing.size = HeightChoices.SECOND
    listing.price = 150
    listing.plantType = PlantTypeChoices.ALIVE_PLANT
    listing.author = marek
    listing.category = cat
    listing.save()

    comment = Comment()
    comment.text = 'Nice listing yo!'
    comment.author = marek
    comment.listing = listing
    comment.save()

    comment2 = Comment()
    comment2.text = 'Bad listing :('
    comment2.author = marek
    comment2.listing = listing
    comment2.save()

    

    return HttpResponse(json.dumps({ 'Success' : 'Seed successful'}),content_type = 'text/json' )
    



