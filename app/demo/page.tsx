export default function DemoPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 space-y-6">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">Fake Bug Demo</h1>
        <p className="text-lg text-neutral-700">
          A single fruit fly–like bug is injected client-side and moves across
          the screen with erratic, lifelike behavior. The page itself stays
          server-rendered; the bug comes from a plain DOM script.
        </p>
        <p className="text-neutral-700">
          It may pause, dash, jitter, and skim edges. Pointer events are
          disabled so your UI stays interactive. The bug auto-vanishes after a
          short duration, or you can stop it manually.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">How to use</h2>
        <ol className="list-decimal list-inside space-y-2 text-neutral-800">
          <li>
            Ensure <code>/public/fake-bug.js</code> exists (already included).
          </li>
          <li>
            Inject it in your layout head/body:
            <div className="bg-neutral-100 border border-neutral-200 rounded px-3 py-2 mt-2 text-sm text-neutral-800">
              <code>{`<script src="/fake-bug.js" defer></script>`}</code>
            </div>
          </li>
          <li>
            To disable, remove the script tag or call{" "}
            <code>window.fakeBugStop?.()</code> from the console to despawn the
            current bug.
          </li>
          <li>
            The script is client-only; no React state is used. It can later be
            wrapped into an npm package by exporting an init helper and
            bundling the asset.
          </li>
        </ol>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">What to expect</h2>
        <ul className="list-disc list-inside space-y-2 text-neutral-800">
          <li>One bug spawns at a random position.</li>
          <li>Erratic path with bursts, pauses, jitter, and panic dashes.</li>
          <li>
            Edge-aware turning to avoid clean bounces; slight rotation and scale
            shifts for depth.
          </li>
          <li>Pointer-events off, high z-index, optional manual stop.</li>
        </ul>
      </section>
    </main>
  );
}
