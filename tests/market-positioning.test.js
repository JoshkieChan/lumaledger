"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const indexHtml = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
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

test("documents dated adjacent solutions and explicitly provisional positioning", () => {
  assert.match(readme, /Source pages checked October 19, 2026/);
  assert.match(readme, /https:\/\/www\.findhelp\.org\//);
  assert.match(readme, /https:\/\/www\.211\.org\/get-help\/utilities-expenses/);
  assert.match(readme, /https:\/\/liheapch\.acf\.gov\/search-tool/);
  assert.match(readme, /https:\/\/liheapch\.acf\.gov\/eligibility-tool/);
  assert.match(readme, /updated February 5, 2026/);
  assert.match(readme, /https:\/\/www\.energy\.gov\/cmei\/scep\/low-income-energy-affordability-data-lead-tool/);
  assert.match(readme, /https:\/\/homes\.rewiringamerica\.org\/calculator/);
  assert.match(readme, /Positioning status—not a verified market gap or defensibility claim/);
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
    "https://www.oakharbor.gov/348/Pay-Utility-Bill-Online",
    "https://acf.gov/ocs/programs/lihwap",
    "https://www.energy.gov/cmei/scep/low-income-energy-affordability-data-lead-tool",
    "https://homes.rewiringamerica.org/calculator"
  ]) {
    assert.ok(discovery.includes(source), "missing discovery source: " + source);
  }
  assert.match(discovery, /October 19, 2026/);
  assert.match(discovery, /No Washington household or navigator interviews, recruitment, pilot, or outreach have been conducted/);
  assert.match(discovery, /Washington State/);
  assert.match(discovery, /Island County, Washington, selected by the user/);
  assert.match(discovery, /no city, water system, utility territory, or participant group is selected/i);
  assert.match(discovery, /Island County source audit \(October 19, 2026\)/);
  assert.match(discovery, /Within the user-selected Island County scope/);
  assert.match(discovery, /None of this proves that user-facing referral handoffs or application completion are broken, effective, or changing in Washington/);
  assert.match(discovery, /over 17,000 resource listings/);
  assert.match(discovery, /RCW 19\.405\.120 requires utility participation-rate\/funding assessments against estimated need/);
  assert.match(discovery, /not proof of a user-facing participation or follow-through gap/);
  assert.match(discovery, /Washington Commerce provides verified official LIHEAP guidance and a public local-provider locator/);
  assert.match(discovery, /substantially undermines LumaLedger's current cross-service energy follow-through hypothesis/);
  assert.match(discovery, /substantially undermined, not validated/);
  assert.match(discovery, /Water-bill affordability is only a \*\*candidate question for further validation\*\*, not a proven gap/);
  assert.match(discovery, /does not establish that no other assistance exists/);
  assert.match(discovery, /17% savings on water, sewer, and garbage/);
  assert.match(discovery, /application at Utilities at City Hall/);
  assert.match(discovery, /testable access\/discovery friction question/);
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
