import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector, setTheme } from "@/store";
import { toast } from "sonner";

export default function Settings() {
  const theme = useAppSelector((s) => s.theme.mode);
  const dispatch = useAppDispatch();
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account, privacy, and preferences." />
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-4 space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input className="mt-1" defaultValue="aarav@campus.edu" />
            </div>
            <div>
              <label className="text-sm font-medium">Change password</label>
              <Input type="password" className="mt-1" placeholder="New password" />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => toast.success("Saved")}
                className="gradient-brand text-white border-0"
              >
                Save
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="privacy" className="mt-4 space-y-3">
          {[
            "Show my profile in campus search",
            "Allow alumni to message me directly",
            "Let recruiters see my resume",
          ].map((l) => (
            <Card key={l} className="p-4 flex items-center justify-between">
              <span className="text-sm">{l}</span>
              <Switch defaultChecked />
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="notifications" className="mt-4 space-y-3">
          {["Email digest", "Push notifications", "Job matches", "Mentor requests"].map((l) => (
            <Card key={l} className="p-4 flex items-center justify-between">
              <span className="text-sm">{l}</span>
              <Switch defaultChecked />
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="appearance" className="mt-4">
          <Card className="p-6">
            <label className="text-sm font-medium">Theme</label>
            <div className="mt-2 flex gap-2">
              {["light", "dark"].map((t) => (
                <Button
                  key={t}
                  variant={theme === t ? "default" : "outline"}
                  onClick={() => dispatch(setTheme(t))}
                  className="capitalize"
                >
                  {t}
                </Button>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
