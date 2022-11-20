import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/Card";
import { Team } from "../interfaces/core-interfaces";

export default function HomePage({ teams }: any) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {teams?.map((team: Team) => {
          return (
            <Grid item xs={4}>
              <BasicCard team={team} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
