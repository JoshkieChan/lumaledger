"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  calculateEnergyBurden,
  calculateJourneyProgress,
  calculateSelfReportedBillChange,
  summarizePilotOutcome
} = require("../energy.js");

test("calculates monthly energy burden from bill and income", () => {
  assert.deepEqual(calculateEnergyBurden(180, 4000), {
    monthlyBill: 180,
    monthlyIncome: 4000,
    burdenPercent: 4.5
  });
});

test("returns bill only when income is omitted", () => {
  assert.deepEqual(calculateEnergyBurden(125, null), {
    monthlyBill: 125,
    monthlyIncome: null,
    burdenPercent: null
  });
});

test("accepts a zero bill and calculates zero burden", () => {
  assert.equal(calculateEnergyBurden(0, 2000).burdenPercent, 0);
});

test("rejects negative or non-finite bills", () => {
  for (const invalidBill of [-1, NaN, Infinity]) {
    assert.throws(() => calculateEnergyBurden(invalidBill, 2000), RangeError);
  }
});

test("rejects provided income that is zero, negative, or non-finite", () => {
  for (const invalidIncome of [0, -1, NaN, Infinity]) {
    assert.throws(() => calculateEnergyBurden(100, invalidIncome), RangeError);
  }
});

test("calculates user-controlled action checklist progress", () => {
  assert.deepEqual(calculateJourneyProgress(["utility", "weatherization", "research"], ["utility"]), {
    completed: 1,
    total: 3,
    percent: 33
  });
  assert.deepEqual(calculateJourneyProgress(["utility"], ["utility", "utility"]), {
    completed: 1,
    total: 1,
    percent: 100
  });
  assert.deepEqual(calculateJourneyProgress([], []), { completed: 0, total: 0, percent: 0 });
  assert.throws(() => calculateJourneyProgress(["utility"], ["unknown"]), RangeError);
});

test("calculates a self-reported decrease, increase, or unchanged bill", () => {
  assert.deepEqual(calculateSelfReportedBillChange(200, 150), {
    beforeBill: 200,
    afterBill: 150,
    monthlyDifference: 50,
    percentChange: 25,
    direction: "lower"
  });
  assert.equal(calculateSelfReportedBillChange(100, 125).direction, "higher");
  assert.equal(calculateSelfReportedBillChange(100, 100).direction, "unchanged");
  assert.equal(calculateSelfReportedBillChange(null, null), null);
  assert.throws(() => calculateSelfReportedBillChange(100, null), RangeError);
  assert.throws(() => calculateSelfReportedBillChange(0, 100), RangeError);
});

test("summarizes self-reported follow-up without inferring causation", () => {
  assert.deepEqual(
    summarizePilotOutcome({ contacted: true, applied: false, receivedSupport: true }, 240, 180),
    {
      contacted: true,
      applied: false,
      receivedSupport: true,
      billChange: {
        beforeBill: 240,
        afterBill: 180,
        monthlyDifference: 60,
        percentChange: 25,
        direction: "lower"
      }
    }
  );
  assert.throws(
    () => summarizePilotOutcome({ contacted: true, applied: "yes", receivedSupport: false }, null, null),
    TypeError
  );
});
