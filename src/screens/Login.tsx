import ButtonOpacity from "@/components/common/buttons/ButtonOpacity";
import Input from "@/components/common/inputs/Input";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import appFirebase from "@/config/firebaseConfig";
import ButtonLigth from "@/components/common/buttons/ButtonLigth";

const auth = getAuth(appFirebase);

export default function Login(props: any) {
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Usuario logueado", `Bienvenido ${user.email}`);
      props.navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Correo o contraseña incorrecta");
    }
  };

  return (
    <View className=" my-10 mx-5 pt-10">
      <Text className="text-4xl text-center font-extrabold text-white">
        Iniciar Sesión
      </Text>
      <View className="my-10">
        <Input
          placeholder="ejemplo@gmail.com"
          label="Correo"
          onChangeTexto={(e: any) => {
            setEmail(e);
          }}
        />
        <Input
          label="Contraseña"
          isPassword={true}
          onChangeTexto={(e: any) => {
            setPassword(e);
          }}
        />
      </View>
      <View>
        <ButtonOpacity
          text="Iniciar Sesión"
          colorBg="verde"
          onPress={handleLogin}
          colorText="blanco"
        />
        <ButtonLigth text="Registrarse" colorText="verde" onPress={(e:any) => {Alert.alert("Registro", "En proceso")}} />
      </View>
    </View>
  );
}
