import React from "react";

const DashCardSkeleton = () => {
  return (
    <div className="flex justify-between flex-wrap mb-16 ">
      <div className="h-40 w-1/6 flex flex-col bg-gray-700 my-2 mx-2 drop-shadow-2xl p-4 rounded-lg ">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 bg-gray-500 rounded animate-pulse"></div>
          <div className="h-6 w-6 bg-yellow-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex-grow flex items-center">
          <div className="text-6xl text-gray-500 h-16 w-32 bg-gray-500 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="h-40 w-1/6 flex flex-col bg-gray-700 my-2 mx-2 drop-shadow-2xl p-4 rounded-lg ">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 bg-gray-500 rounded animate-pulse"></div>
          <div className="h-6 w-6 bg-yellow-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex-grow flex items-center">
          <div className="text-6xl text-gray-500 h-16 w-32 bg-gray-500 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="h-40 w-1/6 flex flex-col bg-gray-700 my-2 mx-2 drop-shadow-2xl p-4 rounded-lg ">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 bg-gray-500 rounded animate-pulse"></div>
          <div className="h-6 w-6 bg-yellow-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex-grow flex items-center">
          <div className="text-6xl text-gray-500 h-16 w-32 bg-gray-500 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="h-40 w-1/6 flex flex-col bg-gray-700 my-2 mx-2 drop-shadow-2xl p-4 rounded-lg ">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 bg-gray-500 rounded animate-pulse"></div>
          <div className="h-6 w-6 bg-yellow-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex-grow flex items-center">
          <div className="text-6xl text-gray-500 h-16 w-32 bg-gray-500 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default DashCardSkeleton;
