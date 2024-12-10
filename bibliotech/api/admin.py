from django.contrib import admin
from .models import Libro, Usuario, HistorialUsuario, genere, Autor, Prestamo
# Register your models here.

admin.site.register(Libro)
admin.site.register(Usuario)
admin.site.register(HistorialUsuario)
admin.site.register(genere)
admin.site.register(Autor)
admin.site.register(Prestamo)