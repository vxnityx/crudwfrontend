from django.shortcuts import render
from .models import Author, Book, KnowledgeBase, ChatMessage
from .serializers import AuthorSerializer, BookSerializer, ChatMessageSerializer, KnowledgeBaseSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView   
from rest_framework.permissions import IsAuthenticated 

import requests

from rest_framework.response import Response
from rest_framework import status

class AuthorListCreateView(ListCreateAPIView):
    queryset = Author.objects.filter(is_deleted=False)
    serializer_class = AuthorSerializer
    
    def perform_destroy(self, instance):
        instance.soft_delete()

class AuthorRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.filter(is_deleted=False)
    serializer_class = AuthorSerializer

    def perform_destroy(self, instance):
        instance.soft_delete()

class BookListCreateView(ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer




class ChatbotView(ListCreateAPIView):

    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def create(self, request, *args, **kwargs):

        user_message = request.data.get("message")

        # save user message
        user_chat = ChatMessage.objects.create(
            role='user',
            message=user_message
        )

        # get knowledge
        knowledge = KnowledgeBase.objects.all()

        context = ""

        for item in knowledge:
            if item.text_content:
                context += item.text_content + "\n"

        prompt = f"""
You are a helpful assistant.

Knowledge:
{context}

User:
{user_message}
"""

        response = requests.post(
            "https://peaceful-hope-production-f804.up.railway.app/api/generate",
            json={
                "model": "qwen2.5:0.5b",
                "prompt": prompt,
                "stream": False
            }
        )

        data = response.json()

        ai_response = data["response"]

        # save AI response
        ai_chat = ChatMessage.objects.create(
            role='assistant',
            message=ai_response
        )

        return Response({
            "user": ChatMessageSerializer(user_chat).data,
            "assistant": ChatMessageSerializer(ai_chat).data
        })

class KnowledgeBaseView(ListCreateAPIView):
    queryset = KnowledgeBase.objects.all()
    serializer_class = KnowledgeBaseSerializer

