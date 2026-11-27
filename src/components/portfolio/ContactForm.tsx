import { useState, type FormEvent } from "react";
import { ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react";
import { profile } from "./data";

/*
 * Free, backend-less delivery via FormSubmit (https://formsubmit.co).
 * The very first submission sends an activation mail to the address below;
 * after confirming it once, every message lands in that inbox.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

const topics = [
  { id: "hobby", label: "Hobby project", hint: "Build something together, just for fun" },
  { id: "business", label: "Custom software", hint: "A tailored solution for your company" },
  { id: "freelance", label: "Freelance / contract", hint: "Extra hands for an existing team" },
  { id: "other", label: "Something else", hint: "Questions, feedback, just saying hi" },
] as const;

type TopicId = (typeof topics)[number]["id"];
type Status = "idle" | "sending" | "sent" | "error";

const budgets = ["< 2k €", "2–5k €", "5–15k €", "15k € +", "Not sure yet"];
const timelines = ["ASAP", "1–3 months", "3–6 months", "Flexible"];

const field =
  "w-full border-b border-rule bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-muted/70 focus:border-accent";
const label = "t-mono text-muted";

export function ContactForm() {
  const [topic, setTopic] = useState<TopicId>("hobby");
  const [status, setStatus] = useState<Status>("idle");
  const isBusiness = topic === "business" || topic === "freelance";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data["_honey"]) return; // bot
    const topicLabel = topics.find((t) => t.id === topic)?.label ?? topic;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          topic: topicLabel,
          _subject: `Portfolio · ${topicLabel} · ${String(data["name"])}`,
          _replyto: data["email"],
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(json.success) !== "true") throw new Error("send failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="border border-fg p-8" role="status">
        <CheckIcon className="size-8 text-accent" />
        <p className="t-title mt-4">Thanks, your message is on its way.</p>
        <p className="t-body mt-2 text-muted">I'll get back to you as soon as I can.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn mt-6" data-magnetic>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => void submit(e)} className="grid gap-8" noValidate={false}>
      <fieldset>
        <legend className={label}>What can I help with?</legend>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {topics.map((t) => {
            const active = t.id === topic;
            return (
              <label
                key={t.id}
                className={`cursor-pointer border p-4 transition-colors ${
                  active ? "border-accent bg-accent text-on-accent" : "border-rule hover:border-fg"
                }`}
              >
                <input
                  type="radio"
                  name="topic_id"
                  value={t.id}
                  checked={active}
                  onChange={() => setTopic(t.id)}
                  className="sr-only"
                />
                <span className="block font-bold">{t.label}</span>
                <span className={`mt-1 block text-sm ${active ? "opacity-80" : "text-muted"}`}>
                  {t.hint}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name *</span>
          <input
            name="name"
            required
            autoComplete="name"
            className={field}
            placeholder="Jane Doe"
          />
        </label>
        <label className="block">
          <span className={label}>Email *</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="jane@example.com"
          />
        </label>
      </div>

      {isBusiness && (
        <div className="grid gap-8 sm:grid-cols-3">
          <label className="block">
            <span className={label}>Company</span>
            <input name="company" autoComplete="organization" className={field} />
          </label>
          <label className="block">
            <span className={label}>Budget</span>
            <select name="budget" defaultValue="" className={field}>
              <option value="" disabled>
                Select…
              </option>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={label}>Timeline</span>
            <select name="timeline" defaultValue="" className={field}>
              <option value="" disabled>
                Select…
              </option>
              {timelines.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      <label className="block">
        <span className={label}>
          {isBusiness ? "What should the software do? *" : "Tell me about it *"}
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder={
            isBusiness
              ? "The problem, who uses it, existing tools…"
              : "Your idea, tech you'd like to try, how much time you have…"
          }
        />
      </label>

      {/* honeypot: hidden from humans */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-solid disabled:opacity-60"
          data-magnetic
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowUpRightIcon className="size-4" />
        </button>
        {status === "error" && (
          <p className="t-mono text-accent" role="alert">
            Couldn't send. Please mail me directly at {profile.email}.
          </p>
        )}
      </div>
    </form>
  );
}
