export default function ProgressBar({ percent }) {
  const clamped = Math.min(Math.max(percent, 0), 100);
  return (
    <div className="mt-3 h-3 w-full rounded-full bg-slate-200">
      <div
        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
