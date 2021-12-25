import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
export default function Formchat({ SourecImg, NameUser, Text1, SentT, Time, Status, Day, Uid, SentB }) {

    let serverTimed = new Date().getDate()
    let serverTimem = new Date().getMonth()
    const timenow = serverTimed + ' thg ' + serverTimem

    return (
        <View style={{ paddingLeft: 10, paddingRight: 15, }}>
            <View style={styles.container}>


                <View style={styles.image}>

                    <Image
                        source={{ uri: SourecImg }}
                        style={{ borderRadius: 30, height: 60, width: 60 }}
                    />

                </View>
                <View style={styles.text}>
                    <Text style={Status === 'sent' && SentT !== Uid ? { fontWeight: 'bold', fontSize: 18 } : { fontSize: 18 }}>
                        {NameUser}
                    </Text>
                    {Day == timenow && (<Text style={Status === 'sent' && SentT !== Uid ? [styles.tn, { fontWeight: 'bold' }] : styles.tn}>
                        {SentT === Uid && ('Bạn : ')}{Text1} - {Time}

                    </Text>)

                    }
                    {Day != timenow && (<Text style={styles.tn}>
                        {SentT === Uid && ('Bạn : ')}{Text1} - {Day}
                    </Text>)

                    }
                </View>
                {Status === 'sent' && SentT !== Uid ? <View style={[styles.status, styles.positon]} ></View>//nó gửi và m chưa xem 
                    :
                    Status === 'seen' && SentB !== Uid ? <Image source={{ uri: SourecImg }} style={[styles.iconavt, styles.positon]} />// m gửi và nó đã xem
                        :
                        Status === 'sent' && SentB !== Uid ? <FontAwesome5 name='check-circle' size={16} color="#6646ee" style={styles.positon} />// đấy cái này là m gửi nhưng nó chưa xem
                            : <View></View>
                }
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        flexDirection: 'row',


    },

    image: {
        paddingRight: 10
    },
    text: {
        height: 70,
        justifyContent: 'center',
    },
    tn: {
        paddingTop: 5
    },
    imageSmall: {
        position: 'absolute',
        alignItems: 'flex-end',
        top: 30,
        right: 0
    },
    status: {
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: '#8469FF',
        borderWidth: 2,
        borderColor: 'white',
    },
    positon: {
        position: 'absolute',
        right: 8,
        bottom: 43
    },
    iconavt: {
        height: 16,
        width: 18,
        borderRadius: 8,
    }
});
