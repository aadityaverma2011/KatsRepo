from django.urls import path
import dashboard_management.views as views

urlpatterns = [
    path('check-text/', views.CheckTextView.as_view(), name='dashboard-check-text'),
]