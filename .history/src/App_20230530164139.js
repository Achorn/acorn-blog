import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/signup" element={<SignIn />} />
          <Route exact path="/signin" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}
function Main() {
  return <div>main page</div>;
}

export default App;
