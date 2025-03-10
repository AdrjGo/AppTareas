import {
  Alert,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { appFirebase } from "@/config/firebaseConfig";
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
      <View className="bg-[#1E2A47] p-6 items-center">
        <View className="w-24 h-24 bg-[#E25C33] rounded-full items-center justify-center">
          <Text className="text-2xl font-medium text-white">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
        <View className="mt-4 items-center">
          <Text className="text-gray-400 text-lg">
            @{userName || "usuario"}
          </Text>
          <Text className="font-medium text-white text-xl">{userEmail}</Text>
          <Text className="text-xs text-gray-400 mt-2"></Text>
        </View>
      </View>

      <ScrollView className="flex-1 bg-[#121212]">
        <View className="px-6 py-4">
          <Text className="text-lg font-medium text-white mb-4">
            Tus Espacios de trabajo
          </Text>
          <View className="space-y-4 gap-4">
            <View className="flex-row items-center gap-4">
              <Feather name="user" size={24} color="#9ca3af" />
              <Text className="text-lg text-white">
                {userName || "Usuario"}
              </Text>
            </View>
            <View className="flex-row items-center gap-4">
              <Feather name="briefcase" size={24} color="#9ca3af" />
              <Text className="text-lg text-white">Espacio de trabajo</Text>
            </View>
          </View>
        </View>

        <View className="px-6 py-4 border-t border-gray-800">
          <Text className="text-lg font-medium text-white mb-4">Cuenta</Text>
          <View className="gap-4">
            <View className="flex-row items-center ">
              <Feather name="edit" size={24} color="#9ca3af" />
              <TextInput
                className="flex-1 text-lg text-white p-3"
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#9ca3af"
                value={userName}
                onChangeText={setUserName}
              />
            </View>

            <TouchableOpacity className="flex-row items-center gap-4">
              <Feather name="bell" size={24} color="#9ca3af" />
              <Text className="text-lg text-white">
                Conviértete en evaluador de versiones beta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center gap-4 py-2"
              onPress={handleLogout}
            >
              <Feather name="log-out" size={24} color="#9ca3af" />
              <Text className="text-lg text-white">Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className=" border-t border-gray-800">
          <TouchableOpacity className="flex-row items-center gap-4 p-5">
            <Feather name="globe" size={24} color="#9ca3af" />
            <View>
              <Text className="text-lg text-white">
                Gestionar cuentas en navegador
              </Text>
              <Text className="text-sm text-gray-400 mt-2">
                Revisar las cuentas que tengan la sesión iniciada
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
