import React, { useEffect, useState } from "react";

export type ReflectionModalProps = {
  isOpen: boolean;
  momentText?: string;
  initialText?: string;
  onSave: (text: string) => void;
  onCancel: () => void;
};

const ReflectionModal: React.FC<ReflectionModalProps> = ({
  isOpen,
  momentText,
  initialText = "",
  onSave,
  onCancel,
}) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    if (isOpen) {
      setText(initialText);
    }
  }, [initialText, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(text.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] shadow-2xl shadow-black/50">
        <div className="border-b border-white/10 bg-white/5 px-6 py-4">
          <p className="text-xs uppercase tracking-[0.12em] text-blue-100/80">Reflect on this moment</p>
          <p className="mt-1 text-sm font-semibold text-white">{momentText ?? "Reflection"}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <label className="block text-sm font-medium text-blue-100/80" htmlFor="reflection-text">
            Your reflection
          </label>
          <textarea
            id="reflection-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="h-36 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white shadow-inner shadow-black/40 focus:border-blue-300/70 focus:outline-none"
            placeholder="Write what this moment means to you..."
          />
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-blue-100/90 transition hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="rounded-lg border border-emerald-300/60 bg-emerald-400/90 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-black/30 transition enabled:hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReflectionModal;
