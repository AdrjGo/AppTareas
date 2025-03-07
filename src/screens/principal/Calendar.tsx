import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { getListsByDate } from "@/services/firebaseList";
import ButtonLigth from "@/components/common/buttons/ButtonLigth";

interface List {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

export default function Calendar({ navigation }: any) {
  const [selectedDate, setSelectedDate] = useState<DateType>(new Date());
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    if (selectedDate) {
      loadLists();
    }
  }, [selectedDate]);

  const loadLists = async () => {
    if (!selectedDate) return;
    const listsData = await getListsByDate(selectedDate.toString());
    setLists(listsData);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'bg-red-500';
      case 'media':
        return 'bg-yellow-500';
      case 'baja':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <View className="flex-1 bg-zinc-900 p-4">
      <View className="mb-4">
        <Text className="text-white text-xl font-bold mb-2">Calendario</Text>
        <Text className="text-gray-400">
          Selecciona una fecha para ver tus listas
        </Text>
      </View>
      
      <View className="bg-zinc-800 rounded-lg p-4 mb-4">
        <DateTimePicker
          mode="single"
          date={selectedDate}
          onChange={({ date }: { date: DateType }) => setSelectedDate(date)}
          locale="es"
        />
      </View>

      <ScrollView className="flex-1">
        <View className="bg-zinc-800 rounded-lg p-4">
          <Text className="text-white text-lg font-bold mb-4">
            Listas para {selectedDate ? new Date(selectedDate.toString()).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : ''}
          </Text>
          
          {lists.length > 0 ? (
            lists.map((list) => (
              <ButtonLigth
                key={list.id}
                colorText="blanco"
                colorBg="zinc"
                colorBgPress="gray"
                className={`border-l-4 ${getPriorityColor(list.priority)} mb-2`}
                onPress={() =>
                  navigation.navigate("List", {
                    listName: list.name,
                    listId: list.id,
                  })
                }
              >
                <View>
                  <Text className="text-white font-bold">{list.name}</Text>
                  <Text className="text-gray-400">{list.description}</Text>
                  <Text className="text-gray-400">Estado: {list.status}</Text>
                </View>
              </ButtonLigth>
            ))
          ) : (
            <Text className="text-gray-400 text-center">No hay listas para esta fecha</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
