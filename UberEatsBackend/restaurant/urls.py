from django.urls import path
from .views import (
    restaurant_login,
    restaurant_signup,
    restaurant_logout,
    restaurant_profile,
    update_restaurant_profile,
    menu,
    orders,
)

urlpatterns = [
    path('signup/', restaurant_signup, name='restaurant-signup'),
    path('login/', restaurant_login, name='restaurant-login'),
    path('logout/', restaurant_logout, name='restaurant-logout'),
    path('profile/', restaurant_profile, name='restaurant-profile'),
    path('profile/update/', update_restaurant_profile, name='restaurant-update-profile'),
    path('menu/', menu, name='restaurant-menu'),
    path('orders/', orders, name='restaurant-orders'),
]