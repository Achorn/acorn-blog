import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInState, setSignInState] = useState("");
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    useAuth.SignIn();

    setSignInState("Signing in...");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
        setSignInState("Success!!");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setSignInState(error.message);
      });
  }
  return (
    <div>
      <p>Sign In</p>
      <form onSubmit={(e) => handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />{" "}
        <label>
          Password:
          <input
            // type="text"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p>{signInState}</p>

      <p>
        {" "}
        Don't have an account?{" "}
        <NavLink to={"/signup"} end>
          Sing up!
        </NavLink>
      </p>
    </div>
  );
}

export default SignIn;
