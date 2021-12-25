import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Dimensions, StatusBar } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper';
import {
    GiftedChat, Bubble, InputToolbar, Send, Actions,
    ActionsProps,
} from 'react-native-gifted-chat'
import LinearGradient from 'react-native-linear-gradient';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { IconButton } from 'react-native-paper';
import Utils from '../Utils';
import storage from '@react-native-firebase/storage'
import {
    EventOnAddStream,
    MediaStream,
    RTCPeerConnection,
    RTCSessionDescription,
    RTCIceCandidate,
    RTCView,
} from 'react-native-webrtc';

import Button from '../components/Button';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { deviceHeight, deviceWidth } from './Admin/custom';



//import { Badge } from 'react-native-elements'










const configuration = { iceServers: [{ "url": "stun:stun.l.google.com:19302" }] };
const width = Dimensions.get('window').width;
export default function Chat({ navigation, user, route }) {
    const [messages, setMessages] = useState([]);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [name1, setname1] = useState(null);
    const [name2, setname2] = useState(null);
    const [status, setstatus] = useState(null)
    const [allusers, setAlluser] = useState([])
    const [listId, setlistId] = useState([])
    const [customText, setCustomText] = useState('');
    const { uid } = route.params;
    const { name } = route.params;
    const { image } = route.params;
    const [localStream, setLocalStream] = useState<MediaStream | null>()
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>()
    const [gettingcall, setGettingCall] = useState(false);
    const pc = useRef<RTCPeerConnection>();
    const connecting = useRef(false);
    const [_id, setidrandom] = useState("");


    let docid = ''
    if (uid.length == 28) {
        docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid
    }
    else {
        docid = uid
    }








    useEffect(() => {
        firestore().collection('users').onSnapshot(res => setAlluser(res.docs))
        firestore().collection('chatrooms1').doc(docid).onSnapshot((profile: any) => setlistId(profile?.data()?.userT))
        const messageRef = firestore().collection('chatrooms1')
            .doc(docid)
            .collection('messages')
            .orderBy('createdAt', "desc")

        // viết lệnh cập nhật test ở đây xem


        const unSubscribe = messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSanp => {

                const data = docSanp.data()
                if (data.createdAt) {
                    return {

                        ...docSanp.data(),
                        createdAt: docSanp.data().createdAt.toDate()
                    }
                } else {
                    return {

                        ...docSanp.data(),
                        createdAt: new Date()
                    }
                }

            })
            setMessages(allmsg)

        })




        const cRef = firestore().collection('meet').doc(docid);
        const subscribe = cRef.onSnapshot(snapshot => {
            const data = snapshot.data();
            if (pc.current && !pc.current.remoteDescription && data && data.answer) {
                pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
            }
            if (data && data.offer && !connecting.current) {

                setGettingCall(true);
            }
        });
        const subscribeDelete = cRef.collection('callee').onSnapshot(snapshot => {
            snapshot.docChanges().forEach((change) => {
                if (change.type == 'removed') {
                    hangup();
                }
            });
        });

        return () => {

            subscribe();
            subscribeDelete();
            unSubscribe();


        };

    }, [])
    const setupWebrtc = async () => {

        pc.current = new RTCPeerConnection(configuration);

        //get the audi and video stream for the call
        const stream = await Utils.getStream()


        if (stream) {

            setLocalStream(stream);
            pc.current.addStream(stream);

        }

        // get the remote stream once it is available
        pc.current.onaddstream = (event: EventOnAddStream) => {


            setRemoteStream(event.stream);
        };


    };
    const create = async () => {



        connecting.current = true;
        await setupWebrtc();


        const cRef = firestore().collection("meet").doc(docid);

        collectIceCandidates(cRef, 'caller', 'callee');
        if (pc.current) {
            const offer = await pc.current.createOffer();
            pc.current.setLocalDescription(offer);

            const cWithOffer = {
                offer: {
                    type: offer.type,
                    sdp: offer.sdp,
                },
            };
            cRef.set(cWithOffer);
        }


    }
    const join = async () => {

        connecting.current = true;
        setGettingCall(false);

        const cRef = firestore().collection('meet').doc(docid);
        const offer = (await cRef.get()).data()?.offer;
        if (offer) {
            await setupWebrtc();
            collectIceCandidates(cRef, "callee", "caller");
            if (pc.current) {
                pc.current.setRemoteDescription(new RTCSessionDescription(offer));

                const answer = await pc.current.createAnswer();
                pc.current.setLocalDescription(answer)
                const cWithAnswer = {
                    answer: {
                        type: answer.type,
                        sdp: answer.sdp,
                    },
                };
                cRef.update(cWithAnswer);
            }
        }
    };
    const hangup = async () => {

        setGettingCall(false);
        connecting.current = false;
        streamCleanUp();
        firestoreCleanUp();
        if (pc.current) {
            pc.current.close();
        }
    }
    const streamCleanUp = async () => {

        if (localStream) {
            localStream.getTracks().forEach((t) => t.stop());
            localStream.release();
        }
        setLocalStream(null);
        setRemoteStream(null);
    };
    const firestoreCleanUp = async () => {

        const cRef = firestore().collection('meet').doc(docid);
        if (cRef) {
            const calleeCandidate = await cRef.collection('callee').get();
            calleeCandidate.forEach(async (candidate) => {
                await candidate.ref.delete();
            });
            const callerCandidate = await cRef.collection('caller').get();
            callerCandidate.forEach(async (candidate) => {
                await candidate.ref.delete();
            });
            cRef.delete();
        }
    }

    const collectIceCandidates = async (
        cRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
        localName: string,
        remoteName: String
    ) => {

        const candidateCollection = cRef.collection(localName);

        if (pc.current) {
            //on new ICE candidate add it to firestore
            pc.current.onicecandidate = (event) => {
                if (event.candidate) {
                    candidateCollection.add(event.candidate);
                }
            };
        }
        //get the ICE candidate added to firestore and updtae the local pc
        cRef.collection(remoteName).onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change: any) => {

                pc.current.addIceCandidate(new RTCIceCandidate(change.doc.data()));

            });
        });
    };
    if (gettingcall == true) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                <LinearGradient colors={['white', '#93B3DE', '#5A96E8', '#2172DF', '#004199']} style={{ position: 'absolute', bottom: 0 }} >
                    < View style={{ height: deviceHeight * 0.52, width: deviceWidth }}>
                        <Text></Text>
                    </View>
                </LinearGradient >
                <View style={styles.logo}>
                    <Image
                        source={require('../assets/messenger.png')}
                        style={styles.imagelogo}
                    />
                    <Text style={styles.textLogo}>Meta <Text style={{ fontSize: 17, color: 'grey' }}>connect</Text></Text>
                </View>
                <Image style={styles.image} source={{ uri: image2 }} />
                <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', paddingTop: 10 }}>{name2}</Text>
                <View style={{ position: 'absolute', bottom: 40, alignItems: 'center', flexDirection: 'row' }}>
                    <Button
                        size={24}
                        iconName="phone"
                        backgroundColor="green"
                        onPress={join}
                        style={{ marginRight: 30 }}
                    />
                    <Button
                        size={28}
                        iconName="times"
                        backgroundColor="red"
                        onPress={hangup}
                        style={{ marginLeft: 30 }}
                    />

                </View>


            </View >
        );
    }


    if (localStream) {
        if (localStream && !remoteStream) {
            return (

                <View style={styles.containerv}>
                    <RTCView
                        streamURL={localStream.toURL()}
                        objectFit={'cover'}
                        style={styles.video} />
                    <Button size={24} style={styles.bcontainer} iconName="times" backgroundColor="red" onPress={hangup} />
                </View>
            );
        }
        if (localStream && remoteStream) {
            return (
                <View style={styles.containerv}>
                    <RTCView
                        streamURL={remoteStream.toURL()}
                        objectFit={'cover'}
                        style={styles.video} />
                    <RTCView
                        streamURL={localStream.toURL()}
                        objectFit={'cover'}
                        style={styles.videoLocal} />
                    <Button size={24} style={styles.bcontainer} iconName="times" backgroundColor="red" onPress={hangup} />
                </View>
            );
        }
    }
    firestore().collection('users')
        .doc(user.uid).onSnapshot((res) => {

            const imageu1 = res.data().image
            const nameu1 = res.data().name
            setname1(nameu1)
            setImage1(imageu1)

        })
    if (uid.length == 28) {
        firestore().collection('users')
            .doc(uid).onSnapshot((res) => {
                const status = res.data().status
                const statusu = typeof (status) == "string" ? status : "off : " + new Date(status * 1000).getHours() + "h " + new Date(status * 1000).getMinutes() + "m "
                setstatus(statusu)
                const nameu2 = res.data().name

                const imageu2 = res.data().image
                setname2(nameu2)
                setImage2(imageu2)

            })
    }





    firestore().collection('chatrooms1').doc(docid).collection('messages').orderBy('createdAt', "desc").get().then(res => {
        const idrandom = res.docs.filter(mang => mang.data().sentBy === user.uid).map(res => res.id)
        setidrandom(idrandom[0])
        const data = res.docs.filter(mang => mang.data().sentBy !== user.uid && mang.data().statusv === 'sent').map(res => res.id)
        data.forEach(res => {
            firestore().collection('chatrooms1').doc(docid).collection('messages').doc(res).update({
                statusv: 'seen'
            })
            firestore().collection('chatrooms1').doc(docid).update({
                statusv: 'seen'
            })

        })
    })
    const messe = messages
    const idm = messe.filter(res => res.statusv === 'seen').map(res => res._id)
    async function onSend(messageArray, img) {
        try {

            const msg = messageArray[0]
            let idtg = [user.uid, uid]

            const mymsg = {
                ...msg,
                ...img,
                statusv: 'sent',
                sentBy: user.uid,
                sentTo: uid,
                userT: idtg,
                us1: {
                    id: user.uid,
                    avatar: image1,
                    name: name1
                },
                us2: {
                    id: uid,
                    avatar: image2,
                    name: name2
                },

                createdAt: new Date(),
                user: {
                    _id: user.uid,
                    name: name,
                    avatar: image1


                }

            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))

            let listtoken = [];
            listId?.map(res => {
                allusers?.filter(res => res.data().uid != user.uid).map(result => { // viết đỡ t . id khác id đang đăng nhập//là id ua cái gì// lọc ra mà trong đó k có id user đang đăng nhập
                    if (res === result.data().uid) listtoken.push(result.data().fcm)
                })
            })
            listtoken.length != 0 &&
                fetch('http://dd04-2402-800-6113-cdd7-2dee-fae3-b01c-82f9.ngrok.io/send-noti', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tokens: listtoken,
                        userName: listtoken.length == 1 ? name1 : name1 + ' đã gửi tin đến ' + name,
                        message: mymsg.text
                    })
                })

            firestore().collection('chatrooms1')
                .doc(docid)
                .collection('messages')
                .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
            try {

                firestore().collection('chatrooms1').doc(docid).collection('messages').get().then(res => {
                    if (res.size == 1) {
                        firestore().collection('chatrooms1').doc(docid).set(mymsg)
                    }
                    else {
                        firestore().collection('chatrooms1').doc(docid).update({
                            ...msg,
                            ...img,
                            statusv: 'sent',
                            sentBy: user.uid,
                            sentTo: uid,

                            createdAt: new Date()
                        }
                        )
                    }

                })


            } catch (error) {
                console.log(error);
            }



        } catch (error) {
            console.log(error);
        }


    }
    const pickImagecamera = () => {
        const options = {
            storageOption: {
                part: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };
        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('bạn đã hủy')
            } else if (response.error) {
                console.log('chụp ảnh bị lỗi', response.error)
            } else if (response.customButton) {
                console.log('ban chọn custom button', response.customButton);
            } else {
                const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(response.assets[0].uri)
                uploadTask.on('state_changed',
                    (snapshot) => {

                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if (progress == 100) console.log('loadthanhcong')

                    },
                    (error) => {
                        alert("error uploading image")
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((image) => {
                            const imagec = { _id, image }

                            onSend([], imagec)



                        });
                    }
                );

            }

        });
    }

    function renderActions(props: Readonly<ActionsProps>) {
        return (
            <View style={styles.actions}>
                <Actions
                    {...props}
                    containerStyle={{
                        width: 44,
                        height: 44,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 2,
                        marginRight: 2,
                        marginBottom: 0,
                    }}
                    icon={() => (
                        <FontAwesome5 name='camera' size={24} color="#6646ee" />
                    )}
                    onPressActionButton={pickImagecamera}

                />
                <Actions
                    {...props}
                    containerStyle={{
                        width: 44,
                        height: 44,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 2,
                        marginRight: 2,
                        marginBottom: 2,
                    }}
                    icon={() => (
                        <FontAwesome5 name='image' size={24} color="#6646ee" />
                    )}
                    options={{
                        'Choose From Library': () => {
                            pickImageAndUpload()
                        },
                        Cancel: () => {
                            console.log('Cancel');
                        },
                    }}
                    optionTintColor="#222B45"
                />
            </View>

        )
    }
    const pickImageAndUpload = () => {


        launchImageLibrary({ quality: 0.5 }, (response) => {
            const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(response.assets[0].uri)
            uploadTask.on('state_changed',
                (snapshot) => {

                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == 100) console.log('loadthanhcong')

                },
                (error) => {
                    alert("error uploading image")
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((image) => {
                        const imagec = { _id, image }

                        onSend([], imagec)


                    });
                }
            );
        })



    }




    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: StatusBar.currentHeight }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Image source={{ uri: image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                <Appbar.Content title={route.params.name} subtitle={status} />
                <FontAwesome5 name='phone-alt' size={24} color="#6646ee" style={{ paddingRight: 20 }} />
                <TouchableOpacity>
                    <FontAwesome5 name='video' size={24} color="#6646ee" onPress={create} style={{ paddingRight: 20 }} />
                    {status === 'online' && (<View style={styles.status} ></View>)}

                </TouchableOpacity>

            </Appbar.Header>

            <GiftedChat


                messages={messages}
                onSend={text1 => onSend(text1, '')}
                text={customText}

                onInputTextChanged={text => setCustomText(text)}
                user={{
                    _id: user.uid,
                    name: name,
                    avatar: image1


                }}
                renderTime={(props) => {
                    return (null)
                }}


                alwaysShowSend

                placeholder="message input here..."

                renderBubble={(props) => {




                    return (<View style={{ paddingRight: 15 }}>

                        <View style={{ position: 'absolute', right: -4, bottom: 0 }}>

                            {props.currentMessage.statusv == 'sent' && props.currentMessage.sentBy == user.uid && (
                                <FontAwesome5 name='check-circle' size={16} color="#6646ee" />)

                            }
                            {props.currentMessage.statusv == 'seen' && props.currentMessage._id == idm[0] && props.currentMessage.sentBy == user.uid && (
                                <Image source={{ uri: image }} style={{ width: 16, height: 16, borderRadius: 20 }} />)

                            }



                        </View>
                        <View style={{ position: 'absolute', left: width - 71, bottom: 0 }}>
                            {props.currentMessage.statusv == 'seen' && props.currentMessage._id == idm[0] && props.currentMessage.sentBy != user.uid && (
                                <Image source={{ uri: image }} style={{ width: 16, height: 16, borderRadius: 20 }} />)

                            }

                        </View>

                        <Bubble
                            {...props}
                            wrapperStyle={{
                                right: {
                                    backgroundColor: "#9086FC",

                                },
                            }} />

                    </View>
                    )
                }}
                renderInputToolbar={(props) => {


                    return <InputToolbar {...props}



                        containerStyle={{ borderTopWidth: 1.2, borderTopColor: '#fff', borderRadius: 20, backgroundColor: '#F6F6F6' }}
                        textInputStyle={{ color: "black" }}
                    />


                }}

                renderActions={renderActions}
                renderSend={(props) => {
                    return <Send {...props}>

                        <View style={styles.sendingContainer}>
                            <IconButton icon="send-circle" size={40} color="#6646ee" />
                        </View>


                    </Send>
                }}



            />

        </View >
    )
}
const styles = StyleSheet.create({
    actions: {

        flexDirection: 'row',
    },
    image: {

        width: deviceWidth * 0.4,
        height: deviceWidth * 0.4,
        borderRadius: deviceWidth * 0.4

    },
    containerv: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'red'

    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    video: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    videoLocal: {
        position: 'absolute',
        width: 100,
        height: 150,
        top: 0,
        left: 20,
        elevation: 10,
    },
    bcontainer: {
        marginBottom: 40
    },
    status: {
        height: 15,
        width: 15,
        borderRadius: 9,
        backgroundColor: '#19BC16',
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        right: -1,
        bottom: 5
    },
    imagelogo: {
        height: 80,
        width: 80
    },
    textLogo: {
        fontSize: 32,
        paddingTop: 5
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
        position: 'absolute',
        top: deviceHeight * 0.1
    },
});




