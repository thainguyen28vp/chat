
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Button from './Button';


interface Props {
    hangup: () => void;
    join: () => void;
}
export default function GettingCall(props: Props) {
    return (
        <View style={{ flex: 1 }}>
            <Image style={styles.image} source={require('../img/pic3.jpg')} />
            <View style={styles.bcontainer}>
                <Button
                    iconName="phone"
                    backgroundColor="green"
                    onPress={props.join}
                    style={{ marginRight: 30 }}
                />
                <Button
                    iconName="phone"
                    backgroundColor="red"
                    onPress={props.hangup}
                    style={{ marginLeft: 30 }}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    bcontainer: {
        flexDirection: 'row',
        bottom: 30,
    }
})
