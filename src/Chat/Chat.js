/** @format */

import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import "./Chat.css";
import { useSelector } from "react-redux";
import { selectChatId, selectChatName } from "../features/chatSlice";
import { selectUser } from "../features/userSlice";
import db from "../features/firebase";
import firebase from "firebase";
import Message from "../Message/Message";
import FlipMove from "react-flip-move";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector(selectUser);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            }))
          );
        });
    }
    console.log(messages);
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    console.log(messages);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className="chat_messages">
        <FlipMove>
          {messages.map(({ id, data }) => {
            return <Message key={id} content={data} />;
          })}
        </FlipMove>
      </div>
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="iMessage"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className="mic__chat" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
