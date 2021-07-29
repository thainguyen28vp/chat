import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
export default function FormPost({ sourceImg, title, userName, avtImage, openImage }) {
    return (
        <View>
            <View style={styles.header}></View>
            <View style={styles.userProfile}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: avtImage }} style={styles.avt} />
                    <View>
                        <Text style={styles.txtName}>{userName}</Text>
                        <View style={styles.flexrow}>
                            <Text style={styles.txt}>6 giờ</Text>
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
            <View style={styles.formlike}>
                <View style={styles.flexrow}>
                    <FontAwesome5 name='thumbs-up' size={20} color='grey' style={{ paddingRight: 3 }} />
                    <Text style={styles.txt}>Thích</Text>
                </View>
                <View style={styles.flexrow}>
                    <FontAwesome5 name='comment-alt' size={20} color='grey' style={{ paddingRight: 3 }} />
                    <Text style={styles.txt}>Bình luận</Text>
                </View>
                <View style={styles.flexrow}>
                    <FontAwesome5 name='share' size={20} color='grey' style={{ paddingRight: 3 }} />
                    <Text style={styles.txt}>Chia sẻ</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 15,
        backgroundColor: '#B4B4B4'
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
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderBottomColor: 'grey',
        borderTopColor: 'grey',
        alignItems: 'center',
        marginHorizontal: 15
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
