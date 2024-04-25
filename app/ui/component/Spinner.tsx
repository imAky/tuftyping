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

export const ProgressSpinner = () => {
  return (
    <div className="absolute inset-0  flex items-center justify-center">
      <span className="progress-loader"></span>
    </div>
  );
};
