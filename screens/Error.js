import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, Platform, Linking } from 'react-native'
import ButtonCustom from '../components/ButtonCustom'
import LinearGradient from 'react-native-linear-gradient';
import { deviceWidth } from './Admin/custom';
import firestore from '@react-native-firebase/firestore'
import { ModalLoading1 } from '../components/Loaing1';
import auth from '@react-native-firebase/auth'
export default function Error({ user }) {
    const [loading, setLoading] = useState(false)
    function makecall() {
        let phoneNumber = ''
        if (Platform.OS === 'android') {
            phoneNumber = 'tel:&{0366901671}'
        } else {
            phoneNumber = 'telprompt:&{0366901671}'

        }
        Linking.openURL(phoneNumber);
    }
    async function close() {
        setLoading(true);
        await firestore().collection('users')
            .doc(user.uid)
            .update({
                status: firestore.FieldValue.serverTimestamp(),
                fcm: ''
            }).then(() => {
                auth().signOut()
            })
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'space-between', paddingBottom: 20 }}>
            <StatusBar barStyle='light-content' />
            <LinearGradient colors={['#2172DF', 'white']} style={{ position: 'absolute', top: 0 }} >
                < View style={{ height: 300, width: deviceWidth }}>
                    <Text></Text>
                </View>
            </LinearGradient >
            <View style={styles.logo}>
                <Image
                    source={require('../assets/messenger.png')}
                    style={styles.imagelogo}
                />
                <Text style={styles.textLogo}>Meta <Text style={{ fontSize: 17, color: '#fff' }}>connect</Text></Text>
            </View>
            <View style={{ alignItems: 'center', position: 'absolute', top: '35%' }}>
                <Image source={require('../assets/error.png')} />
                <Text style={{ fontSize: 16, color: '#8EA0AB', textAlign: 'center', paddingHorizontal: 50 }}>
                    Tài khoản của bạn đã bị khóa, vui lòng <Text onPress={() => makecall()} style={{ color: '#1F92FC' }}>liên hệ CSKH</Text> để biết thêm thông tin chi tiết.
                </Text>
            </View>
            <View style={{ justifyContent: 'space-between', paddingHorizontal: 16, flexDirection: 'row', paddingVertical: 20 }}>
                <View style={{ width: '47%' }}>
                    <ButtonCustom textButton='ĐÓNG' opacity={1} disabled={false} color={['#ccc', '#8EA0AB']} onPress={() => close()} />
                </View>
                <View style={{ width: '47%' }}>
                    <ButtonCustom textButton='CSKH' opacity={1} disabled={false} onPress={() => makecall()} />
                </View>
            </View>
            <ModalLoading1 visible={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagelogo: {
        height: 80,
        width: 80
    },
    textLogo: {
        fontSize: 32,
        paddingTop: 5,

        color: '#fff'
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80
    },
})
