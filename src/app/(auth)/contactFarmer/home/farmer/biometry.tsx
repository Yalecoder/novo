import { CameraView, useCameraPermissions } from "expo-camera";
import { Camera, CameraType } from "expo-camera/legacy";
import { Fragment, useRef, useState } from "react";
// import { Image } from "expo-image";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import IconButtonComponent from "../../../../../components/ui/IconButtonComponent";
import { useIsFocused, useRoute } from "@react-navigation/native";
import DiscardSvg from "../../../../../../assets/Icons/Grupo_3868.svg";
import FlipSvg from "../../../../../../assets/Icons/Grupo_3869.svg";
import { useRouter, useNavigation } from "expo-router";
import CardComponent from "@/components/ui/Card";
import ButtonComponent from "@/components/ui/Button";
import InformationDialog from "@/components/modal/InformationDialog";
import { createOrUpdateFarmerBiometric } from "@/database/actions/getFarmer";

export default function Biometry() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const options = [{ base64: true }];
  const isFocused = useIsFocused();
  const { push } = useRouter();
  const navigation = useNavigation();
  const [uri, setUri] = useState<string | null>(null);
  const route = useRoute();

  const { farmerId } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const cameraRef = useRef(null);

  const RPH = (percentage) => (percentage / 100) * screenHeight;
  const RPW = (percentage) => (percentage / 100) * screenWidth;

  const boxWidth = RPW(100);
  const boxHeight = RPH(70);
  const boxOptionsHeight = RPH(20);

  const showModal = (message, success) => {
    setModalMessage(message);
    setIsSuccess(success);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  async function sendData() {
    try {
      const response = await createOrUpdateFarmerBiometric(farmerId, uri);

      showModal("Registro adicionado com sucesso!", true);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          A aplicacao precisa de permissoes para a camera.
        </Text>
        <Button onPress={requestPermission} title="Permitir acesso a Camera" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true); // Start loading indicator
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.3, // Reduce quality for faster processing
        });
        setUri(photo?.base64);
        // const updatedData = { ...data, photo: photo.base64 };

        //  navigation.navigate('home/farmer/previwerPic', { data: JSON.stringify(updatedData) });
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

  const renderPicture = () => {
    return (
      <Fragment>
        <View className="p-5 justify-evenly bg-white flex-1">
          <CardComponent className="bg-[#5CA439] h-[65%] p-[0]">
            {/* Display image with conditional rendering */}

            <Image
              className="w-[100%] h-[100%] object-none rounded-sm"
              source={{ uri: "data:image/png;base64," + uri }}
              style={{ borderRadius: 8, height: 370 }}
              resizeMode="cover"
            />
          </CardComponent>

          {/* Button to navigate to the next page */}
          <ButtonComponent
            className="bg-[#5CA439]"
            title="Concluir"
            action={() => {
              sendData();
            }}
            loading={loading}
          />

          {/* Button to go back */}
          <ButtonComponent
            titleClass="text-[#5CA439] font-normal"
            className="border-[#5CA439]  border-2"
            title="Tirar Novamente"
            action={() => {
              setUri(null);
            }}
          />
        </View>
      </Fragment>
    );
  };

  const renderCamera = () => {
    return (
      <>
        <Camera
          ratio="16:9"
          ref={cameraRef}
          style={{ width: boxWidth, height: boxHeight }}
          type={facing}
        >
          <View style={styles.buttonContainer}></View>
        </Camera>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: boxOptionsHeight,
            paddingHorizontal: "14%",
          }}
          className="items-center"
        >
          <IconButtonComponent
            svg={DiscardSvg}
            iconSize={14}
            color="#000"
            border={3}
            borderColor="black"
            action={() => {}}
            size={30}
          />
          <IconButtonComponent
            color="gray"
            border={6}
            borderColor="black"
            action={takePicture}
            size={60}
          />
          <IconButtonComponent
            svg={FlipSvg}
            iconSize={14}
            color="#000"
            border={3}
            borderColor="black"
            action={toggleCameraFacing}
            size={30}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {isFocused && <>{uri ? renderPicture() : renderCamera()}</>}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5CA439" />
        </View>
      )}
      <InformationDialog
        isVisible={isModalVisible}
        message={modalMessage}
        isSuccess={isSuccess}
        onClose={hideModal}
      />
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
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
