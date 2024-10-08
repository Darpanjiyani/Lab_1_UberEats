from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .models import Customer

# Signup View
@api_view(['POST'])
def signup(request):
    username = request.data['username']
    email = request.data['email']
    password = request.data['password']
    user = User.objects.create_user(username=username, email=email, password=password)
    customer = Customer.objects.create(user=user)
    return Response({'status': 'User created successfully'})

# Login View
@api_view(['POST'])
def login(request):
    # Logic to authenticate the user
    return Response({'status': 'User logged in successfully'})

# Logout View
@api_view(['POST'])
def logout(request):
    # Logic to log out the user
    return Response({'status': 'User logged out successfully'})

# Profile View
@api_view(['GET'])
def profile(request):
    # Logic to get and return user profile details
    return Response({'status': 'User profile', 'data': {}})

# Update Profile View
@api_view(['PUT'])
def update_profile(request):
    # Logic to update user profile details
    return Response({'status': 'Profile updated successfully'})

# Favorites List View
@api_view(['GET'])
def favorites(request):
    # Logic to list the user's favorite restaurants
    return Response({'status': 'Favorites list', 'data': []})

# Add Favorite View
@api_view(['POST'])
def add_favorite(request, restaurant_id):
    # Logic to add a restaurant to favorites
    return Response({'status': 'Restaurant added to favorites'})

# Remove Favorite View
@api_view(['DELETE'])
def remove_favorite(request, restaurant_id):
    # Logic to remove a restaurant from favorites
    return Response({'status': 'Restaurant removed from favorites'})
