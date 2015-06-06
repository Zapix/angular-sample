"""fabiotest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from rest_framework.routers import DefaultRouter

from books import views as books_views
from profiles import views as profiles_views


router = DefaultRouter()
router.register(r'books', books_views.BookViewSet)

urlpatterns = [
    url(
        r'^admin/',
        include(admin.site.urls)
    ),
    url(
        r'^api/v1/',
        include(router.urls)
    ),
    url(
        r'^api/v1/register/$',
        profiles_views.RegisterUserView.as_view(),
        name='user-register'
    ),
    url(
        r'^api/v1/user/$',
        profiles_views.UserView.as_view(),
        name='user-info'
    ),
    url(
        r'^api/v1/user/password/',
        profiles_views.PasswordView.as_view(),
        name='user-change-password'
    ),
    url(
        r'^api/v1/user/books/',
        profiles_views.BookListView.as_view()
    ),
    url(
        r'^api-auth/',
        include(
            'rest_framework.urls',
            namespace='rest_framework'
        )
    ),
    url(
        r'^api-token-auth/',
        'rest_framework_jwt.views.obtain_jwt_token'
    ),
    url(
        r'^api-token-verify/',
        'rest_framework_jwt.views.verify_jwt_token'
    ),
]
