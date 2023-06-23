import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import useFirestore from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import "./Entry.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { FiMoreHorizontal } from "react-icons/fi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackBar } from "../../context/SnackBarContext";

const Entry = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { setAlert } = useSnackBar();

  const [loadingPost, setIsLoadingPost] = useState(false);
  // const [timeoutId, setTimeoutId] = useState();
  const { deleteDocument, putDoc } = useFirestore();
  const [error, setError] = useState();

  // const handleUpdatePost = (newPost) => {
  //   setPost(newPost);
  //   if (timeoutId) {
  //     clearTimeout(timeoutId);
  //   }
  //   setTimeoutId(
  //     setTimeout(() => {
  //       saveEntry(newPost);
  //     }, 4000)
  //   );
  // };

  // const saveEntry = async (newPost) => {
  //   setAlert({ message: "saving" });
  //   var d = new Date(Date.now());
  //   newPost.lastUpdated = d;
  //   await putDoc({
  //     docRef: `/entries/${id}`,
  //     docObject: newPost,
  //   })
  //     .then(() => {
  //       setAlert({ message: "saved", severity: "info" });
  //     })
  //     .catch((err) => {
  //       setAlert({
  //         message: "Error saving: " + err.code,
  //         severity: "error",
  //         duration: 6000,
  //       });
  //     });
  // };

  const deleteEntry = async () => {
    return await deleteDocument({
      docPath: `/entries`,
      docKey: id,
    })
      .then(() => {
        setAlert({ message: "Deleted Entry", severity: "info" });

        navigate(`/`);
      })
      .catch((err) => {
        setAlert({
          message: "Error Deleting Entry: " + err.code,
          severity: "error",
          duration: 6000,
        });
      });
  };

  useEffect(() => {
    let unsubscribe = () => {};
    setIsLoadingPost(true);

    let docRef = `/entries/${id}`;
    const q = query(doc(db, docRef));
    unsubscribe = onSnapshot(
      q,
      (doc) => {
        let newData = {};
        newData = {
          ...doc.data(),
        };
        setPost(newData);
        setIsLoadingPost(false);
        setError();
      },
      (error) => {
        setIsLoadingPost(false);
        setError(error);
      }
    );

    return () => unsubscribe();
  }, [id, user]);

  if (loadingPost) {
    return <div>Loading...</div>;
  } else if (JSON.stringify(post) === "{}" || error) {
    return <div>no post here...</div>;
  } else {
    return (
      <div className="Entr-container">
        <div className="Entr-width">
          <div className="Title-with-dropdown">
            {/* <input
              maxLength={50}
              type="text"
              className="Entry-title-editor"
              placeholder="New Title"
              defaultValue={post.title}
              onChange={(e) => {
                let updatedPost = { ...post };
                updatedPost.title = e.target.value;
                handleUpdatePost(updatedPost);
              }}
            /> */}
            <div className="Entry-title-editor">{post.title}</div>
          </div>
          <div className="Entry-content-display">
            <p>{post.content}</p>
          </div>
          {/* <textarea
            type="text"
            className="Entry-content-editor"
            placeholder="Start Journaling"
            defaultValue={post.content}
            onChange={(e) => {
              let updatedPost = { ...post };
              updatedPost.content = e.target.value;
              handleUpdatePost(updatedPost);
            }}
          /> */}
          <div>
            <CustomizedMenu>
              <AlertDialog handleClick={deleteEntry} />
            </CustomizedMenu>
          </div>
        </div>
      </div>
    );
  }
};

const CustomizedMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <FiMoreHorizontal />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {children}
      </Menu>
    </div>
  );
};

const AlertDialog = ({ handleClick }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await handleClick();
    setLoading(false);
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem disableRipple onClick={handleClickOpen}>
        <DeleteOutlineIcon />
        Delete
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deleting Entry"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            are you sure you want to delete entry?
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
    </div>
  );
};

export default Entry;
