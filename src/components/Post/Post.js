import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { PostStyled } from "./PostStyled.styled";
import {
  Button,
  IconButton,
  MenuItem,
  Menu,
  Chip,
  Avatar,
} from "@mui/material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "../../actions/posts";
import CustomizedDialogs from "./EditDialog";
import { useNavigate } from "react-router-dom";

import MoreIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";

const Post = ({ post, profile }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMoreDisplay, setShowMoreDisplay] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [like, setLike] = useState(post.data.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let base_url = "https://reddit.com";
  useEffect(() => {
    if (post.data.selftext.length >= 120) setShowMoreDisplay(true);
  }, [post]);

  const delPost = (e) => {
    dispatch(deletePost(e.target.id));
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlerEdit = () => {
    handleClose();
  };

  const handleike = (postId) => {
    const isFind = post.likeCount.users.some(
      (user) => user.username == `${profile.firstName} ${profile.lastName}`,
    );

    if (!isFind) {
      dispatch(
        updatePost(postId, {
          likeCount: {
            count: post.likeCount.count + 1,
            users: [
              ...post.likeCount.users,
              { username: `${profile.firstName} ${profile.lastName}` },
            ],
          },
        }),
      );
    } else {
      const newUsers = post.likeCount.users.filter(
        (user) => user.username !== `${profile.firstName} ${profile.lastName}`,
      );
      dispatch(
        updatePost(postId, {
          likeCount: {
            count: post.likeCount.count - 1,
            users: newUsers,
          },
        }),
      );
    }
  };

  return (
    <>
      <PostStyled className="col-12 col-md-6 col-lg-4 mb-3 px-2">
        <Col key={post?._id} className="card">
          {/* Header of the  Card */}
          <div className="header">
            <img
              className="overview_img"
              src={post?.data.thumbnail || "memorise1.jpg"}
              alt={`${post?.data.subreddit} photo`}
            />
            <div className="overlay">
              <div className="head-1 mb-1">
                <div style={{ cursor: "pointer" }} className="d-flex gap-2">
                  <Avatar
                    alt={`${post?.data.author}`}
                    src={post?.data.thumbnail}
                    sx={{ width: "36px", height: "36px", fontSize: "16px" }}
                  />
                  <span className="creator fs-5">{post?.data.author}</span>
                </div>
                {/* More Menu */}
                {/* <div style={{ height: "48px" }}>
                  {post?.creator ===
                    `${profile?.firstName} ${profile?.lastName}` && (
                    <div className="ms-auto">
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <MoreIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handlerEdit()}>
                          <CustomizedDialogs post={post} />
                        </MenuItem>
                        <MenuItem>
                          <Button
                            id={post?._id}
                            variant="outlined"
                            color="error"
                            fullWidth
                            onClick={(e) => delPost(e)}
                          >
                            <DeleteIcon className="me-1" />
                            Delete
                          </Button>
                        </MenuItem>
                      </Menu>
                    </div>
                  )}
                </div> */}
              </div>

              {/* moment */}
              {/* <span className="moment">
                {moment(post?.data.created_utc).fromNow()}
              </span> */}
            </div>
          </div>
          {/* title */}
          <a
            style={{ color: "#000000", textDecoration: "none" }}
            href={"https://reddit.com" + post.data.permalink}
            target="_blank"
          >
            <div className="title mt-3 mx-3">
              <h5>{post?.data.title}</h5>
            </div>{" "}
          </a>
          {/* <div
            className="title mt-3 mx-3"
            onClick={() => {
              navigate(`/posts/${post.data.id}`);
            }}
          >
            <h5>{post?.data.title}</h5>
          </div> */}
          {/* description */}
          <div className="description my-2 mx-3 text-secondary">
            {!showMoreDisplay ? (
              <p>{post?.data.selftext}</p>
            ) : (
              <div>
                {!showMore
                  ? post?.data.selftext.slice(0, 120)
                  : post?.data.selftext}
                ...{" "}
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowMore(!showMore)}
                >
                  {!showMore ? "show more" : "show less"}
                </span>
              </div>
            )}
          </div>
          {/* tags */}
          <div className="tags my-1 mx-2 text-secondary">
            <Chip
              key={post?.data.subreddit}
              label={post?.data.subreddit}
              className="mx-1 mb-2 text-dark text-uppercase"
            />
          </div>
          {/* buttons like */}
          <div className="option mx-1">
            <Button
              className="d-flex align-items-center"
              disabled={
                JSON.parse(localStorage.getItem("profile")) ? false : true
              }
              color={like ? "error" : "primary"}
            >
              <ThumbUpIcon className="me-1" />
              Like
              <span className="ms-2 fs-6">
                {post.data.likes === null ? 0 : post.data.likes}
              </span>
            </Button>
            <Button
              className="d-flex align-items-center"
              disabled={
                JSON.parse(localStorage.getItem("profile")) ? false : true
              }
              color={like ? "error" : "primary"}
            >
              <CommentIcon className="me-1" />
              Comment
              <span className="ms-2 fs-6">{post.data.num_comments}</span>
            </Button>
          </div>
        </Col>
      </PostStyled>
    </>
  );
};

export default Post;
