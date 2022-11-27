import { useState, useEffect, Fragment } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import supabase from "./lib/supabase";
import HomePage from "./pages/HomePage";
import { Team } from "./interfaces/core-interfaces";
import SaveForm from "./components/SaveForm";
import { Button, Grid, Typography } from "@mui/material";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import StopCircleIcon from "@mui/icons-material/StopCircle";

const Home = () => {
  const [blob, setBlob] = useState<Blob>();
  const [isRecording, setIsRecording] = useState(false);
  const [errorMessage, setErrorMesage] = useState("");
  const [teams, setTeams] = useState<Team[] | []>([]);

  useEffect(() => {
    getTeams();
  }, []);

  // Get Teams
  const getTeams = async () => {
    const { data: team } = await supabase.from("Team").select("*");
    if (team) setTeams(team);
  };

  // Upload asset to store
  const sendAudioFile = async (fileName: string, selectedTeam: string) => {
    if (!fileName || !selectedTeam) {
      setErrorMesage("Sorry, recording name is mandatory");
      return;
    }
    const path = `${selectedTeam}/${fileName}`;
    const formData = new FormData();
    formData.append("audio-file", blob as Blob);
    await supabase.storage.from("audio-recordings").upload(path, formData);
  };

  // Recording hook
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
      onStop: (_, blob) => {
        setBlob(blob);
      },
    }
  );

  return (
    <Grid container>
      <HomePage teams={teams} />
      <SaveForm
        teams={teams}
        handleSubmit={(fileName: string, selectedTeam: string) =>
          sendAudioFile(fileName, selectedTeam)
        }
      />
      <p>{errorMessage}</p>
      <Grid item xs={8}>
        {isRecording ? (
          <Fragment>
            <Typography variant="h4" gutterBottom align="center" color={"red"}>
              Recording...
            </Typography>
            <Button
              onClick={() => {
                setIsRecording(false);
                stopRecording();
              }}
              variant="contained"
              endIcon={<StopCircleIcon />}
            >
              Stop Recording
            </Button>
          </Fragment>
        ) : (
          <Button
            onClick={() => {
              setIsRecording(true);
              startRecording();
            }}
            variant="contained"
            endIcon={<RadioButtonCheckedIcon />}
          >
            Start Recording
          </Button>
        )}

        <audio controls src={mediaBlobUrl}></audio>
      </Grid>
    </Grid>
  );
};

export default Home;
