export interface MockUser {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  role: "student" | "faculty" | "alumni" | "placement" | "admin";
  batch?: string;
  company?: string;
}

export const users: MockUser[] = [
  { id: "u_1", name: "Aarav Sharma", avatar: "https://i.pravatar.cc/150?img=13", headline: "CS Undergrad · Full-stack dev", role: "student", batch: "2026" },
  { id: "u_2", name: "Priya Menon", avatar: "https://i.pravatar.cc/150?img=47", headline: "Product Designer @ Figma", role: "alumni", batch: "2019", company: "Figma" },
  { id: "u_3", name: "Rohan Verma", avatar: "https://i.pravatar.cc/150?img=15", headline: "SDE-2 @ Stripe · Mentor", role: "alumni", batch: "2020", company: "Stripe" },
  { id: "u_4", name: "Dr. Kavita Rao", avatar: "https://i.pravatar.cc/150?img=32", headline: "Professor · Machine Learning", role: "faculty" },
  { id: "u_5", name: "Ishaan Gupta", avatar: "https://i.pravatar.cc/150?img=68", headline: "Placement Officer", role: "placement" },
  { id: "u_6", name: "Sneha Patel", avatar: "https://i.pravatar.cc/150?img=45", headline: "ML Enthusiast · GSoC'25", role: "student", batch: "2027" },
  { id: "u_7", name: "Vikram Iyer", avatar: "https://i.pravatar.cc/150?img=52", headline: "Founder @ Nimbus AI", role: "alumni", batch: "2015", company: "Nimbus AI" },
  { id: "u_8", name: "Ananya Das", avatar: "https://i.pravatar.cc/150?img=44", headline: "SWE Intern @ Google", role: "student", batch: "2026" },
];

export interface Post {
  id: string;
  authorId: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  image?: string;
  tags?: string[];
  type?: "text" | "job" | "announcement";
}

export const posts: Post[] = [
  { id: "p1", authorId: "u_2", content: "Just shipped a redesign of our onboarding flow — cut time-to-first-action by 42%. Ping me if you want to chat about design systems!", time: "2h", likes: 128, comments: 24, shares: 6, tags: ["design", "product"] },
  { id: "p2", authorId: "u_3", content: "We're hiring 3 senior frontend engineers at Stripe. Happy to refer strong candidates from campus — drop your resume in DMs.", time: "5h", likes: 342, comments: 87, shares: 41, type: "job", tags: ["hiring", "referral"] },
  { id: "p3", authorId: "u_4", content: "Reminder: ML Capstone project proposals are due next Friday. Office hours Wed 3–5pm.", time: "1d", likes: 56, comments: 12, shares: 3, type: "announcement" },
  { id: "p4", authorId: "u_6", content: "GSoC results are out and I got in! Working on Kubernetes scheduler improvements this summer 🚀", time: "1d", likes: 894, comments: 156, shares: 88, tags: ["gsoc", "opensource"] },
  { id: "p5", authorId: "u_7", content: "Nimbus AI just closed our Series A. Grateful for the campus community that helped us get here. AMA below.", time: "2d", likes: 1204, comments: 210, shares: 145, tags: ["startup"] },
];

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Internship" | "Contract";
  salary: string;
  logo: string;
  posted: string;
  tags: string[];
  description: string;
}

export const jobs: Job[] = [
  { id: "j1", title: "Senior Frontend Engineer", company: "Stripe", location: "Bangalore · Hybrid", type: "Full-time", salary: "₹45–70 LPA", logo: "https://logo.clearbit.com/stripe.com", posted: "2d ago", tags: ["React", "TypeScript", "Design Systems"], description: "Build the next generation of Stripe's dashboard experience." },
  { id: "j2", title: "SDE Intern", company: "Google", location: "Hyderabad", type: "Internship", salary: "₹1.2 L/mo", logo: "https://logo.clearbit.com/google.com", posted: "1d ago", tags: ["Go", "Distributed Systems"], description: "12-week summer internship on the GCP team." },
  { id: "j3", title: "ML Research Engineer", company: "OpenAI", location: "Remote", type: "Full-time", salary: "$180k–$240k", logo: "https://logo.clearbit.com/openai.com", posted: "4h ago", tags: ["PyTorch", "LLMs", "Research"], description: "Work on frontier model alignment." },
  { id: "j4", title: "Product Designer", company: "Figma", location: "Remote", type: "Full-time", salary: "$140k–$190k", logo: "https://logo.clearbit.com/figma.com", posted: "1w ago", tags: ["Figma", "Systems", "Prototyping"], description: "Design tools designers love." },
  { id: "j5", title: "Backend Engineer", company: "Razorpay", location: "Bangalore", type: "Full-time", salary: "₹28–45 LPA", logo: "https://logo.clearbit.com/razorpay.com", posted: "3d ago", tags: ["Go", "Postgres", "Payments"], description: "Own critical payments infrastructure." },
  { id: "j6", title: "iOS Developer", company: "Swiggy", location: "Bangalore", type: "Full-time", salary: "₹24–40 LPA", logo: "https://logo.clearbit.com/swiggy.com", posted: "5d ago", tags: ["Swift", "SwiftUI"], description: "Build delightful consumer experiences." },
];

export interface Community {
  id: string;
  name: string;
  members: number;
  category: string;
  cover: string;
  description: string;
}

export const communities: Community[] = [
  { id: "c1", name: "Competitive Programming", members: 2340, category: "Academic", cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800", description: "ICPC, Codeforces, and everything algorithmic." },
  { id: "c2", name: "Design Guild", members: 1120, category: "Creative", cover: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800", description: "Product & visual designers on campus." },
  { id: "c3", name: "AI/ML Research", members: 3200, category: "Research", cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800", description: "Papers, projects, reading group." },
  { id: "c4", name: "Entrepreneurship Cell", members: 1780, category: "Startup", cover: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800", description: "Founders & startup enthusiasts." },
  { id: "c5", name: "Web3 Builders", members: 640, category: "Tech", cover: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800", description: "Smart contracts, DeFi, on-chain apps." },
  { id: "c6", name: "Photography Club", members: 890, category: "Creative", cover: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800", description: "Share shots, tips, and campus events." },
];

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  cover: string;
  attendees: number;
  category: string;
}

export const events: Event[] = [
  { id: "e1", title: "Alumni Meet 2026", date: "Mar 14, 2026", location: "Main Auditorium", cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800", attendees: 480, category: "Networking" },
  { id: "e2", title: "Hack the Campus", date: "Feb 22, 2026", location: "CS Block", cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800", attendees: 320, category: "Hackathon" },
  { id: "e3", title: "Career Fair Spring", date: "Mar 3, 2026", location: "Sports Complex", cover: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800", attendees: 1200, category: "Careers" },
  { id: "e4", title: "TEDx Campus", date: "Apr 10, 2026", location: "Open Air Theatre", cover: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800", attendees: 800, category: "Talks" },
];

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  expertise: string[];
  rating: number;
  sessions: number;
}

export const mentors: Mentor[] = [
  { id: "m1", name: "Rohan Verma", avatar: "https://i.pravatar.cc/150?img=15", role: "SDE-2", company: "Stripe", expertise: ["System Design", "Career"], rating: 4.9, sessions: 128 },
  { id: "m2", name: "Priya Menon", avatar: "https://i.pravatar.cc/150?img=47", role: "Senior Designer", company: "Figma", expertise: ["Design", "Portfolio Review"], rating: 4.8, sessions: 96 },
  { id: "m3", name: "Vikram Iyer", avatar: "https://i.pravatar.cc/150?img=52", role: "Founder", company: "Nimbus AI", expertise: ["Startups", "Fundraising"], rating: 5.0, sessions: 54 },
  { id: "m4", name: "Meera Krishnan", avatar: "https://i.pravatar.cc/150?img=25", role: "ML Lead", company: "Google DeepMind", expertise: ["ML Research", "PhD Prep"], rating: 4.9, sessions: 72 },
];

export interface Message {
  id: string;
  from: string;
  text: string;
  time: string;
  mine?: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export const conversations: Conversation[] = [
  {
    id: "conv1", userId: "u_2", lastMessage: "Sure, let's do Thursday!", time: "2m", unread: 2, online: true,
    messages: [
      { id: "m1", from: "u_2", text: "Hey! Loved your last post about design systems.", time: "10:14" },
      { id: "m2", from: "u_1", text: "Thanks Priya! I'd love to hear your thoughts.", time: "10:16", mine: true },
      { id: "m3", from: "u_2", text: "Want to hop on a call this week?", time: "10:16" },
      { id: "m4", from: "u_1", text: "Absolutely — Thursday afternoon works?", time: "10:20", mine: true },
      { id: "m5", from: "u_2", text: "Sure, let's do Thursday!", time: "10:21" },
    ],
  },
  { id: "conv2", userId: "u_3", lastMessage: "Sent you the referral link", time: "1h", unread: 0, online: true, messages: [{ id: "m1", from: "u_3", text: "Sent you the referral link", time: "9:12" }] },
  { id: "conv3", userId: "u_4", lastMessage: "Office hours moved to Wed", time: "3h", unread: 1, online: false, messages: [{ id: "m1", from: "u_4", text: "Office hours moved to Wed", time: "8:00" }] },
  { id: "conv4", userId: "u_6", lastMessage: "Congrats on GSoC 🎉", time: "1d", unread: 0, online: false, messages: [{ id: "m1", from: "u_1", text: "Congrats on GSoC 🎉", time: "Yesterday", mine: true }] },
];

export interface Referral {
  id: string;
  company: string;
  role: string;
  postedBy: string;
  logo: string;
  location: string;
  deadline: string;
  status?: "open" | "closed";
}

export const referrals: Referral[] = [
  { id: "r1", company: "Stripe", role: "Frontend Engineer", postedBy: "u_3", logo: "https://logo.clearbit.com/stripe.com", location: "Bangalore", deadline: "Feb 28" },
  { id: "r2", company: "Figma", role: "Product Designer", postedBy: "u_2", logo: "https://logo.clearbit.com/figma.com", location: "Remote", deadline: "Mar 15" },
  { id: "r3", company: "Nimbus AI", role: "Founding Engineer", postedBy: "u_7", logo: "https://logo.clearbit.com/openai.com", location: "SF / Remote", deadline: "Rolling" },
];

export const analytics = {
  weekly: [
    { day: "Mon", views: 320, connections: 12, posts: 4 },
    { day: "Tue", views: 480, connections: 18, posts: 6 },
    { day: "Wed", views: 410, connections: 9, posts: 3 },
    { day: "Thu", views: 620, connections: 22, posts: 8 },
    { day: "Fri", views: 580, connections: 15, posts: 5 },
    { day: "Sat", views: 380, connections: 7, posts: 2 },
    { day: "Sun", views: 290, connections: 4, posts: 1 },
  ],
  distribution: [
    { name: "Students", value: 4200 },
    { name: "Alumni", value: 2800 },
    { name: "Faculty", value: 340 },
    { name: "Recruiters", value: 180 },
  ],
};

export const trending = ["#GSoC2026", "#OpenAI", "#PlacementSeason", "#HackTheCampus", "#DesignSystems", "#Web3"];

export const findUser = (id: string) => users.find((u) => u.id === id) ?? users[0];
