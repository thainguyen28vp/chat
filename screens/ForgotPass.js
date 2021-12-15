import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ButtonCustom from '../components/ButtonCustom';
import InputCustom from '../components/InputCustom'
import { HeaderCustomBot } from './Admin/custom'
import auth, { firebase } from '@react-native-firebase/auth'
import Toast from 'react-native-simple-toast';

export default function ForgotPass({ navigation }) {
    const [txt, setTxt] = useState('');
    function handleSubmit() {
        auth().sendPasswordResetEmail(txt).then(() => {
            Toast.show('Đã gửi email. Vui lòng vào email đặt lại mật khẩu', Toast.LONG);
        }).catch((e) => Toast.show('Email không đúng định dạng hoặc không tồn tại.', Toast.LONG))
    }
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <HeaderCustomBot title='Quên mật khẩu' back={() => navigation.pop()} />
            <View style={{ paddingHorizontal: 16, paddingTop: 100 }}>
                <Text style={{ paddingHorizontal: 60, textAlign: 'center', color: '#A0A4A8' }}>Vui lòng nhập email vào ô bên dưới để lấy lại mật khẩu.</Text>
                <InputCustom
                    iconName='envelope'
                    placeholder="Nhập email..."
                    onChangeText={setTxt}
                    value={txt}
                />
                <ButtonCustom


                    onPress={() => handleSubmit()}
                    //onPress={() => navigation.navigate('TabNavigation')}
                    textButton='Đăng nhập'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
