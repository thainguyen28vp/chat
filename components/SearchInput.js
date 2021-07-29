import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

const SearchInput = ({ placeholder, value, onChange }) => {

    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                style={styles.input}
                autoFocus={true}
            />
            <FontAwesome5 name='search' size={22} style={styles.icon} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    icon: {
        position: 'absolute',
        top: 8,
        left: 10,
        color: '#949494'
    }
    , input: {
        height: 40,
        width: width * 0.85,
        borderRadius: 10,
        paddingLeft: 50,
        backgroundColor: '#F0F0F0',
        color: '#242424',
        fontSize: 16
    }
});
export default SearchInput