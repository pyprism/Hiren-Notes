from rest_framework import serializers
from .models import Notes, NoteBook


class NoteBookSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = NoteBook
        fields = '__all__'
        extra_kwargs = {
            'name': {
                'validators': [],  # disable unique validator
            }
        }


class NotesSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    unique_id = serializers.ReadOnlyField()
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()
    note_book = NoteBookSerializer()

    class Meta:
        model = Notes
        fields = ('id', 'note_book', 'title', 'content', 'encrypted', 'iv',
                  'salt', 'synced_desktop', 'synced_mobile', 'unique_id', 'created_at', 'updated_at', 'user')

    def create(self, validated_data):
        notebook_data = validated_data.pop('note_book')
        notebook = NoteBook.objects.filter(name=notebook_data['name'])
        if notebook.exists():
            print('hit')
            hiren = Notes.objects.create(note_book=notebook[0], **validated_data)
        else:
            print('hot')
            notebook_obj = NoteBook.objects.create(**notebook_data)
            hiren = Notes.objects.create(note_book=notebook_obj, **validated_data)
        return hiren



