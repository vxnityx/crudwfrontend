from rest_framework import serializers
from .models import Author, Book, KnowledgeBase, ChatMessage

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'first_name', 'last_name', 'is_deleted', 'deleted_at', 'picture']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'published_date', 'isbn_number']

class KnowledgeBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeBase
        fields = '__all__'


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = '__all__'