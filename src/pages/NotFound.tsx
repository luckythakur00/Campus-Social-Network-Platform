import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="text-center">
        <div className="text-8xl font-display font-bold text-gradient-brand">404</div>
        <h1 className="mt-4 text-2xl font-semibold">This page doesn't exist</h1>
        <p className="mt-2 text-muted-foreground">The link may be broken or the page was moved.</p>
        <Button asChild className="mt-6"><Link to="/">Back to home</Link></Button>
      </div>
    </div>
  );
}
