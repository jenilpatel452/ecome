import { Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, View, ImageBackground } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IPADDRESS } from './ipconst';
import Login from './login';

const Profile = ({ navigation }) => {
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        fetch(IPADDRESS + '/login')
            .then(res => res.json())
            .then(data => setCats(data.data));
           

        
    }, [])
    return(
        <>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.imgrowContent}>
            <View style={{flex:1,marginBottom:20}}>
                <View style={styles.mainrow}>
                <Text style={styles.main}>Account</Text>
            <View style={{flexDirection:'row',marginLeft:240,}}>
                <Image source={require('./img/search.png')} style={styles.img} ></Image>
                <Image source={require('./img/cart.png')} style={styles.img}></Image>
                
            </View>
                </View>
                

            <View style={styles.av}>
                <Image source={require('./img/avatar.png')} style={styles.imgcont}></Image>
                <Text style={{fontSize:20,marginTop:25,marginLeft:10,fontWeight:'600',color:'black'}}>name</Text>
                <Pressable>
                    <Image source={require('./img/catarrow.png')} style={{height:25,width:25,marginTop:22,marginLeft:190}} ></Image>
                </Pressable>
                </View>  

                <View style={styles.av1}>
                    <View style={styles.bo}>
                        <Image source={require('./img/help.png')} style={styles.img1}></Image>
                        <Text>Help center</Text>
                    </View>
                    <View style={styles.bo}> 
                        <Image source={require('./img/language.png')} style={styles.img1}></Image>
                        <Text>Change Language</Text>
                    </View>
                </View>

                <View>
                    <Text style={{marginTop:15,fontSize:17,fontWeight:'800',color:'black',marginLeft:11}}> My Payments </Text>
                    <View style={styles.av2}>
                        <Image source={require('./img/phone.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Bank & UPI Details</Text>
                    </View>
                    <View style={styles.av2}>
                        <Image source={require('./img/atm-card.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Bank & UPI Details</Text>
                    </View>
                </View>

                <Text style={{marginTop:15,fontSize:17,fontWeight:'800',color:'black',marginLeft:11}}> My Activity </Text>

                <View style={styles.av2}>
                        <Image source={require('./img/package.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Wishlisted Products</Text>
                    </View>
                    <View style={styles.av2}>
                        <Image source={require('./img/network.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Shared product</Text>
                    </View>
                    <View style={styles.av2}>
                        <Image source={require('./img/store.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Followed Shops</Text>
                    </View>

                    <Text style={{marginTop:15,fontSize:17,fontWeight:'800',color:'black',marginLeft:11}}> Others </Text>

                    <View style={styles.av2}>
                        <Image source={require('./img/diversity.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Community</Text>
                    </View>
                    <View style={styles.av2}>
                        <Image source={require('./img/wallet.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Balance</Text>
                    </View>
                    <View style={styles.av2}>
                        <Image source={require('./img/briefcase.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Become a Supplier</Text>
                    </View>
                    <View style={styles.av2}>
                        <Image source={require('./img/gear.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Settings</Text>
                    </View>
                    <View style={styles.av2}>
                        <Image source={require('./img/star.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Rete App</Text>
                    </View>
                    <View style={styles.av2}>
                        <Image source={require('./img/law.png')} style={styles.img2}></Image>
                        <Text style={styles.txt}>Legal and Policies</Text>
                    </View>
                    <View style={styles.av2}>
                        <Image source={require('./img/logout.png')} style={styles.img2}></Image>
                        <Text style={styles.txt} onPress={() => navigation.navigate('home')} >Logout</Text>
                                     </View>


{/* 
                    <View style={styles.mainrow}>
                    <View style={styles.likerow}>
                        <Image source={require('./img/house.png')} style={styles.imgrate} />  
                    </View>
                    <View style={styles.likerow} >
                        <Pressable onPress={()=>navigation.navigate('login')}>
                        <Image source={require('./img/add-to-cart.png')} style={styles.imgrate}  />
                        </Pressable>
                    </View>
                    <View style={styles.likerow}>
                        <Pressable onPress={()=>navigation.navigate('profile')}>
                        <Image source={require('./img/avatar.png')} style={styles.imgrate} />
                        </Pressable>                          
                    </View>
                </View> */}
                
            </View>
            </ScrollView>
            
        </>
    )
    
    
}
export default Profile

const styles = StyleSheet.create({
    mainrow: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        marginTop:7,
        marginBottom:0,
        // margin:20,
        // borderColor:'black',
        // borderWidth:2,
        // backgroundColor:'pink'
    },
    main:{
        color:'black',
        // fontWeight:'bold',
        fontSize:25,
        marginLeft:12
        
        
    },
    img:{
        
        height:22,
        width:22,
        margin:8
        
    },
    av:{
        flexDirection:'row',
        marginTop:10,
       
        // justifyContent:'space-between'

    },
    imgcont: {
        height: 70,
        width: 70,
        borderWidth: 2,
        borderColor:'red',
        borderRadius: 35,
        margin: 5,
        borderStyle:'dotted',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    av1:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    
    },
    bo:{
        borderColor:'black',
        borderWidth:2,
        borderRadius:10,
        height:90,
        width:200,
        marginTop:20,
        alignItems:'center'
    },
    img1:{
        height:35,
        width:35,
        marginTop:20,
        
    },
    av2:{
        flexDirection:'row',
        justifyContent:'flex-start',
        // borderColor:'black',
        // borderWidth:2,
        marginTop:11
    },
    txt:{
        alignSelf:'center',
        marginTop:10,
        marginLeft:35,
        color:'black',
        fontWeight:'500'
    },
    img2:{
        height:35,
        width:35,
        marginTop:10,
        marginLeft:12
    },
    scrollView: {
       
        marginTop: 0, // Adjust according to the height of the search bar and top margin
    },
    mainrow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:7,
        marginBottom:0,
        // borderColor:'black',
        // borderWidth:2
        // backgroundColor:'black'
        // position: 'absolute',
        // top: 20,
        // zIndex: 1,
    },
    imgrate: {
        height: 30,
        width: 30,
    },
    likerow: {
        flexDirection: 'row',
        borderColor: 'black',
        // borderWidth: 1,
        // borderRadius: 7,
        padding: 3,
        overflow: 'hidden'
    },
})
