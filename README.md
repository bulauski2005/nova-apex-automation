# Novapex Automation

**SI-Powered Automation for Modern Dental Practices**

Novapex Automation is an SI-powered dental practice automation platform designed to streamline patient engagement, lead management, scheduling, communication, and administrative workflows.

The platform helps dental practices respond faster, capture more opportunities, reduce repetitive administrative work, and deliver a more consistent patient experience—without adding additional unnecessary workloads to clinical staff.

## What It Does

Novapex Automation brings intelligent automation into the key stages of the patient journey, including:

* **SI Website Assistant** — Engages website visitors, answers common questions, and helps convert inquiries into appointments.
* **Missed Call Recovery** — Automatically follows up with callers when staff are unavailable.
* **Lead Engagement** — Responds to new website inquiries and helps move prospects toward scheduling.
* **Automated Scheduling** — Connects patient conversations with appointment-booking workflows.
* **Patient Communication** — Automates confirmations, reminders, follow-ups, and other routine communications.
* **SI-Powered Workflows** — Automate repetitive administrative processes to reduce manual workloads.
* **CRM & Practice Management Integration** — Designed to connect automation workflows with the systems practices already use.
* **Intelligent Follow-Up** — Helps practices stay engaged with prospective and existing patients without relying entirely on manual staff follow-up.

## Technology

The platform incorporates modern web technologies, SI services, automation platforms, APIs, and cloud infrastructure to create flexible, scalable business workflows.

Core technologies and services include:

* SI / Large Language Models
* n8n workflow automation
* Conversational SI
* API integrations
* Typebot
* Chatbase
* GitHub
* Vercel
* Modern web technologies
* Automated email and messaging services

## Our Mission

Dental practices should be able to focus on providing exceptional patient care rather than spending valuable staff time managing repetitive administrative tasks.

Novapex Automation combines **SI, automation, and intelligent workflow design** to help practices operate more efficiently while creating faster, more responsive patient experiences.

**Automate more. Respond faster. Grow smarter.**

## Design System - "Nova Sapphire"

All colour is defined in `client/src/index.css`. Reference the tokens (or the Tailwind utilities they generate) instead of pasting raw hex values into components. Contrast figures below are measured WCAG ratios.

**Brand / ink** - deep navy, for headings and dark bands

| Token | Hex | Use |
| --- | --- | --- |
| `--ink-950` | `#081B31` | footer wash, deepest gradient stop |
| `--ink-900` | `#0D2645` | brand mark, dark section gradients, ambient glows |
| `--ink-800` | `#17263D` | headings and primary text (15.2:1 on white) |

**Action** - sapphire, the only colour for something clickable

| Token | Hex | Use |
| --- | --- | --- |
| `--primary` | `#1F5AA8` | buttons, links, active nav, focus ring (6.8:1 with white text) |
| `--primary-hover` | `#1B4F8A` | hover/active state of the above (8.3:1) |
| `--primary-tint` | `#EAF2FA` | tinted chips and surfaces behind primary text |

**Signal** - indigo, reserved for SI and live state

| Token | Hex | Use |
| --- | --- | --- |
| `--signal` | `#5B5BD6` | live dots and AI glyphs (5.4:1 with white) |
| `--signal-strong` | `#4F46C9` | emphasis on signal surfaces (6.9:1) |
| `--signal-tint` | `#EEEEFC` | badge and chip background |
| `--signal-foreground` | `#3B3BB0` | text on the signal tint (7.5:1) |

**Neutral**

| Token | Hex | Use |
| --- | --- | --- |
| `--background`, `--card` | `#FFFFFF` | page and card surfaces |
| `--secondary` | `#F7F9FC` | alternating section bands |
| `--muted` | `#EAF2FA` | muted panels and chat bubbles |
| `--foreground` | `#1D2939` | body copy (14.7:1) |
| `--muted-foreground` | `#55627A` | captions and secondary copy (6.2:1) |
| `--border` | `#D8E0EA` | card, table and divider edges (1.33:1) |
| `--border-strong`, `--input` | `#8593A6` | inputs and outline buttons (3.12:1, SC 1.4.11) |

**Semantic**

| Token | Hex | Use |
| --- | --- | --- |
| `--success` | `#0F7B5F` | confirmations, completed automation (5.2:1 with white) |
| `--warning` | `#B45309` | attention, pending work (5.0:1) |
| `--info` | `#175CD3` | neutral system notices (6.0:1) |
| `--destructive` | `#B42318` | errors and destructive actions (6.6:1) |

Each semantic colour has a tint for message backgrounds (`--success-tint` `#EAF6F1`, `--destructive-tint` `#FDEEEC`).

**Data viz** - one hue, even lightness steps: `#0D2645` -> `#16456F` -> `#1F5AA8` -> `#5C9FE0` -> `#A8C8E6` (`--chart-1` to `--chart-5`). Use this ramp for magnitude; reserve amber `#B45309` for a single exception series.

**House rules**

1. Sapphire means action, navy means brand, indigo means live. Do not swap them.
2. `--border` is for structure, `--border-strong` is for anything clickable. A subtle border on an input fails SC 1.4.11.
3. Signal and primary differ mainly in hue (1.27:1 luminance), so never place them side by side as two meanings to compare.
4. Keep body copy at `--muted-foreground` or darker; lighter greys fall below 4.5:1.
5. Dark mode is the same system, not a second palette: it lives in `.dark`, flips primary to `#5C9FE0` on a `#0A1420` canvas, and must stay cool-toned.

© Novapex Automation
