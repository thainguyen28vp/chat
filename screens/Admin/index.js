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
import { IconUser, Ic_admin, Ic_post, ImgHome } from './iconSVG';
import { deviceWidth } from './custom';
import LinearGradient from 'react-native-linear-gradient';
export default function Admin({ navigation }) {
    const [time, setTime] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setTimess();
        }, 1000);
        return () => {

        }
    }, [])
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
            population: 100,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 16
        },

        {
            name: "người offline",
            population: 66,
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
                break;
        }
    }
    const FormBtn = ({ index }) => {
        const color = ['#EB212E', '#54C0FF', '#6FC387'];
        const title = ['Tài khoản', 'Bài đăng', 'Admin'];
        const icon = [<IconUser />, <Ic_post />, <Ic_admin />];
        return <TouchableOpacity
            onPress={() => moving(index)}
            style={{ backgroundColor: color[index], width: '100%', height: 130, borderRadius: 10, justifyContent: 'center' }}>
            <View style={{ position: 'absolute', top: 16, right: 16 }}>
                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#fff' }}>100</Text>
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
            contentContainerStyle={{ flex: 1, backgroundColor: '#005CFF' }}>
            <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
            <LinearGradient start={{ x: 0.0, y: 0.0 }} end={{ x: 0.6, y: 0.5 }}
                colors={['#FFFFFF', '#005CFF']} style={{ height: 486, width: 486, position: 'absolute', left: 86, top: -293, borderRadius: 486 / 2 }}>
            </LinearGradient>
            <View style={{ paddingTop: StatusBar.currentHeight }}>
                <Text style={{ paddingHorizontal: 16, fontFamily: 'SVN-Poppins', fontStyle: 'normal', fontWeight: 'bold', fontSize: 34, lineHeight: 41, letterSpacing: 0.374, color: '#fff', paddingTop: 20 }}>Xin chào,Admin</Text>
                <Text style={{ paddingHorizontal: 16, fontFamily: 'SVN-Poppins', fontStyle: 'normal', fontWeight: 'bold', fontSize: 18, lineHeight: 41, letterSpacing: 0.374, color: '#fff', paddingBottom: 20 }}>{time}</Text>

            </View>
            <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: 20 }}>
                <Text style={{ paddingHorizontal: 16, fontFamily: 'SVN-Poppins', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, lineHeight: 41, letterSpacing: 0.374, color: '#1A1A1A', paddingBottom: 10 }}>Danh mục</Text>
                <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row', paddingHorizontal: 11 }}>
                    {[1, 2, 3].map((res) => {
                        return <View style={{ width: '50%', padding: 5 }}>
                            <FormBtn index={res - 1} />
                        </View>
                    })
                    }
                </View >
                <Text style={{ paddingHorizontal: 16, fontFamily: 'SVN-Poppins', fontStyle: 'normal', fontWeight: 'bold', fontSize: 20, lineHeight: 41, letterSpacing: 0.374, color: '#1A1A1A', paddingBottom: 8, paddingTop: 16 }}>Thành viên online</Text>

                <View style={{ paddingHorizontal: 16, }}>
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
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({})
