import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
const UserOnline = ({ SourecImg, NameUser, status }) => {

    return (
        <View style={styles.container}>
            <View style={styles.align}>
                <Image
                    source={{ uri: SourecImg }}
                    style={{
                        borderRadius: 30,
                        height: 60,
                        width: 60
                    }}
                />
                <View style={styles.status}>

                </View>
            </View>
            <View style={styles.align}>
                <Text style={{ textAlign: 'center', fontSize: 14 }}>
                    {NameUser}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        backgroundColor: 'transparent',
        paddingBottom: 10,


    },
    status: {
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: '#19BC16',
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        right: 3,
        bottom: 0
    },
    align: {
        alignItems: 'center',
        width: 80

    }
});
export default UserOnline