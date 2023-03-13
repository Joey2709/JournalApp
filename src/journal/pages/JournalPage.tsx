import { AddOutlined, MailOutline } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { NoteView } from "../views/NoteView";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { JournalLayout } from "./../layout/JournalLayout";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "./../../store/journal/thunks";
import { RootState } from "../../store/store";

export const JournalPage = () => {
  const { isSaving, active } = useSelector((state: RootState) => state.journal);

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {active ? <NoteView /> : <NothingSelectedView />}
      <IconButton
        size="large"
        disabled={isSaving}
        sx={{
          color: "white",
          backgroundColor: "error.main",
          opacity: 0.7,
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
        onClick={onClickNewNote}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
