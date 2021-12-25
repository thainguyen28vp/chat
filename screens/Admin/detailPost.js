import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, ScrollView, StatusBar } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import ButtonCustom from '../../components/ButtonCustom'
import { HeaderCustomBot } from './custom'
import firestore from '@react-native-firebase/firestore'
import SimpleToast from 'react-native-simple-toast'
import moment from 'moment'

export default function DetailPost({ navigation, route }) {
    const [visible, setvisible] = useState(false)
    const [urlImage, setUrlImage] = useState([])

    function update(index) {
        firestore().collection('Post').doc(route.params.id).update({
            status: index
        })
        if (index == 2) { SimpleToast.show('phê duyệt thành công', SimpleToast.LONG) }
        else {
            SimpleToast.show('bản tin đã bị huỷ', SimpleToast.LONG)
        }
        const radom = Math.floor(Math.random() * 10000)

        if (route.params.check == 0)
            navigation.navigate('pending', { reload: radom })

        else if (route.params.check == 1) {
            navigation.navigate('canceled', { reload: radom })
        }
        else {
            navigation.navigate('approved', { reload: radom })
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' }}>
            <StatusBar barStyle='dark-content' />

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#fff' }}>

                <HeaderCustomBot title={'Bài đăng của ' + route.params.data.name} back={() => navigation.pop()} />
                <View style={{ flex: 1, justifyContent: 'space-between', }}>
                    <View style={{ flex: 1, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginVertical: 16 }}>Người đăng : {route.params.data.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Thời gian tạo : </Text>
                            <Text style={{ fontSize: 16, color: '#000', }}>{moment(route.params.data.createAt).format('DD/MM/YYYY H:mm')}</Text>
                        </View>
                        <Text style={{ paddingVertical: 10, fontSize: 16, color: '#000', fontWeight: 'bold' }}>Nội dung :</Text>
                        <Text style={{ fontSize: 14, color: '#52575C', }}>
                            {route.params.data.title}
                        </Text>
                        <Text style={{ paddingVertical: 15, fontSize: 16, color: '#000', fontWeight: 'bold' }}>Hình ảnh :</Text>

                        {
                            route.params.data.image.length != 0 ?
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => { setUrlImage(route.params.data.image); setvisible(true) }}
                                >
                                    {
                                        route.params.data.image.length != 0 && <View>
                                            {
                                                route.params.data.image.length === 1 ?
                                                    <View style={{ flexDirection: 'row' }}>

                                                        <Image source={{ uri: route.params.data.image[0].url }} style={styles.imagePost} resizeMode='cover' />
                                                    </View>
                                                    :
                                                    route.params.data.image.length == 2 ?
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Image source={{ uri: route.params.data.image[0].url }} style={styles.imagePost} resizeMode='cover' />
                                                            <Image source={{ uri: route.params.data.image[1].url }} style={styles.imagePost} resizeMode='cover' />
                                                        </View>
                                                        :
                                                        <View >
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Image source={{ uri: route.params.data.image[1].url }} style={styles.imagePost} resizeMode='cover' />
                                                            </View>

                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Image source={{ uri: route.params.data.image[1].url }} style={styles.imagePost} resizeMode='cover' />
                                                                <View style={[styles.imagePost, { alignItems: 'center', justifyContent: 'center' }]}>
                                                                    <Image source={{ uri: route.params.data.image[2].url }} style={[styles.imagePost, route.params.data.image.length > 3 && { backgroundColor: '#000', opacity: 0.6 }]} resizeMode='cover' />
                                                                    {
                                                                        route.params.data.image.length > 3 && <Text style={{ position: 'absolute', fontSize: 32, color: '#fff' }}>+{route.params.data.image.length - 3}</Text>
                                                                    }
                                                                </View>
                                                            </View>
                                                        </View>
                                            }
                                        </View>
                                    }
                                </TouchableOpacity>
                                :
                                <Text>Không có hình ảnh</Text>
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
                    </View>

                </View>

            </ScrollView >
            {route.params.data.status == 0 ?
                <View style={{ justifyContent: 'space-between', paddingHorizontal: 16, flexDirection: 'row', paddingVertical: 20 }}>
                    <View style={{ width: '47%' }}>
                        <ButtonCustom textButton='TỪ CHỐI' opacity={1} disabled={false} color={['#ccc', '#8EA0AB']} onPress={() => update(1)} />
                    </View>
                    <View style={{ width: '47%' }}>
                        <ButtonCustom textButton='PHÊ DUYỆT' opacity={1} disabled={false} onPress={() => update(2)} />
                    </View>
                </View>
                :
                route.params.data.status == 1 ?
                    <View style={{ paddingHorizontal: 16, alignItems: 'center', paddingVertical: 20 }}>
                        <View style={{ width: '47%' }}>
                            <ButtonCustom textButton='PHÊ DUYỆT' opacity={1} disabled={false} onPress={() => update(2)} />
                        </View>
                    </View>
                    :
                    <View style={{ paddingHorizontal: 16, alignItems: 'center', paddingVertical: 20 }}>
                        <View style={{ width: '47%' }}>
                            <ButtonCustom textButton='TỪ CHỐI' opacity={1} disabled={false} color={['#ccc', '#8EA0AB']} onPress={() => update(1)} />
                        </View>

                    </View>

            }
        </View>
    )
}


const styles = StyleSheet.create({
    imagePost: {
        flex: 1,
        height: undefined,
        aspectRatio: 1.5,
        width: undefined
    }
})

