import React, { useEffect, useState } from "react";
import { db, storage } from "../fbase";
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import Tweet from "../components/Tweet";
import { v4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storage, `${userObj.uid}/${v4()}`); //user별로 folder 분류
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
      console.log(attachmentUrl);
    }
    const tweetPosting = {
      text: tweet,
      authorId: userObj.uid,
      publishedDate: Date.now(),
      attachmentUrl,
    };
    await addDoc(collection(db, "tweets"), tweetPosting);
    setTweet("");
    setAttachment("");
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
