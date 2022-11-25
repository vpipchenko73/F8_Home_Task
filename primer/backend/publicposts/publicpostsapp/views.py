# from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import *
from .models import *

# @api_view(['GET', 'POST'])


@action(detail=True, methods=['post', 'get', 'delete'])
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('date')
    serializer_class = PostSerializer

    def posts(request, post_id):
        if request.method == 'GET':
             posts = Post.objects.all()
             serializer = PostSerializer(posts, many=True)
             return (Response({'data': serializer.data}))
        elif request.method == 'POST':
             post = Post()
             post.text = request.data['text']
             post.save()
             return Response(status=status.HTTP_200_OK)
        elif request.method == 'DELETE':
             post = Post.objects.get(id=post_id)
             post.delete()
             print(post)
             return Response(status=status.HTTP_200_OK)
        
             