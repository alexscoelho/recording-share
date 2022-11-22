import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import { Link } from "react-router-dom";

export default function BasicList({ recordings }: any) {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {recordings?.map((recording: any) => {
            return (
              <ListItem key={recording.id} disablePadding>
                <Link to={`recording/${recording.name}`}>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={recording.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </nav>
    </Box>
  );
}
