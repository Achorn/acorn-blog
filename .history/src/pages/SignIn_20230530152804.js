import React, { useEffect } from "react";

function SignIn() {
  const [name, setName] = useEffect;
  const [password, setPassword] = useEffect;

  function handleSubmit() {}
  return (
    <div>
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
    </div>
  );
}

export default SignIn;
