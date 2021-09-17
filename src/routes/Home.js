import React, { useState } from "react";
import { db } from "../fbase";
import { collection, addDoc } from "firebase/firestore";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "tweets"), {
      tweet,
      publishedDate: Date.now(),
    });
    setTweet("")
  };
  const onChange = (e) => {
    setTweet(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={20}
        />
        <input type="submit" value="Tweet" />
      </form>
    </div>
  );
};

export default Home;
