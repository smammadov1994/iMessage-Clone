/** @format */

import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./iMessage.css";
import Chat from "../Chat/Chat";

function iMessage() {
  return (
    <div className="imessage">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default iMessage;
