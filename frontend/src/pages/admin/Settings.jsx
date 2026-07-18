import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader title="System settings" description="Platform-wide configuration." />
      <Card className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Platform name</label>
            <Input defaultValue="Campus Connect — IIT Bombay" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Support email</label>
            <Input defaultValue="support@campus.edu" className="mt-1" />
          </div>
        </div>
        {[
          "Allow public registration",
          "Require faculty approval for community creation",
          "Enable AI content moderation",
          "Send weekly digest emails",
        ].map((l) => (
          <div key={l} className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-sm font-medium">{l}</p>
              <p className="text-xs text-muted-foreground">Applies to all users on the platform.</p>
            </div>
            <Switch defaultChecked />
          </div>
        ))}
        <div className="flex justify-end">
          <Button
            className="gradient-brand text-white border-0"
            onClick={() => toast.success("Settings saved")}
          >
            Save changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
