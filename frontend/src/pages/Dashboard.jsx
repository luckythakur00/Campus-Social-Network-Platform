import { PageHeader, StatCard } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/store";
import { analytics, events, jobs, mentors } from "@/lib/mock-data";
import {
  Bell,
  Briefcase,
  Calendar,
  GraduationCap,
  Users,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = useAppSelector((s) => s.user);
  const notifs = useAppSelector((s) => s.notifications.items);
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user.name.split(" ")[0]} 👋`}
        description="Here's what's happening in your network today."
        action={
          <Button className="gradient-brand text-white border-0">
            <Sparkles className="size-4 mr-2" />
            Quick post
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label="Profile views"
          value="1,284"
          icon={TrendingUp}
          hint="+12% this week"
          tone="primary"
        />
        <StatCard label="Connections" value="342" icon={Users} hint="+8 new" tone="secondary" />
        <StatCard
          label="Applications"
          value="7"
          icon={Briefcase}
          hint="2 in review"
          tone="warning"
        />
        <StatCard
          label="Mentors"
          value="3"
          icon={GraduationCap}
          hint="1 session soon"
          tone="success"
        />
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold">Activity this week</h3>
          <Badge variant="secondary">Last 7 days</Badge>
        </div>
        <div className="h-56">
          <ResponsiveContainer>
            <AreaChart data={analytics.weekly}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                }}
              />
              <Area dataKey="views" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold flex items-center gap-2">
              <Briefcase className="size-4" />
              Latest jobs
            </h3>
            <Link to="/jobs" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {jobs.slice(0, 3).map((j) => (
              <Link
                key={j.id}
                to={`/jobs/${j.id}`}
                className="flex items-center gap-3 -mx-2 px-2 py-2 rounded-lg hover:bg-muted"
              >
                <img src={j.logo} alt="" className="size-9 rounded-lg border bg-white p-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{j.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {j.company} · {j.location}
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold flex items-center gap-2">
              <Calendar className="size-4" />
              Upcoming events
            </h3>
            <Link to="/events" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {events.slice(0, 3).map((e) => (
              <Link
                key={e.id}
                to={`/events/${e.id}`}
                className="flex items-center gap-3 -mx-2 px-2 py-2 rounded-lg hover:bg-muted"
              >
                <div className="size-11 rounded-lg gradient-brand grid place-items-center text-white text-xs font-semibold">
                  {e.date.split(" ")[1].replace(",", "")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{e.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {e.date} · {e.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold flex items-center gap-2">
              <Bell className="size-4" />
              Notifications
            </h3>
            <Link to="/notifications" className="text-xs text-primary hover:underline">
              All
            </Link>
          </div>
          <div className="space-y-3">
            {notifs.slice(0, 3).map((n) => (
              <div key={n.id} className="flex items-start gap-3">
                {!n.read && <div className="size-2 rounded-full bg-primary mt-2 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{n.body}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold flex items-center gap-2">
              <GraduationCap className="size-4" />
              Recommended mentors
            </h3>
            <Link to="/mentorship" className="text-xs text-primary hover:underline">
              Browse
            </Link>
          </div>
          <div className="space-y-3">
            {mentors.slice(0, 3).map((m) => (
              <Link
                key={m.id}
                to={`/mentorship/${m.id}`}
                className="flex items-center gap-3 -mx-2 px-2 py-2 rounded-lg hover:bg-muted"
              >
                <Avatar className="size-10">
                  <AvatarImage src={m.avatar} />
                  <AvatarFallback>{m.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{m.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {m.role} · {m.company}
                  </p>
                </div>
                <Badge variant="outline">★ {m.rating}</Badge>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
