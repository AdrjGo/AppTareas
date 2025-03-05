import { ref, push, set, onValue, remove } from "firebase/database";
import { db } from "@/config/firebaseConfig";
import { Alert } from "react-native";

// 📌 Agregar lista con estructura inicial
export const addList = (user: any) => {
  if (!user) return;

  const userListsRef = ref(db, `users/${user.uid}/lists`);
  const newListRef = push(userListsRef);

  set(newListRef, {
    name: "Nueva Lista",
    tasks: {}, // Espacio reservado para tareas
  })
    .then(() => console.log("Lista creada"))
    .catch((error) => Alert.alert("Error", error.message));
};

// 📌 Escuchar listas en tiempo real
export const subscribeToLists = (user: any, setLists: any) => {
  if (!user) return;
  const userListsRef = ref(db, `users/${user.uid}/lists`);

  return onValue(userListsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const formattedLists = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setLists(formattedLists);
    } else {
      setLists([]);
    }
  });
};

// 📌 Eliminar una lista
export const deleteList = (user: any, listId: any) => {
  if (!user) return;
  const listRef = ref(db, `users/${user.uid}/lists/${listId}`);

  remove(listRef)
    .then(() => console.log("Lista eliminada"))
    .catch((error) => Alert.alert("Error", error.message));
};
