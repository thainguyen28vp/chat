import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, StatusBar } from 'react-native'
import { deviceHeight, deviceWidth, HeaderCustomBot } from './custom';
import { Ic_back, Ic_cong, Ic_goto, Ic_search, Ic_thongke } from './iconSVG'
import { ModalSignup } from './modal';
import moment from 'moment'
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
export default function ListUser({ navigation }) {


    const [visible, setVisible] = useState(false)
    const [hide, setHide] = useState(false)
    const [datauser, setdatau] = useState([])
    const [loading, setLoading] = useState(true)
    const [thongke, setthongke] = useState([])
    const [ngay, setngay] = useState([])
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    useEffect(async () => {
        const data = await firestore().collection('users').where('decentralization', '!=', 1).get()
        const allusers = data.docs.map(res => res.data())
        setdatau(allusers)
        await setSearchUsers(allusers)
        setLoading(false);
    }, [])
    useEffect(() => {
        let users = [];
        if (search == '') {
            setSearchUsers(datauser);
        }
        else {
            search.indexOf('@') == -1 ?
                users = datauser.filter(result => result.name.toLowerCase().search(search.toLowerCase()) > -1)
                :
                users = datauser.filter(result => result.email.toLowerCase().search(search.toLowerCase()) > -1)
            setSearchUsers(users)
        }

    }, [search])
    function thongketg() {
        setHide(!hide)
        let check = []
        let ngay = []
        let a = [6, 5, 4, 3, 2, 1, 0]
        a.map((res) => {
            const data = datauser.filter(res1 => moment(res1.createdAt).format('DDMMYYYY') == moment(Date.now() - res * 24 * 3600 * 1000).format('DDMMYYYY'))
            check.push(data.length)
            ngay.push(moment(Date.now() - res * 24 * 3600 * 1000).format('DD/MM'))
        })
        setthongke(check)
        setngay(ngay)
    }
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
    const data = {
        labels: ngay,
        datasets: [
            {
                data: thongke,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Thành viên"] // optional
    };
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
                    <Text style={{ fontSize: 18, paddingLeft: 10 }}>Danh sách người dùng</Text>
                </View>
                <TouchableOpacity

                    onPress={() => thongketg()}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: 'blue' }}>Thống kê</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', width: screenWidth - 32, alignItems: 'center', marginTop: 20, backgroundColor: '#F3F7F9', marginBottom: 24, height: 36, borderRadius: 10, }}>
                    <Ic_search />
                    <TextInput style={{ width: '100%' }} placeholder='Tìm kiếm' onChangeText={setSearch} value={search} />
                </View>
            </View>
            {
                hide && <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
                    <LineChart
                        style={{ borderRadius: 10 }}
                        data={data}
                        width={deviceWidth - 32}
                        height={220}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                    />
                </View>
            }
            <View style={{ paddingHorizontal: 16 }}>
                {
                    searchUsers.map(res => {
                        return <Form item={res} />
                    })
                }
            </View>
            <ModalLoading visible={loading} />
            <ModalSignup isVisible={visible} onPressClose={() => setVisible(false)} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#CFE1ED',
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: deviceHeight * 0.07,
        paddingRight: 16,
        paddingLeft: 8,
    },
})
