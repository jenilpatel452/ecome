import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from "./home";
import Detail from "./detail";
import Specific from "./specific";
import Add from "./add";
import Login from "./login";
import Register from "./ragister";
import Shipping from "./shipping";
import Forgot from "./forgot";
import Profile from "./profile";
import Payment from "./payment";
import First from "./first";
import Ship2 from "./ship2";
import Ship3 from "./ship3";
// import Shipping from "./shipping";
const Stack = createNativeStackNavigator();

const App=()=>{
  
  return(
    <>
      {/* <First></First> */}
       {/* <Payment></Payment> */}
     <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.Screen name="first" component={First} options={{headerShown:false}} />  */}
      <Stack.Screen name="home" component={Home}  />
      <Stack.Screen name="detail" component={Detail}  />
      <Stack.Screen name="cat" component={Specific}  />
      <Stack.Screen name="ship" component={Shipping} options={{headerShown:false}} />
      <Stack.Screen name="ship2" component={Ship2} options={{ headerShown: false }} />
      <Stack.Screen name="cart" component={Add} options={{headerShown:false}} />      
      <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="register" component={Register} options={{headerShown:false}} /> 
      <Stack.Screen name="forgot" component={Forgot} options={{headerShown:false}} /> 
      <Stack.Screen name="profile" component={Profile} options={{headerShown:false}} /> 
      <Stack.Screen name="payment" component={Payment} options={{headerShown:false}} /> 
      <Stack.Screen name="ship3" component={Ship3} options={{headerShown:false}} /> 

     

      
      </Stack.Navigator>
    </NavigationContainer> 
    </>
  )
}
export default App