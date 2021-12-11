
import React from 'react';
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { deviceHeight, deviceWidth } from './Admin/custom';
import Modal from 'react-native-modal';
import { Ic_ScrollModal, Ic_search } from './Admin/iconSVG';
import { FormPostComment } from '../components/FormPost';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
export const ModalComment = ({ visible, onPressClose, comment, like, sourceImg, userName, title, avtImage, onPressGui, onChangeText, valueText, dataComments }) => {
    return <Modal
        isVisible={visible}
        transparent={true}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        onBackButtonPress={onPressClose}
        onBackdropPress={onPressClose}
        onSwipeComplete={onPressClose}
        swipeDirection="right"
        backdropTransitionOutTiming={0}
        style={{ justifyContent: 'flex-end', margin: 0 }}>
        <View style={{
            flex: 1, backgroundColor: '#fff', justifyContent: 'space-between', borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: '5%'
        }}>
            <View>
                <View style={{ paddingBottom: 24, paddingTop: 11, alignItems: 'center' }}>
                    <Ic_ScrollModal />
                </View>
                <View style={{ borderBottomWidth: 1, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormPostComment
                        comment={comment}
                        like={like}
                        sourceImg={sourceImg}
                        userName={userName}
                        title={title}
                        avtImage={avtImage}
                    />
                </View>

            </View>
            <ScrollView style={{ paddingHorizontal: 10 }}>
                {
                    dataComments.map(res => {
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
                        <TextInput style={{ width: '100%', marginLeft: 8 }} placeholder='bình luận...' onChangeText={onChangeText} value={valueText} />
                    </View>
                    <TouchableOpacity
                        onPress={onPressGui}
                    ><Text style={{ color: 'blue' }}>Gửi</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>

}
