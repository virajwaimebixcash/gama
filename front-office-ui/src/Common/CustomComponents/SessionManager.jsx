import { useEffect, useRef, useState } from 'react';
import CustomAlert from './CustomAlert';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../utils/UtilityFunctions';
import { useNavigate } from 'react-router-dom';

const sessionTimeout = parseInt(import.meta.env.VITE_APP_SESSION_TIMEOUT);
const SessionManager = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertIcon, setAlertIcon] = useState('error');
    const timeoutRef = useRef(null);
    // const [ip, setIp] = useState("");

    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const ip = localStorage.getItem("userIP");

    const handleCloseAlert = () => {
        setAlertOpen(false);
        localStorage.removeItem('sessionExpired');  // Clear session expired flag

    };

    const resetSessionTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            handleSessionTimeout();
        }, sessionTimeout);
    };

    // Function to handle session timeout 
    const handleSessionTimeout = () => {
        localStorage.setItem('sessionExpired', 'true');  // Set session expired flag
        localStorage.setItem('alertOpen', 'true'); // Store modal open state
        setAlertOpen(true); // Open the alert
    };

    // Function to detect user activity (mouse, keyboard, etc.)
    const detectActivity = () => {
        resetSessionTimeout();
    };

    // useEffect(() => {
    //     getLocalIP()
    //         .then((ipAddress) => setIp(ipAddress))
    //         .catch((error) => console.error('Failed to get IP address:', error));
    // }, []);

    // Add event listeners for mouse and keyboard activity
    useEffect(() => {
        // Check if session has already expired and modal should be open
        const sessionExpired = localStorage.getItem('sessionExpired');
        const modalOpen = localStorage.getItem('alertOpen');
        
        if (sessionExpired === 'true' && modalOpen === 'true') {
            setAlertOpen(true); // Restore the modal open state after refresh
        } else {
            resetSessionTimeout();
        }

        window.addEventListener('mousemove', detectActivity);
        window.addEventListener('keydown', detectActivity);
        window.addEventListener('click', detectActivity);
  
        resetSessionTimeout();
        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('mousemove', detectActivity);
            window.removeEventListener('keydown', detectActivity);
            window.removeEventListener('click', detectActivity);
            clearTimeout(timeoutRef.current);
        };
    }, []);
    
    //----extra feature----

    const handleLogoutAndClearStorage = async () => {
        try {
            await handleLogout(dispatch, ip,navigate);
            localStorage.removeItem('sessionExpired');  // Clear session expired flag on logout
            localStorage.removeItem('alertOpen');  // Clear modal state on logout
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    //return null;
    return (
        <CustomAlert
            open={alertOpen}
            onClose={handleCloseAlert}
            text="Session expired due to inactivity"
            icon={alertIcon}
            confirmButtonText="OK"
            allowOutsideClick={false}
            onConfirmButton={(e) => handleLogoutAndClearStorage()}
            // onConfirmButton={(e) => {
            //     handleLogout(dispatch, ip)
            //     localStorage.removeItem('sessionExpired');  // Clear session expired flag on logout
            //     localStorage.removeItem('alertOpen');  // Clear modal state on logout
            // }}
            width="40vw"
            showCancelButton={false}
        />
    )
};

export default SessionManager;
