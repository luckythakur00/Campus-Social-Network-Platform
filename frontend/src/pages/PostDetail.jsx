import { useParams, Link } from "react-router-dom";
import { PostCard } from "@/components/cards/PostCard";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { posts, findUser } from "@/lib/mock-data";
import { useAppSelector } from "@/store";

export default function PostDetail() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id) ?? posts[0];
  const user = useAppSelector((s) => s.user);
  return (
    <div className="space-y-4">
      <Link to="/feed" className="text-sm text-primary hover:underline">
        ← Back to feed
      </Link>
      <PostCard post={post} />
      <Card className="p-5">
        <h3 className="font-semibold mb-3">{post.comments} Comments</h3>
        <div className="flex gap-3 mb-4">
          <Avatar className="size-9">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea placeholder="Add a comment…" rows={2} className="bg-muted border-0" />
            <div className="text-right mt-2">
              <Button size="sm">Comment</Button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {[2, 3, 6].map((i) => {
            const u = findUser(`u_${i}`);
            return (
              <div key={i} className="flex gap-3">
                <Avatar className="size-9">
                  <AvatarImage src={u.avatar} />
                  <AvatarFallback>{u.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-2xl px-4 py-2">
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-sm mt-0.5">
                      Great post — resonates a lot with what we're building!
                    </p>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground flex gap-3 px-2">
                    <button className="hover:text-foreground">Like</button>
                    <button className="hover:text-foreground">Reply</button>
                    <span>1h</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
