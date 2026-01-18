import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Feather, Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
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

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings clicked!');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'You have 3 new notifications!');
  };

  const handleProfile = () => {
    Alert.alert('Profile', 'View your profile');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          togglePopup();
          setTimeout(() => {
            Alert.alert('Logged out successfully');
          }, 300);
        },
      },
    ]);
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
                  onPress={handleNotifications}
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