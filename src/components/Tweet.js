import React from "react";

const Tweet = ({ t, isOwner }) => {
  return (
    <div key={t.id}>
      <h4>{t.text}</h4>
      {isOwner && (
        <>
          <button>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
