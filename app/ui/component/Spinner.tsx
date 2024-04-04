export const Spinner2 = () => (
  <div className="relative">
    <div className="w-6 h-6 rounded-full absolute border-4 border-solid border-gray-200"></div>
    <div className="w-6 h-6 rounded-full animate-spin absolute border-4 border-solid border-pink-500 border-t-transparent"></div>
  </div>
);

export const Spinner = () => {
  return (
    <div className="flex space-x-2 justify-center items-center  w-16 ">
      <div className="h-4 w-4 bg-yellow-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 bg-yellow-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 bg-yellow-600 rounded-full animate-bounce"></div>
    </div>
  );
};
