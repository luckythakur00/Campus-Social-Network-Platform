import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ForgotPassword() {
  return (
    <Card className="p-8 border-0 shadow-none">
      <h1 className="text-3xl font-display font-bold">Reset your password</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Enter your email and we'll send a reset link.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Reset link sent!");
        }}
        className="mt-6 space-y-4"
      >
        <Input type="email" placeholder="you@campus.edu" required />
        <Button type="submit" className="w-full gradient-brand text-white border-0">
          Send reset link
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        <Link to="/login" className="text-primary font-medium hover:underline">
          ← Back to sign in
        </Link>
      </p>
    </Card>
  );
}
