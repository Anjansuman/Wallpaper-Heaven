export default function Loading() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6]">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-black border-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading elegant designs...</p>
      </div>
    );
  }