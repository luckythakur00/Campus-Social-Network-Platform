import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostCard } from "@/components/cards/PostCard";
import { posts as seedPosts } from "@/lib/mock-data";
import { useAppSelector } from "@/store";
import { Image, Briefcase, Megaphone, Video } from "lucide-react";
import { toast } from "sonner";

export default function Feed() {
  const user = useAppSelector((s) => s.user);
  const [text, setText] = useState("");
  const [posts, setPosts] = useState(seedPosts);

  const submit = () => {
    if (!text.trim()) return;
    setPosts([
      {
        id: `p_${Date.now()}`,
        authorId: user.id,
        content: text,
        time: "now",
        likes: 0,
        comments: 0,
        shares: 0,
      },
      ...posts,
    ]);
    setText("");
    toast.success("Posted to your feed");
  };

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex gap-3">
          <Avatar className="size-11 shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="resize-none border-0 bg-muted focus-visible:ring-1"
              rows={2}
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1">
                <Button size="sm" variant="ghost">
                  <Image className="size-4 mr-1.5 text-primary" />
                  Photo
                </Button>
                <Button size="sm" variant="ghost">
                  <Video className="size-4 mr-1.5 text-secondary" />
                  Video
                </Button>
                <Button size="sm" variant="ghost">
                  <Briefcase className="size-4 mr-1.5 text-success" />
                  Job
                </Button>
                <Button size="sm" variant="ghost">
                  <Megaphone className="size-4 mr-1.5 text-warning" />
                  Announce
                </Button>
              </div>
              <Button size="sm" onClick={submit} className="gradient-brand text-white border-0">
                Post
              </Button>
            </div>
          </div>
        </div>
      </Card>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
