
import React from 'react';
import { Text, View, } from 'react-native';
import { CustomInput, deviceHeight, deviceWidth } from './custom';
import Modal from 'react-native-modal';
import ButtonCustom from '../../components/ButtonCustom';
export const ModalSignup = (props) => {
    return <Modal
        animationIn='zoomIn'
        animationOut='zoomOut'
        isVisible={props.isVisible}
        statusBarTranslucent
        transparent={true}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        onBackButtonPress={props.onPressClose}
        onBackdropPress={props.onPressClose}
        backdropTransitionOutTiming={0}
        style={{ justifyContent: 'center' }}>
        <View style={{ backgroundColor: '#FFF', borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingLeft: 16, paddingRight: 16 }}>
            <Text style={{ lineHeight: 24, paddingBottom: 20, paddingTop: 20, fontFamily: 'SVN-Poppins', fontWeight: 'bold', letterSpacing: -0.3, color: '#1A1A1A', fontSize: 22, }}>Đăng ký người dùng</Text>
            <CustomInput value={props.userName} placeholder='Nhập tài khoản ...' />
            <CustomInput value={props.password} placeholder='Nhập mật khẩu ...' />
            <CustomInput value={props.confirm} placeholder='Nhập lại mật khẩu ...' />
            <View style={{ width: '100%', paddingBottom: 15 }}>
                <ButtonCustom textButton='ĐĂNG KÝ' disabled={false} opacity={1} onPress={() => alert('Hi')} />

            </View>
        </View>
    </Modal>

}
