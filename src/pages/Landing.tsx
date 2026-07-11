import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users, Briefcase, GraduationCap, Calendar, MessageSquare, Sparkles,
  ArrowRight, Check, Star, Zap, Shield, TrendingUp,
} from "lucide-react";

const features = [
  { icon: Users, title: "Unified Network", body: "Students, alumni, faculty, and recruiters in one place." },
  { icon: Briefcase, title: "Curated Jobs", body: "Handpicked roles and warm referrals from alumni." },
  { icon: GraduationCap, title: "1:1 Mentorship", body: "Book sessions with mentors across FAANG, startups, research." },
  { icon: MessageSquare, title: "Realtime Chat", body: "Discord-style channels, DMs, and voice notes." },
  { icon: Calendar, title: "Events & RSVPs", body: "Hackathons, alumni meets, career fairs — all in one calendar." },
  { icon: Sparkles, title: "Smart Feed", body: "Personalized posts, jobs, and opportunities that matter." },
];

const stats = [
  { v: "10k+", l: "Active members" },
  { v: "2.4k", l: "Alumni mentors" },
  { v: "1.8k", l: "Jobs posted" },
  { v: "320+", l: "Campus partners" },
];

const testimonials = [
  { name: "Ananya D.", role: "SWE Intern @ Google", body: "I got my Google internship through a warm referral I found on Campus Connect. The mentorship sessions were a game-changer." },
  { name: "Rohan V.", role: "SDE-2 @ Stripe · Alumni", body: "Giving back to campus is now effortless. I post one referral and meet 20 great candidates." },
  { name: "Dr. Kavita R.", role: "Faculty · ML", body: "The best way I've found to stay connected with my past students and share opportunities with current ones." },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_40%),radial-gradient(circle_at_80%_20%,color-mix(in_oklab,var(--secondary)_20%,transparent),transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4">✨ Now with AI-powered matching</Badge>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.05] tracking-tight">
              Your campus.<br />
              <span className="text-gradient-brand">Connected forever.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              A modern social platform built for universities. Feeds, jobs, referrals, mentorship, events — everything students and alumni need in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild className="gradient-brand text-white border-0 hover:opacity-90 shadow-[var(--shadow-glow)]">
                <Link to="/register">Get started <ArrowRight className="size-4 ml-1" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/feed">Explore the feed</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-display font-bold">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="absolute -inset-8 bg-[var(--gradient-brand)] opacity-20 blur-3xl -z-10" />
            <Card className="p-6 shadow-2xl">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="size-10 rounded-full gradient-brand" />
                <div>
                  <p className="font-semibold text-sm">Priya Menon</p>
                  <p className="text-xs text-muted-foreground">Product Designer · Figma</p>
                </div>
                <Badge className="ml-auto bg-success/20 text-success">Alumni</Badge>
              </div>
              <p className="mt-4 text-sm">Hiring 3 senior designers at Figma. Happy to refer strong candidates from campus 💫</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">Request referral</Button>
                <Button size="sm" variant="outline">Message</Button>
              </div>
            </Card>
            <Card className="p-4 mt-4 ml-8 shadow-xl">
              <div className="flex items-center gap-2 text-sm">
                <div className="size-2 rounded-full bg-success animate-pulse" />
                <span className="font-medium">Rohan is online</span>
                <span className="text-muted-foreground ml-auto text-xs">Just now</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">"Loved your capstone demo — let's chat!"</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="mb-3">Platform</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Everything your campus needs</h2>
          <p className="mt-3 text-muted-foreground">One product replacing 10 group chats, spreadsheets, and lost email threads.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="p-6 h-full hover:shadow-[var(--shadow-soft)] transition-shadow">
                <div className="size-11 rounded-xl gradient-brand grid place-items-center text-white mb-4">
                  <f.icon className="size-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.body}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Loved across campus</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-warning text-warning" />)}</div>
                <p className="mt-3 text-sm">{t.body}</p>
                <div className="mt-4 pt-4 border-t">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-center text-sm text-muted-foreground mb-8">Trusted by leading universities and companies</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {["IIT Bombay", "IIIT Hyderabad", "BITS Pilani", "NIT Trichy", "Ashoka", "Stripe", "Figma", "Google"].map((p) => (
            <span key={p} className="font-display font-semibold text-lg text-muted-foreground">{p}</span>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Simple pricing</h2>
          <p className="mt-3 text-muted-foreground">Free for students & alumni. Institutions pay per seat.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "Student", price: "Free", features: ["Full feed & messaging", "Apply to jobs & referrals", "Book mentorship"] },
            { name: "Pro", price: "₹299/mo", popular: true, features: ["Everything in Student", "Priority mentor slots", "Advanced analytics", "Custom profile theme"] },
            { name: "Institution", price: "Custom", features: ["Admin & analytics dashboard", "SSO & custom branding", "Placement office tools", "Dedicated support"] },
          ].map((p) => (
            <Card key={p.name} className={`p-6 ${p.popular ? "border-primary shadow-[var(--shadow-glow)]" : ""}`}>
              {p.popular && <Badge className="mb-3">Most popular</Badge>}
              <h3 className="font-display font-bold text-xl">{p.name}</h3>
              <p className="text-3xl font-display font-bold mt-2">{p.price}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f) => <li key={f} className="flex items-start gap-2"><Check className="size-4 text-success mt-0.5 shrink-0" />{f}</li>)}
              </ul>
              <Button className="w-full mt-6" variant={p.popular ? "default" : "outline"}>Get started</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10">Frequently asked</h2>
        <div className="space-y-3">
          {[
            { q: "Is Campus Connect free for students?", a: "Yes — every student and alumnus gets full access. Institutions pay per seat for admin & analytics." },
            { q: "How is this different from LinkedIn?", a: "It's built around your specific campus — verified members only, warm referrals, mentorship booking, and student-first UX." },
            { q: "Can faculty post announcements?", a: "Yes. Faculty accounts can broadcast announcements to their courses and manage communities." },
            { q: "Do you support single sign-on?", a: "Yes, via SAML/Google Workspace for institutional plans." },
          ].map((f) => (
            <Card key={f.q} className="p-5">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Card className="gradient-brand text-white border-0 p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%),radial-gradient(circle_at_70%_80%,white,transparent_50%)]" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-display font-bold">Ready to reconnect your campus?</h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">Join thousands of students and alumni already building their futures together.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
                <Link to="/register">Create free account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-white/30 text-white hover:bg-white/10">
                <Link to="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
