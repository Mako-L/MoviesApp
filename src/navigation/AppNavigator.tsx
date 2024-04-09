// Import necessary modules from React and React Navigation libraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Component that manages the navigation tree and contains the navigation state
import { createStackNavigator } from '@react-navigation/stack'; // Function to create a stack navigator
import MovieList from '../components/MovieList'; // Component for listing movies
import MovieDetails from '../components/MovieDetails'; // Component for displaying movie details

const Stack = createStackNavigator(); // Create a stack navigator object

// Define the main navigation component using a functional component pattern
const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            {/* Stack.Navigator manages the screens as a stack, allowing to push and pop */}
            <Stack.Navigator 
                initialRouteName="MovieList" // initialRouteName sets the default screen of the stack
                screenOptions={{
                    cardStyle: { backgroundColor: '#181a21' } // Setting the stack background color
                }}
            >
            {/* Stack.Screen defines each screen in the stack */}
                <Stack.Screen 
                    name="MovieList" // Name used in navigation functions
                    component={MovieList} // Component to render for this screen
                    options={{ title: 'Movies', headerShown: false }} // Options for the screen, including hiding the header
                />
                <Stack.Screen 
                    name="MovieDetails" // Name used in navigation functions
                    component={MovieDetails} // Component to render for this screen
                    options={{ title: 'Movie Details', headerShown: false }} // Options for the screen, including hiding the header
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
