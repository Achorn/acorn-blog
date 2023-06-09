import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { doc, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const Entry = () => {
  const [post, setPost] = useState({});
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
    return (
      <div>
        <h1>{"Entry"}</h1>
        <h2>{post.title}</h2>
        <h3>{post.content}</h3>
      </div>
    );
  }
};

export default Entry;
