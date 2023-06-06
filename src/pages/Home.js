import React from "react";
import Nav from "./components/nav/Nav";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

const Home = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState([]);
  const [loadingPost, setIsLoadingPost] = useState(false);

  const addEntry = async (e) => {
    console.log("triggered button");
    e.preventDefault();
    setIsLoadingPost(true);
    try {
      var d = new Date(Date.now());
      console.log("date:", d.toString());
      const docRef = await addDoc(collection(db, "entries"), {
        title: title,
        user: user.uid,
        content: content,
        date: d,
      });
      console.log("Document written with ID: ", docRef.id);
      setIsLoadingPost(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoadingPost(false);
    }
  };

  useEffect(() => {
    let unsubscribe;
    try {
      const q = query(collection(db, "entries"), orderBy("date", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          key: doc.id,
        }));
        setEntries(newData);
        console.log("Entries: ", newData.join(", "));
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsubscribe();
  }, []);

  const createEntry = () => {
    if (user) {
      return (
        <div>
          <div>Create entry</div>

          <input
            type="text"
            placeholder="title"
            on
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder=" add content"
            on
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn"
              onClick={addEntry}
              disabled={loadingPost}
            >
              Submit
            </button>
          </div>
        </div>
      );
    }
    return <div />;
  };

  return (
    <div>
      <Nav />
      <h1> Acorn Blog</h1>
      {createEntry()}
      <div>
        {entries?.map((entry, i) => (
          <div>
            <h2 key={i}>{entry.title}</h2>
            <h3>{entry.content}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
