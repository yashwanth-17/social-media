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
      console.log("Clean up");
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
        <Carousel>
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
    marginTop: "250px",
    marginLeft: "210px",
  };
  return userDetails.name === undefined ? (
    <div className="spinner-class">
      <Spinner
        animation="border"
        role="status"
        variant="secondary"
        style={customSpinner}
      />
      <span className="visually-hidden"> &nbsp; Loading... </span>
    </div>
  ) : (
    <div>
      <div className="user">
        <div className="user_photo">
          <img
            id="user_img"
            src={userDetails.imageUrl ? userDetails.imageUrl : null}
            alt="UserImage"
          />
        </div>
        <div className="user_details">
          <div className="user_name">
            <h5>{userDetails.name}</h5>
          </div>
          <div className="user_branch">
            <p>{userDetails.branch ? `${userDetails.branch} Student` : null}</p>
          </div>
        </div>
      </div>
      <div className="postdetails">
        {imgToStringArray.length ? (
          imgToStringArray.length > 1 ? (
            carouselCall()
          ) : (
            <div className="post_image">
              <img src={imgToStringArray[0]} alt="Post_Image" />
            </div>
          )
        ) : null}
        <h3>{postDetails.title}</h3>
        <div className="post_content">
          <p>{postDetails.description}</p>
        </div>
      </div>
    </div>
  );
}

export default PostLeft;
