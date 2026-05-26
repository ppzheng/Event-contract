import { notFound } from "next/navigation";
import { EventDetailExperience } from "@/components/event-detail/event-detail-experience";
import { getMockEventById, mockEventRouteIds } from "@/lib/mock/events";
import { getRecentTrades } from "@/lib/mock/trades";

type EventDetailPageProps = {
  params: Promise<{
    eventId: string;
  }>;
};

export function generateStaticParams() {
  return mockEventRouteIds.map((eventId) => ({
    eventId,
  }));
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { eventId } = await params;
  const event = getMockEventById(eventId);

  if (!event) {
    notFound();
  }

  const recentTrades = getRecentTrades(event.id);

  return <EventDetailExperience initialEvent={event} initialTrades={recentTrades} />;
}
