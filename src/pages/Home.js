import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return <h1>Sign in to start Journaling!</h1>;
  }
  return (
    <div>
      <h1> Your Entries </h1>
      <CreateEntryButton userId={user.uid} />
      <Entries userId={user.uid} />
    </div>
  );
};

const CreateEntryButton = ({ userId }) => {
  const navigate = useNavigate();
  const { createDoc } = useFirestore();

  const createEntry = async (e) => {
    console.log("triggered button");
    e.preventDefault();
    setIsLoadingPost(true);
    try {
      var d = new Date(Date.now());
      console.log("date:", d.toString());
      const docRef = await createDoc({
        docRef: `users/${userId}/entries`,
        docObject: {
          title: "New Entry",
          content: "",
          date: d,
        },
      });
      console.log("Document written with ID: ", docRef.id);
      setIsLoadingPost(false);
      navigate(`/entry/${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsLoadingPost(false);
    }
  };

  const [loadingPost, setIsLoadingPost] = useState(false);

  return (
    <div>
      <button onClick={createEntry} disabled={loadingPost}>
        New Entry
      </button>
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
