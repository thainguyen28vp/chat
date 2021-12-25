import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, RefreshControl, StatusBar } from 'react-native'
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
export default function Canceled({ navigation, route }) {
    const [visible, setVisible] = useState(false)
    const [datapost, setdatap] = useState([]);
    const [loading, setLoading] = useState(true)
    const [loadingRef, setLoadingRef] = useState(false)
    const [search, setSearch] = useState('')
    const [datasearch, setdatasearch] = useState([])
    useEffect(() => {
        reload()

    }, [route?.params?.reload])
    useEffect(() => {
        let post = [];
        if (search == '') {
            setdatasearch(datapost);
        }
        else {
            search.indexOf('@') == -1 ?
                post = datapost.filter(result => result.data().name.toLowerCase().search(search.toLowerCase()) > -1)
                :
                post = datapost.filter(result => result.data().email.toLowerCase().search(search.toLowerCase()) > -1)
            setdatasearch(post)
        }

    }, [search])
    async function reload() {

        const post = await firestore().collection('Post').where('status', '==', 1).get()
        // const allposts = post.docs.map(res => res.data())
        // console.log(post.docs)
        setdatap(post.docs)
        await setdatasearch(post.docs)
        setLoading(false);


    }
    function back() {
        const radom = Math.floor(Math.random() * 10000)
        navigation.navigate('listPost', { reload: radom })
    }


    async function refresh() {
        setLoadingRef(true);
        await reload();
        setLoadingRef(false);
    }
    return (
        <View
            style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle='dark-content' />
            <View>

                <HeaderCustomBot title='Bài đăng đã hủy' back={() => back()} />
                <View style={{ flexDirection: 'row', paddingHorizontal: 16, alignItems: 'center', }}>
                    <View style={{ flexDirection: 'row', width: deviceWidth - 32, alignItems: 'center', marginTop: 20, backgroundColor: '#F3F7F9', marginBottom: 24, height: 36, borderRadius: 10, }}>
                        <Ic_search />
                        <TextInput style={{ width: '100%' }} placeholder='Tìm kiếm' onChangeText={setSearch} value={search} />
                    </View>
                </View>
            </View>
            <View style={{ paddingHorizontal: 8 }}>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    numColumns={2}
                    data={datasearch}
                    renderItem={({ item }) => <Form item={item.data()} onPress={() => navigation.navigate('detailPost', { check: 1, data: item.data(), id: item.id })} />}
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
