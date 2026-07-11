import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const topics = [
  { q: "How do I create an account?", a: "Click 'Get started' and sign up with your campus email. We'll verify your batch and role." },
  { q: "How do I request a referral?", a: "Open the Referrals tab, pick a company, and hit 'Request'. The alumnus gets notified." },
  { q: "Can I book a mentor for free?", a: "First session is free. Additional sessions may have a small fee set by each mentor." },
  { q: "How do I change my password?", a: "Settings → Account → Change password." },
  { q: "How do I report inappropriate content?", a: "Every post has a '…' menu with a Report option. Our moderation team reviews within 24h." },
];

export default function Help() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-display font-bold">Help center</h1>
      <p className="mt-3 text-muted-foreground">Quick answers to common questions.</p>
      <Card className="mt-8 p-4">
        <Accordion type="single" collapsible>
          {topics.map((t, i) => (
            <AccordionItem key={t.q} value={String(i)}>
              <AccordionTrigger>{t.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{t.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
