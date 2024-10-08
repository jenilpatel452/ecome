import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPADDRESS } from "./ipconst"; // Make sure IPADDRESS is correctly imported from ipconst

const storeId = async (value) => {
    try {
        await AsyncStorage.setItem('user', value);
        console.log("Stored ID:", value);
    } catch (e) {
        console.log("Error storing the user ID:", e);
    }
};

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = async () => {
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            valid = false;
        } else {
            setEmailError('');
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            try {
                const response = await fetch(IPADDRESS + '/ulogin', { // Make sure IPADDRESS is used correctly
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                });
                
                const data = await response.json();

                if (data.status === 'login success') {
                    Alert.alert("Login Success", "You have successfully logged in!");
                    const id = data.data._id;

                    // Store the user ID
                    await storeId(id);

                    // Confirm that the ID was stored
                    const storedId = await AsyncStorage.getItem('user');
                    console.log("Retrieved ID from storage:", storedId);

                    navigation.navigate('cart');
                } else {
                    Alert.alert("Login Failed", data.status);
                }
            } catch (error) {
                console.error("Error during login:", error);
                Alert.alert("Login Error", "An error occurred. Please try again later.");
            }
        }
    };

    return (
        <View style={styles.maincont}>
            <View style={{ marginTop: 0 }}>
                <Image source={require('./img/login1.jpg')} style={{ height: 300, width: 300, resizeMode: 'stretch' }} />
            </View>

            <View style={styles.minicont}>
                <Text style={styles.logintxt}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <TextInput
                    secureTextEntry={true}
                    keyboardType="default"
                    placeholder="Enter your password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

                <Pressable style={styles.loginbtn} onPress={handleLogin}>
                    <Text style={styles.txtloginbtn}>Login</Text>
                </Pressable>
                <Pressable style={styles.forgotpasscnt} onPress={() => navigation.navigate('forgot')}>
                    <Text style={styles.forgotpasstxt}>Forgot Password?</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('register')}>
                    <Text style={styles.signuptxt}>Don't have an account? Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    maincont: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    minicont: {
        backgroundColor: 'white',
        width: '90%',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10,
    },
    logintxt: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 50,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        width: '100%',
        marginTop: 30,
    },
    loginbtn: {
        width: '100%',
        backgroundColor: 'orange',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
    txtloginbtn: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    forgotpasstxt: {
        marginTop: 10,
        color: 'blue',
    },
    signuptxt: {
        marginTop: 10,
        color: 'blue',
        marginBottom: 70,
    },
    forgotpasscnt: {
        marginBottom: 10,
    },
});

export default Login;
