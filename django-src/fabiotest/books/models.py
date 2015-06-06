# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User


class Book(models.Model):
    title = models.CharField(
        verbose_name='Title',
        max_length=255
    )
    author = models.ForeignKey(
        User,
        related_name='books'
    )
