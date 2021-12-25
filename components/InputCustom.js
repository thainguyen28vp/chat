import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, Text, View, TextInput } from 'react-native';
const InputCustom = ({ title, iconName, placeholder, onChangeText, onBlur, value }) => {
    return (
        <View style={styles.cotainer}>
            <Text style={styles.textform}>{title}</Text>
            <TextInput placeholder={placeholder}
                style={styles.input}
                placeholderTextColor='#8EA0AB'
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                secureTextEntry={iconName.localeCompare('lock') ? false : true}
            />
            <FontAwesome5 name={iconName} style={styles.icon} color='#8EA0AB' />

        </View>
    );
}

const styles = StyleSheet.create({
    cotainer: {
        paddingBottom: 10
    },
    icon: {
        fontSize: 24,
        position: 'absolute',
        top: 40,
        left: 10,
        zIndex: 10,
        color: "#8EA0AB",


    },
    input: {
        paddingLeft: 45,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#F3F7F9',
        color: '#242424',
        fontSize: 16
    },
    textform: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#767676',
        paddingBottom: 5,
        paddingLeft: 5
    },
});
export default InputCustom