import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState();
  const [docsLoading, setDocsLoading] = useState(true);

  useEffect(() => {
    console.log("DB collection name: ", collectionName);
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
            // console.log("Firestore Hook data: ", {
            //   ...doc.data(),
            //   key: doc.id,
            // });
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

  // getDocs()

  return { docs, docsLoading };
};

export default useFirestore;
