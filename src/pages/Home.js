import React from "react";
// import Nav from "../components/nav/Nav";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
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
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const [entries, setEntries] = useState([]);
  const [loadingPost, setIsLoadingPost] = useState(false);

  const createEntry = async (e) => {
    console.log("triggered button");
    e.preventDefault();
    setIsLoadingPost(true);
    try {
      var d = new Date(Date.now());
      console.log("date:", d.toString());
      const docRef = await addDoc(
        collection(db, "users", user.uid, "entries"),
        {
          title: "New Entry",
          // user: user.uid,
          content: "",
          date: d,
        }
      );
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
      const q = query(
        collection(db, "users", user.uid, "entries"),
        orderBy("date", "desc")
      );
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          key: doc.id,
        }));

        setEntries(newData);
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {/* <Nav /> */}
      <h1> Acorn Blog</h1>
      {/* {createEntry()} */}
      <button onClick={createEntry}>New Entry</button>

      <div>
        {entries?.map((entry, i) => (
          <Entry key={i} entry={entry} />
        ))}
      </div>
    </div>
  );
};

const Entry = ({ entry }) => {
  return (
    <NavLink to={`/Entry/${entry.key}`}>
      <div className="Entry-container">
        <h2>{entry.title}</h2>
      </div>
    </NavLink>
  );
};

export default Home;
