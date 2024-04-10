import { useEffect, useState } from 'react'; // React imports
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo library

export const useNetworkStatus = () => {
    // State to hold the connection status, initially unknown (null)
    const [isConnected, setIsConnected] = useState(null);

    useEffect(() => {
        // Set up a listener for network status changes
        const unsubscribe = NetInfo.addEventListener(state => {
            // Update connection status
            setIsConnected(state.isConnected);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []); // This effect only runs once on mount and then on unmount

    // Return the current network connection status
    return isConnected;
};
