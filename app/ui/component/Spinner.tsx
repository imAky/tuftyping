export const Spinner = () => {
  return (
    <div className="flex space-x-2 justify-center items-center w-8">
      <span className="profile-loader"></span>
    </div>
  );
};

export const MainSpinner = ({ className }: { className: string }) => {
  return (
    <div className={`${className}`}>
      <span className="loader"></span>
    </div>
  );
};
