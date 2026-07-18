import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/common";
import { useAppSelector, useAppDispatch, updateProfile } from "@/store";
import { toast } from "sonner";
import { useState } from "react";

export default function EditProfile() {
  const user = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ name: user.name, headline: user.headline, email: user.email });
  return (
    <div className="space-y-6">
      <PageHeader title="Edit profile" description="Keep your info up to date." />
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">
              Change photo
            </Button>
            <p className="text-xs text-muted-foreground mt-1">PNG or JPG, up to 4MB</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Full name</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Headline</label>
            <Input
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea rows={4} className="mt-1" placeholder="Tell your campus about yourself…" />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button
            className="gradient-brand text-white border-0"
            onClick={() => {
              dispatch(updateProfile(form));
              toast.success("Profile updated");
            }}
          >
            Save changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
