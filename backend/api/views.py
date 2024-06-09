# signup and login
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .serializers import UserSignupSerializer, UserLoginSerializer

# contact us
from .serializers import ContactSerializer
from .models import Contact

# Data from the UI will be received here
class UserSignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": {
                "username": user.username,
                "email": user.email
            },
            #"token": token.key
        }, status=status.HTTP_201_CREATED)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "user": {
                    "username": user.username,
                    "email": user.email
                },
                #"token": token.key
            }, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# contact us

class ContactCreateView(generics.CreateAPIView):
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        phone = request.data.get('phone')
        
        if Contact.objects.filter(email=email).exists():
            return Response({"message": "Email ID already used."}, status=status.HTTP_400_BAD_REQUEST)
        
        if Contact.objects.filter(phone=phone).exists():
            return Response({"message": "Phone number already used."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Contact information saved successfully!"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        '''
        # Detailed error for csrf
        else:
            custom_error_message = "It looks like there is an error. Please check your input or try again later."
            error_response = {
                "message": custom_error_message,
                "errors": serializer.errors
            }
            return Response(error_response, status=status.HTTP_400_BAD_REQUEST)
        '''