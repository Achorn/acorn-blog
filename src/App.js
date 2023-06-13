import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Entry from "./pages/Entry";
import Home from "./pages/Home";
import PublicRoute from "./routes/PublicRoute";
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
          <Route
            exact
            path={"/signup"}
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            exact
            path={"/signin"}
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route path={"entry/:id"} element={<Entry />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
