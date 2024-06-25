"use client";

import React, { useState } from "react";

const JestTest = () => {
  const [inputVal, setInputVal] = useState("");

  return (
    <div>
      <h1>Page</h1>
      <p>Sam is genius</p>

      <h2>Search section</h2>
      <input
        type="text"
        role="searchBox"
        title="Search"
        value={inputVal}
        onChange={(ev) => setInputVal(ev.target.value)}
      />

      <ul aria-label="categories">
        <li aria-label="category">
          <ul>
            <li>Sub-Category 1</li>
            <li>Sub-Category 2</li>
          </ul>
        </li>
        <li aria-label="category">Category 2</li>
      </ul>

      <h2 id="all-items-title">All Items</h2>
      <ul aria-labelledby="all-items-title">
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </div>
  );
};

export default JestTest;
