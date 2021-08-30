import { useRef, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { useHistory } from "react-router";
import { db, auth } from "./Firebase";
import { changeProfilePic } from "../functions/profile";

export default function AddDetails() {
  const nameRef = useRef();
  const rollnoRef = useRef();
  const bioRef = useRef();
  const [imgUrl, setImgUrl] = useState(null);
  const [interests, setInterests] = useState([]);
  const [groups, setGroups] = useState([]);
  const history = useHistory();
  function addDetailsToUser() {
    const name = nameRef.current.value;
    const rollno = rollnoRef.current.value;
    const bio = bioRef.current.value;
    const branch = "CSE";
    console.log({
      name,
      rollno,
      branch,
      bio,
      interests,
      groups,
      imgUrl,
    });
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        name,
        rollno,
        bio,
        branch,
        interests,
        groups,
        imgUrl,
      })
      .then(() => {
        history.replace("/");
      });
  }
  function handleImageInput(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const dataUrl = reader.result;
        setImgUrl(dataUrl);
      };
    }
  }
  function handleInterests(e) {
    if (!interests.includes(e.target.value))
      setInterests((p) => {
        return [...p, e.target.value];
      });
  }
  function handleGroups(e) {
    if (!groups.includes(e.target.value))
      setGroups((p) => {
        return [...p, e.target.value];
      });
  }
  return (
    <div className="row w-100">
      <div className="col-3" />
      <div className="col-6">
        <h3 className="my-3">Enter Your Details</h3>
        <Form.Group>
          <Form.Label>Profile Image</Form.Label>
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
            <img
              src={imgUrl}
              style={{ width: 150, height: 150, borderRadius: 10 }}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control ref={nameRef} placeholder="Enter your name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Roll no</Form.Label>
          <Form.Control ref={rollnoRef} placeholder="Enter your roll no" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Branch</Form.Label>
          <Form.Control value="CSE" disabled />
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            ref={bioRef}
            placeholder="Enter your bio"
            style={{ height: "8em" }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Interests</Form.Label>
          <div>
            {interests.map((_) => (
              <Badge key={_} variant="dark" pill className="m-1">
                <p className="m-0 p-1">
                  {_ + " "}
                  <span
                    onClick={() =>
                      setInterests(interests.filter((i) => i !== _))
                    }
                  >
                    ×
                  </span>
                </p>
              </Badge>
            ))}
          </div>
          <Form.Control as="select" onChange={handleInterests}>
            <option>Web Development</option>
            <option>Artificial Intelligence</option>
            <option>Data Science</option>
            <option>Aptitude</option>
            <option>Competitive Programming</option>
            <option>Machine Learning</option>
            <option>Augumented Reality</option>
            <option>Cyber Security</option>
            <option>Android Development</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Groups</Form.Label>
          <div>
            {groups.map((_) => (
              <Badge key={_} variant="dark" pill className="m-1">
                <p className="m-0 p-1">
                  {_ + " "}
                  <span
                    onClick={() => setGroups(groups.filter((i) => i !== _))}
                  >
                    ×
                  </span>
                </p>
              </Badge>
            ))}
          </div>
          <Form.Control as="select" onChange={handleGroups}>
            <option>Trainings & Placements</option>
            <option>Coding club</option>
            <option>Tech Stack developers</option>
            <option>CSI Official</option>
            <option>College Basketball club</option>
          </Form.Control>
        </Form.Group>
        <Button
          className="mr-2 mb-5"
          variant="primary"
          onClick={addDetailsToUser}
        >
          Add Details
        </Button>
      </div>
    </div>
  );
}
