import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector, markAllRead, markRead } from "@/store";
import { MessageSquare, UserPlus, Briefcase, Calendar, Settings as Cog } from "lucide-react";
import { cn } from "@/lib/utils";

const iconFor = {
  message: MessageSquare,
  connection: UserPlus,
  job: Briefcase,
  event: Calendar,
  system: Cog,
};

export default function Notifications() {
  const items = useAppSelector((s) => s.notifications.items);
  const dispatch = useAppDispatch();
  const groups = { Unread: items.filter((i) => !i.read), Earlier: items.filter((i) => i.read) };
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        action={
          <Button variant="outline" size="sm" onClick={() => dispatch(markAllRead())}>
            Mark all read
          </Button>
        }
      />
      {Object.entries(groups).map(
        ([label, list]) =>
          list.length > 0 && (
            <div key={label}>
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                {label}
              </h3>
              <Card className="divide-y">
                {list.map((n) => {
                  const Icon = iconFor[n.type];
                  return (
                    <button
                      key={n.id}
                      onClick={() => dispatch(markRead(n.id))}
                      className={cn(
                        "w-full flex items-start gap-3 p-4 text-left hover:bg-muted transition-colors",
                        !n.read && "bg-primary/5",
                      )}
                    >
                      <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground">{n.body}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
                    </button>
                  );
                })}
              </Card>
            </div>
          ),
      )}
    </div>
  );
}
