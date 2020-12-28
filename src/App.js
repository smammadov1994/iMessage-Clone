/** @format */

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Imessage from "./appBody/iMessage";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./features/firebase";
import Login from "./Login/Login";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
