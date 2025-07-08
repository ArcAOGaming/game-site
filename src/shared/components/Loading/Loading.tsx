export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4" />
      <p className="text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  )
}
