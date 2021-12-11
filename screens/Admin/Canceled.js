import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, RefreshControl } from 'react-native'
import { deviceWidth, Form, HeaderCustomBot } from './custom';
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
export default function Canceled({ navigation }) {
    const [visible, setVisible] = useState(false)
    const [datapost, setdatap] = useState([]);
    const [loading, setLoading] = useState(true)
    const [loadingRef, setLoadingRef] = useState(false)


    useEffect(() => {
        reload()
    }, [])
    async function reload() {
        await firestore()
            .collection('Post')
            .get()
            .then(docs => {
                let data1 = [];
                let data2 = []
                docs.forEach(async doc => {

                    const post = await firestore().collection('Post').doc(doc.id).collection('posts').where('status', '==', 1).get()
                    const allposts = post.docs.map(res => res.data())
                    post.docs.forEach(doc2 => {
                        let id = doc2.id
                        let data = doc2.data()
                        const dtpost = { id, data }
                        data1.push(dtpost)
                    })

                })
                setTimeout(async () => {
                    await setdatap(data1);
                    setLoading(false);
                }, 1000)
            })
            .catch(err => console.log(err))
    }



    async function refresh() {
        setLoadingRef(true);
        await reload();
        setLoadingRef(false);
    }
    return (
        <View
            style={{ flex: 1, backgroundColor: '#fff' }}>

            {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8 }}>
                {
                    datapost.map(res => {
                        return <View style={{ width: '50%', padding: 8 }}>
                            <Form item={res} />
                        </View>
                    })
                }
            </View> */}
            <View>
                <HeaderCustomBot title='Bài đăng đã hủy' back={() => navigation.pop()} />
                <View style={{ flexDirection: 'row', paddingHorizontal: 16, alignItems: 'center', }}>
                    <View style={{ flexDirection: 'row', width: deviceWidth - 32, alignItems: 'center', marginTop: 20, backgroundColor: '#F3F7F9', marginBottom: 24, height: 36, borderRadius: 10, }}>
                        <Ic_search />
                        <TextInput style={{ width: '100%' }} placeholder='Tìm kiếm' onChangeText={''} value={''} />
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 8 }}>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    numColumns={2}
                    data={datapost}
                    renderItem={({ item }) => <Form item={item} onPress={() => navigation.navigate('detailPost', item)} />}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl refreshing={loadingRef} onRefresh={() => refresh()} />

                    }
                />
            </View>
            <ModalLoading visible={loading} />
            <ModalSignup isVisible={visible} onPressClose={() => setVisible(false)} />
        </View>
    )
}

const styles = StyleSheet.create({})
