import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import SearchInput from '../components/SearchInput';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const width = Dimensions.get('window').width;

const SearchFriend = ({ route, navigation }) => {
    const { myUser, allUsers, myFriend } = route?.params
    const [status, setStatus] = useState(0)
    const [valueIn, setvalueIn] = useState('');
    const [search, setSearch] = useState('')
    const [datas, setData] = useState([])

    const valueInput = useRef(null)
    const dataDefault = useRef(null)

    const list = [{ key: 0, title: 'Tất cả' }, { key: 1, title: 'Bạn chung' }]

    useEffect(() => {
        let data = [];

        myFriend ?
            myFriend.listFriends.map(res => {
                allUsers.map(result => {
                    if (res === result.uid) data.push(result)
                })
            })
            :
            myUser.listFriends.map(res => {
                allUsers.map(result => {
                    if (res === result.uid) data.push(result)
                })
            })
        setData(data)
        if (!dataDefault.current) dataDefault.current = data;
    }, [])
    const getValue = (text) => {
        setvalueIn(text);

        if (valueInput.current) clearTimeout(valueInput.current)
        valueInput.current = setTimeout(() => {
            setSearch(text)
        }, 300);
    }
    useEffect(() => {
        const users = datas?.filter(result => result.name.toLowerCase().search(search.toLowerCase()) > -1);

        if (!search) setData(dataDefault.current); else setData(users);
    }, [search])
    const Form = ({ sum, result, onPress }) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{ flexDirection: 'row' }}>
                <Image source={{ uri: result.image }} style={styles.form} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{result.name}</Text>
                    {
                        sum != 0 ?
                            <Text>{sum} bạn chung</Text>
                            : <View></View>
                    }
                </View>
            </TouchableOpacity>

        )
    }
    async function checkFriend(res) {
        await setStatus(res.key)
        await setvalueIn('')
        let data = []
        if (res.key == 0) setData(dataDefault.current)
        else {
            let list = [];
            myFriend.listFriends.map(myfriend => {
                myUser.listFriends.map(myuser => {
                    if (myfriend === myuser) list.push(myfriend)
                })
            })
            allUsers.map(all => {
                list.map(uid => {
                    if (all.uid === uid) data.push(all)
                })
            })
            setData(data)
        }

    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <FontAwesome5 name='angle-left' size={30} color='#000' style={styles.iconHeader} onPress={() => navigation.goBack()} />
                <View style={styles.sizeTextHeader}>
                    <Text style={styles.textHeader}>{myFriend ? 'Bạn bè của ' + myFriend.name : 'Bạn bè'}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', padding: 15, flex: 1 }}>
                {
                    myFriend &&
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        {
                            list.map(res => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => checkFriend(res)}
                                        style={[styles.btn, status === res.key && styles.btnActive]}>
                                        <Text style={[styles.textTab, status === res.key && styles.textActive]}>
                                            {res.title}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                }
                <View style={{ alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                    <SearchInput value={valueIn} onChange={text => getValue(text)} placeholder='Tìm kiếm...' />
                </View>
                <View>
                    {
                        datas?.filter(x => x.uid != myUser.uid).map(res => {
                            return (
                                <View style={{ paddingVertical: 10 }}>
                                    {
                                        myFriend ?
                                            myFriend.listFriends.map(result => {
                                                let sum = 0;
                                                if (res.uid.localeCompare(result)) {
                                                    if (myUser.listFriends.includes(result)) sum++;
                                                    return (
                                                        <Form result={res} sum={sum} onPress={() => navigation.push('UserScreen', { friend: res })} />
                                                    )
                                                }
                                            })
                                            :
                                            myUser.listFriends.map(result => {
                                                let sum = 0;
                                                if (res.uid.localeCompare(result)) {
                                                    if (res.listFriends.includes(result)) sum++;
                                                    return (
                                                        <Form result={res} sum={sum} onPress={() => navigation.push('UserScreen', { friend: res })} />
                                                    )
                                                }
                                            })
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>

        </View>
    )
}

export default SearchFriend

const styles = StyleSheet.create({
    btn: {
        borderWidth: 0.5,
        width: width / 3.5,
        borderColor: '#D8D8D8',
        padding: 10,
        alignItems: 'center'
    },
    btnActive: {
        backgroundColor: '#226fd9'
    },
    textActive: {
        color: 'white'
    },
    textTab: {
        fontSize: 16,
        color: '#000'
    },
    header: {
        backgroundColor: 'white',
        width: '100%',
        height: '7%',
        flexDirection: 'row',
        elevation: 5
    },
    iconHeader: {
        position: 'absolute',
        left: 15,
        alignSelf: 'center',
        padding: 5,
        paddingHorizontal: 10
    },
    sizeTextHeader: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '100%'
    },
    textHeader: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    form: {
        width: width / 6,
        height: width / 6,
        borderRadius: width / 12,
        marginRight: 10
    }
})
