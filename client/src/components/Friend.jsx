import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import React, { useState, useEffect } from 'react';
function Friend(props) {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.github.com/users/${props.friend}`);
      const data = await response.json();
      setUsername(data.login);
      setAvatarUrl(data.avatar_url);
      setLoading(false);
    }
    fetchData();
  }, [props.friend]);

  const friend = props.friends.find(friend => friend.username === username);

  let status;
  if (!loading) {
    if (friend) {
      status = "Online";
    } else {
      status = "Offline";
    }
  }

  return (
    <div>
      <h3>{username}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <img src={avatarUrl} alt={username} />
          <p>Status: {status}</p>
        </div>
      )}
    </div>
  );
}

export default Friend;