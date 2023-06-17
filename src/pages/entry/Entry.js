import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { doc, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import useFirestore from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import DropDown from "../../components/dropdown/DropDown";
import { FiTrash } from "react-icons/fi";
import "./Entry.css";

const Entry = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState({});

  const [loadingPost, setIsLoadingPost] = useState(false);
  const [savingPost, setIsSavingPost] = useState(false);
  const [timeoutId, setTimeoutId] = useState();
  const { deleteDocument, putDoc } = useFirestore();

  const handleUpdatePost = (newPost) => {
    console.log("setting new post; ", newPost.title);
    setPost(newPost);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        console.log("timeout Triggered");
        saveEntry(newPost);
      }, 4000)
    );
  };

  const saveEntry = async (newPost) => {
    setIsSavingPost(true);
    try {
      console.log("title: ", newPost);

      await putDoc({
        docRef: `users/${user.uid}/entries/${id}`,
        docObject: {
          title: newPost.title,
          content: newPost.content,
          date: newPost.date,
        },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setIsSavingPost(false);
  };

  const deleteEntry = async (e) => {
    console.log("deleting entry...");
    e.preventDefault();
    setIsSavingPost(true);
    try {
      await deleteDocument({
        docPath: `users/${user.uid}/entries`,
        docKey: id,
      });

      console.log("Document deleted");
      navigate(`/`);
      setIsSavingPost(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsSavingPost(false);
    }
  };

  useEffect(() => {
    let unsubscribe = () => {};
    setIsLoadingPost(true);
    try {
      let docRef = `users/${user.uid}/entries/${id}`;
      const q = query(doc(db, docRef));
      unsubscribe = onSnapshot(q, (doc) => {
        let newData = {};
        newData = {
          ...doc.data(),
        };
        setPost(newData);
        setIsLoadingPost(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoadingPost(false);
    }
    return () => unsubscribe();
  }, [id, user]);

  if (loadingPost) {
    return <div>Loading...</div>;
  } else if (JSON.stringify(post) === "{}") {
    return <div>no post here...</div>;
  } else {
    return (
      <div className="Entr-container">
        <div className="Entr-width">
          <div className="Title-with-dropdown">
            <input
              maxLength={50}
              type="text"
              className="Entry-title-editor"
              placeholder="title"
              defaultValue={post.title}
              onChange={(e) => {
                let updatedPost = { ...post };
                updatedPost.title = e.target.value;
                handleUpdatePost(updatedPost);
              }}
            />
          </div>
          <textarea
            type="text"
            className="Entry-content-editor"
            placeholder="Start Journaling"
            defaultValue={post.content}
            onChange={(e) => {
              let updatedPost = { ...post };
              updatedPost.content = e.target.value;
              handleUpdatePost(updatedPost);
            }}
          />
          {/* <AutoResizeTextArea defValue={post.content} placeholder="hello" /> */}
          <div>
            {/* <button onClick={deleteEntry}>delete</button> */}
            <DropDown className="Drop-btn">
              <FiTrash size="25" color="red" onClick={deleteEntry}>
                trash
              </FiTrash>
            </DropDown>
          </div>
          <div>{savingPost ? "saving..." : ""}</div>
        </div>
      </div>
    );
  }
};

export default Entry;

// function AutoResizeTextArea({ defValue, placeholder }) {
//   const [value, setValue] = useState("");
//   const textAreaRef = useRef();

//   useAutosizeTextArea(textAreaRef.current, value);

//   const handleChange = (evt) => {
//     const val = evt.target?.value;
//     setValue(val);
//   };

//   return (
//     <textarea
//       className="Text-area-tester"
//       id="review-text"
//       onChange={handleChange}
//       placeholder={placeholder}
//       defaultValue={value}
//       ref={textAreaRef}
//       rows={1}
//     />
//   );
// }

// const useAutosizeTextArea = (textAreaRef, value) => {
//   useEffect(() => {
//     if (textAreaRef) {
//       textAreaRef.style.height = "0px";
//       const scrollHeight = textAreaRef.scrollHeight;
//       textAreaRef.style.height = scrollHeight + "px";
//     }
//   }, [textAreaRef, value]);
// };
