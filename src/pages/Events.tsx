import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/mock-data";
import { Calendar as CalIcon, MapPin, Users } from "lucide-react";

export default function Events() {
  return (
    <div className="space-y-6">
      <PageHeader title="Events" description="Hackathons, meetups, and career fairs on your campus." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((e) => (
          <Link key={e.id} to={`/events/${e.id}`}>
            <Card className="overflow-hidden p-0 hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="h-40 overflow-hidden"><img src={e.cover} alt="" className="w-full h-full object-cover" /></div>
              <div className="p-4">
                <Badge variant="secondary" className="mb-2">{e.category}</Badge>
                <h3 className="font-semibold truncate">{e.title}</h3>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5"><CalIcon className="size-3" />{e.date}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="size-3" />{e.location}</p>
                  <p className="flex items-center gap-1.5"><Users className="size-3" />{e.attendees} attending</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
