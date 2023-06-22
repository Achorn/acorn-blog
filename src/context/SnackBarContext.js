import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

export const SnackBarContext = createContext();
export const useSnackBar = () => useContext(SnackBarContext);

export const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [duration, setDuration] = useState(3000);
  const [message, setMessage] = useState("");
  const setAlert = ({ message, severity, duration }) => {
    setOpen(false);

    if (message) {
      setMessage(message);
    } else return;

    severity ? setSeverity(severity) : setSeverity("info");
    duration ? setDuration(duration) : setDuration(3000);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackBarContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar
        onClose={handleClose}
        autoHideDuration={duration}
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};
