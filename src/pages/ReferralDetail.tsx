import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Check, Clock } from "lucide-react";
import { referrals, findUser } from "@/lib/mock-data";
import { toast } from "sonner";

export default function ReferralDetail() {
  const { id } = useParams();
  const r = referrals.find((x) => x.id === id) ?? referrals[0];
  const poster = findUser(r.postedBy);
  const timeline = [
    { label: "Application submitted", done: true, time: "Feb 12" },
    { label: "Resume shared with alumnus", done: true, time: "Feb 13" },
    { label: "Under review", done: false, time: "In progress" },
    { label: "Interview scheduled", done: false, time: "—" },
  ];
  return (
    <div className="space-y-4">
      <Link to="/referrals" className="text-sm text-primary hover:underline">← All referrals</Link>
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <img src={r.logo} alt="" className="size-14 rounded-xl border bg-white p-1" />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-display font-bold">{r.role}</h1>
            <p className="text-muted-foreground">{r.company} · {r.location}</p>
            <Badge className="mt-2">Deadline {r.deadline}</Badge>
          </div>
        </div>
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="font-semibold mb-3">Referred by</h3>
          <div className="flex items-center gap-3">
            <Avatar className="size-12"><AvatarImage src={poster.avatar} /><AvatarFallback>{poster.name[0]}</AvatarFallback></Avatar>
            <div><p className="font-medium">{poster.name}</p><p className="text-xs text-muted-foreground">{poster.headline}</p></div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">Message {poster.name.split(" ")[0]}</Button>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold mb-3">Upload your resume</h3>
          <div className="border-2 border-dashed rounded-xl p-6 text-center">
            <Upload className="size-6 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm">Drop your PDF here or <button className="text-primary font-medium hover:underline">browse</button></p>
            <p className="text-xs text-muted-foreground mt-1">Max 4MB · PDF only</p>
          </div>
          <Button className="w-full mt-3 gradient-brand text-white border-0" onClick={() => toast.success("Referral requested!")}>Submit referral request</Button>
        </Card>
      </div>
      <Card className="p-5">
        <h3 className="font-semibold mb-4">Status timeline</h3>
        <ol className="space-y-4">
          {timeline.map((t, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className={`size-8 rounded-full grid place-items-center shrink-0 ${t.done ? "bg-success text-success-foreground" : "bg-muted"}`}>
                {t.done ? <Check className="size-4" /> : <Clock className="size-4" />}
              </div>
              <div className="flex-1"><p className="text-sm font-medium">{t.label}</p><p className="text-xs text-muted-foreground">{t.time}</p></div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
