import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

interface HeaderBarProps {
    scrollValue: Animated.SharedValue<number>;
    title: string;
    back: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ scrollValue, title, back }) => {
    const navigation = useNavigation();

    const goBack = React.useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: interpolate(scrollValue.value, [0, 60, 90], [0, 0, 1], Extrapolate.CLAMP) };
    }, [scrollValue]);

    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.headerContainer}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={goBack}>
                    <AntDesign name="arrowleft" size={20} color="white" />
                </TouchableOpacity>
                <Animated.View style={animatedStyle}>
                    <Text style={styles.headerText}>
                        {title}
                    </Text>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        paddingHorizontal: 24,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#1c1e27",
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerImage: {
        width: 20,
        height: 20,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        paddingLeft: 20,
    },
});