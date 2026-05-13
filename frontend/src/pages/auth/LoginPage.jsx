import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <SignIn routing="path" path="/login" signUpUrl="/signup" />
    </div>
);

export default LoginPage;