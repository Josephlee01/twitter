import React from 'react'
import { auth } from "../fbase";

const Profile = () => {
  const onLogOutClick = () => {
    auth.signOut();
  }
  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  )
}

export default Profile
