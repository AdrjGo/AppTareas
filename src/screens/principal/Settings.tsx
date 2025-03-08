import { Alert, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import appFirebase from "@/config/firebaseConfig";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function Settings(props: any) {
  const [userEmail, setUserEmail] = useState<string>(""); 
  const [userName, setUserName] = useState<string>(""); 
  const auth = getAuth(appFirebase);

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");

        
        if (!user.displayName) {
          const emailPrefix = user.email ? user.email.split("@")[0] : "usuario"; 
          setUserName(emailPrefix); 
        } else {
          setUserName(user.displayName); 
        }
      }
    });
    return unsubscribe; 
  }, []);

  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has cerrado la sesión");
      props.navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Profile Info */}
      <View className="bg-[#1E2A47] p-4 pb-6 items-center">
        <View className="w-16 h-16 bg-[#E25C33] rounded-full items-center justify-center">
          <Text className="text-lg font-medium text-white">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
        <View className="mt-2 items-center">
          <Text className="text-gray-400 text-sm">@{userName || "usuario"}</Text>
          <Text className="font-medium text-white">{userEmail}</Text>
          <Text className="text-xs text-gray-400 mt-1">Usuario de Name</Text>
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
              <Text className="text-sm text-white">{userName || "Usuario"}</Text>
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
            {/* Campo para ingresar el nombre */}
            <View className="flex-row items-center gap-3">
              <Feather name="edit" size={18} color="#9ca3af" />
              <TextInput
                className="flex-1 text-sm text-white p-2"
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#9ca3af"
                value={userName}
                onChangeText={setUserName}
              />
            </View>

            {/* Cerrar sesión */}
            <TouchableOpacity
              className="flex-row items-center gap-3 p-3"
              onPress={handleLogout}
            >
              <Feather name="log-out" size={18} color="#9ca3af" />
              <Text className="text-sm text-white">Cerrar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 p-3">
              <Feather name="bell" size={18} color="#9ca3af" />
              <Text className="text-sm text-white">Conviértete en evaluador de versiones beta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Browser Management Section */}
        <View className="px-4 py-3 border-t border-gray-800">
          <TouchableOpacity className="flex-row items-center gap-3 p-3">
            <Feather name="globe" size={18} color="#9ca3af" />
            <View>
              <Text className="text-sm text-white">Gestionar cuentas en navegador</Text>
              <Text className="text-xs text-gray-400 mt-1">
                Revisar las cuentas que tengan la sesión iniciada y quitarlas del navegador
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}