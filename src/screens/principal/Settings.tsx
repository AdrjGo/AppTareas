import { Alert, Text, View, ScrollView, TouchableOpacity } from "react-native"
import { getAuth, signOut } from "firebase/auth"
import {appFirebase} from "@/config/firebaseConfig"
import { Feather } from "@expo/vector-icons"

export default function Settings(props: any) {
  const handleLogout = async () => {
    try {
      await signOut(getAuth(appFirebase))
      Alert.alert("Sesión cerrada", "Has cerrado la sesión")
      props.navigation.replace("Login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-[#1E2A47] p-4">
        <Text className="text-sm font-medium text-white">Nombre del usuario</Text>
      </View>

      {/* Profile Info */}
      <View className="bg-[#1E2A47] p-4 pb-6 items-center">
        <View className="w-16 h-16 bg-[#E25C33] rounded-full items-center justify-center">
          <Text className="text-lg font-medium text-white">AC</Text>
        </View>
        <View className="mt-2 items-center">
          <Text className="text-gray-400 text-sm">@usuario</Text>
          <Text className="font-medium text-white">Usuario@gmail.com</Text>
          <Text className="text-xs text-gray-400 mt-1">Usuario de Name desde agosto de 2024</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 bg-[#121212]">
        {/* Workspaces Section */}
        <View className="px-4 py-3">
          <Text className="text-sm font-medium text-white mb-2">Tus Espacios de trabajo</Text>
          <View className="space-y-3">
            <View className="flex-row items-center gap-3">
              <Feather name="user" size={18} color="#9ca3af" />
              <Text className="text-sm text-white">Usuario</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Feather name="briefcase" size={18} color="#9ca3af" />
              <Text className="text-sm text-white">Espacio de trabajo</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Feather name="briefcase" size={18} color="#9ca3af" />
              <Text className="text-sm text-white">Espacio de trabajo</Text>
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View className="px-4 py-3 border-t border-gray-800">
          <Text className="text-sm font-medium text-white mb-2">Cuenta</Text>
          <View className="space-y-3">
            <View className="flex-row items-center gap-3">
              <Feather name="user" size={18} color="#9ca3af" />
              <Text className="text-sm text-white">Perfil y visibilidad</Text>
            </View>
            <TouchableOpacity className="flex-row items-center gap-3" onPress={handleLogout}>
              <Feather name="log-out" size={18} color="#9ca3af" />
              <Text className="text-sm text-white">Cerrar sesión</Text>
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <Feather name="bell" size={18} color="#9ca3af" />
              <Text className="text-sm text-white">Conviértete en evaluador de versiones beta</Text>
            </View>
          </View>
        </View>

        {/* Browser Management Section */}
        <View className="px-4 py-3 border-t border-gray-800">
          <View className="flex-row items-center gap-3">
            <Feather name="globe" size={18} color="#9ca3af" />
            <View>
              <Text className="text-sm text-white">Gestionar cuentas en navegador</Text>
              <Text className="text-xs text-gray-400 mt-1">
                Revisar las cuentas que tengan la sesión iniciada y quitarlas del navegador
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

