import { useUser } from "@clerk/clerk-react";
import "./ProfileCard.css";

const ProfileCard = () => {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) return null;

    return (
        <div className="profile-card">
            <h3 className="card-label">Current Profile Picture</h3>

            <div className="image-container">
                <img className="profile-img" src={user.imageUrl} alt="Profile" />
                <div className="status-indicator" />
            </div>

            <div className="user-info">
                <h2 className="user-name">{user.fullName}</h2>
            </div>
        </div>
    );
};

export default ProfileCard;