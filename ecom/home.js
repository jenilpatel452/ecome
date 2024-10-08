import { Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, View, ImageBackground } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IPADDRESS } from './ipconst';

const Home = ({ navigation }) => {
    const [qty, setQty] = useState(1);  // Correctly initialize state

    const inc = () => {
        setQty(prevQty => prevQty + 1);
    }

    const dec = () => {
        setQty(prevQty => (prevQty > 1 ? prevQty - 1 : 1));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'My E-Comm APP',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity onPress={reg}>
                    <Image source={require('./img/register.png')} style={styles.menu}></Image>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity  onPress={log}>
                    <Image source={require('./img/login.png')} style={styles.searchicon}></Image>
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: 'white',
            },
        })
    }, [navigation])

    const reg = () => {
        navigation.navigate('register');
    };
    const log = () => {
        navigation.navigate('login');
    };
    const [cats,setCats] = useState([])
    
    const [product,setProducts] = useState([])
    const productmethod = (id) => {
        // console.log(id)
        navigation.navigate('detail', { 'pid': id })
    }

    const cat_method = (id) => {
        console.log(id)
        navigation.navigate('cat', { 'cid': id })
    }
    useEffect(() => {
       
        fetch(IPADDRESS + '/v_cat')
            .then(res => res.json())
            .then(data => setCats(data.data));

        fetch(IPADDRESS + `/v_product`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.data)
            })
    }, [])
        

        // fetch(IPADDRESS+'/login', {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         "email":"admin@gmail.com",
        //         "password":"admin@123"
        //     }),
        //   }).then(res => res.json())
        //   .then(data=>{
        //       console.log(data)
        //     //   console.log("Hello2")
        //   });


        // fetch('https://dummyjson.com/products')
        // .then(res => res.json())
        // .then(data=> setProducts(data.products));
  
    return (
        <>
         {/* <ImageBackground source={require('./img/back1.jpg')} style={styles.back}> */}
            <View style={styles.container}>
                <TextInput style={styles.search} placeholder='Search Your Item' />
                {/* <Image source={require('./img/l.png')} style={styles.search} ></Image> */}
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.imgrowContent}>
                    <View style={styles.catrow}>
                        <Text style={styles.txtcategories}>Categories</Text>
                        <View style={styles.sirow}>
                            <Text style={styles.seeall}>See All</Text>
                            <Image source={require('./img/fast-forward.png')} style={styles.catimg} />
                        </View>
                    </View>
                    <ScrollView style={styles.imgrow} horizontal={true}>
                        {cats.map((item, index) => (
                            <Pressable style={styles.column} key={index}>
                                <Pressable style={styles.imgcont} onPress={() => cat_method(item._id)}>
                                    <Image style={styles.imgcat} source={{uri:`${IPADDRESS}/images/${item.image}`}} />
                                </Pressable>
                                <Text style={{margin:5,color:'black'}}>{item.cat_name}</Text>
                              </Pressable>
                        ))}
                    </ScrollView>
                    <View style={styles.catrow}>
                        <Text style={styles.txtcategories}>Discount Products</Text>
                        <View style={styles.sirow}>
                            <Text style={styles.seeall}>See All</Text>
                            <Image source={require('./img/fast-forward.png')} style={styles.catimg} />
                        </View>
                    </View>
                    <View style={styles.produtrow}>
                        {product.map((item, index) => (
                            <Pressable style={styles.productcont} key={index} onPress={() => productmethod(item._id)}>
                                   <Image source={{ uri: `${IPADDRESS}/images/${item.image}` }} resizeMode='stretch' style={styles.product}></Image>     
                                         <Text style={styles.desc}>{item.p_name}</Text>
                                
                                <View style={styles.pricerow}>
                                    {/* <Text style={styles.newprice}>${(item.price - (item.price*item.discountPercentage/100)).toFixed(2)}</Text> */}
                                    <Text style={styles.newprice}>₹{(item.p_price )}</Text>

                                    <Text style={styles.oldprice}>₹{item.p_dis}</Text>
                                </View>
                            </Pressable>   
                            
                        ))}
                        
                    </View>
                   
                
                </ScrollView>
                <View style={styles.mainrow}>
                    <View style={styles.likerow}>
                        <Image source={require('./img/house.png')} style={styles.imgrate} />  
                    </View>
                    <View style={styles.likerow} >
                        <Pressable onPress={()=>navigation.navigate('ship2')}>
                        <Image source={require('./img/add-to-cart.png')} style={styles.imgrate}  />
                        </Pressable>
                    </View>
                    <View style={styles.likerow}>
                        <Pressable onPress={()=>navigation.navigate('profile')}>
                        <Image source={require('./img/avatar.png')} style={styles.imgrate} />
                        </Pressable>                          
                    </View>
                </View>
            </View>
            {/* </ImageBackground> */}
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    searchicon: {
        height: 55,
        width: 55,
    },
    menu: {
        height: 50,
        width: 50,
    },
    search: {
        borderColor: 'black',
        borderRadius: 0,
        borderWidth: 3,
        width: '90%',
        padding: 10,
        fontSize: 18,
        alignSelf: 'center',
        position: 'absolute',
        top: 20,
        zIndex: 1,
        // backgroundColor: '#8ecae6',
    },
    scrollView: {
        flex: 1,
        marginTop: 80, // Adjust according to the height of the search bar and top margin
    },
    catrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        // backgroundColor:'#8ecae6',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        alignSelf: 'center',
        // borderColor:'black',
        // borderWidth:3      
    },
    txtcategories: {
        fontSize: 20,
        color: 'black'
    },
    catimg: {
        width: 20,
        height: 20,
        
    },
    sirow: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    seeall: {
        marginRight: 10,
        color: 'black'
    },
    imgrow: {
        marginTop: 10,
        width: '100%',
        marginBottom: 10
        
    },
    imgrowContent: {
        alignItems: 'center',
    
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
    imgcat: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor:"#8ecae6",
        // width:'100%'
        borderRadius:10,
        borderWidth:2.3,
        borderColor:'red',
        margin:5

    },
    produtrow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: 150
    },
    productcont: {
        height: 330,
        width: 195,
        marginTop:10,
        // backgroundColor: '#8ecae6',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'scroll',
        flexDirection: 'column',
        borderRadius: 10,
        borderColor:'black',
        borderWidth:3
    },
    product: {
        height: 210,
        width: 190
    },
    desc: {
        fontStyle: 'normal',
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'justify'
    },
    pricerow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
    },
    newprice: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold'
    },
    oldprice: {
        fontSize: 19,
        textDecorationLine: 'line-through',
        fontWeight: 'bold',
        color: 'red'
    },
    back:{
        height:970,
        width:'100%'
    },
    mainrow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:7,
        marginBottom:0,
        // borderColor:'black',
        // borderWidth:2
        // backgroundColor:'black'
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
