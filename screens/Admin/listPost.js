import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { deviceWidth, HeaderCustomBot } from './custom';
import { Ic_cong, Ic_duyet, Ic_goto, Ic_Kduyet, Ic_search, Ic_thongke } from './iconSVG'
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
export default function ListPost({ navigation }) {
    const [visible, setVisible] = useState(false)
    const [hide, setHide] = useState(false)
    const Form = () => {
        return <View style={{
            width: '100%',
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 10,

            shadowColor: '#000000',
            shadowOffset: {
                width: 0,
                height: 3
            },
            elevation: 10,
            shadowRadius: 5,
            shadowOpacity: 1.0
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Người đăng : </Text>
                <Text style={{ fontSize: 16, color: '#000', }}>Thái nguyễn</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Nội dung : </Text>
                <Text numberOfLines={1} style={{ fontSize: 16, color: '#000', width: (deviceWidth - 100) / 3 }}>haloooooooooo ok helo hi i am fire</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Số lượng ảnh : </Text>
                <Text style={{ fontSize: 16, color: '#000', }}>3</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Thời gian tạo : </Text>
                <Text numberOfLines={1} style={{ fontSize: 16, color: '#000', width: (deviceWidth - 200) / 3 }}>27/11/2021 11:10 AM</Text>
            </View>
            <Text onPress={() => navigation.navigate('detailPost')} style={{ fontSize: 16, color: '#2F80ED', fontWeight: 'bold', textAlign: 'center', paddingTop: 10 }}>Xem chi tiết {'>'}</Text>
        </View>
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
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderCustomBot title='Danh sách bài đăng' back={() => navigation.pop()} />
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
                    <Ic_duyet />
                    <Text style={{ fontSize: 16, color: '#2F80ED', marginLeft: 10, fontWeight: 'bold' }}>
                        ĐÃ HỦY
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHide(!hide)}
                    style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#8EA0AB', height: 50, paddingHorizontal: 10, borderRadius: 5 }}>
                    <Ic_Kduyet />
                    <Text style={{ fontSize: 16, color: '#2F80ED', marginLeft: 10, fontWeight: 'bold' }}>
                        ĐÃ DUYỆT
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
                    <PieChart
                        data={data}
                        width={deviceWidth - 32}
                        height={300}

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
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8 }}>
                {
                    [1, 2, 3, 4, 5, 6, 6, 6, 6, 6].map(res => {
                        return <View style={{ width: '50%', padding: 8 }}>
                            <Form />
                        </View>
                    })
                }
            </View>
            <ModalSignup isVisible={visible} onPressClose={() => setVisible(false)} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
