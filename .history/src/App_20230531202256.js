import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

function App() {
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
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    await logOut()
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };
  if (user) {
    console.log("auth; ", user);
    return (
      <div>
        <p>hello: {user.email}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <NavLink to={`signin`}> sign In </NavLink>{" "}
      </div>
    );
  }
}
export default App;
