// React and React Native
import { View, Text, ScrollView, Dimensions, Image, Pressable, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Storage } from 'expo-sqlite/kv-store';
import { Nunito_400Regular, useFonts } from '@expo-google-fonts/nunito';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

let { width, height } = Dimensions.get('window');

const index = () => {

  let [fontsLoaded] = useFonts({
    // Inter_900Black,
    // Roboto_400Regular,
    Nunito_400Regular
  });

  const [refreshing,setRefreshing] = useState(true);
  const [actress_list,setActress_list] = useState([]);

  async function get_Actress_list(){
    const result = await Storage.getItem("actress_list")
    // console.log(result)
    let res = result.split(',');
    console.log(res[0]);
    let sorted_res =res.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
          });
        
    setActress_list(sorted_res);
    setRefreshing(false);
  }
  useEffect(()=>{
    get_Actress_list()
    // console.log("list list",actress_list)

  },[]);

  return (
    <SafeAreaView className=" bg-neutral-900 w-screen h-full" >
      <StatusBar style='auto' ></StatusBar>
      <View className='h-16 mt-2 w-screen' >
                <Text className='text-white text-center' style={{fontFamily: 'Nunito_700Bold', fontSize: 30}}>Actress</Text>
      </View>
      
      { 
      actress_list.length > 0 && 
      <ScrollView
        className='p-5 w-full h-auto mb-safe-or-16  bg-neutral-900   '
        
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={get_Actress_list} />
        }
      >
        <View className='flex-row flex-wrap gap-2 mb-10 justify-start items-center'>

        {
          actress_list.map((item,index)=><Actress_Item key={index} item={item} ></Actress_Item>)
        }
        </View>
      </ScrollView>
      }
    
    </SafeAreaView>
  )
}

const Actress_Item= (props)=>{
  const txt = props.item;
  const [data,setData] = useState();

  let [fontsLoaded] = useFonts({
        // Inter_900Black,
        // Roboto_400Regular,
        Nunito_400Regular
      });

  async function get_actress_data(txt) {
    const result = await Storage.getItem(txt.toString());
    setData(JSON.parse(result))
    // console.log(result)
  }
  useEffect(()=>{
    get_actress_data(txt);
  },[])
  return (
    
    <Pressable 
        onTouchEnd={()=>{
          router.push({pathname : `/casts/${txt}`,params :{image : data.image , name : data.name}})
        }}
        className=' p-1 flex '
        width={width * 0.29}
        height = {height * 0.19}
    >
      <View className='h-fit   flex justify-center items-center rounded-xl  overflow-hidden ' >
        {
          data?.image &&
          <View className=' rounded-xl overflow-hidden ' > 

            <Image width={90} height={90}  source={{uri : data?.image}} ></Image>
          </View>
          // <Image width={90} height={90}  source={require("../../assets/no_image_actress.jpg")} ></Image>

        }
      <Text className='text-white pt-2 text-center text-wrap' adjustsFontSizeToFit={true}
numberOfLines={2} style={{fontFamily: 'Nunito_400Regular', fontSize: 13}} >{data?.name}</Text>
      </View>          
      
    </Pressable>
  )
}

export default index