import { CameraView, useCameraPermissions } from 'expo-camera';
import { Camera, CameraType } from 'expo-camera/legacy';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, ActivityIndicator } from 'react-native';
import IconButtonComponent from './IconButtonComponent';
import { useIsFocused } from '@react-navigation/native';
import DiscardSvg from '../../../assets/Icons/Grupo_3868.svg'; 
import FlipSvg from '../../../assets/Icons/Grupo_3869.svg'; 
import { useRouter,useNavigation } from 'expo-router';

export default function CameraComponent({ redirect, data }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const options = [{ base64: true }];
  const isFocused = useIsFocused();
  const { push } = useRouter();
  const navigation = useNavigation();

  const cameraRef = useRef(null);

  const RPH = (percentage) => (percentage / 100) * screenHeight;
  const RPW = (percentage) => (percentage / 100) * screenWidth;

  const boxWidth = RPW(100);
  const boxHeight = RPH(70);
  const boxOptionsHeight = RPH(20);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true); // Start loading indicator
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.3, // Reduce quality for faster processing
        });

        const updatedData = { ...data, photo: photo.base64 };

        
         navigation.navigate('home/farmer/previwerPic', { data: JSON.stringify(updatedData) });
        // push({
        //   pathname: "/home/farmer/previwerPic",
        //   params: {
        //     data: JSON.stringify(updatedData),
        //   },
        // });
      } catch (error) {
        console.error("Error taking picture: ", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    }
  };

  return (
    <View style={styles.container}>
    {isFocused && (
      <>
        <Camera
          ratio='16:9'
          ref={cameraRef}
          style={{ width: boxWidth, height: boxHeight }}
          type={facing}
        >
          <View style={styles.buttonContainer}></View>
        </Camera>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", height: boxOptionsHeight, paddingHorizontal: "14%" }}
          className="items-center"
        >
          <IconButtonComponent svg={DiscardSvg} iconSize={14} color="#000" border={3} borderColor="black" action={() => {}} size={30} />
          <IconButtonComponent color="gray" border={6} borderColor="black" action={takePicture} size={60} />
          <IconButtonComponent svg={FlipSvg} iconSize={14} color="#000" border={3} borderColor="black" action={toggleCameraFacing} size={30} />
        </View>
      </>
    )}

    {loading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5CA439" />
      </View>
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex:1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
