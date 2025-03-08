import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";
import ButtonOpacity from "./common/buttons/ButtonOpacity";
import { formatDate } from "@/utils/formatDate";

function CardTask(props: any) {
  const { item, handleCheck, listId } = props;

  return (
    <View className="w-full px-3 my-2 bg-zinc-800 rounded-lg flex-row items-center gap-3">
      <TouchableOpacity
        className="justify-center"
        onPress={() => handleCheck(item)}
        style={{ height: 100 }}
      >
        <View
          className={`size-8 rounded-full border-2 flex items-center justify-center ${
            item.completed
              ? "bg-green-500 border-green-500"
              : "bg-transparent border-gray-400"
          }`}
        >
          {item.completed && (
            <IconSymbol
              name="checkmark"
              color="white"
              style={{ fontSize: 25 }}
            />
          )}
        </View>
      </TouchableOpacity>

      <View className="w-[90%]">
        <ButtonOpacity
          className={"w-full"}
          onPress={() =>
            props.navigation.navigate("ModalAddTask", {
              task: item,
              listId: listId,
            })
          }
        >
          <View className="flex flex-col items-start gap-2">
            <Text
              className={`text-white  font-semibold ${
                item.completed ? "line-through" : "no-underline"
              }`}
            >
              {item.title}
            </Text>
            <Text className="text-gray-400 text-xs">{item.description}</Text>

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
              {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
            </Text>

            <View className="w-full border-t border-gray-700 my-2" />

            <View className="flex-row justify-between w-full gap-8">
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

              <View className="flex-row items-center gap-2">
                <IconSymbol
                  name="calendar"
                  color="gray"
                  style={{ fontSize: 15 }}
                />
                <Text className="text-gray-300 text-sm">
                  {item.dateEndTask
                    ? formatDate(item.dateEndTask)
                    : "Sin fecha final"}
                </Text>
              </View>
            </View>
          </View>
        </ButtonOpacity>
      </View>
    </View>
  );
}

export default CardTask;
