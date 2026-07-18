import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Star } from "lucide-react";
import { mentors } from "@/lib/mock-data";
import { useState } from "react";
import { toast } from "sonner";

const slots = ["09:00", "10:30", "13:00", "15:00", "16:30"];

export default function MentorDetail() {
  const { mentorId } = useParams();
  const m = mentors.find((x) => x.id === mentorId) ?? mentors[0];
  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState(null);
  return (
    <div className="space-y-4">
      <Link to="/mentorship" className="text-sm text-primary hover:underline">
        ← All mentors
      </Link>
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="size-20">
            <AvatarImage src={m.avatar} />
            <AvatarFallback>{m.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-display font-bold">{m.name}</h1>
            <p className="text-muted-foreground">
              {m.role} · {m.company}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="size-3 fill-warning text-warning" />
                {m.rating}
              </span>
              <span>·</span>
              <span>{m.sessions} sessions</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.expertise.map((e) => (
                <Badge key={e} variant="secondary">
                  {e}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold mb-3">Pick a date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold mb-3">Available slots</h3>
          <div className="grid grid-cols-3 gap-2">
            {slots.map((s) => (
              <Button
                key={s}
                variant={slot === s ? "default" : "outline"}
                onClick={() => setSlot(s)}
              >
                {s}
              </Button>
            ))}
          </div>
          <Button
            className="w-full mt-4 gradient-brand text-white border-0"
            onClick={() => toast.success(`Session booked for ${date?.toDateString()} at ${slot}`)}
          >
            Book session
          </Button>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold">Upcoming sessions</h3>
          <p className="text-sm text-muted-foreground mt-2">No upcoming sessions yet.</p>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold">Completed sessions</h3>
          <p className="text-sm text-muted-foreground mt-2">Nothing here yet.</p>
        </Card>
      </div>
    </div>
  );
}
