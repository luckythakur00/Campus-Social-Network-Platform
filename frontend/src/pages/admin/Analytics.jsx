import { PageHeader, StatCard } from "@/components/common";
import { Card } from "@/components/ui/card";
import { analytics } from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Users, Briefcase, MessageSquare } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Platform performance and engagement." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="DAU" value="1,248" icon={Users} hint="+12%" tone="primary" />
        <StatCard
          label="Posts / day"
          value="342"
          icon={MessageSquare}
          hint="+8%"
          tone="secondary"
        />
        <StatCard label="Applications" value="86" icon={Briefcase} hint="+22%" tone="success" />
        <StatCard label="Retention" value="74%" icon={TrendingUp} hint="+3pp" tone="warning" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-display font-semibold mb-3">Views trend</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={analytics.weekly}>
                <defs>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                />
                <Area dataKey="views" stroke="var(--primary)" fill="url(#ag)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="font-display font-semibold mb-3">Connections</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={analytics.weekly}>
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="connections" fill="var(--secondary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5 md:col-span-2">
          <h3 className="font-display font-semibold mb-3">Posts vs. views</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={analytics.weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                />
                <Line dataKey="views" stroke="var(--primary)" strokeWidth={2} />
                <Line dataKey="posts" stroke="var(--secondary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
