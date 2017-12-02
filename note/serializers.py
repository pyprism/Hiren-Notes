from rest_framework import serializers
from .models import Notes, NoteBook


class NoteBookSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = NoteBook
        fields = '__all__'


class NotesSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    note_book = NoteBookSerializer(many=True)

    class Meta:
        model = Notes
        fields = '__all__'


