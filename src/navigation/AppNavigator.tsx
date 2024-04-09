import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MovieList from '../components/MovieList';
import MovieDetails from '../components/MovieDetails';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MovieList">
                <Stack.Screen name="MovieList" component={MovieList} options={{ title: 'Top Movies' }} />
                <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ title: 'Movie Details', headerShown: false  }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
