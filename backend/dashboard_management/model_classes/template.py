from django.db import models

class Template(models.Model):
    title = models.CharField(max_length=255)
    # This stores the path in MySQL and the file in /media/templates/
    image = models.ImageField()
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'template'
    def __str__(self):
        return self.title