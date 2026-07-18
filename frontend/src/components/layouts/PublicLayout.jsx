import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { BrandMark } from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector, toggleTheme } from "@/store";
import { Moon, Sun, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/help", label: "Help" },
];

export function PublicLayout() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.theme.mode);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/">
            <BrandMark />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => dispatch(toggleTheme())}>
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="hidden sm:inline-flex"
            >
              Sign in
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="gradient-brand text-white border-0 hover:opacity-90"
            >
              Get started
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="mt-8 space-y-1">
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className="block px-3 py-2 rounded-lg hover:bg-muted"
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <BrandMark />
            <p className="text-sm text-muted-foreground mt-3 max-w-sm">
              The all-in-one platform for students, faculty, and alumni to connect, learn, and grow
              together.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/feed" className="hover:text-foreground">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-foreground">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="hover:text-foreground">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-foreground">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-foreground">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">
          © 2026 Campus Connect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
