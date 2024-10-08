from django.urls import path
from . import views  # Import your views here

urlpatterns = [
    path('signup/', views.restaurant_signup, name='restaurant-signup'),
    path('login/', views.restaurant_login, name='restaurant-login'),
    path('profile/', views.restaurant_profile, name='restaurant-profile'),
    path('menu/', views.menu, name='restaurant-menu'),
    path('profile/update/', views.update_restaurant_profile, name='restaurant-update-profile'),
    path('orders/', views.orders, name='restaurant-orders'),
]
