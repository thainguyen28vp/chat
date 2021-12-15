import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Image, View, ScrollView, StatusBar } from 'react-native'
import ButtonCustom from '../../components/ButtonCustom'
import UserOnline from '../../components/UserOnline'
import { HeaderCustomBot } from './custom'
import firestore from '@react-native-firebase/firestore'


export default function DetailUser({ navigation, route }) {
    const [details, setdetails] = useState([])
    useEffect(async () => {
        console.log(route.params)

        // const data = await firestore().collection('users').where('uid', '==', route.params).get()

        // const user = data.docs.map(res => res.data())
        // setdetails(user)

    })

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle='dark-content' />
            <View style={{ paddingTop: StatusBar.currentHeight }}>

                <HeaderCustomBot title={route.params.name} back={() => navigation.pop()} />
            </View>
            <View style={{ borderBottomEndRadius: 10, backgroundColor: '#99BEFF', borderBottomStartRadius: 10, flexDirection: 'row', justifyContent: 'center', paddingVertical: 16 }}>
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
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginVertical: 20 }}>Lịch sử tìm kiếm</Text>

            </View>
            <View style={{ flex: 1, paddingTop: 10, justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {
                            [1, 1, 1, 1, 1, 1].map(res => {
                                return <View style={{ marginHorizontal: 5 }}>
                                    <UserOnline SourecImg='https://scontent.fhan5-3.fna.fbcdn.net/v/t1.6435-9/103251197_583143952622403_1519974222007604850_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=wnmKF4ZlQu4AX_c74Nu&_nc_ht=scontent.fhan5-3.fna&oh=86e3806e3abb058301497cc57443e0b7&oe=61C79341' NameUser='Thái Nguyễn' />
                                </View>
                            })
                        }
                    </View>
                </ScrollView>
                <View style={{ width: '30%' }}>
                    <ButtonCustom textButton='BLOCK' opacity={1} disabled={false} />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({})
