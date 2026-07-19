import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/cards/PostCard";
import { useAppSelector } from "@/store";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Globe,
  Award,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const { id } = useParams();
  const currentUser = useAppSelector((s) => s.user);

  // If viewing own profile (id matches logged-in user), use Redux data for accuracy
  const isOwnProfile = id === currentUser.id || id === currentUser._id;
  const u = isOwnProfile
    ? { ...currentUser, _id: currentUser.id }
    : { name: "", avatar: "", role: "", headline: "", _id: id };

  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  useEffect(() => {
    setLoadingPosts(true);
    api
      .get("/posts")
      .then((all) => {
        // Filter posts authored by this user
        const filtered = all.filter(
          (p) => p.author?._id === id || p.author?._id === currentUser.id,
        );
        setUserPosts(filtered);
      })
      .catch(() => toast.error("Failed to load posts"))
      .finally(() => setLoadingPosts(false));
  }, [id]);

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden p-0">
        <div className="h-40 md:h-56 gradient-brand relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_50%)]" />
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-wrap items-end justify-between gap-4 -mt-12">
            <Avatar className="size-28 border-4 border-card">
              <AvatarImage src={u.avatar} />
              <AvatarFallback>{u.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Button variant="outline">
                <MessageSquare className="size-4 mr-1.5" />
                Message
              </Button>
              <Button className="gradient-brand text-white border-0">Connect</Button>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-display font-bold">{u.name}</h1>
            <p className="text-muted-foreground">{u.headline}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                Bangalore, India
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="size-3" />
                {u.company || "—"}
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="size-3" />
                Batch of {u.batch || "2020"}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <Badge variant="secondary" className="capitalize">
                {u.role}
              </Badge>
              <Badge variant="outline">342 connections</Badge>
              <Badge variant="outline">1.2k followers</Badge>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="about">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="space-y-4 mt-4">
          <Card className="p-5">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-muted-foreground">
              Passionate about building products that matter. Currently working on modern web
              experiences, previously interned at Stripe & Google.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                "React",
                "TypeScript",
                "Node.js",
                "System Design",
                "Product",
                "UI/UX",
                "GraphQL",
                "PostgreSQL",
              ].map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </Card>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-5">
              <h3 className="font-semibold mb-3">Achievements</h3>
              <ul className="space-y-2 text-sm">
                {["GSoC 2025 · Kubernetes", "ICPC Regionals — 2nd", "SIH 2024 Winner"].map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <Award className="size-4 text-warning" />
                    {a}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-5">
              <h3 className="font-semibold mb-3">Links</h3>
              <div className="space-y-2 text-sm">
                <a
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                  href="#"
                >
                  <Github className="size-4" />
                  github.com/aarav
                </a>
                <a
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                  href="#"
                >
                  <Linkedin className="size-4" />
                  linkedin.com/in/aarav
                </a>
                <a
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                  href="#"
                >
                  <Globe className="size-4" />
                  aarav.dev
                </a>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="posts" className="mt-4 space-y-4">
          {loadingPosts ? (
            <div className="flex justify-center py-8">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : userPosts.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">No posts yet.</Card>
          ) : (
            userPosts.map((p) => <PostCard key={p._id} post={p} />)
          )}
        </TabsContent>
        <TabsContent value="experience" className="mt-4">
          <Card className="p-5 space-y-4">
            {[
              { r: "SWE Intern", c: "Stripe", d: "May 2025 – Aug 2025" },
              { r: "Open Source Contributor", c: "Kubernetes", d: "2024 – Present" },
              { r: "Design Lead", c: "Campus Design Guild", d: "2023 – 2024" },
            ].map((x) => (
              <div key={x.r} className="flex gap-3">
                <div className="size-10 rounded-lg bg-muted grid place-items-center">
                  <Briefcase className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{x.r}</p>
                  <p className="text-sm text-muted-foreground">
                    {x.c} · {x.d}
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>
        <TabsContent value="connections" className="mt-4">
          <Card className="p-8 text-center text-muted-foreground">Connections coming soon.</Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
