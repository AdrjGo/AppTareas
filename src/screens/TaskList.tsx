import { Text, View } from "react-native";
import ButtonOpacity from "@/components/common/buttons/ButtonOpacity";

export default function TaskList(props:any) {
  return (
    <View>
      <ButtonOpacity colorBg="white" onPress={()=>props.navigation.navigate('ModalAddTask')}>
        Añadir nueva tarea
      </ButtonOpacity>
      <Text className="text-white">Todo list </Text>
    </View>
  );
}

