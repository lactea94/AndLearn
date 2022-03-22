from django.shortcuts import render
from rest_framework import api_view, authentication_classes, permissions_classes


# Create your views here.
@api_view(['POST'])
def predict(request):
    img_url = request.get()