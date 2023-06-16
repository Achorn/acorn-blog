import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import useFirestore from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
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
    setPost(newPost);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(() => {
        console.log("timeout Triggered");
        saveEntry();
      }, 4000)
    );
  };

  const saveEntry = async () => {
    setIsSavingPost(true);
    try {
      console.log("title: ", post.title);
      await putDoc({
        docRef: `users/${user.uid}/entries/${id}`,
        docObject: {
          title: post.title,
          content: post.content,
          date: post.date,
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
      <div>
        <input
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
        <br />
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
        <div>
          <button onClick={deleteEntry}>delete</button>
        </div>
        <div>{savingPost ? "saving..." : ""}</div>
      </div>
    );
  }
};

export default Entry;