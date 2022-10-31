import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const getPostsQuery = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";

  db.query(getPostsQuery, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const getPostQuery = "SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(getPostQuery, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};
export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(501).json("인증 안됨.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("토큰이 유효하지 않습니다.");

    const insertQuery = "INSERT INTO posts(`title`, `description`, `img`, `cat`, `date`, `uid`) VALUES(?)";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.date, userInfo.id];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("게시물 생성됨.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(501).json("인증 안됨.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("토큰이 유효하지 않습니다.");

    console.log("userInfo.id 값: " + userInfo.id);

    const postId = req.params.id;
    const deletePostQuery = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(deletePostQuery, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("당신이 작성한 게시물만 삭제할 수 있습니다.");

      return res.json("게시물이 삭제되었습니다.");
    });
  });
};
export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(501).json("인증 안됨.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("토큰이 유효하지 않습니다.");

    const postId = req.params.id;
    const updateQuery = "UPDATE posts SET `title`=?, `description`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid` =?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(updateQuery, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("게시물 생성됨.");
    });
  });
};
