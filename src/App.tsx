import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import supabase from "./lib/supabase";

const Home = () => {
  const [blob, setBlob] = useState<Blob>();
  const [isRecorded, setIsRecorded] = useState(false);

  const sendAudioFile = async (audioFile: Blob) => {
    const formData = new FormData();
    formData.append("audio-file", audioFile);
    const { data, error } = await supabase.storage
      .from("audio-recordings")
      .upload("recording.wav", formData);

    console.log(data, error);
  };

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
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <audio controls src={mediaBlobUrl}></audio>
      <button
        onClick={() => {
          if (blob) sendAudioFile(blob);
        }}
        disabled={!isRecorded}
      >
        Save
      </button>
    </div>
  );
};

export default Home;
