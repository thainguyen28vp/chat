import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import Formchat from '../components/Formchat';
import HeaderHome from '../components/HeaderHome';
import SearchInput from '../components/SearchInput';
import UserOnline from '../components/UserOnline';
import firestore from '@react-native-firebase/firestore'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function Home({ navigation, user }) {


    const [users, setUsers] = useState([])
    const [dare, setDares] = useState([])
    const [myUser, setMyUser] = useState([])

    useEffect(() => {
        firestore().collection('users')
            .doc(user.uid).onSnapshot((res) => {
                setMyUser(res.data())
            })
    }, []);


    useEffect(() => {
        async function loaddata() {
            const querySanp = await firestore().collection('users').where('uid', '!=', user.uid).get()
            const allusers = querySanp.docs.filter(res => res.data().status === 'online' && res.data().listFriends.includes(user.uid)).map(res => res.data())
            setUsers(allusers)
        }
        loaddata()
    }, [users])
    useEffect(() => {

        async function loaddata() {

            // const uid = await firestore().collection('chatrooms').where('idu', '==', user.uid).get()
            const uid = await firestore().collection('chatrooms1').orderBy('createdAt', "desc").get()

            const allusers = uid.docs.map(res => res.data())
            // const all = allusers.filter(res => res.sentTo === user.uid || res.sentBy === user.uid)
            // console.log('hehe', all)
            let data = [];
            allusers.map(res => {
                if (res.userT.includes(user.uid)) data.push(res)
            })


            setDares(data)
        }
        loaddata()





    }, [dare])

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }


    return (
        <View style={{ paddingBottom: 60, backgroundColor: 'white', flex: 1 }}>
            <HeaderHome title='Chat' SourceImg={myUser?.image} onPressUser={() => navigation.navigate("account")} onPressaddgroup={() => navigation.navigate("addgroupchat")} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <TouchableOpacity style={styles.paddingSearch} onPress={() => navigation.navigate('SearchUser')}>
                    <View style={styles.inputSearch}>
                        <FontAwesome5 name='search' size={22} color='#949494' />
                        <Text style={{ color: '#242424', paddingLeft: 10 }} >Tìm kiếm...</Text>
                    </View>
                </TouchableOpacity>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ backgroundColor: 'transparent', paddingLeft: 20, alignItems: 'center' }} >
                        <View style={[styles.align, styles.border]}>
                            <FontAwesome5 name='video' size={24} />
                        </View>
                        <View style={styles.align}>
                            <Text style={{ textAlign: 'center' }}>
                                Tạo phòng họp mặt
                            </Text>
                        </View>
                    </View>
                    {

                        users.map((value) => {
                           return <TouchableOpacity onPress={() => navigation.navigate('chat', {
                                name: value.name, uid: value.uid, image: value.image
                          })}>
                              <UserOnline SourecImg={value.image} NameUser={value.name} />
                            </TouchableOpacity>
                        })
                    }
                </ScrollView>

                {

                    dare.map((value) => {
                        let mon = new Date(value.createdAt * 1000).getMonth()
                        let d = new Date(value.createdAt * 1000).getDate()
                        let h = new Date(value.createdAt * 1000).getHours()
                        let m = new Date(value.createdAt * 1000).getMinutes()
                        m = checkTime(m)
                        h = checkTime(h)
                        const time = h + ':' + m
                        const daytn = d + ' thg ' + mon





                        return <View>
                            {value.us1.id == user.uid && (
                                <TouchableOpacity onPress={() => navigation.navigate('chat', {
                                    name: value.us2.name, uid: value.us2.id, image: value.us2.avatar

                                })}>
                                    <Formchat SourecImg={value.us2.avatar}
                                        NameUser={value.us2.name}
                                        Text1={value.text.slice(0, 17)}
                                        Status={value.statusv}
                                        SentT={value.sentTo}
                                        sentB={value.sentBy}
                                        Time={time}
                                        Day={daytn}
                                        Uid={value.us2.id}
                                    />
                                </TouchableOpacity>
                            )}
                            {value.us1.id != user.uid && (
                                <TouchableOpacity onPress={() => navigation.navigate('chat', {
                                    name: value.us1.name, uid: value.us1.id, image: value.us1.avatar

                                })}>
                                    <Formchat SourecImg={value.us1.avatar}
                                        NameUser={value.us1.name}
                                        Text1={value.text.slice(0, 17)}
                                        Status={value.statusv}
                                        SentT={value.sentTo}
                                        sentB={value.sentBy}
                                        Time={time}
                                        Day={daytn}
                                        Uid={value.us1.id}
                                    />
                                </TouchableOpacity>
                            )}

                        </View>


                    })



                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    align: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#F0F0F0'

    },
    paddingSearch: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 5
    },
    inputSearch: {
        backgroundColor: '#F0F0F0',
        flexDirection: 'row',
        height: 40,
        paddingLeft: 10,
        alignItems: 'center',
        borderRadius: 20
    }
});
