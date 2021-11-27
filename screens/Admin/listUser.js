import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { deviceWidth, HeaderCustomBot } from './custom';
import { Ic_cong, Ic_goto, Ic_search, Ic_thongke } from './iconSVG'
import { ModalSignup } from './modal';
const screenWidth = Dimensions.get("window").width;
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
export default function ListUser({ navigation }) {
    const [visible, setVisible] = useState(false)
    const [hide, setHide] = useState(false)
    const Form = () => {
        return <TouchableOpacity
            onPress={() => navigation.navigate('detailUser')}
            style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#CFE1ED', paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: 'https://scontent.fhan5-3.fna.fbcdn.net/v/t1.6435-9/103251197_583143952622403_1519974222007604850_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=wnmKF4ZlQu4AX_c74Nu&_nc_ht=scontent.fhan5-3.fna&oh=86e3806e3abb058301497cc57443e0b7&oe=61C79341' }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Thái nguyễn</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#05B621' }}></View>
                <Text style={{ fontSize: 14, marginRight: 16, marginLeft: 5, textAlign: 'center' }}>online</Text>
                <Ic_goto />
            </View>
        </TouchableOpacity>
    }
    const data = {
        labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
        datasets: [
            {
                data: [10, 30, 50, 60, 80, 90, 100],
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
            <HeaderCustomBot title='Danh sách người dùng' back={() => navigation.pop()} />
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', width: screenWidth - 32, alignItems: 'center', marginTop: 20, backgroundColor: '#F3F7F9', marginBottom: 24, height: 36, borderRadius: 10, }}>
                    <Ic_search />
                    <TextInput style={{ width: '100%' }} placeholder='Tìm kiếm' onChangeText={''} value={''} />
                </View>
            </View>
            <View style={{ paddingBottom: 25, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={() => setVisible(true)}
                    style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#8EA0AB', height: 50, paddingHorizontal: 10, borderRadius: 5 }}>
                    <Ic_cong />
                    <Text style={{ fontSize: 16, color: '#2F80ED', marginLeft: 10, fontWeight: 'bold' }}>
                        ADD USER
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHide(!hide)}
                    style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#8EA0AB', height: 50, paddingHorizontal: 10, borderRadius: 5 }}>
                    <Ic_thongke />
                    <Text style={{ fontSize: 16, color: '#2F80ED', marginLeft: 10, fontWeight: 'bold' }}>
                        THỐNG KÊ
                    </Text>

                </TouchableOpacity>
            </View>
            {
                hide && <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 20 }}>
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
                    [1, 2, 3, 4, 5, 6, 6, 6, 6, 6].map(res => {
                        return <Form />
                    })
                }
            </View>
            <ModalSignup isVisible={visible} onPressClose={() => setVisible(false)} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
