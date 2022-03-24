from django.urls import path
from . import views

app_name = 'predictions'
urlpatterns = [
    path('image', views.FileToURL.as_view(), name='image')
]