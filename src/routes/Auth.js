import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const onSubmit = (e) => e.preventDefault();
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          value={email}
          placeholder="Email"
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
          required
        />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Log In with Google</button>
        <button>Log In with Github</button>
      </div>
    </div>
  );
};

export default Auth;
