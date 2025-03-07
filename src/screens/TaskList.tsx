import { Text, View, FlatList, TouchableOpacity } from "react-native";
import ButtonOpacity from "@/components/common/buttons/ButtonOpacity";
import { useEffect, useState } from "react";
import { getAllTasks, updateCompletedTask } from "@/services/firebaseTask";
import { formatDate } from "@/utils/formatDate";
import { IconSymbol } from "@/components/ui/IconSymbol";

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
            <View className="w-full px-3 my-2 bg-zinc-800 rounded-lg flex-row items-center gap-3">
              <TouchableOpacity
                className={`size-8 rounded-full border-2 flex items-center justify-center ${
                  item.completed
                    ? "bg-green-500 border-green-500"
                    : "bg-transparent border-gray-400"
                }`}
                onPress={() => handleCheck(item)}
              >
                {item.completed && (
                  <IconSymbol
                    name="checkmark"
                    color="white"
                    style={{ fontSize: 25 }}
                  />
                )}
              </TouchableOpacity>

              <ButtonOpacity>
                <View className="flex flex-col items-start gap-2">
                  <Text
                    className={`text-white text-lg font-semibold ${
                      item.completed ? "line-through" : "no-underline"
                    }`}
                  >
                    {item.title}
                  </Text>

                  <Text
                    className={`text-xs font-bold ${
                      item.completed ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {item.completed ? "✅ Completada" : "⏳ Pendiente"}
                  </Text>

                  <Text
                    className={`text-sm font-semibold ${
                      item.priority === "alta"
                        ? "text-red-500"
                        : item.priority === "media"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    ⚡ Prioridad:{" "}
                    {item.priority.charAt(0).toUpperCase() +
                      item.priority.slice(1)}
                  </Text>

                  <View className="w-full border-t border-gray-700 my-2" />

                  <View className="flex-row justify-between w-[90%] gap-8">
                    <View className="flex-row items-center gap-2">
                      <IconSymbol
                        name="clock"
                        color="gray"
                        style={{ fontSize: 15 }}
                      />
                      <Text className="text-gray-300 text-sm">
                        {formatDate(item.dateCreated)}
                      </Text>
                    </View>

                    {item.dateEndTask && (
                      <View className="flex-row items-center gap-2">
                        <IconSymbol
                          name="calendar"
                          color="gray"
                          style={{ fontSize: 15 }}
                        />
                        <Text className="text-gray-300 text-sm">
                          {formatDate(item.dateEndTask)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </ButtonOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}
