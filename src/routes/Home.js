import React, { useEffect, useState } from "react";
import { db } from "../fbase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = async () => {
    const dbTweets = await getDocs(collection(db, "tweets"));
    dbTweets.forEach((doc) => {
      const tweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setTweets((prev) => [...prev, tweetObj]);
    });
  };
  useEffect(() => {
    getTweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "tweets"), {
      tweet,
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
          <div key={t.id}>
            <h4>{t.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
