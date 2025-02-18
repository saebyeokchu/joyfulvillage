// app/components/Divider.tsx (example path)
import React from "react";

interface DividerProps {
  text?: string;
}

export default function Divider({ text = "커뮤니티의 모습" }: DividerProps) {
  return (
    <div className="flex items-center w-full text-center my-4">
      <hr className="flex-grow border-t-2 border-gray-400" />
      <span className="mx-2 text-gray-700 font-bold">{text}</span>
      <hr className="flex-grow border-t-2 border-gray-400" />
    </div>
  );
}