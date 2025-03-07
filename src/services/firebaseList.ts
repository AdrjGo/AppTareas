import { ref, set, push, get } from "firebase/database";
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

