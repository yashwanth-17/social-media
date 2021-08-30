import React from "react";

function Reply({ fn, user }) {
  function handleClick() {
    fn(user);
  }
  return (
    <p
      style={{
        fontSize: "14px",
        borderStyle: "none",
        padding: "0px",
        marginTop: "0px",
        marginBottom: "3px",
      }}
      onClick={handleClick}
      id="reply"
    >
      Reply
    </p>
  );
}

export default Reply;
