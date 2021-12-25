import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, StatusBar } from 'react-native';
const HeaderHome = ({ SourceImg, title, onPressUser, number, clickFriendAwait, onPressaddgroup }) => {
    return (
        <View style={styles.container}>
            <View style={styles.alignContent}>
                <TouchableOpacity onPress={onPressUser}>
                    <Image
                        source={{ uri: SourceImg }}
                        style={styles.avt}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            {
                title === 'Chat' ?
                    <View style={styles.alignContent}>
                        <View style={styles.icon}>
                            <FontAwesome5 name='camera' size={20} />
                        </View>
                        <TouchableOpacity onPress={onPressaddgroup}>
                            <View style={[styles.icon, { marginLeft: 10 }]}>
                                <FontAwesome5 name='pen' size={20} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity
                        onPress={clickFriendAwait}
                        style={styles.alignContent}
                    >
                        <View
                            style={[styles.icon]}
                        >
                            <FontAwesome5 name='user-friends' size={20} />

                        </View>
                        {
                            number != 0 ?
                                <View style={styles.badge}>
                                    <Text style={{ color: 'white' }}>{number}</Text>
                                </View>
                                :
                                <View></View>
                        }
                    </TouchableOpacity>
            }
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'transparent'
    },
    alignContent: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center'
    },
    icon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avt: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15
    }
    , title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 24
    },
    badge: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#FF0036',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 5,
        right: 0
    }
});
export default HeaderHome