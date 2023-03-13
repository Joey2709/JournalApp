import { collection, doc, setDoc } from "firebase/firestore/lite";
import { noteI } from "../../entities";
import { loadNotes } from "../../helpers/loadNotes";
import { FirebaseDB } from "./../../firebase/config";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = (): any => {
  return async (dispatch: any, getState: any) => {
    console.log("startNewNote");
    console.log(getState());
    dispatch(savingNewNote(true));
    const { uid } = getState().auth;
    //uid
    const newNote: noteI = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    const setDocResp = await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    console.log("newDodc", newDoc);
    console.log("setDocResp", setDocResp);

    //dispatch
    //dispatch(newNote)
    dispatch(addNewEmptyNote(newNote));
    //disaptch(activeNote)
    dispatch(setActiveNote({ ...newNote, imageUrls: [] }));
    dispatch(savingNewNote(false));
  };
};

export const startLoadingNotes = (): any => {
  return async (dispatch: any, getState: any) => {
    const { uid } = getState().auth;

    console.log("uid ", uid);
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = (): any => {
  return async (dispatch: any, getState: any) => {
    dispatch(setSaving(true));

    const { uid } = getState().auth;

    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });
    dispatch(updateNote(note));
    console.log("noteToFireStore", noteToFireStore);
    dispatch(setSaving(false));
  };
};
