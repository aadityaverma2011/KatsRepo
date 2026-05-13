class CheckTextHelper:
    @staticmethod
    def get_secure_greeting(user_email):
        # Business logic separated from the view
        return f"Secure text coming from backend: Auth Verified for {user_email}"