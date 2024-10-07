import React from "react";
import { ChevronDown } from "../svgs";
interface Props {
  options: Array<{ value: string; label: string }>;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}
const Select = ({ options, label, onChange, value }: Props) => {
  return (
    <div className="w-[225px]">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          className="text-[#808191] bg-[#FAFAFB] block appearance-none w-full border  py-2 px-4 pr-8 rounded-xl leading-tight focus:outline-none"
          onChange={onChange}
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

export default Select;
