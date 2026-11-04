// The portfolio as a terminal page, for `curl philipp-dachtler.de`.
// Built from the same data as the website, so the two never drift apart.

import { profile, projects, stages } from "@/components/portfolio/data";

const ESC = "\x1b[";
const c = {
  reset: `${ESC}0m`,
  bold: `${ESC}1m`,
  dim: `${ESC}2m`,
  accent: `${ESC}38;5;202m`, // closest 256-colour match to #ff4d00
  link: (href: string, text: string) => `\x1b]8;;${href}\x1b\\${text}\x1b]8;;\x1b\\`,
};

const WIDTH = 72;

function wrap(text: string, indent = "  "): string {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > WIDTH - indent.length) {
      lines.push(line.trim());
      line = w;
    } else {
      line += " " + w;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines.map((l) => indent + l).join("\n");
}

const rule = (label: string, n: string) =>
  `\n${c.accent}${n}${c.reset} ${c.bold}${label.toUpperCase()}${c.reset} ${c.dim}${"─".repeat(WIDTH - label.length - n.length - 2)}${c.reset}\n`;

export function isTerminalClient(request: Request): boolean {
  const ua = request.headers.get("user-agent") ?? "";
  const accept = request.headers.get("accept") ?? "";
  return (
    /^(curl|wget|httpie|xh|powershell|lwp-request|fetch)\b/i.test(ua) &&
    !accept.includes("text/html")
  );
}

export function renderTerminalPage(color: boolean): string {
  const out: string[] = [];

  out.push(`
${c.accent}██████╗ ██████╗ ${c.reset}
${c.accent}██╔══██╗██╔══██╗${c.reset}   ${c.bold}${profile.name}${c.reset}
${c.accent}██████╔╝██║  ██║${c.reset}   ${profile.role}
${c.accent}██╔═══╝ ██║  ██║${c.reset}   ${c.dim}${profile.base} · 49.38° N, 8.37° E${c.reset}
${c.accent}██║     ██████╔╝${c.reset}
${c.accent}╚═╝     ╚═════╝ ${c.reset}`);

  out.push(
    "\n" +
      profile.intro
        .split("\n\n")
        .map((p) => wrap(p))
        .join("\n\n"),
  );

  out.push(rule("Path", "01"));
  for (const s of stages) {
    const marker = s.current ? `${c.accent}●${c.reset}` : `${c.dim}◇${c.reset}`;
    out.push(`  ${marker} ${c.bold}${s.title}${c.reset} ${c.dim}· ${s.year} / ${s.kind}${c.reset}`);
    out.push(`    ${c.dim}${s.place}${c.reset}`);
    out.push(wrap(s.text, "    ") + "\n");
  }

  out.push(rule("Work", "03"));
  projects.forEach((p, i) => {
    out.push(
      `  ${c.accent}${String(i + 1).padStart(2, "0")}${c.reset} ${c.bold}${p.title}${c.reset}  ${c.dim}[${p.tag}] ${p.status}${c.reset}`,
    );
    out.push(wrap(p.text, "     "));
    out.push(`     ${c.dim}${p.stack.join(" · ")}${c.reset}`);
    for (const l of p.links) out.push(`     → ${c.link(l.href, l.href)}`);
    out.push("");
  });

  out.push(rule("Contact", "05"));
  out.push(`  mail    ${c.link(`mailto:${profile.email}`, profile.email)}`);
  out.push(`  github  ${c.link(profile.github, profile.github)}`);
  out.push(
    `  web     ${c.link("https://www.philipp-dachtler.de", "https://www.philipp-dachtler.de")}`,
  );
  out.push(
    `\n${c.dim}  You're reading the server-rendered terminal edition. Same data, no JavaScript.\n  Browser version: open the URL above.${c.reset}\n`,
  );

  const text = out.join("\n") + "\n";
  // strip colour codes and OSC-8 hyperlinks when asked for plain text
  // eslint-disable-next-line no-control-regex -- stripping ANSI escapes is the point
  return color ? text : text.replace(/\x1b\]8;;[^\x1b]*\x1b\\/g, "").replace(/\x1b\[[0-9;]*m/g, "");
}
