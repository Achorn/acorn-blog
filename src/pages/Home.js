import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loadingPost, setIsLoadingPost] = useState(false);
  const [loadingEntries, setIsLoadingEntries] = useState(false);

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
          content: "",
          date: d,
        }
      );
      console.log("Document written with ID: ", docRef.id);
      setIsLoadingPost(false);
      navigate(`/entry/${docRef.id}`);
      //redirect to post
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoadingPost(false);
    }
  };

  useEffect(() => {
    let unsubscribe;
    console.log("in use effect");
    if (!user || !user.uid) return;
    setIsLoadingEntries(true);
    try {
      console.log("UID????", user?.uid);
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
      setIsLoadingEntries(false);
    } catch (error) {
      console.log(error);
      setIsLoadingEntries(false);
    }
    return () => unsubscribe();
  }, [user]);

  if (loadingEntries) {
    return <div>loading Entries...</div>;
  }
  if (!user) {
    return <h1>Sing in to start Journaling!</h1>;
  }
  return (
    <div>
      <h1> Your Entries </h1>
      <button onClick={createEntry} disabled={loadingPost}>
        New Entry
      </button>

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
        <h4>{entry.date.toDate().toString()}</h4>
      </div>
    </NavLink>
  );
};

export default Home;
