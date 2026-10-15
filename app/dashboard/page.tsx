import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Dashboard from "@/app/components/Dashboard";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  return <Dashboard key={session.user.email} accountKey={session.user.email} studentName={session.user.name?.split(" ")[0] || "Student"} />;
}
