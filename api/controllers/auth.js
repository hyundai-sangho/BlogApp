import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // 사용자가 있다면?
  const selectQuery = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(selectQuery, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("같은 사용자가 존재합니다.");

    // 비밀번호를 해시하고 사용자를 만듭니다.
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = "INSERT INTO users(`username`, `email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(insertQuery, [values], (err, _data) => {
      if (err) return res.json(err);

      return res.status(200).json("사용자가 생성되었습니다.");
    });
  });
};

export const login = (req, res) => {
  // 사용자 체크
  const selectQuery = "SELECT * FROM users WHERE username = ?";

  db.query(selectQuery, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("사용자를 찾을 수 없습니다.");

    // 패스워드 체크
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

    if (!isPasswordCorrect) return res.status(400).json("사용자명 혹은 패스워드가 잘못됐습니다.");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    console.log(other);
    console.log("토큰 : " + token);

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true,
  }).status(200).json("로그아웃 완료");
};
