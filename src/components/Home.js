import { Col, Card, Image } from "react-bootstrap";
import { RiChat1Line, RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { BsBookmarkPlus, BsBookmarkCheck } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, firebase } from "./Firebase";
import Search from "./Qna/Search";

export default function Home() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  async function handlePostsData() {
    setLoading(true);
    db.collection("posts").onSnapshot((snap) => {
      let postsData = snap.docs.map(async (doc) => {
        let post = { id: doc.id, ...doc.data() };
        const userDoc = await db
          .collection("users")
          .doc("Q2Sl5NqZEa8SdG1G1wFA")
          .get();
        const user = userDoc.data();
        post.name = user.name;
        post.imageUrl = user.imageUrl;
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
      likes.find((like) => like === "Il5Hjhv7RxOqjBwlB6wjWWRG3x93") !==
      undefined;
    let total = likes.length + " like";
    if (likes.length !== 1) total += "s";
    return { likes: total, isLiked };
  }

  async function likePost(postId) {
    await db
      .collection("posts")
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(
          "Il5Hjhv7RxOqjBwlB6wjWWRG3x93"
        ),
      });
  }

  async function unLikePost(postId) {
    await db
      .collection("posts")
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          "Il5Hjhv7RxOqjBwlB6wjWWRG3x93"
        ),
      });
  }

  function viewSinglePost(postId) {
    history.push("/post/" + postId);
  }

  useEffect(() => {
    handlePostsData();
  }, []);
  return (
    <div className="App" style={{ height: "100vh" }}>
      <div className="d-flex flex" style={{ background: "#fff" }}>
        <Col
          className="position-absolute"
          style={{ marginInline: 20, left: "10vw", width: "50vw" }}
        >
          <p
            style={{
              color: "grey",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: 10,
            }}
          >
            POSTS
          </p>
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
          ) : (
            posts.map((post) => {
              const { likes, isLiked } = getLikes(post.likes);
              return (
                <Card key={post.id} className="mb-3">
                  <Card.Body>
                    <div onClick={() => viewSinglePost(post.id)}>
                      <div className="d-flex">
                        <Image
                          variant="top"
                          src={post.imageUrl}
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
                            <Card.Title style={{ fontSize: 18 }}>
                              {post.name}
                            </Card.Title>
                          </Link>
                          <Card.Subtitle
                            style={{ fontSize: 14 }}
                            className="mb-2 text-muted"
                          >
                            {post.branch} student
                          </Card.Subtitle>
                        </div>
                      </div>
                      <Card.Img src={post.images[0]} className="my-3" />
                      <Card.Text>
                        {post.description}
                        <Card.Link href="#">read more</Card.Link>
                      </Card.Text>
                    </div>
                    <hr />
                    <div
                      className="d-flex"
                      style={{ justifyContent: "space-evenly" }}
                    >
                      <div className={`d-flex ${isLiked && "text-primary"}`}>
                        {isLiked ? (
                          <RiThumbUpFill
                            onClick={() => unLikePost(post.id)}
                            size={18}
                            className="mr-1"
                          />
                        ) : (
                          <RiThumbUpLine
                            onClick={() => likePost(post.id)}
                            size={18}
                            className="mr-1"
                          />
                        )}{" "}
                        <small>{likes}</small>
                      </div>
                      <div className="d-flex">
                        <RiChat1Line size={20} className="mr-1" />{" "}
                        <small>1.2k comments</small>
                      </div>
                      <BsBookmarkCheck size={20} color="green" />
                    </div>
                  </Card.Body>
                </Card>
              );
            })
          )}
        </Col>
        <Col className="position-fixed" style={{ left: "75vw" }}>
          <p
            style={{
              color: "grey",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: 10,
            }}
          >
            FILTERS
          </p>
          <Search />
        </Col>
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
