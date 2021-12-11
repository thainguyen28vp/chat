
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { CustomInput, deviceHeight, deviceWidth } from './custom';
import Modal from 'react-native-modal';
import ButtonCustom from '../../components/ButtonCustom';
import { Ic_ScrollModal } from './iconSVG';
import DatePicker from 'react-native-date-picker'
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
export const ModalDateTime = (props) => {
    return <Modal isVisible={props.visible}
        statusBarTranslucent
        transparent={true}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        backdropTransitionOutTiming={0}
        onBackButtonPress={props.onPressClose}
        onBackdropPress={props.onPressClose}
        onSwipeComplete={props.onPressClose}
        swipeDirection="down"
        style={{ justifyContent: 'flex-end', margin: 0 }}
    >
        <View style={{ backgroundColor: '#fff', borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingBottom: 20 }}>
            <View style={{ paddingBottom: 24, paddingTop: 11, alignItems: 'center' }}>
                <Ic_ScrollModal />
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.3} onPress={props.onPressClose}>
                    <Text style={{ fontFamily: 'SVN-Poppins', fontSize: 16, lineHeight: 22, color: '#2F80ED', letterSpacing: -0.3 }}>Thoát</Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'SVN-Poppins', fontWeight: 'bold', fontSize: 18, lineHeight: 24, color: '#1A1A1A', letterSpacing: -0.3 }}>Chọn ngày sinh</Text>
                <TouchableOpacity activeOpacity={0.3} onPress={props.onPressFinished}>
                    <Text style={{ fontFamily: 'SVN-Poppins', fontSize: 16, lineHeight: 22, color: '#2F80ED', letterSpacing: -0.3 }}>Xong</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%' }}>
                <DatePicker

                    dividerHeight={0}
                    androidVariant="iosClone"
                    mode='date'
                    is24hourSource="locale"
                    locale='vi'
                    date={props.date}
                    onDateChange={date => props.setDate(date)}
                    textColor='#1A1A1A'
                    style={{ width: deviceWidth }}
                />
            </View>
        </View>
    </Modal>
}