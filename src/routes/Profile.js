import React from 'react'
import { authSvc } from '../fbase'

const Profile = () => {
  const onLogOutClick = () => {
    authSvc.signOut();
  }
  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  )
}

export default Profile
