import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AlbumIcon from "@mui/icons-material/Album";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import supabase from "../lib/supabase";
import { Button } from "@mui/material";

export default function BasicList({ recordings }: any) {
  const deleteFile = async (filePath: string) => {
    let arrayPath = [];
    arrayPath.push(filePath);
    const { data, error } = await supabase.storage
      .from("audio-recordings")
      .remove(arrayPath);
  };
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {recordings?.map((recording: any) => {
            return (
              <ListItem key={recording.id} disablePadding>
                <Link className="text-link" to={`recording/${recording.name}`}>
                  <ListItemButton>
                    <ListItemIcon>
                      <AlbumIcon />
                    </ListItemIcon>
                    <ListItemText primary={recording.name} />
                  </ListItemButton>
                </Link>
                <Button onClick={() => deleteFile(recording.name)}>
                  <DeleteIcon />
                </Button>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}
