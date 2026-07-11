import { Link } from "react-router-dom";
import { PageHeader } from "@/components/common";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { referrals, findUser } from "@/lib/mock-data";

export default function Referrals() {
  return (
    <div className="space-y-6">
      <PageHeader title="Referrals" description="Warm intros from alumni currently working at these companies." action={<Button className="gradient-brand text-white border-0">Post a referral</Button>} />
      <div className="grid gap-3">
        {referrals.map((r) => {
          const poster = findUser(r.postedBy);
          return (
            <Card key={r.id} className="p-5">
              <div className="flex items-start gap-4">
                <img src={r.logo} alt="" className="size-12 rounded-xl border bg-white p-1" />
                <div className="flex-1 min-w-0">
                  <Link to={`/referrals/${r.id}`} className="font-semibold hover:text-primary block">{r.role}</Link>
                  <p className="text-sm text-muted-foreground">{r.company} · {r.location}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Avatar className="size-6"><AvatarImage src={poster.avatar} /><AvatarFallback>{poster.name[0]}</AvatarFallback></Avatar>
                    <span className="text-xs text-muted-foreground">Referred by <span className="font-medium text-foreground">{poster.name}</span></span>
                    <Badge variant="outline" className="ml-auto">Deadline {r.deadline}</Badge>
                  </div>
                </div>
                <Button size="sm">Request</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
