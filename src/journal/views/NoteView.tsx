import { useEffect, useMemo, useRef } from "react";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { ImageGallery } from "../components/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useForm } from "./../../hooks/useForm";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "./../../store/journal/thunks";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const NoteView = () => {
  const { active, messageSaved, isSaving } = useSelector(
    (state: RootState) => state.journal
  );

  const { body, title, date, onInputChange, formState } = useForm(active);

  const dateString = useMemo(() => {
    const auxDate = format(new Date(date), "dd 'de' MMMM 'del' yyyy - pp", {
      locale: es,
    });
    return auxDate;
  }, [date]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }: any) => {
    if (target.files.length === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={29} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button onClick={onSaveNote} color="primary" disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          name="title"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          value={title}
          onChange={onInputChange}
          disabled={isSaving}
        />
        <TextField
          type="text"
          name="body"
          variant="filled"
          fullWidth
          multiline
          placeholder="Qué sucedió el día de hoy?"
          minRows={5}
          value={body}
          onChange={onInputChange}
          disabled={isSaving}
        />
      </Grid>
      <Grid container justifyContent={"end"}>
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
        </Button>
      </Grid>

      {active?.imageUrls && active?.imageUrls.length > 0 ? (
        <ImageGallery imageUrls={active?.imageUrls} />
      ) : (
        <p>Sin imagenes</p>
      )}
    </Grid>
  );
};
