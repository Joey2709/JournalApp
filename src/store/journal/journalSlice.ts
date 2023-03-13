import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { noteActiveI, noteI } from "../../entities";

export interface JournalSlice {
  isSaving: boolean;
  messageSaved: string;
  notes: noteI[];
  active: noteI | null;
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
    },
    setNotes: (state: JournalSlice, action: PayloadAction<Array<noteI>>) => {
      state.notes = action.payload;
    },
    setSaving: (state: JournalSlice, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    updateNote: (state: JournalSlice, action: PayloadAction<noteI>) => {
      state.notes = state.notes.map((note: noteI) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
    },
    deleteNoteById: (state: any, action: any) => {},
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
} = journalSlice.actions;

export default journalSlice.reducer;
