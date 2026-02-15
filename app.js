const initialForm = document.getElementById("initial-form");
const adjustForm = document.getElementById("adjust-form");
const initialResult = document.getElementById("initial-result");
const adjustResult = document.getElementById("adjust-result");
const crclModeSelect = document.getElementById("crcl-mode");
const ageWrap = document.getElementById("age-wrap");
const sexWrap = document.getElementById("sex-wrap");
const scrWrap = document.getElementById("scr-wrap");
const manualCrclWrap = document.getElementById("manual-crcl-wrap");

const INFUSION_TABLE = [
  { dose: 500, timeHours: 1, diluentMl: 100 },
  { dose: 750, timeHours: 1.5, diluentMl: 150 },
  { dose: 1000, timeHours: 2, diluentMl: 200 },
  { dose: 1250, timeHours: 2, diluentMl: 250 },
  { dose: 1500, timeHours: 2.5, diluentMl: 300 },
  { dose: 2000, timeHours: 3, diluentMl: 400 }
];

function roundToNearest(value, step = 250) {
  return Math.round(value / step) * step;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function calculateCrClCockcroftGault({ age, weight, scr, sex }) {
  let crcl = ((140 - age) * weight) / (72 * scr);
  if (sex === "female") crcl *= 0.85;
  return crcl;
}

function intervalFromCrCl(crcl) {
  if (crcl > 50) return "q12h (consider q8h in severe infection/high clearance)";
  if (crcl >= 30) return "q24h";
  return "One dose, then TDM-guided redosing";
}

function infusionAdvice(doseMg) {
  const minTimeHr = doseMg / 600; // 10 mg/min max rate
  const minDiluentMl = doseMg / 5; // 5 mg/mL max concentration

  let nearest = INFUSION_TABLE[0];
  for (const row of INFUSION_TABLE) {
    if (Math.abs(row.dose - doseMg) < Math.abs(nearest.dose - doseMg)) {
      nearest = row;
    }
  }

  return {
    minTimeHr,
    minDiluentMl,
    nearest
  };
}

function syncCrclInputMode() {
  const mode = crclModeSelect.value;
  const manual = mode === "manual";

  manualCrclWrap.classList.toggle("hidden", !manual);
  ageWrap.classList.toggle("hidden", manual);
  sexWrap.classList.toggle("hidden", manual);
  scrWrap.classList.toggle("hidden", manual);
}

crclModeSelect.addEventListener("change", syncCrclInputMode);
syncCrclInputMode();

initialForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const weight = Number(document.getElementById("weight").value);
  const crclMode = crclModeSelect.value;
  const age = Number(document.getElementById("age").value);
  const sex = document.getElementById("sex").value;
  const scr = Number(document.getElementById("scr").value);
  const manualCrcl = Number(document.getElementById("crcl").value);
  const loadingMgKg = Number(document.getElementById("loading-mgkg").value);
  const maintMgKg = Number(document.getElementById("maint-mgkg").value);
  const applyCap = document.getElementById("cap-obese").checked;

  if (!weight || !loadingMgKg || !maintMgKg) {
    initialResult.innerHTML = "<p>Please complete all required values.</p>";
    return;
  }

  let crcl;
  let crclLine;
  if (crclMode === "auto") {
    if (!age || !scr) {
      initialResult.innerHTML = "<p>Please enter age and serum creatinine for auto CrCl calculation.</p>";
      return;
    }

    crcl = calculateCrClCockcroftGault({ age, weight, scr, sex });
    if (!Number.isFinite(crcl) || crcl <= 0) {
      initialResult.innerHTML = "<p>Could not estimate CrCl. Please check the age/SCr values.</p>";
      return;
    }
    crclLine = `Estimated CrCl (Cockcroft-Gault): ${crcl.toFixed(1)} mL/min`;
  } else {
    if (!manualCrcl) {
      initialResult.innerHTML = "<p>Please enter manual CrCl value.</p>";
      return;
    }
    crcl = manualCrcl;
    crclLine = `Manual CrCl used: ${crcl.toFixed(1)} mL/min`;
  }

  const loadingRange = [20 * weight, 30 * weight];
  const maintRange = [15 * weight, 20 * weight];

  let selectedLoading = roundToNearest(loadingMgKg * weight, 250);
  let selectedMaint = roundToNearest(maintMgKg * weight, 250);

  if (applyCap) {
    selectedLoading = Math.min(selectedLoading, 2000);
    selectedMaint = Math.min(selectedMaint, 2000);
  }

  const intervalLabel = intervalFromCrCl(crcl);
  const intervalHours = crcl > 50 ? 12 : crcl >= 30 ? 24 : 24;
  const dailyDose = (selectedMaint * 24) / intervalHours;
  const cappedDailyDose = applyCap ? Math.min(dailyDose, 4000) : dailyDose;
  const finalMaintDose =
    cappedDailyDose < dailyDose
      ? roundToNearest((cappedDailyDose * intervalHours) / 24, 250)
      : selectedMaint;

  const infusion = infusionAdvice(finalMaintDose);

  initialResult.innerHTML = `
    <p><strong>${crclLine}</strong></p>
    <p><strong>Loading dose range:</strong> ${Math.round(loadingRange[0])}-${Math.round(loadingRange[1])} mg</p>
    <p><strong>Suggested loading dose:</strong> ${selectedLoading} mg once</p>
    <p><strong>Maintenance range:</strong> ${Math.round(maintRange[0])}-${Math.round(maintRange[1])} mg/dose</p>
    <p><strong>Suggested maintenance:</strong> ${finalMaintDose} mg ${intervalLabel}</p>
    <p><strong>Estimated daily dose:</strong> ${Math.round(cappedDailyDose)} mg/day</p>
    <p><strong>Infusion minimums:</strong> at least ${infusion.minTimeHr.toFixed(2)} hr and at least ${Math.ceil(infusion.minDiluentMl)} mL diluent</p>
    <p class="note">Nearest diagram row: ${infusion.nearest.dose} mg -> ${infusion.nearest.timeHours} hr infusion, ${infusion.nearest.diluentMl} mL diluent.</p>
    <p class="note">Sampling reminder: Cpeak 1 hr after 3rd dose; Ctrough 30 min before 4th dose.</p>
  `;
});

function classifyTrough(trough, low, high) {
  if (trough < low) return "low";
  if (trough <= high) return "on-target";
  if (trough <= 25) return "high";
  return "very-high";
}

function suggestInterval(currentInterval, troughState) {
  if (troughState === "low") {
    if (currentInterval >= 24) return 12;
    if (currentInterval === 12) return 8;
  }
  if (troughState === "high" || troughState === "very-high") {
    if (currentInterval <= 8) return 12;
    if (currentInterval === 12) return 24;
    if (currentInterval === 24) return 36;
  }
  return currentInterval;
}

adjustForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const currentDose = Number(document.getElementById("current-dose").value);
  const currentInterval = Number(document.getElementById("current-interval").value);
  const trough = Number(document.getElementById("trough").value);
  const targetLow = Number(document.getElementById("target-low").value);
  const targetHigh = Number(document.getElementById("target-high").value);
  const auc = Number(document.getElementById("auc").value);
  const mic = Number(document.getElementById("mic").value);

  if (!currentDose || !currentInterval || !trough || !targetLow || !targetHigh) {
    adjustResult.innerHTML = "<p>Please complete all required values.</p>";
    return;
  }

  if (targetLow >= targetHigh) {
    adjustResult.innerHTML = "<p>Target lower must be less than target upper.</p>";
    return;
  }

  const troughState = classifyTrough(trough, targetLow, targetHigh);
  const dailyDose = (currentDose * 24) / currentInterval;
  const targetMid = (targetLow + targetHigh) / 2;

  let factor = clamp(targetMid / trough, 0.4, 2.2);
  if (troughState === "on-target") factor = 1;
  if (troughState === "low") factor = Math.max(factor, 1.15);
  if (troughState === "high") factor = Math.min(factor, 0.9);
  if (troughState === "very-high") factor = Math.min(factor, 0.75);

  const suggestedDaily = dailyDose * factor;
  const doseSameInterval = roundToNearest((suggestedDaily * currentInterval) / 24, 250);
  const altInterval = suggestInterval(currentInterval, troughState);
  const doseAltInterval = roundToNearest((suggestedDaily * altInterval) / 24, 250);

  let statusClass = "status-ok";
  let statusText = "Within trough target. Continue current regimen.";
  let extraSafety = "";

  if (troughState === "low") {
    statusClass = "status-caution";
    statusText = "Subtherapeutic trough. Increase total daily exposure.";
    extraSafety = "Consider increasing dose and/or shortening interval; check repeat level after new steady-state.";
  } else if (troughState === "high") {
    statusClass = "status-high";
    statusText = "Above target trough. Reduce exposure to limit nephrotoxicity risk.";
    extraSafety = "Reduce dose and/or extend interval. Recheck trough before 3rd-4th adjusted dose.";
  } else if (troughState === "very-high") {
    statusClass = "status-high";
    statusText = "Markedly high trough. Consider holding next dose until level declines.";
    extraSafety = "Urgent clinician/pharmacist review recommended; monitor renal function closely.";
  }

  let aucLine = "";
  if (auc && mic) {
    const aucMic = auc / mic;
    const aucClass = aucMic >= 400 && aucMic <= 600 ? "status-ok" : "status-caution";
    aucLine = `<p><strong>AUC/MIC:</strong> <span class="${aucClass}">${aucMic.toFixed(1)}</span> (target 400-600)</p>`;
  }

  adjustResult.innerHTML = `
    <p><strong>Status:</strong> <span class="${statusClass}">${statusText}</span></p>
    <p><strong>Current daily exposure:</strong> ${Math.round(dailyDose)} mg/day</p>
    <p><strong>Dose suggestion (same interval q${currentInterval}h):</strong> ${Math.max(
      250,
      doseSameInterval
    )} mg</p>
    <p><strong>Alternative (q${altInterval}h):</strong> ${Math.max(250, doseAltInterval)} mg</p>
    <p class="note">${extraSafety || "Recheck trough at steady-state or sooner if renal function changes."}</p>
    ${aucLine}
    <p class="note">This adjustment uses proportional PK approximation; use institution protocol/AUC software when available.</p>
  `;
});
