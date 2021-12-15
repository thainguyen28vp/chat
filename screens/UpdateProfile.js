
import React, { useState, useRef } from 'react'
import { Text, StyleSheet, Keyboard, View, StatusBar, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { CustomInput, HeaderCustomBot } from './Admin/custom';
import ButtonCustom from '../components/ButtonCustom';
import addressa from '../assets/address.json'
import { Ic_active } from './Admin/iconSVG';
import { ModalDateTime } from './Admin/modal';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';
export function UpdateProfile({ user, navigation }) {
    const [check, setCheck] = useState(false);
    const [sdt, setSDT] = useState('');
    const [addresss, setAddress] = useState(addressa);
    const [show, setShow] = useState(false);
    const [valueInput, setvalueInput] = useState('');
    const [address2, setAddress2] = useState('')
    const [isFocused, setIsFocused] = useState(false);
    const [visible, setVisible] = useState(false);
    const [birtdayNe, setbirtdayNe] = useState('Ngày sinh');
    const [txt1, settxt1] = useState('');
    const [txt2, settxt2] = useState('');
    const [time, setTime] = useState(new Date());
    const [indexActive, setindexActive] = useState(-1);
    const valueSearch = useRef(null);
    const dataTTHN = ['Độc thân', 'Hẹn hò', 'Kết hôn'];
    async function update() {
        const TTHN = dataTTHN[indexActive] ? dataTTHN[indexActive] : null
        const birtday = (!birtdayNe || birtdayNe == 'Ngày sinh') ? null : birtdayNe
        const quequan = valueInput == '' ? null : valueInput
        const sinhsong = txt2 == '' ? null : txt2
        const hocvan = txt1 == '' ? null : txt1
        firestore().collection('users').doc(user.uid).update({
            TTHN,
            birtday,
            quequan,
            sinhsong,
            hocvan
        })
        navigation.pop();
        SimpleToast.show('Cập nhật thông tin thành công.', SimpleToast.LONG);

    }
    function changText(txt) {
        //console.log(txt);
        setvalueInput(txt);

        if (valueSearch.current) {
            clearTimeout(valueSearch.current);
        }
        valueSearch.current = setTimeout(() => {
            if (txt == '') setAddress(addressa)
            else {
                let data = addressa.filter(res => res.name.toLowerCase().indexOf(txt.toLowerCase()) != -1);
                setAddress(data)
            }
            // addresss.filter(res => res)
        }, 400);

    }
    function saveTinh(txt, id) {
        // setID(id);
        setvalueInput(txt);
        setShow(false);
    }
    const handleInputFocus = () => {
        setIsFocused(true);
        setShow(true);
    }

    const handleInputBlur = () => {
        setIsFocused(false);
        // setShow(false);
    }
    function clickTTHN(index) {
        if (index === indexActive) setindexActive(-1);
        else setindexActive(index);
    }
    function birtday() {
        setVisible(true)
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={{
                justifyContent: 'space-between',
                flex: 1,
                backgroundColor: '#fff',

            }}>
                <HeaderCustomBot title='Thông tin cá nhân' back={() => navigation.pop()} />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ paddingHorizontal: 16, flex: 1, paddingTop: 24, paddingBottom: 20, justifyContent: 'space-between' }}>
                        <View>
                            {/* <CustomInput placeholder='Tên người nhận' onChangeText={(text1) => setName(text1)} value={name} /> */}
                            <CustomInput placeholder='Học vấn' onChangeText={settxt1} value={txt1} />
                            <CustomInput placeholder='Sinh sống tại ...' onChangeText={settxt2} value={txt2} />
                            <View style={{ marginBottom: show ? 24 : 0 }}>
                                <View
                                    style={{ flexDirection: 'row', height: 54, backgroundColor: '#F3F7F9', alignItems: 'center', justifyContent: 'space-between', paddingRight: 16, paddingLeft: 16, borderRadius: 10, marginBottom: 24 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextInput
                                            onFocus={handleInputFocus}
                                            onBlur={handleInputBlur}
                                            placeholderTextColor='#8EA0AB'
                                            placeholder='Quê quán của bạn' value={valueInput} onChangeText={(txt) => changText(txt)} style={{ width: '100%', fontSize: 16 }} />
                                    </View>
                                </View>
                                {show == true &&
                                    <ScrollView style={{
                                        backgroundColor: '#F3F7F9', borderRadius: 10, width: '100%', maxHeight: 200
                                    }}>
                                        <Text style={{ fontSize: 16, lineHeight: 20, color: '#1A1A1A', margin: 16 }}>Chọn Tỉnh/Thành phố</Text>
                                        {addresss.map((res, index) => {
                                            return <TouchableOpacity
                                                activeOpacity={0.3}
                                                onPress={() => saveTinh(res.name, res.id)}
                                                style={{ height: 45, justifyContent: 'center', paddingRight: 16, paddingLeft: 16, borderRadius: 10, }}>
                                                <Text style={{ fontSize: 14, lineHeight: 20, color: '#1A1A1A' }}>{res.name}</Text>
                                            </TouchableOpacity>
                                        })}
                                        {
                                            addresss.length === 0 && <Text style={{ fontSize: 16, lineHeight: 20, color: '#1A1A1A', marginLeft: 16, marginBottom: 10 }}>{`Không tìm thấy "${valueInput}"`}</Text>
                                        }
                                    </ScrollView>
                                }

                            </View>
                            <TouchableOpacity
                                onPress={() => birtday()}
                                style={{ width: '100%', marginBottom: 24, backgroundColor: '#F3F7F9', height: 56, paddingLeft: 16, borderRadius: 10, justifyContent: 'center' }}   >
                                <Text style={{ fontSize: 16, color: '#8EA0AB' }}>{birtdayNe}</Text>
                            </TouchableOpacity>

                            <Text style={{ paddingVertical: 10, fontSize: 16, fontWeight: 'bold' }}>Tình trạnh hôn nhân</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                {
                                    dataTTHN.map((res, index) => {
                                        return <View style={{}}>
                                            <TouchableOpacity
                                                onPress={() => clickTTHN(index)}
                                                activeOpacity={0.3} style={{ height: 55, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
                                                <View
                                                    style={[{ marginRight: 5, height: 22, width: 22, borderRadius: 13, justifyContent: 'center', alignItems: 'center' }, index == indexActive ? styles.active : styles.border]}>
                                                    {/* , this.props.getData?.arDay?.includes(props.index) ? styles.active : styles.border */}
                                                    <Ic_active />
                                                </View>
                                                <Text style={{ fontFamily: 'SVN-Poppins', fontSize: 16, lineHeight: 22, letterSpacing: -0.3, color: '#1A1A1A' }}>{res}</Text>

                                            </TouchableOpacity>
                                        </View>
                                    })
                                }
                            </View>

                        </View>
                        <ButtonCustom textButton='CẬP NHẬT' onPress={() => update()} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <ModalDateTime
                visible={visible}
                onPressClose={() => setVisible(false)}
                onPressFinished={() => { setVisible(false); setbirtdayNe(moment(time).format('DD-MM-YYYY')) }}
                date={time}
                setDate={(time) => setTime(time)}

            />

        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    border: {
        borderWidth: 2, borderColor: '#8EA0AB',
    },
    active: {
        backgroundColor: '#1F92FC'
    }

})