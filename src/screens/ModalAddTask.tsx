import ButtonNative from "@/components/common/buttons/ButtonNative";
import InputIcon from "@/components/common/inputs/InputIcon";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";

export default function ModalAddTask(props:any) {
  return (
    <ScrollView>
      <View className="gap-2">
        <View className="bg-zinc-800 justify-start" style={{ height: 50 }}>
          <TextInput
            placeholder="Título de la tarea..."
            className="text-white p-3"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          />
        </View>
        <View className="bg-zinc-800 justify-start" style={{ height: 100 }}>
          <TextInput
            placeholder="Añadir descripción de la tarea..."
            className="text-white p-3"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          />
        </View>
        <View className="bg-zinc-800 justify-start" style={{ height: 50 }}>
          <TextInput
            placeholder="Etiquetas..."
            className="text-white p-3"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          />
        </View>
        <View className="bg-zinc-800 justify-start" style={{ height: 50 }}>
          <TextInput
            placeholder="Fecha final..."
            className="text-white p-3"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          />
        </View>
        <View className="gap-5 justify-center my-5">
            <ButtonNative title="Guardar" onPress={()=>Alert.alert("Guardado")} />
            <ButtonNative title="Cancelar" colorText="danger" onPress={()=>props.navigation.goBack()} />
        </View>
      </View>
    </ScrollView>
  );
}
