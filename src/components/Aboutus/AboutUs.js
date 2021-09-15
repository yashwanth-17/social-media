import React from "react";

function AboutUs() {
  return (
    <div className="p-3 container">
      <h3 className="text-center">About us</h3>
      <hr />
      <p className="text-center">This website has been developed by</p>
      <div className="row">
        <div className="col-lg-5 col-3"></div>
        <ul className="col">
          <li>A. Naveen Kumar</li>
          <li>K. Yashwanth Reddy</li>
          <li>B. Navan</li>
          <li>U. Abhinav</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutUs;
