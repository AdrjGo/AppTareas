"use client"

import React, { useState } from "react"
import { TouchableOpacity, Text, Image, View, Alert, ActivityIndicator } from "react-native"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, firestore } from "../config/firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore"


const LoginWithGoogle = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    if (isLoading) return 

    try {
      setIsLoading(true)
      console.log("Iniciando autenticación con Google...")

      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      if (!result.user) throw new Error("Error al iniciar sesión con Google")

      console.log("Usuario autenticado:", result.user.email)

    
      const userRef = doc(firestore, "users", result.user.uid)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          username: result.user.email?.split("@")[0] || "usuario",
          email: result.user.email,
          avatar: result.user.photoURL || "default.png",
        })
        console.log("Usuario registrado en Firestore")
      } else {
        console.log("Usuario ya existe en Firestore")
      }

      navigation.navigate("Main")
      console.log("Redirigiendo a la pantalla principal...")

    } catch (error) {
      console.error("Error en autenticación con Google:", error)
      Alert.alert("Error", "No se pudo completar el inicio de sesión con Google")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="items-center mt-4">
      <Text className="text-gray-400 mb-2">O continuar con</Text>
      <TouchableOpacity
        className="bg-white flex-row items-center justify-center p-3 rounded-lg w-full"
        onPress={handleGoogleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#4285F4" style={{ marginRight: 10 }} />
        ) : (
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png",
            }}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
        )}
        <Text className="text-gray-800 font-bold ">
          {isLoading ? "Conectando..." : "Iniciar con Google"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginWithGoogle
