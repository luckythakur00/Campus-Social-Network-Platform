import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyEmail() {
  const nav = useNavigate();
  const [otp, setOtp] = useState("");
  return (
    <Card className="p-8 border-0 shadow-none">
      <div className="size-14 rounded-2xl bg-primary/10 text-primary grid place-items-center mx-auto">
        <Mail className="size-6" />
      </div>
      <h1 className="text-3xl font-display font-bold text-center mt-4">Verify your email</h1>
      <p className="text-sm text-muted-foreground text-center mt-1">
        We sent a 6-digit code to your inbox.
      </p>
      <div className="mt-6 flex justify-center">
        <InputOTP value={otp} onChange={setOtp} maxLength={6}>
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button
        onClick={() => {
          toast.success("Email verified!");
          nav("/feed");
        }}
        className="w-full mt-6 gradient-brand text-white border-0"
      >
        Verify & continue
      </Button>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Didn't get it?{" "}
        <button
          className="text-primary font-medium hover:underline"
          onClick={() => toast("Code resent")}
        >
          Resend
        </button>
      </p>
    </Card>
  );
}
