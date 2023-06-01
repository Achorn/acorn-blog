import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";

function App() {
  // const [uid, setUid] = useState("");

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path={"/signup"} element={<SignUp />} />
            <Route exact path={"/signin"} element={<SignIn />} />
          </Routes>
        </Router>
      </AuthProvider>
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
  if (auth !== "") {
    console.log("auth ; ");
    return <button onClick={handleLogout}>logout</button>;
  } else {
    return <NavLink to={`signin`}> sign In </NavLink>;
  }
}
export default App;
