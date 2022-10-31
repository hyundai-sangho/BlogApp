import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

export const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="로고" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=예술">
            <h6>예술</h6>
          </Link>
          <Link className="link" to="/?cat=과학">
            <h6>과학</h6>
          </Link>
          <Link className="link" to="/?cat=기술">
            <h6>기술</h6>
          </Link>
          <Link className="link" to="/?cat=영화">
            <h6>영화</h6>
          </Link>
          <Link className="link" to="/?cat=디자인">
            <h6>디자인</h6>
          </Link>
          <Link className="link" to="/?cat=음식">
            <h6>음식</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>로그아웃</span>
          ) : (
            <Link className="link" to="/login">
              로그인
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              글쓰기
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
