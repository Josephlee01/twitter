import React from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../fbase";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocialClick = async (e) => {
    let provider;
    if (e.target.name === "google") {
      provider = new GoogleAuthProvider();
    } else if (e.target.name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Log In with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Log In with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
