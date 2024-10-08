import { View, Text, Image,StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

const First = ({navigation}) => {
        useEffect(()=>{
                setTimeout(()=>{
                    navigation.navigate('home')
                },2500);
        })

    
  return (
   <>
    <View style={styles.fi}>
        <View>
            <Image source={require('./img/l.png')}></Image>
        </View>
        <Image source={require('./img/f.png')} style={styles.img}></Image>
    </View>
   </>
  )
}

export default First;

const styles = StyleSheet.create({
    fi:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    img:{
        resizeMode:'stretch',
        height:500,
        width:500
    }
})