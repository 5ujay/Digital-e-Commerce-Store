import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortProducts = ({ onSortChange }) => {
  const list = [
    {
      label: "New",
      field: "id",
      order: "desc",
    },
    {
      label: "Price (LOW to HIGH)",
      field: "price",
      order: "asc",
    },
    {
      label: "Price (HIGH to LOW)",
      field: "price",
      order: "desc",
    }
  ];
  return (
    <div>
      <Select onValueChange={(value) => onSortChange(JSON.parse(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="sort by" />
        </SelectTrigger>
        <SelectContent>
          {list.map((option, index) => (
            <SelectItem key={index} value={JSON.stringify(option)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortProducts;
