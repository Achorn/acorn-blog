import "./App.css";
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
        </Routes>

        <header className="App-header">
          <SignIn />
        </header>
      </Router>
    </div>
  );
}
function Main() {
  return <div>main page</div>;
}

export default App;
