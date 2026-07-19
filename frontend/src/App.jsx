import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layouts/AppLayout";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/store";

// Redirect to /login if not authenticated
function PrivateRoute({ children }) {
  const isAuthenticated = useAppSelector((s) => s.user.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Redirect to /feed if already logged in
function GuestRoute({ children }) {
  const isAuthenticated = useAppSelector((s) => s.user.isAuthenticated);
  return isAuthenticated ? <Navigate to="/feed" replace /> : children;
}

const Landing = lazy(() => import("@/pages/Landing"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Help = lazy(() => import("@/pages/Help"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const VerifyEmail = lazy(() => import("@/pages/auth/VerifyEmail"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Feed = lazy(() => import("@/pages/Feed"));
const PostDetail = lazy(() => import("@/pages/PostDetail"));
const Profile = lazy(() => import("@/pages/Profile"));
const EditProfile = lazy(() => import("@/pages/EditProfile"));
const Messages = lazy(() => import("@/pages/Messages"));
const Connections = lazy(() => import("@/pages/Connections"));
const Communities = lazy(() => import("@/pages/Communities"));
const CommunityDetail = lazy(() => import("@/pages/CommunityDetail"));
const Jobs = lazy(() => import("@/pages/Jobs"));
const JobDetail = lazy(() => import("@/pages/JobDetail"));
const Referrals = lazy(() => import("@/pages/Referrals"));
const ReferralDetail = lazy(() => import("@/pages/ReferralDetail"));
const Mentorship = lazy(() => import("@/pages/Mentorship"));
const MentorDetail = lazy(() => import("@/pages/MentorDetail"));
const Events = lazy(() => import("@/pages/Events"));
const EventDetail = lazy(() => import("@/pages/EventDetail"));
const Resources = lazy(() => import("@/pages/Resources"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const SearchPage = lazy(() => import("@/pages/Search"));
const Settings = lazy(() => import("@/pages/Settings"));

const RoleDashboards = lazy(() => import("@/pages/role/RoleDashboards"));
const SimpleRolePage = lazy(() => import("@/pages/role/SimpleRolePage"));
const AdminUsers = lazy(() => import("@/pages/admin/Users"));
const AdminAnalytics = lazy(() => import("@/pages/admin/Analytics"));
const AdminReports = lazy(() => import("@/pages/admin/Reports"));
const AdminModeration = lazy(() => import("@/pages/admin/Moderation"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));

function Fallback() {
  return (
    <div className="p-6 space-y-3">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:conversationId" element={<Messages />} />
          <Route path="/connections" element={<Connections tab="connections" />} />
          <Route path="/followers" element={<Connections tab="followers" />} />
          <Route path="/following" element={<Connections tab="following" />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/community/:id/discussion" element={<CommunityDetail tab="discussion" />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/referrals/:id" element={<ReferralDetail />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/mentorship/:mentorId" element={<MentorDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<Settings />} />

          {/* Role-based routes */}
          <Route path="/dashboard/student" element={<RoleDashboards role="student" />} />
          <Route path="/dashboard/faculty" element={<RoleDashboards role="faculty" />} />
          <Route path="/dashboard/alumni" element={<RoleDashboards role="alumni" />} />
          <Route path="/dashboard/placement" element={<RoleDashboards role="placement" />} />
          <Route path="/dashboard/admin" element={<RoleDashboards role="admin" />} />

          {/* Student */}
          <Route
            path="/profile/student"
            element={<SimpleRolePage title="Student Profile" section="Student Zone" />}
          />
          <Route
            path="/my-applications"
            element={<SimpleRolePage title="My Applications" section="Student Zone" />}
          />
          <Route
            path="/my-referrals"
            element={<SimpleRolePage title="My Referral Requests" section="Student Zone" />}
          />
          <Route
            path="/my-events"
            element={<SimpleRolePage title="My Events" section="Student Zone" />}
          />
          <Route
            path="/my-communities"
            element={<SimpleRolePage title="My Communities" section="Student Zone" />}
          />

          {/* Faculty */}
          <Route
            path="/create-announcement"
            element={<SimpleRolePage title="Create Announcement" section="Faculty Zone" />}
          />
          <Route
            path="/manage-events"
            element={<SimpleRolePage title="Manage Events" section="Faculty Zone" />}
          />
          <Route
            path="/manage-community"
            element={<SimpleRolePage title="Manage Communities" section="Faculty Zone" />}
          />

          {/* Alumni */}
          <Route
            path="/post-job"
            element={<SimpleRolePage title="Post a Job" section="Alumni Zone" />}
          />
          <Route
            path="/post-referral"
            element={<SimpleRolePage title="Post a Referral" section="Alumni Zone" />}
          />
          <Route
            path="/mentorship-requests"
            element={<SimpleRolePage title="Mentorship Requests" section="Alumni Zone" />}
          />
          <Route
            path="/my-mentees"
            element={<SimpleRolePage title="My Mentees" section="Alumni Zone" />}
          />

          {/* Placement */}
          <Route
            path="/manage-jobs"
            element={<SimpleRolePage title="Manage Jobs" section="Placement Office" />}
          />
          <Route
            path="/manage-referrals"
            element={<SimpleRolePage title="Manage Referrals" section="Placement Office" />}
          />
          <Route
            path="/placement-reports"
            element={<SimpleRolePage title="Placement Reports" section="Placement Office" />}
          />

          {/* Admin */}
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/reports" element={<AdminReports />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
          <Route path="/moderation" element={<AdminModeration />} />
          <Route path="/system-settings" element={<AdminSettings />} />
        </Route>

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
