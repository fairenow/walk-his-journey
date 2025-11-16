import React from "react";

export type MessageBubbleProps = {
  sceneTitle: string;
  text: string;
  timestamp: string;
  icon?: string;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  sceneTitle,
  text,
  timestamp,
  icon = "✝️",
}) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <article className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg shadow-inner shadow-black/30">
        <span aria-hidden>{icon}</span>
      </div>
      <div className="flex-1">
        <p className="text-[11px] uppercase tracking-[0.08em] text-blue-100/90">
          {sceneTitle}
        </p>
        <div className="mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-lg shadow-black/30 backdrop-blur">
          <p className="text-sm leading-relaxed text-slate-50/90">{text}</p>
          <div className="mt-2 flex items-center justify-between text-xs text-blue-100/80">
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-blue-200" aria-hidden />
              {formattedTime}
            </span>
            <span aria-hidden className="text-base">
              {icon}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MessageBubble;
