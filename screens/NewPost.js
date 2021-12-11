import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Image, TextInput, Text, View, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { Alert } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function NewPost({ navigation, user, route }) {
    const { myUser } = route.params
    const [datas, setDatas] = useState(null)
    const [textInput, setTextInput] = useState('')
    useEffect(() => {
        firestore().collection('Post').doc(user.uid).onSnapshot(res => {
            setDatas(res.data());
        })
    }, [])
    const pickImageAndUpload = () => {
        launchImageLibrary({ quality: 0.5 }, (response) => {
            if (response?.didCancel) {
                console.log('cancel');
            }
            else {
                const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(response.assets[0].uri)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if (progress == 100) console.log(); ('Upload thành công')
                    },
                    (error) => {
                        alert("error uploading image")
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            let listImg = datas?.image;
                            listImg.push({ 'url': downloadURL })
                            console.log(user.uid,);
                            firestore().collection('Post').doc(user.uid).update({
                                image: listImg,
                            })
                        });
                    }
                );
            }
        })
    }
    function goback() {
        Alert.alert(
            "Cảnh báo",
            "Bạn muốn hủy bỏ bài viết?",
            [
                {
                    text: "Ok",
                    onPress: () => {
                        firestore().collection('Post').doc(user.uid).update({ image: [] });
                        navigation.goBack();
                    },
                    style: "cancel"
                },
                { text: "Tiếp tục sửa", onPress: () => console.log("OK Pressed") }
            ]
        );
    }
    async function newPost() {
        await firestore().collection('Post').doc(user.uid).collection('posts').add({
            title: textInput.trim() ? textInput : null,
            image: datas?.image ? datas?.image : [],
            createAt: new Date(),
            like: [],
            avt: myUser.image,
            email: user.email,
            name: myUser.name,
            status: 0,
            uid: user.uid,
            comments: []
        });
        firestore().collection('Post').doc(user.uid).update({ image: [] })
        navigation.pop();
        // firestore().collection('Post').doc(user.uid).update({ image: [] })
        // if (datas?.image) Image.getSize(datas?.image, (width, height) => {
        //     console.log(width, height);
        // })
        //
    }
    function deleteImage(index) {
        let list = datas?.image
        list.splice(index, 1);
        firestore().collection('Post').doc(user.uid).update({ image: list });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => goback()} style={{ padding: 5 }}>
                            <FontAwesome5 name='arrow-left' size={24} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, paddingLeft: 10 }}>Tạo bài viết</Text>
                    </View>
                    <TouchableOpacity
                        disabled={(textInput != '' || datas?.image?.length != 0) ? false : true}
                        onPress={() => newPost()}
                        style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.txtPost, (textInput != '' || datas?.image?.length != 0) && styles.txtActivePost]}>Đăng</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <View style={styles.formProfile}>
                        <Image source={{ uri: myUser.image }} style={styles.avt} />
                        <View style={{ height: 60, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{myUser.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.global}>
                                    <View style={styles.status}>
                                        <FontAwesome5 name='globe-asia' size={13} color='grey' />
                                        <Text style={styles.txtStatus}>Công khai</Text>
                                        <FontAwesome5 name='chevron-down' size={13} color='grey' />
                                    </View>

                                </View>
                                <View style={styles.global}>
                                    <View style={styles.status}>
                                        <FontAwesome5 name='plus' size={13} color='grey' />
                                        <Text style={styles.txtStatus}>Abum</Text>
                                        <FontAwesome5 name='chevron-down' size={13} color='grey' />
                                    </View>

                                </View>

                            </View>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Bạn đang nghĩ gì?"
                            placeholderTextColor="grey"
                            numberOfLines={3}
                            multiline={true}
                            value={textInput}
                            onChangeText={setTextInput}
                            style={styles.txtInput}
                        />
                        {
                            datas?.image?.length != 0 &&
                            <View>
                                {
                                    datas?.image?.map((res, index) => {
                                        return (
                                            <View style={{ paddingVertical: 5 }}>
                                                <Image source={{ uri: res.url }} style={styles.img} resizeMode='cover' />
                                                <TouchableOpacity
                                                    onPress={() => deleteImage(index)}
                                                    style={styles.deleteImg}>

                                                    <FontAwesome5 name='times' size={24} color='white' />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        }

                    </View>
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingTop: 5, borderTopWidth: 1, borderTopColor: '#F0F0F0' }}>
                <TouchableOpacity onPress={() => pickImageAndUpload()}>
                    <Image source={require('../assets/image.png')} style={{ height: 32, width: 32 }} />
                </TouchableOpacity>
                <Image source={require('../assets/tag.png')} style={{ height: 32, width: 32 }} />
                <Image source={require('../assets/face.png')} style={{ height: 32, width: 32 }} />
                <Image source={require('../assets/location.png')} style={{ height: 32, width: 32 }} />
                <Image source={require('../assets/setting.png')} style={{ height: 32, width: 32 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: height * 0.07,
        paddingLeft: 15,
        paddingRight: 15
    },
    formProfile: {
        flexDirection: 'row',
        paddingLeft: 15
    },
    global: {
        borderRadius: 3,
        borderWidth: 0.5,
        marginRight: 5,
        borderColor: 'grey'
    },
    status: {
        padding: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtStatus: {
        fontSize: 13,
        marginHorizontal: 3
    },
    avt: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginRight: 10
    },
    txtInput: {
        textAlignVertical: 'top',
        fontSize: 24,
        paddingLeft: 10
    },
    deleteImg: {
        position: 'absolute',
        right: 10,
        top: 30,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#00000070',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        flex: 1,
        height: null,
        aspectRatio: 1.5,
        width: null,
    },
    txtPost: {
        color: '#BABABA',
        fontSize: 18
    },
    txtActivePost: {
        color: 'red'
    }
})
