import React, { useRef, useState, useCallback, useEffect } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'
import { VideoView, useVideoPlayer } from 'expo-video'
import { useIsFocused } from '@react-navigation/native'
import VideoScreen from '../../components/video_box'

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

const Index = () => {
  const isFocused = useIsFocused()

  const [reels, setReels] = useState([
    { id: 1, uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 2, uri: 'https://www.w3schools.com/html/movie.mp4' },
    { id: 3, uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 4, uri: 'https://www.w3schools.com/html/movie.mp4' },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)

  // 🔥 Infinite Load More
  const loadMore = () => {
    const nextId = reels.length + 1
    const newData = Array.from({ length: 4 }).map((_, i) => ({
      id: nextId + i,
      uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    }))
    setReels(prev => [...prev, ...newData])
  }

//   const onViewableItemsChanged_ = useRef(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index)
//     }
//   }).current

//   const viewabilityConfig_ = {
//     itemVisiblePercentThreshold: 80,
//   }

  const renderItem = ({ item, index }) => {
    const isActive = index === currentIndex && isFocused

    // const player = useVideoPlayer(item.uri, player => {
    //   player.loop = true
    // })

    // useEffect(() => {
    //   if (isActive) {
    //     player.play()
    //   } else {
    //     player.pause()
    //   }
    // }, [isActive])

    return (
      <View
        style={{
          height: screenHeight,
          width: screenWidth,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <VideoView
          style={{ height: '100%', width: '100%' }}
          player={player}
          contentFit="cover"
        /> */}
        <VideoScreen videoSource={item.uri}></VideoScreen>

        <View style={{ position: 'absolute', bottom: 100, left: 20 }}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            Reel #{item.id}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      data={reels}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      snapToAlignment="start"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      windowSize={3}
      removeClippedSubviews
    //   onViewableItemsChanged={onViewableItemsChanged_}
    //   viewabilityConfig={viewabilityConfig_}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  )
}

export default Index