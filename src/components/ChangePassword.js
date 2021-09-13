import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { auth } from "./Firebase";

export default function ChangePassword() {
  const [newPass, setNewPass] = useState("");
  const history = useHistory();
  function goBack() {
    history.goBack();
  }
  async function changePassword() {
    if (newPass.trim() !== "") await auth.currentUser.updatePassword(newPass);
    goBack();
  }
  return (
    <div className="explore">
      <Form className="container">
        <h3 className="py-3">Change Password</h3>
        <Form.Group>
          <Form.Label>Old Password</Form.Label>
          <Form.Control type="password" placeholder="Enter old password" />
        </Form.Group>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm new Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm new password" />
        </Form.Group>
        <div>
          <Button className="mr-2" variant="primary" onClick={changePassword}>
            Change Password
          </Button>
          <Button variant="secondary" onClick={goBack}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
