import * as React from "react";
import { Link } from "react-router-dom";
import "./Avatar.css";
export default function Avatar(props) {
  return (
    <div className="avatar_box">
      <h2 className="user_avatar">
        Welcome:{" "}
        <a className="user">
          <Link to="/user">{props.username}</Link>
        </a>
      </h2>
    </div>
  );
}
