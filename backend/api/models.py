from django.contrib.auth.models import AbstractUser

# Additional custom fields will go here. 
# Uncomment the: AUTH_USER_MODEL = 'yourapp.CustomUser' in settings.py
# register in the admin.py
# makemigartions and then migrate

class CustomUser(AbstractUser):
    pass