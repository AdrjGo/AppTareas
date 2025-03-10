import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView, Modal } from "react-native";
import CalendarPicker from "@/components/CalendarPicker";
import { DateType } from "react-native-ui-datepicker";
import { auth, db } from "@/config/firebaseConfig";
import { onValue, ref, update } from "firebase/database";
import CardTask from "@/components/CardTask";

type PriorityFilter = "todas" | "alta" | "media" | "baja";
type ViewMode = "dia" | "mes";

type Task = {
  id: string;
  title: string;
  dateCreated: string;
  dateEndTask: string;
  completed: boolean;
  priority: string;
  listId?: string;
};

export default function Calendar() {
  const [selected, setSelected] = useState<DateType>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("todas");
  const [viewMode, setViewMode] = useState<ViewMode>("dia");
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const user = auth.currentUser;

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - 5 + i
  );

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(selectedYear, monthIndex, 1);
    setSelected(newDate);
    setShowMonthPicker(false);
  };

  useEffect(() => {
    if (!user) return;
    loadTasks();
  }, [user, selected]);

  const loadTasks = async () => {
    const tasksRef = ref(db, `users/${user?.uid}/lists`);
    onValue(tasksRef, (snapshot) => {
      if (snapshot.exists()) {
        const lists = snapshot.val();
        let allTasks: Task[] = [];
        
        Object.keys(lists).forEach(listId => {
          if (lists[listId].tasks) {
            Object.keys(lists[listId].tasks).forEach(taskId => {
              allTasks.push({
                id: taskId,
                listId,
                ...lists[listId].tasks[taskId]
              });
            });
          }
        });
        
        setTasks(allTasks);
      }
    });
  };

  const getTaskSummary = () => {
    if (!selected) return { completed: 0, pending: 0 };
    
    let filteredTasksList = tasks;
    
    if (viewMode === "dia") {
      // Filtrar por día específico
      filteredTasksList = tasks.filter(task => {
        if (!task.dateEndTask) return false;
        const taskDate = new Date(task.dateEndTask).toDateString();
        const selectedDate = new Date(selected.toString()).toDateString();
        return taskDate === selectedDate;
      });
    } else {
      // Filtrar por mes
      filteredTasksList = tasks.filter(task => {
        if (!task.dateEndTask) return false;
        const taskDate = new Date(task.dateEndTask);
        const selectedDate = new Date(selected.toString());
        return taskDate.getMonth() === selectedDate.getMonth() && 
               taskDate.getFullYear() === selectedDate.getFullYear();
      });
    }

    return {
      completed: filteredTasksList.filter(t => t.completed).length,
      pending: filteredTasksList.filter(t => !t.completed).length
    };
  };

  const handleCheck = async (task: Task) => {
    if (!user || !task.listId) return;
    
    try {
      const updatedCompletionStatus = !task.completed;
      const updates: any = {};
      updates[`users/${user.uid}/lists/${task.listId}/tasks/${task.id}/completed`] = updatedCompletionStatus;
      
      await update(ref(db), updates);
      
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === task.id ? { ...t, completed: updatedCompletionStatus } : t
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (!selected || !task.dateEndTask) return false;
    
    if (viewMode === "dia") {
      const taskDate = new Date(task.dateEndTask).toDateString();
      const selectedDate = new Date(selected.toString()).toDateString();
      const dateMatches = taskDate === selectedDate;
      return priorityFilter === "todas" 
        ? dateMatches 
        : dateMatches && task.priority === priorityFilter;
    } else {
      // Vista mensual: mostrar todas las tareas del mes seleccionado
      const taskDate = new Date(task.dateEndTask);
      const selectedDate = new Date(selected.toString());
      const monthMatches = taskDate.getMonth() === selectedDate.getMonth() && 
                          taskDate.getFullYear() === selectedDate.getFullYear();
      return priorityFilter === "todas"
        ? monthMatches
        : monthMatches && task.priority === priorityFilter;
    }
  });

  const summary = getTaskSummary();

  return (
    <ScrollView className="flex-1 bg-zinc-900">
      {/* Modal Selector de Mes */}
      <Modal
        visible={showMonthPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMonthPicker(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-zinc-800 p-4 rounded-xl w-[90%] max-h-[80%]">
            <Text className="text-white text-xl font-bold mb-4 text-center">
              Seleccionar Fecha
            </Text>
            
            {/* Selector de Año */}
            <View className="mb-4">
              <Text className="text-white text-lg mb-2">Año:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {years.map(year => (
                    <TouchableOpacity
                      key={year}
                      onPress={() => setSelectedYear(year)}
                      className={`px-4 py-2 rounded-full ${
                        selectedYear === year ? 'bg-[#e1bee7]' : 'bg-zinc-700'
                      }`}
                    >
                      <Text className={`${
                        selectedYear === year ? 'text-black font-bold' : 'text-white'
                      }`}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Selector de Mes */}
            <Text className="text-white text-lg mb-2">Mes:</Text>
            <View className="flex-row flex-wrap justify-center gap-2">
              {months.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  onPress={() => handleMonthSelect(index)}
                  className="bg-zinc-700 px-4 py-2 rounded-full w-[45%]"
                >
                  <Text className="text-white text-center">{month}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Botón Cerrar */}
            <TouchableOpacity
              onPress={() => setShowMonthPicker(false)}
              className="mt-4 bg-red-500/20 p-3 rounded-full"
            >
              <Text className="text-red-400 text-center font-bold">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sección del Calendario */}
      <View className="bg-zinc-800 p-4 m-4 rounded-xl">
        <Text className="text-white text-xl font-bold mb-4 text-center">
          Revisa tus tareas
        </Text>
        <View className="bg-[#e1bee7]/55 p-2 rounded-xl ">
          <CalendarPicker selected={selected} setSelected={setSelected} />
        </View>
      </View>

      {/* Selector de Vista */}
      <View className="flex-row justify-center gap-2 mx-4 mb-4">
        {(['dia', 'mes'] as ViewMode[]).map((mode) => (
          <TouchableOpacity
            key={mode}
            onPress={() => {
              if (mode === 'mes') {
                setShowMonthPicker(true);
              }
              setViewMode(mode);
            }}
            className={`px-8 py-2 rounded-full ${
              viewMode === mode 
                ? 'bg-[#e1bee7]' 
                : 'bg-zinc-800'
            }`}
          >
            <Text className={`capitalize ${
              viewMode === mode 
                ? 'text-black font-bold' 
                : 'text-gray-400'
            }`}>
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sección del Resumen */}
      <View className="bg-zinc-800 p-4 mx-4 rounded-xl mb-4">
        <Text className="text-white text-lg font-bold mb-3">
          {viewMode === "dia" 
            ? `Resumen del ${new Date(selected?.toString() || '').toLocaleDateString()}`
            : `Resumen de ${new Date(selected?.toString() || '').toLocaleString('es-ES', { month: 'long', year: 'numeric' })}`
          }
        </Text>
        <View className="space-y-2">
          <View className="flex-row justify-between items-center bg-green-900/20 p-3 rounded-lg">
            <Text className="text-gray-300">Completadas</Text>
            <Text className="text-green-400 font-bold text-lg">{summary.completed}</Text>
          </View>
          <View className="flex-row justify-between items-center bg-red-900/20 p-3 rounded-lg">
            <Text className="text-gray-300">Pendientes</Text>
            <Text className="text-red-400 font-bold text-lg">{summary.pending}</Text>
          </View>
        </View>
      </View>

      {/* Filtros de Prioridad */}
      <View className="flex-row flex-wrap justify-center gap-2 mx-4 my-4">
        {(['todas', 'alta', 'media', 'baja'] as PriorityFilter[]).map((priority) => (
          <TouchableOpacity
            key={priority}
            onPress={() => setPriorityFilter(priority)}
            className={`px-5 py-2 rounded-full ${
              priorityFilter === priority 
                ? 'bg-zinc-600' 
                : 'bg-zinc-800'
            }`}
          >
            <Text className={`capitalize ${
              priorityFilter === priority 
                ? 'text-white font-bold' 
                : 'text-gray-400'
            }`}>
              {priority}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Tareas */}
      <View className="mx-4 mb-4">
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardTask 
              item={item}
              handleCheck={() => handleCheck(item)}
            />
          )}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          ListEmptyComponent={
            <Text className="text-zinc-400 text-lg text-center my-4">
              No hay tareas para este {viewMode === "dia" ? "día" : "mes"}
            </Text>
          }
        />
      </View>
    </ScrollView>
  );
}