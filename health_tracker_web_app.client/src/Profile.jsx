import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="profileInfo">
        {isAuthenticated ? (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                
            </div>
        ) : (
            <div>
                <p>You are not authenticated. Using sample profile.</p>
            </div>
            )
        }
    </div>
  );
};

export default Profile;