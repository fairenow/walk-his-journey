import React, { useEffect, useMemo, useRef, useState } from "react";
import MessageBubble from "../../../components/MessageBubble";
import ReflectionModal from "../../../components/ReflectionModal";
import TrackingPermissionModal from "../../../components/TrackingPermissionModal";
import useJourneyFeedEngine from "../../../hooks/useJourneyFeedEngine";
import useReflections, { ReflectionEntry } from "../../../hooks/useReflections";
import { journeyScenes } from "../../../data/journeys.ts";

const metersToMiles = (meters: number) => (meters / 1609.34).toFixed(2);

type JourneyFeedListProps = {
  feed: ReturnType<typeof useJourneyFeedEngine>["feed"];
  sceneLookup: Record<string, (typeof journeyScenes)[number]>;
  onSelectMessage?: (messageId: string) => void;
  reflections?: Record<string, ReflectionEntry>;
};

const JourneyFeedList: React.FC<JourneyFeedListProps> = ({
  feed,
  sceneLookup,
  onSelectMessage,
  reflections,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [feed]);

  if (!feed.length) {
    return (
      <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-center text-blue-100/80">
        <p className="text-base font-semibold text-white">Ready to start walking?</p>
        <p className="max-w-sm text-sm text-blue-100/70">
          Press start to begin tracking. As you move, new devotional moments will appear right here.
        </p>
      </div>
    );
  }

  return (
    <div ref={listRef} className="max-h-[60vh] space-y-3 overflow-y-auto pr-1 scroll-smooth">
      {feed.map((message) => {
        const scene = sceneLookup[message.sceneId];
        return (
          <MessageBubble
            key={message.id}
            sceneTitle={scene?.title ?? "Journey Moment"}
            text={message.text}
            timestamp={message.timestamp}
            icon={scene?.icon ?? "✝️"}
            messageId={message.id}
            onSelect={onSelectMessage}
            hasReflection={Boolean(reflections?.[message.id])}
          />
        );
      })}
    </div>
  );
};

const WalkFeedPage: React.FC = () => {
  const { feed, walkState, isTracking, startTracking, stopTracking, error } =
    useJourneyFeedEngine();
  const { reflections, saveReflection } = useReflections();

  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [hasTrackingPermission, setHasTrackingPermission] = useState(() =>
    localStorage.getItem("whj_tracking_allowed_v1") === "true"
  );
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  const sceneLookup = useMemo(
    () =>
      journeyScenes.reduce(
        (map, scene) => ({ ...map, [scene.id]: scene }),
        {} as Record<string, (typeof journeyScenes)[number]>
      ),
    []
  );

  const activeScene = sceneLookup[walkState.currentSceneId];
  const totalDistanceMiles = metersToMiles(walkState.totalDistanceMeters);

  const activeMessage = useMemo(
    () => feed.find((message) => message.id === activeMessageId) ?? null,
    [activeMessageId, feed]
  );

  const lastFeedMessage = feed[feed.length - 1];
  const activeReflectionText = activeMessage?.id ? reflections[activeMessage.id]?.text ?? "" : "";

  const handleStartClick = () => {
    if (hasTrackingPermission) {
      startTracking();
      return;
    }

    setIsPermissionModalOpen(true);
  };

  const handleReflectClick = () => {
    if (lastFeedMessage) {
      setActiveMessageId(lastFeedMessage.id);
    }
  };

  const handleSaveReflection = (text: string) => {
    if (!activeMessage) return;
    saveReflection(activeMessage.id, text);
    setActiveMessageId(null);
  };

  const handleCloseModal = () => setActiveMessageId(null);

  const handleAllowTracking = () => {
    localStorage.setItem("whj_tracking_allowed_v1", "true");
    setHasTrackingPermission(true);
    setIsPermissionModalOpen(false);
    startTracking();
  };

  const handleDeclineTracking = () => {
    setIsPermissionModalOpen(false);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b1a2f] via-[#0f243f] to-[#0b1a2f] text-slate-50 shadow-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_40%)]" />
      <div className="relative z-10 space-y-6 p-6 sm:p-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.14em] text-blue-100/80">Live devotional feed</p>
            <h1 className="text-3xl font-bold text-white drop-shadow-sm">Walk His Journey</h1>
            <p className="text-sm text-blue-100/80">See new moments appear as you move.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left shadow-sm shadow-black/30">
              <p className="text-[11px] uppercase tracking-[0.12em] text-blue-100/80">Total distance today</p>
              <p className="text-xl font-semibold text-white">{totalDistanceMiles} mi</p>
            </div>
            <button
              type="button"
              onClick={isTracking ? stopTracking : handleStartClick}
              className={`rounded-2xl border px-5 py-3 text-sm font-semibold shadow-lg shadow-black/30 transition focus:outline-none focus:ring-2 focus:ring-blue-300/60 focus:ring-offset-0 ${
                isTracking
                  ? "border-red-300/60 bg-red-500/90 text-white hover:bg-red-500"
                  : "border-emerald-300/60 bg-emerald-400/90 text-emerald-950 hover:bg-emerald-400"
              }`}
            >
              {isTracking ? "Stop" : "Start"}
            </button>
          </div>
        </header>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-4 shadow-inner shadow-black/30">
          <JourneyFeedList
            feed={feed}
            sceneLookup={sceneLookup}
            onSelectMessage={setActiveMessageId}
            reflections={reflections}
          />
        </section>

        {error ? (
          <div className="rounded-xl border border-red-400/60 bg-red-500/20 px-4 py-3 text-sm text-red-50">
            {error}
          </div>
        ) : null}

        <footer className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/30 text-2xl shadow-inner shadow-black/40">
              <span aria-hidden>{activeScene?.icon ?? "✝️"}</span>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-blue-100/80">Current scene</p>
              <p className="text-base font-semibold text-white">
                {activeScene?.title ?? "Keep walking to unlock the next scene"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReflectClick}
            disabled={!lastFeedMessage}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-black/30 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reflect
          </button>
        </footer>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
      <ReflectionModal
        isOpen={Boolean(activeMessage)}
        momentText={activeMessage?.text}
        initialText={activeReflectionText}
        onSave={handleSaveReflection}
        onCancel={handleCloseModal}
      />
      <TrackingPermissionModal
        isOpen={!isTracking && isPermissionModalOpen}
        onAllow={handleAllowTracking}
        onDecline={handleDeclineTracking}
      />
    </div>
  );
};

export default WalkFeedPage;
