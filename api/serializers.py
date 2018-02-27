from rest_framework import serializers
from note.models import Notes, NoteBook


class NoteBookSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    unique_id = serializers.ReadOnlyField()

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
                  'salt', 'unique_id', 'created_at', 'updated_at', 'user')

    def create(self, validated_data):
        notebook_data = validated_data.pop('note_book')
        notebook = NoteBook.objects.filter(name=notebook_data['name'])
        if notebook.exists():
            hiren = Notes.objects.create(note_book=notebook[0], **validated_data)
        else:
            notebook_obj = NoteBook.objects.create(**notebook_data)
            hiren = Notes.objects.create(note_book=notebook_obj, **validated_data)
        return hiren

    def update(self, instance, validated_data):
        notebook_name = validated_data.get('note_book', {}).get('name')
        if notebook_name != instance.note_book.name:
            instance.note_book.name = notebook_name
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.encrypted = validated_data.get('encrypted', instance.encrypted)
        instance.iv = validated_data.get('iv', instance.iv)
        instance.salt = validated_data.get('salt', instance.salt)
        instance.synced_desktop = validated_data.get('synced_desktop', instance.synced_desktop)
        instance.synced_mobile = validated_data.get('synced_mobile', instance.synced_mobile)
        instance.unique_id = validated_data.get('unique_id', instance.unique_id)
        instance.note_book.save()
        instance.save()
        return instance


