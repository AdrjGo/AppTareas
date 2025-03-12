import React, { useState } from "react";
import {
  Alert,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from "react-native";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { appFirebase } from "@/config/firebaseConfig";
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";

export default function Settings(props: any) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
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

  const handlePayment = (plan: string) => {
    try {
      // Validar que todos los campos estén llenos
      if (!cardNumber || !expiryDate || !cvv) {
        Alert.alert("Error", "Por favor, completa todos los campos.");
        return;
      }

      // Simular el procesamiento del pago
      // Aquí puedes integrar la lógica real de pago, como Stripe
      console.log("Procesando pago...");
      console.log("Número de tarjeta:", cardNumber);
      console.log("Fecha de expiración:", expiryDate);
      console.log("CVV:", cvv);

      // Mostrar mensaje de agradecimiento
      Alert.alert("¡Gracias!", `Gracias por tu pago de ${plan}.`);

      // Cerrar el modal
      setPaymentModalVisible(false);
    } catch (error) {
      console.error("Error durante el pago:", error);
      Alert.alert("Error", "Hubo un problema al procesar tu pago. Inténtalo de nuevo.");
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

        {/* Botón para abrir el pop-up de pago */}
        <TouchableOpacity
          className="flex-row items-center gap-4 p-5"
          onPress={() => setPaymentModalVisible(true)}
        >
          <Feather name="credit-card" size={24} color="#9ca3af" />
          <Text className="text-lg text-white">Método de pago</Text>
        </TouchableOpacity>

        {/* Pop-up de pago */}
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
                value={cardNumber}
                onChangeText={setCardNumber}
              />
              <TextInput
                className="bg-white p-2 rounded mb-2"
                placeholder="Fecha de expiración (MM/YY)"
                value={expiryDate}
                onChangeText={setExpiryDate}
              />
              <TextInput
                className="bg-white p-2 rounded mb-4"
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
              />

              <Button
                title="Pagar $10 por mes"
                onPress={() => handlePayment("$10 por mes")}
              />
              <Button
                title="Pagar $100 por año"
                onPress={() => handlePayment("$100 por año")}
              />
              <Button
                title="Cerrar"
                onPress={() => setPaymentModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}