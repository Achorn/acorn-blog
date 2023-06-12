import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Entry from "./pages/Entry";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./components/nav/Nav";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path={"/signup"} element={<SignUp />} />
          <Route exact path={"/signin"} element={<SignIn />} />
          <Route path={"entry/:id"} element={<Entry />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
