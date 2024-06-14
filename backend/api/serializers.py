# validation will take place here
# signup and login
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import Contact # for contact us
from api.models import UploadedImage # for stock img ai

User = get_user_model()

# style parameter in password to hide password while typing
class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type':'password'}, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type':'password'})

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm') 
        #extra_kwargs={
        #    'password': {'write_only' : True}
        #}
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(style={'input_type':'password'}, required=True)

# for contact us
#User = get_user_model()

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('first_name', 'last_name', 'email', 'phone', 'description')

    def validate_first_name(self, value):
        if len(value) > 100:
            raise serializers.ValidationError("First name should not be greater than 100 letters.")
        return value

    def validate_last_name(self, value):
        if len(value) > 100:
            raise serializers.ValidationError("Last name should not be greater than 100 letters.")
        return value

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email ID not registered. Please register first.")
        return value

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Phone number should be exactly 10 digits.")
        return value

    def validate_description(self, value):
        if len(value.split()) > 100:
            raise serializers.ValidationError("Description should not be more than 100 words.")
        return value
    
# for stock img ai
class UploadedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedImage
        fields = ['id', 'image', 'uploaded_at']
        '''
        def get_photo_url(self, obj):
            request=self.context.get('request')
            photo_url=obj.fingerprint.url
            return request.build_absolute_url(photo_url)
        '''
