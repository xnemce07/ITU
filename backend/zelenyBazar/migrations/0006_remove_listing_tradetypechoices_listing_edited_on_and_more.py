# Generated by Django 4.1.3 on 2022-11-24 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zelenyBazar', '0005_listing_created_on'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listing',
            name='TradeTypeChoices',
        ),
        migrations.AddField(
            model_name='listing',
            name='edited_on',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AddField(
            model_name='listing',
            name='tradeType',
            field=models.CharField(choices=[('Free', 'Free'), ('Trade', 'Trade'), ('Sell', 'Cash')], default='Sell', max_length=10),
        ),
        migrations.AlterField(
            model_name='listing',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='price',
            field=models.IntegerField(default=0),
        ),
    ]