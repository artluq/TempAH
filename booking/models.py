from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Service(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    available_slots = models.IntegerField()

    def __str__(self):
        return self.name
    

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=20, default='Pending')

    def __str__(self):
        return f"{self.user} - {self.service} on {self.date} at {self.time}"
