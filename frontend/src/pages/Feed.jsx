import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostCard } from "@/components/cards/PostCard";
import { useAppSelector } from "@/store";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Feed() {
  const user = useAppSelector((s) => s.user);
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  // Fetch all posts from backend on mount
  useEffect(() => {
    api
      .get("/posts")
      .then(setPosts)
      .catch(() => toast.error("Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  const submit = async () => {
    if (!text.trim()) return;
    setPosting(true);
    try {
      const newPost = await api.post("/posts", { content: text });
      setPosts([newPost, ...posts]);
      setText("");
      toast.success("Posted successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to create post");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Composer */}
      <Card className="p-5">
        <div className="flex gap-3">
          <Avatar className="size-11 shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder={`What's on your mind, ${user.name?.split(" ")[0]}?`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="resize-none border-0 bg-muted focus-visible:ring-1"
              rows={2}
            />
            <div className="mt-3 flex items-center justify-end">
              <Button
                size="sm"
                onClick={submit}
                disabled={posting || !text.trim()}
                className="gradient-brand text-white border-0"
              >
                {posting ? (
                  <>
                    <Loader2 className="size-4 mr-1.5 animate-spin" /> Posting…
                  </>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Posts list */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : posts.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">
          No posts yet. Be the first to post!
        </Card>
      ) : (
        posts.map((p) => <PostCard key={p._id} post={p} />)
      )}
    </div>
  );
}
