import ButtonNative from "@/components/common/buttons/ButtonNative";
import React from "react";
import { Alert, Text, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "@/config/firebaseConfig";

export default function Settings(props: any) {
  const handleLogout = async () => {
    try {
      await signOut(getAuth(appFirebase));
      Alert.alert("Sesión cerrada", "Has cerrado la sesión");
      props.navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Text className="text-white"> Ajustes </Text>
      <ButtonNative
        title="Cerrar Sesión"
        colorText="danger"
        onPress={handleLogout}
      />
    </View>
  );
}
