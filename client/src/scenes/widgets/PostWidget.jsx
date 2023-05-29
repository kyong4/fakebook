import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  BookmarkBorder,
  BookmarkOutlined,
} from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import PostCategorizer from "./PostCategorizer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import NearMeIcon from "@mui/icons-material/NearMe";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [PostCategory, setPostCategory] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUser = useSelector((state) => state.user._id);
  const likeCount = likes.length;
  const isLiked = likes.includes(loggedInUser);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: loggedInUser }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const submitComment = async () => {
    const response = await fetch(`http://localhost:3001/comments/${postId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUser, comment: commentText }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setCommentText("");
  };

  const deleteComment = async (commentID) => {
    const response = await fetch(`http://localhost:3001/comments/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUser, commentId: commentID }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setCommentText("");

    const handleShare = () => {
      const postUrl = `http://localhost:3000/posts`;
      navigator.clipboard.writeText(postUrl);
    };

    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
          createdAt={createdAt}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {/* {description.includes('.com') ? <a href={description} target="_blank" rel="noreferrer">Best Buy Link</a> : description } */}
          {description.includes('.com') ? (
            <Button
              onClick={() => window.open(description, "_blank")}
              variant="contained"
              style={{
                cursor: "pointer",
              }}
            >
              Best Buy Link
            </Button>
          ) : (
            <p>{description}</p>
          )}

        </Typography>
        {picturePath && picturePath.includes(".com") ? (
          <img
            width="100%"
            height="280px"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`${picturePath}`}
          />
        ) : (
          <img
            width="100%"
            height="280px"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments?.length}</Typography>
            </FlexBetween>


            {!window.location.pathname.includes('saved') && <IconButton onClick={() => setPostCategory(!PostCategory)}>
              {PostCategory ? (
                <BookmarkBorder sx={{ color: primary }} />
              ) : (
                <BookmarkBorder />
              )}
            </IconButton>
            }

          </FlexBetween>
          <IconButton onClick={handleShare}>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 1,
          }}
        >
          <InputBase
            placeholder="Write a comment..."
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 2rem",
              mr: 1,
            }}
          />
          <Button
            disabled={commentText.trim().length < 1}
            onClick={submitComment}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            <NearMeIcon color={palette.text.primary} />
          </Button>
        </Box>

        {isComments && (
          <Box mt="0.5rem">
            {comments.map((item, i) => {
              return (
                <Box key={item._id}>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", py: 1 }}>
                      <Avatar
                        src={`http://localhost:3001/assets/${item.user.picturePath}`}
                        alt=""
                        sx={{ width: 30, height: 30 }}
                      />
                      <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                        {item.comment}
                      </Typography>
                    </Box>

                    {loggedInUser === item.user.userId && (
                      <IconButton onClick={() => deleteComment(item._id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              );
            })}
            <Divider />
          </Box>
        )}
        <Box mt="0.5rem">
          {PostCategory && <PostCategorizer postId={postId} likes={likes} picturePath={picturePath}
            userPicturePath={userPicturePath}
            name={name}
            description={description}
            location={location}
            comments={comments} />}
        </Box>
      </WidgetWrapper>
    );
  };
};

export default PostWidget;
