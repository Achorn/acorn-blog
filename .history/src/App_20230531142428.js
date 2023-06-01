import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  // const [uid, setUid] = useState("");

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log(user);
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/auth.user
  //       setUid(user.uid);
  //       // ...
  //       console.log("user is signed in");
  //     } else {
  //       setUid("");

  //       console.log("user is signed out");
  //       // User is signed out
  //       // ...
  //     }
  //   });
  // });
  return (
    <div className="App">
      <AuthContext.Provider value={"authChecker"}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Main uid={uid} />} />
            <Route exact path={"/signup"} element={<SignUp />} />
            <Route exact path={"/signin"} element={<SignIn />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}
function Main() {
  return (
    <div>
      main page
      <Account />
    </div>
  );
}

function Account() {
  const auth = useContext(AuthContext);

  let navigate = useNavigate();

  function handleLogout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return <button onClick={handleLogout}>logout</button>;

  return <NavLink to={`signin`}> sign In </NavLink>;
}
export default App;
