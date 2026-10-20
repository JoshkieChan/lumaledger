(function () {
  "use strict";

  var form = document.getElementById("calculator-form");
  var billInput = document.getElementById("monthly-bill");
  var incomeInput = document.getElementById("monthly-income");
  var zipInput = document.getElementById("zip-code");
  var housingInput = document.getElementById("housing");
  var billError = document.getElementById("bill-error");
  var incomeError = document.getElementById("income-error");
  var zipError = document.getElementById("zip-error");
  var emptyResult = document.getElementById("empty-result");
  var calculatedResult = document.getElementById("calculated-result");
  var recommendations = document.getElementById("recommendations");
  var journeyProgressText = document.getElementById("journey-progress-text");
  var journeyProgressBar = document.getElementById("journey-progress-bar");
  var outcomeForm = document.getElementById("outcome-form");
  var outcomeSummary = document.getElementById("outcome-summary");
  var outcomeError = document.getElementById("outcome-error");
  var actionIds = ["utility", "weatherization", "research"];
  var completedRoles = document.querySelectorAll(".agent-step");

  var sources = {
    weatherization: "https://www.energy.gov/cmei/scep/wap/weatherization-assistance-program-resource-hub",
    lead: "https://www.energy.gov/cmei/scep/low-income-energy-affordability-data-lead-tool",
    aceee: "https://www.aceee.org/resource/u2006/"
  };

  function clearErrors() {
    billError.textContent = "";
    incomeError.textContent = "";
    zipError.textContent = "";
    billInput.removeAttribute("aria-invalid");
    incomeInput.removeAttribute("aria-invalid");
    zipInput.removeAttribute("aria-invalid");
  }

  function amount(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2
    }).format(value);
  }

  function makeRecommendation(id, title, text, linkLabel, url) {
    var item = document.createElement("li");
    var heading = document.createElement("h3");
    var description = document.createElement("p");
    var checkLabel = document.createElement("label");
    var checkbox = document.createElement("input");
    var checkText = document.createElement("span");
    heading.textContent = title;
    checkbox.type = "checkbox";
    checkbox.className = "action-checkbox";
    checkbox.dataset.actionId = id;
    checkbox.setAttribute("aria-label", "Mark complete: " + title);
    checkText.textContent = "Done";
    checkLabel.className = "action-check";
    checkLabel.append(checkbox, checkText);
    description.appendChild(document.createTextNode(text + " "));
    if (linkLabel && url) {
      var link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = linkLabel;
      description.appendChild(link);
    }
    item.append(checkLabel, heading, description);
    return item;
  }

  function renderRecommendations(housing) {
    var previouslyCompleted = Array.from(recommendations.querySelectorAll(".action-checkbox:checked"))
      .map(function (checkbox) { return checkbox.dataset.actionId; });
    recommendations.replaceChildren();
    recommendations.append(
      makeRecommendation(
        "utility",
        "Explore existing utility-bill help routes.",
        "Compare the 211 utility-help and HHS LIHEAP routes above. Each maintains its own referrals and eligibility information.",
        null,
        null
      ),
      makeRecommendation(
        "weatherization",
        "Check how weatherization works where you live.",
        housing === "rent"
          ? "The program is administered locally; if you rent, ask your property manager about permission before pursuing home changes."
          : "Contact your state or local provider to learn about its process. This demo cannot determine eligibility.",
        "DOE WAP resource hub",
        sources.weatherization
      ),
      makeRecommendation(
        "research",
        "Use research for context, not a personal decision.",
        "LEAD shows community-level estimates, not household eligibility; ACEEE provides broader research on energy burden.",
        null,
        null
      )
    );
    var researchDescription = recommendations.lastElementChild.querySelector("p");
    [
      { label: "DOE LEAD", url: sources.lead },
      { label: "ACEEE research", url: sources.aceee }
    ].forEach(function (source, index) {
      if (index > 0) researchDescription.appendChild(document.createTextNode(" · "));
      var link = document.createElement("a");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = source.label;
      researchDescription.appendChild(link);
    });
    recommendations.querySelectorAll(".action-checkbox").forEach(function (checkbox) {
      checkbox.checked = previouslyCompleted.indexOf(checkbox.dataset.actionId) !== -1;
      checkbox.addEventListener("change", updateJourneyProgress);
    });
    updateJourneyProgress();
  }

  function updateJourneyProgress() {
    var completedIds = Array.from(recommendations.querySelectorAll(".action-checkbox:checked"))
      .map(function (checkbox) { return checkbox.dataset.actionId; });
    var progress = window.EnergyCalculator.calculateJourneyProgress(actionIds, completedIds);
    journeyProgressText.textContent = progress.completed + " of " + progress.total + " next steps marked done";
    journeyProgressBar.value = progress.completed;
    journeyProgressBar.max = progress.total;
  }

  function readOutcomes() {
    return {
      contacted: document.getElementById("outcome-contacted").checked,
      applied: document.getElementById("outcome-applied").checked,
      receivedSupport: document.getElementById("outcome-support").checked
    };
  }

  function clearOutcomeErrors() {
    document.getElementById("before-bill-error").textContent = "";
    document.getElementById("after-bill-error").textContent = "";
    document.getElementById("before-bill").removeAttribute("aria-invalid");
    document.getElementById("after-bill").removeAttribute("aria-invalid");
  }

  function renderOutcomeSummary(event) {
    if (event) event.preventDefault();
    clearOutcomeErrors();
    outcomeError.textContent = "";
    var beforeInput = document.getElementById("before-bill");
    var afterInput = document.getElementById("after-bill");
    var before = beforeInput.value === "" ? null : Number(beforeInput.value);
    var after = afterInput.value === "" ? null : Number(afterInput.value);
    var summary;

    try {
      summary = window.EnergyCalculator.summarizePilotOutcome(readOutcomes(), before, after);
    } catch (error) {
      if (before !== null && (!Number.isFinite(before) || before <= 0)) {
        document.getElementById("before-bill-error").textContent = "Enter an earlier monthly bill greater than $0.";
        beforeInput.setAttribute("aria-invalid", "true");
      }
      if (after !== null && (!Number.isFinite(after) || after < 0)) {
        document.getElementById("after-bill-error").textContent = "Enter a later monthly bill of $0 or more.";
        afterInput.setAttribute("aria-invalid", "true");
      }
      if (before === null || after === null) {
        outcomeError.textContent = "Enter both bills to compare them, or leave both blank.";
      } else if (!beforeInput.hasAttribute("aria-invalid") && !afterInput.hasAttribute("aria-invalid")) {
        throw error;
      }
      return;
    }

    var selectedOutcomes = [];
    if (summary.contacted) selectedOutcomes.push("Contacted a utility or provider");
    if (summary.applied) selectedOutcomes.push("Applied to a program");
    if (summary.receivedSupport) selectedOutcomes.push("Received support");
    var message = selectedOutcomes.length
      ? "Self-reported: " + selectedOutcomes.join("; ") + ". "
      : "No outcomes selected. ";

    if (summary.billChange) {
      var change = Math.abs(summary.billChange.monthlyDifference);
      var direction = summary.billChange.direction;
      message += "Self-reported monthly bill " + direction + " by " + amount(change) +
        " (" + Math.abs(summary.billChange.percentChange).toFixed(1) + "%), from " +
        amount(summary.billChange.beforeBill) + " to " + amount(summary.billChange.afterBill) + ".";
    } else {
      message += "No before/after bill comparison entered.";
    }
    outcomeSummary.textContent = message;
    outcomeSummary.hidden = false;
  }

  function resetJourney() {
    document.querySelectorAll(".action-checkbox").forEach(function (checkbox) {
      checkbox.checked = false;
    });
    if (outcomeForm) outcomeForm.reset();
    clearOutcomeErrors();
    outcomeError.textContent = "";
    outcomeSummary.textContent = "";
    outcomeSummary.hidden = true;
    updateJourneyProgress();
  }

  function clearOutcomeSummaryWhileEditing() {
    if (!outcomeSummary.hidden) {
      outcomeSummary.hidden = true;
      outcomeSummary.textContent = "";
    }
  }

  function updateWorkflow() {
    completedRoles.forEach(function (step) {
      step.classList.add("is-complete");
      step.querySelector(".agent-state").textContent = "COMPLETE · DEMO";
    });
  }

  function validateZip(value) {
    return value === "" || /^\d{5}$/.test(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearErrors();
    var valid = true;
    var bill = billInput.value === "" ? NaN : Number(billInput.value);
    var income = incomeInput.value === "" ? null : Number(incomeInput.value);

    if (!Number.isFinite(bill) || bill < 0) {
      billError.textContent = "Enter a monthly bill of $0 or more.";
      billInput.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (income !== null && (!Number.isFinite(income) || income <= 0)) {
      incomeError.textContent = "Enter income greater than $0, or leave this optional field blank.";
      incomeInput.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!validateZip(zipInput.value.trim())) {
      zipError.textContent = "Enter a 5-digit ZIP code or leave this optional field blank.";
      zipInput.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!valid) return;

    var snapshot = window.EnergyCalculator.calculateEnergyBurden(bill, income);
    var value = document.getElementById("burden-value");
    var label = document.getElementById("metric-label");
    var caption = document.getElementById("metric-caption");
    var formula = document.getElementById("formula-row");

    if (snapshot.burdenPercent === null) {
      label.textContent = "Monthly energy bill";
      value.textContent = amount(snapshot.monthlyBill);
      caption.textContent = "Add income any time to see the share.";
      formula.replaceChildren();
      formula.appendChild(document.createTextNode("Income not entered — percentage not calculated."));
    } else {
      label.textContent = "Share of monthly household income";
      value.textContent = "";
      var formattedPercent = document.createTextNode(snapshot.burdenPercent.toFixed(1));
      var percent = document.createElement("span");
      percent.textContent = "%";
      value.append(formattedPercent, percent);
      caption.textContent = "of the gross monthly income you entered goes to this bill.";
      formula.replaceChildren();
      [
        { text: amount(snapshot.monthlyBill), sign: "" },
        { text: "÷", sign: "operator" },
        { text: amount(snapshot.monthlyIncome), sign: "" },
        { text: "× 100", sign: "operator" },
        { text: "= " + snapshot.burdenPercent.toFixed(1) + "%", sign: "" }
      ].forEach(function (part) {
        var token = document.createElement("span");
        token.className = part.sign === "operator" ? "formula-sign" : "formula-token";
        token.textContent = part.text;
        formula.appendChild(token);
      });
    }

    renderRecommendations(housingInput.value);
    emptyResult.hidden = true;
    calculatedResult.hidden = false;
    outcomeSummary.hidden = true;
    outcomeSummary.textContent = "";
    updateWorkflow();
  }

  function resetSnapshot() {
    form.reset();
    clearErrors();
    emptyResult.hidden = false;
    calculatedResult.hidden = true;
    recommendations.replaceChildren();
    resetJourney();
    completedRoles.forEach(function (step) {
      step.classList.remove("is-complete");
      step.querySelector(".agent-state").textContent = "READY";
    });
    billInput.focus();
  }

  form.addEventListener("submit", handleSubmit);
  outcomeForm.addEventListener("submit", renderOutcomeSummary);
  outcomeForm.addEventListener("input", clearOutcomeSummaryWhileEditing);
  outcomeForm.addEventListener("change", clearOutcomeSummaryWhileEditing);
  document.getElementById("reset-button").addEventListener("click", resetSnapshot);
})();
