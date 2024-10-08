from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['user', 'profile_picture', 'favorites', 'address', 'phone_number', 'date_of_birth']
