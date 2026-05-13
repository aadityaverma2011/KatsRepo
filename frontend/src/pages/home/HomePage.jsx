import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import ProfileCard from "../../components/ProfileCard.jsx";
import TemplateGrid from "../../components/TemplateGrid.jsx"; // Import new component
import {apiRequest} from "../../services/apiClient.js";

import "./HomePage.css";
import {API_ENDPOINTS} from "../../constants/apiEndpoints.js";

const HomePage = () => {
    const { getToken } = useAuth();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await apiRequest(API_ENDPOINTS.GET_TEMPLATES, "GET", null, getToken);
                setTemplates(data);
            } catch (err) {
                console.error("Failed to load templates:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, [getToken]);

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
                    <h2 className="welcome-title">Welcome</h2>
                </div>

                <ProfileCard />

                <section style={{ width: '100%', marginTop: '60px' }}>
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '14px', letterSpacing: '2px', textAlign: 'center' }}>
                        AVAILABLE TEMPLATES
                    </h3>
                    <TemplateGrid templates={templates} loading={loading} />
                </section>
            </main>
        </div>
    );
};

export default HomePage;