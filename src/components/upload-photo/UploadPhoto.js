import { useState } from "react";
import { useParams } from "react-router-dom";
// import { doc, updateDoc } from "firebase/firestore";
import useStorage from "../../hooks/useStorage";
import { CircularProgress } from "@mui/material";

const UploadPhoto = () => {
  const { startUpload, progress } = useStorage();
  const [selectedFile, setSelectedFile] = useState();

  const { id } = useParams();

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log("changing");
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      startUpload(selectedFile, id);
    }

    setSelectedFile(null);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange}></input>
        <button disabled={!selectedFile}>Upload</button>
      </form>
      <CircularProgress variant="determinate" value={progress} />
    </div>
  );
};

export default UploadPhoto;
