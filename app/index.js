
import { View, Text, ScrollView, Image, Switch, RefreshControl,Dimensions, Alert, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import { Storage } from 'expo-sqlite/kv-store';
import * as Clipboard from 'expo-clipboard';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import LeftPane from '../components/leftPane';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Item from '../components/item';

const index = () => {
    const [jav_list , setJav_list] = useState([]);
    const [refreshing,setRefreshing] = useState(true);
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
    const [isThumbT, setIsThumbT] = useState(false);
    async function refresh_data()
    {
      const result = await Storage.getItem("code_list");
      // console.log(result);
      //
      await Storage.clear();
      await Clipboard.setStringAsync(result);
      

    }

    async function get_jav_lists() {
      const lists = await Storage.getItem("code_list");
      console.log(lists)
      if(!lists)
      {
         await Storage.setItem("code_list","");
      }

      setJav_list(lists.split(",").reverse());
      // console.log(jav_list)
      // let code_lists = await Storage.getItem("code_list");
      setRefreshing(false);
    }

    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(()=>{
      get_jav_lists();
    },[])
  return (
     <SafeAreaProvider className='h-screen mt-10 bg-neutral-700'>
      <View className=" pt-10 bg-neutral-900 w-screen h-full" >
          <StatusBar hidden={true} translucent={true} ></StatusBar>
          <LeftPane isOpen={isOpen} setIsOpen={setIsOpen} ></LeftPane>
          <View className="flex-row items-center justify-between mb-1  pt-4 px-3   " >
            <Entypo onPress={()=>{
       
                // Alert.alert("Refresh","Are you sure you want to refresh the data?",
                //   [
                //     {
                //       text: 'NO',
                //       onPress: () => ToastAndroid.show('Cancel Pressed', ToastAndroid.SHORT),
                //       style: 'cancel',
                //     },
                //     {
                //       text: 'YES',
                //       onPress: () => {
                //         refresh_data()
                //         ToastAndroid.show('Data Refreshed and Copied', ToastAndroid.SHORT);
                //         setRefreshing(true);
                //         setRefreshing(false);
                //       }
                
                //     }
                //   ],

                // )
                setIsOpen(!isOpen);
            }} className="bg-[#ca9401] rounded-2xl p-1" name="menu" size={40} color="white" />
            <Feather onPress={()=>{
                router.push("/searchScreen")
            }} name="search" size={34} color="white" className="bg-[#ca9401] rounded-2xl p-2" />
            
          </View>
          {/* <View className="h-px bg-gray-200 my-2" /> */}
         
          {/* <View className='flex justify-end pl-3 pt-2 w-screen '>
            <View className='' >
              <Text className='text-neutral-300 p-1' >Results : {jav_list.length-1}</Text>
            </View>
          </View> */}
          <ScrollView className = "w-screen p-2  h-fit "
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={get_jav_lists} ></RefreshControl>}
            
          >
             {
                  jav_list.map((item,index)=>item !== "" && <Item code={item} key={index} thumb={isThumbT} ></Item>)
                }
                {/* <Item code={'start255'}></Item> */}
                <View className='mb-10' ></View>
          </ScrollView>

      </View>
    </SafeAreaProvider>
  )
}

export default index