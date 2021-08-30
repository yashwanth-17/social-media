import React from "react";

/* Importing Components from react-bootstrap */
import { Card, Button } from "react-bootstrap";

/* Icons from FontAwesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Question({ user }) {
  console.log(user);
  return (
    <>
      <Card id="question">
        <Card.Header className="questionBody">
          <div id="questionHeading">
            <div id="questionProfile">
              {user.imageUrl === "" ? (
                <FontAwesomeIcon icon={faUserTie} size="3x" />
              ) : (
                <img
                  id="questionProfileImage"
                  src={user.imageUrl}
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
        <Card.Body className="questionBody">
          <Card.Text className="text-justify mr-2">{user.query}</Card.Text>
          <Button variant="danger" className="mb-2">
            <Link to={"/qna/" + user.id}>Read More</Link>
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Question;
