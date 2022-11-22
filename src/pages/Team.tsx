import { Outlet, useLoaderData, useParams } from "react-router-dom";
import BasicList from "../components/List";
import supabase from "../lib/supabase";

import Typography from "@mui/material/Typography";

export default function Team() {
  const params = useParams();
  const teamName = params.teamName;
  const recordingData = useLoaderData();

  return (
    <>
      <Typography variant="h3" gutterBottom align="center">
        {teamName}
      </Typography>
      <Outlet />
      <BasicList recordings={recordingData} />
    </>
  );
}

export async function loader({ params }: any) {
  const { data, error } = await supabase.storage
    .from("audio-recordings")
    .list(params.teamName);

  return data;
}
