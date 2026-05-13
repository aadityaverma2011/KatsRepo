import os
from django.db import migrations
from django.core.files import File
from django.conf import settings


def populate_templates(apps, schema_editor):
    # Get the model via apps.get_model so it's version-safe
    Template = apps.get_model('dashboard_management', 'Template')

    # Path where your images currently sit
    # We use BASE_DIR to keep it relative to the root of KatsRepo
    images_source_dir = os.path.join(settings.BASE_DIR, 'images')

    # Define the 4 images and their paid status
    initial_data = [
        {'title': 'Template One', 'filename': '1.png', 'is_paid': True},
        {'title': 'Template Two', 'filename': '2.png', 'is_paid': False},
        {'title': 'Template Three', 'filename': '3.png', 'is_paid': True},
        {'title': 'Template Four', 'filename': '4.png', 'is_paid': False},
    ]

    for item in initial_data:
        file_path = os.path.join(images_source_dir, item['filename'])

        if os.path.exists(file_path):
            with open(file_path, 'rb') as f:
                django_file = File(f)
                template = Template(
                    title=item['title'],
                    is_paid=item['is_paid']
                )
                # This saves the file into MEDIA_ROOT/templates/
                template.image.save(item['filename'], django_file, save=True)
        else:
            print(f"Warning: File {file_path} not found. Skipping.")


def remove_templates(apps, schema_editor):
    Template = apps.get_model('dashboard_management', 'Template')
    Template.objects.all().delete()

class Migration(migrations.Migration):

    dependencies = [
        ('dashboard_management', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(populate_templates, remove_templates),
    ]
