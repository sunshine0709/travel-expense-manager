# Generated by Django 2.2 on 2019-05-01 22:20

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_currency'),
    ]

    operations = [
        migrations.AddField(
            model_name='currency',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='currency',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]