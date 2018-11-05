# Generated by Django 2.0.6 on 2018-06-25 16:37

from django.db import migrations, models
from modelchimp.utils.generate_uid import generate_uid

def gen_uuid(apps, schema_editor):
    MyModel = apps.get_model('modelchimp', 'MachineLearningModel')
    for row in MyModel.objects.all():
        row.experiment_id = generate_uid()
        row.save()

class Migration(migrations.Migration):

    dependencies = [
        ('modelchimp', '0018_machinelearningmodel_experiment_id'),
    ]

    operations = [
        migrations.RunPython(gen_uuid, reverse_code=migrations.RunPython.noop),
    ]
