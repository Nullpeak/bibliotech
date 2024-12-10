from rest_framework import serializers
from .models import Libro, Prestamo, Usuario, genere, Autor

class LibroSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = Libro
        fields = '__all__'

class PrestamoSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.ReadOnlyField(source='usuario.nombre')
    libro_titulo = serializers.ReadOnlyField(source='libro.titulo')

    class Meta:
        model = Prestamo
        fields = ['id', 'libro', 'libro_titulo', 'usuario', 'usuario_nombre', 'fecha_prestamo', 'fecha_devolucion', 'fecha_caducidad', 'aplazamientos', 'devuelto']

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        read_only_fields = ['slug']

class GenereSerializer(serializers.ModelSerializer):
    class Meta:
        model = genere
        fields = '__all__'

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = '__all__'

class LibrolistSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(max_length=None, use_url=True)
    autor = AutorSerializer()
    genero = GenereSerializer(many=True)

    class Meta:
        model = Libro
        fields = ['id','titulo', 'fecha', 'isbn', 'cantidad', 'genero', 'autor', 'imagen']
