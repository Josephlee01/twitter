import { collection, getDoc, query, where } from "@firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { auth, db } from "../fbase";

const Profile = ({ userObj }) => {
  const onLogOutClick = () => {
    auth.signOut();
  };

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
  };

  // const getMyTweets = async () => {
  //   const q = query(collection(db, "tweets"), where("authorId", "==", userObj.uid))
  //   await getDoc(q)
  // }

  // useEffect(() => {
  //   getMyTweets();
  // })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display Name" />
        <input type="submit" value="Update Display Name" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
