import React from "react";
import Channels from "./Channels";
import MostLikedPosts from "./MostLikedPosts";
import MostAnsweredQuery from "./MostAnsweredQueries";
import MostCommentedPosts from "./MostCommentedPosts";

function Explore() {
  return (
    <div className="explore">
      <Channels />
      <MostLikedPosts />
      <MostCommentedPosts />
      <MostAnsweredQuery />
    </div>
  );
}

export default Explore;
