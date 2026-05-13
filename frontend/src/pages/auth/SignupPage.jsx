import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <SignUp routing="path" path="/signup" signInUrl="/login" />
    </div>
);

export default SignUpPage;