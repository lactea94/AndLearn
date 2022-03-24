from rest_framework import serializers
from .models import *

class LearnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Learn
        fields = ('__all__')
