import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as SQLite from 'expo-sqlite';
import Item from '../components/item';
import { Storage } from 'expo-sqlite/kv-store';

const search = () => {
  const [status, setStatus] = useState('start');
  const db = SQLite.useSQLiteContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [bulk, setBulk] = useState(false);
  const [bulkValue,setBulkValue] = useState("");
  const [txtinput, setTxtinput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchPress, setSearchPress] = useState(false);
  const [bulkStatus,setBulkStatus] = useState(0);
  const [finalBulkValue,setFinalBulkValue] = useState("");

  const pause = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function set_bulk_video_storage(codes){
    try {
      const result = await Storage.getItem("code_list");  
      let jav_codes = codes.split(",");
      if(!result)
      {
        await Storage.setItem("code_list","");
      }
      const final_result = result.split(",");
      jav_codes = [...new Set([...final_result,...jav_codes])];  
      await Storage.setItem("code_list",jav_codes.join(","));
    } catch (error) {
      console.log(error);
    }
  }

  async function bulkValueCorrect(codes)
  {
    try {
      
      let nw_codes = codes.split(",");
      nw_codes = nw_codes.filter(code__ => code__ !== "" );
      console.log('nw_codes:',nw_codes)
      // await pause(2000);
      const value = nw_codes.map(__code__ => {
        if(__code__ === "") return "";
        const cleanedCode = __code__.replace(/\s+/g, '');
        const match = cleanedCode.match(/^([a-zA-Z]+)(\d+)$/);
        if (match) {
          const letters = match[1].toUpperCase();
        const numbers = match[2];
        return `${letters}-${numbers}`;
      }
      return __code__;
    });
    console.log('fgfgfg',value)
    setFinalBulkValue(value.join(","));
  } catch (error) {
    console.log(error);
  }
  }


  return (
    <SafeAreaProvider className="h-full bg-neutral-700">
      <SafeAreaView className="bg-neutral-800 w-screen flex-1 justify-center items-center h-full">
        <StatusBar backgroundColor='transparent'></StatusBar>
      
        {/* add in bulk */}

        { 
          <View className=' absolute  flex gap-3  bg-neutral-900 rounded-2xl w-[calc(90%)] m-6 z-20 h-auto p-4 '  >
            <View className='h-16 mt-2 w-screen z-20 flex justify-center items-center ' >
                <Text className='text-white ' style={{fontFamily: 'Nunito_700Bold', fontSize: 30}}>Add Codes</Text>
            </View>
            {
               bulkStatus === 0 ? 
               <TextInput 
               style={{
                 textAlignVertical: 'top',
                 color:'lightgray'
               }}
               multiline={true}
               value={bulkValue}
               onChangeText={(text)=>{setBulkValue(text)}}
               numberOfLines={12}   className='w-fit h-80 rounded-2xl bg-neutral-700 text-wrap' ></TextInput> :
              bulkStatus === 1
              ?
               <View className='w-full h-80' >
                 <Text className='text-white text-wrap' >{finalBulkValue}</Text>
               </View>
               :
               <View className='w-full h-full' >
                 <ActivityIndicator size="large" color="#d1d5db" />
               </View>
            }
            <Pressable className=' w-fit h-fit rounded-xl'  onTouchEnd={()=>{
              if(bulkStatus === 0) // TextInput
              {
                setBulkStatus(2);
                // console.log("ffffff",bulkValue)
                bulkValueCorrect(bulkValue);
                setBulkStatus(1);
              }
              else if(bulkStatus === 1) // Corrected Values
              {
                setBulkStatus(2);
                // Add to database
                const codes = finalBulkValue.split(",");
                // console.log("adding to db",codes);
                set_bulk_video_storage(finalBulkValue);
                setBulkStatus(0);
                setBulk(false);
              }
              // 2 is loading
            }} >
              <Text className='text-white rounded-xl p-3 text-center bg-yellow-700 ' >Add To Database {finalBulkValue.length > 0 && finalBulkValue.split(',').length }</Text>
            </Pressable>
        </View>
        }
        
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default search