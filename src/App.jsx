import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Adminchat from "./components/chatpage/adminchat";
import Applicantchat from "./components/chatpage/applicantchat";
import Login from "./components/Authentication/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminchat" element={<Adminchat />} />
          <Route path="/userchat" element={<Applicantchat />} />
          <Route path="/login" element={<Login />} />

        </Routes>
    </>
  );
}

export default App;
