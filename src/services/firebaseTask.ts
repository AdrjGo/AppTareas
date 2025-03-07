import { ref, set, push, get, onValue, update } from "firebase/database";
import { auth, db } from "@/config/firebaseConfig";
import { Alert } from "react-native";

interface PropTask {
  title: string;
  description: string;
  selectedPriority: string;
  dateEnd?: string;
}

export const addTask = async (
  listId: string,
  { title, description, selectedPriority, dateEnd }: PropTask
) => {
  if (!auth.currentUser) {
    Alert.alert("Error", "Usuario no autenticado");
    return;
  }
  const userId = auth.currentUser.uid;

  if (!listId) {
    Alert.alert("Error", "No se encontró la lista");
    return;
  }

  if (!title.trim()) {
    Alert.alert("Error", "El título de la tarea no puede estar vacío");
    return;
  }

  const taskRef = push(ref(db, `users/${userId}/lists/${listId}/tasks`));

  const snapshot = await get(taskRef);
  const taskCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;

  await set(taskRef, {
    title,
    description,
    priority: selectedPriority,
    dateCreated: new Date().toISOString(),
    order: taskCount + 1,
    dateEndTask: dateEnd ? dateEnd.toString() : null,
    completed: false,
  });
};

export const getAllTasks = async (listId: string, setTask: any) => {
  const user = auth.currentUser;
  if (!user) return;

  const taskRef = ref(db, `users/${user.uid}/lists/${listId}/tasks`);
  onValue(taskRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const taskArray = Object.keys(data).map((key) => ({
        id: key,
        title: data[key].title,
        dateCreated: data[key].dateCreated,
        dateEndTask: data[key].dateEndTask,
        completed: data[key].completed,
        priority: data[key].priority,
      }));
      setTask(taskArray);
    } else {
      setTask([]);
    }
  });
};

export const updateCompletedTask = async (listId: string, taskId: string, completed: boolean) => {
  const user = auth.currentUser;
  if (!user) return;

  const taskRef = ref(db, `users/${user.uid}/lists/${listId}/tasks/${taskId}`);

  try {
    await update(taskRef, {
      completed: completed,
      
    });
    console.log("Tarea actualizada correctamente");
  } catch (error) {
    console.error("Error al actualizar el estado de la tarea", error);
  }
};

export const deleteTask = async (listId: string, taskId: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const taskRef = ref(db, `users/${user.uid}/lists/${listId}/tasks/${taskId}`);

  await set(taskRef, null);
};
