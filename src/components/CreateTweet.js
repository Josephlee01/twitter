import React, { useState, useRef } from "react";
import { db, storage } from "../fbase";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const CreateTweet = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

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
    fileInput.current.value = "";
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
    fileInput.current.value = "";
    setAttachment("");
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
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img alt="uploaded" src={attachment} width="200px" height="200px" />
            <button onClick={onClearAttachement}>Clear</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTweet;
