import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Github } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/store";
import { setCredentials } from "@/store";
import { api } from "@/lib/api";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export default function Login() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const result = await api.post("/auth/login", data);
      dispatch(setCredentials(result));
      toast.success(`Welcome back, ${result.name}!`);
      nav("/feed");
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
    }
  };
  return (
    <Card className="p-8 border-0 shadow-none">
      <h1 className="text-3xl font-display font-bold">Welcome back</h1>
      <p className="text-sm text-muted-foreground mt-1">Sign in to your Campus Connect account</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              {...register("email")}
              type="email"
              placeholder="you@campus.edu"
              className="pl-9"
            />
          </div>
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Password</label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="pl-9"
            />
          </div>
          {errors.password && (
            <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full gradient-brand text-white border-0"
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>
      <div className="space-y-2">
        <Button variant="outline" className="w-full">
          <svg className="size-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a11 11 0 0 0 0 9.87l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
            />
          </svg>
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full">
          <Github className="size-4 mr-2" />
          Continue with GitHub
        </Button>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-6">
        New here?{" "}
        <Link to="/register" className="text-primary font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </Card>
  );
}
