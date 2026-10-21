"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const indexHtml = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const appJs = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const readme = fs.readFileSync(path.join(__dirname, "..", "README.md"), "utf8");
const discovery = fs.readFileSync(path.join(__dirname, "..", "DISCOVERY.md"), "utf8");

test("prominently routes households to existing 211 and LIHEAP tools", () => {
  const routeStart = indexHtml.indexOf('<div class="existing-routes"');
  const routeEnd = indexHtml.indexOf('<div class="snapshot-divider">', routeStart);
  assert.notEqual(routeStart, -1, "existing help routes section should appear in the snapshot");
  assert.notEqual(routeEnd, -1, "help routes should precede the snapshot divider");
  const routeSection = indexHtml.slice(routeStart, routeEnd);
  assert.match(routeSection, /https:\/\/www\.211\.org\/get-help\/utilities-expenses/);
  assert.match(routeSection, /https:\/\/liheapch\.acf\.gov\/eligibility-tool/);
  assert.match(routeSection, /https:\/\/liheapch\.acf\.gov\/search-tool/);
  assert.match(routeSection, /does not send your information/);
});

test("provides an accessible income period control and explains annual normalization", () => {
  assert.match(indexHtml, /<label for="income-period">Income frequency<\/label>/);
  assert.match(indexHtml, /<select[^>]+id="income-period"[^>]+name="incomePeriod"/);
  assert.match(indexHtml, /<option value="monthly" selected>Monthly<\/option>/);
  assert.match(indexHtml, /<option value="annual">Annual<\/option>/);
  assert.match(indexHtml, /id="income-period"[^>]+aria-describedby="income-hint"/);
  assert.match(indexHtml, /annual amounts are divided by 12 for the monthly calculation/i);
  assert.match(appJs, /normalizeIncomeToMonthly\(income, incomePeriod\)/);
  assert.match(appJs, /Annual income of " \+ amount\(income\) \+ " ÷ 12 = "/);
  assert.match(appJs, /" monthly equivalent"/);
});

test("documents dated adjacent solutions and explicitly provisional positioning", () => {
  assert.match(readme, /Source pages checked October 20, 2026/);
  assert.match(readme, /https:\/\/www\.findhelp\.org\//);
  assert.match(readme, /https:\/\/www\.211\.org\/get-help\/utilities-expenses/);
  assert.match(readme, /https:\/\/liheapch\.acf\.gov\/search-tool/);
  assert.match(readme, /https:\/\/liheapch\.acf\.gov\/eligibility-tool/);
  assert.match(readme, /updated February 5, 2026/);
  assert.match(readme, /https:\/\/www\.energy\.gov\/cmei\/scep\/low-income-energy-affordability-data-lead-tool/);
  assert.match(readme, /https:\/\/homes\.rewiringamerica\.org\/calculator/);
  assert.match(readme, /https:\/\/www\.dollarenergy\.org\/business-services\//);
  assert.match(readme, /https:\/\/www\.promise-pay\.com\/product\/promise-benefits/);
  assert.match(readme, /https:\/\/www\.phila\.gov\/services\/water-gas-utilities\/pay-or-dispute-a-water-bill\/water-bill-customer-assistance\//);
  assert.match(readme, /https:\/\/www\.epa\.gov\/waterfinancecenter\/water-affordability-needs-assessment/);
  assert.match(readme, /Positioning status—not a verified market gap or defensibility claim/);
  assert.match(readme, /not a defensible differentiator as currently framed/);
  assert.match(readme, /Before conducting any real-world pilot, obtain informed consent/);
});

test("does not claim LumaLedger is first or unique in public-facing page copy", () => {
  const publicMarkup = indexHtml.replace(/<!--[\s\S]*?-->/g, "");
  assert.doesNotMatch(publicMarkup, /\b(?:first ever|the only|unique platform|only platform)\b/i);
});

test("discovery brief includes dated sources, research safeguards, and decision gates", () => {
  for (const heading of [
    "Dated adjacent-solutions map",
    "Unknowns to resolve",
    "Falsifiable hypothesis",
    "Proposed two-week discovery plan",
    "Neutral interview guides",
    "Consent, privacy, and safety constraints",
    "Metrics and decision gates",
    "Limits and source record"
  ]) {
    assert.ok(discovery.includes("## " + heading), "missing section: " + heading);
  }
  for (const source of [
    "https://www.findhelp.org/",
    "https://www.211.org/get-help/utilities-expenses",
    "https://wa211.org/",
    "https://liheapch.acf.gov/search-tool",
    "https://liheapch.acf.gov/eligibility-tool",
    "https://liheapch.acf.gov/state",
    "https://www.commerce.wa.gov/community-opportunities/liheap/",
    "https://fortress.wa.gov/com/liheappublic/map.aspx",
    "https://www.commerce.wa.gov/energy-policy/energy-assistance/",
    "https://app.leg.wa.gov/rcw/default.aspx?cite=19.405.120",
    "https://www.oppco.org/utilities/",
    "https://doh.wa.gov/community-and-environment/drinking-water/water-system-assistance/customer-assistance-program",
    "https://www.islandcountywa.gov/685/Financial-Assistance",
    "https://www.oakharbor.gov/FAQ.aspx?QID=189",
    "https://www.oakharbor.gov/347/Low-Income-Discount-Program",
    "https://www.oakharbor.gov/343/Utility-Billing",
    "https://www.oakharbor.gov/348/Pay-Utility-Bill-Online",
    "https://www.oakharbor.gov/DocumentCenter/View/4708/Oak-Harbor-2027-28-Budget-Book-V2-test",
    "https://www.oakharbor.gov/710/Financial-Reports",
    "https://www.dollarenergy.org/business-services/",
    "https://www.promise-pay.com/product/promise-benefits",
    "https://www.phila.gov/services/water-gas-utilities/pay-or-dispute-a-water-bill/water-bill-customer-assistance/",
    "https://cap.phila.gov/",
    "https://www.epa.gov/waterfinancecenter/water-affordability-needs-assessment",
    "https://www.epa.gov/waterfinancecenter/water-affordability-case-studies",
    "https://www.nrdc.org/resources/turn-the-tap",
    "https://www.puc.pa.gov/press-release/2024/puc-collaborates-with-department-of-human-services-for-liheap-data-sharing-to-increase-customer-program-efficiencies-and-enrollment",
    "https://www.spotlightpa.org/news/2026/09/pennsylvania-automatic-enrollment-assistance-data-sharing-energy/",
    "https://acf.gov/ocs/programs/lihwap",
    "https://www.energy.gov/cmei/scep/low-income-energy-affordability-data-lead-tool",
    "https://homes.rewiringamerica.org/calculator"
  ]) {
    assert.ok(discovery.includes(source), "missing discovery source: " + source);
  }
  assert.match(discovery, /October 20, 2026/);
  assert.match(discovery, /No Washington household or navigator interviews, recruitment, pilot, or outreach have been conducted/);
  assert.match(discovery, /Washington State/);
  assert.match(discovery, /Island County, Washington, selected by the user/);
  assert.match(discovery, /no city, water system, utility territory, or participant group is selected/i);
  assert.match(discovery, /Island County source audit \(October 20, 2026\)/);
  assert.match(discovery, /Within the user-selected Island County scope/);
  assert.match(discovery, /None of this proves that user-facing referral handoffs or application completion are broken, effective, or changing in Washington/);
  assert.match(discovery, /over 17,000 resource listings/);
  assert.match(discovery, /RCW 19\.405\.120 requires utility participation-rate\/funding assessments against estimated need/);
  assert.match(discovery, /not proof of a user-facing participation or follow-through gap/);
  assert.match(discovery, /Washington Commerce provides verified official LIHEAP guidance and a public local-provider locator/);
  assert.match(discovery, /substantially undermines LumaLedger's current cross-service energy follow-through hypothesis/);
  assert.match(discovery, /substantially undermined, not validated/);
  assert.match(discovery, /There is a real national water-affordability issue, but EPA estimates do not establish unmet demand in Oak Harbor/);
  assert.match(discovery, /does not establish that no other assistance exists/);
  assert.match(discovery, /17% savings on water, sewer, and garbage/);
  assert.match(discovery, /application at Utilities at City Hall/);
  assert.match(discovery, /20-gallon trash-cart charges/);
  assert.match(discovery, /latest filed income-tax return and proof of income/);
  assert.match(discovery, /report changes in financial circumstances/);
  assert.match(discovery, /renew annually/);
  assert.match(discovery, /Finance Director approval/);
  assert.match(discovery, /865 SE Barrington Drive/);
  assert.match(discovery, /does not establish an in-person-only application process/);
  assert.match(discovery, /once program data is built into the City's new ERP/);
  assert.match(discovery, /not evidence that discount records are absent or untracked/);
  assert.match(discovery, /audited reports through 2023/);
  assert.match(discovery, /12\.1–19\.2 million/);
  assert.match(discovery, /\$5\.1–\$8\.8 billion/);
  assert.match(discovery, /small utilities may lack administrative capacity or a customer base/);
  assert.match(discovery, /underrepresent very small, rural, and Tribal systems/);
  assert.match(discovery, /hardship funds, CAPs, discounts, and arrearage-forgiveness programs/);
  assert.match(discovery, /AI-driven proactive outreach, income and identity verification, eligibility determination, and self-service/);
  assert.match(discovery, /one application for multiple assistance programs, online or by mail, with partner-assisted completion/);
  assert.match(discovery, /Seattle Public Utilities' data-sharing, automatic-enrollment, and interagency collaboration/);
  assert.match(discovery, /San Antonio's unified application/);
  assert.match(discovery, /consent-based LIHEAP data sharing/);
  assert.match(discovery, /22–23% of estimated eligible customers/);
  assert.match(discovery, /not an Oak Harbor water-program denominator or local take-up estimate/);
  assert.match(discovery, /This coverage is not exhaustive/);
  assert.match(discovery, /returned an access error in this review/);
  assert.match(discovery, /small-utility administrative burden is a candidate for validation/i);
  assert.match(discovery, /not a defensible differentiator as currently framed/);
  assert.match(discovery, /Do not turn this evidence into an AI product claim/);
  assert.match(discovery, /ACF's LIHWAP page is cited as stating that LIHWAP funding is no longer available/);
  assert.match(discovery, /returned an access challenge/);
  assert.match(discovery, /No local need or unmet demand has been demonstrated/);
  assert.match(discovery, /returned 404/);
  assert.match(discovery, /Do not contact or recruit anyone without the user's prior approval/);
  assert.match(discovery, /Continue to a separately approved pilot only if/);
  assert.match(discovery, /directional improvement of at least 2 of 8 participants in correctly identifying an applicable next step/);
  assert.match(discovery, /\*\*Pivot\*\*/);
  assert.match(discovery, /\*\*Stop the current concept\*\*/);
});
