# django-react-docker/backend/backend/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from dj_rest_auth.views import LoginView
from .serializers import CustomLoginSerializer
from rest_framework import status
from backend.tt_backend.models import Reading
from .serializers import ReadingSerializer

class CustomLoginView(LoginView):
    serializer_class = CustomLoginSerializer

@api_view(['POST'])
def add_reading(request):
    if request.method == 'POST':
        serializer = ReadingSerializer(data=request.data)  # Fixed typo in serializer name
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
