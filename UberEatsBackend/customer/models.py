# from django.db import models
# from django.contrib.auth.models import User

# class Customer(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     profile_picture = models.ImageField(upload_to='profiles/', blank=True)
#     favorites = models.ManyToManyField('restaurant.Restaurant', blank=True)
#     email = models.CharField(max_length=255)
#     address = models.CharField(max_length=255)
#     city = models.CharField(max_length=255)
#     state = models.CharField(max_length=255)
#     country = models.CharField(max_length=255)
#     phone_number = models.CharField(max_length=15, blank=True)
#     date_of_birth = models.DateField(null=True, blank=True)
# models.py
from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True)
    favorites = models.ManyToManyField('restaurant.Restaurant', blank=True)
    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    nickname = models.CharField(max_length=100, blank=True)  # New field for nickname

    def __str__(self):
        return self.user.username

