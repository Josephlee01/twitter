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

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState(null);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const q = query(collection(db, "tweets"));
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

  const onFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      setAttachment(e.currentTarget.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const onClearAttachement = () => {
    setAttachment(null);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img alt="uploaded" src={attachment} width="200px" height="200px" />
            <button onClick={onClearAttachement}>Clear</button>
          </div>
        )}
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
