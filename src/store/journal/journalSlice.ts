import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { noteActiveI, noteI } from "../../entities";

export interface JournalSlice {
  isSaving: boolean;
  messageSaved: string;
  notes: noteI[];
  active: noteActiveI | null;
}

const initialState: JournalSlice = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    savingNewNote: (state: JournalSlice, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    addNewEmptyNote: (state: JournalSlice, action: PayloadAction<noteI>) => {
      state.notes.push(action.payload);
    },
    setActiveNote: (
      state: JournalSlice,
      action: PayloadAction<noteActiveI>
    ) => {
      state.active = action.payload;
      state.messageSaved = ``;
    },
    setNotes: (state: JournalSlice, action: PayloadAction<Array<noteI>>) => {
      state.notes = action.payload;
    },
    setSaving: (state: JournalSlice, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
      state.messageSaved = ``;
    },
    updateNote: (state: JournalSlice, action: PayloadAction<noteI>) => {
      state.isSaving = false;
      state.notes = state.notes.map((note: noteI) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosToActiveNote: (
      state: JournalSlice,
      action: PayloadAction<string[]>
    ) => {
      if (state.active?.imageUrls) {
        state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      }
    },
    clearNotesLogout: (state: JournalSlice) => {
      state.isSaving = false;
      state.messageSaved = "";
      (state.notes = []), (state.active = null);
    },
    deleteNoteById: (state: JournalSlice, action: PayloadAction<string>) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  setPhotosToActiveNote,
  clearNotesLogout,
} = journalSlice.actions;

export default journalSlice.reducer;
