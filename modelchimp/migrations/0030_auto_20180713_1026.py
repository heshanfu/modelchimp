# Generated by Django 2.0.6 on 2018-07-13 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelchimp', '0029_auto_20180712_1355'),
    ]

    operations = [
        migrations.AddField(
            model_name='machinelearningmodel',
            name='last_heart_beat',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='membership',
            name='key',
            field=models.CharField(default=None, max_length=50),
        ),
    ]
