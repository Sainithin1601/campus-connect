import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const session = await auth();
  if (session?.user) redirect("/dashboard");
  const { error } = await searchParams;
  const providers = [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET ? ["google"] : []),
    ...(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET ? ["github"] : []),
  ];
  return <main className="login-page">
    <section className="login-story">
      <Link href="/" className="brand"><span className="brand-icon">c<span>↗</span></span>campus<span className="brand-light">connect</span>.</Link>
      <div className="login-story-content"><div className="eyebrow">YOUR CAMPUS, CONNECTED</div><h1>Your next chapter<br />starts with a<br /><span>connection.</span></h1><p>Discover opportunities. Meet your people.<br />Make room for what’s next.</p><div className="login-illustration" aria-hidden="true">✳<span>Made for your potential ↗</span></div></div>
      <p className="login-caption">Built for students, by students.</p>
    </section>
    <section className="login-panel"><div className="login-card"><div className="eyebrow">WELCOME TO CAMPUSCONNECT</div><h2>A little closer to<br />what’s next.</h2><p>Sign in to explore your student dashboard.</p>
      {error && <div className="login-error" role="alert">We couldn’t complete sign-in. Please try again with the same account. If this continues, check the provider’s callback URL and credentials.</div>}
      <div className="login-providers">{providers.map(provider => <form key={provider} action={async () => {
        "use server";
        try { await signIn(provider, { redirectTo: "/dashboard" }); }
        catch (error) { if (error instanceof AuthError) redirect("/login?error=signin"); throw error; }
      }}><button className="provider-button"><span aria-hidden="true">{provider === "google" ? "G" : "⌘"}</span>Continue with {provider === "google" ? "Google" : "GitHub"}<span aria-hidden="true">↗</span></button></form>)}</div>
      {!providers.length && <p className="login-error" role="status">Sign-in is not configured yet. Add your provider credentials to .env.local using the README instructions.</p>}
      <div className="login-benefits"><span>◈ Find opportunities that interest you</span><span>▦ Discover what’s happening on campus</span><span>♡ Save your favorites and track your progress</span></div>
      <p className="login-footnote">A student project connecting you with campus possibilities.</p>
    </div></section>
  </main>;
}
