import React from "react";
import { Col, Card, Image, Button } from "react-bootstrap";
import { RiChat1Line, RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { BsBookmarkPlus, BsBookmarkCheck } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db, firebase } from "./Firebase";
import Search from "./Qna/Search";
import { Add, DeleteOutlined } from "@material-ui/icons";
import DeletePostModal from "./DeletePostModal";

export default function Home() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [pid, setPid] = useState(null);
  async function handlePostsData() {
    setLoading(true);
    db.collection("posts").onSnapshot((snap) => {
      let postsData = snap.docs.map(async (doc) => {
        let post = { id: doc.id, ...doc.data() };
        post.comments = await getComments(post.id);
        console.log("RESPONSE:", post);
        const userDoc = await db.collection("users").doc(post?.postedBy).get();
        const user = userDoc.data();
        post.name = user.name;
        post.imgUrl = user.imgUrl;
        post.branch = user.branch;
        return post;
      });
      Promise.all(postsData).then((result) => {
        setPosts(result);
        setLoading(false);
      });
    });
  }

  function getLikes(likes) {
    const isLiked =
      likes.find((like) => like === auth.currentUser.uid) !== undefined;
    let total = likes.length + " like";
    if (likes.length !== 1) total += "s";
    return { likes: total, isLiked };
  }

  function getSaved(savedBy) {
    const isSave =
      savedBy.find((x) => x === auth.currentUser.uid) !== undefined;
    return isSave;
  }

  async function getComments(postId) {
    const snap = await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .get();
    let noc = snap.docs.length;
    console.log("noc", noc);
    return noc;
  }

  async function likePost(postId) {
    await db
      .collection("posts")
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid),
      });
  }

  async function unLikePost(postId) {
    await db
      .collection("posts")
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.uid),
      });
  }

  async function savePost(postId) {
    await db
      .collection("posts")
      .doc(postId)
      .update({
        savedBy: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid),
      });
  }

  async function unSavePost(postId) {
    await db
      .collection("posts")
      .doc(postId)
      .update({
        savedBy: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.uid
        ),
      });
  }

  function viewSinglePost(postId) {
    history.push("/post/" + postId);
  }

  function deletePost() {
    db.collection("posts")
      .doc(pid)
      .delete()
      .then(() => {
        handleClose();
      });
  }

  const handleClose = () => {
    setOpen(false);
    setPid(null);
  };

  useEffect(() => {
    handlePostsData();
  }, []);
  return (
    <div className="posts" style={{ height: "100vh" }}>
      <DeletePostModal
        deletePost={deletePost}
        open={open}
        onClose={handleClose}
      />
      <div id="posts-box">
        <div className="posts-list">
          <p className="post-title">POSTS</p>
          {/* <div className="d-flex">
                  <RiThumbUpLine size={18} className="mr-1" />{" "}
                  <small>212 likes</small>
                </div>
                <div className="d-flex">
                  <RiChat1Line size={20} className="mr-1" />{" "}
                  <small>14 comments</small>
                </div>
                <BsBookmarkPlus size={20} />
              </div> */}
          {loading ? (
            <div className="text-center text-primary">
              <div
                className="spinner-border"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              />
            </div>
          ) : posts.length !== 0 ? (
            posts.map((post) => {
              const { likes, isLiked } = getLikes(post.likes);
              return (
                <Card key={post.id} className="card mb-3">
                  <Card.Body>
                    <div className="d-flex">
                      <div className="d-flex" style={{ flex: 1 }}>
                        <Image
                          variant="top"
                          src={post.imgUrl}
                          roundedCircle
                          width={45}
                          height={45}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <Link
                            to={{
                              pathname: "/profile",
                              state: {
                                name: post.name,
                                url: post.imgUrl,
                              },
                            }}
                            style={{ color: "#111" }}
                          >
                            <Card.Title
                              className="title"
                              style={{ fontSize: 18 }}
                            >
                              {post.name}
                            </Card.Title>
                          </Link>
                          <Card.Subtitle
                            style={{ fontSize: 14 }}
                            className="subtitle mb-2"
                          >
                            {post.branch} student
                          </Card.Subtitle>
                        </div>
                      </div>
                      {post.postedBy === auth.currentUser.uid && (
                        <DeleteOutlined
                          className="pointer"
                          onClick={() => {
                            setPid(post.id);
                            setOpen(true);
                          }}
                        />
                      )}
                    </div>
                    <div onClick={() => viewSinglePost(post.id)}>
                      {post.images && (
                        <Card.Img
                          src={post.images && post.images[0]}
                          className="my-3"
                        />
                      )}
                      <Card.Text>
                        {post.description}
                        <br />
                        <Card.Link href="#">view full post</Card.Link>
                      </Card.Text>
                    </div>
                    <hr className="divider" />
                    <div
                      className="d-flex"
                      style={{ justifyContent: "space-evenly" }}
                    >
                      <div
                        className={`pointer d-flex ${
                          isLiked && "text-primary post-like"
                        }`}
                      >
                        {isLiked ? (
                          <RiThumbUpFill
                            onClick={() => unLikePost(post.id)}
                            size={18}
                            className="pointer mr-1"
                          />
                        ) : (
                          <RiThumbUpLine
                            onClick={() => likePost(post.id)}
                            size={18}
                            className="pointer mr-1"
                          />
                        )}{" "}
                        <small>{likes}</small>
                      </div>
                      <div className="d-flex">
                        <RiChat1Line size={20} className="mr-1" />{" "}
                        <small>{post.comments} comments</small>
                      </div>
                      {getSaved(post.savedBy) ? (
                        <BsBookmarkCheck
                          className="pointer"
                          size={20}
                          color="green"
                          onClick={() => unSavePost(post.id)}
                        />
                      ) : (
                        <BsBookmarkPlus
                          className="pointer"
                          size={20}
                          onClick={() => savePost(post.id)}
                        />
                      )}
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div>
              <div className="text-center">
                <p>No posts available</p>
                <small>click below button to create a post</small>
                <br />
                <Button
                  as={Link}
                  to="/new-post"
                  className="mt-4"
                  variant="dark"
                >
                  <Add />
                  New Post
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="filters">
          <p className="filters-title">FILTERS</p>
          <Search type="posts" />
        </div>
      </div>
    </div>
  );
}

/* <Col className="position-fixed" style={{ width: "20vw" }}>
          <p
            style={{
              color: "grey",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: 10,
            }}
          >
            GROUPS
          </p>
          <ButtonGroup
            vertical
            aria-label="Basic example"
            style={{ boxShadow: "1px 1px 5px -3px" }}
          >
            <Button variant="light">CSE Main group</Button>
            <Button variant="primary">Web developers community</Button>
            <Button variant="light">Machine Learning</Button>
            <Button variant="light">T&P events</Button>
            <Button variant="light">College football club</Button>
            <Button variant="light">Students force</Button>
          </ButtonGroup>
        </Col> */
