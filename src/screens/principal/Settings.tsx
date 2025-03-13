import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { appFirebase } from "@/config/firebaseConfig";
import { Feather } from "@expo/vector-icons";

export default function Settings(props: any) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isThankYouModalVisible, setThankYouModalVisible] = useState(false);
  const [isMember, setIsMember] = useState(false); // Estado para controlar si el usuario es miembro
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const auth = getAuth(appFirebase);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");
        setUserName(user.displayName || user.email?.split("@")[0] || "usuario");
      }
    });

    return unsubscribe;
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has cerrado la sesión");
      props.navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = (plan: string) => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    // Simular el procesamiento del pago
    console.log("Procesando pago...", { cardNumber, expiryDate, cvv });

    // Cerrar el modal de pago
    setPaymentModalVisible(false);

    // Mostrar el segundo pop-up de agradecimiento
    setThankYouModalVisible(true);

    // Actualizar el estado para indicar que el usuario es miembro
    setIsMember(true);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-[#1E2A47] p-6 items-center">
        <View className="w-24 h-24 bg-[#E25C33] rounded-full items-center justify-center">
          <Text className="text-2xl font-medium text-white">
            {userName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View className="mt-4 items-center">
          <Text className="text-gray-400 text-lg">@{userName}</Text>
          <Text className="font-medium text-white text-xl">{userEmail}</Text>
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
              <Text className="text-lg text-white">{userName}</Text>
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
            <View className="flex-row items-center">
              <Feather name="edit" size={24} color="#9ca3af" />
              <TextInput
                className="flex-1 text-lg text-white p-3"
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#9ca3af"
                value={userName}
                onChangeText={setUserName}
              />
            </View>
            <TouchableOpacity className="flex-row items-center gap-4 py-2" onPress={handleLogout}>
              <Feather name="log-out" size={24} color="#9ca3af" />
              <Text className="text-lg text-white">Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón "Conviértete en Premium" o "Ya eres miembro" */}
        <TouchableOpacity
          className="mx-6 my-4 p-4 bg-yellow-500 rounded-lg flex-row items-center justify-center shadow-lg"
          onPress={() => setPaymentModalVisible(true)}
          disabled={isMember} // Deshabilitar el botón si el usuario ya es miembro
        >
          <Feather name="star" size={24} color="#121212" />
          <Text className="ml-2 text-lg font-bold text-[#121212]">
            {isMember ? "Ya eres miembro" : "¡Conviértete en Premium!"}
          </Text>
        </TouchableOpacity>

        {/* Modal de pago */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPaymentModalVisible}
          onRequestClose={() => setPaymentModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-[#1E2A47] p-6 rounded-lg w-80">
              <Text className="text-lg font-medium text-white mb-4">
                Selecciona un plan de pago
              </Text>
              <Text className="text-white mb-2">$10 por mes</Text>
              <Text className="text-white mb-4">$100 por año</Text>

              <TextInput
                className="bg-white p-2 rounded mb-2"
                placeholder="Número de tarjeta"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
              />
              <TextInput
                className="bg-white p-2 rounded mb-2"
                placeholder="Fecha de expiración (MM/YY)"
                keyboardType="numeric"
                maxLength={5}
                value={expiryDate}
                onChangeText={setExpiryDate}
              />
              <TextInput
                className="bg-white p-2 rounded mb-4"
                placeholder="CVV"
                keyboardType="numeric"
                maxLength={3}
                value={cvv}
                onChangeText={setCvv}
              />

              {/* Botones de pago */}
              <TouchableOpacity
                className="bg-blue-500 p-3 rounded mb-2"
                onPress={() => handlePayment("$10 por mes")}
              >
                <Text className="text-white text-center">Pagar $10 por mes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 p-3 rounded mb-2"
                onPress={() => handlePayment("$100 por año")}
              >
                <Text className="text-white text-center">Pagar $100 por año</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 p-3 rounded"
                onPress={() => setPaymentModalVisible(false)}
              >
                <Text className="text-white text-center">Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Segundo pop-up de agradecimiento */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isThankYouModalVisible}
          onRequestClose={() => setThankYouModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-[#1E2A47] p-6 rounded-lg w-80">
              <Text className="text-lg font-medium text-white mb-4">
                ¡Gracias por tu pago!
              </Text>
              <Text className="text-white mb-4">
                Tu suscripción ha sido procesada exitosamente.
              </Text>
              <TouchableOpacity
                className="bg-blue-500 p-3 rounded"
                onPress={() => setThankYouModalVisible(false)}
              >
                <Text className="text-white text-center">Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}