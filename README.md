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
| [Opportunity Council utility assistance](https://www.oppco.org/utilities/) | Its public page includes Island County and describes tracking programs, helping households assess fit, and completing/submitting applications. This substantially overlaps LumaLedger's energy follow-through hypothesis. |
| [Oak Harbor low-income utility rate FAQ](https://www.oakharbor.gov/FAQ.aspx?QID=189) | Describes 17% savings on water, sewer, and garbage with an application at Utilities at City Hall; its [online bill-payment route](https://www.oakharbor.gov/348/Pay-Utility-Bill-Online) is separate. This suggests a question to test about access, not a verified friction or unmet need. |
| [DOE LEAD](https://www.energy.gov/cmei/scep/low-income-energy-affordability-data-lead-tool) | Geographic/community energy-burden planning data, not a household eligibility determination. |
| [Rewiring America calculator](https://homes.rewiringamerica.org/calculator) | A calculator focused on potential electrification-upgrade savings, a distinct adjacent use case. |

**Positioning status—not a verified market gap or defensibility claim:** For Island County energy assistance, Opportunity Council already describes program tracking, program-fit guidance, and application completion/submission; this substantially undermines LumaLedger's proposed energy follow-through differentiation. Water-bill affordability is only a candidate for further discovery: Oak Harbor describes an existing low-income rate with an in-person application, while DOH and Opportunity Council route customers to their utilities/211. This may justify testing whether residents can find and complete existing steps, but no friction or unmet need is established. Do not claim LumaLedger is first, unique, or a substitute for established eligibility tools, provider support, or utility programs.

These are a concise comparison of the cited public product pages, not an exhaustive competitor study. Capabilities can change; recheck source pages before relying on the comparison in external materials.

See [DISCOVERY.md](DISCOVERY.md) for the proposed consent-first two-week discovery protocol, neutral interview guides, privacy safeguards, measures, and continue/pivot/stop criteria. No discovery interviews or outreach have been conducted; user approval is required before contacting or recruiting anyone.

The initial discovery scope is Island County, as selected by the user. No specific city, water system, utility territory, tribal/community provider, or participant group is selected. See [DISCOVERY.md](DISCOVERY.md) for the dated source audit, limitations, and next validation steps.
