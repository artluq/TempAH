# appointments/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        if not username:
            raise ValueError("Users must have a username")
        user = self.model(username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        user = self.create_user(username, password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'

# class User(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     role = models.CharField(max_length=50)
#     active = models.BooleanField(default=True)

#     def __str__(self):
#         return self.name

class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    date = models.DateField()
    time = models.TimeField()
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.service.name} on {self.date} at {self.time}"

class Vendor(models.Model):
    name = models.CharField(max_length=100)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    contact = models.CharField(max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
