import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Bookmark } from "lucide-react";

export function JobCard({ job }) {
  return (
    <Card className="p-5 hover:shadow-[var(--shadow-soft)] transition-shadow">
      <div className="flex items-start gap-4">
        <img
          src={job.logo}
          alt={job.company}
          className="size-12 rounded-xl border bg-white object-contain p-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                to={`/jobs/${job.id}`}
                className="font-semibold hover:text-primary truncate block"
              >
                {job.title}
              </Link>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <Button variant="ghost" size="icon">
              <Bookmark className="size-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {job.posted}
            </span>
            <span className="font-medium text-foreground">{job.salary}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="secondary">{job.type}</Badge>
            {job.tags.slice(0, 3).map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
