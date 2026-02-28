
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button } from 'react-native';
import Constants from 'expo-constants';


  
export default function VideoScreen({videoSource}) {
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });
  console.log("======================")
  console.log("======================")
  

  // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    
      <VideoView  
      style={styles.video} 
      player={player} 
      allowsFullscreen allowsPictureInPicture />
     
  );
}

const styles = StyleSheet.create({
  contentContainer: {
   flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    padding: 10,
  },
});
