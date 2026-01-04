import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import '../global.css'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SQLiteProvider } from 'expo-sqlite';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const _layout = () => {
  const focusedColor = "rgba(211, 169, 0, 1)"

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
      
    <SQLiteProvider databaseName='maint.db' onInit={initializeDatabase} >
      <Tabs screenOptions={({route})=>({
        tabBarShowLabel : false,
          tabBarStyle:{
            backgroundColor : 'rgba(250, 250, 250, 1)',
            height : 65,
            marginLeft:0,
            marginRight:0,
            borderRadius: 0,
            elevation:0,
            bottom:0,
            position:'absolute',
            left:0,
            right:0,
            display: route.name === 'code' ? 'none' : 'flex'
          },
          tabBarItemStyle:{
            marginTop:8,
            borderRadius:28,
            
          }
          
        })} >
          <Tabs.Screen name='index' options={{headerShown:false, tabBarIcon : ({focused,color,size})=>
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
                  <MaterialIcons name="home-filled" size={26} color={focusedColor} /> : 
                  <Feather name="home" size={26} color="black" /> 
                }
              </View>
              <Text style={{
                color : focused ? focusedColor : 'black',
                fontSize:12
              }}>Home</Text>
              </View>
            )
          }
            }}  ></Tabs.Screen>
          {/* <Tabs.Screen name='content' options={{headerShown:false}} ></Tabs.Screen> */}
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
                  <Feather name="list" size={26} color="black" />
                }
              </View>
              <Text style={{
                color : focused ? {focusedColor} : 'black',
                fontSize:12
              }}>Playlist</Text>
              </View>
            )
          }
            }}></Tabs.Screen>
          
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
                  <FontAwesome5 name="hashtag" size={26} color="black" />
                }
              </View>
              <Text style={{
                color : focused ? focusedColor : 'black',
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
                  <MaterialCommunityIcons name="gender-male-female" size={24} color="black" />
                }
              </View>
              <Text style={{
                color : focused ? focusedColor : 'black',
                fontSize:12
              }}>Casts</Text>
              </View>
            )
          }
            }} ></Tabs.Screen>
            
      </Tabs>
    </SQLiteProvider>
    </GestureHandlerRootView>

  )
}

export default _layout