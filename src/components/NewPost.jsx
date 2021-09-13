import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { db, auth } from "./Firebase";

export default function NewPost() {
  const [state, setState] = useState({
    description: "",
    images: [],
    likes: [],
    savedBy: [],
    videos: [],
    postedBy: auth.currentUser.uid,
  });
  const [vrl, setVrl] = useState("");
  const history = useHistory();
  const goBack = () => history.goBack();

  async function addNewPost() {
    await db
      .collection("posts")
      .add(state)
      .then(() => {
        goBack();
      });
  }

  function handleImageInput(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const dataUrl = reader.result;
        setState({ ...state, images: [...state.images, dataUrl] });
      };
    }
  }

  function getId(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const eurl =
      "https://youtube.com/embed/" +
      (match && match[2].length === 11 ? match[2] : null);
    return eurl;
  }

  function handleVideoInput() {
    setState({ ...state, videos: [...state.videos, getId(vrl)] });
    setVrl("");
  }

  return (
    <div className="explore row w-100">
      <div className="col-3" />
      <div className="col-6">
        <h3 className="my-3">Create New Post</h3>
        <Form.Group>
          <Form.Label>Images</Form.Label>
          <Form.File accept="images/*" onChange={handleImageInput} />
          {state.images !== [] ? (
            state.images.map((url) => (
              <img
                src={url}
                style={{ width: "10em", marginRight: 5, marginTop: 10 }}
              />
            ))
          ) : (
            <small>
              <br />
              no image selected
            </small>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Videos</Form.Label>
          <div className="d-flex">
            <Form.Control
              placeholder="Paste video url here..."
              value={vrl}
              onChange={(e) => setVrl(e.target.value)}
            />
            <Button onClick={handleVideoInput}>Add</Button>
          </div>
          {state.videos !== [] ? (
            state.videos.map((url) => (
              <iframe
                src={url}
                style={{
                  width: 320,
                  height: 180,
                  marginRight: 5,
                  marginTop: 10,
                }}
              ></iframe>
            ))
          ) : (
            <small>
              <br />
              no video urls added
            </small>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            style={{ height: "8em" }}
            value={state.description}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          />
        </Form.Group>
        <Button className="mr-2 mb-5" variant="primary" onClick={addNewPost}>
          Create Post
        </Button>
        <Button className="mr-2 mb-5" variant="secondary" onClick={goBack}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
