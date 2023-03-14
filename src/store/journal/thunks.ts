import axios from "axios";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { fileI, noteI } from "../../entities";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { FirebaseDB } from "./../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
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

    dispatch(addNewEmptyNote(newNote));
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
  };
};

export const startUploadingFiles = (files: fileI[]): any => {
  return async (dispatch: any) => {
    //dispatch(setSaving(true));

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photos = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photos));
  };
};

export const startDeletingNote = (): any => {
  return async (dispatch: any, getState: any) => {
    const { uid } = getState().auth;

    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
