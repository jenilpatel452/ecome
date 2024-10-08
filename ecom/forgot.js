import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View,ImageBackground,Image } from "react-native";
const Forgot = ({navigation}) => {
    return (
        <>
         {/* <ImageBackground source={require('./img/back1.jpg')} style={styles.back}> */}
            <View style={styles.maincont}>
            <View style={{marginTop:0}}>
                    <Image source={require('./img/Forgot.png')} style={{height:300,width:300,resizeMode:'stretch'}}></Image>
                </View>

                <View style={styles.minicont}>

                    <Text style={styles.logintxt}>Forgot Password</Text>
                    <TextInput 
                    style={styles.input} 
                    secureTextEntry={true}
                    placeholder="Enter New Password" 
                    keyboardType="default" 
                    spellCheck="folse">        
                    </TextInput>
                    
                    <TextInput
                        // secureTextEntry={true}
                        keyboardType="default"
                        placeholder="Enter Confirm Password"
                        spellCheck="folse"
                        style={styles.input}
                    />
                    <Pressable style={styles.loginbtn}>
                        <Text style={styles.txtloginbtn}>Login</Text>
                    </Pressable>
                  
                    <Pressable onPress={()=>navigation.navigate('register')}>
                    <Text style={styles.signuptxt}>Don't have an account? Sign Up</Text>
                    </Pressable>
                </View>
            </View>
            {/* </ImageBackground> */}
        </>
    )
}
export default Forgot
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
        borderRadius: 10
    },
    logintxt: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop:50

    },
    input: {
        // borderColor:'black',
        borderWidth: 1,
        padding: 11,
        width: '100%',
        marginTop: 30,
        fontSize:15
    },
    loginbtn: {
        width: '100%',
        backgroundColor: 'orange',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        // backgroundImage: 'linear-gradient(to bottom, #ff0000, #0000ff)'

    },
    txtloginbtn: {
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    forgorpasstxt:{
        marginTop:10,
        color:'blue'

    },
signuptxt:{
    marginTop:10,
    color:'blue',
    marginBottom:70

},
forgotpasscnt:{
    marginBottom:10
},
back:{
    height:970,
    width:'100%'
},


})