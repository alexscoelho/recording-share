import { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import supabase from "./lib/supabase";
import Button from "@mui/material/Button";
import BasicCard from "./components/Card";
import HomePage from "./pages/HomePage";
import { Team } from "./interfaces/core-interfaces";

const Home = () => {
  const [blob, setBlob] = useState<Blob>();
  const [signedUrl, setSignedUrl] = useState<string>();
  const [isRecorded, setIsRecorded] = useState(false);
  const [files, setFiles] = useState<any>();
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMesage] = useState("");
  const [teams, setTeams] = useState<Team[] | []>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("metal");

  useEffect(() => {
    getPublicUrl("recording.wav");
  }, []);

  useEffect(() => {
    getAllFilesList();
  }, [selectedTeam]);

  useEffect(() => {
    getTeams();
  }, []);

  // Get Teams
  const getTeams = async () => {
    const { data: team, error } = await supabase.from("Team").select("*");
    if (team) setTeams(team);
  };

  // Access store assets
  const getPublicUrl = async (filename: string) => {
    const { data } = supabase.storage
      .from("audio-recordings")
      .getPublicUrl(`${selectedTeam}/${filename}`);
    if (data) setSignedUrl(data.publicUrl);
  };

  // Upload asset to store
  const sendAudioFile = async (audioFile: Blob) => {
    if (!fileName || !selectedTeam) {
      setErrorMesage("Sorry, recording name is mandatory");
      return;
    }
    const path = `${selectedTeam}/${fileName}`;
    const formData = new FormData();
    formData.append("audio-file", audioFile);
    const { data, error } = await supabase.storage
      .from("audio-recordings")
      .upload(path, formData);
  };

  // List all storage assets
  const getAllFilesList = async () => {
    const { data, error } = await supabase.storage
      .from("audio-recordings")
      .list(selectedTeam);

    if (data) setFiles(data);
  };

  // Delete a file
  const deleteFile = async (filePath: string) => {
    let arrayPath = [];
    arrayPath.push(filePath);
    const { data, error } = await supabase.storage
      .from("audio-recordings")
      .remove(arrayPath);
  };

  // Recording hook
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      onStop: (_, blob) => {
        setIsRecorded(true);
        setBlob(blob);
      },
    });

  return (
    <div>
      <HomePage teams={teams} />
      <p>{status}</p>
      <Button variant="contained">Hello World</Button>;
      <input
        onChange={(e) => setFileName(e.target.value)}
        type="text"
        placeholder="recording name"
        value={fileName}
      />
      <select
        value={selectedTeam}
        name="team"
        id="team"
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        {teams?.map((team: Team) => (
          <option key={team.id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
      <p>{errorMessage}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <audio controls src={mediaBlobUrl}></audio>
      <audio controls src={signedUrl}></audio>
      <button
        onClick={() => {
          if (blob) sendAudioFile(blob);
        }}
        disabled={!isRecorded}
      >
        Save
      </button>
      <ul>
        {files?.map((file: any) => (
          <li key={file.id}>
            <button onClick={() => getPublicUrl(file.name)}>{file.name}</button>
            <span onClick={() => deleteFile(file.name)}>X</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
