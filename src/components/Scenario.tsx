"use client";
import React from "react";
import { ChevronDown } from "./svgs";

const Scenario = () => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const options = [
    { value: "default", label: "Default" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className="flex items-center gap-2 text-sm">
      <p className="text-[#9D9DAA]">Scenario</p>
      <div className="relative">
        <select
          value={selectedOption}
          className="bg-[#FAFAFB] shadow-none outline-none block appearance-none w-full px-4 pr-8 rounded-xl leading-tight focus:outline-none"
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2">
          <ChevronDown className="w-[10px] h-[6px]" />
        </div>
      </div>
    </div>
  );
};

export default Scenario;
