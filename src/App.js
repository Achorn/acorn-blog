import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Entries from "./pages/MyEntries";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path={"/signup"} element={<SignUp />} />
            <Route exact path={"/signin"} element={<SignIn />} />
            <Route exact path={"/entries"} element={<Entries />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
