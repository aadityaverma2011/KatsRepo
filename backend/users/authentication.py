import jwt
from django.conf import settings
from rest_framework import authentication, exceptions


from users.model_classes.users import User



class ClerkAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        clerk_key = settings.CLERK_PUBLIC_KEY
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None
        try:
            parts = auth_header.split(' ')
            if len(parts) != 2 or parts[0].lower() != 'bearer':
                raise exceptions.AuthenticationFailed('Authorization header must be Bearer token')

            token = parts[1]
            payload = jwt.decode(
                token,
                clerk_key,
                algorithms=['RS256'],
                options={"verify_signature": True, "verify_aud": False}
            )
            clerk_id = payload.get('sub')
            email = payload.get('email')

            if not clerk_id or not email:
                raise exceptions.AuthenticationFailed('Token missing required fields')
            user, created = User.objects.update_or_create(
                clerk_id=clerk_id,
                defaults={'email': email}
            )

            return (user, None)

        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.InvalidTokenError as e:
            raise exceptions.AuthenticationFailed(f'Invalid token: {str(e)}')
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Auth error: {str(e)}')