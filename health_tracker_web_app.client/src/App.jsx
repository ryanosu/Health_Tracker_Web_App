import { useState } from 'react';
import './App.css';
import Tabs from './components/tabComponent/Tabs';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
    
    const { isAuthenticated } = useAuth0();

    const [receivedUserID, setReceivedUserID] = useState(1)

     // Callback function to receive API response
    const handleUserID = (response) => {
        setReceivedUserID(response);
    };

    return (
        <div>
            <div className='health-tracker-header'>Health Tracker</div>
            {isAuthenticated ? (
                <LogoutButton handleUserID={handleUserID} />
                ) : (<LoginButton />)}
            <Profile />
            <Tabs receivedUserID={receivedUserID}/>
        </div>
    );
}

export default App;