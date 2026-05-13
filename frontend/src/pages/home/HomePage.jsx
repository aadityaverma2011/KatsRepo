import { UserButton } from "@clerk/clerk-react";
import ProfileCard from "../../components/ProfileCard.jsx";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="logo-section">
                    <div className="logo-mark" />
                    <h1 className="logo-text">DASHBOARD</h1>
                </div>
                <div className="user-button-wrapper">
                    <UserButton afterSignOutUrl="/login" />
                </div>
            </header>

            <main className="dashboard-main">
                <div className="welcome-section">
                    <h2 className="welcome-title">Welcome back, Aaditya.</h2>
                </div>
                <ProfileCard />
            </main>
        </div>
    );
};

export default HomePage;