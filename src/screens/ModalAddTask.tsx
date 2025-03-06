import ButtonNative from "@/components/common/buttons/ButtonNative";
import InputIcon from "@/components/common/inputs/InputIcon";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import DateTimePicker, {
  DateType,
  getDefaultStyles,
} from "react-native-ui-datepicker";

export default function ModalAddTask(props: any) {
  const defaultStyles = getDefaultStyles();
  const [selected, setSelected] = useState<DateType>();
  let today = new Date();

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
        />

        <View className="bg-zinc-800 justify-start" style={{ height: 50 }}>
          <TextInput
            placeholder="Etiquetas..."
            className="text-white p-3"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          />
        </View>

        <View className="bg-white justify-start">
          <Text className="text-zinc-400 p-3 text-">Fecha final...</Text>
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
