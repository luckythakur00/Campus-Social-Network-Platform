import { PageHeader, EmptyState } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function SimpleRolePage({ title, section }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={section}
        action={<Badge variant="outline">{section}</Badge>}
      />
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          This is a scaffolded page for <strong className="text-foreground">{title}</strong>. Wire
          it to real data when you're ready.
        </p>
      </Card>
      <EmptyState
        title="Nothing here yet"
        description="Actions you take in this section will appear here."
        icon={Sparkles}
      />
    </div>
  );
}
