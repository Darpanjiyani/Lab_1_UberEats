from django.contrib import admin
from django.urls import path
from django.urls import include, path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import redirect_to_swagger

schema_view = get_schema_view(
    openapi.Info(
        title="UberEats Prototype API",
        default_version='v1',
        description="API documentation for the UberEats Prototype Application",
        contact=openapi.Contact(email="support@ubereats.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/customer/', include('customer.urls')),
    path('api/restaurant/', include('restaurant.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('', redirect_to_swagger),
]