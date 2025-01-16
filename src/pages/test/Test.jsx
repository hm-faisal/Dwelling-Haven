import React, { useState } from "react";

function Example() {
  const [selectedOption, setSelectedOption] = useState("option2");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="select">Choose an option:</label>
      <select
        id="select"
        value={selectedOption}
        onChange={handleChange}
        className="border p-2"
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <p>Selected: {selectedOption}</p>
    </div>
  );
}

export default Example;
