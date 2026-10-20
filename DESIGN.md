---
name: LumaLedger
description: A private, transparent energy-burden calculator for household next steps.
colors:
  paper: "#f4f6f0"
  surface: "#ffffff"
  field: "#f8faf6"
  ink: "#18251f"
  muted: "#5f6d64"
  line: "#d9e0d7"
  green: "#205c45"
  green-dark: "#174b38"
  green-soft: "#e5f0e6"
  orange: "#c45c32"
  orange-soft: "#f8e8dc"
typography:
  display:
    fontFamily: "Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(36px, 4.6vw, 58px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.065em"
  body:
    fontFamily: "Segoe UI, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  chip: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "24px"
  section: "32px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.surface}"
    rounded: "{rounded.chip}"
    padding: "0 17px"
    height: "46px"
---

# Design System: LumaLedger

## Overview

**Creative North Star: The Household Field Ledger**

LumaLedger treats energy costs as something a household can inspect and act on, not as a score or a promise of assistance. Its visual language pairs a steady field-green with paper-like working surfaces, precise dividers, and plain-language evidence. The experience is calm enough for a practical household task while keeping the next action easy to find.

The page moves from household inputs to visible arithmetic, then to cautious next steps and their sources. Every recommendation stays general; the interface does not simulate a local lookup, eligibility decision, or live agent.

**Key Characteristics:**
- Ledger-like divisions instead of nested card stacks.
- Field green for action and navigation; orange marks required inputs and ordered steps.
- Direct language, visible provenance, and explicit privacy boundaries.

## Colors

The palette is restrained: quiet green-tinted paper and fields support a single green action color, with orange reserved for attention.

### Primary
- **Field Green** (#205c45): Main actions, emphasis, and source links.
- **Deep Green** (#174b38): High-contrast headings and stronger green text.

### Secondary
- **Signal Orange** (#c45c32): Required markers and numbered action cues; use sparingly.

### Neutral
- **Ledger Paper** (#f4f6f0): Page background.
- **Working Surface** (#ffffff): Calculator input surface.
- **Field Surface** (#f8faf6): Inputs and result panel.
- **Ink** (#18251f): Primary text.
- **Measured Muted** (#5f6d64): Supporting copy.
- **Rule Line** (#d9e0d7): Dividers and panel boundaries.
- **Green Wash** (#e5f0e6): Quiet emphasis and status backgrounds.
- **Orange Wash** (#f8e8dc): Supporting orange tint.

### Named Rules
**The Evidence Before Assurance Rule.** Never use the palette to imply eligibility, savings, urgency, or a program match that the product has not verified.

## Typography

**Display Font:** Segoe UI (with system-ui, sans-serif fallback)

**Body Font:** Segoe UI (with system-ui, sans-serif fallback)

**Character:** System typography keeps a financial-adjacent task familiar and quick to read. Large, tightly tracked headlines contrast with small uppercase wayfinding labels and restrained supporting text.

### Hierarchy
- **Display** (700, clamp(36px, 4.6vw, 58px), 1.08): Opening statement, with tight negative tracking.
- **Headline** (700, 19–22px, 1.2–1.25): Panel and section headings.
- **Title** (700, 11–17px, 1.3): Recommendation and component titles.
- **Body** (400, 10–16px, 1.4–1.6): Instructions and explanatory copy; keep long reading copy near 65–75ch.
- **Label** (700, 8–10px, 1.3): Section wayfinding, field tags, and compact statuses; use tracking rather than a separate mono typeface.

## Layout

The desktop workbench is a two-column input/result split with a shared edge and a fine divider. It becomes a single-column flow below 820px, with the result following the form. At 600px and below, the form fields and source section stack; the four demo roles reflow into a two-column grid.

The page uses a centered 1240px maximum frame with 32px desktop gutters and 18px mobile gutters. Keep form labels adjacent to their controls, put more space above section headings than below, and use dividers to express relationships rather than placing every block in a card.

## Elevation & Depth

The surface is intentionally flat. Use tonal fields and precise one-pixel rules to establish working areas; do not add ambient shadows, floating cards, or glass effects.

## Shapes

Controls, borders, and chips use square corners. The circular meter illustration is a single authored motif, not a general component shape. Focus is shown with a clear orange outline and offset.

## Components

- **Primary action:** Solid field-green rectangle with a white label and directional arrow. Hover darkens the fill and lifts the control by one pixel; retain a strong keyboard focus outline.
- **Inputs:** Pale field surface with a one-pixel rule. Currency fields place the currency symbol within the same control boundary. Error text is explicit, adjacent, and programmatically associated.
- **Snapshot:** Put the calculation and formula before recommendations. When income is absent, show the bill and explain that no percentage was calculated.
- **Established service routes:** Surface direct links to relevant existing support and eligibility tools with a plain statement that LumaLedger does not forward household data or decide eligibility.
- **Recommendation journey:** Use an ordered list with orange indices, concise action titles, restrained evidence links, native checkboxes, and a text-plus-progress indicator for user-controlled completion.
- **Outcome follow-up:** Keep contacted, applied, and received-support selections optional and explicitly self-reported. Show before/after arithmetic as a comparison, never as verified or causal impact.
- **Demo roles:** Show role name, bounded behavior, and ready/completed demo state. Never imply a live model or research result.
- **Source links:** Keep provenance visible in the page and next to recommendations; distinguish community estimates from household decisions.
- **Pilot protocol:** Place consent requirements, aggregate metrics, and data-minimization guidance beside the experience; never imply that the demo recruits or contacts participants.

## Do's and Don'ts

- Do state what was calculated and show its arithmetic.
- Do preserve optionality for ZIP and housing details; neither is required to calculate the share.
- Do keep submitted, uploaded, or persisted household data out of the experience.
- Do keep checklist and outcome state in current-page memory only, with a clear reset action.
- Do identify before/after values and contact/application/support reports as self-reported and unverified.
- Do validate a pilot with consent, aggregate measures, and no raw household-data retention.
- Do label general program information and eligibility limits plainly.
- Don't infer local services or eligibility from a ZIP code.
- Don't present a percentage as an official burden classification or a promise of savings.
- Don't imply a reported bill change was caused by a checklist action.
- Don't contact households or providers, enroll participants, or submit applications or data.
- Don't add decorative gradients, rounded-card scaffolding, or unsupported live-agent activity.
