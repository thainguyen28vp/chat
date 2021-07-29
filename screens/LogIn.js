import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth'
import * as Yup from 'yup';
import InputCustom from '../components/InputCustom';
import ButtonCustom from '../components/ButtonCustom';
import Toast from 'react-native-simple-toast';
const LoginSchema = Yup.object().shape({
    password: Yup.string().required(''),
    email: Yup.string().required(''),
});
export default function Login({ navigation }) {
    const [loading, setLoading] = useState(false)
    if (loading) {
        return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ActivityIndicator size="large" color='skyblue' />
            <Text>Đăng đăng nhập</Text>
        </View>
    }
    async function SignIn(values) {
        setLoading(true)
        try {
            const result = await auth().signInWithEmailAndPassword(values.email, values.password)
            setLoading(false)
        } catch (err) {
            setLoading(false);
            Toast.show('Tài khoản hoặc mật khẩu không chính xác.', Toast.LONG);
        }

        // xử lý trong đây
    }
    function isFormVaild(isValid, touched) {
        return isValid && Object.keys(touched).length !== 0
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View>

                        <View style={styles.logo}>
                            <Image
                                source={require('../assets/messenger.png')}
                                style={styles.imagelogo}
                            />
                            <Text style={styles.textLogo}>messenger</Text>
                        </View>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={SignIn}
                            validationSchema={LoginSchema}
                        >

                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                                <View>
                                    <View>
                                        <InputCustom title='Tài khoản'
                                            iconName='user-alt'
                                            placeholder="Nhập email..."
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email ? (
                                            <Text style={styles.textError}>{errors.email}</Text>
                                        ) : null}
                                    </View>
                                    <View>
                                        <InputCustom title='Mật khẩu'
                                            iconName='lock'
                                            placeholder="*******"
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                        />
                                        {errors.password && touched.password ? (
                                            <Text style={styles.textError}>{errors.password}</Text>
                                        ) : null}
                                    </View>
                                    <View>
                                        <TouchableOpacity>
                                            <Text style={styles.forgotPass}>Quên mật khẩu?</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <ButtonCustom
                                        opacity={isFormVaild(isValid, touched) ? 1 : 0.5}
                                        disabled={!isFormVaild(isValid, touched)}
                                        onPress={() => handleSubmit()}
                                        //onPress={() => navigation.navigate('TabNavigation')}
                                        textButton='Đăng nhập'
                                    />

                                </View>
                            )}
                        </Formik>
                        <View style={{ alignItems: 'center' }}>
                            <Text>Bạn chưa có tài khoản?
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('signIn')}
                                >
                                    <Text style={{ fontWeight: 'bold', color: '#005CFF' }}> Đăng ký</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                    </View>
                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 15 }}>
                            <Text style={{ color: '#767676' }}>----------</Text>
                            <Text style={{ fontWeight: 'bold' }}>Hoặc</Text>
                            <Text style={{ color: '#767676' }}>----------</Text>
                        </View>
                        <View style={styles.imageAlign}>
                            <TouchableOpacity>
                                <Image source={require('../assets/facebook.png')} style={styles.imageLogin} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../assets/google.png')} style={styles.imageLogin} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../assets/twitter.png')} style={styles.imageLogin} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#fff',
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: '5%',
        paddingTop: '10%'

    },
    imagelogo: {
        height: 80,
        width: 80
    },
    textLogo: {
        fontSize: 26,

    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40
    },
    textError: {
        color: 'red',
        paddingLeft: 5,
        paddingTop: 5
    },
    imageLogin: {
        height: 50,
        width: 50,
        borderRadius: 8
    },
    imageAlign: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: '25%',
        paddingRight: '25%',

    },
    forgotPass: {
        textAlign: 'right',
        color: '#005CFF',
        fontSize: 13,
        fontWeight: 'bold'
    }
});
