import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { jobs } from "@/lib/mock-data";
import { MapPin, Clock, Building, Bookmark } from "lucide-react";
import { toast } from "sonner";

export default function JobDetail() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === id) ?? jobs[0];
  return (
    <div className="space-y-4">
      <Link to="/jobs" className="text-sm text-primary hover:underline">
        ← All jobs
      </Link>
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <img src={job.logo} alt="" className="size-16 rounded-2xl border bg-white p-1" />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-display font-bold">{job.title}</h1>
            <p className="text-muted-foreground">{job.company}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {job.posted}
              </span>
              <span className="flex items-center gap-1">
                <Building className="size-3" />
                {job.type}
              </span>
              <span className="font-medium text-foreground">{job.salary}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Button
            className="flex-1 gradient-brand text-white border-0"
            onClick={() => toast.success("Application submitted!")}
          >
            Apply now
          </Button>
          <Button variant="outline">
            <Bookmark className="size-4 mr-1.5" />
            Save
          </Button>
        </div>
      </Card>
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-2">About the role</h3>
          <p className="text-sm text-muted-foreground">
            {job.description} You'll partner with product, design, and engineering leaders to ship
            features used by millions.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What you'll do</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
            <li>Own end-to-end delivery of critical product surfaces</li>
            <li>Design and build scalable, maintainable systems</li>
            <li>Mentor other engineers and set technical direction</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Requirements</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
            <li>4+ years of relevant experience</li>
            <li>Deep proficiency in {job.tags.join(", ")}</li>
            <li>Bias toward action and shipping</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
