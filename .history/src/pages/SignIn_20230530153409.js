import React, { useEffect, useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function handleSubmit() {}
  return (
    <div>
      <p>hello?</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
      >
        <label>
          Email:
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.tar.value)}
          />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>{email}</p>
    </div>
  );
}

export default SignIn;
