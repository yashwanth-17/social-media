import React, { useState, useEffect } from "react";
import Model from "./model";
import { Carousel } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { db } from "../Firebase";

function PostLeft({ id }) {
  const [display, setDisplay] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [imgToStringArray, setimgToStringArray] = useState([]);
  const [postDetails, setPostDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const postId = id;

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(postId)
      .get()
      .then((doc) => {
        const data = doc.data();
        setimgToStringArray(data.images);
        setPostDetails(data);

        const unsub = db
          .collection("users")
          .doc(data.postedBy)
          .get()
          .then((doc) => {
            const userdata = doc.data();
            setUserDetails(userdata);
          });
      });

    return () => {
      return unsubscribe;
    };
  }, []);

  function addModel(event) {
    let imageString = event.target.name;
    setDisplay(imageString);
    setIsModal(true);
  }

  function closeModel(val) {
    setDisplay("");
    setIsModal(val);
  }
  function carouselCall() {
    return (
      <div className="carousel-media">
        <Carousel style={{ width: "100%" }}>
          {imgToStringArray.map((image) => {
            return (
              <Carousel.Item interval={3500}>
                <img
                  className="post_image"
                  src={image}
                  alt="First slide"
                  name={image}
                  onClick={addModel}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
        {isModal ? <Model fn={closeModel} modelimg={display} /> : null}
      </div>
    );
  }

  const customSpinner = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return userDetails.name === undefined ? (
    <div className="spinner-class" style={customSpinner}>
      <Spinner animation="border" role="status" variant="secondary" />
      <span className="visually-hidden"> &nbsp; Loading... </span>
    </div>
  ) : (
    <div>
      <div className="user">
        <div className="user_photo">
          <img
            id="user_img"
            src={userDetails.imgUrl ? userDetails.imgUrl : null}
            alt="UserImage"
          />
        </div>
        <div className="user_details bg-muted">
          <p className="user_name">{userDetails.name}</p>
          <p className="user_branch">
            {userDetails.branch ? `${userDetails.branch} Student` : null}
          </p>
        </div>
      </div>
      <div className="postdetails">
        {imgToStringArray.length ? (
          imgToStringArray.length > 1 ? (
            carouselCall()
          ) : (
            <img
              src={imgToStringArray[0]}
              alt="Post_Image"
              className="post_image"
            />
          )
        ) : null}
        {postDetails.videos ? (
          <iframe
            width="100%"
            height={320}
            src={postDetails.videos[0]}
            style={{
              marginRight: 5,
              marginTop: 10,
            }}
          ></iframe>
        ) : null}
        <h3>{postDetails.title}</h3>
        <pre className="post_content">{postDetails.description}</pre>
      </div>
    </div>
  );
}

export default PostLeft;
