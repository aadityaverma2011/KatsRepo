from rest_framework.response import Response
from rest_framework.views import APIView

from dashboard_management.helper_classes.check_text_helper import CheckTextHelper
from users.authentication import ClerkAuthentication
from users.permissions import IsClerkAuthenticated


class CheckTextView(APIView):
    authentication_classes = [ClerkAuthentication]
    permission_classes = [IsClerkAuthenticated]

    def get(self, request):
        # Using the helper class
        message = CheckTextHelper.get_secure_greeting(request.user.email)
        return Response({
            "status": "success",
            "message": message
        })