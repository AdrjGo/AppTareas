import ButtonOpacity from "@/components/common/buttons/ButtonOpacity";
import Input from "@/components/common/inputs/Input";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import appFirebase from "@/config/firebaseConfig";
import ButtonLigth from "@/components/common/buttons/ButtonLigth";

const auth = getAuth(appFirebase);

export default function Login(props: any) {
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      // Alert.alert("Usuario logueado", `Bienvenido ${user.email}`);
      props.navigation.replace("Main");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "¡Ups!",
        "Algo no está bien. Revisa tu correo y contraseña e inténtalo de nuevo."
      );
    }
  };

  const handleRegister = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      Alert.alert("Usuario registrado", `Bienvenido ${user.email}`);
      props.navigation.navigate("Main");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Correo ya registrado",
        "Parece que ya estuviste aquí antes. Ese correo ya está registrado, prueba iniciar sesión."
      );
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
        <ButtonLigth
          text="Registrarse"
          colorText="verde"
          onPress={handleRegister}
        />
      </View>
    </View>
  );
}
