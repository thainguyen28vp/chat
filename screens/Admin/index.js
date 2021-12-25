import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import moment from 'moment';
const screenWidth = Dimensions.get("window").width;
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { IconUser, Ic_admin, Ic_dx, Ic_post, ImgHome } from './iconSVG';
import { deviceWidth } from './custom';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import { ModalLoading } from '../../components/Loading';
import { ModalLoading1 } from '../../components/Loaing1';
import SimpleToast from 'react-native-simple-toast';
export default function Admin({ navigation, user }) {
    const [time, setTime] = useState(0)
    const [online, setonline] = useState(0)
    const [offline, setoffline] = useState(0)
    const [loading, setloading] = useState(true)
    const [loading1, setloading1] = useState(false)
    const [lengthUser, setlengthUser] = useState(0)
    const [lengthPost, setlengthPost] = useState(0)
    const [lengthAdmin, setlengthAdmin] = useState(0)
    useEffect(async () => {
        Promise.all([
            firestore().collection('Post').get(),
            firestore().collection('users').where('decentralization', '==', 1).get(),
            firestore().collection('users').where('decentralization', '==', 0).get()
        ]).then((values) => {
            const online = values[2].docs.map(res => res.data())
            const sl = online.filter(res => res.status == 'online')
            setlengthPost(values[0].docs.length);
            setlengthAdmin(values[1].docs.length);
            setlengthUser(values[2].docs.length);
            setonline(sl.length)
            setoffline(values[2].docs.length - sl.length)
        }).catch((error) => {
            SimpleToast.show('Vui lòng thử lại sau.', SimpleToast.LONG);
        })
        setloading(false)
        // firestore().collection('Post').get().then(res => {
        //     setlengthPost(res.docs.length);
        // })
        // firestore().collection('users').where('decentralization', '==', 1).get().then(res => {
        //     setlengthAdmin(res.docs.length);
        // })
        setInterval(() => {
            setTimess();
        }, 1000);
        //thongke()
        return () => {

        }
    }, [])

    async function thongke() {
        await firestore().collection('users').where('decentralization', '==', 0).get().then(res => {
            const online = res.docs.map(res => res.data())
            setlengthUser(res.docs.length);
            const sl = online.filter(res => res.status == 'online')
            setonline(sl.length)
            setoffline(res.docs.length - sl.length)
        })
        setloading(false)
    }
    function setTimess() {
        let date = new Date();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        let session = "AM";

        if (hh == 0) {
            hh = 12;
        }
        if (hh > 12) {
            hh = hh - 12;
            session = "PM";
        }

        hh = (hh < 10) ? "0" + hh : hh;
        mm = (mm < 10) ? "0" + mm : mm;
        ss = (ss < 10) ? "0" + ss : ss;

        let time = hh + ":" + mm + ":" + ss + " " + session;
        setTime(time);
    }
    const data = [
        {
            name: "người oline",
            population: online,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 16
        },

        {
            name: "người offline",
            population: offline,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 16
        }
    ];
    function moving(index) {
        switch (index) {
            case 0:
                navigation.navigate('listUser');
                break;
            case 1:
                navigation.navigate('listPost');
                break;
            case 2:
                navigation.navigate('listAdmin');
                break;
            case 3:
                setloading1(true);
                firestore().collection('users')
                    .doc(user.uid)
                    .update({
                        status: firestore.FieldValue.serverTimestamp(),
                        fcm: ''
                    }).then(() => {
                        auth().signOut()
                    })
                break;
        }
    }
    const FormBtn = ({ index }) => {
        const color = ['#EB212E', '#54C0FF', '#6FC387', '#06B0B9'];
        const title = ['Tài khoản', 'Bài đăng', 'Admin', 'Đăng xuất'];
        const sl = [lengthUser, lengthPost, lengthAdmin, ''];
        const icon = [<IconUser />, <Ic_post />, <Ic_admin />, <Ic_dx />];
        return <TouchableOpacity
            onPress={() => moving(index)}
            style={{ backgroundColor: color[index], width: '100%', height: 130, borderRadius: 10, justifyContent: 'center' }}>
            <View style={{ position: 'absolute', top: 16, right: 16 }}>
                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{sl[index] == 0 ? '' : sl[index]}</Text>
                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#fff' }}>{title[index]}</Text>
            </View>
            <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
                {icon[index]}
            </View>
        </TouchableOpacity>
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: '#005CFF' }}>
            <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
            <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 0.6, y: 0.5 }}
                colors={['#FFFFFF', '#005CFF']} style={{ height: 486, width: 486, position: 'absolute', left: 86, top: -293, borderRadius: 486 / 2 }}>
            </LinearGradient>
            <View style={{ paddingTop: StatusBar.currentHeight }}>
                <Text style={{ paddingHorizontal: 16, fontFamily: 'SVN-Poppins', fontStyle: 'normal', fontWeight: 'bold', fontSize: 34, lineHeight: 41, letterSpacing: 0.374, color: '#fff', paddingTop: 20 }}>Xin chào,Admin</Text>
                <Text style={{ paddingHorizontal: 16, fontFamily: 'SVN-Poppins', fontStyle: 'normal', fontWeight: 'bold', fontSize: 18, lineHeight: 41, letterSpacing: 0.374, color: '#fff', paddingBottom: 20 }}>{time}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: 30 }}>
                <Text style={{ paddingHorizontal: 16, fontFamily: 'SVN-Poppins', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, lineHeight: 41, letterSpacing: 0.374, color: '#1A1A1A', paddingBottom: 10 }}>Danh mục</Text>
                <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row', paddingHorizontal: 11 }}>
                    {[1, 2, 3, 4].map((res) => {
                        return <View style={{ width: '50%', padding: 5 }}>
                            <FormBtn index={res - 1} />
                        </View>
                    })
                    }
                </View >
                <Text style={{ paddingHorizontal: 16, fontFamily: 'SVN-Poppins', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, lineHeight: 41, letterSpacing: 0.374, color: '#1A1A1A', paddingBottom: 8, paddingTop: 16 }}>Thành viên online</Text>
                {!loading &&
                    <View style={{ paddingHorizontal: 16, }}>
                        <PieChart
                            data={data}
                            width={deviceWidth - 32}
                            height={deviceWidth * 0.6}

                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"16"}
                            center={[15, 0]}
                            absolute
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",

                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

                                propsForDots: {
                                    r: "61",
                                    strokeWidth: "20",
                                    stroke: "#ffa726"
                                }
                            }}
                        />

                    </View>
                }
            </View>
            <ModalLoading visible={loading} />
            <ModalLoading1 visible={loading1} />

        </ScrollView>
    )
}

const styles = StyleSheet.create({})
