import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Reply from "./Reply";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { IoSendSharp } from "react-icons/io5";
import { db } from "../Firebase";
let userdata = {};
function CommentBox(props) {
  const [current_comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  function handleChange(event) {
    let current = event.target.value;
    // console.log(current_comment);
    if (current === "") {
      setComment(current);
      setCurrentUser("");
    } else if (currentUser !== "")
      current =
        "Replying to @" +
        currentUser +
        " " +
        current.substr(14 + currentUser.length, current.length);

    setComment(current);
  }
  function addComment() {
    props.fn(current_comment);
    setComment("");
    setCurrentUser("");
  }
  function handleClick(user) {
    setCurrentUser(user);
    setComment("Replying to @" + user + " ");
  }
  const custom = {
    backgroundColor: "#EFF3F3",
    color: "black",
    margin: "10px",
    paddingLeft: "7px",
    paddingTop: "4px",
  };
  const customPara = {
    padding: "0px",
    marginTop: "0px",
    marginBottom: "3px",
  };
  function test(item) {
    return (
      <Card style={custom} className="card-shadow">
        <h6>{item.uname}</h6>
        <p style={customPara}>{item.comment}</p>
        <Reply user={item.uname} fn={handleClick} />
      </Card>
    );
  }

  return (
    <div className="comment-container">
      <div>
        <Card className="commentBox">{props.items.map(test)}</Card>
        <div className="input-container">
          <InputGroup>
            <FormControl
              className="inp"
              placeholder="Add Comment..."
              type="text"
              onChange={handleChange}
              value={current_comment}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button
                className="btn-arrow"
                variant="secondary"
                onClick={addComment}
              >
                <IoSendSharp size={24} />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
