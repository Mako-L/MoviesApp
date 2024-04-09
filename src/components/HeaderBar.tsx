// Import hooks and components from React and React Native libraries
import { useNavigation } from '@react-navigation/native'; // Hook for accessing navigation functionality
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated,{ Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'; // Importing animated components and functions
import { SafeAreaView } from 'react-native-safe-area-context'; // Safe area handler
import { AntDesign } from '@expo/vector-icons'; // Icon component
import { headerStyles } from '../styles' // Import custom styles

// TypeScript interface defining the props expected by the HeaderBar component
interface HeaderBarProps{
    scrollValue: Animated.SharedValue<number>; // Shared animated value to control styles based on scroll position
    title: string; // Title to display in the header
    back: boolean; // Boolean to determine if a back navigation button should be shown
}

// Functional component for HeaderBar using destructured props
export const HeaderBar: React.FC<HeaderBarProps> = ({ scrollValue, title, back }) =>{
    const navigation = useNavigation(); // Hook to access navigation functionality

    // useCallback to memoize the function to go back to the previous screen, to prevent unnecessary recreations
    const goBack = React.useCallback(() =>{
        navigation.goBack(); // Function to navigate back in the stack
    }, [navigation]);

    // useAnimatedStyle to create animated styles based on the scroll position
    const animatedStyle = useAnimatedStyle(() =>{
        // Interpolate the opacity based on the scroll value with specific input-output mapping, clamped at the ends
        return{ opacity: interpolate(scrollValue.value, [0, 60, 90], [0, 0, 1], Extrapolate.CLAMP) };
    }, [scrollValue]);

    // Component rendering
    return (
        // Safe area view to handle insets properly on different devices
        <SafeAreaView edges={['top', 'left', 'right']} style={headerStyles.headerContainer}>
           {/* View container for the header content */}
            <View style={headerStyles.headerWrapper}>
               {/* Conditional rendering of the back button if the 'back' prop is true */}
               {back &&
                <TouchableOpacity onPress={goBack}>{/* Touchable area for back button */}
                    <AntDesign name="arrowleft" size={20} color="white" />{/* Back arrow icon */}
                </TouchableOpacity>}
               {/* Animated view for the title that fades in based on scroll position */}
                <Animated.View style={animatedStyle}>
                    <Text style={headerStyles.headerText}>
                       {title}{/* Dynamic title text */}
                    </Text>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};
