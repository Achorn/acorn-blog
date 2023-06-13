import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Entry from "./pages/Entry";
import Home from "./pages/Home";
import PublicRoute from "./routes/PublicRoute";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Nav from "./components/nav/Nav";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Nav />
        <UserLoading>
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
        </UserLoading>
      </AuthProvider>
    </div>
  );
}

const UserLoading = ({ children }) => {
  const { loading } = useAuth();
  if (loading) {
    return <div>LOADING...</div>;
  }

  return <div>{children}</div>;
};

export default App;
