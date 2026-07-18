import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const reports = [
  {
    id: "r1",
    type: "Post",
    reason: "Spam",
    reporter: "Ananya Das",
    target: "Post p_44 by user_88",
    time: "2h",
  },
  {
    id: "r2",
    type: "Message",
    reason: "Harassment",
    reporter: "Rohan Verma",
    target: "DM in conv_12",
    time: "5h",
  },
  {
    id: "r3",
    type: "Profile",
    reason: "Fake account",
    reporter: "System",
    target: "user_231",
    time: "1d",
  },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="User-submitted reports awaiting review." />
      <div className="space-y-3">
        {reports.map((r) => (
          <Card key={r.id} className="p-4 flex items-start gap-4">
            <div className="size-10 rounded-xl bg-destructive/10 text-destructive grid place-items-center shrink-0">
              <AlertTriangle className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{r.type}</Badge>
                <Badge className="bg-destructive/10 text-destructive">{r.reason}</Badge>
                <span className="text-xs text-muted-foreground">{r.time} ago</span>
              </div>
              <p className="text-sm mt-2">
                <strong>Target:</strong> {r.target}
              </p>
              <p className="text-xs text-muted-foreground">Reported by {r.reporter}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="sm" variant="outline">
                Dismiss
              </Button>
              <Button size="sm" variant="destructive">
                Take action
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
