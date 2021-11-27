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