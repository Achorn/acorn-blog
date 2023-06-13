import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState();
  const [docsLoading, setDocsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    const getData = async () => {
      try {
        const q = query(
          collection(db, collectionName),
          orderBy("date", "desc")
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newDocs = [];
          querySnapshot.forEach((doc) => {
            newDocs.push({ ...doc.data(), key: doc.id });
          });
          setDocs(newDocs);
          setDocsLoading(false);
        });
      } catch (error) {
        console.log(error);
        setDocsLoading(false);
      }
    };

    getData();
    return () => unsubscribe && unsubscribe();
  }, [collectionName]);

  function createDoc({ docRef, docObject }) {
    return addDoc(collection(db, docRef), docObject);
  }
  function putDoc({ docRef, docObject }) {
    return setDoc(doc(db, docRef), docObject);
  }
  const deleteDocument = ({ docPath, docKey }) => {
    return deleteDoc(doc(db, docPath, docKey));
  };

  return { docs, docsLoading, createDoc, deleteDocument, putDoc };
};

export default useFirestore;
