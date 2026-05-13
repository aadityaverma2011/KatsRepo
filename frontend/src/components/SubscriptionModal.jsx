import "./SubscriptionModal.css";

const SubscriptionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>

                <div className="modal-icon">💎</div>
                <h2 className="modal-title">Premium Feature</h2>
                <p className="modal-text">
                    This is a premium feature. You need to purchase a subscription to use this template.
                </p>

                <button className="buy-button" onClick={() => {}}>
                    Buy Subscription
                </button>
            </div>
        </div>
    );
};

export default SubscriptionModal;