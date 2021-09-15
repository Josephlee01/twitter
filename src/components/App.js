import React, { useState } from "react";
import AppRouter from "./AppRouter";
import { authSvc } from "../fbase";

function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState(authSvc.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy;{new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
