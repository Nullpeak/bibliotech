# Generated by Django 5.1.3 on 2024-12-05 19:56

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_autor_apellido_alter_autor_nombre'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='imagen',
            field=models.ImageField(blank=True, null=True, upload_to='libros/'),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='rut',
            field=models.CharField(max_length=12, unique=True, validators=[api.models.validar_rut]),
        ),
    ]