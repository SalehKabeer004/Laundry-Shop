const TableSkeleton = () => {
  return (
    <div className="bg-white m-20 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="h-16 m-auto  bg-gray-50 border-b border-gray-100"></div> {/* Header Skeleton */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center px-6 py-4 space-x-4 border-b border-gray-50">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;