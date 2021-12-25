import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { deviceHeight, deviceWidth } from '../screens/Admin/custom'
export const FormPost = ({ sourceImg, title, userName, avtImage, openImage, onPressLike, like, comment, checklike, commentLength, createAt, description }) => {
    return (
        <View>
            <View style={styles.header}></View>
            <View style={styles.userProfile}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: avtImage }} style={styles.avt} />
                    <View>
                        <Text style={styles.txtName}>{userName}<Text style={{ color: '#A0A4A8', fontSize: 16, fontWeight: 'normal' }}>{description}</Text></Text>
                        <View style={styles.flexrow}>
                            <Text style={styles.txt}>{(createAt % 1 == 0 && new Date().getTime() - createAt < 60000) ? 'vừa xong' : (createAt % 1 == 0 && 3600000 > new Date().getTime() - createAt && new Date().getTime() - createAt > 60000) ? ((new Date().getTime() - createAt) / 60000).toFixed(0) + ' phút' : (createAt % 1 == 0 && 86400000 > new Date().getTime() - createAt && new Date().getTime() - createAt > 3600000) ? ((new Date().getTime() - createAt) / 3600000).toFixed(0) + ' giờ' : moment(createAt).format('DD/MM-H:mm')}</Text>
                            <Text style={{ marginHorizontal: 5 }}>.</Text>
                            <FontAwesome5 name='globe-asia' size={16} color='grey' />
                        </View>
                    </View>

                </View>
                <FontAwesome5 name='ellipsis-h' size={20} color='grey' />
            </View>
            <View>
                {
                    title != null && <Text style={{ fontSize: 16, padding: 15 }}>{title}</Text>
                }
                <TouchableOpacity onPress={openImage} activeOpacity={0.8}>

                    {
                        sourceImg.length != 0 && <View>
                            {
                                sourceImg.length == 1 ?
                                    <Image source={{ uri: sourceImg[0].url }} style={styles.imagePost} resizeMode='cover' />
                                    :
                                    sourceImg.length == 2 ?
                                        <View>
                                            <Image source={{ uri: sourceImg[0].url }} style={styles.imagePost} resizeMode='cover' />
                                            <Image source={{ uri: sourceImg[1].url }} style={styles.imagePost} resizeMode='cover' />
                                        </View>
                                        :
                                        <View>
                                            <Image source={{ uri: sourceImg[0].url }} style={styles.imagePost} resizeMode='cover' />
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={{ uri: sourceImg[1].url }} style={styles.imagePost} resizeMode='cover' />
                                                <View style={[styles.imagePost, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Image source={{ uri: sourceImg[2].url }} style={[styles.imagePost, { backgroundColor: '#000000', opacity: 0.6 }]} resizeMode='cover' />
                                                    {
                                                        sourceImg.length != 3 && <Text style={{ position: 'absolute', fontSize: 32, color: '#fff' }}>+{sourceImg.length - 3}</Text>

                                                    }
                                                </View>
                                            </View>
                                        </View>
                            }
                        </View>
                    }
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 10, marginVertical: 5 }}>
                <Text style={{ color: '#A0A4A8' }}>{like != 0 && `${like} lượt thích`}</Text>
                {commentLength != 0 && <Text style={{ color: '#A0A4A8' }}>{commentLength} bình luận</Text>}
            </View>
            <View style={styles.formlike}>
                <TouchableOpacity style={styles.flexrow} onPress={onPressLike}>
                    <FontAwesome5 name='thumbs-up' size={20} color={checklike ? 'blue' : 'grey'} style={{ paddingRight: 3 }} />
                    <Text style={[styles.txt, checklike && { color: 'blue' }]}>Thích</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={comment}
                    style={styles.flexrow}>
                    <FontAwesome5 name='comment-alt' size={20} color='grey' style={{ paddingRight: 3 }} />
                    <Text style={styles.txt}>Bình luận</Text>
                </TouchableOpacity>
                <View style={styles.flexrow}>
                    <FontAwesome5 name='share' size={20} color='grey' style={{ paddingRight: 3 }} />
                    <Text style={styles.txt}>Chia sẻ</Text>
                </View>
            </View>
        </View>
    )
}
export const FormPostComment = ({ sourceImg, title, userName, avtImage, openImage, onPressLike, like, comment, checklike, createAt }) => {
    return (
        <View >
            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: deviceWidth - 20 }}>

                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: avtImage }} style={styles.avt} />
                        <View>
                            <Text style={styles.txtName}>{userName}</Text>
                            <View style={styles.flexrow}>
                                <Text style={styles.txt}>{(createAt % 1 == 0 && new Date().getTime() - createAt < 60000) ? 'vừa xong' : (createAt % 1 == 0 && 3600000 > new Date().getTime() - createAt && new Date().getTime() - createAt > 60000) ? ((new Date().getTime() - createAt) / 60000).toFixed(0) + ' phút' : (createAt % 1 == 0 && 86400000 > new Date().getTime() - createAt && new Date().getTime() - createAt > 3600000) ? ((new Date().getTime() - createAt) / 3600000).toFixed(0) + ' giờ' : moment(createAt).format('DD/MM-H:mm')}</Text>
                                <Text style={{ marginHorizontal: 5 }}>.</Text>
                                <FontAwesome5 name='globe-asia' size={16} color='grey' />
                            </View>
                        </View>
                    </View>
                    {
                        title != null && <Text style={{ fontSize: 16, padding: 15 }}>{title}</Text>
                    }
                </View>
                <View>

                    <TouchableOpacity onPress={openImage} activeOpacity={0.8}>

                        {
                            sourceImg.length != 0 && <View>
                                {
                                    sourceImg.length == 1 ?
                                        <Image source={{ uri: sourceImg[0].url }} style={{ width: deviceWidth / 3, height: deviceHeight * 0.13 }} />
                                        :
                                        sourceImg.length == 2 ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image source={{ uri: sourceImg[0].url }} style={{ width: deviceWidth / 6, height: deviceHeight * 0.13 }} />
                                                <Image source={{ uri: sourceImg[1].url }} style={{ width: deviceWidth / 6, height: deviceHeight * 0.13 }} />
                                            </View>
                                            :
                                            <View>
                                                <Image source={{ uri: sourceImg[0].url }} style={{ width: deviceWidth / 3, height: deviceHeight * 0.065 }} />
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={{ uri: sourceImg[1].url }} style={{ width: deviceWidth / 6, height: deviceHeight * 0.065 }} />
                                                    <Image source={{ uri: sourceImg[2].url }} style={[{ width: deviceWidth / 6, height: deviceHeight * 0.065 }]} />
                                                </View>
                                            </View>
                                }
                            </View>
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.flexrow} onPress={onPressLike}>
                        <FontAwesome5 name='thumbs-up' size={20} color={checklike ? 'blue' : 'grey'} style={{ paddingRight: 3 }} />
                        <Text style={[styles.txt, checklike && { color: 'blue' }]}>Thích</Text>
                    </TouchableOpacity>
                    {like != 0 && <Text style={{ color: '#A0A4A8' }}> . {like} lượt thích</Text>}
                </View>
                {comment != 0 && <Text style={{ color: '#A0A4A8' }}>{comment} bình luận</Text>}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        height: 15,
        backgroundColor: '#EAEAEA'
    },
    userProfile: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    avt: {
        marginRight: 10,
        height: 50,
        width: 50,
        borderRadius: 25
    },
    txtName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    flexrow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    formlike: {
        flexDirection: 'row',
        flex: 1, justifyContent: 'space-around',
        height: 40,

        borderTopWidth: 0.5,

        borderTopColor: '#CFE1ED',
        alignItems: 'center',

    },
    txt: {
        color: 'grey'
    },
    imagePost: {
        flex: 1,
        height: undefined,
        aspectRatio: 1.5,
        width: undefined
    }
})
