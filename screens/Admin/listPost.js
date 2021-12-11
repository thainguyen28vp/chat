import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, RefreshControl } from 'react-native'
import { deviceWidth, HeaderCustomBot } from './custom';
import { Ic_cong, Ic_duyet, Ic_goto, Ic_Kduyet, Ic_search, Ic_thongke } from './iconSVG'
import { ModalSignup } from './modal';
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
import { FlatList } from 'react-native-gesture-handler';
export default function ListPost({ navigation }) {
    const [visible, setVisible] = useState(false)
    const [hide, setHide] = useState(false)
    const [datapost, setdatap] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])




    function check(key) {
        switch (key) {
            case 1:
                navigation.navigate('canceled');
                break;
            case 2:
                navigation.navigate('approved');
                break;
            case 3:
                navigation.navigate('pending');
                break;

        }
    }
    const data = [
        {
            name: "đã duyệt",
            population: 100,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 16
        },

        {
            name: "đã hủy",
            population: 66,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 16
        },

        {
            name: "chờ duyệt",
            population: 70,
            color: "blue",
            legendFontColor: "#7F7F7F",
            legendFontSize: 16
        }
    ];

    return (
        <View
            style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderCustomBot title='Quản lý bài đăng' back={() => navigation.pop()} />

            <View style={{ paddingHorizontal: 16, paddingVertical: 24, flexDirection: 'row', justifyContent: 'space-between' }}>

                <TouchableOpacity
                    onPress={() => check(1)}
                    style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#8EA0AB', height: 50, paddingHorizontal: 10, borderRadius: 5, width: '32%' }}>
                    <Ic_duyet />
                    <Text style={{ fontSize: 14, color: '#2F80ED', marginLeft: 10, fontWeight: 'bold' }}>
                        Đã hủy
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => check(2)}
                    style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#8EA0AB', height: 50, paddingHorizontal: 10, borderRadius: 5, width: '32%' }}>
                    <Ic_Kduyet />
                    <Text style={{ fontSize: 14, color: '#2F80ED', marginLeft: 10, fontWeight: 'bold' }}>
                        Đã duyệt
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => check(3)}
                    style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#8EA0AB', height: 50, paddingHorizontal: 10, borderRadius: 5, width: '32%' }}>
                    <Ic_thongke />
                    <Text style={{ fontSize: 14, color: '#2F80ED', marginLeft: 10, fontWeight: 'bold' }}>
                        Chờ duyệt
                    </Text>

                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 16, paddingTop: 30, paddingBottom: 20 }}>
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


            {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8 }}>
                {
                    datapost.map(res => {
                        return <View style={{ width: '50%', padding: 8 }}>
                            <Form item={res} />
                        </View>
                    })
                }
            </View> */}

            <ModalLoading visible={loading} />
            <ModalSignup isVisible={visible} onPressClose={() => setVisible(false)} />
        </View>
    )
}

const styles = StyleSheet.create({})
