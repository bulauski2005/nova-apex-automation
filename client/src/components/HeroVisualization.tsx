import React, { Fragment, useLayoutEffect, useRef } from "react";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  CalendarDays,
  ClipboardCheck,
  Globe,
  MessageCircle,
MessageSquareText,
  MessagesSquare,
  Phone,
  Plug,
  RefreshCw,
  Settings,
  Sparkles,
  UserPlus,
  Users,
  Workflow,
} from "lucide-react";

const intelligenceSteps = [
  "UNDERSTANDS",
  "DECIDES",
  "EXECUTES",
  "COORDINATES",
];

const workflowSteps = [
  { label: "NEW PATIENT LEAD", icon: UserPlus, accent: "#2563eb" },
  { label: "AI CONVERSATION", icon: MessagesSquare, accent: "#5FE1EE" },
  { label: "PATIENT QUALIFICATION", icon: ClipboardCheck, accent: "#a78bfa" },
  { label: "APPOINTMENT", icon: CalendarCheck, accent: "#2563eb" },
  { label: "SMS CONFIRMATION", icon: MessageSquareText, accent: "#5FE1EE" },
  { label: "PRACTICE SYSTEM", icon: Building2, accent: "#a78bfa" },
  { label: "FOLLOW-UP", icon: RefreshCw, accent: "#2563eb" },
];

const modules = [
  { label: "VOICE AI", icon: Phone },
  { label: "SMS", icon: MessageCircle },
  { label: "WEB ASSISTANT", icon: Globe },
  { label: "APPOINTMENTS", icon: CalendarDays },
  { label: "AUTOMATIONS", icon: Workflow },
  { label: "INTEGRATIONS", icon: Plug },
];

const productModules = [
  { label: "Clients", icon: Users },
  { label: "SMS", icon: MessageCircle },
  { label: "Appointments", icon: CalendarDays },
  { label: "Web Assistant", icon: Globe },
  { label: "Automations", icon: Workflow },
  { label: "Voice AI", icon: Phone },
  { label: "Integrations", icon: Plug },
  { label: "Settings", icon: Settings },
];

const activityData = [42, 66, 50, 78, 60, 90, 72];
const appointmentData = [30, 54, 44, 70, 50, 82, 62];

const MOBILE_QUERY = "(max-width: 639px)";
const MOBILE_VERT_MARGIN = 100;

export default function HeroVisualization() {
  const lockerRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  /* Mobile only: if the (compacted) console is taller than the phone screen,
     shrink it uniformly so it fits on screen - never narrower than its natural
     width, dims scaled together. When it already fits, nothing changes. */
  useLayoutEffect(() => {
    const locker = lockerRef.current;
    const node = consoleRef.current;
    if (!locker || !node) return;

    const measure = () => {
      node.style.transform = "";
      node.style.width = "";
      node.style.height = "";
      locker.style.width = "";
      locker.style.height = "";
      if (!window.matchMedia(MOBILE_QUERY).matches) return;
      const r = node.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const fitW = (window.innerWidth - 40) / r.width;
      const fitH = (window.innerHeight - MOBILE_VERT_MARGIN) / r.height;
      const s = Math.min(1, Math.max(0.5, Math.min(fitW, fitH)));
      if (s >= 1) return;
      locker.style.width = `${Math.round(r.width * s)}px`;
      locker.style.height = `${Math.round(r.height * s)}px`;
      node.style.width = `${Math.round(r.width)}px`;
      node.style.height = `${Math.round(r.height)}px`;
      node.style.transformOrigin = "top left";
      node.style.transform = `scale(${s})`;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="relative min-w-0 max-w-full">
      <div ref={lockerRef} className="hero-console-scale-locker">
        <div ref={consoleRef} className="relative">
      {/* Ambient glow behind the panel */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#2563eb]/25 via-[#a78bfa]/10 to-[#5FE1EE]/20 blur-2xl" />

      {/* Main product console panel */}
      <div className="relative w-full max-w-full overflow-hidden rounded-2xl border border-[#1e2d45] bg-card shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        {/* Panel top bar */}
        <div className="flex items-center justify-between border-b border-[#1e2d45] bg-[#0a1420]/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="ml-2 text-[11px] font-bold tracking-wider text-[#e8eefc]">
              NOVAPEX AI CONSOLE
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5FE1EE]/30 bg-[#5FE1EE]/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-[#5FE1EE]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#5FE1EE] opacity-75 ping-sync" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5FE1EE]" />
            </span>
            LIVE
          </span>
        </div>

        <div className="grid gap-3 p-2.5 sm:grid-cols-2 sm:gap-4 sm:p-4">
          {/* Left column: AI intelligence + workflow */}
          <div className="space-y-3 sm:space-y-4">
            {/* AI Intelligence */}
            <div className="rounded-xl border border-[#2563eb]/25 bg-[#0a1420]/70 p-2 sm:p-3">
              <div className="mb-2.5 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#5FE1EE]" />
                <span className="text-[10px] font-bold tracking-wider text-white">
                  AI INTELLIGENCE
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {intelligenceSteps.map((step, i) => (
                  <Fragment key={step}>
                    <span className="rounded-md border border-[#2563eb]/40 bg-card px-2 py-1 text-[10px] font-semibold text-[#e8eefc] shadow-[0_0_14px_rgba(37,99,235,0.25)]">
                      {step}
                    </span>
                    {i < intelligenceSteps.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-[#5FE1EE]/70" />
                    )}
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Workflow */}
            <div className="rounded-xl border border-[#1e2d45] bg-[#0a1420]/70 p-2 sm:p-3">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-white">
                  AUTOMATION WORKFLOW
                </span>
                <span className="rounded border border-[#1e2d45] px-1.5 py-0.5 text-[8px] font-semibold tracking-wider text-[#7d8faa]">
                  SAMPLE
                </span>
              </div>
              <div className="relative">
                {/* Connector rail */}
                <div className="absolute left-[8px] top-2 bottom-2 w-px bg-gradient-to-b from-[#2563eb] via-[#5FE1EE] to-[#a78bfa] opacity-40 hero-line-flow sm:left-[11px]" />
                <div className="space-y-1 sm:space-y-2.5">
                  {workflowSteps.map((step, i) => (
                    <div
                      key={step.label}
                      className="relative flex items-center gap-2 sm:gap-3"
                    >
                      <span
                        className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#5FE1EE]/50 bg-card hero-node-glow sm:h-6 sm:w-6"
                        style={{ animationDelay: `${i * 0.45}s` }}
                      >
                        <step.icon
                          className="h-2 w-2 sm:h-3 sm:w-3"
                          style={{ color: step.accent }}
                        />
                      </span>
                      <span className="text-[9px] font-semibold tracking-wide text-[#e8eefc] sm:text-[11px]">
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: graphs */}
          <div className="grid grid-cols-2 gap-3 sm:block sm:space-y-4">
            <div className="rounded-xl border border-[#1e2d45] bg-[#0a1420]/70 p-2 sm:p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Workflow className="h-3.5 w-3.5 text-[#8b5cf6]" />
                  <span className="text-[10px] font-bold tracking-wider text-white">
                    AUTOMATION ACTIVITY
                  </span>
                </div>
                <span className="rounded border border-[#1e2d45] px-1.5 py-0.5 text-[8px] font-semibold tracking-wider text-[#7d8faa]">
                  DEMO
                </span>
              </div>
              <div className="flex h-9 items-end gap-1 sm:h-16">
                {activityData.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-[#2563eb] to-[#5FE1EE] hero-bar-pulse"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#1e2d45] bg-[#0a1420]/70 p-2 sm:p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-[#8b5cf6]" />
                  <span className="text-[10px] font-bold tracking-wider text-white">
                    APPOINTMENT ACTIVITY
                  </span>
                </div>
                <span className="rounded border border-[#1e2d45] px-1.5 py-0.5 text-[8px] font-semibold tracking-wider text-[#7d8faa]">
                  DEMO
                </span>
              </div>
              <div className="flex h-9 items-end gap-1 sm:h-16">
                {appointmentData.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-[#7c3aed] via-[#a78bfa] to-[#5FE1EE] hero-bar-pulse"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.3 + 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Connected modules */}
            <div className="col-span-2 rounded-xl border border-[#1e2d45] bg-[#0a1420]/70 p-2.5 sm:col-span-1 sm:p-3">
              <div className="mb-1.5 text-[10px] font-bold tracking-wider text-white sm:mb-2">
                CONNECTED MODULES
              </div>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-1.5">
                {modules.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex min-w-0 items-center gap-1 rounded-md border border-[#1e2d45] bg-card px-1.5 py-1 text-[9px] font-semibold text-[#c3d2e8] leading-tight sm:px-2 sm:py-1.5 sm:text-[10px]"
                  >
                    <m.icon className="h-3 w-3 shrink-0 text-[#5FE1EE]" />
                    <span className="min-w-0 break-words">{m.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Novapex platform areas */}
        <div className="border-t border-[#1e2d45] bg-[#0a1420]/80 px-3 py-2 sm:px-4 sm:py-3">
          <div className="mb-1.5 text-[9px] font-bold tracking-wider text-[#7d8faa]">
            NOVAPEX PLATFORM
          </div>
          <div className="flex flex-wrap gap-1.5">
            {productModules.map((m) => (
              <span
                key={m.label}
                className="inline-flex min-w-0 items-center gap-1 rounded-md border border-[#1e2d45] bg-card/70 px-1.5 py-0.5 text-[9px] font-medium text-[#8fa3bd] sm:px-2 sm:py-1"
              >
                <m.icon className="h-2.5 w-2.5 shrink-0 text-[#2563eb]" />
                <span className="min-w-0 break-words">{m.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating indicator chip - top left */}
      <div className="absolute -top-5 -left-3 md:-left-6 hero-float rounded-xl border border-[#5FE1EE]/30 bg-card/90 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5FE1EE]/15">
            <MessageSquareText className="h-3 w-3 text-[#5FE1EE]" />
          </span>
          <div>
            <p className="text-[11px] font-bold text-white leading-none">
              Lead Captured
            </p>
            <p className="mt-0.5 text-[9px] text-[#8fa3bd]">
              AI replied in 3s
            </p>
          </div>
        </div>
      </div>

      {/* Floating indicator chip - bottom right */}
      <div className="absolute -bottom-5 -right-2 md:-right-5 hero-float hero-float-delay rounded-xl border border-[#2563eb]/30 bg-card/90 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb]/20">
            <CalendarCheck className="h-3 w-3 text-[#5FE1EE]" />
          </span>
          <div>
            <p className="text-[11px] font-bold text-white leading-none">
              Appointment Booked
            </p>
            <p className="mt-0.5 text-[9px] text-[#8fa3bd]">
              Synced to practice system
            </p>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}