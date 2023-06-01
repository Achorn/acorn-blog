import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpState, setSignUpState] = useState("");
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setSignUpState("Signing in...");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("signed in...");
        console.log(user);
        setSignUpState("Success!!");

        navigate("/", { replace: true });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setSignUpState(error.message);

        // ..
      });
  }
  return (
    <div>
      <p>Sign Up</p>
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
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p>{signUpState}</p>
    </div>
  );
}

export default SignUp;
