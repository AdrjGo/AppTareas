import { ref, set, push, get, onValue, update } from "firebase/database";
import { auth, db } from "@/config/firebaseConfig";
import { Alert } from "react-native";

interface PropTask {
  title: string;
  description: string;
  selectedPriority: string;
  dateEnd?: string | null;
}

export const addTask = async (
  listId: string,
  { title, description, selectedPriority, dateEnd }: PropTask
) => {
  const userId = auth.currentUser?.uid;

  exceptions(listId, title);

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


export const updateTask = async (
  listId: string, taskId: string,
  { title, description, selectedPriority, dateEnd }: PropTask
) => {
  const userId = auth.currentUser?.uid;

  exceptions(listId, title, taskId);

  const taskRef = ref(db, `users/${userId}/lists/${listId}/tasks/${taskId}`);

  await update(taskRef, {
    title: title,
    description: description ?? "",
    priority: selectedPriority,
    dateEndTask: dateEnd ? dateEnd.toString() : null,
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
        description: data[key].description,
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


export const getTaskById = async (listId: string, taskId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No se ha iniciado sesión");

  const taskRef = ref(db, `users/${user.uid}/lists/${listId}/tasks/${taskId}`);
  const snapshot = await get(taskRef);

  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log(data);
    return {
      id: taskId,
      title: data.title,
      description: data.description,
      dateCreated: data.dateCreated,
      dateEndTask: data.dateEndTask,
      completed: data.completed,
      priority: data.priority,
    };
  } else {
    throw new Error("Tarea no encontrada");
  }
};


export const updateCompletedTask = async (
  listId: string,
  taskId: string,
  completed: boolean
) => {
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




const exceptions = (listId: string, taskId?: string, title?: string) => {
  if (!auth.currentUser) {
    Alert.alert("Error", "Usuario no autenticado");
    return;
  }
  if (!taskId) {
    Alert.alert("Error", "No se encontró la Tarea");
    return;
  }

  if (!listId) {
    Alert.alert("Error", "No se encontró la lista");
    return;
  }

  if (title === "") {
    Alert.alert("Error", "El título de la tarea no puede estar vacío");
    return;
  }
};
