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
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useSnackBar } from "../../context/SnackBarContext";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import DropdownMenu from "../../components/dropdown/DropDown";
import { CircularProgress, ListItemIcon } from "@mui/material";

const Entry = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { setAlert } = useSnackBar();

  const [loadingPost, setIsLoadingPost] = useState(true);
  const { deleteDocument, putDoc } = useFirestore();
  const [error, setError] = useState();

  const saveEntry = async (newPost) => {
    setAlert({ message: "saving" });
    var d = new Date(Date.now());
    newPost.lastUpdated = d;
    await putDoc({
      docRef: `/entries/${id}`,
      docObject: newPost,
    })
      .then(() => {
        setAlert({ message: "saved", severity: "info" });
      })
      .catch((err) => {
        setAlert({
          message: "Error saving: " + err.code,
          severity: "error",
          duration: 6000,
        });
      });
  };

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
    return (
      <div>
        {" "}
        <CircularProgress color="inherit" />
      </div>
    );
  } else if (JSON.stringify(post) === "{}" || error) {
    return <div>no post here...</div>;
  } else {
    return (
      <div className="Entr-container">
        <div className="Entr-width">
          <div className="Title-with-dropdown">
            <div className="Entr-title">{post.title}</div>
          </div>
          {/* <div>{`${countWords(post.content)} words`}</div> */}
          <p className="Entry-details">{`${Math.round(
            wordcount(countWords(post.content))
          )} minute read`}</p>

          <div className="Entry-content-display">
            <p>{post.content}</p>
          </div>

          <div>
            {user ? (
              <DropdownMenu>
                <AlertDialog handleClick={deleteEntry} />
                <MenuItem
                  disableRipple
                  onClick={() => navigate(`/entry/${id}/edit`)}
                >
                  <ListItemIcon>
                    <CreateOutlinedIcon />
                  </ListItemIcon>
                  Edit
                </MenuItem>
                <MenuItem
                  disableRipple
                  onClick={() => {
                    const newPost = { ...post };
                    newPost.published = !newPost.published;
                    saveEntry(newPost);
                  }}
                >
                  <ListItemIcon>
                    <ArticleOutlinedIcon />
                  </ListItemIcon>
                  {post.published ? "Un-publish" : "Publish"}
                </MenuItem>
              </DropdownMenu>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div style={{ height: "100px" }}></div>
      </div>
    );
  }
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
        <ListItemIcon>
          <DeleteOutlineIcon />
        </ListItemIcon>
        Delete
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
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

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

function wordcount(numWords) {
  return numWords / 200;
}
