import axios from "axios";
import React, { useEffect, useState } from "react";

export const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>원하는 다른 게시물</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../uploads/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>더보기</button>
        </div>
      ))}
    </div>
  );
};
