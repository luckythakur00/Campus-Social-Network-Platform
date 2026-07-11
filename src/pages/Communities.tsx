import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { communities } from "@/lib/mock-data";
import { Users, Plus } from "lucide-react";

export default function Communities() {
  return (
    <div className="space-y-6">
      <PageHeader title="Communities" description="Find your people on campus." action={<Button className="gradient-brand text-white border-0"><Plus className="size-4 mr-1.5" />Create</Button>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities.map((c) => (
          <Card key={c.id} className="overflow-hidden p-0 group hover:shadow-[var(--shadow-soft)] transition-shadow">
            <Link to={`/community/${c.id}`}>
              <div className="h-32 overflow-hidden"><img src={c.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold truncate">{c.name}</h3>
                  <Badge variant="secondary">{c.category}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="size-3" />{c.members.toLocaleString()} members</span>
                  <Button size="sm" variant="outline">Join</Button>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
