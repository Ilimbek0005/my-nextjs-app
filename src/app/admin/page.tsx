import { checkAuth } from "../actions/auth";
import AdminDashboard from "./AdminDashboard";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuthorized = await checkAuth();

  if (isAuthorized) {
    return <AdminDashboard />;
  }

  return <LoginForm />;
}
