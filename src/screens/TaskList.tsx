import { Alert, Text, View } from "react-native";
import { db } from "@/config/firebaseConfig";
import ButtonOpacity from "@/components/common/buttons/ButtonOpacity";
import { useNavigation } from "expo-router";

export default function TaskList(props:any) {
  // const navigation = useNavigation();
  return (
    <View>
      <ButtonOpacity colorBg="white" onPress={()=>props.navigation.navigate('ModalAddTask')}>
        Añadir nueva tarea
      </ButtonOpacity>
      <Text className="text-white">Todo list </Text>
    </View>
  );
}

