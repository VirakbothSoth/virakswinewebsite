from django.db import models

class Wine(models.Model):
    name = models.CharField(max_length=200)
    year = models.IntegerField()
    description = models.TextField()
    image_url = models.URLField(blank=True)  # store image link for simplicity
    country = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)  # just for show

    def __str__(self):
        return f"{self.name} ({self.year})"
