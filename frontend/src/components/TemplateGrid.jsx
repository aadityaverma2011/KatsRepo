import "./TemplateGrid.css";

const TemplateGrid = ({ templates, loading }) => {
    if (loading) return <div className="loader">Syncing Templates...</div>;

    return (
        <div className="template-grid">
            {templates.map((template) => (
                <div key={template.id} className="template-card">
                    <div className="template-image-wrapper">
                        <img src={template.image_url} alt={template.title} className="template-img" />
                        <span className={`status-badge ${template.is_paid ? 'paid' : 'free'}`}>
                            {template.is_paid ? 'PRO' : 'FREE'}
                        </span>
                    </div>
                    <div className="template-info">
                        <h4>{template.title}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TemplateGrid;