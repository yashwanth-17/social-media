import React, { useState, useEffect } from "react";
import PostLeft from "./PostLeft";
import PostRight from "./PostRight";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory, useParams } from "react-router-dom";
import "./styles.css";

function Post() {
  const history = useHistory();
  const { id } = useParams();
  function goBack() {
    history.goBack();
  }
  return (
    <div>
      <Container className="container-style">
        <Row>
          <Col lg={1} md={1} sm={1}>
            <BiArrowBack onClick={goBack} className="arrow" size={26} />
          </Col>
          <Col lg={6} md={11} sm={11}>
            <PostLeft id={id} />
          </Col>
          <Col lg={5} md={12}>
            <PostRight id={id} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Post;
