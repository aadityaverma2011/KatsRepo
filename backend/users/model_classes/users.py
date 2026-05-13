from django.db import models

class User(models.Model):
    clerk_id = models.CharField(max_length=255, unique=True, primary_key=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'users'  # This forces the table name in MySQL to be 'users'

    def __str__(self):
        return self.email