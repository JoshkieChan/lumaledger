(function (root) {
  "use strict";

  function calculateEnergyBurden(monthlyBill, monthlyIncome) {
    if (!Number.isFinite(monthlyBill) || monthlyBill < 0) {
      throw new RangeError("Monthly energy bill must be a non-negative number.");
    }

    if (monthlyIncome === null || monthlyIncome === undefined || monthlyIncome === "") {
      return { monthlyBill: monthlyBill, monthlyIncome: null, burdenPercent: null };
    }

    if (!Number.isFinite(monthlyIncome) || monthlyIncome <= 0) {
      throw new RangeError("Monthly household income must be greater than zero when provided.");
    }

    return {
      monthlyBill: monthlyBill,
      monthlyIncome: monthlyIncome,
      burdenPercent: (monthlyBill / monthlyIncome) * 100
    };
  }

  function calculateJourneyProgress(actionIds, completedIds) {
    if (!Array.isArray(actionIds) || !Array.isArray(completedIds)) {
      throw new TypeError("Journey progress requires arrays of action IDs.");
    }

    var uniqueActionIds = Array.from(new Set(actionIds));
    if (uniqueActionIds.some(function (id) { return typeof id !== "string" || id.length === 0; })) {
      throw new TypeError("Action IDs must be non-empty strings.");
    }

    var actionSet = new Set(uniqueActionIds);
    var completedSet = new Set(completedIds);
    completedSet.forEach(function (id) {
      if (!actionSet.has(id)) throw new RangeError("Completed action is not in this journey.");
    });

    var completed = completedSet.size;
    return {
      completed: completed,
      total: uniqueActionIds.length,
      percent: uniqueActionIds.length === 0 ? 0 : Math.round((completed / uniqueActionIds.length) * 100)
    };
  }

  function calculateSelfReportedBillChange(beforeBill, afterBill) {
    var beforeMissing = beforeBill === null || beforeBill === undefined || beforeBill === "";
    var afterMissing = afterBill === null || afterBill === undefined || afterBill === "";
    if (beforeMissing && afterMissing) return null;
    if (beforeMissing || afterMissing) {
      throw new RangeError("Enter both monthly bills to compare them.");
    }
    if (!Number.isFinite(beforeBill) || beforeBill <= 0) {
      throw new RangeError("The earlier monthly bill must be greater than zero.");
    }
    if (!Number.isFinite(afterBill) || afterBill < 0) {
      throw new RangeError("The later monthly bill must be zero or more.");
    }

    var difference = beforeBill - afterBill;
    return {
      beforeBill: beforeBill,
      afterBill: afterBill,
      monthlyDifference: difference,
      percentChange: (difference / beforeBill) * 100,
      direction: difference > 0 ? "lower" : difference < 0 ? "higher" : "unchanged"
    };
  }

  function summarizePilotOutcome(outcomes, beforeBill, afterBill) {
    if (!outcomes || typeof outcomes !== "object" || Array.isArray(outcomes)) {
      throw new TypeError("Pilot outcomes must be an object of self-reported selections.");
    }
    ["contacted", "applied", "receivedSupport"].forEach(function (key) {
      if (typeof outcomes[key] !== "boolean") {
        throw new TypeError("Each self-reported outcome must be a boolean.");
      }
    });

    return {
      contacted: outcomes.contacted,
      applied: outcomes.applied,
      receivedSupport: outcomes.receivedSupport,
      billChange: calculateSelfReportedBillChange(beforeBill, afterBill)
    };
  }

  var api = {
    calculateEnergyBurden: calculateEnergyBurden,
    calculateJourneyProgress: calculateJourneyProgress,
    calculateSelfReportedBillChange: calculateSelfReportedBillChange,
    summarizePilotOutcome: summarizePilotOutcome
  };
  root.EnergyCalculator = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
