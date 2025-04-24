export default function AdminLoading() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-64 h-full bg-gray-800 border-r border-white/10 animate-pulse" />
      <div className="flex-1 p-6">
        <div className="h-8 w-48 bg-gray-700 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded-lg border border-white/10 animate-pulse"
            >
              <div className="h-8 w-8 bg-gray-700 rounded-full mb-4" />
              <div className="h-6 w-32 bg-gray-700 rounded mb-2" />
              <div className="h-4 w-48 bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
