import React from "react";

let data = [];
let names = ["Home", "Login", "Signup", "Explore", "Profile", "QnA"];
for (let i = 0; i < 6; i++) {
  data.push(
    <div className="docContent">
      <img src="https://picsum.photos/200/200" alt="sample" />
      <div>
        <h5>{names[i]} Page</h5>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste quo
          facilis, beatae eligendi repellendus voluptatum minima, molestiae quis
          consectetur consequuntur ea repellat repudiandae dicta vitae et dolor?
          Excepturi praesentium labore, quibusdam a eos, laudantium repudiandae
          nam cum veniam esse inventore? Dolore, hic commodi? Sunt atque, rem
          iure consequatur nulla consequuntur excepturi mollitia aliquid iste.
        </p>
      </div>
    </div>
  );
}

function AppDocs() {
  return (
    <div id="docContainer">
      <h1>Documentation</h1>
      {data}
    </div>
  );
}

export default AppDocs;
