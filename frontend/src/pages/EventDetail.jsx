import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/mock-data";
import { Calendar, MapPin, Users, QrCode } from "lucide-react";
import { toast } from "sonner";

export default function EventDetail() {
  const { id } = useParams();
  const e = events.find((x) => x.id === id) ?? events[0];
  return (
    <div className="space-y-4">
      <Link to="/events" className="text-sm text-primary hover:underline">
        ← All events
      </Link>
      <Card className="overflow-hidden p-0">
        <div className="h-56 overflow-hidden">
          <img src={e.cover} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <Badge variant="secondary">{e.category}</Badge>
          <h1 className="text-3xl font-display font-bold mt-2">{e.title}</h1>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="size-4" />
              {e.date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-4" />
              {e.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-4" />
              {e.attendees} attending
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Join the biggest campus gathering of the year. Meet friends new and old, hear from
            inspiring speakers, and celebrate everything that makes our campus special.
          </p>
          <div className="mt-6 flex gap-2">
            <Button
              className="gradient-brand text-white border-0"
              onClick={() => toast.success("You're registered!")}
            >
              Register
            </Button>
            <Button variant="outline">Add to calendar</Button>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="size-24 rounded-xl bg-muted grid place-items-center">
            <QrCode className="size-12 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">Your ticket</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Show this QR at the entrance. It's linked to your Campus Connect profile.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
