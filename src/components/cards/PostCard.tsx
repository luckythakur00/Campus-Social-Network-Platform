import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { Post } from "@/lib/mock-data";
import { findUser } from "@/lib/mock-data";
import { useState } from "react";
import { toast } from "sonner";

export function PostCard({ post }: { post: Post }) {
  const author = findUser(post.authorId);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-5">
        <div className="flex items-start gap-3">
          <Avatar className="size-11 shrink-0">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link to={`/profile/${author.id}`} className="font-semibold text-sm hover:underline truncate">{author.name}</Link>
              {post.type === "job" && <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Job</Badge>}
              {post.type === "announcement" && <Badge className="bg-warning/20 text-warning-foreground">Announcement</Badge>}
            </div>
            <p className="text-xs text-muted-foreground truncate">{author.headline} · {post.time}</p>
          </div>
          <Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button>
        </div>
        <Link to={`/post/${post.id}`} className="block mt-3">
          <p className="text-[15px] leading-relaxed whitespace-pre-line">{post.content}</p>
          {post.image && <img src={post.image} alt="" className="mt-3 rounded-xl border w-full object-cover max-h-96" />}
          {post.tags && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((t) => <span key={t} className="text-xs text-primary">#{t}</span>)}
            </div>
          )}
        </Link>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.likes + (liked ? 1 : 0)} likes</span>
          <span>{post.comments} comments · {post.shares} shares</span>
        </div>
        <div className="mt-2 pt-2 border-t grid grid-cols-4 gap-1">
          <Button variant="ghost" size="sm" onClick={() => setLiked(!liked)} className={liked ? "text-destructive" : ""}>
            <Heart className={`size-4 mr-1.5 ${liked ? "fill-current" : ""}`} /> Like
          </Button>
          <Button variant="ghost" size="sm"><MessageCircle className="size-4 mr-1.5" /> Comment</Button>
          <Button variant="ghost" size="sm" onClick={() => toast.success("Link copied to clipboard")}><Share2 className="size-4 mr-1.5" /> Share</Button>
          <Button variant="ghost" size="sm" onClick={() => setSaved(!saved)} className={saved ? "text-primary" : ""}>
            <Bookmark className={`size-4 mr-1.5 ${saved ? "fill-current" : ""}`} /> Save
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
