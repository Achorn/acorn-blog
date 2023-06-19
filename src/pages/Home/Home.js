import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <h1> Welcome to Acorn Blog!</h1>
        <h1>A no thrills journalling app to write down your thoughts.</h1>
        <h1>Sign in to get started</h1>
      </div>
    );
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
        <div>
          <Entry key={i} entry={entry} />
        </div>
      ))}
    </div>
  );
};

const Entry = ({ entry }) => {
  return (
    <NavLink className="Entry-link" to={`/Entry/${entry.key}`}>
      <div className="Entry-container">
        <h3 className="Entry-title">{entry.title}</h3>
        {" - "}
        <h4 className="Entry-date">
          {entry.date.toDate().toLocaleDateString()}
        </h4>
      </div>
    </NavLink>
  );
};

export default Home;
