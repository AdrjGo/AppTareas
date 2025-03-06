import { ref, set, push, get } from "firebase/database";
import { auth, db } from "@/config/firebaseConfig";
import { useRoute } from "@react-navigation/native";

interface PropTask{
  name: string;
  description: string;
  tags: string[];
  order: number;
  dateCreated: string;
  dateEnd?: string;
}

export const addTask = async () => {
  const route = useRoute();
  const { listId } = route.params as { listId: string };
  const user = auth.currentUser;
  if (!user) return;

  const taskRef = ref(db, `users/${user.uid}/lists/${listId}/tasks`);
  const newTaskRef = push(taskRef);

  const snapshot = await get(taskRef);
  const taskCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;

  await set(newTaskRef, {
    name: "Nueva Tarea",
    order: taskCount + 1,
    dateCreated: new Date().toISOString(),
  });
};
