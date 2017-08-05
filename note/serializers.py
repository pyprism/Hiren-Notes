from rest_framework import serializers
from .models import Notes


class NotesSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Notes
        fields = '__all__'
