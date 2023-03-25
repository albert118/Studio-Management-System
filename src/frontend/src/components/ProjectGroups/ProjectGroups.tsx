import React, { useState, useEffect } from "react";

function ProjectGroups() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://example.com/api/data")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div>
      <h4>Group 1:</h4>
      {data.map((item) => (
        <h2>Group 1</h2>
        // <div key={item.id}>
        //   <h2>Group 1</h2>
        //   <h3>{item.id}</h3>
        //   <p>{item.members}</p>
        // </div>
      ))}
    </div>
  );
}

export default ProjectGroups
