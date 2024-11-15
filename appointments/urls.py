# appointments/urls.py

from django.urls import path, include
from django.contrib.auth.views import LoginView
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'appointments', views.AppointmentViewSet)
router.register(r'vendors', views.VendorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    
]
