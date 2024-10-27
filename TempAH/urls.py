"""
URL configuration for TempAH project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path,
from booking import views

urlpatterns = [
    path('', views.service_list, name='service_list'),
    path('services/', views.service_list, name='service_list'),
    path('services/<int:service_id>/book/', views.book_service, name='book_service'),
    path('booking/<int:booking_id>/confirmation/', views.booking_confirmation, name='booking_confirmation'),
    
    #path('templates/booking', views.service_list, name='service_list'),
    #path('templates/booking/<int:service_id>/book/', views.book_service, name='book_service'),
    #path('templates/booking/<int:booking_id>/confirmation/', views.booking_confirmation, name='booking_confirmation'),
]

