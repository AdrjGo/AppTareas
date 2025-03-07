import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { IconSymbol } from "../ui/IconSymbol";
import ButtonOpacity from "./buttons/ButtonOpacity";
import ButtonLigth from "./buttons/ButtonLigth";

interface Props {
  icon: any;
  animationType?: "none" | "slide" | "fade";
  children?: any;
  buttonChildren?: any;
}

function Modals({ icon, animationType, children, buttonChildren }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal
          animationType={animationType}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          {
            <View className="flex-1 items-center justify-center">
              <View className="bg-gray-common rounded-lg p-4 ">
                {children}
                <ButtonOpacity
                  colorBg="red"
                  colorText="blanco"
                  rounded="medium"
                  textFont="medium"
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  Cerrar
                </ButtonOpacity>
              </View>
            </View>
          }
        </Modal>
        <ButtonOpacity
          onPress={() => setModalVisible(true)}
          className={"items-right"}
        >
          <IconSymbol name={icon} color="white" style={{ fontSize: 25 }} />
          {buttonChildren}
        </ButtonOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Modals;
