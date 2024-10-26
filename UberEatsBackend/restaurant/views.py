# from django.contrib.auth import authenticate, login, logout as django_logout
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from django.contrib.auth.models import User
# from rest_framework.authtoken.models import Token
# from rest_framework import status
# from .models import Restaurant, Dish, Order
# from .serializers import DishSerializer, OrderSerializer
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.views.decorators.csrf import csrf_exempt


# @api_view(['POST'])
# def restaurant_login(request):
#     email = request.data.get('email')
#     password = request.data.get('password')

#     if not email or not password:
#         return Response({'status': 'Error', 'message': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    
#     try:
#         # Find the restaurant by email
#         restaurant = Restaurant.objects.get(email=email)

#         # Check if the password matches
#         if restaurant.password == password:  # In production, use hashed passwords
#             # Generate JWT token
#             refresh = RefreshToken.for_user(restaurant)

#             return Response({
#                 'status': 'Success',
#                 'message': 'Login successful',
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#                 'restaurant_name': restaurant.name
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({'status': 'Error', 'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
#     except Restaurant.DoesNotExist:
#         return Response({'status': 'Error', 'message': 'Restaurant does not exist'}, status=status.HTTP_404_NOT_FOUND)






# @api_view(['POST'])
# def restaurant_signup(request):
#     print(request.data,"::")
#     # Get all required fields from the request
#     username = request.data.get('name')
#     email = request.data.get('email')
#     password = request.data.get('password')

#     # Get location details
#     address = request.data.get('address')
#     city = request.data.get('city')
#     state = request.data.get('state')
#     country = request.data.get('country')

#     # Check if all fields are provided
#     if not (username and email and password and address and city and state and country):
#         return Response({'status': 'Error', 'message': 'All fields are required'}, status=400)

#     # Check if the username or email is already taken
#     if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
#         return Response({'status': 'Error', 'message': 'Username or email already exists'}, status=400)

#     # Create User and Restaurant profile
#     user = User.objects.create_user(username=username, email=email, password=password)
    
#     # Create restaurant with location details
#     restaurant = Restaurant.objects.create(
#         name=username,
#         email=email,
#         password=password,  # You should ideally hash the password if not done automatically
#         address=address,
#         city=city,
#         state=state,
#         country=country
#     )

#     return Response({'status': 'Success', 'message': 'Restaurant created successfully'}, status=201)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def restaurant_logout(request):
#     try:
#         request.user.auth_token.delete()
#     except:
#         return Response({'status': 'Error', 'message': 'Invalid token'}, status=400)
    
#     django_logout(request)
#     return Response({'status': 'Success', 'message': 'User logged out successfully'}, status=200)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def restaurant_profile(request):
#     user = request.user
#     try:
#         restaurant = Restaurant.objects.get(user=user)
#     except Restaurant.DoesNotExist:
#         return Response({'status': 'Error', 'message': 'Profile not found'}, status=404)
    
#     profile_data = {
#         'username': user.username,
#         'email': user.email,
#         'location': restaurant.location,
#         'description': restaurant.description,
#         'contact_info': restaurant.contact_info,
#     }

#     return Response({'status': 'Success', 'message': 'Profile details', 'data': profile_data}, status=200)

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_restaurant_profile(request):
#     user = request.user
#     try:
#         restaurant = Restaurant.objects.get(user=user)
#     except Restaurant.DoesNotExist:
#         return Response({'status': 'Error', 'message': 'Profile not found'}, status=404)

#     # Get data from the request
#     location = request.data.get('location')
#     description = request.data.get('description')
#     contact_info = request.data.get('contact_info')

#     # Update profile fields
#     restaurant.location = location if location else restaurant.location
#     restaurant.description = description if description else restaurant.description
#     restaurant.contact_info = contact_info if contact_info else restaurant.contact_info
#     restaurant.save()

#     return Response({'status': 'Success', 'message': 'Profile updated successfully'}, status=200)

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def menu(request):
#     user = request.user
#     try:
#         restaurant = Restaurant.objects.get(user=user)
#     except Restaurant.DoesNotExist:
#         return Response({'status': 'Error', 'message': 'Restaurant not found'}, status=404)

#     if request.method == 'POST':
#         # Create a new dish
#         name = request.data.get('name')
#         description = request.data.get('description')
#         price = request.data.get('price')
#         category = request.data.get('category')

#         if not (name and description and price and category):
#             return Response({'status': 'Error', 'message': 'All fields are required'}, status=400)

#         # Create a new dish for the restaurant
#         Dish.objects.create(restaurant=restaurant, name=name, description=description, price=price, category=category)
#         return Response({'status': 'Success', 'message': 'Dish added successfully'}, status=201)

#     # GET method: list all dishes
#     dishes = Dish.objects.filter(restaurant=restaurant)
#     serializer = DishSerializer(dishes, many=True)
#     return Response({'status': 'Success', 'message': 'Menu retrieved', 'data': serializer.data}, status=200)

# @api_view(['GET', 'PUT'])
# @permission_classes([IsAuthenticated])
# def orders(request):
#     user = request.user
#     try:
#         restaurant = Restaurant.objects.get(user=user)
#     except Restaurant.DoesNotExist:
#         return Response({'status': 'Error', 'message': 'Restaurant not found'}, status=404)

#     if request.method == 'PUT':
#         # Update order status
#         order_id = request.data.get('order_id')
#         status = request.data.get('status')
        
#         if not (order_id and status):
#             return Response({'status': 'Error', 'message': 'Order ID and status are required'}, status=400)

#         try:
#             order = Order.objects.get(id=order_id, restaurant=restaurant)
#             order.status = status
#             order.save()
#             return Response({'status': 'Success', 'message': 'Order status updated'}, status=200)
#         except Order.DoesNotExist:
#             return Response({'status': 'Error', 'message': 'Order not found'}, status=404)

#     # GET method: list all orders for the restaurant
#     orders = Order.objects.filter(restaurant=restaurant)
#     serializer = OrderSerializer(orders, many=True)
#     return Response({'status': 'Success', 'message': 'Orders retrieved', 'data': serializer.data}, status=200)


# # 1. Get all restaurant details
# @csrf_exempt
# def get_all_restaurants(request):
#     if request.method == 'GET':
#         restaurants = Restaurant.objects.all()
#         data = serializers.serialize('json', restaurants)
#         return JsonResponse(data, safe=False, status=200)
#     return JsonResponse({'error': 'Invalid HTTP method'}, status=405)


# # 2. Get all dishes in a restaurant
# @csrf_exempt
# def get_all_dishes_in_restaurant(request, restaurant_id):
#     if request.method == 'GET':
#         restaurant = get_object_or_404(Restaurant, id=restaurant_id)
#         dishes = Dish.objects.filter(restaurant=restaurant)
#         data = serializers.serialize('json', dishes)
#         return JsonResponse(data, safe=False, status=200)
#     return JsonResponse({'error': 'Invalid HTTP method'}, status=405)


# # 3. Add a dish for one restaurant
# @csrf_exempt
# def add_dish_to_restaurant(request, restaurant_id):
#     if request.method == 'POST':
#         restaurant = get_object_or_404(Restaurant, id=restaurant_id)
#         try:
#             data = json.loads(request.body)
#             new_dish = Dish.objects.create(
#                 restaurant=restaurant,
#                 name=data['name'],
#                 description=data.get('description', ''),
#                 price=data['price'],
#                 category=data['category'],
#                 image=data.get('image', None)
#             )
#             return JsonResponse({'success': f'Dish {new_dish.name} added successfully'}, status=201)
#         except KeyError as e:
#             return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)
#     return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

# # 4. Edit dish details
# @csrf_exempt
# def edit_dish_details(request, dish_id):
#     if request.method == 'PUT':
#         dish = get_object_or_404(Dish, id=dish_id)
#         try:
#             data = json.loads(request.body)
#             dish.name = data.get('name', dish.name)
#             dish.description = data.get('description', dish.description)
#             dish.price = data.get('price', dish.price)
#             dish.category = data.get('category', dish.category)
#             dish.image = data.get('image', dish.image)
#             dish.save()
#             return JsonResponse({'success': f'Dish {dish.name} updated successfully'}, status=200)
#         except KeyError as e:
#             return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)
#     return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

# # 5. Edit profile details for a restaurant
# @csrf_exempt
# def edit_restaurant_profile(request, restaurant_id):
#     if request.method == 'PUT':
#         restaurant = get_object_or_404(Restaurant, id=restaurant_id)
#         try:
#             data = json.loads(request.body)
#             restaurant.name = data.get('name', restaurant.name)
#             restaurant.email = data.get('email', restaurant.email)
#             restaurant.password = data.get('password', restaurant.password)
#             restaurant.description = data.get('description', restaurant.description)
#             restaurant.address = data.get('address', restaurant.address)
#             restaurant.city = data.get('city', restaurant.city)
#             restaurant.state = data.get('state', restaurant.state)
#             restaurant.country = data.get('country', restaurant.country)
#             restaurant.phone_number = data.get('phone_number', restaurant.phone_number)
#             restaurant.save()
#             return JsonResponse({'success': f'Restaurant {restaurant.name} profile updated successfully'}, status=200)
#         except KeyError as e:
#             return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)
#     return JsonResponse({'error': 'Invalid HTTP method'}, status=405)



from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Restaurant, Dish, Order

@csrf_exempt
def restaurant_signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            # Create a new restaurant user
            restaurant = Restaurant.objects.create_user(
                name=data['name'],
                email=data['email'],
                password=data['password'],
                address=data.get('address', ''),
                city=data.get('city', ''),
                state=data.get('state', ''),
                country=data.get('country', ''),
                phone_number=data.get('phone_number', '')
            )
            return JsonResponse({'status': 'success', 'message': 'Restaurant registered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'status': 'error', 'error': f'An error occurred during signup: {str(e)}'}, status=400)
    return JsonResponse({'status': 'error', 'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def restaurant_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        restaurant = authenticate(request, email=email, password=password)
        if restaurant:
            login(request, restaurant)
            return JsonResponse({'message': 'Login successful'}, status=200)
        return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def restaurant_logout(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logout successful'}, status=200)
    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def restaurant_profile(request):
    if request.user.is_authenticated:
        restaurant = request.user
        profile_data = {
            'name': restaurant.name,
            'email': restaurant.email,
            'description': restaurant.description,
            'address': restaurant.address,
            'city': restaurant.city,
            'state': restaurant.state,
            'country': restaurant.country,
            'phone_number': restaurant.phone_number
        }
        return JsonResponse(profile_data, status=200)
    return JsonResponse({'error': 'Unauthorized'}, status=401)

@csrf_exempt
def update_restaurant_profile(request):
    if request.user.is_authenticated and request.method == 'PUT':
        data = json.loads(request.body)
        restaurant = request.user
        for field in ['name', 'description', 'address', 'city', 'state', 'country', 'phone_number']:
            setattr(restaurant, field, data.get(field, getattr(restaurant, field)))
        restaurant.save()
        return JsonResponse({'message': 'Profile updated successfully'}, status=200)
    return JsonResponse({'error': 'Unauthorized or invalid method'}, status=403)

@csrf_exempt
def menu(request):
    if request.user.is_authenticated:
        dishes = Dish.objects.filter(restaurant=request.user)
        dishes_data = [
            {'id': dish.id, 'name': dish.name, 'description': dish.description, 'price': dish.price, 'category': dish.category}
            for dish in dishes
        ]
        return JsonResponse(dishes_data, safe=False, status=200)
    return JsonResponse({'error': 'Unauthorized'}, status=401)

@csrf_exempt
def orders(request):
    if request.user.is_authenticated:
        orders = Order.objects.filter(restaurant=request.user)
        orders_data = [
            {'id': order.id, 'customer_name': order.customer_name, 'order_items': order.order_items, 'total_price': order.total_price, 'status': order.status}
            for order in orders
        ]
        return JsonResponse(orders_data, safe=False, status=200)
    return JsonResponse({'error': 'Unauthorized'}, status=401)

