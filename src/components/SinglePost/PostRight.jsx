import React, { useState, useEffect } from "react";
import CommentBox from "./HandleComment";
import {
  RiChat1Fill,
  RiChat1Line,
  RiThumbUpFill,
  RiThumbUpLine,
} from "react-icons/ri";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComment, FaComment } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill, BsBookmarkPlus } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import firebase from "firebase";
import { db, auth } from "../Firebase";

function PostRight({ id }) {
  const postId = id;
  const uid = auth.currentUser.uid;
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
          id: uid,
          name: userName,
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
            <RiThumbUpLine
              size={24}
              style={{ marginRight: 5, paddingBottom: 2 }}
              onClick={handleLike}
            />
          ) : (
            <RiThumbUpFill
              size={24}
              style={{ color: "dodgerblue", marginRight: 5, paddingBottom: 2 }}
              onClick={handleLike}
            />
          )}
          {likeCount} {likeCount > 1 ? "Likes" : "Like"}
        </div>

        {/* Comment */}
        <div className="comment">
          {comment ? (
            <RiChat1Fill
              size={24}
              style={{ color: "dodgerblue", marginRight: 5 }}
              onClick={handleComment}
            />
          ) : (
            <RiChat1Line
              size={24}
              style={{ marginRight: 5 }}
              onClick={handleComment}
            />
          )}
          Comments{" "}
          {commentCount > 0 ? (
            <Badge
              variant="primary"
              style={{ marginRight: 10, marginBottom: 16 }}
            >
              {commentCount}
            </Badge>
          ) : null}
        </div>

        {/* Bookmark */}
        <div className="bookmark">
          {bookmark ? (
            <BsBookmarkPlus size={24} onClick={handleBookmark} />
          ) : (
            <BsBookmarkFill
              size={24}
              style={{ color: "dodgerblue" }}
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
