from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("libro/", views.LibroList.as_view(), name="listar-libro"),
    path("libro/crear/", views.LibroListCreate.as_view(), name="listar-libro"),
    path("libro/prestamo/", views.PrestamoListCreateView.as_view(), name="Prestar-libro"),
    path("libro/prestamo/<int:pk>/devolver/", views.DevolverLibroView.as_view(), name="devolver-libro"),
    path("libro/usuarios/", views.UsuarioListView.as_view(), name='lista_usuarios'),
    path("libro/usuarios/crear/",views.UsuarioCreateView.as_view(), name='crear_usuario'),
    path("libro/usuarios/<slug:slug>/",views.UsuarioDetailView.as_view(), name='detalle_usuario'),
    path("libro/autores/", views.AutorListCreateView.as_view(), name="listar-autores"),
    path("libro/generos/", views.GeneroListCreateView.as_view(), name="listar-generos"),
    path("libro/prestamo/<int:pk>/aplazar/", views.AplazarPlazoView.as_view() , name='aplazar_plazo'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)