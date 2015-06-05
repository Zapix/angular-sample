# -*- coding: utf-8 -*-
from django.contrib.auth.models import User

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    birthday = serializers.DateField(
        source='profile.birthday',
        allow_null=True
    )

    class Meta:
        model = User
        fields = (
            'id', 'username', 'first_name', 'last_name', 'email',
            'birthday'
        )
        read_only_fields = ('username',)

    def update(self, instance, validated_data):
        if 'profile' in validated_data:
            profile = validated_data.pop('profile')
            for attr, value in profile.items():
                setattr(instance.profile, attr, value)
        return super(UserSerializer, self).update(instance, validated_data)
