// components/BottomMenu.js

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { faHome, faComment, faCalendar, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomMenu = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const icons = [
        { name: 'home', screen: 'Home' },
        { name: 'comment', screen: 'Chat' },
        { name: 'calendar', screen: 'Reminder' },
        { name: 'bell', screen: 'Notifications' },
    ];

    return (
        <View style={styles.container}>
            {icons.map((icon) => (
                <TouchableOpacity
                    key={icon.screen}
                    onPress={() => navigation.navigate(icon.screen)}
                    style={styles.iconContainer}
                >
                    <FontAwesomeIcon
                        icon={icon.name === 'home' ? faHome :
                            icon.name === 'comment' ? faComment :
                                icon.name === 'calendar' ? faCalendar :
                                    faBell}
                        size={22}
                        color={route.name === icon.screen ? '#4D869C' : '#DBE3F1'}
                    />

                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 75,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default BottomMenu;
