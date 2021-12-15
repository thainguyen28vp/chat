import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StatusBar } from 'react-native'
import { deviceHeight, deviceWidth, HeaderCustomBot } from './custom';
import { Ic_back, Ic_cong, Ic_goto, Ic_search, Ic_thongke } from './iconSVG'
import { ModalSignup } from './modal';
import moment from 'moment'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
const screenWidth = Dimensions.get("window").width;
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { ModalLoading } from '../../components/Loading';
import { data } from 'browserslist';
import SimpleToast from 'react-native-simple-toast';
export default function ListAdmin({ navigation }) {


    const [visible, setVisible] = useState(false)
    const [hide, setHide] = useState(false)
    const [datauser, setdatau] = useState([])
    const [loading, setLoading] = useState(true)
    const [thongke, setthongke] = useState([])
    const [ngay, setngay] = useState([])
    const [tk, setTextTk] = useState('')
    const [mk, setTextMk] = useState('')
    const [ht, setTexthT] = useState('')


    useEffect(async () => {
        // firestore().collection('users').get().then(data => {
        //     // setdata(docSnap.data())
        //     console.log('data', data.data())

        const data = await firestore().collection('users').where('decentralization', '==', 1).get()
        const allusers = data.docs.map(res => res.data())
        await setdatau(allusers)
        setLoading(false);
    }, [])
    // function thongketg() {
    //     setHide(!hide)
    //     let check = []
    //     let ngay = []
    //     let a = [6, 5, 4, 3, 2, 1, 0]
    //     a.map((res) => {
    //         const data = datauser.filter(res1 => moment(res1.createdAt).format('DDMMYYYY') == moment(Date.now() - res * 24 * 3600 * 1000).format('DDMMYYYY'))
    //         check.push(data.length)
    //         ngay.push(moment(Date.now() - res * 24 * 3600 * 1000).format('DD/MM'))
    //     })
    //     setthongke(check)
    //     setngay(ngay)
    //     console.log(ngay, check)
    // }
    const Form = ({ item }) => {
        return <TouchableOpacity
            onPress={() => navigation.navigate('detailUser', item)}
            style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#CFE1ED', paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>{item.name}</Text>
            </View>
            {item.status == 'online' ?
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#05B621' }}></View>
                    <Text style={{ fontSize: 14, marginRight: 16, marginLeft: 5, textAlign: 'center' }}>online</Text>
                    <Ic_goto />
                </View> : <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: 'grey' }}></View>
                    <Text style={{ fontSize: 14, marginRight: 16, marginLeft: 5, textAlign: 'center' }}>offline</Text>
                    <Ic_goto />
                </View>
            }
        </TouchableOpacity>
    }

    async function signUp() {
        try {
            if (tk == '' || mk == '' || ht == '') {
                SimpleToast.show('Thông tin chưa đầy đủ.');
            }
            else {
                setLoading(true);
                const result = await auth().createUserWithEmailAndPassword(tk, mk)
                await firestore().collection('users').doc(result.user.uid).set({
                    name: ht,
                    email: result.user.email,
                    uid: result.user.uid,
                    image: "https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg",
                    imageBackground: 'https://i.pinimg.com/originals/38/6f/47/386f47c88a7aaa497ec6edc1c02cc9b6.jpg',
                    status: "online",
                    friendAwait: [],
                    friendRequest: [],
                    listFriends: [],
                    HistorySearch: [],
                    createdAt: new Date().toString(),
                    decentralization: 1
                });
                const data = await firestore().collection('users').where('decentralization', '==', 1).get()
                const allusers = data.docs.map(res => res.data())
                await setdatau(allusers)
                setLoading(false);
                setVisible(false);
                setTextMk('');
                setTextTk('');
                setTexthT('');
            }
        } catch (error) {
            if (error.code == 'auth/email-already-in-use')
                SimpleToast.show('Tài khoản email đã tồn tại hoặc không đúng định dạng.');
            else SimpleToast.show('Mật khẩu tối thiểu 6 ký tự.');
            setLoading(false);
        }

    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle='dark-content' />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.pop()} style={{ padding: 5 }}>
                        <Ic_back />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, paddingLeft: 10 }}>Danh sách admin</Text>
                </View>
                <TouchableOpacity

                    onPress={() => setVisible(true)}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.txtPost}>Thêm tài khoản</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', width: screenWidth - 32, alignItems: 'center', marginTop: 20, backgroundColor: '#F3F7F9', marginBottom: 24, height: 36, borderRadius: 10, }}>
                    <Ic_search />
                    <TextInput style={{ width: '100%' }} placeholder='Tìm kiếm' onChangeText={''} value={''} />
                </View>
            </View>


            <View style={{ paddingHorizontal: 16 }}>
                {
                    datauser.map(res => {
                        return <Form item={res} />
                    })
                }
            </View>
            <ModalLoading visible={loading} />
            <ModalSignup
                isVisible={visible}
                onPressClose={() => setVisible(false)}
                onChangeTextTK={setTextTk}
                onChangeTextMK={setTextMk}
                onChangeTextHT={setTexthT}
                userName={ht}
                userName={tk}
                password={mk}
                signUp={() => signUp()}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight,

        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
    },
    txtPost: {
        color: '#2F80ED',
        fontSize: 18
    },
})
