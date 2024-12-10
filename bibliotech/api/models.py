from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
import re
from datetime import timedelta
from django.utils.text import slugify
# Create your models here.


class Autor(models.Model):
    nombre = models.CharField(blank= False,max_length=255)

    def __str__(self):
        return f"{self.nombre}"

class genere(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

class Libro(models.Model):
    titulo = models.CharField(max_length=50)
    fecha = models.DateField()
    isbn = models.CharField(max_length=15, blank=False, unique=True)
    cantidad = models.IntegerField(default=0)
    genero = models.ManyToManyField(genere)
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE, default=1)
    imagen = models.ImageField(upload_to='libros/', null=True, blank=True)

    def __str__(self) -> str:
        return self.titulo

    def prestar(self):
        if self.cantidad > 0:
            self.cantidad -= 1
            self.save()
        else:
            raise ValidationError('No hay copias disponibles de este libro.')

    def devolver(self):
        self.cantidad += 1
        self.save()

    def __str__(self):
        return self.titulo
    


def validar_rut(rut):
    # Eliminar puntos y guiones del RUT
    rut = re.sub(r'[^0-9Kk]', '', rut)
    if not re.match(r'^\d{7,8}[0-9Kk]$', rut):
        raise ValidationError('El RUT debe tener entre 7 y 8 dígitos seguidos de un dígito verificador (0-9 o K).')

    # Separar el número del dígito verificador
    numero, dv = rut[:-1], rut[-1].upper()
    numero = numero[::-1]  # Invertir el número

    # Calcular el dígito verificador
    serie = [2, 3, 4, 5, 6, 7]
    suma = sum(int(digito) * serie[i % 6] for i, digito in enumerate(numero))
    resto = suma % 11
    dv_calculado = str(11 - resto) if resto != 0 else '0'
    if resto == 1:
        dv_calculado = 'K'

    if dv_calculado != dv:
        raise ValidationError('El dígito verificador es incorrecto.')

class Usuario(models.Model):
    ROL_CHOICES = [
        ('estudiante', 'Estudiante'),
        ('trabajador', 'Trabajador'),
        ('tercero', 'Tercero'),
    ]

    nombre = models.CharField(max_length=255, blank=False)
    rut = models.CharField(max_length=12, validators=[validar_rut], blank=False, unique=True)
    rol = models.CharField(max_length=20, choices=ROL_CHOICES)
    id = models.AutoField(primary_key=True)
    numero = models.CharField(default='+56', max_length=12)
    slug = models.SlugField(unique=True, blank=True)
    imagen = models.ImageField(upload_to='libros/', null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            last_slug = Usuario.objects.all().order_by('-slug').first()
            if last_slug:
                new_slug = int(last_slug.slug) + 1
            else:
                new_slug = 1
            self.slug = f"{new_slug:05}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre

    def generos_favoritos(self):
        from django.db.models import Count
        generos = genere.objects.filter(libro__historialusuario__usuario=self).annotate(num_prestamos=Count('libro__historialusuario')).order_by('-num_prestamos')
        return generos
    
class HistorialUsuario(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    fecha_prestamo = models.DateTimeField(default=timezone.now)
    fecha_devolucion = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        generos = ", ".join([genero.nombre for genero in self.libro.genero.all()])
        return f"{self.usuario.nombre} prestó {self.libro.titulo} del género {generos}"

    
class Prestamo(models.Model):
    libro = models.ForeignKey('Libro', on_delete=models.CASCADE)
    usuario = models.ForeignKey('Usuario', on_delete=models.CASCADE)
    fecha_prestamo = models.DateTimeField(default=timezone.now)
    fecha_devolucion = models.DateTimeField(null=True, blank=True)
    fecha_caducidad = models.DateTimeField(null=True, blank=True)
    aplazamientos = models.IntegerField(default=0)
    devuelto = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.pk:  # Si es un nuevo préstamo
            if self.libro.cantidad <= 0:
                raise ValidationError('No hay copias disponibles de este libro.')
            self.libro.prestar()
            self.fecha_caducidad = self.fecha_prestamo + timedelta(weeks=1)
        super().save(*args, **kwargs)

    def devolver_libro(self):
        if not self.devuelto:
            self.fecha_devolucion = timezone.now()
            self.devuelto = True
            self.libro.devolver()
            self.save()
        else:
            raise ValidationError('Este libro ya ha sido devuelto.')

    def aplazar_plazo(self):
        if self.aplazamientos < 2:
            self.fecha_caducidad += timedelta(weeks=1)
            self.aplazamientos += 1
            self.save()
        else:
            raise ValidationError('No se pueden realizar más aplazamientos.')

    def __str__(self):
        return f"{self.libro.titulo} prestado a {self.usuario.nombre}"