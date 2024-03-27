import React from "react";

const Tooltip = ({ toolText }: { toolText: string }) => {
  return (
    <div className="absolute  -top-1.5 left-1/2 transform -translate-x-1/2 mt-[10px] bg-black text-white px-4 py-1 rounded whitespace-nowrap ">
      {toolText}
    </div>
  );
};

export default Tooltip;
