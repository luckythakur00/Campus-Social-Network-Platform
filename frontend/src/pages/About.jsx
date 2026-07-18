import { Card } from "@/components/ui/card";
import { Zap, Shield, Users, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-display font-bold">About Campus Connect</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        We're building the social layer for higher education — a place where students, faculty, and
        alumni actually stay connected.
      </p>
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        {[
          {
            icon: Zap,
            title: "Our mission",
            body: "Make campus opportunities accessible to every student, regardless of background.",
          },
          {
            icon: Shield,
            title: "Verified network",
            body: "Every profile is tied to a real campus identity. No spam, no bots.",
          },
          {
            icon: Users,
            title: "Alumni-powered",
            body: "We turn passive alumni networks into active mentorship and referral engines.",
          },
          {
            icon: Sparkles,
            title: "Built for 2026",
            body: "Modern, fast, mobile-first, and delightful to use every day.",
          },
        ].map((f) => (
          <Card key={f.title} className="p-6">
            <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3">
              <f.icon className="size-5" />
            </div>
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{f.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
