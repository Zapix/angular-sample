# -*- coding: utf-8 -*-
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

from books.models import Book


class ExtendedUserCreationForm(UserCreationForm):

    birthday = forms.DateField(required=False)
    book = forms.CharField(max_length=255, required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')

    def save(self, commit=True):
        """
        Save birthday for user if it set.
        Create book if title set
        :param commit:
        :return:
        """
        user = super(ExtendedUserCreationForm, self).save(commit=commit)

        if commit:
            if self.cleaned_data['birthday']:
                user.profile.birthday = self.cleaned_data['birthday']
                user.profile.save()
            if self.cleaned_data['book']:
                Book.objects.create(author=user,
                                    title=self.cleaned_data['book'])

        return user
