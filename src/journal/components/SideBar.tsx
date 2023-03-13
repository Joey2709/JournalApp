import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { noteI } from "../../entities";
import { RootState } from "../../store/store";
import SideBarIrtem from "./SideBarIrtem";

export const SideBar = ({ drawerWidth }: any) => {
  const { displayName } = useSelector((state: RootState) => state.auth);
  const { notes } = useSelector((state: RootState) => state.journal);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note: noteI) => (
            <SideBarIrtem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
