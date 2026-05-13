from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from dashboard_management.helper_classes.template_helper import TemplateHelper
from users.authentication import ClerkAuthentication
from users.permissions import IsClerkAuthenticated


class TemplateListAPIView(APIView):
    authentication_classes = [ClerkAuthentication]
    permission_classes = [IsClerkAuthenticated]

    def get(self, request):
        helper = TemplateHelper()
        templates_data = helper.get_all_templates(request)

        return JsonResponse(templates_data, safe=False)