# LumaLedger MVP

A dependency-free, client-side demo for understanding a household's monthly energy bill relative to income and finding evidence-linked starting points.

## Run

Open `index.html` in a modern browser. No build step, account, API key, or server is required.

## Test

With Node.js installed, run:

```sh
npm test
```

## Privacy and scope

Calculator inputs, checklist progress, and optional outcome follow-up remain only in the current page's client-side memory. Nothing is submitted, uploaded, or persisted; leaving or resetting the page clears the entered values. No household, utility, provider, or program is contacted, and this app does not submit applications or data to external services. External links open only when the user chooses to follow them.

The optional ZIP code is not used for a lookup. The demo does not perform live research, identify local programs, decide eligibility, or promise savings. Its recommendations are general starting points linked to U.S. Department of Energy and ACEEE resources. Contact, application, support, and before/after bill outcomes are user-reported only, not verified; a bill difference does not establish causation.

## Pilot validation protocol

Before conducting any real-world pilot, obtain informed consent and an approved study plan. The interface does not recruit participants or contact anyone. With willing participants, validate whether people understand the calculation, can find a relevant next step, and can mark progress without assistance. Track aggregate funnel completion, action checklist completion, self-reported contacted/applied/received-support counts, optional bill comparison direction and missingness, task completion, and confusion. Keep self-reported outcomes distinct from verified outcomes; do not claim causal savings. Target zero collection or transmission of household inputs and do not retain raw bills, income, or ZIP codes in pilot notes.

## Adjacent solutions and positioning hypothesis

**Source pages checked October 19, 2026.** Existing tools already cover important parts of this journey:

| Service | Existing capability relevant to energy affordability |
| --- | --- |
| [Findhelp](https://www.findhelp.org/) | Local social-service discovery and organization-facing closed-loop referrals. |
| [211 utilities assistance](https://www.211.org/get-help/utilities-expenses) | Utility-expense help guidance and a way to reach the 211 network for referrals. |
| [HHS LIHEAP Clearinghouse office search](https://liheapch.acf.gov/search-tool) | State, territory, and tribal office lookup for LIHEAP services, including bill, weatherization, and crisis assistance. |
| [HHS LIHEAP Eligibility Tool](https://liheapch.acf.gov/eligibility-tool) | Official eligibility information; the page says updated February 5, 2026. Rules vary by state and household size, income, and other benefits. Confirm with the relevant office. |
| [DOE LEAD](https://www.energy.gov/cmei/scep/low-income-energy-affordability-data-lead-tool) | Geographic/community energy-burden planning data, not a household eligibility determination. |
| [Rewiring America calculator](https://homes.rewiringamerica.org/calculator) | A calculator focused on potential electrification-upgrade savings, a distinct adjacent use case. |

**Testable positioning hypothesis—not a verified market gap or defensibility claim:** directories and established services already help people discover resources and referrals. LumaLedger's potential wedge is household-controlled follow-through across those existing resources, with an optional checklist and self-reported outcome measurement. Keep that positioning only if a consented pilot shows better action completion or follow-through than a suitable baseline. Do not claim LumaLedger is first, unique, or a substitute for established eligibility tools and referral networks.

These are a concise comparison of the cited public product pages, not an exhaustive competitor study. Capabilities can change; recheck source pages before relying on the comparison in external materials.

See [DISCOVERY.md](DISCOVERY.md) for the proposed consent-first two-week discovery protocol, neutral interview guides, privacy safeguards, measures, and continue/pivot/stop criteria. No discovery interviews or outreach have been conducted; user approval is required before contacting or recruiting anyone.

The initial discovery scope is Washington State, as selected by the user. No Washington county, city, tribal service area, or utility territory has been selected; local coverage and provider workflows remain unverified pending official validation.
