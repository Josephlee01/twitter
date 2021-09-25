import { useState } from "react";
import { auth } from "../fbase";
import { updateProfile } from "@firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
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
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display Name" onChange={onChange} />
        <input type="submit" value="Update Display Name" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
