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
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [loadingPost, setIsLoadingPost] = useState(false);
  const [savingPost, setIsSavingPost] = useState(false);
  const { deleteDocument, putDoc } = useFirestore();

  const saveEntry = async (e) => {
    console.log("triggered button");
    e.preventDefault();
    setIsSavingPost(true);
    try {
      await putDoc({
        docRef: `users/${user.uid}/entries/${id}`,
        docObject: {
          title: title,
          content: content,
          date: post.date,
        },
      });

      console.log("Document saved");
      setIsSavingPost(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsSavingPost(false);
    }
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
      console.log("docRef: ", docRef);
      const q = query(doc(db, docRef));
      unsubscribe = onSnapshot(q, (doc) => {
        let newData = {};
        newData = {
          ...doc.data(),
        };
        setPost(newData);
        setTitle(newData.title);
        setContent(newData.content);
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          type="text"
          className="Entry-content-editor"
          placeholder="Start Journaling"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="btn-container">
          <button
            type="submit"
            className="btn"
            onClick={saveEntry}
            disabled={savingPost}
          >
            Save
          </button>
        </div>
        <button
          type="submit"
          className="btn"
          onClick={deleteEntry}
          disabled={savingPost}
        >
          Delete
        </button>
      </div>
    );
  }
};

export default Entry;
