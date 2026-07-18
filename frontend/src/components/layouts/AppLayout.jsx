import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  Calendar,
  GraduationCap,
  BookOpen,
  Search,
  Settings,
  Menu,
  Moon,
  Sun,
  Compass,
  UserCircle,
  Sparkles,
  TrendingUp,
  LogOut,
  Shield,
} from "lucide-react";
import { useAppDispatch, useAppSelector, toggleSidebar, toggleTheme, setRole } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trending, users } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const mainNav = [
  { to: "/feed", icon: Home, label: "Feed" },
  { to: "/dashboard", icon: Sparkles, label: "Dashboard" },
  { to: "/connections", icon: Users, label: "Network" },
  { to: "/jobs", icon: Briefcase, label: "Jobs" },
  { to: "/referrals", icon: Compass, label: "Referrals" },
  { to: "/mentorship", icon: GraduationCap, label: "Mentorship" },
  { to: "/communities", icon: Shield, label: "Communities" },
  { to: "/events", icon: Calendar, label: "Events" },
  { to: "/resources", icon: BookOpen, label: "Resources" },
  { to: "/messages", icon: MessageSquare, label: "Messages" },
];

function LeftSidebar() {
  const user = useAppSelector((s) => s.user);
  return (
    <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="p-4">
        <Card className="p-4 border-0 shadow-none bg-sidebar-accent/50">
          <div className="flex items-center gap-3">
            <Avatar className="size-11">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.headline}</p>
            </div>
          </div>
          <Link
            to={`/profile/${user.id}`}
            className="mt-3 block text-xs text-primary font-medium hover:underline"
          >
            View profile →
          </Link>
        </Card>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
        {mainNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )
            }
          >
            <item.icon className="size-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
        <div className="pt-4 mt-4 border-t space-y-0.5">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium",
                isActive ? "bg-primary/10 text-primary" : "hover:bg-sidebar-accent",
              )
            }
          >
            <Settings className="size-4" /> Settings
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium",
                isActive ? "bg-primary/10 text-primary" : "hover:bg-sidebar-accent",
              )
            }
          >
            <BookOpen className="size-4" /> Help
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}

function RightSidebar() {
  const suggestions = users.slice(1, 5);
  return (
    <aside className="hidden xl:block fixed right-0 top-16 bottom-0 w-80 overflow-y-auto p-4 space-y-4">
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="size-4 text-primary" />
          <h3 className="font-display font-semibold text-sm">Trending on campus</h3>
        </div>
        <div className="space-y-2">
          {trending.map((t) => (
            <Link
              key={t}
              to={`/search?q=${encodeURIComponent(t)}`}
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t}
            </Link>
          ))}
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="font-display font-semibold text-sm mb-3">People you may know</h3>
        <div className="space-y-3">
          {suggestions.map((u) => (
            <div key={u.id} className="flex items-center gap-3">
              <Avatar className="size-10 shrink-0">
                <AvatarImage src={u.avatar} />
                <AvatarFallback>{u.name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <Link
                  to={`/profile/${u.id}`}
                  className="text-sm font-medium hover:underline truncate block"
                >
                  {u.name}
                </Link>
                <p className="text-xs text-muted-foreground truncate">{u.headline}</p>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-4 gradient-brand text-white border-0">
        <h3 className="font-display font-semibold">Upgrade to Campus Pro</h3>
        <p className="text-sm text-white/80 mt-1">
          Unlock advanced insights, mentor priority, and more.
        </p>
        <Button
          size="sm"
          variant="secondary"
          className="mt-3 bg-white text-primary hover:bg-white/90"
        >
          Learn more
        </Button>
      </Card>
    </aside>
  );
}

function Topbar() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.mode);
  const user = useAppSelector((s) => s.user);
  const unread = useAppSelector((s) => s.notifications.items.filter((n) => !n.read).length);
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 inset-x-0 h-16 z-40 border-b bg-background/80 backdrop-blur-xl">
      <div className="h-full px-4 flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="p-4">
              <BrandMark />
            </div>
            <nav className="px-2 space-y-0.5">
              {mainNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium",
                      isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )
                  }
                >
                  <item.icon className="size-4" /> {item.label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Menu className="size-5" />
        </Button>
        <Link to="/feed" className="flex items-center gap-2">
          <BrandMark />
        </Link>
        <div className="flex-1 max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search people, jobs, communities…"
            className="pl-9 bg-muted border-0 h-10"
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
            }}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleTheme())}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
        <Link to="/notifications" className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="size-5" />
          </Button>
          {unread > 0 && (
            <Badge className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px]">
              {unread}
            </Badge>
          )}
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-muted rounded-full pr-2 pl-0.5 py-0.5 transition-colors">
              <Avatar className="size-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`/profile/${user.id}`)}>
              <UserCircle className="size-4 mr-2" /> My profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/edit-profile")}>
              Edit profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="size-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Switch role (demo)
            </DropdownMenuLabel>
            {["student", "faculty", "alumni", "placement", "admin"].map((r) => (
              <DropdownMenuItem key={r} onClick={() => dispatch(setRole(r))} className="capitalize">
                {r}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/login")} className="text-destructive">
              <LogOut className="size-4 mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function BrandMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="size-8 rounded-lg gradient-brand flex items-center justify-center text-white shadow-[var(--shadow-glow)]">
        <GraduationCap className="size-4" />
      </div>
      <span className="font-display font-bold text-lg tracking-tight">
        Campus<span className="text-gradient-brand">Connect</span>
      </span>
    </div>
  );
}

function BottomNav() {
  const items = mainNav.slice(0, 5);
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-background/90 backdrop-blur-xl border-t z-40 flex items-center justify-around px-2">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg",
              isActive ? "text-primary" : "text-muted-foreground",
            )
          }
        >
          <item.icon className="size-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <LeftSidebar />
      <main className="pt-16 lg:pl-64 xl:pr-80 pb-20 md:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-3xl mx-auto px-4 py-6"
        >
          <Outlet />
        </motion.div>
      </main>
      <RightSidebar />
      <BottomNav />
    </div>
  );
}
