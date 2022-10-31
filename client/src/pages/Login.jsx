import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>로그인</h1>
      <form>
        <input required type="text" placeholder="사용자명" name="username" onChange={handleChange} />
        <input required type="password" placeholder="비밀번호" name="password" onChange={handleChange} autoComplete="off" />
        <button onClick={handleSubmit}>로그인</button>
        {err && <p>{err}</p>}
        <span>
          계정이 없다면 <Link to="/register">등록</Link>
        </span>
      </form>
    </div>
  );
};
