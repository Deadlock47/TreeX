import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
  ToastAndroid
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Storage } from 'expo-sqlite/kv-store';
import axios from 'axios';
import { Feather, Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
const { documentDirectory } = require('expo-file-system');
const FileSystem = require('expo-file-system');
const { width } = Dimensions.get('window');
const POPUP_WIDTH = width * 0.75;

export default function LeftPane({isOpen, setIsOpen}) {
  const translateX = useSharedValue(-POPUP_WIDTH);

  const togglePopup = () => {
    if (!isOpen) {
      setIsOpen(true);
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      translateX.value = withTiming(-POPUP_WIDTH, {
        duration: 250,
      });
      setTimeout(() => setIsOpen(false), 250);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleCodesUpload = async () => {
    // read fron json bin   69a2705bae596e708f514788
    const BIN_ID = "69a270df43b1c97be9a57a18";
    const headers = {
      "X-Master-Key":
        "$2a$10$nBKL.pkkw5.oXwEHSWyPBO6KgMJNRY4LJcLu8HVsO.ggbU2VvODtW",
      "Content-Type": "application/json",
    };
    const write_url = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
    const read_url = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest?meta=false`;

    console.log("=====================================");
    let req = new XMLHttpRequest();
    let data;
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log("Request Accepted", req.responseText);
        data = JSON.parse(req.responseText);
        // data = JSON.parse(req.responseText);
      }
    };

    req.open("GET", read_url, true);
    req.setRequestHeader("X-Master-Key", headers["X-Master-Key"]);
    await req.send();
    while (!data) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // ===============================================
    const result = await Storage.getItem("code_list");
    console.log(result, typeof result);
    let initial_array = data && data["codes"] ? data["codes"] : [];
    console.log("Data length Before", result.split(",").length);
    let final_array = [...initial_array, ...result.split(",")];
    final_array = [...new Set(final_array)];
    // fetch codes at present in database and upload to json bin
    console.log("Data length After", final_array.length);
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
      }
    };

    // upload to json bin and get the url and show in alert to user
    req = new XMLHttpRequest();
    req.open("PUT", write_url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", headers["X-Master-Key"]);
    req.send(JSON.stringify({ codes: final_array }));

    // axios.put(write_url, {codes: final_array}, headers=headers)
    Alert.alert(
      "Notifications",
      `Initial : ${initial_array.length} 
      Codes Added : ${final_array.length - initial_array.length}`,
    );
  };

  const handleTrailerData = async () => {
     // read fron json bin   69a2705bae596e708f514788
    const BIN_ID = "69a2705bae596e708f514788";
    const headers = {
      "X-Master-Key":
        "$2a$10$nBKL.pkkw5.oXwEHSWyPBO6KgMJNRY4LJcLu8HVsO.ggbU2VvODtW",
      "Content-Type": "application/json",
    };
    const write_url = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
    const read_url = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest?meta=false`;

    console.log("=====================================");
    let req = new XMLHttpRequest();
    let data;
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log("Request Accepted", req.responseText);
        data = JSON.parse(req.responseText);
        // data = JSON.parse(req.responseText);
      }
    };

    req.open("GET", read_url, true);
    req.setRequestHeader("X-Master-Key", headers["X-Master-Key"]);
    req.send();
    while (!data) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.log(data)
    Storage.setItem("trailer_data", JSON.stringify(data));
    ToastAndroid.show('Trailer Data Updated', ToastAndroid.SHORT);

  };

  const handleProfile = () => {
    Alert.alert('Profile', 'View your profile');
  };



  return (
    <View className="flex-1  justify-center h-full w-full items-center">
      {/* Trigger Button */}
     

      {/* Modal with Popup */}
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={togglePopup}
      >
        <View className="flex-row justify-between rounded-full items-center p-5 ">
            <Entypo onPress={()=>{
             togglePopup();
            }} name="cross" size={34} color="black" className="bg-[#f8f8f8] rounded-2xl p-2" />
        </View>
        {/* Overlay */}
        <TouchableOpacity
          className="flex-1 bg-black"
          activeOpacity={1}
          onPress={togglePopup}
        >
          {/* Animated Popup */}
          
            
          <View className="flex-1 flex-col " >
          

            {/* Menu Items */}
            <View className="p-4 flex-1 flex-col gap-3">
            
                <TouchableOpacity
                  className="flex-row h-16 items-center  p-4 rounded-xl mb-2 bg-gray-50"
                  onPress={handleProfile}
                >
                  <Ionicons name="filter" size={24} color="#8B5CF6" />
                  <Text className="text-lg text-gray-700 ml-4 font-medium flex-1">
                    Sort
                  </Text>
                  
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-row h-16 items-center p-4 rounded-xl mb-2 bg-gray-50"
                  onPress={handleProfile}
                >
                  <Ionicons name="refresh" size={24} color="#8B5CF6" />
                  <Text className="text-lg text-gray-700 ml-4 font-medium flex-1">
                    Refresh
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-row h-16 items-center p-4 rounded-xl mb-2 bg-gray-50"
                  onPress={handleCodesUpload}
                >
                  {/* <Ionicons name="refresh" size={24} color="#8B5CF6" /> */}
                  <Ionicons name="cloud-upload-outline" size={24} color="black" />
                  <Text className="text-lg text-gray-700 ml-4 font-medium flex-1">
                    Upload Codes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-row h-16 items-center p-4 rounded-xl mb-2 bg-gray-50"
                  onPress={handleTrailerData}
                >
                  {/* <Ionicons name="refresh" size={24} color="#8B5CF6" /> */}
                  <Ionicons name="cloud-download-outline" size={24} color="black" />
                  <Text className="text-lg text-gray-700 ml-4 font-medium flex-1">
                    Update TFiles
                  </Text>
                </TouchableOpacity>

            </View>

              {/* Footer */}
            <View className="p-5 relative bottom-2 border-t border-gray-200 items-center">
              <Text className="text-xs text-gray-400">Version 1.0.0</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}