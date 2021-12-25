import React, { useState, useEffect } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import { ModalLoading1 } from '../components/Loaing1';

const Item = ({ txtItem, icon, status }) => {
    return (
        <View style={{ paddingBottom: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#e1e1e1' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name={icon} size={30} style={{ paddingRight: 10 }} />
                    <Text style={{ fontSize: 20 }}>{txtItem}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: '#767676' }}>{status}</Text>
                    <FontAwesome5 name='chevron-right' size={24} style={styles.icon} />
                </View>
            </View>
        </View>
    )
}
export default function MyUser({ navigation, user }) {

    const [profile, setProfile] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        firestore().collection('users').doc(user.uid).get().then(docSnap => {
            setProfile(docSnap.data())
        })
    }, [profile])
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




    if (!profile) {
        return <ActivityIndicator size="large" color="#0099ff" />
    }
    return (

        <View style={styles.container}>
            <StatusBar barStyle='light' backgroundColor='black' />
            <View style={styles.alignTxt}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.txtDimiss}>Xong</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.alignAvt}>
                    <Image source={{ uri: profile.image }} style={styles.avt} />
                    <Text style={styles.txtName}>{profile.name}</Text>
                </View>
                <View >
                    <TouchableOpacity
                        onPress={() => pickImageAndUpload()}
                    >
                        <Item icon='adn' txtItem='Sửa ảnh' status='Tắt' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            setLoading(true);
                            await firestore().collection('users')
                                .doc(user.uid)
                                .update({
                                    status: firestore.FieldValue.serverTimestamp(),
                                    fcm: ''
                                }).then(() => {
                                    auth().signOut()
                                })
                        }
                        }
                    >
                        <Item icon='algolia' txtItem='Đăng xuất' />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ModalLoading1 visible={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 10
    },
    avt: {
        height: 110,
        width: 110,
        borderRadius: 55
    },
    alignTxt: {
        alignItems: 'flex-end'
    },
    txtDimiss: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue'
    },
    alignAvt: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30

    },
    txtName: {
        paddingTop: 5,
        fontSize: 25,
        fontWeight: 'bold'
    },
    icon: {
        color: '#e1e1e1',
        paddingLeft: 10
    }
});
