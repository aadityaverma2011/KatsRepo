from rest_framework import permissions

class IsClerkAuthenticated(permissions.BasePermission):
    """
    Allows access only to users authenticated via Clerk.
    """

    def has_permission(self, request, view):
        result = bool(request.user and hasattr(request.user, 'clerk_id'))
        return result