import { useEffect, useMemo } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { ImageGallery } from "../components/ImageGallery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useForm } from "./../../hooks/useForm";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSaveNote } from "./../../store/journal/thunks";

export const NoteView = () => {
  const { active } = useSelector((state: RootState) => state.journal);

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

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

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
        <Button onClick={onSaveNote} color="primary">
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
        />
      </Grid>
      {/*Imagge Gallery */}
      <ImageGallery />
    </Grid>
  );
};
