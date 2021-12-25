import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Text, View, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native'

import { Title } from 'react-native-paper'

import SearchInput from '../components/SearchInput';
import firestore from '@react-native-firebase/firestore'
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import UserScreen from './UserScreen';
import { Alert } from 'react-native';





const width = Dimensions.get('window').width;
export default function Addgroupchat({ navigation, user }) {

    const [listF, setlistF] = useState([])
    const [listselect, setlistslect] = useState([])
    const [namegroup, getnamegroup] = useState("")
    const [image, setImage] = useState("");

    const [name1, setname1] = useState("");



    let servertimemm = new Date().getMilliseconds()
    let serverTimeh = new Date().getHours()
    let serverTimem = new Date().getMinutes()
    let serverTimed = new Date().getDate()
    let serverTimey = new Date().getFullYear()
    const timenow = serverTimeh + serverTimem + servertimemm
    const idadd = timenow + serverTimey + serverTimed + user.uid
    const usert = listselect.map(res => res.uid)
    usert.push(user.uid)





    async function loaddata1() {

        // const uid = await firestore().collection('chatrooms').where('idu', '==', user.uid).get()
        const uid1 = await firestore().collection('users').get()

        const allusers1 = uid1.docs.map(res => res.data())

        // const all = allusers.filter(res => res.sentTo === user.uid || res.sentBy === user.uid)
        // console.log('hehe', all)
        let data1 = [];
        allusers1.map(res => {


            if (res.listFriends.includes(user.uid)) data1.push(res)
        })

        // console.log('hoho', data)

        setlistF(data1)
    }
    useEffect(() => {
        loaddata1()
    }, [])
    firestore().collection('users')
        .doc(user.uid).onSnapshot((res) => {

            const imageu1 = res.data().image
            const nameu1 = res.data().name
            setname1(nameu1)
            setImage(imageu1)

        })
    const onChangeValue = (itemSelected, index) => {


        const newData = listF.map(item => {

            if (item.uid == itemSelected.uid) {
                return {
                    ...item,
                    selected: !item.selected
                }
            }
            return {
                ...item,
                selected: item.selected
            }
        })

        setlistF(newData)
        setlistslect(newData.filter(item => item.selected == true))

    }
    const submit = () => {
        if (namegroup != "" && usert.length >= 3) {
            const mymsg = {
                _id: 'abcxhscnajnjas',
                text: 'chào mọi người',
                user: {
                    _id: user.uid,
                    name: name1,
                    avatar: image
                },
            }
            firestore().collection('chatrooms1')
                .doc(idadd)
                .collection('messages')
                .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
            firestore().collection('chatrooms1').doc(idadd).set({
                createdAt: firestore.FieldValue.serverTimestamp(),
                SentBy: user.uid,
                statusv: 'sent',
                text: 'bạn đã được mời vào nhóm',
                us1: {
                    id: idadd,
                    name: namegroup,
                    avatar: 'https://png.pngtree.com/element_our/png_detail/20181021/group-avatar-icon-design-vector-png_141882.jpg'

                },
                us2: {
                    id: idadd,
                    name: namegroup,
                    avatar: 'https://png.pngtree.com/element_our/png_detail/20181021/group-avatar-icon-design-vector-png_141882.jpg'

                },
                userT: usert

            })
            navigation.goBack()
        }
        else Alert.alert('Nhóm tối thiểu 3 thành viên và phải có tên nhóm')
    }










    const renderItem = ({ item, index }) => {
        return (
            <View style={{ paddingLeft: 10, paddingRight: 15, backgroundColor: 'transparent' }} key={index}>
                <View style={styles.containerv}>


                    <View style={styles.image}>

                        <Image
                            source={{ uri: item.image }}
                            style={{
                                borderRadius: 30,
                                height: 40,
                                width: 40
                            }}
                        />

                    </View>
                    <View style={styles.text}>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                            {item.name}
                        </Text>

                    </View>
                    <View >
                        <CheckBox
                            value={item.selected}
                            disabled={false}
                            style={styles.checkbox}
                            onValueChange={() => onChangeValue(item, index)}
                        ></CheckBox>
                    </View>

                </View>
            </View >
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 16, color: 'skyblue' }}>Hủy</Text>
                </TouchableOpacity>
                <Title>Nhóm Mới</Title>
                <TouchableOpacity onPress={submit} >
                    <Text style={{ fontSize: 16, color: 'skyblue' }}>Tạo</Text>
                </TouchableOpacity>
            </View>
            <TextInput placeholder='Tên nhóm '

                placeholderTextColor='#B4B4B4'
                onChangeText={getnamegroup}
                value={namegroup}
            />
            <SearchInput placeholder='Tìm kiếm...' />
            <View>
                {listselect.length != 0 ? <ScrollView horizontal={true} howsHorizontalScrollIndicator={false} >
                    {listselect.map((value) => {
                        return (

                            <View style={styles.containerl}>
                                <View style={styles.align}>
                                    <Image
                                        source={{ uri: value.image }}// chỗ uri này viết đúng chưa nhỉ
                                        style={{
                                            borderRadius: 30,
                                            height: 60,
                                            width: 60
                                        }}
                                    />
                                </View>
                                <View style={styles.align}>
                                    <Text style={{ textAlign: 'center', fontSize: 14 }}>
                                        {value.name}
                                    </Text>
                                </View>
                            </View>
                        )
                    })
                    }
                </ScrollView>
                    : <View></View>}
            </View>
            <Text>Gợi ý</Text>
            <FlatList
                data={listF}
                renderItem={renderItem}
                keyExtractor={item => `key-${item.uid}`}
            />




        </View>
    )

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 10
    },
    containerv: {
        paddingBottom: 10,
        flexDirection: 'row',


    },

    checkbox: {
        alignSelf: "center",
    },

    image: {
        paddingRight: 10
    },
    text: {
        alignContent: 'center',
        height: 60,

    },
    containerl: {
        paddingHorizontal: 10,
        backgroundColor: 'transparent',


    },

    align: {
        width: 70,
        alignItems: 'center'
    }
})
