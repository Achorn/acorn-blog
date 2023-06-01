import React, { useEffect } from "react";

function SignIn() {
  const [name, setName] = useEffect;
  const [password, setPassword] = useEffect;

  // function handleSubmit() {}
  return (
    <div>
      <p>hello?</p>
      <form></form>
      {/* <form */}
      {/* // onSubmit={(e) => { */}
      {/* // e.preventDefault(); */}
      {/* // console.log(e);
      // }
      // } */}
      {/* > */}
      {/* <label>
          Email:
          <input
            type="text"
            name="email"
            // onChange={(e) => setName(e.tar.value)}
          />
        </label>
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>{name}</p> */}
    </div>
  );
}

export default SignIn;
