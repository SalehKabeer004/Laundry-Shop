const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      {/* Animated Spinner */}
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      
      <h2 className="mt-4 text-gray-700 font-medium animate-pulse">
        Setting up your laundry room...
      </h2>
    </div>
  );
};

export default FullPageLoader;