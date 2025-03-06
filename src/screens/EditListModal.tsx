import React, { useState, useEffect } from "react";
import { Alert, View, Text } from "react-native";
import { db, auth } from "@/config/firebaseConfig";
import { ref, update } from "firebase/database";
import { useNavigation, useRoute } from "@react-navigation/native";
import { editList } from "@/services/firebaseList";
import Input from "@/components/common/inputs/Input";
import ButtonOpacity from "@/components/common/buttons/ButtonOpacity";
import Modals from "@/components/common/Modals";

interface Props {
  listId?: any;
  listName?: any;
}

function EditListScreen({ listId, listName }: Props) {
  const navigation = useNavigation();

  const [newListName, setNewListName] = useState(listName);

  const handleSaveChanges = async () => {
    if (newListName.trim() === "") {
      Alert.alert("El nombre no puede estar vacío.");
      return;
    }

    await editList(listId, newListName);
    navigation.goBack();
    // Alert.alert("Éxito", "Nombre de lista actualizado correctamente");
  };

  return (
    <View className="mr-4">
      <Modals icon={"ellipsis"} animationType="slide">
        <View className="w-64">
          <Input
            placeholder="Nuevo nombre de la lista"
            label="Cambio de nombre"
            className="font-bold"
            value={newListName}
            onChangeTexto={setNewListName}
          />
          <ButtonOpacity
            text="Guardar cambios"
            colorBg="blue"
            colorText="blanco"
            rounded="medium"
            className={"mb-5"}
            onPress={handleSaveChanges}
          />
        </View>
      </Modals>
    </View>
  );
}

export default EditListScreen;
