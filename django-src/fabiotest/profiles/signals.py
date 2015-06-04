# -*- coding: utf-8 -*-
from django.dispatch import receiver
from django.db.models import signals
from django.contrib.auth.models import User

from .models import UserProfile


@receiver(signals.post_save, sender=User)
def user_post_save_handler(sender, instance, created, **kwargs):
    """
    If user has been created. Create profile for him.
    :param sender:
    :param instance:
    :param created:
    :param kwargs:
    :return:
    """
    if created:
        profile = UserProfile.objects.create(user=instance)
        profile.save()
