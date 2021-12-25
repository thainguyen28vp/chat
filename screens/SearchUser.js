import React, { useState, useRef, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import firestore from '@react-native-firebase/firestore'

import SearchInput from '../components/SearchInput'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import UserOnline from '../components/UserOnline'

const withScreen = Dimensions.get('window').width;

export default function SearchUser({ user, navigation }) {
    const [valueIn, setvalueIn] = useState('');
    const [search, setSearch] = useState('');
    const [Users, setUsers] = useState([])
    const [allUsers, setallUsers] = useState([])
    const [myUser, setmyUser] = useState({})
    const valueInput = useRef(null)


    const fbUser = firestore().collection('users');

    const getValue = (text) => {
        setvalueIn(text);

        if (valueInput.current) clearTimeout(valueInput.current)
        valueInput.current = setTimeout(() => {
            setSearch(text)
        }, 300);
    }
    useEffect(() => {
        fbUser.onSnapshot(res => {
            const users = [];
            for (let index = 0; index < res.docs.length; index++) {
                const element = res.docs[index];
                if (element.data().decentralization != 1) users.push(element.data())
            }
            setallUsers(users);
        });
        fbUser.doc(user.uid).onSnapshot(res => setmyUser(res.data()))
    }, [])
    useEffect(async () => {
        let users = [];
        search.indexOf('@') == -1 ?
            users = allUsers.filter(result => result.name.toLowerCase().search(search.toLowerCase()) > -1 && result.uid != user.uid)
            :
            users = allUsers.filter(result => result.email.toLowerCase().search(search.toLowerCase()) > -1 && result.uid != user.uid)
        setUsers(users)

    }, [search])


    const Item = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => navigation.navigate('UserScreen', { friend: item })}>
                <UserOnline SourecImg={item.image} NameUser={item.name} />
            </TouchableOpacity>
        )
    }
    const Items = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('UserScreen', { friend: item })}
                style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', flexDirection: 'row', paddingVertical: 10 }}>
                <Image source={{ uri: item.image }} style={{ height: 44, width: 44, borderRadius: 22 }} />
                <Text style={{ paddingLeft: 10, fontSize: 18 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    const Histoty = ({ myUser, allUsers }) => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                {
                    myUser?.HistorySearch?.slice().reverse().map(result => {
                        return (
                            <View style={{ width: '25%', alignItems: 'center' }}>
                                {
                                    allUsers.filter(res => res.uid === result).map(userd => {
                                        return (
                                            <Item item={userd} />
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }
    function ClickUser(res) {
        navigation.navigate('UserScreen', { friend: res })
        if (myUser.HistorySearch.includes(res.uid) == false) {
            if (myUser.HistorySearch.length == 4) {
                myUser.HistorySearch.shift();
                myUser.HistorySearch.push(res.uid);
            }
            else myUser.HistorySearch.push(res.uid);
            fbUser.doc(user.uid).update({
                HistorySearch: myUser.HistorySearch
            })
        }
        else {

            const index = myUser.HistorySearch.indexOf(res.uid);
            myUser.HistorySearch.splice(index, 1);
            myUser.HistorySearch.push(res.uid);
            fbUser.doc(user.uid).update({
                HistorySearch: myUser.HistorySearch
            })
        }

    }
    const ButtonFriend = ({ title, iconName }) => {
        return (
            <View
                style={styles.btnFriend}>
                <Text style={{ fontSize: 15, paddingRight: 5 }}>{title}</Text>
                <FontAwesome5 name={iconName} size={20} />
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: StatusBar.currentHeight + 5 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
                <SearchInput value={valueIn} onChange={text => getValue(text)} placeholder='Tìm kiếm...' />
                <TouchableOpacity style={{ justifyContent: 'center', height: 40, }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 16, color: '#2F80ED' }}>Hủy</Text>
                </TouchableOpacity>
            </View>
            {
                search != '' ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            Users.map((res, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => ClickUser(res)}
                                        key={index}
                                        style={styles.formSearch}
                                    >
                                        <View
                                            style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <Image source={{ uri: res.image }} style={styles.avt} />
                                            <View >
                                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{res.name}{res.numberFriend}</Text>
                                                {/* laalala */}
                                            </View>
                                        </View>
                                        <View>
                                            {
                                                myUser.listFriends.includes(res.uid) ?
                                                    <ButtonFriend title='bạn bè' iconName='user-plus' /> :
                                                    myUser.friendRequest.includes(res.uid) ?
                                                        <ButtonFriend title='đã gửi lời mời' iconName='user-plus' /> :
                                                        myUser.friendAwait.includes(res.uid) ?
                                                            <ButtonFriend title='chờ xác nhận' iconName='user-plus' /> :
                                                            <ButtonFriend title='kết bạn' iconName='user-plus' />
                                            }
                                        </View>

                                    </TouchableOpacity>
                                )
                            })
                        }

                    </ScrollView>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            myUser?.HistorySearch?.length != 0 && <Text style={{ paddingBottom: 10, color: '#52575C', fontSize: 16 }}>Lịch sử tìm kiếm</Text>
                        }
                        <Histoty myUser={myUser} allUsers={allUsers} />
                        <View >
                            <Text style={{ fontSize: 16, color: '#52575C' }}>Gợi ý</Text>
                            <View>
                                {
                                    allUsers.slice(0, 10).filter(user => user.decentralization == 0).map(res => {
                                        return (
                                            <Items item={res} />
                                        )
                                    })
                                }
                            </View>
                        </View>

                    </ScrollView>
            }
        </View>
    )

}
const styles = StyleSheet.create({

    icon: {
        position: 'absolute',
        top: 15,
        left: 35,
        color: '#949494'
    },
    formSearch:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        alignItems: 'center'
    },
    avt:
    {
        marginRight: 10,
        height: 60,
        width: 60,
        borderRadius: 30
    },
    btnFriend:
    {
        flexDirection: 'row',
        backgroundColor: '#ccc',
        padding: 5,
        borderRadius: 5
    }
});