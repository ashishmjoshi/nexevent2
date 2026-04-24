import { Header } from "@/components/Header";
import { EventFeed } from "@/components/EventFeed";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // ISR

const MOCK_EVENTS = [
  {
    id: "uuid-1",
    title: "HackTheCampus 2026",
    description:
      "A 48-hour hackathon focused on building solutions for campus life. Food, swag, and prizes included! Join hundreds of developers.",
    event_date: "2026-05-15T09:00:00Z",
    location_name: "Main Auditorium",
  },
  {
    id: "uuid-2",
    title: "Cultural Night: Symphony",
    description:
      "Annual cultural festival featuring music, dance, and art exhibitions. Don't miss the flagship performance by the college band.",
    event_date: "2026-05-20T18:00:00Z",
    location_name: "Open Air Theatre",
  },
  {
    id: "uuid-3",
    title: "Inter-department Basketball",
    description:
      "Cheer for your department in the ultimate basketball showdown. Semi-finals and finals happening today. Get ready to witness history.",
    event_date: "2026-05-22T16:00:00Z",
    location_name: "Indoor Sports Complex",
  },
];

export default async function Home() {
  let events = [];
  let fetchError = false;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true })
        .limit(10);

      if (error) {
        console.error("Supabase error:", error);
        fetchError = true;
      } else {
        events = data || [];
      }
    } catch (e) {
      console.error("Supabase connection failed:", e);
      fetchError = true;
    }
  } else {
    // If supabase client isn't configured, we use mock data
    fetchError = true;
  }

  // Fallback to mock data for demonstration
  if (fetchError || events.length === 0) {
    events = MOCK_EVENTS;
  }

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      <Header />

      {/* Background glowing blobs for premium aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[50%] h-[30%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex-1 max-w-6xl w-full mx-auto px-6 pt-32 pb-20 relative z-10 flex flex-col">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300 mb-6 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Campus Hub Live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40">
            Discover What's <br /> Happening.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Your single source of truth for all campus activities. Ditch the
            WhatsApp noise and scattered announcements. Find, register, and
            check-in to events seamlessly.
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Upcoming Events
          </h2>
          <div className="hidden sm:flex gap-2 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
            {["All", "Technical", "Cultural", "Sports"].map((tab, i) => (
              <button
                key={tab}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${i === 0 ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white hover:bg-white/5"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <EventFeed events={events} />
      </div>
    </main>
  );
}
