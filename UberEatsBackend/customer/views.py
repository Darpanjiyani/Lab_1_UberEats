from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from .models import Customer
from restaurant.models import Restaurant
from django.contrib.auth import authenticate, logout as django_logout
from rest_framework import status
from rest_framework.authtoken.models import Token


@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    name = request.data.get('name')
    password = request.data.get('password')
    print(email, name, password)
    if not email or not name or not password:
        return Response({'status': 'Error', 'message': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=name, email=email, password=password)
        customer= Customer.objects.create(user=user)
        print(user, ":::::", customer)
        return Response({'status': 'Success', 'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'status': 'Error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def customer_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'status': 'Error', 'message': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        if user.check_password(password):
            # Create or get the user's token and username
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'status': 'Success', 
                'message': 'Login successful', 
                'token': token.key, 
                'username': user.username  # Add the username to the response
            }, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'Error', 'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({'status': 'Error', 'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        print(request.user.auth_token)
        request.user.auth_token.delete()
    except:
        return Response({'status': 'Error', 'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
    
    django_logout(request)
    return Response({'status': 'Success', 'message': 'User logged out successfully'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    print(user, "::")
    try:
        customer = Customer.objects.get(user=user)
    except Customer.DoesNotExist:
        return Response({'status': 'Error', 'message': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

    # Return all the relevant profile fields
    return Response({
        'status': 'Success',
        'message': 'User profile',
        'data': {
            'username': user.username,
            'email': user.email,
            'date_of_birth': customer.date_of_birth,
            'city': customer.city,
            'state': customer.state,
            'country': customer.country,
            'phone_number': customer.phone_number,
            'nickname': customer.nickname,  # Include the new nickname field
        }
    }, status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    try:
        customer = Customer.objects.get(user=user)
    except Customer.DoesNotExist:
        return Response({'status': 'Error', 'message': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

    # Update user fields
    user.username = request.data.get('name', user.username)
    user.email = request.data.get('email', user.email)

    # Update customer profile fields
    customer.date_of_birth = request.data.get('date_of_birth', customer.date_of_birth)
    customer.city = request.data.get('city', customer.city)
    customer.state = request.data.get('state', customer.state)
    customer.country = request.data.get('country', customer.country)
    customer.phone_number = request.data.get('phone_number', customer.phone_number)
    customer.nickname = request.data.get('nickname', customer.nickname)

    user.save()
    customer.save()

    return Response({'status': 'Success', 'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def favorites(request):
    user = request.user
    try:
        customer = Customer.objects.get(user=user)
    except Customer.DoesNotExist:
        return Response({'status': 'Error', 'message': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

    favorites_list = customer.favorites.all()
    data = [{'restaurant_name': fav.restaurant_name} for fav in favorites_list]

    return Response({'status': 'Success', 'message': 'Favorites list', 'data': data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_favorite(request, restaurant_id):
    user = request.user
    try:
        customer = Customer.objects.get(user=user)
        restaurant = Restaurant.objects.get(id=restaurant_id)
        customer.favorites.add(restaurant)
        return Response({'status': 'Success', 'message': 'Restaurant added to favorites'}, status=status.HTTP_200_OK)
    except Restaurant.DoesNotExist:
        return Response({'status': 'Error', 'message': 'Restaurant not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_favorite(request, restaurant_id):
    user = request.user
    try:
        customer = Customer.objects.get(user=user)
        restaurant = Restaurant.objects.get(id=restaurant_id)
        customer.favorites.remove(restaurant)
        return Response({'status': 'Success', 'message': 'Restaurant removed from favorites'}, status=status.HTTP_200_OK)
    except Restaurant.DoesNotExist:
        return Response({'status': 'Error', 'message': 'Restaurant not found'}, status=status.HTTP_404_NOT_FOUND)
