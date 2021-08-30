import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

/* Importing Components from react-bootstrap */
import { Form, Button } from "react-bootstrap";

/* Importing react-icons */
import { MdDelete } from "react-icons/md";

/* Firebase Import */
import { db } from "../Firebase";

/* Importing tinymce plugins, icons, themes and packages */
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/anchor";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/code";
import "tinymce/plugins/charmap";
import "tinymce/plugins/codesample";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/print";
import "tinymce/plugins/paste";
import "tinymce/plugins/preview";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/image";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/ui/oxide/content.min.css";
import "tinymce/skins/content/default/content.min.css";
import "tinymce/plugins/emoticons/js/emojis.min";
import { Editor } from "@tinymce/tinymce-react";

/* Importing Prism.js files */
import Prism from "prismjs";
import "./prism.css";

/* Html-React-Parser */
import parse from "html-react-parser";

function PostQuery() {
  /* Initializing history */
  const history = useHistory();
  const userId = "Q2Sl5NqZEa8SdG1G1wFA";

  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState([]);
  const [contentEditor, setContentEditor] = useState("");

  /* function to handle changes in description box */
  const handleEditorChange = (content, editor) => {
    setContentEditor(content);
  };

  /* useEffect to highlight the prism effects */
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  /* useEffect to load filters selected by the user */
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(userId)
      .onSnapshot((snapshot) => {
        setFilters(["all"]);
        setFilters((prev) => [...prev, snapshot.data().branch]);
        snapshot.data().selectedChannels.forEach((channelID) => {
          db.collection("channels")
            .doc(channelID)
            .get()
            .then((querySnapshot) => {
              setFilters((prev) => [...prev, querySnapshot.data().label]);
            });
        });
      });
    return unsubscribe;
  }, []);

  /* function to convert user selected Images into DataURL */
  const handleImageInput = (e) => {
    setImages([]);
    for (let i = 0; i < e.target.files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[i]);
      reader.onload = () => {
        var fileContent = reader.result;
        setImages((prev) => [...prev, fileContent]);
      };
    }
  };

  /* function to remove a particular image from user selected images */
  const handleImageRemove = (image) => {
    let newImages = [...images];
    let index = newImages.indexOf(image);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  /* function to submit the query posted by user */
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = {
      postedBy: userId,
      query: e.target.query.value,
      description: contentEditor,
      upvotes: [],
      downvotes: [],
      images: images,
      tag: e.target.category.value,
      anonymous: e.target.anonymousSwitch.checked,
    };
    db.collection("qnas").add(formData);
    history.replace("/qna", { formData });
  };

  return (
    <div id="postContainer">
      <h1 id="postQueryHeading">Post Query</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="query" className="ml-2 mr-2 mb-4">
          <Form.Label className="postQueryLabel">Query</Form.Label>
          <Form.Control as="textarea" rows={6} name="query" required />
        </Form.Group>
        <Form.Group controlId="description" className="ml-2 mr-2 mb-4">
          <Form.Label className="postQueryLabel">Description</Form.Label>
          <Editor
            init={{
              height: 300,
              menubar: true,
              // width: '80vw',
              plugins: [
                "advlist autolink lists image link charmap print preview anchor",
                "searchreplace visualblocks codesample fullscreen",
                "insertdatetime media table paste help wordcount",
                "pagebreak emoticons save media template codesample",
              ],
              emoticons_database: "emojis",
              toolbar:
                "undo redo image | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor | charmap emoticons | removeformat pagebreak | fullscreen  preview save print | insertfile media template link anchor codesample",

              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            value={contentEditor}
            onEditorChange={handleEditorChange}
          />
        </Form.Group>
        <Form.Group controlId="file" className="ml-2 mr-2">
          <Form.Label className="postQueryLabel">Upload Files</Form.Label>
          <Form.File
            id="file"
            name="file"
            multiple
            onChange={handleImageInput}
          />
          <Form.Text className="ml-1 text-muted">
            Upload any photos related to query if necessary so that others can
            understand your query easily.
          </Form.Text>
          {images.length !== 0 && (
            <div id="imageContainer">
              {images.map((image, index) => (
                <div className="imageCard" key={index}>
                  <img src={image} alt={image} className="inputImage" />
                  <br />
                  <MdDelete
                    size={25}
                    onClick={() => handleImageRemove(image)}
                    id="imageDeleteButton"
                  />
                </div>
              ))}
            </div>
          )}
        </Form.Group>
        <Form.Group controlId="category" className="ml-2 mr-2 mb-4">
          <Form.Label className="postQueryLabel">Q/A Sections</Form.Label>
          <Form.Control as="select" name="category" style={{ width: "50%" }}>
            {filters.map((filter, index) => {
              return (
                <option key={index} value={filter}>
                  {filter.toUpperCase()}
                </option>
              );
            })}
          </Form.Control>
          <Form.Text className="ml-1 text-muted">
            Select the category to post the query in particular Q/A section
          </Form.Text>
        </Form.Group>
        <div className="ml-2 mr-2 mb-3">
          <Form.Check
            type="switch"
            id="anonymousSwitch"
            name="anonymousSwitch"
            label="Turn on this to post anonymously"
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button id="submitQueryButton" type="submit">
            Post
          </Button>
        </div>
      </Form>
      {parse(contentEditor)}
    </div>
  );
}

export default PostQuery;
