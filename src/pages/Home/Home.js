import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";
import "./Home.css";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <h1>Welcome to Acorn Blog!</h1>
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
    e.preventDefault();
    setIsLoadingPost(true);
    var d = new Date(Date.now());
    await createDoc({
      docRef: `/entries`,
      docObject: {
        title: "",
        content: "",
        created: d,
        user: userId,
        published: false,
        lastUpdated: d,
      },
    })
      .then((res) => {
        navigate(`/entry/${res.id}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPost(false);
      });
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
  const [docs, setDocs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    let unsubscribe = () => {};
    const getData = async () => {
      const q = query(
        collection(db, "entries"),
        where("user", "==", userId),
        orderBy("created", "desc")
      );
      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const newDocs = [];
          querySnapshot.forEach((doc) => {
            newDocs.push({ ...doc.data(), key: doc.id });
          });
          setDocs(newDocs);
          setIsLoading(false);
          setErr();
        },
        (error) => {
          setErr(error.message);
          setIsLoading(false);
        }
      );
    };

    getData();
    return () => unsubscribe && unsubscribe();
  }, [userId]);

  if (isLoading) {
    return <div>loading Entries...</div>;
  }
  if (err) {
    return <div>{err}</div>;
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
    <NavLink className="Entry-link" to={`/Entry/${entry.key}`}>
      <div className="Entry-container">
        <h3 className="Entry-title">
          {entry.title ? entry.title : '"Empty Title..."'}
        </h3>
        {" - "}
        <h4 className="Entry-date">
          {entry.created.toDate().toLocaleDateString()}
        </h4>
      </div>
    </NavLink>
  );
};

export default Home;
