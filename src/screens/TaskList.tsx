import { Text, View, FlatList, TouchableOpacity } from "react-native";
import ButtonOpacity from "@/components/common/buttons/ButtonOpacity";
import { useEffect, useState } from "react";
import { getAllTasks, updateCompletedTask } from "@/services/firebaseTask";
import { formatDate } from "@/utils/formatDate";
import { IconSymbol } from "@/components/ui/IconSymbol";
import CardTask from "@/components/CardTask";

type getTask = {
  id: string;
  title: string;
  dateCreated: string;
  dateEndTask: string;
  completed: boolean;
  priority: string;
};

export default function TaskList(props: any) {
  const [tasks, setTasks] = useState<getTask[]>([]);

  useEffect(() => {
    getAllTasks(props.route.params.listId, setTasks);
  }, []);

  const handleCheck = async (item: getTask) => {
    try {
      const updatedCompletionStatus = !item.completed;

      await updateCompletedTask(
        props.route.params.listId,
        item.id,
        updatedCompletionStatus
      );
      setTasks((prevItems) =>
        prevItems.map((task) =>
          task.id === item.id
            ? { ...task, completed: updatedCompletionStatus }
            : task
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea", error);
    }
  };

  return (
    <View>
      <ButtonOpacity
        colorBg="white"
        onPress={() =>
          props.navigation.navigate("ModalAddTask", {
            listId: props.route.params.listId,
          })
        }
      >
        Añadir nueva tarea
      </ButtonOpacity>
      <View className="p-2 max-h-[92%]">
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardTask handleCheck={handleCheck} item={item} />
          )}
        />
      </View>
    </View>
  );
}
