import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { auth, db } from "@/config/firebaseConfig";
import { ref, onValue, push, set } from "firebase/database";
import * as Notifications from 'expo-notifications';
import { IconSymbol } from "@/components/ui/IconSymbol";

interface Task {
  id: string;
  title: string;
  description?: string;
  dateEndTask: string;
  priority: 'alta' | 'media' | 'baja';
  completed: boolean;
  listId: string;
}

interface NotificationLog {
  id: string;
  title: string;
  message: string;
  date: string;
  status: 'sent' | 'pending' | 'overdue';
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function NotificationsScreen() {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    loadTasks();
    loadNotificationLogs();
    setupNotifications();
  }, [user]);

  const loadNotificationLogs = () => {
    const logsRef = ref(db, `users/${user?.uid}/notificationLogs`);
    onValue(logsRef, (snapshot) => {
      if (!snapshot.exists()) return;
      const logs = Object.entries(snapshot.val()).map(([id, data]: [string, any]) => ({
        id,
        ...data,
      }));
      setNotificationLogs(logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    });
  };

  const saveNotificationLog = async (notification: NotificationLog) => {
    if (!user) return;
    const logsRef = ref(db, `users/${user.uid}/notificationLogs`);
    const newLogRef = push(logsRef);
    await set(newLogRef, notification);
  };

  const loadTasks = () => {
    const listsRef = ref(db, `users/${user?.uid}/lists`);
    
    onValue(listsRef, (snapshot) => {
      if (!snapshot.exists()) return;
      
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const tasks: Task[] = [];
      const overdueTasksList: Task[] = [];
      const lists = snapshot.val();
      
      Object.keys(lists).forEach(listId => {
        if (lists[listId].tasks) {
          Object.keys(lists[listId].tasks).forEach(taskId => {
            const task = lists[listId].tasks[taskId];
            const taskDate = new Date(task.dateEndTask);
            
            if (!task.completed) {
              if (taskDate < now) {
                // Tareas vencidas
                overdueTasksList.push({
                  id: taskId,
                  listId,
                  ...task
                });
              } else if (taskDate.getTime() === tomorrow.getTime()) {
                // Tareas para mañana
                tasks.push({
                  id: taskId,
                  listId,
                  ...task
                });
              }
            }
          });
        }
      });
      
      setUpcomingTasks(tasks);
      setOverdueTasks(overdueTasksList);

      // Registrar notificaciones para tareas vencidas
      overdueTasksList.forEach(task => {
        saveNotificationLog({
          id: Date.now().toString() + task.id,
          title: "⚠️ Tarea Vencida",
          message: `La tarea "${task.title}" está vencida desde ${new Date(task.dateEndTask).toLocaleDateString()}`,
          date: new Date().toISOString(),
          status: 'overdue'
        });
      });
    });
  };

  const setupNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return;

    await Notifications.cancelAllScheduledNotificationsAsync();

    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0);

    if (now.getHours() >= 8) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }

    // Guardar registro de la próxima notificación
    if (upcomingTasks.length > 0) {
      await saveNotificationLog({
        id: Date.now().toString(),
        title: "📅 Recordatorio de Tareas",
        message: `Tienes ${upcomingTasks.length} tareas programadas para mañana`,
        date: tomorrow.toISOString(),
        status: 'pending'
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "📅 Recordatorio de Tareas",
          body: `Tienes ${upcomingTasks.length} tareas programadas para hoy`,
          sound: 'default',
          priority: 'high',
        },
        trigger: {
          seconds: Math.floor((tomorrow.getTime() - Date.now()) / 1000),
          repeats: false
        } as any,
      });
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View className="bg-zinc-800 p-4 rounded-lg mb-2 flex-row items-center justify-between">
      <View className="flex-1">
        <Text className="text-white font-bold text-lg">{item.title}</Text>
        {item.description && (
          <Text className="text-gray-400">{item.description}</Text>
        )}
        <View className="flex-row items-center mt-1">
          <IconSymbol name="calendar" color="#9ca3af" size={16} />
          <Text className="text-gray-400 ml-1">
            {new Date(item.dateEndTask).toLocaleDateString()}
          </Text>
          <Text className={`ml-2 font-semibold ${
            item.priority === 'alta' ? 'text-red-500' :
            item.priority === 'media' ? 'text-yellow-500' : 'text-green-500'
          }`}>
            • {item.priority.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderNotificationLog = ({ item }: { item: NotificationLog }) => (
    <View className="bg-zinc-800 p-4 rounded-lg mb-2">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white font-bold">{item.title}</Text>
        <View className={`px-2 py-1 rounded-full ${
          item.status === 'sent' ? 'bg-green-900/50' : 
          item.status === 'overdue' ? 'bg-red-900/50' : 'bg-yellow-900/50'
        }`}>
          <Text className={`text-sm ${
            item.status === 'sent' ? 'text-green-400' : 
            item.status === 'overdue' ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {item.status === 'sent' ? 'Enviada' : 
             item.status === 'overdue' ? 'Vencida' : 'Pendiente'}
          </Text>
        </View>
      </View>
      <Text className="text-gray-400">{item.message}</Text>
      <View className="flex-row items-center mt-2">
        <IconSymbol name="clock" color="#9ca3af" size={16} />
        <Text className="text-gray-400 ml-1">
          {new Date(item.date).toLocaleString()}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-zinc-900">
      <View className="p-4">
        <View className="mb-4">
          <Text className="text-white text-xl font-bold">Notificaciones</Text>
          <Text className="text-gray-400">
            Historial y próximas notificaciones
          </Text>
        </View>

        {overdueTasks.length > 0 && (
          <View className="mb-4">
            <Text className="text-red-400 text-lg font-bold mb-2">
              Tareas Vencidas ({overdueTasks.length})
            </Text>
            <FlatList
              data={overdueTasks}
              renderItem={renderTask}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              nestedScrollEnabled={true}
            />
          </View>
        )}

        {upcomingTasks.length > 0 && (
          <View className="mb-4">
            <Text className="text-yellow-400 text-lg font-bold mb-2">
              Próximas Tareas ({upcomingTasks.length})
            </Text>
            <FlatList
              data={upcomingTasks}
              renderItem={renderTask}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              nestedScrollEnabled={true}
            />
          </View>
        )}

        <View className="flex-1">
          <Text className="text-white text-lg font-bold mb-2">Historial</Text>
          {notificationLogs.length > 0 ? (
            <FlatList
              data={notificationLogs}
              renderItem={renderNotificationLog}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              nestedScrollEnabled={true}
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <IconSymbol name="bell.slash" color="#9ca3af" size={50} />
              <Text className="text-gray-400 mt-4 text-center">
                No hay historial de notificaciones
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

