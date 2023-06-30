import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Entry from "./pages/entry/Entry";
import Home from "./pages/Home/Home";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Nav from "./components/nav/Nav";
import { SnackBarProvider } from "./context/SnackBarContext";
import EntryEditor from "./pages/entry/editor/EntryEditor";
import { DialogConfirmProvider } from "./context/DialogConfirmContext";
import AcornLoader from "./components/acorn-loader/AcornLoader";
// import UploadPhoto from "./components/upload-photo/UploadPhoto";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SnackBarProvider>
          <DialogConfirmProvider>
            <UserLoading>
              <Nav />
              <Routes>
                <Route exact path="/" element={<Home />} />
                {/* <Route path="/upload/:id" element={<UploadPhoto />} /> */}
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

                <Route
                  path={"entry/:id/edit"}
                  element={
                    <PrivateRoute>
                      <EntryEditor />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </UserLoading>
          </DialogConfirmProvider>
        </SnackBarProvider>
      </AuthProvider>
    </div>
  );
}

const UserLoading = ({ children }) => {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AcornLoader size={60} />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default App;
