from django.urls import path
from .views import *

urlpatterns = [
    path('listings/', viewListings ),
    path('seed/', seedData),
    path('listing/<int:id>/', listing)
]