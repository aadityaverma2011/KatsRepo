import { useEffect, useState } from "react";
import { useAuth, useUser, UserButton } from "@clerk/clerk-react";
import ProfileCard from "../../components/ProfileCard.jsx";
import TemplateGrid from "../../components/TemplateGrid.jsx";
import SubscriptionModal from "../../components/SubscriptionModal.jsx";
import EditTemplate from "../../components/EditTemplate.jsx";
import { apiRequest } from "../../services/apiClient.js";
import { API_ENDPOINTS } from "../../constants/apiEndpoints.js";
import "./HomePage.css";

const HomePage = () => {
    const { getToken } = useAuth();
    const { user } = useUser();

    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);


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


    const handleTemplateClick = (template) => {
        if (template.is_paid) {

            setIsModalOpen(true);
        } else {
            // Open the Drawing Board for free templates
            setEditingTemplate(template);
        }
    };

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

                {/* Profile Card showing user details */}
                <ProfileCard />

                <section style={{ width: '100%', marginTop: '60px' }}>
                    <h3 style={{
                        color: 'var(--text-muted)',
                        fontSize: '11px',
                        fontWeight: '600',
                        letterSpacing: '2px',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        marginBottom: '30px'
                    }}>
                        Available Templates
                    </h3>

                    <TemplateGrid
                        templates={templates}
                        loading={loading}
                        onTemplateClick={handleTemplateClick}
                    />
                </section>
            </main>

            {/* Premium gate for paid templates */}
            <SubscriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Drawing board for free templates */}
            {editingTemplate && (
                <EditTemplate
                    template={editingTemplate}
                    user={user}
                    onClose={() => setEditingTemplate(null)}
                />
            )}
        </div>
    );
};

export default HomePage;