import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/User/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),   //user when i am sending user informatin during req.body
        credentials: "include", //without this addition and deletion of key not possible
      });

      if (!response.ok) {
        navigate("/login");
        setEmail("");
        setPassword("");
        props.showAlert('danger', 'Error', 'Credentials are wrong');
        return;
      }
      const data = await response.json();
      localStorage.setItem("name", data.user.name); // ✅ Save it
      props.showAlert('success', 'Success', 'Login successfully');
      navigate("/Home");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="cont-p">
        <div className="s-cont s-cont-1">
          <h2>
            Welcome to <span id="stl-font">𝚂𝚖𝚊𝚛𝚝𝙹𝚘𝚝</span>
          </h2>
          <h3>Login your account</h3> <br />
          <form
            action="/user/login"
            method="post"
            className="inf-form"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="c-vis"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="email"
              spellCheck="false"
              required
            />{" "}
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="c-vis"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
              spellCheck="false"
              required
            />{" "}
            <br />
            
            <input
              type="submit"
              name="sbt-btn"
              className="sbt-btn"
              value="Login"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
