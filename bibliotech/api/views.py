from django.shortcuts import render
from rest_framework import generics
from .serializers import  LibrolistSerializer ,LibroSerializer, PrestamoSerializer,UsuarioSerializer, GenereSerializer, AutorSerializer
from .models import Libro, Prestamo, Usuario, Autor, genere
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.exceptions import ValidationError

# Create your views here.

class LibroDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    permission_classes = [IsAuthenticated]

class AutorListCreateView(generics.ListCreateAPIView):
    queryset = Autor.objects.all()
    serializer_class = AutorSerializer
    permission_classes = [IsAuthenticated]

class GeneroListCreateView(generics.ListCreateAPIView):
    queryset = genere.objects.all()
    serializer_class = GenereSerializer
    permission_classes = [IsAuthenticated]

class LibroList(generics.ListAPIView):
    serializer_class = LibrolistSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Libro.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class LibroListCreate(generics.ListCreateAPIView):
    serializer_class = LibroSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Libro.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class PrestamoListCreateView(generics.ListCreateAPIView):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            serializer.save()
        except ValidationError as e:
            raise ValidationError({"detail": str(e)})

class DevolverLibroView(generics.RetrieveUpdateAPIView):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        try:
            instance.devolver_libro()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class UsuarioCreateView(generics.CreateAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class UsuarioDetailView(generics.RetrieveAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'slug'
    permission_classes = [IsAuthenticated]

class UsuarioListView(generics.ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]

class AplazarPlazoView(generics.RetrieveUpdateAPIView):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        try:
            instance.aplazar_plazo()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except ValidationError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)