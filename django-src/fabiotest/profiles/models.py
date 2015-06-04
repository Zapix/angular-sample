# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        related_name='profile',
        auto_created=True,
        primary_key=True
    )
    birthday= models.DateField(
        'Birthday',
        blank=True,
        null=True
    )
