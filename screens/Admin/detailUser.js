import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Image, View, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import ButtonCustom from '../../components/ButtonCustom'
import UserOnline from '../../components/UserOnline'
import { deviceHeight, deviceWidth, HeaderCustomBot } from './custom'
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import auth, { firebase } from '@react-native-firebase/auth'
import SimpleToast from 'react-native-simple-toast'

export default function DetailUser({ navigation, route }) {
    const [lengthPost, setlengthPost] = useState({ sl1: 0, sl2: 0, sl3: 0 })
    const [blocks, setBlock] = useState(route.params.decentralization)
    useEffect(async () => {
        const data = await firestore().collection('Post').get();
        const sl1 = data.docs.filter(res => res.data().uid == route.params.uid && res.data().status == 0);
        const sl2 = data.docs.filter(res => res.data().uid == route.params.uid && res.data().status == 1);
        const sl3 = data.docs.filter(res => res.data().uid == route.params.uid && res.data().status == 2);
        setlengthPost({ sl1: sl1.length, sl2: sl2.length, sl3: sl3.length });
    }, [])
    function block() {
        let bl;
        blocks == 0 ? bl = 2 : bl = 0;
        setBlock(bl);
        if (bl == 0) SimpleToast.show('Tài khoản đã được mở khóa.', SimpleToast.LONG);
        else SimpleToast.show('Tài khoản đã bị khóa.', SimpleToast.LONG);

        firestore().collection('users').doc(route.params.uid).update({
            decentralization: bl
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' }}>

            <View>

                <LinearGradient colors={['#2172DF', 'white']} style={{ position: 'absolute', top: 0 }} >
                    < View style={{ height: 240, width: deviceWidth }}>
                        <Text></Text>
                    </View>
                </LinearGradient >
                <StatusBar barStyle='light-content' />
                <View style={{ marginTop: StatusBar.currentHeight, flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center', }}>

                    <Text style={{ letterSpacing: -0.408, fontSize: 18, lineHeight: 22, fontFamily: 'SVN-Poppins', color: '#fff' }}>{route.params.name}</Text>
                    <TouchableOpacity style={{ position: 'absolute', left: 15, top: 15, }}
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesome5Icon name='arrow-left' size={22} color='#fff' />
                    </TouchableOpacity>
                </View >

                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 16 }}>
                    <Image source={{ uri: route.params.image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    <View style={{ marginHorizontal: 15 }}></View>
                    <View style={{}}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff' }}>{route.params.name}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{route.params.email}</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>{route?.params?.quequan ? route?.params?.quequan : 'chưa có thông tin'}</Text>

                    </View>
                </View>
                <View style={{ paddingHorizontal: 16, }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginVertical: 16 }}>Thông tin cá nhân</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Họ và tên : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}>{route.params.name}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Ngày sinh : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}>{route?.params?.birtday ? route?.params?.birtday : 'chưa có thông tin'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Quê quán : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}>{route?.params?.quequan ? route?.params?.quequan : 'chưa có thông tin'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Học vấn : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}> {route?.params?.hocvan ? route?.params?.hocvan : 'chưa có thông tin'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Tình trạng hôn nhân : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}> {route?.params?.TTHN ? route?.params?.TTHN : 'chưa có thông tin'}</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginVertical: 16 }}>Bạn bè</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Bạn bè : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}>{route.params.listFriends.length} người</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Yêu cầu kết bạn : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}>{route.params.friendAwait.length} yêu cầu</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Lời mời kết bạn : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}>{route.params.friendRequest.length} lời mời</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginVertical: 20 }}>Bài đăng</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Bài đăng chờ duyệt : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}>{lengthPost.sl1} bài đăng</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Bài đăng đã duyệt : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}>{lengthPost.sl3} bài đăng</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Bài đăng đã hủy : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}>{lengthPost.sl2} bài đăng</Text>
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', alignItems: 'center', paddingBottom: 20 }}>
                <View style={{ width: '50%' }}>
                    <ButtonCustom textButton={blocks == 0 ? 'KHÓA TÀI KHOẢN' : 'MỞ TÀI KHOẢN'}
                        opacity={1} disabled={false}
                        onPress={() => block()}
                        color={blocks == 0 ? ['#77A8FF', '#005CFF'] : ['#fff', '#ccc']}
                    />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({})
