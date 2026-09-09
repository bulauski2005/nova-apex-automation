import React, { Fragment } from "react";
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
  { label: "NEW PATIENT LEAD", icon: UserPlus, accent: "#3b82f6" },
  { label: "AI CONVERSATION", icon: MessagesSquare, accent: "#5FE1EE" },
  { label: "PATIENT QUALIFICATION", icon: ClipboardCheck, accent: "#a78bfa" },
  { label: "APPOINTMENT", icon: CalendarCheck, accent: "#3b82f6" },
  { label: "SMS CONFIRMATION", icon: MessageSquareText, accent: "#5FE1EE" },
  { label: "PRACTICE SYSTEM", icon: Building2, accent: "#a78bfa" },
  { label: "FOLLOW-UP", icon: RefreshCw, accent: "#3b82f6" },
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

export default function HeroVisualization() {
  return (
    <div className="relative">
      {/* Ambient glow behind the panel */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#3b82f6]/25 via-[#a78bfa]/10 to-[#5FE1EE]/20 blur-2xl" />

      {/* Main product console panel */}
      <div className="relative overflow-hidden rounded-2xl border border-[#1e2d45] bg-card shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm">
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

        <div className="grid gap-4 p-4 sm:grid-cols-2">
          {/* Left column: AI intelligence + workflow */}
          <div className="space-y-4">
            {/* AI Intelligence */}
            <div className="rounded-xl border border-[#3b82f6]/25 bg-[#0a1420]/70 p-3">
              <div className="mb-2.5 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#5FE1EE]" />
                <span className="text-[10px] font-bold tracking-wider text-white">
                  AI INTELLIGENCE
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {intelligenceSteps.map((step, i) => (
                  <Fragment key={step}>
                    <span className="rounded-md border border-[#3b82f6]/40 bg-card px-2 py-1 text-[10px] font-semibold text-[#e8eefc] shadow-[0_0_14px_rgba(59,130,246,0.25)]">
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
            <div className="rounded-xl border border-[#1e2d45] bg-[#0a1420]/70 p-3">
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
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#3b82f6] via-[#5FE1EE] to-[#a78bfa] opacity-40 hero-line-flow" />
                <div className="space-y-2.5">
                  {workflowSteps.map((step, i) => (
                    <div
                      key={step.label}
                      className="relative flex items-center gap-3"
                    >
                      <span
                        className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#5FE1EE]/50 bg-card hero-node-glow"
                        style={{ animationDelay: `${i * 0.45}s` }}
                      >
                        <step.icon
                          className="h-3 w-3"
                          style={{ color: step.accent }}
                        />
                      </span>
                      <span className="text-[11px] font-semibold tracking-wide text-[#e8eefc]">
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
            <div className="rounded-xl border border-[#1e2d45] bg-[#0a1420]/70 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-white">
                  AUTOMATION ACTIVITY
                </span>
                <span className="rounded border border-[#1e2d45] px-1.5 py-0.5 text-[8px] font-semibold tracking-wider text-[#7d8faa]">
                  DEMO
                </span>
              </div>
              <div className="flex h-16 items-end gap-1.5">
                {activityData.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-[#3b82f6] to-[#5FE1EE] hero-bar-pulse"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#1e2d45] bg-[#0a1420]/70 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-white">
                  APPOINTMENT ACTIVITY
                </span>
                <span className="rounded border border-[#1e2d45] px-1.5 py-0.5 text-[8px] font-semibold tracking-wider text-[#7d8faa]">
                  DEMO
                </span>
              </div>
              <div className="flex h-16 items-end gap-1.5">
                {appointmentData.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-[#a78bfa] to-[#5FE1EE] hero-bar-pulse"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.3 + 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Connected modules */}
            <div className="rounded-xl border border-[#1e2d45] bg-[#0a1420]/70 p-3">
              <div className="mb-2 text-[10px] font-bold tracking-wider text-white">
                CONNECTED MODULES
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {modules.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#1e2d45] bg-card px-2 py-1.5 text-[10px] font-semibold text-[#c3d2e8]"
                  >
                    <m.icon className="h-3 w-3 text-[#5FE1EE]" />
                    {m.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Novapex platform areas */}
        <div className="border-t border-[#1e2d45] bg-[#0a1420]/80 px-4 py-3">
          <div className="mb-1.5 text-[9px] font-bold tracking-wider text-[#7d8faa]">
            NOVAPEX PLATFORM
          </div>
          <div className="flex flex-wrap gap-1.5">
            {productModules.map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center gap-1 rounded-md border border-[#1e2d45] bg-card/70 px-2 py-1 text-[9px] font-medium text-[#8fa3bd]"
              >
                <m.icon className="h-2.5 w-2.5 text-[#3b82f6]" />
                {m.label}
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
      <div className="absolute -bottom-5 -right-2 md:-right-5 hero-float hero-float-delay rounded-xl border border-[#3b82f6]/30 bg-card/90 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3b82f6]/20">
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
  );
}