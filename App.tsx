// Import React and necessary components
import React from 'react';
import { Provider } from 'react-redux'; // Redux Provider to pass the Redux store down through the component tree
import { StatusBar } from 'react-native'; // Component to control the app status bar
import store from './src/store'; // Import the Redux store configuration
import AppNavigator from './src/navigation/AppNavigator'; // Import the navigation stack

// Define the main App component as a functional component
const App: React.FC = () => {
  return (
    // Wrap everything inside the Provider to make the Redux store available to all nested components
    <Provider store={store}>
      {/* StatusBar component to customize the status bar's appearance */}
      <StatusBar barStyle="light-content" backgroundColor="#1c1e27" translucent />
      {/* AppNavigator which contains all the navigation logic and screens of the app */}
      <AppNavigator />
    </Provider>
  );
};

export default App;
