import React, { useState, useEffect } from "react";
import AppRouter from "./AppRouter";
import { authSvc } from "../fbase";

function App() {
  const currentUser = authSvc.currentUser;
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authSvc.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy;{new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
