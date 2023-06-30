import { useState } from "react";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../context/AuthContext";
import useFirestore from "./useFirestore";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const { patchDoc } = useFirestore();
  // const [error, setError] = useState(null);
  // const [url, setUrl] = useState(null);

  const startUpload = (file, name) => {
    if (!file) {
      return;
    }
    const metadata = {
      contentType: file.type,
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, user.uid + "/entry_images/" + name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error.code);
        setProgress(0);
        return;
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          patchDoc({
            docRef: `/entries/${name}`,
            docObject: { img: downloadURL },
          })
            .then(() => {
              console.log("saved");
              // setAlert({ message: "saved", severity: "info" });
            })
            .catch((err) => {
              console.log(err);
              // setAlert({
              //   message: "Error saving: " + err.code,
              //   severity: "error",
              //   duration: 6000,
              // });
            });
        });
        setProgress(0);
      }
    );
  };

  return {
    startUpload,
    progress,
  };
};

export default useStorage;
