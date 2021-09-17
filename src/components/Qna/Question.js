import React from "react";

/* Importing Components from react-bootstrap */
import { Card, Button } from "react-bootstrap";

/* Icons from FontAwesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Question({ user }) {
  // console.log(user);
  return (
    <>
      <Card id="question">
        <Card.Header className="questionBody">
          <div id="questionHeading">
            <div id="questionProfile">
              {user.imgUrl === "" ? (
                <FontAwesomeIcon icon={faUserTie} size="3x" />
              ) : (
                <img
                  id="questionProfileImage"
                  src="https://www.clipartmax.com/png/middle/309-3094234_anonymous-browsing-toggle-user-secret-icon.png"
                  alt="Profile"
                ></img>
              )}
            </div>
            <div id="questionUser">
              <Card.Title as="h5">{user.name}</Card.Title>
              <Card.Subtitle as="h6" className="mb-2 text-muted">
                {user.branch === "Anonymous"
                  ? "Anonymous"
                  : `${user.branch} Student`}
              </Card.Subtitle>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="questionBody mb-2">
          <Card.Text className="text-justify mr-2">{user.query}</Card.Text>
          <Link className="qna-link" to={"/qna/" + user.id}>
            view this query
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default Question;
