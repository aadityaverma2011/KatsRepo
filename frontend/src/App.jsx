import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login/*" element={
                    <SignedOut>
                        <LoginPage />
                    </SignedOut>
                } />

                <Route path="/signup/*" element={
                    <SignedOut>
                        <SignUpPage />
                    </SignedOut>
                } />

                <Route path="/home" element={
                    <>
                        <SignedIn>
                            <HomePage />
                        </SignedIn>
                        <SignedOut>
                            <Navigate to="/login" replace />
                        </SignedOut>
                    </>
                } />

                <Route path="/" element={
                    <SignedIn>
                        <Navigate to="/home" replace />
                    </SignedIn>
                } />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}