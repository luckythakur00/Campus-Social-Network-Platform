import { Card } from "@/components/ui/card";

export function StatCard({ label, value, icon: Icon, hint, tone = "primary" }) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    secondary: "bg-secondary/10 text-secondary",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {label}
          </p>
          <p className="text-2xl font-display font-bold mt-1">{value}</p>
          {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
        </div>
        <div className={`size-10 rounded-xl grid place-items-center ${tones[tone]}`}>
          <Icon className="size-5" />
        </div>
      </div>
    </Card>
  );
}

export function PageHeader({ title, description, action }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 mb-6">
      <div className="min-w-0">
        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight truncate">
          {title}
        </h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function EmptyState({ title, description, icon: Icon }) {
  return (
    <div className="text-center py-16 border border-dashed rounded-2xl">
      {Icon && (
        <div className="mx-auto size-12 rounded-2xl bg-muted grid place-items-center mb-3">
          <Icon className="size-6 text-muted-foreground" />
        </div>
      )}
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}
