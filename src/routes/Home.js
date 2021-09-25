import React, { useEffect, useState } from "react";
import { db } from "../fbase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/CreateTweet";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("publishedDate", "desc"));
    onSnapshot(q, (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <div>
      <TweetFactory userObj={userObj} />
      {tweets.map((t) => (
        <Tweet key={t.id} t={t} isOwner={t.authorId === userObj.uid} />
      ))}
    </div>
  );
};

export default Home;
