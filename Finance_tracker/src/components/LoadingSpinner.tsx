const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px-70px)] bg-gray-50 p-6">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primaryOrange rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <svg
            className="w-10 h-10 text-primaryOrange"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        </div>
      </div>
      <p className="text-xl font-medium select-none">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
