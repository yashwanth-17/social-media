import React, { useEffect, useRef, useState } from "react";
import { Badge, Image } from "react-bootstrap";
import { FiEdit, FiCheckSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { auth, db } from "./Firebase";
import { changeProfilePic } from "../functions/profile";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [toggle, setToggle] = useState(false);
  const bioRef = useRef();
  function getUser() {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((doc) => {
        setUser({ id: doc.id, ...doc.data() });
      });
  }
  function handleImageInput(e) {
    const file = e.target.files[0];
    changeProfilePic(user.id, file);
  }
  function handleBioEdit() {
    // setBio(bioRef.current.value);
    setToggle(false);
    db.collection("users").doc(user.id).update({ bio: bioRef.current.value });
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {user && (
        <div className="d-flex mt-5">
          <div className="col-1" />
          <div className="col-4 d-flex">
            {/* <div className="avatar" style={{ width: 150, height: 150 }}>
            <div
              className="backdrop d-flex justify-content-center align-items-center"
              style={{
                position: "absolute",
                width: 150,
                height: 150,
                background: "black",
                borderRadius: "50%",
              }}
            >
              <input
                type="file"
                accept="images/*"
                onChange={handleImageInput}
                style={{ position: "absolute", width: 30, opacity: 0 }}
              />
              <FiEdit color="#fff" size={30} />
            </div>
            <Image
              src={user.imgUrl}
              roundedCircle
              style={{ width: 150, height: 150 }}
            />
          </div> */}
            {/* begin */}
            <div
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "1px 1px 3px grey",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <h3 className="my-3">VNR VJIET</h3>
              <div className="avatar mb-4" style={{ width: 150, height: 150 }}>
                <div
                  className="backdrop d-flex justify-content-center align-items-center"
                  style={{
                    position: "absolute",
                    width: 150,
                    height: 150,
                    background: "black",
                    borderRadius: 10,
                  }}
                >
                  <input
                    type="file"
                    accept="images/*"
                    onChange={handleImageInput}
                    style={{ position: "absolute", width: 30, opacity: 0 }}
                  />
                  <FiEdit color="#fff" size={30} />
                </div>
                <Image
                  src={user.imgUrl}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                />
              </div>
              <div
                className="px-2 mb-2"
                style={{
                  width: "70%",
                  background: "#f5f5f5",
                  borderRadius: 5,
                }}
              >
                <small>Name</small>
                <p>{user.name}</p>
              </div>
              <div
                className="px-2 my-2"
                style={{ width: "70%", background: "#f5f5f5", borderRadius: 5 }}
              >
                <small>College ID</small>
                <p>{user.rollno}</p>
              </div>
              <div
                className="px-2 my-2"
                style={{ width: "70%", background: "#f5f5f5", borderRadius: 5 }}
              >
                <small>Branch</small>
                <p>Computer Science & Engineering</p>
              </div>
            </div>
          </div>
          {/* end */}
          <div className="col">
            {/* <h5>{user.name}</h5>
          <p>college ID: 18071A0500</p> */}
            <div style={{ maxWidth: "70%" }}>
              <div className="d-flex justify-content-between">
                <h6>Bio</h6>
                {toggle ? (
                  <FiCheckSquare onClick={handleBioEdit} />
                ) : (
                  <FiEdit onClick={() => setToggle(true)} />
                )}
              </div>
              {toggle ? (
                <textarea
                  ref={bioRef}
                  style={{ width: "100%" }}
                  rows={6}
                  defaultValue={user.bio}
                />
              ) : (
                <p style={{ textAlign: "justify" }}>{user.bio}</p>
              )}
            </div>
            <h6>Interests</h6>
            <div
              className="d-flex flex-wrap align-items-center mb-3"
              style={{ maxWidth: "70%" }}
            >
              {user.interests.map((_) => (
                <Badge key={_} variant="dark" pill className="m-1">
                  <p className="m-0 p-1">{_}</p>
                </Badge>
              ))}
            </div>
            <Link to="/changePassword">Change Password</Link>
          </div>
        </div>
      )}
    </div>
  );
}
