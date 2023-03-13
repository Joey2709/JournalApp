import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

interface SideBarIrtemProps {
  id?: string;
  title: string;
  body: string;
  date: number;
  imageUrls: string[];
}

const SideBarIrtem = ({
  title,
  body,
  date,
  id,
  imageUrls = [],
}: SideBarIrtemProps) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          dispatch(setActiveNote({ id, title, body, date, imageUrls }));
        }}
      >
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarIrtem;
