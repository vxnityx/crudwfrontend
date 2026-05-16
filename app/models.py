from django.db import models
from django.utils import timezone
from cloudinary_storage.storage import MediaCloudinaryStorage
from django.conf import settings

class Author(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)

    picture = models.ImageField(storage=MediaCloudinaryStorage(), null=True, blank=True)

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    published_date = models.DateField()
    isbn_number = models.CharField(max_length=13, unique=True)

    def __str__(self):
        return self.title

class KnowledgeBase(models.Model):
    title = models.CharField(max_length=255)

    text_content = models.TextField(blank=True, null=True)

    pdf_file = models.FileField(upload_to='pdfs/', null=True, blank=True)

    website_url = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class ChatMessage(models.Model):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('assistant', 'Assistant'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.role

