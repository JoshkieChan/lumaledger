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

**Source pages checked October 20, 2026.** Existing tools already cover important parts of this journey:

| Service | Existing capability relevant to energy affordability |
| --- | --- |
| [Findhelp](https://www.findhelp.org/) | Local social-service discovery and organization-facing closed-loop referrals. |
| [211 utilities assistance](https://www.211.org/get-help/utilities-expenses) | Utility-expense help guidance and a way to reach the 211 network for referrals. |
| [HHS LIHEAP Clearinghouse office search](https://liheapch.acf.gov/search-tool) | State, territory, and tribal office lookup for LIHEAP services, including bill, weatherization, and crisis assistance. |
| [HHS LIHEAP Eligibility Tool](https://liheapch.acf.gov/eligibility-tool) | Official eligibility information; the page says updated February 5, 2026. Rules vary by state and household size, income, and other benefits. Confirm with the relevant office. |
| [Opportunity Council utility assistance](https://www.oppco.org/utilities/) | Its public page includes Island County and describes tracking programs, helping households assess fit, and completing/submitting applications. This substantially overlaps LumaLedger's energy follow-through hypothesis. |
| [Oak Harbor Low Income Discount Program](https://www.oakharbor.gov/347/Low-Income-Discount-Program) | Provides a 17% reduction on water, sewer, and 20-gallon trash-cart charges, subject to Finance Director approval, income documentation, reporting changes, and annual renewal. The application is returned to the Utility office; the FAQ says customers may come in to fill it out and Utilities can be called. Public guidance does not establish an in-person-only process or a local take-up gap. |
| [Dollar Energy Fund](https://www.dollarenergy.org/business-services/) | Offers assistance-program administration and licensed/custom software for hardship funds, CAPs, discounts, and arrearage forgiveness. |
| [Promise.Benefits](https://www.promise-pay.com/product/promise-benefits) | Advertises end-to-end program management, proactive outreach, income/identity verification, eligibility determination, and self-service. |
| [Philadelphia Water Customer Assistance](https://www.phila.gov/services/water-gas-utilities/pay-or-dispute-a-water-bill/water-bill-customer-assistance/) | Uses one application for multiple assistance programs, with online/mail and partner-assisted completion and supporting-document workflows. |
| [EPA Water Affordability Needs Assessment](https://www.epa.gov/waterfinancecenter/water-affordability-needs-assessment) | Estimates 12.1–19.2 million U.S. households lack affordable water access and notes small-utility capacity and data limitations. This national evidence does not establish Oak Harbor demand. |
| [DOE LEAD](https://www.energy.gov/cmei/scep/low-income-energy-affordability-data-lead-tool) | Geographic/community energy-burden planning data, not a household eligibility determination. |
| [Rewiring America calculator](https://homes.rewiringamerica.org/calculator) | A calculator focused on potential electrification-upgrade savings, a distinct adjacent use case. |

**Positioning status—not a verified market gap or defensibility claim:** For Island County energy assistance, Opportunity Council already describes program tracking, program-fit guidance, and application completion/submission. More broadly, established operators, software, and public water-assistance workflows already address discovery, administration, eligibility, and enrollment. LumaLedger's household discovery/checklist concept is not a defensible differentiator as currently framed. Small-utility administrative burden is a candidate for validation, not a proven need or local product wedge; no Oak Harbor take-up gap or unmet demand has been demonstrated. EPA's national estimates and Pennsylvania energy-assistance figures are not local water evidence. Do not position an AI product claim or claim LumaLedger is first, unique, or a substitute for existing tools and provider support.

These are a concise comparison of the cited public product pages, not an exhaustive competitor study. Capabilities can change; recheck source pages before relying on the comparison in external materials.

See [DISCOVERY.md](DISCOVERY.md) for the proposed consent-first two-week discovery protocol, neutral interview guides, privacy safeguards, measures, and continue/pivot/stop criteria. No discovery interviews or outreach have been conducted; user approval is required before contacting or recruiting anyone.

The initial discovery scope is Island County, as selected by the user. No specific city, water system, utility territory, tribal/community provider, or participant group is selected. See [DISCOVERY.md](DISCOVERY.md) for the dated source audit, limitations, and next validation steps.
