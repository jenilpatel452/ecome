import { View, Text,StyleSheet, Image,navigation } from 'react-native'
import React, { useEffect, useState } from 'react';
import { IPADDRESS } from './ipconst';




const Payment = ({ route, navigation }) => {
    
      const [product, setProduct] = useState(null); 
    const [productAmt, setProductAmt] = useState(0);
    const [totalAmt, setTotalAmt] = useState(0);
    const [shipAmt, setShipAmt] = useState(0);
    const { pid } = route.params; 

    useEffect(() => {
        fetch(IPADDRESS + `/v_product`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                // Calculate total after product data is fetched
                calculateTotal(data);
            })
            .catch(err => console.error(err));
    }, [pid]); 

    // const calculateTotal = (productData) => {
    //     const discountedPrice = (productData.price - (productData.price * productData.discountPercentage / 100)).toFixed(2);
    //     setProductAmt(discountedPrice);

    //     let shippingCost = 0;
    //     if (discountedPrice > 10) {
    //         shippingCost = 10;
    //     }
    //     setShipAmt(shippingCost);

    //     const totalAmount = parseFloat(discountedPrice) + shippingCost;
    //     setTotalAmt(totalAmount.toFixed(2));
    // };
    // if (!product) {
    //     return (
    //         <View style={styles.mainCont}>
    //             <Text style={{ textAlign: 'center', fontSize: 30, color: 'black' }}>Loading...</Text>
    //         </View>
    //     );
    // }
  return (
    <>
    
    <View>
        <Text style={styles.txt}>Payment Method</Text>
    </View>
    
    <View>
        <Text style={styles.txt1}>Select Payment Method</Text>
    </View>

    <View style={styles.av}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.txt2}></Text>
        <Text style={styles.txt3}>Cash on Delivery</Text>
        <Image source={require('./img/cash-on-delivery.png')} style={styles.ima}></Image>
        </View>

    </View> 
                    <Text></Text>
    <View style={styles.av}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.txt2}></Text>
        <Text style={styles.txt3}>Pay online</Text>
        <Image source={require('./img/pngwing.png')} style={styles.ima}></Image>
        <Image source={require('./img/phonepe-icon.png')} style={styles.ima}></Image>
        <Image source={require('./img/icons8-bhim-48.png')} style={styles.ima}></Image>
        <Image source={require('./img/pngwing.com.png')} style={styles.ima}></Image>
        </View>

    </View>
    </>
  )
}

export default Payment;

const styles = StyleSheet.create({
    txt:{
        color:'black',
        fontWeight:'600',
        marginTop:12,
        fontSize:25,
        alignSelf:'center'
    },
    txt1:{
        color:'black',
        fontSize:18,
        fontWeight:'600',
        marginTop:35,
        marginLeft:20
    },
    av:{
        flexDirection:'row',
        borderColor:'black',
        borderWidth:2,
        height:60,
        width:'100%'

    },
    txt2:{
        color:'black',
        fontSize:25,
        fontWeight:'700',
        marginTop:10
    },
    txt3:{
        color:'black',
        marginLeft:20,
        fontSize:19,
        marginTop:13
    },
    ima:{
        width:30,
        height:30,
        marginLeft:40,
        marginTop:13,
        borderColor:'black',
        borderWidth:1,
        borderRadius:15

    },
    ima:{
        width:30,
        height:30,
        marginLeft:15,
        marginTop:13,
        borderColor:'black',
        borderWidth:1,
        borderRadius:20

    }

})