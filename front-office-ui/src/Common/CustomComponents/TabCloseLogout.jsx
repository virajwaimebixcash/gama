// // // TabCloseLogout.js
// // import { useState } from 'react';
// // import { handleLogout } from '../utils/UtilityFunctions';
// // import CustomAlert from './CustomAlert';

// // export const handleLogoutOnTabClose = (dispatch, navigate) => {
// //     const ip = localStorage.getItem('userIP');
// //     const isReloading = { value: false }; // Use a mutable object to track reload status

//     // const [alertOpen, setAlertOpen] = useState(false);
//     // const [alertMessage, setAlertMessage] = useState('');
//     // const [alertIcon, setAlertIcon] = useState('error');

// //     const handleCloseAlert = () => {
// //         setAlertOpen(false);
// //     };

// //     const handleBeforeUnload = (event) => {
// //         if (!isReloading.value) {
// //             event.preventDefault();
// //             event.returnValue = ''; // Trigger browser confirmation

// // <CustomAlert
// //     open={alertOpen}
// //     onClose={handleCloseAlert}
// //     text={alertMessage}
// //     icon={alertIcon}
// //     confirmButtonText="OK"
// //     allowOutsideClick={false}
// //     width="30vw"
// //     // onConfirmButton={() => navigate('/order-configurations')}
// //     onConfirmButton={() => {
// //         // Navigate based on the success state
// //         if (isSaveSuccessful) {
// //             navigate('/order-configurations'); // On success
// //         } else {
// //             navigate('/order-configurator'); // On failure
// //         }
// //         handleCloseAlert(); // Close the alert after navigation
// //     }}
// // />

// //             const userConfirmed = window.confirm('Are you sure you want to leave this site?');

// //             if (userConfirmed) {
// //                 handleLogout(dispatch, ip, navigate, false); // Call logout if confirmed
// //             }
// //         }
// //     };

// //     const handleVisibilityChange = () => {
// //         // Reset reload flag on visibility change
// //         if (document.visibilityState === 'visible') {
// //             isReloading.value = false; // Tab becomes active again
// //         } else {
// //             isReloading.value = true; // Possible reload or navigation
// //         }
// //     };

// //     // Register event listeners
// //     window.addEventListener('beforeunload', handleBeforeUnload);
// //     document.addEventListener('visibilitychange', handleVisibilityChange);

// //     // Cleanup listeners on unmount
// //     return () => {
// //         window.removeEventListener('beforeunload', handleBeforeUnload);
// //         document.removeEventListener('visibilitychange', handleVisibilityChange);
// //     };
// // };

// // components/TabCloseLogout.js
// import { useEffect, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { handleLogout } from '../utils/UtilityFunctions';
// import CustomAlert from './CustomAlert';

// const TabCloseLogout = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const ip = localStorage.getItem('userIP');

//     const isReloading = useRef(false); // Track reload state
//     const [alertOpen, setAlertOpen] = useState(false); // Manage custom modal visibility
//     const [pendingUnload, setPendingUnload] = useState(false); // Track if a tab close is pending

//     const confirmLogout = () => {
//         handleLogout(dispatch, ip, navigate, false); // Call logout API
//         setAlertOpen(false); // Close the alert modal
//     };

//     const cancelLogout = () => {
//         setAlertOpen(false); // Close the alert modal
//         setPendingUnload(false); // Cancel any pending tab close action
//     };

//     useEffect(() => {
//         const handleBeforeUnload = (event) => {
//             if (pendingUnload) {
//                 // If pending unload is confirmed, proceed with close
//                 return;
//             }

//             // Trigger custom alert on tab close or reload
//             setPendingUnload(true); // Mark as pending unload
//             setAlertOpen(true); // Open the custom alert modal

//             event.preventDefault(); // Required to stop the native alert
//             event.returnValue = ''; // Prevent native browser alert on Chrome
//         };

//         const handleVisibilityChange = () => {
//             if (document.visibilityState === 'visible') {
//                 isReloading.current = false; // Reset reload state when the tab is visible
//             } else {
//                 isReloading.current = true; // Set reload state when the tab is hidden
//             }
//         };

//         // Register event listeners
//         window.addEventListener('beforeunload', handleBeforeUnload);
//         // document.addEventListener('visibilitychange', handleVisibilityChange);

//         // Cleanup listeners on unmount
//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//             // document.removeEventListener('visibilitychange', handleVisibilityChange);
//         };
//     }, [pendingUnload, dispatch, navigate]);

//     return (
//         <CustomAlert
//             open={alertOpen}
//             onClose={cancelLogout}
//             text="Are you sure you want to leave? You will be logged out."
//             icon="warning"
//             confirmButtonText="Logout"
//             allowOutsideClick={false}
//             width="30vw"
//             onConfirmButton={confirmLogout}
//         />
//     );
// };

// export default TabCloseLogout;

import { handleLogout } from '../utils/UtilityFunctions';

// Function to handle logout when the tab or window is closed
export const handleLogoutOnTabClose = (dispatch, navigate) => {
  const ip = localStorage.getItem('userIP');

  const handleTabClose = (event) => {
    event.preventDefault();
    event.returnValue = ''; // Chrome requires this for confirmation dialog

    // Perform logout logic before closing
    handleLogout(dispatch, ip, navigate, false);
  };

  // Add event listener for tab close
  window.addEventListener('beforeunload', handleTabClose);

  // Cleanup listener
  return () => {
    window.removeEventListener('beforeunload', handleTabClose);
  };
};




