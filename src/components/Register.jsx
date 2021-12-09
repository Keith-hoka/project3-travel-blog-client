import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import "./Register.css";
import { api } from "../helpers/helpers";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleRegister = () => {
    const userData = {
      username: email,
      password,
    };

    if (userData !== undefined && userData.username.includes("@")){
      api.register(userData).then((res) => {
        if (res === email){
          window.localStorage.setItem('user', res);
          history.push("/logs");
          window.location.reload();
        } else {
          setError(res);
        }
      });
    } else {
      setError("Please enter correct email format!");
    }
  };

  return (
    <div className="register">
      <div className="register-title">
        <img src="./images/logo.gif" alt="logo" />
        <h1 className="register-method">Welcome to Keith's Travel Experience Sharing Platform!</h1>
      </div>
      <div className="register-wrapper">
        <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your Email" required />
        <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Enter your Password" required />
        <button onClick={handleRegister} className="register-submit">Register</button>
        {error !== email ? <p className="error">{error}</p> : null}
        <Link to="/login">
          <p>Existing User?</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
