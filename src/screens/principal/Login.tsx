"use client";

import ButtonOpacity from "@/components/common/buttons/ButtonOpacity";
import Input from "@/components/common/inputs/Input";
import { useState, useEffect } from "react";
import { Alert, Text, View, ScrollView, ActivityIndicator } from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { appFirebase } from "@/config/firebaseConfig";
import ButtonLigth from "@/components/common/buttons/ButtonLigth";
import LoginWithGoogle from "./LoginGoogle";

const auth = getAuth(appFirebase);

export default function Login(props: any) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario ya autenticado:", user.email);
        props.navigation.replace("Main");
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña");
      return;
    }

    try {
      setIsLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso:", user.email);
      props.navigation.replace("Main");
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "¡Ups!",
        "Algo no está bien. Revisa tu correo y contraseña e inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña");
      return;
    }

    try {
      setIsLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Usuario registrado", `Bienvenido ${user.email}`);
      props.navigation.navigate("Main");
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Correo ya registrado",
        "Parece que ya estuviste aquí antes. Ese correo ya está registrado, prueba iniciar sesión."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (initializing) {
    return (
      <View className="flex-1 bg-[#1E2A47] justify-center items-center">
        <ActivityIndicator size="large" color="#3ac867" />
        <Text className="text-white mt-4">Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[#1E2A47]"
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View className="px-5 py-10 items-center">
        {/* Logo y nombre de la app */}
        <Text className="text-2xl font-bold text-white mb-2">photo</Text>

        {/* Avatar */}
        <View className="w-24 h-24 bg-yellow-400 rounded-full overflow-hidden mb-6">
          <View className="w-full h-16 bg-purple-600 absolute bottom-0" />
        </View>

        <Text className="text-4xl text-center font-extrabold text-white mb-6">
          Iniciar Sesión
        </Text>

        {/* Campos de entrada */}
        <View className="w-full mb-6">
          <Input
            placeholder="ejemplo@gmail.com"
            label="Correo"
            keyboardType="email-address"
            onChangeTexto={setEmail}
          />
          <Input
            label="Contraseña"
            isPassword={true}
            onChangeTexto={setPassword}
          />
        </View>

        {/* Botones de inicio de sesión y registro */}
        <View className="w-full mb-4">
          <ButtonOpacity
            text="Iniciar Sesión"
            colorBg="green"
            colorText="blanco"
            onPress={handleLogin}
           
          />

          <ButtonLigth
            text="Registrarse"
            colorText="green"
            textAlign="center"
            textSize="medium"
            onPress={handleRegister}
         
          />
        </View>

        {/* Componente de inicio de sesión con Google */}
        <LoginWithGoogle navigation={props.navigation} />
      </View>
    </ScrollView>
  );
}