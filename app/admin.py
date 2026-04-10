from django.contrib import admin
from .models import Author, Book
from django.contrib.auth import get_user_model
# Register your models here.

User = get_user_model()

admin.site.register(Author)
admin.site.register(Book)
admin.site.register(User)

