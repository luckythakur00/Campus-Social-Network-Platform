import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { conversations, findUser } from "@/lib/mock-data";
import { Search, Phone, Video, Send, Smile, Paperclip, Mic } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Messages() {
  const { conversationId } = useParams();
  const active = conversations.find((c) => c.id === conversationId) ?? conversations[0];
  const partner = findUser(active.userId);
  const [msg, setMsg] = useState("");
  return (
    <div className="-mt-6 -mx-4 md:mx-0 md:mt-0 md:h-[calc(100vh-8rem)]">
      <Card className="h-[calc(100vh-8rem)] md:h-full overflow-hidden p-0 flex">
        <aside className="w-72 border-r hidden md:flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search chats" className="pl-9 bg-muted border-0" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => {
              const u = findUser(c.userId);
              return (
                <Link
                  key={c.id}
                  to={`/messages/${c.id}`}
                  className={cn(
                    "flex items-center gap-3 p-3 hover:bg-muted transition-colors",
                    c.id === active.id && "bg-muted",
                  )}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={u.avatar} />
                      <AvatarFallback>{u.name[0]}</AvatarFallback>
                    </Avatar>
                    {c.online && (
                      <span className="absolute bottom-0 right-0 size-3 rounded-full bg-success border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">{u.name}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="size-5 rounded-full bg-primary text-primary-foreground text-[10px] grid place-items-center font-semibold">
                      {c.unread}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar>
                <AvatarImage src={partner.avatar} />
                <AvatarFallback>{partner.name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{partner.name}</p>
                <p className="text-xs text-success">● Online</p>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon">
                <Phone className="size-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {active.messages.map((m) => (
              <div key={m.id} className={cn("flex", m.mine ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                    m.mine
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border rounded-bl-sm",
                  )}
                >
                  {m.text}
                  <div
                    className={cn(
                      "text-[10px] mt-1",
                      m.mine ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex gap-1">
                <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce" />
                <span
                  className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
              {partner.name.split(" ")[0]} is typing…
            </div>
          </div>

          <div className="p-3 border-t flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Smile className="size-4" />
            </Button>
            <Input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type a message"
              className="bg-muted border-0"
            />
            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
            </Button>
            <Button size="icon" className="gradient-brand text-white border-0">
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
