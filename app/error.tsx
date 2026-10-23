"use client";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  void error;
  return (
    <main className="error-screen">
      <p className="eyebrow">PORTFOLIO / ERROR</p>
      <h1>Something went wrong.</h1>
      <button className="button button--light" type="button" onClick={() => retry()}>
        Try again <span aria-hidden="true">↗</span>
      </button>
    </main>
  );
}
