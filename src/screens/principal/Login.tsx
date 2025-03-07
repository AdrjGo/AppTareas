"use client"

import ButtonOpacity from "@/components/common/buttons/ButtonOpacity"
import Input from "@/components/common/inputs/Input"
import { useState } from "react"
import { Alert, Text, View, Image, TouchableOpacity, ScrollView } from "react-native"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { appFirebase } from "@/config/firebaseConfig"
import ButtonLigth from "@/components/common/buttons/ButtonLigth"

const auth = getAuth(appFirebase)

export default function Login(props: any) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      props.navigation.replace("Main")
    } catch (error) {
      console.log(error)
      Alert.alert("¡Ups!", "Algo no está bien. Revisa tu correo y contraseña e inténtalo de nuevo.")
    }
  }

  const handleRegister = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      Alert.alert("Usuario registrado", `Bienvenido ${user.email}`)
      props.navigation.navigate("Main")
    } catch (error) {
      console.log(error)
      Alert.alert(
        "Correo ya registrado",
        "Parece que ya estuviste aquí antes. Ese correo ya está registrado, prueba iniciar sesión.",
      )
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-[#1E2A47]"
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} // Asegura que el contenido esté centrado
    >
      <View className="px-5 py-10 items-center">
        {/* Logo y nombre de la app */}
        <Text className="text-2xl font-bold text-white mb-2">photo</Text>

        {/* Avatar */}
        <View className="w-24 h-24 bg-yellow-400 rounded-full overflow-hidden mb-6">
          <View className="w-full h-16 bg-purple-600 absolute bottom-0" />
        </View>

        <Text className="text-4xl text-center font-extrabold text-white mb-6">Iniciar Sesión</Text>

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
          <ButtonOpacity text="Iniciar Sesión" colorBg="green" onPress={handleLogin} colorText="blanco" />
          <ButtonLigth
            text="Registrarse"
            colorText="green"
            textAlign="center"
            textSize="medium"
            onPress={handleRegister}
          />
        </View>

        {/* Botón de Google */}
        <TouchableOpacity
          className="bg-blue-500 rounded-lg py-3 px-4 flex-row items-center justify-center space-x-2 w-full"
          onPress={() => Alert.alert("Google", "Botón de Google presionado")}
        >
          <Image 
            source={{ uri: "https://www.google.com/favicon.ico" }} 
            style={{ width: 20, height: 20 }} 
          />
          <Text className="text-white font-medium">Continuar con Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}