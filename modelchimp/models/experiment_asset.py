from django.db import models
from django.contrib.postgres.fields import JSONField

from modelchimp.models.project import Project
from modelchimp.models.machinelearning_model import MachineLearningModel


class ExperimentAsset(models.Model):
    meta_dict = JSONField(null=True)
    asset = models.FileField(upload_to='asset/', null=True)
    custom_file_name = models.CharField(max_length=200, blank=True, default='', null=True)

    project = models.ForeignKey(Project,
                                on_delete=models.CASCADE,
                                related_name='asset_project')
    ml_model = models.ForeignKey(MachineLearningModel,
                                    related_name='asset_experiment',
                                    on_delete=models.CASCADE)

    date_created = models.DateTimeField(auto_now_add=True, blank=False)
    date_modified = models.DateTimeField(auto_now=True, blank=False)
