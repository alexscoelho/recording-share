import { useLoaderData, useParams } from "react-router-dom";
import supabase from "../lib/supabase";

export default function AudioPlayer() {
  const publicUrl = useLoaderData() as string;

  return (
    <>
      <audio controls src={publicUrl}></audio>
    </>
  );
}

export async function loader({ params }: any) {
  const { teamName, recordingId } = params;
  const { data } = supabase.storage
    .from("audio-recordings")
    .getPublicUrl(`${teamName}/${recordingId}`);
  return data.publicUrl;
}
