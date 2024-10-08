import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { IPADDRESS } from './ipconst';


const Specific = ({ route, navigation }) => {
    const { cid } = route.params;
    const [catname, setcatname] = useState('');
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);

    const gotodetail = (id) => {
        navigation.navigate('detail', { pid: id });
    };
    useEffect(() => {
        fetch(IPADDRESS + `/v_cat/${cid}`)
            .then(res => res.json())
            .then(data => {
                setCats(data.data);
                setLoading(false);
            });


        fetch(IPADDRESS + '/v_cat')
            .then(res => res.json())
            .then(data => {
                const cate = data.data.find(cat => cat._id == cid);
                if (cate) {
                    setcatname(cate.cat_name);
                }
            });
    }, [cid]);
      
    // useEffect(() => {
    //     fetch(`https://dummyjson.com/products/category/${slug}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setCats(data.products);
    //             setLoading(false);
    //         });
    // }, [slug]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: catname
        });
    }, [navigation]);

    if (loading) {
        return (
            <>
                <View style={{ alignItems: 'center', justifyContent: 'center',flex:1 }}>
                    <Text style={{ fontSize: 20, color: 'blue' }}>Loading...</Text>

                </View>

            </>

        )

    }

    return (
        <ScrollView style={styles.maincont} contentContainerStyle={styles.imgrowContent}>
            <View style={styles.produtrow}>
                {cats.map((item, index) => (
                    <Pressable style={styles.productcont} key={index} onPress={() => gotodetail(item._id)}>
                        <Image source={{ uri: `${IPADDRESS}/images/${item.image}` }} resizeMode='stretch' style={styles.product} />
                        <Text style={styles.desc} numberOfLines={3}>{item.p_desc}</Text>
                        <Text style={{fontSize:16,textAlign:'left',color:'blue'}}>More...</Text>
                        {/* <View style={styles.pricerow}> */}
                            {/* <Text style={styles.newprice}>₹{(item.price - (item.price * item.discountPercentage / 100)).toFixed(2)}</Text> */}
                            {/* <Text style={styles.oldprice}>₹{item.price}</Text> */}
                        {/* </View> */}
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
};

export default Specific;

const styles = StyleSheet.create({
    maincont: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    produtrow: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: 40,
    },
    productcont: {
        height: 400,
        width: 160,
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'scroll',
        flexDirection: 'column',
        borderRadius: 10,
        borderColor:'black',
        borderWidth:3
    },
    product: {
        height: 250,
        width: 160,
    },
    imgrowContent: {
        alignItems: 'center',
    },
    desc: {
        fontStyle: 'normal',
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 10,
        marginRight:10,
        marginLeft:10,
        textAlign: 'justify',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
    },
    pricerow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
    },
    newprice: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop:10
    },
    oldprice: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        fontWeight: 'bold',
        color: 'black',
    },
});
