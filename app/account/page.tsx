import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <main className="account-page">
    <Link href="/dashboard">← Back to CampusConnect</Link>
    <section className="profile-form">
      <div className="eyebrow">CAMPUSCONNECT ACCOUNT</div>
      <h1>{session?.user ? "You’re signed in." : "Your campus connection."}</h1>
      <p>Signed in as {session.user.name || session.user.email}.</p>
      <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
        <button className="primary-button">Sign out</button>
      </form>
      <div className="sample-notice">The student workspace is currently a browser-local demo. Signing in does not yet sync profiles, bookmarks, or applications to an account.</div>
    </section>
  </main>;
}
