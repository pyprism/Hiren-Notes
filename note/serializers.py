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
    unique_id = serializers.ReadOnlyField()
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()
    notebook = NoteBookSerializer(many=True)

    class Meta:
        model = Notes
        fields = ('id', 'notebook', 'title', 'content', 'encrypted', 'iv',
                  'salt', 'synced_desktop', 'synced_mobile', 'unique_id', 'created_at', 'updated_at', 'user')

    def create(self, validated_data):
        notebook_data = validated_data.pop('notebook')
        print(notebook_data)
        notebook = NoteBook.objects.filter(name=notebook_data['name'])
        if notebook.exists():
            hiren = Notes.objects.create(note_book=notebook[0], **validated_data)
        else:
            notebook_obj = NoteBook.objects.create(**notebook_data)
            hiren = Notes.objects.create(note_book=notebook_obj, **validated_data)
        return hiren



