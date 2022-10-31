import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>등록</h1>
      <form>
        <input required type="text" placeholder="사용자명" name="username" onChange={handleChange} />
        <input required type="email" placeholder="이메일" name="email" onChange={handleChange} />
        <input required type="password" placeholder="비밀번호" name="password" onChange={handleChange} autoComplete="off"/>
        <button onClick={handleSubmit}>등록</button>
        {err && <p>{err}</p>}
        <span>
          계정이 있다면 <Link to="/login">로그인</Link>
        </span>
      </form>
    </div>
  );
};
