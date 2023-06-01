import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  let navigate = useNavigate();
  const { signIn } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    // setErr();
    console.log("signing in...");
    // signIn(email, password)
    //   .then((res) => {
    //     console.log(" yes...");

    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.log(" no...");

    //     setErr(err);
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
      <p>{err}</p>

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
