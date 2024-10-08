import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { IPADDRESS } from './ipconst';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Detail = ({ route, navigation }) => {
    const [product, setProduct] = useState(null);
    const [uid, setuId] = useState(null);
    const [cart, setCart] = useState([]);
    const [pids, setpids] = useState([]);
    const [qty, setQty] = useState(1);
    const { pid } = route.params;
    console.log('detail',pid)

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'DETAIL PRODUCTS',
            headerTitleAlign: 'center',
        })
    })
    const getid = async () => {
        var value = await AsyncStorage.getItem('user');
        setuId(value);
        console.log('uid', value);
    };

    useEffect(() => {
        const listener = navigation.addListener('focus', () => {
            getid();
        });
        return listener;
    }, [navigation]);

   
    // useEffect(() => {
        
    //     fetch(`https://dummyjson.com/products/${pid}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             // const foundProduct = data.products.find(p => p.id === pid);
    //             setProduct(data);
                
    //         })
    //         .catch(err => console.error(err));
    // }, [pid]); 
    useEffect(() => {
        fetch(`${IPADDRESS}/product/${pid}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.data);

                // Fetch the cart data
                fetch(`${IPADDRESS}/showcart`)
                    .then(res => res.json())
                    .then(cartData => {
                        setCart(cartData.data); // Update the cart state with fetched data
                    })
                    .catch(err => console.error('Error fetching cart data:', err));
            })
            .catch(err => console.error('Error fetching product data:', err));
    }, [pid]);
    useEffect(() => {
        if (cart.length > 0) {
            fetchId();
        }
    }, [cart]);

    const fetchId = () => {
        const allpid = cart.map(item => item.p_id);
        // console.log('All PIDs:', allpid);
        setpids(allpid);
    };

    
    const buy = async () => {
        if (!uid) {
            console.error('User ID is not available');
            return;
        }

        try {
            // Check if the product already exists in the cart
            const existingCartItem = cart.find(item => item.p_id === pid && item.u_id === uid);

            if (existingCartItem) {
                // If the product exists in the cart, update the existing entry
                const updatedQty = existingCartItem.p_qty + qty;

                const response = await fetch(`${IPADDRESS}/updatecart/${existingCartItem._id}`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        p_qty: updatedQty,
                    }),
                });

                if (response.ok) {
                    console.log('Cart update success');
                    navigation.navigate('cart', { pid });
                } else {
                    console.error('Failed to update cart:', response.statusText);
                }
            } else {
                // If the product is not in the cart, insert a new entry
                const response = await fetch(`${IPADDRESS}/cinsert/${pid}`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        u_id: uid,
                        p_qty: qty,
                        p_id: pid,
                    }),
                });

                if (response.ok) {
                    console.log('Cart insert success');
                    navigation.navigate('cart', { pid });
                } else {
                    console.error('Failed to insert into cart:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Error processing cart operation:', error);
        }
    };

    
    if (!product) {
        return (
            <View style={styles.maincont}>
                <Text style={{textAlign:'center',fontSize:30,color:'black'}}>Loading...</Text>
            </View>
        );
    }

    // const buye = () => {
    //     navigation.navigate('cart',{'pid':pid});
    // };

    return (
       <ScrollView>
            <View style={styles.maincont}>
                <View style={styles.main}>
                    <Image source={require('./img/shareus.png')} style={styles.sha}></Image>
                    <Image source={require('./img/heart.png')} style={{height:25,width:25,marginLeft:12}}></Image>
                </View>
            <View style={styles.minicont1}>
            <Image source={{ uri: `${IPADDRESS}/images/${product.image}` }} style={styles.mainimg} />
            </View>
            <View style={styles.minicont2}>
                <Text style={styles.txtname}>{product.p_name}</Text>
           
                {/* <View style={styles.mainrow}>
                    <View style={styles.reterow}>
                        <Image source={require('./img/rate.png')} style={styles.imgrate} />
                        <Text style={styles.txt}>{product.rating}</Text>
                    </View>
                    <View style={styles.likerow}>
                        <Image source={require('./img/like.png')} style={styles.imgrate} />
                        <Text style={styles.txt}>95%</Text>
                    </View>
                    <View style={styles.likerow}>
                        <Image source={require('./img/message.png')} style={styles.imgrate} />
                        <Text style={styles.txt}>9</Text>
                    </View>    
                </View> */}
                <Text style={styles.text} >{product.p_desc}</Text>
                
                <View style={styles.pricerow}>
                    <View style={styles.row}>
                    <Text style={styles.newprice}>₹{(product.p_price)}</Text>
                    <Text style={styles.oldprice}>₹{product.p_dis}</Text>
                    </View>
                      
                <Pressable style={styles.addtocartrow} onPress={() => buy(product._id)} >
                    <Text style={styles.txtaddtocart}>Add to Cart</Text>
                </Pressable>
                    {/* <Image source={require('./img/info4.png')} style={styles.imginfo} /> */}
                </View>
                
                 
              
                {/* <Text style={styles.lasttxt}>Delivery on 26th December</Text> */}
            </View>
        </View>
        </ScrollView>
       

    );
};

export default Detail;

const styles = StyleSheet.create({

    sha:{
        height:25,
        width:25,  
    
    },
    main:{
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'black',
        // borderRadius: 7,
        padding: 3,
        marginRight:20,
        alignItems: 'center',
        justifyContent:'flex-end'
    },
    lasttxt: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginTop: 40,
        fontWeight:'bold'
    },
    txtaddtocart: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    
    },
    addtocartrow: {
        flexDirection: 'row',
        width: '50%',
        backgroundColor: '#19C463',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:,
        borderColor:'black',
        borderWidth:3,
        marginLeft:15
    },
    text: {
        fontSize: 15,
        textAlign: 'justify',
        // lineHeight: 24,
        // marginTop: 50,
        color: 'black',
        fontWeight:'500',
        marginTop:50
    },
    more: {
        fontSize: 17,
        textAlign: 'justify',
        lineHeight: 24,
        // marginTop: 20,
        color: 'blue'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt: {
        fontSize: 12,
        color: 'black',
        marginLeft: 5
    },
    maincont: {
        flex: 1,
        justifyContent: 'center',
        // alignItems:'center',
        backgroundColor:'white',
       
        height:'100%',
        width:'100%'
        
    },
    minicont1: {
        flex: 1,
        overflow: 'hidden',
        padding: 10,
        // marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius:30,
        backgroundColor:'white'
    },
    minicont2: {
        flex: 1.5,
        padding: 10,
        backgroundColor:'white',
        borderRadius:30

    },
    mainimg: {
        resizeMode: 'stretch',
        height: 400,
        width: 400,
        borderRadius: 10
    },
    imgrate: {
        height: 17,
        width: 17,
    },
    txtname: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black'
    },
    mainrow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    reterow: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 7,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    likerow: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7,
        padding: 3,
        overflow: 'hidden'
    },
    oldprice: {
        fontSize: 15,
        color: '#c1121f',
        margin: 5,
        textDecorationLine: 'line-through',
        // textDecorationColor:'red'
    },
    newprice: {
        fontSize: 25,
        color: 'black',
        fontWeight: '900',
        margin: 3
    },
    pricerow: {
        marginTop: 135,
        // backgroundColor: '#D2DCE7',
        // borderRadius: 10,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    imginfo: {
        height: 20,
        width: 20,
        marginRight: 5
    },
  
});
