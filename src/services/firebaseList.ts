import { ref, set, push, get, query, orderByChild, update } from "firebase/database";
import { auth, db } from "@/config/firebaseConfig";

interface ListData {
  name: string;
  description?: string;
  dueDate?: string;
  priority?: 'alta' | 'media' | 'baja';
  status?: 'pendiente' | 'completada';
}

export const addList = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const listRef = ref(db, `users/${user.uid}/lists`);
  const newListRef = push(listRef);

  const snapshot = await get(listRef);
  const listCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;

  await set(newListRef, {
    name: "Nueva Lista",
    tasks: [],
    order: listCount + 1,
    dateCreated: new Date().toISOString(),
  });

  return newListRef.key;
};

export const getListsByDate = async (date: string) => {
  const user = auth.currentUser;
  if (!user) return [];

  const listRef = ref(db, `users/${user.uid}/lists`);
  const snapshot = await get(listRef);

  if (!snapshot.exists()) return [];

  const lists = [];
  const data = snapshot.val();

  for (const key in data) {
    if (data[key].dueDate?.split('T')[0] === date.split('T')[0]) {
      lists.push({
        id: key,
        ...data[key]
      });
    }
  }

  return lists;
};

export const updateList = async (listId: string, updates: Partial<ListData>) => {
  const user = auth.currentUser;
  if (!user) return;

  const listRef = ref(db, `users/${user.uid}/lists/${listId}`);
  await set(listRef, updates);
};

export const editList = async (listId: string, newListName: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const listRef = ref(db, `users/${user.uid}/lists/${listId}`);

  try {
    await update(listRef, {
      name: newListName,
    });
    console.log("Nombre de lista actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el nombre de la lista", error);
  }
};
