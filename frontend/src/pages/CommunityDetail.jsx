import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/cards/PostCard";
import { communities, posts, users } from "@/lib/mock-data";
import { Users, FileText, BarChart3, MessageSquare } from "lucide-react";

export default function CommunityDetail({ tab = "posts" }) {
  const { id } = useParams();
  const c = communities.find((x) => x.id === id) ?? communities[0];
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden p-0">
        <div className="h-48 overflow-hidden">
          <img src={c.cover} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <Badge variant="secondary" className="mb-2">
                {c.category}
              </Badge>
              <h1 className="text-2xl font-display font-bold">{c.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Users className="size-3" />
                {c.members.toLocaleString()} members
              </p>
            </div>
            <Button className="gradient-brand text-white border-0">Join community</Button>
          </div>
        </div>
      </Card>
      <Tabs defaultValue={tab}>
        <TabsList>
          <TabsTrigger value="posts">
            <FileText className="size-3.5 mr-1.5" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="discussion">
            <MessageSquare className="size-3.5 mr-1.5" />
            Discussion
          </TabsTrigger>
          <TabsTrigger value="members">
            <Users className="size-3.5 mr-1.5" />
            Members
          </TabsTrigger>
          <TabsTrigger value="polls">
            <BarChart3 className="size-3.5 mr-1.5" />
            Polls
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-4 space-y-4">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </TabsContent>
        <TabsContent value="discussion" className="mt-4">
          <Card className="p-6 text-center text-muted-foreground text-sm">
            Discussion threads coming soon…
          </Card>
        </TabsContent>
        <TabsContent value="members" className="mt-4">
          <div className="grid sm:grid-cols-2 gap-3">
            {users.map((u) => (
              <Card key={u.id} className="p-3 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={u.avatar} />
                  <AvatarFallback>{u.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.headline}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="polls" className="mt-4">
          <Card className="p-5">
            <h3 className="font-semibold">Best time for weekly meetups?</h3>
            <div className="mt-3 space-y-2">
              {[
                { l: "Weekdays 6pm", v: 62 },
                { l: "Saturdays 10am", v: 24 },
                { l: "Sundays 4pm", v: 14 },
              ].map((o) => (
                <div key={o.l}>
                  <div className="flex justify-between text-sm">
                    <span>{o.l}</span>
                    <span className="text-muted-foreground">{o.v}%</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full gradient-brand" style={{ width: `${o.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
