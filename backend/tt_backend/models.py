from django.db import models
from django.utils import timezone

def get_default_date():
    return timezone.now().date()

def get_default_time():
    return timezone.now().time()

class Readings(models.Model):
    date = models.DateField(default=get_default_date)
    time = models.TimeField(default=get_default_time)
    systolic = models.PositiveIntegerField()
    diastolic = models.PositiveIntegerField()
    pulse = models.PositiveIntegerField(null=True, blank=True)
    oxygen = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"Reading on {self.date} at {self.time}: {self.systolic}/{self.diastolic}, Pulse: {self.pulse}, Oxygen: {self.oxygen}"
