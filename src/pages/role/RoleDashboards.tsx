import { PageHeader, StatCard } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Role } from "@/store";
import { BookOpen, Briefcase, GraduationCap, Users, TrendingUp, ClipboardList, Megaphone, Shield, DollarSign } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { analytics } from "@/lib/mock-data";

const roleConfig: Record<Role, { title: string; desc: string; stats: any[] }> = {
  student: {
    title: "Student Dashboard",
    desc: "Your applications, courses, and campus opportunities.",
    stats: [
      { label: "Applications", value: 7, icon: Briefcase, tone: "primary" },
      { label: "Courses", value: 5, icon: BookOpen, tone: "secondary" },
      { label: "Mentors", value: 3, icon: GraduationCap, tone: "success" },
      { label: "Communities", value: 4, icon: Users, tone: "warning" },
    ],
  },
  faculty: {
    title: "Faculty Dashboard",
    desc: "Manage courses, announcements, and student progress.",
    stats: [
      { label: "Students", value: 342, icon: Users, tone: "primary" },
      { label: "Courses", value: 3, icon: BookOpen, tone: "secondary" },
      { label: "Announcements", value: 12, icon: Megaphone, tone: "warning" },
      { label: "Events managed", value: 4, icon: ClipboardList, tone: "success" },
    ],
  },
  alumni: {
    title: "Alumni Dashboard",
    desc: "Your mentees, referrals, and campus impact.",
    stats: [
      { label: "Mentees", value: 6, icon: GraduationCap, tone: "primary" },
      { label: "Referrals posted", value: 12, icon: Briefcase, tone: "secondary" },
      { label: "Jobs posted", value: 3, icon: TrendingUp, tone: "success" },
      { label: "Sessions", value: 48, icon: Users, tone: "warning" },
    ],
  },
  placement: {
    title: "Placement Office",
    desc: "Track jobs, applications, and placement metrics.",
    stats: [
      { label: "Open jobs", value: 82, icon: Briefcase, tone: "primary" },
      { label: "Applicants", value: 1240, icon: Users, tone: "secondary" },
      { label: "Offers", value: 214, icon: DollarSign, tone: "success" },
      { label: "Companies", value: 46, icon: TrendingUp, tone: "warning" },
    ],
  },
  admin: {
    title: "Admin Dashboard",
    desc: "Platform health, users, and moderation.",
    stats: [
      { label: "Total users", value: "7.5k", icon: Users, tone: "primary" },
      { label: "Active today", value: "1.2k", icon: TrendingUp, tone: "success" },
      { label: "Reports open", value: 8, icon: Shield, tone: "warning" },
      { label: "Communities", value: 42, icon: Users, tone: "secondary" },
    ],
  },
};

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

export default function RoleDashboards({ role }: { role: Role }) {
  const cfg = roleConfig[role];
  return (
    <div className="space-y-6">
      <PageHeader title={cfg.title} description={cfg.desc} action={<Badge className="capitalize">{role}</Badge>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cfg.stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-display font-semibold mb-3">Weekly activity</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={analytics.weekly}>
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="connections" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="font-display font-semibold mb-3">Community makeup</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={analytics.distribution} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {analytics.distribution.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            {analytics.distribution.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ background: CHART_COLORS[i] }} />{d.name} · {d.value}</div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
