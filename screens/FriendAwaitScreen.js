import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { View, Text, Dimensions, Image, StyleSheet, StatusBar } from 'react-native'
import firestore from '@react-native-firebase/firestore'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default function FriendAwaitScreen({ route, navigation }) {
    const { myUser, allusers } = route?.params;
    const fbUser = firestore().collection('users');
    const [check, setCheck] = useState({ uid: null, key: null });

    const Form = ({ data, clickDelete, clickAccept, check }) => {

        return (
            <View style={styles.form}>
                <View>
                    <Image
                        source={{ uri: data.image }}
                        style={styles.avt}
                    />
                </View>
                <View style={{ justifyContent: 'center', paddingLeft: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>
                        {data.name}
                    </Text>


                    {

                        (data.uid === check.uid && check.key === 1) ?
                            <Text>Các bạn đã là bạn bè</Text>
                            : (data.uid === check.uid && check.key === 0) ?
                                <Text>
                                    Đã gỡ lời mời
                                </Text>
                                :
                                <View style={styles.viewBtn}>
                                    <TouchableOpacity style={[styles.btn, { backgroundColor: '#226fd9' }]}
                                        onPress={clickAccept}
                                    >
                                        <Text style={[styles.txtButton, { color: 'white' }]}>
                                            Chấp nhận
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.btn, { backgroundColor: '#E0E0E0' }]}
                                        onPress={clickDelete}
                                    >
                                        <Text style={[styles.txtButton, { color: 'black' }]}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                    }
                </View>
            </View>
        )
    }
    async function acceptFriend(friend) {
        await setCheck({ uid: friend.uid, key: 1 })
        const index = myUser.friendAwait.indexOf(friend.uid);
        myUser.friendAwait.splice(index, 1);
        fbUser.doc(myUser.uid).update({
            friendAwait: myUser.friendAwait
        })
        myUser.listFriends.push(friend.uid);
        fbUser.doc(myUser.uid).update({
            listFriends: myUser.listFriends
        })
        const index2 = friend.friendRequest.indexOf(myUser.uid)
        friend.friendRequest.splice(index2, 1);
        fbUser.doc(friend.uid).update({
            friendRequest: friend.friendRequest
        })
        friend.listFriends.push(myUser.uid)
        fbUser.doc(friend.uid).update({
            listFriends: friend.listFriends
        })

    }
    async function refuseFriend(friend) {
        await setCheck({ uid: friend.uid, key: 0 });
        const index = myUser.friendAwait.indexOf(friend.uid);
        myUser.friendAwait.splice(index, 1);
        fbUser.doc(myUser.uid).update({
            friendAwait: myUser.friendAwait
        })
        const index2 = friend.friendRequest.indexOf(myUser.uid)
        friend.friendRequest.splice(index2, 1);
        fbUser.doc(friend.uid).update({
            friendRequest: friend.friendRequest
        })
    }

    return (
        <View style={{ padding: 15, backgroundColor: 'white', flex: 1 }}>
            <StatusBar barStyle='light' backgroundColor='black' />
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ alignItems: 'flex-end', paddingBottom: 10 }}>
                <Text style={styles.txtDimiss}>Trở lại</Text>
            </TouchableOpacity>
            {
                allusers.map(res => {
                    return (
                        <View>
                            {
                                myUser.friendAwait.map(result => {
                                    if (res.uid == result) {
                                        return (
                                            <Form data={res} clickAccept={() => acceptFriend(res)} clickDelete={() => refuseFriend(res)} check={check} />
                                        )
                                    }

                                })
                            }
                        </View>
                    )
                })
            }
        </View>
    )
}
const styles = StyleSheet.create({
    btn: {
        width: width * 0.3,
        height: width * 0.1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtButton: {
        fontWeight: 'bold',
        fontSize: 15
    },
    viewBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.65
    },
    avt: {
        height: width * 0.2,
        width: width * 0.2,
        borderRadius: width * 0.2,
        marginRight: 10
    },
    form: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomColor: '#F0F0F0'
    },
    txtDimiss: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue'
    }
})
