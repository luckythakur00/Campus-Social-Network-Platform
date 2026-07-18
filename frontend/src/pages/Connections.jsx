import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";

export default function Connections({ tab = "connections" }) {
  const nav = useNavigate();
  const list = users;
  return (
    <div className="space-y-6">
      <PageHeader
        title="Your network"
        description="Manage your connections, followers, and who you follow."
      />
      <Tabs value={tab} onValueChange={(v) => nav(`/${v}`)}>
        <TabsList>
          <TabsTrigger value="connections">Connections · 342</TabsTrigger>
          <TabsTrigger value="followers">Followers · 1.2k</TabsTrigger>
          <TabsTrigger value="following">Following · 218</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid sm:grid-cols-2 gap-3">
        {list.map((u) => (
          <Card key={u.id} className="p-4 flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={u.avatar} />
              <AvatarFallback>{u.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <Link
                to={`/profile/${u.id}`}
                className="text-sm font-semibold hover:underline block truncate"
              >
                {u.name}
              </Link>
              <p className="text-xs text-muted-foreground truncate">{u.headline}</p>
            </div>
            <Button size="sm" variant={tab === "following" ? "outline" : "default"}>
              {tab === "following" ? "Following" : tab === "followers" ? "Follow back" : "Message"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
