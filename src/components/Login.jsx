import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "./Login.css";
import { api } from "../helpers/helpers";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    const userData = {
      username: email,
      password,
    };
    api.login(userData).then((res) => {
      console.log(res)
      if (res.username === email){
        window.localStorage.setItem('user', res.username);
        history.push("/logs");
        window.location.reload();
      } else {
        setError("Failed to login! Please double-check your Email and Password.");
      }
    });
  };

  return (
    <div className="login">
      <div className="login-title">
      <img src="./images/logo.gif" alt="logo" />
      <h1 className="login-method">Login to Share Your Travel Experience!</h1>
      </div>
      <div className="login-wrapper">
        <div className="login-left">
          <div className="login-btn google">
            google
          </div>
          <div className="login-btn facebook">
            facebook
          </div>
          <div className="login-btn github">
            github
          </div>
        </div>
        <div className="login-center">
          <div className="login-line">
          </div>
          <div className="login-or">OR</div>
        </div>
        <div className="login-right">
          <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your Email" required />
          <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your Password" required />
          <button onClick={handleLogin} className="login-submit">Login</button>
          {error ? <p className="login-error">{error}</p> : null}
          <Link to="/register">
            <p>New User?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
