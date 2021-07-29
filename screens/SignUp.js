import React from 'react';
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
    TouchableOpacity
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputCustom from '../components/InputCustom';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ButtonCustom from '../components/ButtonCustom';
import Toast from 'react-native-simple-toast';

const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Mật khẩu tối thiểu 6 ký tự!')
        .max(15, 'Mật khẩu không quá 15 ký tự!')
        .required('Vui lòng nhập mật khẩu.'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Mật khẩu nhập lại không đúng ."
    ).required('Vui lòng nhập mật khẩu.'),
    userName: Yup.string().required('Vui lòng nhập họ tên.'),
    email: Yup.string().email('email không đúng định dạng.').required('Vui lòng nhập email.'),
});
export default function SignUp({ navigation, user }) {
    async function Signup(values) {
        try {
            const result = await auth().createUserWithEmailAndPassword(values.email, values.password)
            firestore().collection('users').doc(result.user.uid).set({
                name: values.userName,
                email: result.user.email,
                uid: result.user.uid,
                image: "https://apsec.iafor.org/wp-content/uploads/sites/37/2017/02/IAFOR-Blank-Avatar-Image.jpg",
                imageBackground: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8WO4fi_amn8WsyA3FYwQTLn8rlK8dNy8oUg&usqp=CAU',
                status: "online",
                friendAwait: [],
                friendRequest: [],
                listFriends: [],
                HistorySearch: []
            })
            firestore().collection('Post').doc(result.user.uid).set({ image: [] })

        } catch (error) {
            if (error.code == 'auth/email-already-in-use') Toast.show('Địa chỉ email đã tồn tại.', Toast.LONG)
            else Toast.show('Có lỗi xảy ra . Vui lòng thử lại sau.')
        }
    }
    function isFormVaild(isValid, touched) {
        return isValid && Object.keys(touched).length !== 0
    }
    return (

        <>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconHeader}>
                    <FontAwesome5 name='angle-left' size={30} color='#000' />

                </TouchableOpacity>
                <View style={styles.sizeTextHeader}>
                    <Text style={styles.textHeader}>Đăng ký</Text>
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View>
                            <Formik
                                initialValues={{ email: '', password: '', userName: '', confirmPassword: '' }}
                                onSubmit={Signup}
                                validationSchema={LoginSchema}
                            >

                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                                    <View>
                                        <View>
                                            <InputCustom title='Tài khoản'
                                                iconName='envelope'
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
                                            <InputCustom title='Họ tên'
                                                iconName='user-alt'
                                                placeholder="Nhập họ tên..."
                                                onChangeText={handleChange('userName')}
                                                onBlur={handleBlur('userName')}
                                                value={values.userName}
                                            />
                                            {errors.userName && touched.userName ? (
                                                <Text style={styles.textError}>{errors.userName}</Text>
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
                                            <InputCustom title='Nhập lại mật khẩu'
                                                iconName='lock'
                                                placeholder="*******"
                                                onChangeText={handleChange('confirmPassword')}
                                                onBlur={handleBlur('confirmPassword')}
                                                value={values.confirmPassword}
                                            />
                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <Text style={styles.textError}>{errors.confirmPassword}</Text>
                                            ) : null}
                                        </View>
                                        <ButtonCustom
                                            opacity={isFormVaild(isValid, touched) ? 1 : 0.5}
                                            disabled={!isFormVaild(isValid, touched)}
                                            onPress={() => handleSubmit()}
                                            textButton='Đăng ký'
                                        />

                                    </View>
                                )}
                            </Formik>
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
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#fff',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: '10%',
        paddingBottom: '5%'

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
    header: {
        backgroundColor: 'white',
        width: '100%',
        height: '7%',
        flexDirection: 'row',
        elevation: 5
    },
    iconHeader: {
        position: 'absolute',
        left: 15,
        alignSelf: 'center',
        padding: 5,
        paddingHorizontal: 10,
    },
    sizeTextHeader: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '100%'
    },
    textHeader: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
