import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAcc, setNewAcc] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      if (newAcc) {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(data);
      } else {
        const data = await signInWithEmailAndPassword(auth, email, password);
        console.log(data);
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const toggleAccount = () => setNewAcc((prev) => !prev);
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
        <input type="submit" value={newAcc ? "Create New Account" : "Log In"} />
      </form>
      <div>
        <button>Log In with Google</button>
        <button>Log In with Github</button>
      </div>
      {error}
      <span onClick={toggleAccount}>
        {newAcc ? "Sign In" : "Create Account"}
      </span>
    </div>
  );
};

export default Auth;
