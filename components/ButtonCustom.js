import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
const ButtonCustom = ({ opacity, disabled, onPress, textButton, color }) => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={color ? color : ['#77A8FF', '#005CFF']} style={{ height: 55, borderRadius: 10, opacity: opacity, }} >
                <TouchableOpacity
                    disabled={disabled}
                    style={[
                        styles.buttonLogin
                    ]}
                    onPress={onPress}>

                    <Text style={styles.textLogin}>{textButton}</Text>


                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        paddingTop: 5,
        width: '100%'
    },
    textLogin: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    buttonLogin: {
        backgroundColor: 'transparent',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default ButtonCustom