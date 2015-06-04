# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user', models.OneToOneField(related_name=b'profile', auto_created=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('birthday', models.DateTimeField(null=True, verbose_name=b'Birthday', blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
