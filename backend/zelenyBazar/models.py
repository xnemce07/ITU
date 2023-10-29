from typing import List
from django.db import models

# Create your models here.


class TradeTypeChoices(models.TextChoices):
    FREE = 'Zdarma'
    TRADE = 'Výměna'
    CASH = 'Prodej'


class DifficultyChoices(models.TextChoices):
    EASY = 'Lehká'
    MEDIUM = 'Střední'
    HARD = 'Těžká'
    UNKNOWN = 'Nezadáno'


class HeightChoices(models.TextChoices):
    ONE_TWENTY = '1-20cm'
    TWENTY_FIFTY = '20-50cm'
    FIFTY_HUNDRED = '50-100cm'
    HUNDRED_HUNDREDFIFTY = '100-150cm'
    HUNDREDFIFTY_PLUS = '>150cm'
    UNKNOWN = 'Nezadáno'


class CategoryChoices(models.TextChoices):
    CACTI = 'Kaktusy'
    PALMS = 'Palmy'
    FRUIT_TREES = 'Ovocné stromy'
    DECORATIVE_TREES = 'Okrasné stromy'
    DECORATIVE_PLANTS = 'Okrasné rostliny'
    OTHERS = 'Ostatní'
    HERBS = 'Bylinky'
    EXOTIC_PLANTS = 'Exotické rostliny'
    ROCKY_PLANTS = 'Skalničky'
    UTILITY_PLANTS = 'Užitkové rostliny'
    DECORATIVE_BUSHES = 'Okrasné keře'



class PlantTypeChoices(models.TextChoices):
    CUT = 'Řízek'
    SEEDS = 'Semínka'
    ALIVE_PLANT = 'Živá rostlina'
    OTHER = 'Ostatní'
    UNKNOWN = 'Nezadáno'


class PlantEnvironment(models.TextChoices):
    INSIDE = 'Uvnitř'
    OUTSIDE = 'Venku'
    ANYWHERE = 'Všude'
    UNKNOWN = 'Nezadáno'


class RatingStarsChoices(models.IntegerChoices):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(choices=CategoryChoices.choices, max_length=30)

    class Meta:
        managed = True


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    joinedOn = models.DateTimeField(auto_now_add=True)
    isFavorite = models.BooleanField(default=False)
    profilePicture = models.CharField(max_length=60, default='')
    averageRating = models.FloatField(default=0)

    class Meta:
        managed = True


class Listing(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    locationName = models.CharField(max_length=50, default='Unknown')
    locationZip = models.CharField(max_length=5, default='00000')
    difficulty = models.CharField(
        choices=DifficultyChoices.choices, default=DifficultyChoices.UNKNOWN, max_length=10)
    tradeType = models.CharField(
        choices=TradeTypeChoices.choices, default=TradeTypeChoices.CASH, max_length=10)
    size = models.CharField(choices=HeightChoices.choices,
                            default=HeightChoices.UNKNOWN, max_length=10)
    price = models.IntegerField(default=0)
    plantType = models.CharField(
        choices=PlantTypeChoices.choices, default=PlantTypeChoices.UNKNOWN, max_length=20)
    createdOn = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    editedOn = models.DateTimeField(auto_now=True, null=True, blank=True)
    isFavorite = models.BooleanField(default=False)
    isListed = models.BooleanField(default=True)
    instructions = models.CharField(default='', max_length=1000)
    speciesCZ = models.CharField(default='', max_length=100)
    speciesLat = models.CharField(default='', max_length=100)
    views = models.IntegerField(default=0) 

    environment = models.CharField(
        choices=PlantEnvironment.choices, default=PlantEnvironment.UNKNOWN, max_length=20)

    category = models.ForeignKey(
        Category, on_delete=models.DO_NOTHING, null=False, related_name='listing_category')
    author = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, null=False, related_name='listing_author')
    mainImage = models.ForeignKey('Image', on_delete=models.DO_NOTHING,
                                  related_name='listing_mainpic', null=True, blank=True)

    class Meta:
        managed = True


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.CharField(max_length=1000)
    createdOn = models.DateTimeField(auto_now_add=True)

    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=False)
    parentComment = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='comment_parent')
    listing = models.ForeignKey(
        Listing, on_delete=models.CASCADE, null=True, related_name='comment_listing')

    class Meta:
        managed = True
        ordering = ['-pk']


class Rating(models.Model):
    id = models.AutoField(primary_key=True)
    rating = models.IntegerField(choices=RatingStarsChoices.choices)
    text = models.CharField(max_length=1000)
    createdOn = models.DateTimeField(auto_now_add=True)

    author = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, null=False, related_name='rating_author')
    ratee = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, null=False, related_name='rating_ratee')


class Image(models.Model):
    id = models.AutoField(primary_key=True)
    path = models.CharField(max_length=100)

    listing = models.ForeignKey(
        Listing, on_delete=models.CASCADE, null=False, related_name='image_listing')

    class Meta:
        managed = True


class ListingFacade:
    def __init__(self, listing: Listing, comments: List[Comment]):
        self.listing = listing
        self.comments = comments

    def __iter__(self):
        return self
