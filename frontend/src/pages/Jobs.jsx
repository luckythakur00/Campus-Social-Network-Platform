import { useState } from "react";
import { PageHeader } from "@/components/common";
import { JobCard } from "@/components/cards/JobCard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { jobs } from "@/lib/mock-data";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Jobs() {
  const [q, setQ] = useState("");
  const filtered = jobs.filter((j) =>
    (j.title + j.company + j.tags.join(" ")).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs & internships"
        description={`${jobs.length} open roles from your extended network.`}
      />
      <div className="grid md:grid-cols-[1fr_260px] gap-4">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search roles, companies, skills…"
              className="pl-9"
            />
          </div>
          {filtered.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
        <div className="space-y-3">
          <Card className="p-4">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <SlidersHorizontal className="size-4" />
              Filters
            </h3>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">Type</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Full-time", "Internship", "Contract"].map((t) => (
                    <Badge key={t} variant="outline" className="cursor-pointer hover:bg-muted">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">Location</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Remote", "Bangalore", "SF"].map((t) => (
                    <Badge key={t} variant="outline" className="cursor-pointer hover:bg-muted">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Reset
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
