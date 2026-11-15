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
  Minus,
  Phone,
  Plug,
  RefreshCw,
  Settings,
  Sparkles,
  Square,
  UserPlus,
  Users,
  Workflow,
  X,
} from "lucide-react";

const intelligenceSteps = [
  "UNDERSTANDS",
  "DECIDES",
  "EXECUTES",
  "COORDINATES",
];

/* Sapphire -> steel -> slate illumination ramp (light console) */
const workflowSteps = [
  { label: "NEW PATIENT LEAD", icon: UserPlus, accent: "#0D2645" },
  { label: "SI CONVERSATION", icon: MessagesSquare, accent: "#0D2645" },
  { label: "PATIENT QUALIFICATION", icon: ClipboardCheck, accent: "#234570" },
  { label: "APPOINTMENT", icon: CalendarCheck, accent: "#234570" },
  { label: "SMS CONFIRMATION", icon: MessageSquareText, accent: "#263F5F" },
  { label: "PRACTICE SYSTEM", icon: Building2, accent: "#17263D" },
  { label: "FOLLOW-UP", icon: RefreshCw, accent: "#263F5F" },
];

const modules = [
  { label: "VOICE AI", icon: Phone },
  { label: "SMS", icon: MessageCircle },
  { label: "WEBSITE", icon: Globe },
  { label: "CALENDAR", icon: CalendarDays },
  { label: "BACK OFFICE", icon: Workflow },
  { label: "PMS", icon: Plug },
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
const DESIGN_W = 544;

export default function HeroVisualization() {
  const outerRef = useRef<HTMLDivElement>(null);
  const lockerRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  /* Mobile only: scale the ENTIRE desktop console down as one uniform unit.
     The console keeps its desktop 2-column composition at the fixed design
     width (DESIGN_W) and is uniformly scaled to fit the mobile hero column -
     no reflow, no stacking, no per-section responsiveness. Desktop/tablet use
     the natural fluid layout exactly as before. */
  useLayoutEffect(() => {
    const outer = outerRef.current;
    const locker = lockerRef.current;
    const node = consoleRef.current;
    if (!outer || !locker || !node) return;

    const measure = () => {
      node.style.transform = "";
      node.style.width = "";
      node.style.height = "";
      node.style.position = "";
      node.style.left = "";
      node.style.top = "";
      locker.style.width = "";
      locker.style.height = "";
      locker.style.position = "";
      if (!window.matchMedia(MOBILE_QUERY).matches) return;

      const availW = outer.clientWidth;
      if (availW <= 0) return;

      // Natural height of the fixed-width desktop composition.
      node.style.width = `${DESIGN_W}px`;
      node.style.position = "absolute";
      node.style.left = "0";
      node.style.top = "0";
      const h = node.getBoundingClientRect().height;
      if (h <= 0) return;

      // Uniform scale so the whole square console fits the column width.
      const s = Math.min(1, availW / DESIGN_W);
      locker.style.position = "relative";
      locker.style.width = `${Math.round(DESIGN_W * s)}px`;
      locker.style.height = `${Math.round(h * s)}px`;
      node.style.width = `${DESIGN_W}px`;
      node.style.height = `${Math.round(h)}px`;
      node.style.transformOrigin = "top left";
      node.style.transform = `scale(${s})`;
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const onLoadT = window.setTimeout(measure, 300);
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      window.clearTimeout(onLoadT);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={outerRef} className="relative min-w-0 max-w-full">
      <div ref={lockerRef} className="hero-console-scale-locker">
        <div ref={consoleRef} className="relative">
      {/* Ambient sapphire glow behind the panel */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#0D2645]/20 via-[#EAF2FA]/70 to-[#7C9CC4]/30 blur-2xl" />

      {/* Main product console panel - frosted glass over the frost gradient */}
      <div className="relative w-full max-w-full overflow-hidden rounded-2xl border border-[#D8E0EA] bg-white/85 shadow-[0_24px_60px_rgba(9,20,35,0.14)] backdrop-blur-xl">
        {/* Panel top bar */}
        <div className="flex items-center justify-between border-b border-[#D8E0EA] bg-white/70 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider text-[#17263D]">
              NOVAPEX SI CONSOLE
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full gradient-slate border border-[#D8E0EA]/70 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 ping-sync" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              LIVE
            </span>
            <span className="flex items-center gap-3 text-[#6B7A8F]" aria-hidden="true">
              <Minus className="h-3 w-3" strokeWidth={2} />
              <Square className="h-2.5 w-2.5" strokeWidth={2} />
              <X className="h-3 w-3" strokeWidth={2} />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          {/* Left column: AI intelligence + workflow */}
          <div className="space-y-4">
            {/* AI Intelligence */}
            <div className="rounded-xl border border-[#0D2645]/20 bg-[#F7F9FC] p-3">
              <div className="mb-2.5 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#0D2645]" />
                <span className="text-[10px] font-bold tracking-wider text-[#17263D]">
                  SUPER INTELLIGENCE
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {intelligenceSteps.map((step, i) => (
                  <Fragment key={step}>
                    <span className="rounded-md gradient-slate border border-[#D8E0EA]/70 px-2 py-1 text-[10px] font-semibold text-white shadow-[0_2px_10px_rgba(9,20,35,0.18)]">
                      {step}
                    </span>
                    {i < intelligenceSteps.length - 1 && (
                      <ArrowRight className="h-3 w-3 text-[#0D2645]/70" />
                    )}
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Workflow */}
            <div className="rounded-xl border border-[#D8E0EA] bg-[#F7F9FC] p-3">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-[#17263D]">
                  AUTOMATION WORKFLOW
                </span>
              </div>
              <div className="relative">
                {/* Connector rail */}
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#081B31] via-[#234570] to-[#D8E0EA] opacity-50 hero-line-flow" />
                <div className="space-y-2.5">
                  {workflowSteps.map((step, i) => (
                    <div
                      key={step.label}
                      className="relative flex items-center gap-3"
                    >
                      <span
                        className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D8E0EA] bg-white hero-node-highlight"
                        style={{ animationDelay: `${i * 0.45}s` }}
                      >
                        <step.icon
                          className="h-3 w-3 hero-icon-flow"
                          style={{ color: step.accent, animationDelay: `${i * 0.45}s` }}
                        />
                      </span>
                      <span className="text-[11px] font-semibold tracking-wide text-[#1D2939]">
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: graphs */}
          <div className="space-y-4">
            <div className="rounded-xl border border-[#D8E0EA] bg-[#F7F9FC] p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Workflow className="h-3.5 w-3.5 text-[#0D2645]" />
                  <span className="text-[10px] font-bold tracking-wider text-[#17263D]">
                    AUTOMATION ACTIVITY
                  </span>
                </div>
              </div>
              <div className="flex h-16 items-end gap-1.5">
                {activityData.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-[#030B16] to-[#0D2645] hero-bar-pulse"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#D8E0EA] bg-[#F7F9FC] p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-[#0D2645]" />
                  <span className="text-[10px] font-bold tracking-wider text-[#17263D]">
                    APPOINTMENT ACTIVITY
                  </span>
                </div>
              </div>
              <div className="flex h-16 items-end gap-1.5">
                {appointmentData.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-[#030B16] via-[#081B31] to-[#0D2645] hero-bar-pulse"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.3 + 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Connected modules */}
            <div className="rounded-xl border border-[#D8E0EA] bg-[#F7F9FC] p-3">
              <div className="mb-2 text-[10px] font-bold tracking-wider text-[#17263D]">
                CONNECTED MODULES
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {modules.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex min-w-0 items-center gap-1 rounded-md border border-[#D8E0EA] bg-white px-2 py-1.5 text-[10px] font-semibold text-[#1D2939] leading-tight"
                  >
                    <m.icon className="h-3 w-3 shrink-0 text-[#0D2645]" />
                    <span className="min-w-0 break-words">{m.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Novapex platform areas */}
        <div className="border-t border-[#D8E0EA] bg-white/70 px-4 py-3">
          <div className="mb-1.5 text-[9px] font-bold tracking-wider text-[#55627A]">
            NOVAPEX PLATFORM
          </div>
          <div className="flex flex-wrap gap-1.5">
            {productModules.map((m) => (
              <span
                key={m.label}
                className="inline-flex min-w-0 items-center gap-1 rounded-md border border-[#D8E0EA] bg-[#F7F9FC] px-2 py-1 text-[9px] font-medium text-[#55627A]"
              >
                <m.icon className="h-2.5 w-2.5 shrink-0 text-[#0D2645]" />
                <span className="min-w-0 break-words">{m.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating indicator chip - top left */}
      <div className="absolute -top-9 -left-6 hero-float glass-chip rounded-xl border border-[#0D2645] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF2FA]">
            <MessageSquareText className="h-3 w-3 text-[#0D2645]" />
          </span>
          <div>
            <p className="text-[11px] font-bold text-[#17263D] leading-none">
              Lead Captured
            </p>
            <p className="mt-0.5 text-[9px] text-[#55627A]">
              SI replied in 3s
            </p>
          </div>
        </div>
      </div>

      {/* Floating indicator chip - bottom right */}
      <div className="absolute -bottom-5 -right-5 hero-float hero-float-delay glass-chip rounded-xl border border-[#0D2645] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF2FA]">
            <CalendarCheck className="h-3 w-3 text-[#0D2645]" />
          </span>
          <div>
            <p className="text-[11px] font-bold text-[#17263D] leading-none">
              Appointment Booked
            </p>
            <p className="mt-0.5 text-[9px] text-[#55627A]">
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
