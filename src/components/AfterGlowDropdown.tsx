"use client";
import React from "react";
import Select from "./ui//select";

const AfterGlowDropdown = () => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const options = [
    { value: "", label: "Afterglow" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  return <Select label="" value={selectedOption} options={options} onChange={handleChange} />;
};

export default AfterGlowDropdown;
