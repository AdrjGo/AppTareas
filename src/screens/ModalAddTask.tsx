import CalendarPicker from "@/components/CalendarPicker";
import ButtonNative from "@/components/common/buttons/ButtonNative";
import InputIcon from "@/components/common/inputs/InputIcon";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { addTask } from "@/services/firebaseTask";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { DateType } from "react-native-ui-datepicker";

export default function ModalAddTask(props: any) {
  const { task } = props.route.params;

  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [selectedPriority, setSelectedPriority] = useState<string>(
    task ? task.priority : "media"
  );
  const [selected, setSelected] = useState<DateType | undefined>(
    task ? new Date(task.dateEndTask) : undefined
  );

  

  const handlerSubmit = async () => {
    if (!props.route.params?.listId) {
      Alert.alert("Error", "No se encontró la lista");
      return;
    }
    try {
      await addTask(props.route.params.listId, {
        title,
        description,
        selectedPriority: selectedPriority ?? "media",
        dateEnd: selected ? selected.toString() : undefined,
      });

      props.navigation.goBack();
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      Alert.alert("Error", "No se pudo guardar la tarea");
    }
  };

  return (
    <ScrollView>
      <View className="gap-2 my-2">
        <InputIcon
          placeholder="Título de la tarea..."
          icon="book"
          stylesView="formTask"
          stylesInput="formTaskText"
          value={title}
          onChangeTexto={setTitle}
        />

        <InputIcon
          placeholder="Descripción de la tarea..."
          icon="text.alignleft"
          stylesView="formTaskTextArea"
          stylesInput="formTaskTextArea"
          multiLine={true}
          className={"z-50"}
          value={description}
          onChangeTexto={setDescription}
        />

        <View
          className="bg-zinc-800 justify-start flex-row items-center z-0 px-3"
          style={{ height: 80 }}
        >
          <IconSymbol name="tag.fill" color="white" />
          <Picker
            selectedValue={selectedPriority}
            onValueChange={(itemValue) => setSelectedPriority(itemValue)}
            style={{ width: "90%", color: "white" }}
            dropdownIconColor="white"
            itemStyle={{ color: "white" }}
          >
            <Picker.Item label="Prioridad alta" value="alta" />
            <Picker.Item label="Prioridad media" value="media" />
            <Picker.Item label="Prioridad baja" value="baja" />
          </Picker>
        </View>

        <View className="bg-zinc-800 items-center">
          <View className="flex-row items-center p-3">
            <IconSymbol name="calendar" color="white" />
            <Text className="text-zinc-400 p-3 text-">Fecha final...</Text>
          </View>

          <View className="w-[90%] bg-zinc-900 mb-3 rounded-xl items-center">
            <CalendarPicker selected={selected} setSelected={setSelected} />
          </View>
        </View>

        <View className="gap-5 justify-center my-5">
          <ButtonNative title="Guardar" onPress={handlerSubmit} />
          <ButtonNative
            title="Cancelar"
            colorText="danger"
            onPress={() => props.navigation.goBack()}
          />
        </View>
      </View>
    </ScrollView>
  );
}
