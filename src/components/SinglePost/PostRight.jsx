import React, { useState, useEffect } from "react";
import CommentBox from "./HandleComment";
import { BiLike } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComment, FaComment } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import firebase from "firebase";
import { db } from "../Firebase";

function PostRight({ id }) {
  const postId = id;
  const uid = "Q2Sl5NqZEa8SdG1G1wFA";
  const [like, setLike] = useState(true);
  const [likeCount, setLikeCount] = useState(1);
  const [comment, setComment] = useState(false);
  const [bookmark, setBookmark] = useState(true);
  const [statsData, setStatsData] = useState({});
  const [commentCount, setCommentCount] = useState(0);

  const [items, addItem] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(postId)
      .get()
      .then((doc) => {
        const data = doc.data();
        const likesData = data.likes;
        const bookmarkData = data.savedBy;
        const nameRef = db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .orderBy("time", "asc");

        nameRef.onSnapshot((snapshot) => {
          const d = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          addItem(d);
          setCommentCount(d.length);
        });
        setStatsData(data);
        setLikeCount(likesData.length);
        for (let i = 0; i < likesData.length; i++) {
          if (likesData[i] === uid) {
            setLike((pre) => !pre);
            break;
          }
        }
        for (let i = 0; i < bookmarkData.length; i++) {
          if (bookmarkData[i] === uid) {
            setBookmark((pre) => !pre);
            break;
          }
        }
      });
    return () => {
      console.log("CleanUp");
      return unsubscribe;
    };
  }, []);

  function handleLike() {
    const likesData = statsData.likes;
    let index = likesData.indexOf(uid);
    if (index > -1) {
      likesData.splice(index, 1);
    } else {
      likesData.push(uid);
    }
    db.collection("posts").doc(postId).update({
      likes: likesData,
    });
    setLike((pre) => {
      return !pre;
    });
    setLikeCount((pre) => (like ? pre + 1 : pre - 1));
  }

  function handleComment() {
    setComment((pre) => !pre);
  }

  function addComment(current_comment) {
    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        const userData = doc.data();
        const userName = userData.name;
        db.collection("posts").doc(postId).collection("comments").add({
          uid: uid,
          uname: userName,
          comment: current_comment,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setCommentCount((pre) => pre + 1);
      });
  }

  function handleBookmark() {
    const bookmarkData = statsData.savedBy;
    let index = bookmarkData.indexOf(uid);
    if (index > -1) {
      bookmarkData.splice(index, 1);
    } else {
      bookmarkData.push(uid);
    }
    db.collection("posts").doc(postId).update({
      savedBy: bookmarkData,
    });
    setBookmark((pre) => {
      return !pre;
    });
  }

  return (
    <div>
      <div className="right-icons">
        {/* Like */}
        <div className="like">
          {like ? (
            <BiLike
              size={30}
              style={{ marginRight: "5px", paddingBottom: "2px" }}
              onClick={handleLike}
            />
          ) : (
            <AiTwotoneLike
              size={30}
              style={{ color: "#161d6f", marginRight: "5px" }}
              onClick={handleLike}
            />
          )}
          {likeCount} {likeCount > 1 ? "Likes" : "Like"}
        </div>

        {/* Comment */}
        <div className="comment">
          {comment ? (
            <FaComment
              size={28}
              style={{ color: "#161d6f" }}
              onClick={handleComment}
            />
          ) : (
            <FaRegComment size={28} onClick={handleComment} />
          )}
          {commentCount > 0 ? (
            <Badge
              variant="primary"
              style={{ marginRight: "10px", marginBottom: "16px" }}
            >
              {commentCount}
            </Badge>
          ) : null}
          Comments
        </div>

        {/* Bookmark */}
        <div className="bookmark">
          {bookmark ? (
            <BsBookmark size={28} onClick={handleBookmark} />
          ) : (
            <BsBookmarkFill
              size={20}
              style={{ color: "#161d6f", marginRight: "10px" }}
              onClick={handleBookmark}
            />
          )}
        </div>
      </div>
      {/* CommentBox */}
      <div>{comment ? <CommentBox fn={addComment} items={items} /> : null}</div>
    </div>
  );
}

export default PostRight;
