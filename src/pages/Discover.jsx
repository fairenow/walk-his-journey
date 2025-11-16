import { Link } from "react-router-dom";
import { journeys } from "../data/journeys";

export default function Discover() {
  const journeysByStage = journeys.reduce((acc, j) => {
    acc[j.stage] = acc[j.stage] || [];
    acc[j.stage].push(j);
    return acc;
  }, {});

  const stages = Object.keys(journeysByStage);

  return (
    <div className="space-y-10">
      <section>
        <p className="text-xs font-semibold tracking-wide text-[color:var(--deep-teal)] uppercase">
          Discover
        </p>
        <h1 className="text-3xl font-bold mt-1">The Journey of Jesus</h1>
        <p className="text-sm text-gray-700 mt-3 max-w-2xl">
          Explore Jesus’ life from Nazareth to the empty tomb. Tap any journey
          to learn what happened there, who He met, and what it means for us.
        </p>
      </section>

      {stages.map(stage => (
        <section key={stage} className="space-y-3">
          <h2 className="text-lg font-semibold">{stage}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {journeysByStage[stage].map(j => (
              <Link
                key={j.id}
                to={`/journey/${j.id}`}
                className="bg-white/90 rounded-2xl p-4 shadow-sm border border-white/60 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{j.icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{j.title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {j.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
