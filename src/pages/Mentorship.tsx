import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { mentors } from "@/lib/mock-data";

export default function Mentorship() {
  return (
    <div className="space-y-6">
      <PageHeader title="Mentorship" description="1:1 sessions with alumni currently working across FAANG, startups, and research." />
      <div className="grid sm:grid-cols-2 gap-4">
        {mentors.map((m) => (
          <Card key={m.id} className="p-5">
            <div className="flex items-start gap-4">
              <Avatar className="size-14"><AvatarImage src={m.avatar} /><AvatarFallback>{m.name[0]}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <Link to={`/mentorship/${m.id}`} className="font-semibold hover:text-primary block">{m.name}</Link>
                <p className="text-sm text-muted-foreground">{m.role} · {m.company}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="size-3 fill-warning text-warning" />{m.rating}</span>
                  <span>·</span>
                  <span>{m.sessions} sessions</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">{m.expertise.map((e) => <Badge key={e} variant="secondary">{e}</Badge>)}</div>
            <Button className="w-full mt-4">Book session</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
