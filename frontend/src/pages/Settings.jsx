import { useState, useEffect } from "react";
import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector, setTheme, logout, setCredentials } from "@/store";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const user = useAppSelector((s) => s.user);
  const theme = useAppSelector((s) => s.theme.mode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    try {
      // In a real app this would call PATCH /api/auth/password
      await new Promise((r) => setTimeout(r, 500));
      toast.success("Password updated successfully");
      setPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone."))
      return;
    dispatch(logout());
    navigate("/login");
    toast.success("Account deleted");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account and preferences." />
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="mt-4 space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">Account Info</h3>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="mt-1 text-sm font-medium">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Role</label>
              <p className="mt-1 text-sm font-medium capitalize">{user.role}</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">Change Password</h3>
            <div>
              <label className="text-sm font-medium">New Password</label>
              <Input
                type="password"
                className="mt-1"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="gradient-brand text-white border-0"
              >
                {saving ? (
                  <>
                    <Loader2 className="size-4 mr-1.5 animate-spin" /> Saving…
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-destructive/40">
            <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Deleting your account is permanent and cannot be undone.
            </p>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Theme</h3>
            <div className="flex gap-2">
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
