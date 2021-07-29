import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, Modal, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ImageViewer from 'react-native-image-zoom-viewer';
import firestore from '@react-native-firebase/firestore'
import ActionSheet from 'react-native-actionsheet'
import HeaderHome from '../components/HeaderHome'
import FormPost from '../components/FormPost'
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import { getMaxListeners } from 'process';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function UserScreen({ user, route, navigation }) {
    const fbUser = firestore().collection('users');
    const [myUser, setmyUser] = useState({})
    const [allUsers, setallUsers] = useState([])
    const [options, setOption] = useState({ option: [], key: null })
    const [post, setPost] = useState([])
    const [visible, setvisible] = useState(false)
    const [urlImage, setUrlImage] = useState([])

    let actionSheet = useRef();


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
        if (route?.params) {
            firestore().collection('Post').doc(route?.params?.friend.uid).collection('posts').orderBy('createAt', "desc").onSnapshot(res => setPost(res.docs))
        }
        else firestore().collection('Post').doc(user.uid).collection('posts').orderBy('createAt', "desc").onSnapshot(res => setPost(res.docs))

    }, [])
    const showAction = (key) => {
        let options;
        switch (key) {
            case 0:
                options = {
                    option: ['Hủy kết bạn', 'Trở về'],
                    key: 0
                }
                break;
            case 1:
                options = {
                    option: ['Hủy lời mời', 'Trở về'],
                    key: 1
                }
                break;
            case 2:
                options = {
                    option: ['Chấp nhận', 'Từ chối', 'Trở về'],
                    key: 2
                }
                break;
            case 3:
                options = {
                    option: ['kết bạn', 'Trở về'],
                    key: 3
                }
                break;
        }
        setOption(options);
        actionSheet.current.show();
    }
    function HandleFriend(index) {
        switch (options.key) {
            case 0:
                index == 0 ?
                    deleteFriend(route?.params?.friend)
                    :
                    console.log('hide');
                break;
            case 1:
                index == 0 ?
                    cancelFriend(route?.params?.friend)
                    :
                    console.log('hide');
                break;
            case 2:
                index == 0 ?
                    acceptFriend(route?.params?.friend)
                    :
                    index == 1 ?
                        refuseFriend(route?.params?.friend)
                        :
                        console.log('hide');

                break;
            case 3:
                index == 0 ?
                    addFriend(route?.params?.friend)
                    :
                    console.log('hide');
                break;
        }
    }
    function addFriend(friend) {
        myUser.friendRequest.push(friend.uid);
        fbUser.doc(user.uid).update({
            friendRequest: myUser.friendRequest
        })
        friend.friendAwait.push(user.uid)
        fbUser.doc(friend.uid).update({
            friendAwait: friend.friendAwait
        })
    }
    function cancelFriend(friend) {
        const index = myUser.friendRequest.indexOf(friend.uid);
        myUser.friendRequest.splice(index, 1);
        fbUser.doc(user.uid).update({
            friendRequest: myUser.friendRequest
        })
        const index2 = friend.friendAwait.indexOf(user.uid)
        friend.friendAwait.splice(index2, 1);
        fbUser.doc(friend.uid).update({
            friendAwait: friend.friendAwait
        })
    }
    function deleteFriend(friend) {
        const index = myUser.friendRequest.indexOf(friend.uid);
        myUser.listFriends.splice(index, 1);
        fbUser.doc(user.uid).update({
            listFriends: myUser.listFriends
        })
        const index2 = friend.listFriends.indexOf(user.uid)
        friend.listFriends.splice(index2, 1);
        fbUser.doc(friend.uid).update({
            listFriends: friend.listFriends
        })
    }
    function acceptFriend(friend) {
        const index = myUser.friendAwait.indexOf(friend.uid);
        myUser.friendAwait.splice(index, 1);
        fbUser.doc(user.uid).update({
            friendAwait: myUser.friendAwait
        })
        myUser.listFriends.push(friend.uid);
        fbUser.doc(user.uid).update({
            listFriends: myUser.listFriends
        })
        const index2 = friend.friendRequest.indexOf(user.uid)
        friend.friendRequest.splice(index2, 1);
        fbUser.doc(friend.uid).update({
            friendRequest: friend.friendRequest
        })
        friend.listFriends.push(user.uid)
        fbUser.doc(friend.uid).update({
            listFriends: friend.listFriends
        })
    }
    function refuseFriend(friend) {
        const index = myUser.friendAwait.indexOf(friend.uid);
        myUser.friendAwait.splice(index, 1);
        fbUser.doc(user.uid).update({
            friendAwait: myUser.friendAwait
        })
        const index2 = friend.friendRequest.indexOf(user.uid)
        friend.friendRequest.splice(index2, 1);
        fbUser.doc(friend.uid).update({
            friendRequest: friend.friendRequest
        })
    }

    const FormAddFriend = ({ title, iconName, onPress }) => {
        return (

            <TouchableOpacity
                onPress={onPress}
                style={[styles.formAddFriend, styles.fb]}>
                <Text style={{ fontSize: 16, paddingRight: 5 }}>{title}</Text>
                <FontAwesome5 name={iconName} size={20} />
            </TouchableOpacity>
        )
    }
    const FormProfile = ({ iconName, title }) => {
        return (
            <View style={styles.formProfile}>
                <View style={{ width: width * 0.08, alignItems: 'center' }}>
                    <FontAwesome5 name={iconName} size={20} />
                </View>
                <Text>{title}</Text>
            </View>
        )
    }
    const MyFriend = ({ numberFrom, numberTo }) => {
        return (
            route?.params ?
                <View style={styles.flexRB}>
                    {
                        route?.params?.friend.listFriends.slice(numberFrom, numberTo).map(res => {
                            return (
                                <View>
                                    {
                                        allUsers.filter(res => res.uid != user.uid).map((result, index) => {
                                            if (res === result.uid)
                                                return (
                                                    <View style={{ paddingBottom: 10 }}>
                                                        <Image source={{ uri: result.image }}
                                                            style={styles.avtMyfriend}
                                                        />
                                                        <Text>{result.name}</Text>
                                                    </View>
                                                )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                </View>
                :
                <View style={styles.flexRB}>
                    {
                        myUser?.listFriends?.slice(numberFrom, numberTo).map(res => {
                            return (
                                <View>
                                    {
                                        allUsers.map((result, index) => {
                                            if (res === result.uid)
                                                return (
                                                    <View style={{ paddingBottom: 10 }}>
                                                        <Image source={{ uri: result.image }}
                                                            style={styles.avtMyfriend}
                                                        />
                                                        <Text>{result.name}</Text>
                                                    </View>
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
    function navigateFriend() {
        route?.params ?
            navigation.push('SearchFriend', {
                myUser: myUser,
                allUsers: allUsers,
                myFriend: route?.params?.friend
            })
            :
            navigation.push('SearchFriend', {
                myUser: myUser,
                allUsers: allUsers,
            })
    }
    function updateAvt() {

        launchImageLibrary({ quality: 0.5 }, (response) => {
            if (response?.didCancel) {
                console.log('cancel');
            }
            else {
                const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(response.assets[0].uri)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if (progress == 100) alert('Sửa thành công')
                    },
                    (error) => {
                        alert("error uploading image")
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            firestore().collection('users').doc(user.uid).update({
                                image: downloadURL
                            })
                        });
                    }
                );
            }

        })
    }
    function updateBackground() {

        launchImageLibrary({ quality: 0.5 }, (response) => {
            if (response?.didCancel) {
                console.log('cancel');
            }
            else {
                const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(response.assets[0].uri)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if (progress == 100) alert('Sửa thành công')
                    },
                    (error) => {
                        alert("error uploading image")
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            firestore().collection('users').doc(user.uid).update({
                                imageBackground: downloadURL
                            })
                        });
                    }
                );
            }

        })
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
            {
                route?.params ?
                    <View style={styles.header}>

                        <Text style={{ textAlign: 'center', fontSize: 18 }}>
                            {route?.params?.name}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 15, padding: 10 }} >
                            <FontAwesome5 name='arrow-left' size={20} />
                        </TouchableOpacity>
                    </View>
                    :
                    <HeaderHome
                        title='Cá nhân'
                        SourceImg={myUser.image}
                        onPressUser={() => navigation.navigate("account")}
                        number={myUser?.friendAwait?.length}
                        clickFriendAwait={() => navigation.navigate("FriendAwait", { myUser: myUser, allusers: allUsers })}
                    />
            }
            <View style={styles.allPro}>

                {
                    route?.params ?
                        <View style={styles.profileHcamera}>
                            <Image source={{ uri: route?.params?.friend.imageBackground }}
                                style={styles.backgroundImage} />
                            <Image
                                resizeMode={"cover"}
                                source={{ uri: route?.params?.friend.image }}
                                style={[styles.avtImage, { position: 'absolute', top: height * 0.25 / 2 }]} />
                        </View>
                        :
                        <View style={styles.profileHcamera}>
                            <View>
                                <Image source={{ uri: myUser.imageBackground }}
                                    style={styles.backgroundImage} />
                                <TouchableOpacity
                                    onPress={() => updateBackground()}
                                    style={styles.iconCamera}>
                                    <FontAwesome5 name='camera' size={16} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ position: 'absolute', top: height * 0.25 / 2 }}>
                                <View>
                                    <Image
                                        resizeMode={"cover"}
                                        source={{ uri: myUser.image }}
                                        style={styles.avtImage} />
                                    <TouchableOpacity
                                        onPress={() => updateAvt()}
                                        style={styles.iconCamera}>
                                        <FontAwesome5 name='camera' size={16} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                }
                <View>


                    <View style={styles.form2}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>
                            {
                                route?.params ?
                                    route?.params?.friend.name
                                    : myUser?.name
                            }
                        </Text>
                        {
                            route?.params ?
                                <View style={styles.buttonadd}>
                                    {
                                        myUser?.listFriends?.includes(route?.params?.friend.uid) ?
                                            <FormAddFriend title='Bạn bè' iconName='user-plus' onPress={() => showAction(0)} /> :
                                            myUser?.friendRequest?.includes(route?.params?.friend.uid) ?
                                                <FormAddFriend title='Đã gửi lời mời' iconName='user-plus' onPress={() => showAction(1)} /> :
                                                myUser?.friendAwait?.includes(route?.params?.friend.uid) ?
                                                    <FormAddFriend title='Chờ xác nhận' iconName='user-plus' onPress={() => showAction(2)} /> :
                                                    <FormAddFriend title='Kết bạn' iconName='user-plus' onPress={() => showAction(3)} />
                                    }
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('chat', {
                                            name: route?.params?.friend.name, uid: route?.params?.friend.uid, image: route?.params?.image,
                                            status: typeof (route?.params?.friend.status) == "string" ? route?.params?.friend.status : route?.params?.friend.status.toDate().toString()
                                        })}
                                        style={[styles.fb, { width: width * 0.13 }]}>
                                        <FontAwesome5 name='facebook-messenger' size={20} />
                                    </TouchableOpacity>
                                    <View style={[styles.fb, { width: width * 0.13 }]}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 10 }}>...</Text>
                                    </View>
                                </View>
                                :
                                <View style={styles.buttonadd}>
                                    <View style={[styles.formAddFriend, styles.fb, { width: width * 0.75 }]}>
                                        <Text style={{ fontSize: 16, paddingRight: 5 }}> Chỉnh sửa trang cá nhân</Text>
                                        <FontAwesome5 name='pen' size={20} />
                                    </View>
                                    <View style={[styles.fb, { width: width * 0.13 }]}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 10 }}>...</Text>
                                    </View>
                                </View>
                        }
                        <ActionSheet
                            ref={actionSheet}
                            options={options.option}
                            cancelButtonIndex={options.option.length - 1}
                            destructiveButtonIndex={options.option.length - 1}
                            onPress={(index) => HandleFriend(index)}
                        />
                    </View>

                    <View style={styles.profile}>
                        <FormProfile iconName='graduation-cap' title='Đã học tại THPT Lê Xoay' />
                        <FormProfile iconName='map-marker-alt' title='Hà nội' />
                        <FormProfile iconName='home' title='Đến từ Vĩnh phúc' />
                        <FormProfile iconName='heart' title='Độc thân' />
                        <FormProfile iconName='birthday-cake' title='28-11-2000' />
                    </View>
                    <View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Bạn bè</Text>
                            {
                                route?.params ?
                                    <Text>{route?.params?.friend.listFriends.length}
                                        {
                                            myUser?.listFriends?.map(result => {
                                                let sum = 0;
                                                if (route?.params?.friend.listFriends.includes(result)) sum++;
                                                return (
                                                    <View >
                                                        {
                                                            sum != 0 ?
                                                                <Text>{sum} bạn chung</Text>
                                                                : <View></View>
                                                        }
                                                    </View>
                                                )
                                            })
                                        }
                                    </Text>
                                    :
                                    <Text>{myUser?.listFriends?.length}</Text>
                            }
                        </View>
                        <MyFriend numberFrom={0} numberTo={3} />
                        <MyFriend numberFrom={3} numberTo={6} />
                        <TouchableOpacity
                            onPress={() => navigateFriend()}
                            style={styles.allFriend}>
                            <Text style={{ paddingVertical: 10 }}>Xem tất cả bạn bè</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
            {
                !route?.params &&
                <View>
                    <View style={styles.headerpost}></View>
                    <View style={{ padding: 10 }}>

                        <View style={styles.flexRB}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Bài viết</Text>
                            <Text style={{ color: 'skyblue' }}>Bộ lọc</Text>
                        </View>
                        <View style={[styles.flexRcenter, { height: 50, marginVertical: 10, }]}>
                            <Image source={{ uri: myUser.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                            <TouchableOpacity style={{ flex: 1, padding: 10 }} onPress={() => navigation.navigate('NewPost', { myUser: myUser })}>
                                <Text style={{ color: 'grey' }}>Bạn đang nghĩ gì?</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={[styles.flexRcenter, { height: 30, padding: 5 }]}>
                        <View style={[styles.flexRcenter, styles.align3]}>
                            <Image source={require('../assets/camera.png')} style={{ width: 24, height: 24 }} />
                            <Text>Phát trực tiếp</Text>
                        </View>
                        <View style={[styles.flexRcenter, styles.align3, styles.borderpost]}>
                            <Image source={require('../assets/image.png')} style={{ width: 24, height: 24 }} />
                            <Text>Ảnh</Text>
                        </View>
                        <View style={[styles.flexRcenter, styles.align3]}>
                            <Image source={require('../assets/videoCamera.png')} style={{ width: 24, height: 24 }} />
                            <Text>Phòng họp mặt</Text>
                        </View>
                    </View>
                </View>

            }
            <Modal visible={visible} transparent={true} >

                <ImageViewer imageUrls={urlImage} />
                <TouchableOpacity
                    onPress={() => setvisible(false)}
                    style={{
                        position: 'absolute', top: 10, right: 15,
                        backgroundColor: '#00000070', borderRadius: 5
                    }}>
                    <Text style={{ color: '#fff', fontSize: 16, padding: 10 }}>Đóng</Text>
                </TouchableOpacity>
            </Modal>
            <View>
                {
                    <View>
                        {
                            post.map(result => {
                                if (result.data())
                                    return (
                                        <FormPost
                                            sourceImg={result.data().image}
                                            userName={route?.params ? route?.params?.friend.name : myUser.name}
                                            title={result.data().title}
                                            avtImage={route?.params ? route?.params?.friend.image : myUser.image}
                                            openImage={() => { setUrlImage(result.data().image); setvisible(true) }}
                                        />
                                    )
                            })
                        }
                    </View>
                }
            </View>
        </ScrollView >
    )

}
const styles = StyleSheet.create({
    header: {
        marginBottom: 10,
        height: height * 0.07,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,

    },
    formAddFriend: {
        flexDirection: 'row',
        width: width * 0.6,
    },
    fb: {
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    formProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15
    },
    backgroundImage: {
        height: height * 0.25,
        width: width * 0.95,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    avtImage: {
        height: height * 0.25,
        width: height * 0.25,
        borderRadius: height * 0.25 / 2,
        borderWidth: 7, borderColor: 'white',

    },
    profile: {
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginBottom: 20
    },
    profileHcamera:
    {
        alignItems: 'center',
        height: height * 0.25 + height * 0.25 / 2
    },
    allPro: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    form2: {
        height: height * 0.15,
        justifyContent: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#f0f0f0',
        marginBottom: 20
    },
    buttonadd: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 15
    },
    avtMyfriend: {
        height: width * 0.27,
        width: width * 0.27,
        borderRadius: 10
    },
    iconCamera: {
        backgroundColor: '#F0F0F0',
        height: height * 0.05,
        width: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: height * 0.1,
        borderWidth: 1,
        borderColor: '#D7D7D7',
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    allFriend: {
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    headerpost: {
        height: 15,
        backgroundColor: '#B4B4B4'
    },
    flexRcenter:
    {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    flexRB: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    align3:
    {
        width: width / 3,
        alignItems: 'center'
    },
    borderpost:
    {
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderRightColor: 'grey',
        borderLeftColor: 'grey'
    }
})
