import { useSearchParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/common";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search as SearchIcon } from "lucide-react";
import { users, jobs, communities, mentors, posts } from "@/lib/mock-data";
import { PostCard } from "@/components/cards/PostCard";
import { JobCard } from "@/components/cards/JobCard";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const match = (s) => s.toLowerCase().includes(q.toLowerCase());
  return (
    <div className="space-y-6">
      <PageHeader
        title="Search"
        description={q ? `Results for "${q}"` : "Find anything on campus."}
      />
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setParams({ q: e.target.value })}
          placeholder="Search…"
          className="pl-9"
        />
      </div>
      <Tabs defaultValue="people">
        <TabsList>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
        </TabsList>
        <TabsContent value="people" className="mt-4 space-y-2">
          {users
            .filter((u) => !q || match(u.name) || match(u.headline))
            .map((u) => (
              <Card key={u.id} className="p-3 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={u.avatar} />
                  <AvatarFallback>{u.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/profile/${u.id}`}
                    className="text-sm font-medium hover:underline block truncate"
                  >
                    {u.name}
                  </Link>
                  <p className="text-xs text-muted-foreground truncate">{u.headline}</p>
                </div>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="posts" className="mt-4 space-y-3">
          {posts
            .filter((p) => !q || match(p.content))
            .map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
        </TabsContent>
        <TabsContent value="jobs" className="mt-4 space-y-3">
          {jobs
            .filter((j) => !q || match(j.title) || match(j.company))
            .map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
        </TabsContent>
        <TabsContent value="communities" className="mt-4 grid sm:grid-cols-2 gap-3">
          {communities
            .filter((c) => !q || match(c.name))
            .map((c) => (
              <Link key={c.id} to={`/community/${c.id}`}>
                <Card className="p-4 hover:bg-muted transition-colors">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.members} members</p>
                </Card>
              </Link>
            ))}
        </TabsContent>
        <TabsContent value="mentors" className="mt-4 grid sm:grid-cols-2 gap-3">
          {mentors
            .filter((m) => !q || match(m.name) || match(m.company))
            .map((m) => (
              <Link key={m.id} to={`/mentorship/${m.id}`}>
                <Card className="p-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={m.avatar} />
                    <AvatarFallback>{m.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.role} · {m.company}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
