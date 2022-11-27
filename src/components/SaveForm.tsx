import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Team } from "../interfaces/core-interfaces";

export default function SaveForm({ teams, handleSubmit }: any) {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [fileName, setFileName] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTeam(event.target.value as string);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(fileName, selectedTeam);
      }}
    >
      <TextField
        required
        onChange={(e) => setFileName(e.target.value)}
        value={fileName}
        id="outlined-basic"
        label="Recording Name"
        variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel id="select-team-label">Teams</InputLabel>
        <Select
          labelId="select-team-label"
          id="select-team"
          value={selectedTeam}
          label="Team"
          onChange={handleChange}
        >
          {teams.map((team: Team) => (
            <MenuItem key={team.id} value={team.name}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  );
}
