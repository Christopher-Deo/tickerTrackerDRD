from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Reading


class CustomLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError("Invalid username or password.")
            attrs['user'] = user
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")
        return attrs


# Serializer for handling reading data
class ReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reading
        fields = ['date', 'time', 'systolic', 'diastolic', 'pulse', 'oxygen']

    def validate(self, data):
        # Add any custom validation logic here if needed
        if data['systolic'] <= 0 or data['diastolic'] <= 0:
            raise serializers.ValidationError("Systolic and diastolic values must be positive.")
        if 'pulse' in data and data['pulse'] < 0:
            raise serializers.ValidationError("Pulse value cannot be negative.")
        if 'oxygen' in data and (data['oxygen'] < 0 or data['oxygen'] > 100):
            raise serializers.ValidationError("Oxygen value must be between 0 and 100.")
        return data
