export default function ProgressBar({ percent }) {
  const clamped = Math.min(Math.max(percent, 0), 100);
  return (
    <div className="mt-4 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-700"
        style={{ width: `${clamped}%` }}
      ></div>
    </div>
  );
}
