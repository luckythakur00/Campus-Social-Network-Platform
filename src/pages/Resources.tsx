import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Map, Code, ClipboardCheck } from "lucide-react";

const sections = [
  { icon: FileText, title: "Interview questions", count: 420, color: "primary" },
  { icon: BookOpen, title: "Resume templates", count: 18, color: "secondary" },
  { icon: Map, title: "Career roadmaps", count: 12, color: "success" },
  { icon: Code, title: "Coding sheets", count: 32, color: "warning" },
  { icon: ClipboardCheck, title: "Mock tests", count: 24, color: "primary" },
];

export default function Resources() {
  return (
    <div className="space-y-6">
      <PageHeader title="Resources" description="Curated by seniors, alumni, and placement office." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Card key={s.title} className="p-5">
            <div className={`size-11 rounded-xl bg-${s.color}/10 text-${s.color} grid place-items-center mb-3`}>
              <s.icon className="size-5" />
            </div>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.count} items available</p>
            <Button variant="outline" size="sm" className="mt-4">Browse</Button>
          </Card>
        ))}
      </div>
      <div>
        <h2 className="font-display font-semibold text-lg mb-3">Latest additions</h2>
        <div className="space-y-2">
          {["System Design cheat sheet — v2", "Frontend hiring roadmap 2026", "OpenAI take-home tips (unofficial)", "Product management case studies pack"].map((t) => (
            <Card key={t} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-9 rounded-lg bg-muted grid place-items-center"><FileText className="size-4" /></div>
                <span className="text-sm truncate">{t}</span>
              </div>
              <Badge variant="outline">New</Badge>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
