import React, { useState, useEffect } from "react";
import AppRouter from "./AppRouter";
import { auth } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
        console.log(user.uid);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <br />
      <footer>&copy;{new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
