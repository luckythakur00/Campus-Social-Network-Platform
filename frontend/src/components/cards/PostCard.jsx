import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAppSelector } from "@/store";
import { formatDistanceToNow } from "date-fns";

export function PostCard({ post }) {
  // Backend posts use author as an embedded object (populated by Mongoose)
  const author = post.author || {};
  const currentUser = useAppSelector((s) => s.user);

  const [liked, setLiked] = useState(
    Array.isArray(post.likes) && post.likes.includes(currentUser.id),
  );
  const [likeCount, setLikeCount] = useState(
    Array.isArray(post.likes) ? post.likes.length : post.likes || 0,
  );
  const [saved, setSaved] = useState(false);
  
  // Comment state
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [isCommenting, setIsCommenting] = useState(false);

  const toggleLike = async () => {
    try {
      const res = await api.put(`/posts/${post._id}/like`);
      setLiked(!liked);
      setLikeCount(res.likes.length);
    } catch {
      toast.error("Failed to like post");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsCommenting(true);
    try {
      const updatedPost = await api.post(`/posts/${post._id}/comment`, { text: commentText });
      setComments(updatedPost.comments);
      setCommentText("");
      toast.success("Comment added!");
    } catch (err) {
      toast.error("Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };

  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : post.time || "";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-5 mb-4">
        <div className="flex items-start gap-3">
          <Avatar className="size-11 shrink-0">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link
                to={`/profile/${author._id}`}
                className="font-semibold text-sm hover:underline truncate"
              >
                {author.name}
              </Link>
              {post.type === "job" && (
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Job</Badge>
              )}
              {post.type === "announcement" && (
                <Badge className="bg-warning/20 text-warning-foreground">Announcement</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {author.role ? `${author.role}` : ""}
              {author.role && timeAgo ? " · " : ""}
              {timeAgo}
            </p>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>

        <Link to={`/post/${post._id}`} className="block mt-3">
          <p className="text-[15px] leading-relaxed whitespace-pre-line">{post.content}</p>
          {post.image && (
            <img
              src={post.image}
              alt=""
              className="mt-3 rounded-xl border w-full object-cover max-h-96"
            />
          )}
          {post.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span key={t} className="text-xs text-primary">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </Link>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </span>
          <span>
            {comments.length} comments · {post.sharesCount || 0} shares
          </span>
        </div>

        <div className="mt-2 pt-2 border-t grid grid-cols-4 gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLike}
            className={liked ? "text-destructive" : ""}
          >
            <Heart className={`size-4 mr-1.5 ${liked ? "fill-current" : ""}`} /> Like
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowComments(!showComments)}
            className={showComments ? "bg-muted" : ""}
          >
            <MessageCircle className="size-4 mr-1.5" /> Comment
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toast.success("Link copied to clipboard")}
          >
            <Share2 className="size-4 mr-1.5" /> Share
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSaved(!saved)}
            className={saved ? "text-primary" : ""}
          >
            <Bookmark className={`size-4 mr-1.5 ${saved ? "fill-current" : ""}`} /> Save
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t space-y-4">
            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <Avatar className="size-8 shrink-0">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name?.[0]}</AvatarFallback>
              </Avatar>
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-muted border-0 h-8 text-sm"
                disabled={isCommenting}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="h-8 gradient-brand text-white border-0"
                disabled={isCommenting || !commentText.trim()}
              >
                Post
              </Button>
            </form>

            {/* List of Comments */}
            <div className="space-y-3">
              {comments.map((comment, i) => (
                <div key={comment._id || i} className="flex gap-2">
                  <Avatar className="size-8 shrink-0">
                    <AvatarImage src={comment.user?.avatar} />
                    <AvatarFallback>{comment.user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted px-3 py-2 rounded-2xl rounded-tl-sm inline-block max-w-full">
                      <p className="text-xs font-semibold">{comment.user?.name}</p>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                    {comment.createdAt && (
                      <p className="text-[10px] text-muted-foreground mt-1 ml-2">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
