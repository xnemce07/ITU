from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=False)
    class Meta:
        model = Comment
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=False)
    class Meta:
        model = Rating
        fields = '__all__'

class ListingSerializerAuthorPage(serializers.ModelSerializer):
    mainImage = ImageSerializer(many=False)
    category = CategorySerializer(many=False)

    class Meta:
        model = Listing
        fields = '__all__'

class ListingSerializerMainPage(serializers.ModelSerializer):
    mainImage = ImageSerializer(many=False)
    author = UserSerializer(many=False)
    category = CategorySerializer(many=False)

    class Meta:
        model = Listing
        fields = '__all__'
    

class UserSerializerFull(serializers.ModelSerializer):
    rating_ratee = RatingSerializer(many=True)
    listing_author = ListingSerializerAuthorPage(many=True)
    class Meta:
        model = User
        fields = '__all__'

class ListingSerializerFull(serializers.ModelSerializer):
    image_listing = ImageSerializer(many=True)
    comment_listing = CommentSerializer(many=True)
    author = UserSerializerFull(many=False)
    category = CategorySerializer(many=False)
    mainImage = ImageSerializer(many=False)
    class Meta:
        model = Listing
        fields = '__all__'



