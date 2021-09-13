import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* Importing Components from react-bootstrap */
import { FormControl, Form, InputGroup, Button } from "react-bootstrap";

/* Importing react-icons */
import { ImSearch } from "react-icons/im";
import { FiEdit } from "react-icons/fi";

/* Firebase Import */
import { auth, db } from "../Firebase";

function Search({ type, handleSearch, handleFilter }) {
  const [filters, setFilters] = useState([]);
  const userId = auth.currentUser.uid;

  /* useEffect to load filters selected by the user */
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(userId)
      .onSnapshot((snapshot) => {
        let newFilters = ["all", snapshot.data().branch];
        console.log("sd:::", snapshot.data());
        snapshot.data().channels.forEach(async (channelID) => {
          newFilters.push(channelID);
        });
        setFilters(newFilters);
      });
    return unsubscribe;
  }, []);

  return (
    <>
      <Form id="filterPart">
        <InputGroup id="searchBox">
          <InputGroup.Prepend>
            <InputGroup.Text id="search">
              <ImSearch />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Search Questions"
            aria-label="search"
            aria-describedby="search"
            name="search"
            onChange={handleSearch}
          />
        </InputGroup>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control
            as="select"
            style={{ backgroundColor: "#343a40", color: "white" }}
            onChange={handleFilter}
          >
            {filters.map((filter, index) => {
              return (
                <option key={index} value={filter}>
                  {filter.toUpperCase()}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form>
      <Button
        variant="dark"
        id="postQueryButton"
        as={Link}
        to={type === "posts" ? "new-post" : "/postquery"}
      >
        <FiEdit size={30} style={{ verticalAlign: "top" }} />
        <span className="ml-2 mt-1" style={{ fontSize: "1.3rem" }}>
          POST
        </span>
      </Button>
    </>
  );
}

export default Search;
