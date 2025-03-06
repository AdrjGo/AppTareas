import ButtonNative from "@/components/common/buttons/ButtonNative";
import InputIcon from "@/components/common/inputs/InputIcon";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import DateTimePicker, {
  DateType,
  getDefaultStyles,
} from "react-native-ui-datepicker";

export default function ModalAddTask(props: any) {
  const defaultStyles = getDefaultStyles();
  const [selected, setSelected] = useState<DateType>();
  let today = new Date();

  const [selectedPriority, setSelectedPriority] = useState();

  return (
    <ScrollView>
      <View className="gap-2 my-2">
        <InputIcon
          placeholder="Título de la tarea..."
          icon="book"
          stylesView="formTask"
          stylesInput="formTaskText"
        />

        <InputIcon
          placeholder="Descripción de la tarea..."
          icon="text.alignleft"
          stylesView="formTaskTextArea"
          stylesInput="formTaskTextArea"
          multiLine={true}
          className={"z-50"}
        />

        <View
          className="bg-zinc-800 justify-start flex-row items-center z-0"
          style={{ height: 80 }}
        >
          <Picker
            selectedValue={selectedPriority}
            onValueChange={(itemValue) => setSelectedPriority(itemValue)}
            style={{ width: "100%", color: "white" }}
            dropdownIconColor="white"
            itemStyle={{ color: "white" }}
          >
            <Picker.Item label="Prioridad alta" value="alta" />
            <Picker.Item label="Prioridad media" value="media" />
            <Picker.Item label="Prioridad baja" value="baja" />
          </Picker>
        </View>

        <View className="bg-zinc-800 justify-start">
          <View className="flex-row items-center px-3">
            <IconSymbol name="calendar" color="white" />
            <Text className="text-zinc-400 p-3 text-">Fecha final...</Text>
          </View>
          <DateTimePicker
            mode="single"
            date={selected}
            minDate={today}
            onChange={({ date }) => setSelected(date)}
            locale={"es-ES"}
            monthCaptionFormat="full"
            use12Hours={true}
            styles={{
              ...defaultStyles,
              button_next: {
                ...defaultStyles.button_next,
                color: "white",
              },
            }}
          />
        </View>

        <View className="gap-5 justify-center my-5">
          <ButtonNative
            title="Guardar"
            onPress={() => Alert.alert("Guardado")}
          />
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
