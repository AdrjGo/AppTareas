import { ref, set, push, get, update } from "firebase/database";
import { auth, db } from "@/config/firebaseConfig";

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
