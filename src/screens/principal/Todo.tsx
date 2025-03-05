import ButtonLigth from "@/components/common/buttons/ButtonLigth";
import ButtonNative from "@/components/common/buttons/ButtonNative";
import InputIcon from "@/components/common/inputs/InputIcon";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { auth, db } from "@/config/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  View,
} from "react-native";

export default function Todo() {
  const [listas, setListas] = useState<{ id: string; name: string }[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const listRef = ref(db, `users/${user.uid}/lists`);

    onValue(listRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const listArray = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].name,
        }));
        setListas(listArray);
      } else {
        setListas([]);
      }
    });
    return;
  }, [user]);

  return (
    <>
      <View className="my-5 justify-center items-center">
        <InputIcon placeholder="Listas de tareas" icon="magnifyingglass" />
      </View>

      <View className="flex-row items-center mx-5 my-3 gap-3">
        <IconSymbol name="clock" color="gray" size={25} />
        <Text className="text-gray-400 font-bold text-lg justify-center items-center gap-3">
          Tus listas
        </Text>
      </View>
      <View className="bg-zinc-950 rounded-xl">
        <FlatList
          data={listas}
          keyExtractor={(item) => item.id}
          className="p-4 "
          renderItem={({ item }) => (
            <ButtonLigth  colorText="blanco" colorBg="gray" colorBgPress="darkBlue" onPress={() => Alert.alert("hola")}>
              {item.name}
            </ButtonLigth>
          )}
        />
      </View>
    </>
  );
}
