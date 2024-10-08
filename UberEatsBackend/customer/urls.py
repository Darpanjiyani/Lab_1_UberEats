from django.urls import path
from . import views

urlpatterns = [
    # Customer Sign-up
    path('signup/', views.signup, name='signup'),

    # Customer Login
    path('login/', views.login, name='login'),

    # Customer Logout
    path('logout/', views.logout, name='logout'),

    # Customer Profile
    path('profile/', views.profile, name='profile'),

    # Update Customer Profile
    path('profile/update/', views.update_profile, name='update_profile'),

    # Favorite Restaurants
    path('favorites/', views.favorites, name='favorites'),

    # Add a restaurant to favorites
    path('favorites/add/<int:restaurant_id>/', views.add_favorite, name='add_favorite'),

    # Remove a restaurant from favorites
    path('favorites/remove/<int:restaurant_id>/', views.remove_favorite, name='remove_favorite'),
]
