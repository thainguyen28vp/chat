import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, Modal, Dimensions, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { FormPostComment } from '../components/FormPost'
import storage from '@react-native-firebase/storage'
import { ModalLoading } from '../components/Loading';
import { Ic_ScrollModal } from './Admin/iconSVG'
import { deviceWidth, HeaderCustomBot } from './Admin/custom'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import moment from 'moment'
export default function CommentScreen({ route, navigation, user }) {
    const [visibleModal, setvisibleModal] = useState(false)
    const [loadingData, setLoadingdata] = useState(true)
    const [textSearch, setTextSearch] = useState(false)
    const [dataIdPost, setDataIdApost] = useState(-1)
    const [dataApost, setDataApost] = useState({})
    useEffect(async () => {
        setLoadingdata(true);
        let data;
        data = await firestore().collection('Post').doc(route.params.idPost).get();
        await setDataApost(data.data());
        setLoadingdata(false);
        return () => {

        }
    }, [])
    async function submitComment(idPost) {
        if (textSearch == '') return;
        setTextSearch('');
        let ar = dataApost.comments;
        ar.push({ uid: route.params.myUser.uid, image: route.params.myUser.image, name: route.params.myUser.name, comment: textSearch, createAt: new Date() });
        await firestore()
            .collection('Post')
            .doc(idPost)
            .update({
                comments: ar
            })
            .then(() => {
                console.log('updated!');
            });
        const dataAfter = await firestore().collection('Post').doc(idPost).get();
        setDataApost(dataAfter.data());
    }
    async function like() {
        let data = {}
        let ar = []
        data = await firestore().collection('Post').doc(route.params.idPost).get();
        ar = data.data().like;
        if (ar.includes(user.uid)) {
            const index = ar.indexOf(user.uid);
            ar.splice(index, 1);
        }
        else {
            ar = data.data().like;
            ar.push(user.uid);
        }
        await firestore()
            .collection('Post')
            .doc(route.params.idPost)
            .update({
                like: ar
            })
            .then(() => {
                console.log('updated!');
            });
        let datas;
        datas = await firestore().collection('Post').doc(route.params.idPost).get();
        setDataApost(datas.data());
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {!loadingData && <View style={{
                flex: 1, backgroundColor: '#fff', justifyContent: 'space-between',
            }}>
                <View>
                    <HeaderCustomBot title={'Bài viết của ' + dataApost?.name} back={() => navigation.pop()} />
                    <View style={{ borderBottomWidth: 1, paddingTop: 15, borderColor: '#CFE1ED', marginHorizontal: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormPostComment
                            checklike={dataApost?.like?.includes(user.uid)}
                            comment={dataApost?.comments?.length}
                            like={dataApost?.like?.length}
                            sourceImg={dataApost?.image}
                            userName={dataApost?.name}
                            title={dataApost?.title}
                            avtImage={dataApost?.avt}
                            onPressLike={() => like()}
                        />
                    </View>

                </View>
                <ScrollView style={{ paddingHorizontal: 10 }}>
                    {
                        dataApost?.comments?.map(res => {
                            return <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <Image source={{ uri: res.image }} style={{ marginRight: 5, width: 50, height: 50, borderRadius: 25 }} />
                                <View style={{}}>
                                    <View style={{ backgroundColor: '#F3F7F9', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 }}>
                                        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>{res.name}</Text>
                                        <Text style={{ color: '#000', fontSize: 15 }}>{res.comment}</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={{ fontSize: 14 }}>{moment(res.createAt).format('DD/MM/YYYY-h:mm')}</Text>
                                        <Text style={{ marginHorizontal: 10, fontWeight: 'bold', fontSize: 14 }}>thích</Text>
                                        <Text style={{ marginHorizontal: 10, fontWeight: 'bold', fontSize: 14 }}>trả lời</Text>
                                    </View>
                                </View>
                            </View>
                        })
                    }
                </ScrollView>
                <View>
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', paddingHorizontal: 16 }}>
                        <View style={{ marginRight: 8, flexDirection: 'row', width: deviceWidth - 80, alignItems: 'center', marginTop: 20, backgroundColor: '#F3F7F9', marginBottom: 24, height: 36, borderRadius: 10, }}>
                            <TextInput style={{ width: '100%', marginLeft: 8 }} placeholder='bình luận...' onChangeText={setTextSearch} value={textSearch} />
                        </View>
                        <TouchableOpacity
                            onPress={() => submitComment(route.params.idPost)}
                        ><Text style={{ color: 'blue' }}>Gửi</Text></TouchableOpacity>
                    </View>
                </View>

            </View>
            }
            <ModalLoading visible={loadingData} />
        </View>
    )
}

const styles = StyleSheet.create({})
