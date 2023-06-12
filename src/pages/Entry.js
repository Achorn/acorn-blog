import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const Entry = () => {
  const { user } = useAuth();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [loadingPost, setIsLoadingPost] = useState(false);

  useEffect(() => {
    let unsubscribe;
    setIsLoadingPost(true);
    try {
      const q = query(doc(db, "entries", id));
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
  }, [id]);

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
              // onClick={addEntry}
              disabled={loadingPost}
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
