from django.urls import path
from .views import *

urlpatterns = [
    path('listings/', viewListings ),
    path('seed/', seedData),
    path('listings/<int:id>/', listing),
    path('users/', viewUsers),
    path('users/<int:id>/', viewUser),
    path('comment/<int:id>/', commentDelete),
    path('rating/<int:id>/', ratingDelete),
]
