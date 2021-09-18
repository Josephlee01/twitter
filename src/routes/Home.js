import React, { useEffect, useState } from "react";
import { db } from "../fbase";
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import Tweet from "../components/Tweet";

const Home = ({ userObj, isOwner }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("publishedDate", "desc"));
    onSnapshot(q, (snapshot) => {
      const tweetArray =snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const q = query(collection(db, "tweets"))
    await addDoc(q, {
      text: tweet,
      authorId: userObj.uid,
      publishedDate: Date.now(),
    });
    setTweet("");
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
      <div>
        {tweets.map((t) => (
          <Tweet key={t.id} t={t} isOwner={t.authorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
