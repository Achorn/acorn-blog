import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();
  const { SignUp } = useAuth();
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr();
    await SignUp(email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        setErr(error.message);
      });
  };
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
      <p>{err}</p>
      <p>
        Already have an account? <NavLink to="/signin">Sign in</NavLink>
      </p>
    </div>
  );
}

export default SignUp;
