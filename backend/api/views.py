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

# for stock img ai
from rest_framework import status, views
#from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from api.models import UploadedImage
from api.serializers import UploadedImageSerializer
from .ai import analyze_graph_sections  # assuming AI.py is renamed to ai.py and placed in the same app
import openai
#import os
import cv2
from rest_framework.views import APIView

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

# for stock img ai
openai.api_key = "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"

class ImageUploadView(views.APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file_serializer = UploadedImageSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()

            # Retrieve the saved image file path
            image_path = file_serializer.instance.image.path
            
            # Perform AI analysis
            try:
                section_trends, cropped_images = analyze_graph_sections(image_path, num_sections=3)
                
                # Generate the overview using OpenAI
                prompt1 = f"The first third of the graph shows a {section_trends[0]} trend."
                prompt2 = f"The second third of the graph shows a {section_trends[1]} trend."
                prompt3 = f"The final third of the graph shows a {section_trends[2]} trend."

                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": f"Given the following information about the different sections of a graph:\n\n{prompt1}\n\n{prompt2}\n\n{prompt3}\n\nPlease provide a very detailed overview of the overall trend of the graph, including any potential implications or insights from a financial and stock market pov. Give an example of such trend from history and how the stock performed after that"}
                    ]
                )

                overview = response["choices"][0]["message"]["content"]
                
                # Response data
                response_data = {
                    "section_trends": section_trends,
                    "overview": overview
                }
                
                return Response(response_data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, format=None):
        candidates=UploadedImage.objects.all()
        serializer=UploadedImageSerializer(candidates,many=True)
        return Response({'status':'success','candidates':serializer.data},status=status.HTTP_200_OK)