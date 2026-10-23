import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-screen">
      <p className="eyebrow">404 / NOT FOUND</p>
      <h1>This page doesn’t exist.</h1>
      <Link className="button button--light" href="/">Return home <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
