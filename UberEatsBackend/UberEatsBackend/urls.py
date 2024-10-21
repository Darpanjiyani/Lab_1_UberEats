from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import redirect_to_swagger

# Schema View for Swagger Documentation
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

# URL Patterns for the project-level routing
urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Include customer app URLs under /api/customer/
    path('api/customer/', include('customer.urls')),
    
    # Include restaurant app URLs under /api/restaurant/
    path('api/restaurant/', include('restaurant.urls')),
    
    # Swagger documentation URL
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    
    # Default route to redirect to Swagger
    path('', redirect_to_swagger),
]
