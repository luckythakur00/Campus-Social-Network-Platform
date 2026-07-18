import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, EyeOff, Trash2 } from "lucide-react";

const queue = [
  { id: "1", text: "Spammy DM promoting crypto…", author: "user_88", flags: 4 },
  {
    id: "2",
    text: "Post with hateful content flagged by community…",
    author: "user_121",
    flags: 7,
  },
  { id: "3", text: "Community post violating academic integrity…", author: "user_45", flags: 2 },
];

export default function Moderation() {
  return (
    <div className="space-y-6">
      <PageHeader title="Moderation queue" description="Review flagged content and take action." />
      <div className="space-y-3">
        {queue.map((q) => (
          <Card key={q.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge className="bg-warning/20 text-warning-foreground mb-2">
                  <Shield className="size-3 mr-1" />
                  {q.flags} flags
                </Badge>
                <p className="text-sm">{q.text}</p>
                <p className="text-xs text-muted-foreground mt-1">Author: {q.author}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="outline">
                  <EyeOff className="size-3.5 mr-1.5" />
                  Hide
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="size-3.5 mr-1.5" />
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
