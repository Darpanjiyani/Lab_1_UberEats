from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Restaurant
from django.contrib.auth.models import User
from .serializers import DishSerializer
from .models import Dish, Restaurant
from .serializers import OrderSerializer
from .models import Order

@api_view(['POST'])
def restaurant_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        return Response({'status': 'Logged in successfully'})
    else:
        return Response({'status': 'Login failed', 'message': 'Invalid credentials'}, status=400)

@api_view(['POST'])
def restaurant_signup(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    location = request.data.get('location')

    # Create User and Restaurant profile
    user = User.objects.create_user(username=username, email=email, password=password)
    restaurant = Restaurant.objects.create(user=user, location=location)

    return Response({'status': 'Restaurant created successfully'})

@api_view(['GET'])
def restaurant_profile(request):
    user = request.user
    restaurant = Restaurant.objects.get(user=user)
    
    profile_data = {
        'username': user.username,
        'email': user.email,
        'location': restaurant.location,
        'description': restaurant.description,
        'contact_info': restaurant.contact_info,
    }

    return Response({'status': 'Profile details', 'data': profile_data})

@api_view(['PUT'])
def update_restaurant_profile(request):
    user = request.user
    restaurant = Restaurant.objects.get(user=user)

    # Get data from the request
    location = request.data.get('location')
    description = request.data.get('description')
    contact_info = request.data.get('contact_info')

    # Update profile fields
    restaurant.location = location if location else restaurant.location
    restaurant.description = description if description else restaurant.description
    restaurant.contact_info = contact_info if contact_info else restaurant.contact_info
    restaurant.save()

    return Response({'status': 'Profile updated successfully'})


@api_view(['GET', 'POST'])
def menu(request):
    user = request.user
    restaurant = Restaurant.objects.get(user=user)

    if request.method == 'POST':
        # Create a new dish
        name = request.data.get('name')
        description = request.data.get('description')
        price = request.data.get('price')
        category = request.data.get('category')

        # Create a new dish for the restaurant
        Dish.objects.create(restaurant=restaurant, name=name, description=description, price=price, category=category)
        return Response({'status': 'Dish added successfully'})

    # GET method: list all dishes
    dishes = Dish.objects.filter(restaurant=restaurant)
    serializer = DishSerializer(dishes, many=True)
    return Response({'status': 'Menu retrieved', 'data': serializer.data})

@api_view(['GET', 'PUT'])
def orders(request):
    user = request.user
    restaurant = Restaurant.objects.get(user=user)

    if request.method == 'PUT':
        # Update order status
        order_id = request.data.get('order_id')
        status = request.data.get('status')
        
        try:
            order = Order.objects.get(id=order_id, restaurant=restaurant)
            order.status = status
            order.save()
            return Response({'status': 'Order status updated'})
        except Order.DoesNotExist:
            return Response({'status': 'Order not found'}, status=404)

    # GET method: list all orders for the restaurant
    orders = Order.objects.filter(restaurant=restaurant)
    serializer = OrderSerializer(orders, many=True)
    return Response({'status': 'Orders retrieved', 'data': serializer.data})