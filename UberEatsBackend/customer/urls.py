from django.urls import path
from .views import (
    customer_login,
    signup,
    logout,
    profile,
    update_profile,
    favorites,
    add_favorite,
    remove_favorite,
)

urlpatterns = [
    path('signup/', signup, name='customer-signup'),
    path('login/', customer_login, name='customer-login'),
    path('logout/', logout, name='customer-logout'),
    path('profile/', profile, name='customer-profile'),
    path('profile/update/', update_profile, name='customer-update-profile'),
    path('favorites/', favorites, name='customer-favorites'),
    path('favorites/add/<int:restaurant_id>/', add_favorite, name='customer-add-favorite'),
    path('favorites/remove/<int:restaurant_id>/', remove_favorite, name='customer-remove-favorite'),
]
