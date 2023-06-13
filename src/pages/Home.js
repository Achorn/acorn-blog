import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Home = () => {
  const { user, userLoading } = useAuth();
  const navigate = useNavigate();
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

  if (userLoading) {
    return <div>loading User...</div>;
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
      <Entries userId={user.uid} />
    </div>
  );
};

const Entries = ({ userId }) => {
  const { docs, isLoading } = useFirestore(`users/${userId}/entries`);

  if (isLoading) {
    return <div>loading Entries...</div>;
  }
  return (
    <div>
      {docs?.map((entry, i) => (
        <Entry key={i} entry={entry} />
      ))}
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
