import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useId } from 'react'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IPADDRESS } from './ipconst';


const Ship2 = ({ route, navigation }) => {
    const { totalItem, totalQty, totalPrice } = route.params;
    const [userid, setUserId] = useState(null);
    const [shipdata, setshipdata] = useState({});

    const getid = async () => {
        var value = await AsyncStorage.getItem('user');
        setUserId(value);
    }

    useEffect(() => {
        const listener = navigation.addListener('focus', () => {
            getid();
        });
        return listener;
    }, [navigation]);

    useEffect(() => {
        fetch(`${IPADDRESS}/showship`)
            .then(res => res.json())
            .then(data => {
                // console.log(data); // Check the structure of `data`

                setshipdata(data.data[0]);
                // Ensure this correctly matches your API response
            })
            .catch(error => console.error('Error fetching shipping data:', error));
    }, []);


    return (
        <View style={styles.maincont}>
            <View style={styles.box}>
                <View style={styles.col}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Item:</Text>
                        <Text style={styles.inputtxt}>{totalItem}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Qty:</Text>
                        <Text style={styles.inputtxt}>{totalQty}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label1}>Total Payable Amt:</Text>
                        <Text style={styles.inputtxt1}>{totalPrice}</Text>
                    </View>

                    {shipdata ? (
                        <>
                            <View style={styles.row}>
                                <Text style={styles.label}>First Name:</Text>
                                <Text style={styles.inputtxt}>{shipdata.firstname}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Last Name:</Text>
                                <Text style={styles.inputtxt}>{shipdata.lastname}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Address:</Text>
                                <Text style={styles.inputtxt}>{shipdata.address}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Country:</Text>
                                <Text style={styles.inputtxt}>{shipdata.country}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Email:</Text>
                                <Text style={styles.inputtxt}>{shipdata.email}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Mobile:</Text>
                                <Text style={styles.inputtxt}>{shipdata.phone}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>PinCode:</Text>
                                <Text style={styles.inputtxt}>{shipdata.pincode}</Text>
                            </View>
                        </>
                    ) : (
                        <Text>Loading shipping data...</Text>
                    )}
                </View>
                <View style={styles.lastrow}>
                    <Pressable style={styles.btn} onPress={navigation.navigate('shipping')}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Ok</Text>
                    </Pressable>
                    <Pressable style={styles.btn} onPress={() => {
                        navigation.navigate('ship3', {
                            totalItem: totalItem,
                            totalQty: totalQty,
                            totalPrice: totalPrice
                        });
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Edit</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Ship2

const styles = StyleSheet.create({
    btn: {
        alignSelf: 'center',
        backgroundColor: '#a6c6d3',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        margin: 10,
    },
    lastrow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    maincont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    col: {
        flexDirection: 'column',
    },
    box: {
        backgroundColor: '#D2DCE7',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        borderWidth: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        width: 90,
        textAlign: 'center',
        marginRight: 10,
        color: 'black',
        fontSize: 16,
    },
    label1: {
        width: 150,
        textAlign: 'center',
        marginRight: 10,
        color: 'black',
        fontSize: 16,
    },
    inputtxt: {
        color: 'black',
        width: 220,
        padding: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',

    },
    inputtxt1: {
        color: 'black',
        width: 135,
        padding: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
