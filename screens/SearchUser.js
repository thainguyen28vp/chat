import React, { useState, useRef, useEffect } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
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
                users.push(element.data())
            }
            setallUsers(users);
        });
        fbUser.doc(user.uid).onSnapshot(res => setmyUser(res.data()))
    }, [])
    useEffect(() => {
        search.indexOf('@') == -1 ?
            fbUser.onSnapshot(res => {
                const users = res.docs.filter(result => result.data().name.toLowerCase().search(search.toLowerCase()) > -1 && result.data().uid != user.uid);
                setUsers(users);
            })
            :
            fbUser.onSnapshot(res => {
                const users = res.docs.filter(result => result.data().email.toLowerCase().search(search.toLowerCase()) > -1 && result.data().uid != user.uid);
                setUsers(users);
            })

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
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', flexDirection: 'row', paddingVertical: 10 }}>
                <Image source={{ uri: item.image }} style={{ height: 44, width: 44, borderRadius: 22 }} />
                <Text style={{ paddingLeft: 10, fontSize: 18 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    const Histoty = ({ myUser, allUsers }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {
                    myUser?.HistorySearch?.slice().reverse().map(result => {
                        return (
                            <View>
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
        <View style={{ flex: 1, backgroundColor: 'white', paddingLeft: 15, paddingRight: 15 }}>
            <View style={{ flexDirection: 'row' }}>
                <SearchInput value={valueIn} onChange={text => getValue(text)} placeholder='Tìm kiếm...' />
                <TouchableOpacity style={{ justifyContent: 'center', height: 40, }} onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 16, color: 'skyblue' }}>Hủy</Text>
                </TouchableOpacity>
            </View>
            {
                search != '' ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            Users.map((res, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => ClickUser(res.data())}
                                        key={index}
                                        style={styles.formSearch}
                                    >
                                        <View
                                            style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <Image source={{ uri: res.data().image }} style={styles.avt} />
                                            <View >
                                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{res.data().name}</Text>
                                                {
                                                    myUser.listFriends.map(result => {
                                                        let sum = 0;
                                                        let friend = [];
                                                        if (res.data().listFriends.includes(result)) sum++;
                                                        allUsers.map(res => {
                                                            if (res.uid === result) friend.push(res.name)
                                                        })
                                                        return (
                                                            <View style={{ flexDirection: 'row' }}>
                                                                {
                                                                    sum != 0 ?
                                                                        <Text style={{ fontSize: 12 }}>
                                                                            <Text>{sum} bạn chung : </Text>
                                                                            {
                                                                                friend.length == 1 ?
                                                                                    <Text>{friend[0]}</Text>
                                                                                    :
                                                                                    friend.length == 2 ?
                                                                                        <Text>{friend[0]},{friend[1]}</Text>
                                                                                        :
                                                                                        <Text>{friend[0]},{friend[1]}...</Text>
                                                                            }
                                                                        </Text>
                                                                        : <View></View>
                                                                }
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            {
                                                myUser.listFriends.includes(res.data().uid) ?
                                                    <ButtonFriend title='bạn bè' iconName='user-plus' /> :
                                                    myUser.friendRequest.includes(res.data().uid) ?
                                                        <ButtonFriend title='đã gửi lời mời' iconName='user-plus' /> :
                                                        myUser.friendAwait.includes(res.data().uid) ?
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
                            myUser?.HistorySearch?.length != 0 && <Text style={{ paddingBottom: 10, fontSize: 16 }}>Lịch sử tìm kiếm</Text>
                        }
                        <Histoty myUser={myUser} allUsers={allUsers} />
                        <View >
                            <Text style={{ fontSize: 16 }}>Gợi ý</Text>
                            <View>
                                {
                                    allUsers.map(res => {
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