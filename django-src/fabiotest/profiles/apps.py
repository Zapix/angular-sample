# -*- coding: utf-8 -*-
from django.apps import AppConfig


class ProfileConfig(AppConfig):
    name = 'profiles'
    verbose_name = 'Profiles'

    def ready(self):
        import profiles.signals
