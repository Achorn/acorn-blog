import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, query, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const Entry = () => {
  const { user } = useAuth();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [loadingPost, setIsLoadingPost] = useState(false);
  const [savingPost, setIsSavingPost] = useState(false);

  const saveEntry = async (e) => {
    console.log("triggered button");
    e.preventDefault();
    setIsSavingPost(true);
    try {
      await setDoc(doc(db, "users", user.uid, "entries", id), {
        title: title,
        content: content,
        date: post.date,
      });
      console.log("Document saved");
      setIsSavingPost(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsSavingPost(false);
    }
  };
  useEffect(() => {
    if (!user || !user.uid) return;
    let unsubscribe;

    console.log("UID????", user.uid);
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
    if (user) {
      return (
        <div>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            type="text"
            placeholder=" add content"
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
        </div>
      );
    }
    return <div />;
  }
};

export default Entry;
