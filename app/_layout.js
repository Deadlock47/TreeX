import { View, Text,ToastAndroid } from 'react-native'
import React,{useEffect} from 'react'
import { Tabs } from 'expo-router'
import '../global.css'

import { StyleSheet } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import * as LocalAuthentication from 'expo-local-authentication'
import { SQLiteProvider } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BlurView } from "expo-blur";


const _layout = () => {
  const focusedColor = "rgba(211, 169, 10, 1)"
  const [isAuthSuccessfull, setIsAuthSuccessfull] = React.useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

// Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
    // handleBiometricAuth();
  },[]);
const handleBiometricAuth = async () => {
  try {
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      fallbackLabel: 'Use passcode',
      disableDeviceFallback: false,
    });

    if (biometricAuth.success) {
      console.log('Biometric authentication successful');
      ToastAndroid.show('Biometric authentication successful', ToastAndroid.SHORT);
      setIsAuthSuccessfull(true);
      // Handle successful authentication
      // Example: Store token, navigate to home, etc.
      return true;
    } else {
      console.log('Biometric authentication failed');
      ToastAndroid.show('Biometric authentication failed', ToastAndroid.SHORT);
      // Handle authentication failure
      return false;
    }
  } catch (error) {
    console.error('Biometric authentication error:', error);
    return false;
  }
}
  async function initializeDatabase(db) {
    try {
        // await db.execAsync(create_table)
        // console.log('Database initialised')
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}

  return (
    <GestureHandlerRootView>
   {   false ?
      (<View className='flex-1 w-screen h-screen bg-black' ></View>) 
      :
   ( 
    <SQLiteProvider databaseName='maint.db' onInit={initializeDatabase} >
      <Tabs
      
      screenOptions={({route})=>({
        tabBarShowLabel : false,
          tabBarStyle:{
            backgroundColor : 'transparent',
            position : 'absolute',
            height : 65,
            marginLeft:0,
            marginRight:0,
            borderRadius: 0,
            elevation:0,
            bottom:0,
            position:'absolute',
            left:0,
            right:0,
            display: route.name === 'code' || route.name === 'jveel' ? 'none' : 'flex'
          },
          tabBarBackground: () => (
            <BlurView
             intensity={100} tint="dark"
              style={StyleSheet.absoluteFill}
           />
          ),
          tabBarItemStyle:{
            marginTop:8,
            borderRadius:28,
            
          },
          
          unmountOnBlur: true
          
        })} >
          <Tabs.Screen name='index' options={{headerShown:false, tabBarIcon : ({focused,color,size})=>
          {
            return (
              <View className="flex justify-center items-center" style={{
                
                width:'60' , 
                height:'55',
                display : 'flex',
                // flexDirection : 'column',
                justifyContent:'center',
                alignItems :'center'
                
              }}>

              <View>
                {
                  focused ? 
                  <MaterialIcons name="home-filled" size={26} color={focusedColor} /> : 
                  <Feather name="home" size={26} color="white" /> 
                }
              </View>
              <Text style={{
                color : focused ? focusedColor : 'white',
                fontSize:12
              }}>Home</Text>
              </View>
            )
          }
            }}  ></Tabs.Screen>
          <Tabs.Screen name='searchScreen' options={{headerShown:false,href:null, tabBarIcon : ({focused,color,size})=>
          {
            return (
              <View className="flex justify-center items-center" style={{
                backgroundColor:'transparent' , 
                width:'60' , 
                height:'55',
                display : 'flex',
                // flexDirection : 'column',
                justifyContent:'center',
                alignItems :'center'
                
              }}>

              <View>
                {
                  focused ? 
                  <FontAwesome name="search" size={26} color={focusedColor} /> : 
                  <FontAwesome name="search" size={26} color="black" /> 
                }
              </View>
              <Text style={{
                fontWeight:'500',
                color : focused ? focusedColor : 'black',
                fontSize:12
              }} >Search</Text>
              </View>
            )
          }
            }} ></Tabs.Screen>
          <Tabs.Screen name='playlist' options={{headerShown:false, tabBarIcon : ({focused,color,size})=>
          {
            return (
              <View className="flex justify-center items-center" style={{
                backgroundColor:'transparent' , 
                width:'60' , 
                height:'55',
                display : 'flex',
                // flexDirection : 'column',
                justifyContent:'center',
                alignItems :'center'
                
              }}>

              <View>
                {
                  focused ? 
                  <Feather name="list" size={26} color={focusedColor} /> : 
                  <Feather name="list" size={26} color="white" />
                }
              </View>
              <Text style={{
                color : focused ? {focusedColor} : 'white',
                fontSize:12
              }}>Playlist</Text>
              </View>
            )
          }
            }}></Tabs.Screen>
          
   <Tabs.Screen name='add_codes' options={{headerShown:false, tabBarIcon : ({focused,color,size})=>
          {
            return (
              <View className="flex justify-center rounded-full bg-[#d19419] items-center" style={{
                top:-23,
                width:'55' , 
                height:'55',
                display : 'flex',
                // flexDirection : 'column',
                justifyContent:'center',
                alignItems :'center'
                
              }}>

              <View>
                {
                  focused ? 
                  <AntDesign name="plus" size={26} color={"black"} /> : 
                  <AntDesign name="plus" size={26} color="white" />
                }
              </View>
           
              </View>
            )
          }
            }} ></Tabs.Screen>

            <Tabs.Screen name='tags' options={{headerShown:false, tabBarIcon : ({focused,color,size})=>
          {
            return (
              <View className="flex justify-center items-center" style={{
                backgroundColor:'transparent' , 
                width:'60' , 
                height:'55',
                display : 'flex',
                // flexDirection : 'column',
                justifyContent:'center',
                alignItems :'center'
                
              }}>

              <View>
                {
                  focused ? 
                  <FontAwesome5 name="hashtag" size={26} color={focusedColor} /> : 
                  <FontAwesome5 name="hashtag" size={26} color="white" />
                }
              </View>
              <Text style={{
                color : focused ? focusedColor : 'white',
                fontSize:12
              }}>Tags</Text>
              </View>
            )
          }
            }} ></Tabs.Screen>
         
            <Tabs.Screen name='code'  options={{headerShown:false,href:null, tabBarIcon : ({focused,color,size})=>
          {
            return (
              <View className="flex justify-center items-center" style={{
                backgroundColor:'transparent' , 
                width:'60' , 
                height:'55',
                display : 'flex',
                // flexDirection : 'column',
                justifyContent:'center',
                alignItems :'center'
                
              }}>

              <View>
                {
                  focused ? 
                  <MaterialCommunityIcons name="gender-male-female" size={24} color={focusedColor} /> : 
                  <MaterialCommunityIcons name="gender-male-female" size={24} color="black" />
                }
              </View>
              <Text style={{
                color : focused ? focusedColor : 'black'
              }}>Code</Text>
              </View>
            )
          }
            }} ></Tabs.Screen>
            <Tabs.Screen name='casts'  options={{headerShown:false, tabBarIcon : ({focused,color,size})=>
          {
            return (
              <View className="flex justify-center items-center" style={{
                backgroundColor:'transparent' , 
                width:'60' , 
                height:'55',
                display : 'flex',
                // flexDirection : 'column',
                justifyContent:'center',
                alignItems :'center'
                
              }}>

              <View>
                {
                  focused ? 
                  <MaterialCommunityIcons name="gender-male-female" size={24} color={focusedColor} /> : 
                  <MaterialCommunityIcons name="gender-male-female" size={24} color="white" />
                }
              </View>
              <Text style={{
                color : focused ? focusedColor : 'white',
                fontSize:12
              }}>Casts</Text>
              </View>
            )
          }
            }} ></Tabs.Screen>
        <Tabs.Screen name='jveel'  options={{headerShown:false, href:null, tabBarIcon : ({focused,color,size})=>
          {
            return (
              <View className="flex justify-center items-center" style={{
                backgroundColor:'transparent' , 
                width:'60' , 
                height:'55',
                display : 'flex',
                // flexDirection : 'column',
                justifyContent:'center',
                alignItems :'center'
                
              }}>

              <View>
                {
                  focused ? 
                  <MaterialCommunityIcons name="gender-male-female" size={24} color={focusedColor} /> : 
                  <MaterialCommunityIcons name="gender-male-female" size={24} color="white" />
                }
              </View>
              <Text style={{
                color : focused ? focusedColor : 'white',
                fontSize:12
              }}>Jveel</Text>
              </View>
            )
          }
            }} ></Tabs.Screen>
            
      </Tabs>
    </SQLiteProvider>
    )}
    </GestureHandlerRootView>

  )
}

export default _layout