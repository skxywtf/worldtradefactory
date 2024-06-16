# signup and login
from django.urls import path
from .views import UserSignupView, UserLoginView, ImageUploadView

# contact us
from .views import ContactCreateView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'), #done
    path('ai/', ImageUploadView.as_view(), name='ai'), #done
    path('listai/', ImageUploadView.as_view(), name='listai'), #done
]
