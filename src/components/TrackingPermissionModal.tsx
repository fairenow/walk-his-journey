import React from "react";

export type TrackingPermissionModalProps = {
  isOpen: boolean;
  onAllow: () => void;
  onDecline: () => void;
};

const TrackingPermissionModal: React.FC<TrackingPermissionModalProps> = ({
  isOpen,
  onAllow,
  onDecline,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] shadow-2xl shadow-black/50">
        <div className="border-b border-white/10 bg-white/5 px-6 py-4">
          <p className="text-xs uppercase tracking-[0.12em] text-blue-100/80">Walk With Jesus</p>
          <p className="mt-1 text-xl font-semibold text-white">Walk With Jesus — Track Your Movement?</p>
        </div>
        <div className="space-y-5 px-6 py-5 text-blue-100/90">
          <p className="text-sm leading-relaxed">
            To help connect Jesus’ journey with your own, we track distance while this page is open. Your data stays on your device
            and can be reset anytime.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onDecline}
              className="w-full rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-blue-100/90 transition hover:bg-white/10 sm:w-auto"
            >
              Not Now
            </button>
            <button
              type="button"
              onClick={onAllow}
              className="w-full rounded-lg border border-emerald-300/60 bg-emerald-400/90 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-black/30 transition hover:bg-emerald-400 sm:w-auto"
            >
              Allow Tracking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPermissionModal;
