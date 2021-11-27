import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, ScrollView } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import ButtonCustom from '../../components/ButtonCustom'
import { HeaderCustomBot } from './custom'

export default function DetailPost({ navigation }) {
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
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderCustomBot title='Bài đăng của Thái nguyễn' back={() => navigation.pop()} />

            <View style={{ flex: 1, justifyContent: 'space-between', }}>
                <View style={{ flex: 1, paddingHorizontal: 16 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginVertical: 16 }}>Người đăng : Thái nguyễn</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>

                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>Thời gian tạo : </Text>
                        <Text style={{ fontSize: 16, color: '#000', }}>27/11/2021 11:10 AM</Text>
                    </View>
                    <Text style={{ paddingVertical: 10, fontSize: 16, color: '#000', fontWeight: 'bold' }}>Nội dung :</Text>
                    <Text style={{ fontSize: 14, color: '#52575C', }}>
                        Ngày xửa ngày xưa, có hai chị em cùng cha khác mẹ, chị tên là Tấm, em tên là Cám. Mẹ Tấm mất sớm, sau đó mấy năm cha Tấm cũng qua đời, Tấm ở với dì ghẻ là mẹ Cám. Bà mẹ kế này rất cay nghiệt, bắt Tấm phải làm hết mọi việc nặng nhọc từ việc nhà đến việc chăn trâu cắt cỏ. Trong khi đó Cám được nuông chiều không phải làm gì cả.
                    </Text>
                    <Text style={{ paddingVertical: 15, fontSize: 16, color: '#000', fontWeight: 'bold' }}>Hình ảnh :</Text>

                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => { setUrlImage(sourceImg); setvisible(true) }}
                    >

                        {
                            sourceImg.length != 0 && <View>
                                {
                                    sourceImg.length === 1 ?
                                        <View style={{ flexDirection: 'row' }}>

                                            <Image source={{ uri: sourceImg[0].url }} style={styles.imagePost} resizeMode='cover' />
                                        </View>
                                        :
                                        sourceImg.length == 2 ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={{ uri: sourceImg[0].url }} style={styles.imagePost} resizeMode='cover' />
                                                <Image source={{ uri: sourceImg[1].url }} style={styles.imagePost} resizeMode='cover' />
                                            </View>
                                            :
                                            <View >
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={{ uri: sourceImg[0].url }} style={styles.imagePost} resizeMode='cover' />
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
                <View style={{ justifyContent: 'space-between', paddingHorizontal: 16, flexDirection: 'row', paddingVertical: 20 }}>
                    <View style={{ width: '40%' }}>
                        <ButtonCustom textButton='TỪ CHỐI' opacity={1} disabled={false} color={['#ccc', '#8EA0AB']} />
                    </View>
                    <View style={{ width: '40%' }}>
                        <ButtonCustom textButton='PHÊ DUYỆT' opacity={1} disabled={false} />
                    </View>
                </View>
            </View>

        </ScrollView >
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

