export default function Discover() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-xs font-semibold tracking-wide text-[color:var(--deep-teal)] uppercase">
          Discover
        </p>
        <h1 className="text-3xl font-bold mt-1">The Journey of Jesus</h1>
        <p className="text-sm text-gray-700 mt-3 max-w-2xl">
          Explore the life of Jesus through key journeys, teachings, and moments.
          Learn the story behind each step, then walk it out in your own life.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <DiscoverCard
          title="Timeline"
          description="See Jesus’ life from birth to resurrection in a guided timeline."
        />
        <DiscoverCard
          title="Journey Map"
          description="View the key places Jesus walked and what happened there."
        />
        <DiscoverCard
          title="Teachings"
          description="Browse His parables, sermons, and conversations."
        />
      </section>
    </div>
  );
}

function DiscoverCard({ title, description }) {
  return (
    <div className="bg-white/90 rounded-2xl p-5 shadow-[0_6px_18px_rgba(0,0,0,0.05)] border border-white/60">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-gray-700 mt-2">{description}</p>
      <button className="mt-4 text-sm font-medium text-[color:var(--deep-teal)]">
        Open →
      </button>
    </div>
  );
}
