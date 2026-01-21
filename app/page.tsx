export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_circle_at_20%_-10%,rgba(120,119,198,0.25),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(56,189,248,0.18),transparent_55%)]">
      <main className="mx-auto max-w-5xl px-6 py-14">
        <header className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-sm text-black/70 backdrop-blur dark:border-white/10 dark:bg-black/40 dark:text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            One bug • DOM script • No client React
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
              Fake bug prank
            </h1>
            <p className="max-w-2xl text-lg leading-7 text-black/70 dark:text-white/70">
              If you’re reading this and thinking “was that a fly?” — yep. It’s
              a single fruit-fly-ish bug injected with a plain browser script.
              The page is still server-rendered; the bug only exists in the
              client.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white/60 px-4 text-sm font-medium text-black/80 backdrop-blur dark:border-white/10 dark:bg-black/40 dark:text-white/80">
              It should already be moving on your screen
            </div>
            <div className="text-sm text-black/60 dark:text-white/60">
              Stop it anytime:{" "}
              <code className="rounded bg-black/5 px-2 py-1 dark:bg-white/10">
                window.fakeBugStop?.()
              </code>
            </div>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-black/40 dark:shadow-black/20">
            <h2 className="text-xl font-semibold text-[color:var(--foreground)]">Install options</h2>
            <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
              Use it as a local public script, or host it on a CDN (unpkg). In
              both cases it stays a plain DOM script — no client components
              needed.
            </p>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-black/10 bg-white p-4 text-sm text-black shadow-inner shadow-black/5 dark:border-white/10 dark:bg-black dark:text-white">
                <div className="text-xs text-black/60 dark:text-white/60">Option A — local (recommended)</div>
                <div className="mt-2">
                  <code>{`<script src="/fake-bug.js" defer></script>`}</code>
                </div>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-4 text-sm text-black shadow-inner shadow-black/5 dark:border-white/10 dark:bg-black dark:text-white">
                <div className="text-xs text-black/60 dark:text-white/60">Option B — unpkg (CDN)</div>
                <div className="mt-2 space-y-2">
                  <div>
                    <code>{`<script src="https://unpkg.com/@your-scope/fake-bug-prank@1.0.0/dist/fake-bug.js" defer></script>`}</code>
                  </div>
                  <div className="text-xs text-black/60 dark:text-white/60">
                    Publish an npm package that ships the built script at{" "}
                    <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">dist/fake-bug.js</code>
                    .
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-4 text-sm text-black shadow-inner shadow-black/5 dark:border-white/10 dark:bg-black dark:text-white">
                <div className="text-xs text-black/60 dark:text-white/60">Option C — CLI (scaffold)</div>
                <div className="mt-2">
                  <code>{`npx -y grab@latest init`}</code>
                </div>
                <div className="mt-2 text-xs text-black/60 dark:text-white/60">
                  Run in your project root to scaffold and pull the script; adjust
                  the injected URL to your published or local copy.
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-black/10 bg-white/60 p-4 text-sm text-black/70 dark:border-white/10 dark:bg-black/30 dark:text-white/70">
              To disable: remove the script tag from{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">
                app/layout.tsx
              </code>{" "}
              (global) or run{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 dark:bg-white/10">
                window.fakeBugStop?.()
              </code>{" "}
              (this tab only).
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-black/40 dark:shadow-black/20">
            <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
              What it does (so it feels real)
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-black/70 dark:text-white/70">
              <li>- Moves in uneven bursts, then stops like it’s deciding where to go next</li>
              <li>- Micro-turns every few frames so it never looks “on rails”</li>
              <li>- Occasionally does a fast panic dash and changes heading</li>
              <li>- Near edges it steers and skims instead of doing a perfect bounce</li>
              <li>- Rotates with direction, tiny scale drift for depth, slight blur when fast</li>
            </ul>

            <dl className="mt-5 grid gap-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-black/60 dark:text-white/60">Interactivity</dt>
                <dd className="text-[color:var(--foreground)]">pointer-events: none</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-black/60 dark:text-white/60">Layers</dt>
                <dd className="text-[color:var(--foreground)]">always on top</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-black/60 dark:text-white/60">Runtime</dt>
                <dd className="text-[color:var(--foreground)]">browser only</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-black/60 dark:text-white/60">Single bug</dt>
                <dd className="text-[color:var(--foreground)]">always one</dd>
              </div>
            </dl>

            <div className="mt-6 rounded-xl border border-black/10 bg-white/60 p-4 text-sm text-black/80 shadow-sm shadow-black/5 dark:border-white/10 dark:bg-black/30 dark:text-white/80">
              <div className="text-xs uppercase tracking-wide text-black/50 dark:text-white/50">
                Next.js App Router snippet
              </div>
              <div className="mt-2 space-y-2 text-xs text-black/70 dark:text-white/70">
                <div>Inject from unpkg only during development:</div>
                <div className="rounded-lg border border-black/10 bg-white p-3 text-[11px] font-mono text-black dark:border-white/10 dark:bg-black dark:text-white">
                  <code>{`{process.env.NODE_ENV === "development" && (
  <Script
    src="//unpkg.com/@your-scope/fake-bug-prank/dist/fake-bug.js"
    crossOrigin="anonymous"
    strategy="beforeInteractive"
  />
)}`}</code>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
