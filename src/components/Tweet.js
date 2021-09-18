import React from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../fbase";
import { useState } from "react/cjs/react.development";

const Tweet = ({ t, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(t.text);

  const onDelete = async () => {
    const ok = window.confirm("Are you sure you want delete this tweet?");
    if (ok) {
      await deleteDoc(doc(db, `tweets/${t.id}`));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, `tweets/${t.id}`), {
      text: newTweet,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    setNewTweet(e.target.value);
  };

  return (
    <div key={t.id}>
      {editing ? (
        <div>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" value={newTweet} required />
            <input type="submit" value="update tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </div>
      ) : (
        <>
          <h4>{t.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDelete}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
