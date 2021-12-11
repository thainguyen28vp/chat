import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, ScrollView } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import ButtonCustom from '../../components/ButtonCustom'
import { HeaderCustomBot } from './custom'
import firestore from '@react-native-firebase/firestore'

export default function DetailPost({ navigation, route }) {
    const [visible, setvisible] = useState(false)
    const [urlImage, setUrlImage] = useState([])
    const sourceImg = [{
        url: 'https://i.pinimg.com/736x/76/13/43/7613439f9864c0a5ae9ac965ca527e91.jpg'
    }, {
        url: 'https://i.pinimg.com/736x/76/13/43/7613439f9864c0a5ae9ac965ca527e91.jpg'
    }, {
        url: 'https://i.pinimg.com/736x/76/13/43/7613439f9864c0a5ae9ac965ca527e91.jpg'
    }, {
        url: 'https://i.pinimg.com/736x/76/13/43/7613439f9864c0a5ae9ac965ca527e91.jpg'
    }]
    function update(index) {

        firestore().collection('Post').doc(route.params.data.uid).collection('posts').doc(route.params.id).update({
            status: index
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' }}>


            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#fff' }}>
                <HeaderCustomBot title={'Bài đăng của ' + route.params.data.name} back={() => navigation.pop()} />

                <View style={{ flex: 1, justifyContent: 'space-between', }}>
                    <View style={{ flex: 1, paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginVertical: 16 }}>Người đăng : {route.params.data.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Thời gian tạo : </Text>
                            <Text style={{ fontSize: 16, color: '#000', }}>27/11/2021 11:10 AM</Text>
                        </View>
                        <Text style={{ paddingVertical: 10, fontSize: 16, color: '#000', fontWeight: 'bold' }}>Nội dung :</Text>
                        <Text style={{ fontSize: 14, color: '#52575C', }}>
                            {route.params.data.title}
                        </Text>
                        <Text style={{ paddingVertical: 15, fontSize: 16, color: '#000', fontWeight: 'bold' }}>Hình ảnh :</Text>

                        {
                            route.params.data.image.length != 0 ?
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => { setUrlImage(sourceImg); setvisible(true) }}
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
                                                                <Image source={{ uri: route.params.data.image[0].url }} style={styles.imagePost} resizeMode='cover' />
                                                            </View>

                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Image source={{ uri: sourceImg[1].url }} style={styles.imagePost} resizeMode='cover' />
                                                                <View style={[styles.imagePost, { alignItems: 'center', justifyContent: 'center' }]}>
                                                                    <Image source={{ uri: sourceImg[2].url }} style={[styles.imagePost, sourceImg.length > 3 && { backgroundColor: '#000', opacity: 0.6 }]} resizeMode='cover' />
                                                                    {
                                                                        sourceImg.length > 3 && <Text style={{ position: 'absolute', fontSize: 32, color: '#fff' }}>+{sourceImg.length - 3}</Text>

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
            <View style={{ justifyContent: 'space-between', paddingHorizontal: 16, flexDirection: 'row', paddingVertical: 20 }}>
                <View style={{ width: '40%' }}>
                    <ButtonCustom textButton='TỪ CHỐI' opacity={1} disabled={false} color={['#ccc', '#8EA0AB']} onPress={() => update(1)} />
                </View>
                <View style={{ width: '40%' }}>
                    <ButtonCustom textButton='PHÊ DUYỆT' opacity={1} disabled={false} onPress={() => update(2)} />
                </View>
            </View>
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

