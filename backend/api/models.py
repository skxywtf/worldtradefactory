from django.contrib.auth.models import AbstractUser # for signup and login
from django.db import models # for contactus

# Additional custom fields will go here. 
# Uncomment the: AUTH_USER_MODEL = 'yourapp.CustomUser' in settings.py
# register in the admin.py
# makemigartions and then migrate

class CustomUser(AbstractUser):
    pass

# contact us models

class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    description = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
