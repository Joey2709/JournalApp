import { collection, getDocs } from "firebase/firestore/lite";
import { noteI } from "../entities";
import { FirebaseDB } from "./../firebase/config";

export const loadNotes = async (uid: string = "") => {
  if (!uid) throw new Error("El UID no existe");

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  console.log("collectionRef", collectionRef);
  console.log("docs", docs);

  let auxNotes: noteI[] = [];

  docs.forEach((doc) => {
    auxNotes.push({ id: doc.id, ...(doc.data() as noteI) });
  });

  console.log("auxNotes", auxNotes);
  return auxNotes;
};
