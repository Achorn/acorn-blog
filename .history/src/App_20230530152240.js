import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SignIn />
      </header>
    </div>
  );
}

function SignIn() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
      }}
    >
      <label>
        Email:
        <input type="text" name="email" />
      </label>
      <label>
        Password:
        <input type="text" name="password" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
export default App;
