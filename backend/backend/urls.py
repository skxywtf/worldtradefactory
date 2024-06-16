from django.contrib import admin
from django.urls import path, include
#from api import views
from django.conf import settings
from django.conf.urls.static import static
#from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    #path('ai', views.ImageUploadView.as_view(), name='image-upload'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # for ai api


