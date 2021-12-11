import { Platform, Dimensions, TextInput, View, TouchableOpacity, Text, StatusBar } from 'react-native';
import React from 'react';
import { Ic_back } from './iconSVG';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight =
    Platform.OS === 'ios'
        ? Dimensions.get('window').height
        : require('react-native-extra-dimensions-android').get(
            'REAL_WINDOW_HEIGHT',
        );

export const CustomInput = (props) => {
    return <TextInput style={{ width: '100%', marginBottom: 24, backgroundColor: '#F3F7F9', height: 56, paddingLeft: 16, borderRadius: 10, fontSize: 16 }} keyboardType={props.keyboardType ? props.keyboardType : 'default'} placeholder={props.placeholder} onChangeText={props.onChangeText} value={props.value} />
}
export const HeaderCustomBot = (props) => {
    return <View style={{ flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CFE1ED', }}>

        <Text style={{ letterSpacing: -0.408, fontSize: 18, lineHeight: 22, fontFamily: 'SVN-Poppins', color: '#1A1A1A' }}>{props.title}</Text>
        <TouchableOpacity style={{ position: 'absolute', left: 15, top: 15, }}
            onPress={props.back}
        >
            <Ic_back />
        </TouchableOpacity>
    </View >
}
export const Form = (props) => {
    return <View style={{
        margin: 10,
        width: '45%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 6,
        shadowRadius: 5,
        shadowOpacity: 1.0
    }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Người đăng : </Text>
            <Text style={{ fontSize: 16, color: '#000', }}>{props.item?.data?.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Nội dung : </Text>
            <Text numberOfLines={1} style={{ fontSize: 16, color: '#000', width: (deviceWidth - 100) / 3 }}>{props.item?.data?.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Số lượng ảnh : </Text>
            <Text style={{ fontSize: 16, color: '#000', }}>{props.item?.data?.image.length}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Thời gian tạo : </Text>

            <Text numberOfLines={1} style={{ fontSize: 16, color: '#000', width: (deviceWidth - 200) / 3 }}>{'hihi'}</Text>
        </View>
        <Text onPress={props.onPress} style={{ fontSize: 16, color: '#2F80ED', fontWeight: 'bold', textAlign: 'center', paddingTop: 10 }}>Xem chi tiết {'>'}</Text>
    </View>
}