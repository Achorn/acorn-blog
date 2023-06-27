import { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export const DialogConfirmContext = createContext();
export const useDialogConfirm = () => useContext(DialogConfirmContext);

export const DialogConfirmProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [confirmFunction, setConfirmFunction] = useState();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    console.log("confirmint.....");
    setLoading(true);
    // confirmFunction();
    setLoading(false);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setConfirmation = ({ title, description, handleConfirm }) => {
    setTitle(title);
    setDescription(description);
    setConfirmFunction(handleConfirm());
    setOpen(true);
  };

  return (
    <DialogConfirmContext.Provider value={{ setConfirmation }}>
      {children}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} autoFocus disabled={loading}>
            Delete
          </Button>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </DialogConfirmContext.Provider>
  );
};
