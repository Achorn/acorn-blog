import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { NavLink } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInState, setSignInState] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    setSignInState("Signing in...");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
        setSignInState("Success!!");
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setSignInState("Error!!");
      });
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log("signed in...");
    //     console.log(user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log("error");
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //     // ..
    //   });
  }
  return (
    <div>
      <p>Sign In</p>
      <form onSubmit={handleSubmit}>
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
      <p>
        {" "}
        Don't have an account? <NavLink to={"signup"}>Sing up!</NavLink>
      </p>
      <p>{signInState}</p>
    </div>
  );
}

export default SignIn;
