import { EventCard } from "@/components/markets/event-card";
import type { EventContract } from "@/types/event-contract";

export function EventList({ events }: { events: EventContract[] }) {
  return (
    <section
      aria-label="Event contracts"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
    >
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </section>
  );
}
