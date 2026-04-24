"use client";
import { motion, Variants } from "framer-motion";
import { MapPin, Users, CalendarDays, ArrowRight } from "lucide-react";

type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location_name: string;
  organizer_id?: string;
  created_at?: string;
};

export function EventFeed({ events }: { events: Event[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <CalendarDays className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">
          No events found
        </h3>
        <p className="text-muted-foreground max-w-sm">
          There are no events scheduled at the moment. Check back later or
          create a new event.
        </p>
      </div>
    );
  }

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {events.map((evt) => (
        <motion.div
          key={evt.id}
          variants={item}
          className="group relative bg-card/40 backdrop-blur-md border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] flex flex-col"
        >
          <div className="aspect-[4/3] w-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium border border-white/10 text-white shadow-lg">
              Event
            </span>
            <img
              src={
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop"
              }
              alt={evt.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1">
              <span className="text-white/90 text-sm font-medium flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                {new Date(evt.event_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1 relative z-20">
            <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {evt.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1">
              {evt.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {evt.location_name}
                </span>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all group-hover:bg-primary group-hover:text-white shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
