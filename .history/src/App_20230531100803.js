import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [uid, setUid] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUid(user.uid);
        // ...
        console.log("user is signed in");
      } else {
        setUid("");

        console.log("user is signed out");
        // User is signed out
        // ...
      }
    });
  });
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path={"/signup"} element={<SignUp />} />
          <Route exact path={"/signin"} element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}
function Main() {
  return (
    <div>
      main page
      <NavLink to={`signin`}> sign In </NavLink>
    </div>
  );
}

// function account() {}
export default App;
