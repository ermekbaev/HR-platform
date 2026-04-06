
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Dashboard from "../pages/dashboard/page";
import Onboarding from "../pages/onboarding/page";
import Rewards from "../pages/rewards/page";
import Analytics from "../pages/analytics/page";
import Tasks from "../pages/tasks/page";
import Learning from "../pages/learning/page";
import Team from "../pages/team/page";
import Login from "../pages/login/page";
import MentorDashboard from "../pages/mentor/page";
import AdminDashboard from "../pages/admin/page";
import HRCandidates from "../pages/hr/candidates/page";
import HRRanking from "../pages/hr/ranking/page";
import HRInterviews from "../pages/hr/interviews/page";
import Profile from "../pages/profile/page";
import ProtectedRoute from "../components/ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={['employee', 'manager']}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mentor",
    element: (
      <ProtectedRoute allowedRoles={['mentor']}>
        <MentorDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute allowedRoles={['employee', 'mentor']}>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tasks",
    element: (
      <ProtectedRoute allowedRoles={['employee']}>
        <Tasks />
      </ProtectedRoute>
    ),
  },
  {
    path: "/learning",
    element: (
      <ProtectedRoute allowedRoles={['employee']}>
        <Learning />
      </ProtectedRoute>
    ),
  },
  {
    path: "/rewards",
    element: (
      <ProtectedRoute allowedRoles={['employee']}>
        <Rewards />
      </ProtectedRoute>
    ),
  },
  {
    path: "/team",
    element: (
      <ProtectedRoute allowedRoles={['employee', 'mentor', 'manager', 'admin']}>
        <Team />
      </ProtectedRoute>
    ),
  },
  {
    path: "/analytics",
    element: (
      <ProtectedRoute allowedRoles={['hr', 'manager', 'admin']}>
        <Analytics />
      </ProtectedRoute>
    ),
  },
  {
    path: "/hr/candidates",
    element: (
      <ProtectedRoute allowedRoles={['hr', 'admin']}>
        <HRCandidates />
      </ProtectedRoute>
    ),
  },
  {
    path: "/hr/ranking",
    element: (
      <ProtectedRoute allowedRoles={['hr', 'admin']}>
        <HRRanking />
      </ProtectedRoute>
    ),
  },
  {
    path: "/hr/interviews",
    element: (
      <ProtectedRoute allowedRoles={['hr', 'admin']}>
        <HRInterviews />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={['employee', 'mentor', 'manager', 'hr', 'admin']}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
