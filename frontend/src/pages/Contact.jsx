import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-4xl font-display font-bold">Get in touch</h1>
        <p className="mt-3 text-muted-foreground">
          Questions about partnerships, pricing, or careers? We reply within a day.
        </p>
        <div className="mt-8 space-y-4">
          {[
            { icon: Mail, label: "hello@campusconnect.app" },
            { icon: Phone, label: "+91 80 4567 8901" },
            { icon: MapPin, label: "Bangalore, India" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
                <c.icon className="size-4" />
              </div>
              <span className="text-sm">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
      <Card className="p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent — we'll reply soon.");
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">First name</label>
              <Input className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Last name</label>
              <Input className="mt-1" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <Textarea rows={5} className="mt-1" />
          </div>
          <Button className="w-full gradient-brand text-white border-0">Send message</Button>
        </form>
      </Card>
    </div>
  );
}
