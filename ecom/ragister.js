import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View,ImageBackground,Image } from "react-native";
import { IPADDRESS } from "./ipconst";

const Register = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!username) {
            errors.username = "Username is required";
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.email = "Enter a valid email address";
            valid = false;
        }

        if (!password || password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            valid = false;
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobile || !mobileRegex.test(mobile)) {
            errors.mobile = "Enter a valid 10-digit mobile number";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleRegister = () => {
        if (validate()) {
            // Perform the registration logic
            console.log('Registration Successful');
            // Reset form and navigate to login
            setUsername('');
            setEmail('');
            setPassword('');
            setMobile('');

            fetch(IPADDRESS+'/uregister', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "name":username ,
                  "email": email,
                  "password":password.toString()
                }),
              });

            navigation.navigate('home');

        }
    };

    return (
        <>
         {/* <ImageBackground source={require('./img/back1.jpg')} style={styles.back}> */}
            <View style={styles.maincont}>

            <View style={{marginTop:0}}>
                    <Image source={require('./img/sign.png')} style={{height:300,width:300,resizeMode:'stretch'}}></Image>
                </View>

                <View style={styles.minicont}>

                    <Text style={styles.logintxt}>SIGN UP</Text>
                    <Text style={styles.logintx}>Create a New Account is Free</Text>
                    <TextInput
                        style={[styles.input, errors.username && { borderColor: 'red' }]}
                        placeholder="Enter Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                    {/* <TextInput style={styles.input} placeholder="Enter Username" keyboardType="default"></TextInput>

                    <TextInput style={styles.input} placeholder="Enter Email" keyboardType="email-address"></TextInput> */}
                    <TextInput
                        style={[styles.input, errors.email && { borderColor: 'red' }]}
                        placeholder="Enter Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    {/* <TextInput style={styles.input} placeholder="Enter Mobile" keyboardType="numeric"></TextInput> */}

                    <TextInput
                        style={[styles.input, errors.password && { borderColor: 'red' }]}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    <TextInput
                        style={[styles.input, errors.mobile && { borderColor: 'red' }]}
                        placeholder="Enter Mobile"
                        keyboardType="numeric"
                        value={mobile}
                        onChangeText={setMobile}
                    />
                    {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

                    
                    <Pressable style={styles.loginbtn}  onPress={handleRegister}>
                        <Text style={styles.txtloginbtn}>Register</Text>
                    </Pressable>
                    {/* <Pressable>
                        <Text style={styles.forgorpasstxt}>Forgot Password?</Text>
                    </Pressable> */
                    <Pressable onPress={()=>navigation.navigate('login')} style={styles.btncont}>
                        <Text style={styles.signuptxt}>Already an account? Login</Text>
                    </Pressable> }
                </View>
            </View>
            {/* </ImageBackground> */}
        </>
    )
}
export default Register

const styles = StyleSheet.create({
    maincont: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    minicont: {
        backgroundColor: 'white',
        // height: 300,
        width: '90%',
        // margin:10,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10
    },
    logintxt: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30

    },
    logintx: {
        fontSize: 15,
        color: 'black',
        fontWeight: '400',
        marginBottom: 0,
        

    },
    input: {
        // borderColor:'black',
        borderWidth: 1,
        padding: 10,
        width: '100%',
        marginTop: 30
    },
    loginbtn: {
        width: '100%',
        backgroundColor: 'orange',
        marginTop: 20,
        // marginBottom:50,
        padding: 10,
        alignItems: 'center',
        backgroundImage: 'linear-gradient(to bottom, #ff0000, #0000ff)'

    },
    txtloginbtn: {
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    forgorpasstxt: {
        marginTop: 10,
        color: 'blue'

    },
    signuptxt: {
        marginTop: 10,
        color: 'blue',
        marginBottom: 70

    },
    btncont:{
        marginTop:10
    },
    back:{
        height:970,
        width:'100%'
    },

})