import React from "react";

export type MessageBubbleProps = {
  sceneTitle: string;
  text: string;
  timestamp: string;
  icon?: string;
  messageId?: string;
  onSelect?: (messageId: string) => void;
  hasReflection?: boolean;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({
  sceneTitle,
  text,
  timestamp,
  icon = "✝️",
  messageId,
  onSelect,
  hasReflection = false,
}) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const handleClick = () => {
    if (onSelect && messageId) {
      onSelect(messageId);
    }
  };

  const Wrapper = onSelect && messageId ? "button" : "div";

  return (
    <article className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg shadow-inner shadow-black/30">
        <span aria-hidden>{icon}</span>
      </div>
      <Wrapper
        type={Wrapper === "button" ? "button" : undefined}
        onClick={handleClick}
        className={`group flex-1 text-left ${Wrapper === "button" ? "focus:outline-none" : "cursor-default"}`}
      >
        <p className="text-[11px] uppercase tracking-[0.08em] text-blue-100/90">{sceneTitle}</p>
        <div className="mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-lg shadow-black/30 backdrop-blur transition group-hover:border-blue-200/40 group-hover:bg-white/10 group-hover:shadow-blue-500/20">
          <p className="text-sm leading-relaxed text-slate-50/90">{text}</p>
          <div className="mt-2 flex items-center justify-between text-xs text-blue-100/80">
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-blue-200" aria-hidden />
              {formattedTime}
            </span>
            <div className="flex items-center gap-2" aria-label={hasReflection ? "Reflection saved" : undefined}>
              {hasReflection ? (
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-100">Reflection</span>
              ) : null}
              <span aria-hidden className="text-base">
                {icon}
              </span>
            </div>
          </div>
        </div>
      </Wrapper>
    </article>
  );
};

export default MessageBubble;
