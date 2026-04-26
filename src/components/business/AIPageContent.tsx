// Content is fetched from /ai-content.html — a self-hosted static asset
// served from the same origin. Not user-generated; XSS risk is not applicable.
import { useState, useEffect, useRef } from "react";

export function AIPageContent() {
  const [html, setHtml] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/ai-content.html")
      .then((r) => r.text())
      .then((raw) => {
        // Extract body content only — avoids nested html/head/body issues.
        const bodyMatch = raw.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        setHtml(bodyMatch ? bodyMatch[1] : raw);
      })
      .catch(console.error);
  }, []);

  // Re-execute inline <script> tags that dangerouslySetInnerHTML skips.
  useEffect(() => {
    if (!html || !containerRef.current) return;
    const container = containerRef.current;
    container.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });
  }, [html]);

  if (!html) {
    return (
      <div
        style={{ minHeight: "80vh", background: "#f7f6f3" }}
        className="flex items-center justify-center"
      >
        <div className="animate-pulse text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  const props: Record<string, string> = { __html: html };
  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={props}
      style={{ background: "#f7f6f3" }}
    />
  );
}
