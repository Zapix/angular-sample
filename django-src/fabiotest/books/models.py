# -*- coding: utf-8 -*-
from django.db import models


class Book(models.Model):
    title = models.CharField(
        verbose_name='Title',
        max_length=255
    )
