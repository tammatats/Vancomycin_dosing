const initialForm = document.getElementById("initial-form");
const adjustForm = document.getElementById("adjust-form");
const initialResult = document.getElementById("initial-result");
const adjustResult = document.getElementById("adjust-result");
const languageToggle = document.getElementById("language-toggle");

const crclModeInput = document.getElementById("crcl-mode");
const crclModeToggle = document.getElementById("crcl-mode-toggle");
const sexInput = document.getElementById("sex");
const sexToggle = document.getElementById("sex-toggle");
const ageWrap = document.getElementById("age-wrap");
const sexWrap = document.getElementById("sex-wrap");
const scrWrap = document.getElementById("scr-wrap");
const manualCrclWrap = document.getElementById("manual-crcl-wrap");

const numpad = document.getElementById("numpad");
const numpadPrev = document.getElementById("numpad-prev");
const numpadNext = document.getElementById("numpad-next");
const numpadDone = document.getElementById("numpad-done");
const numInputs = Array.from(document.querySelectorAll(".num-input"));

const INFUSION_TABLE = [
  { dose: 500, timeHours: 1, diluentMl: 100 },
  { dose: 750, timeHours: 1.5, diluentMl: 150 },
  { dose: 1000, timeHours: 2, diluentMl: 200 },
  { dose: 1250, timeHours: 2, diluentMl: 250 },
  { dose: 1500, timeHours: 2.5, diluentMl: 300 },
  { dose: 2000, timeHours: 3, diluentMl: 400 }
];

const I18N = {
  en: {
    docTitle: "Vancomycin Dosing Assistant",
    langButton: "ไทย",
    eyebrow: "Adult Protocol Helper",
    heroTitle: "Vancomycin Initial + TDM Adjustment",
    lead: "Implements the dosing flow from your diagram: loading/maintenance dose, interval by creatinine clearance, infusion safety limits, and follow-up adjustment using serum vancomycin levels.",
    warning:
      "Clinical decision support only. Final prescription must be confirmed by physician/pharmacist and local hospital policy.",
    initialHeading: "1) Initial Dosing",
    weightLabel: "Actual body weight (kg)",
    crclModeLabel: "CrCl input method",
    modeAutoPill: "Auto-calculate CrCl",
    modeManualPill: "Manual CrCl input",
    ageLabel: "Patient age (years)",
    sexLabel: "Sex for Cockcroft-Gault",
    sexMalePill: "Male (tap to switch)",
    sexFemalePill: "Female x0.85 (tap to switch)",
    scrLabel: "Serum creatinine, SCr (mg/dL)",
    manualCrclLabel: "Manual CrCl (mL/min)",
    loadingMgKgLabel: "Preferred loading dose (mg/kg)",
    maintMgKgLabel: "Preferred maintenance dose (mg/kg/dose)",
    capLabel: "Apply cap: max 2,000 mg per dose and max 4,000 mg/day",
    calcInitialBtn: "Calculate Initial Regimen",
    crclNote:
      "Auto CrCl equation: Cockcroft-Gault = ((140 - age) x weight[kg]) / (72 x SCr), and x0.85 for female.",
    adjustHeading: "2) Adjust by Serum Vancomycin Level",
    currentDoseLabel: "Current dose (mg)",
    currentIntervalLabel: "Current interval (hours)",
    troughLabel: "Measured trough Ctrough (mg/L)",
    targetLowLabel: "Trough target lower (mg/L)",
    targetHighLabel: "Trough target upper (mg/L)",
    aucLabel: "Optional measured AUC24 (mg·h/L)",
    micLabel: "Optional MIC (mg/L)",
    calcAdjustBtn: "Calculate Adjustment",
    rulesHeading: "Reference Rules from Diagram",
    rule1: "Loading dose: 20-30 mg/kg (actual body weight).",
    rule2: "Maintenance dose: 15-20 mg/kg per dose.",
    rule3: "Interval by CrCl: > 50 mL/min = q8-12h, 30-50 = q24h, < 30 = one dose then TDM.",
    rule4: "Infusion safety: max rate 10 mg/min, max concentration 5 mg/mL.",
    rule5:
      "Monitoring reminder in this app: q24h maintenance -> trough 30 min before 3rd dose; CrCl < 30 -> level at 48 hr after loading.",
    rule6: "Target trough: 10-20 mg/L; MRSA goal AUC/MIC 400-600.",
    numpadPrev: "Prev",
    numpadNext: "Next",
    numpadDone: "Done",
    orderReady: "Order Ready",
    oneDayOrder: "One-Day Order",
    continuedOrder: "Continued Order",
    hr: "hr",
    follow48: "Follow vancomycin level at 48 hr after loading dose.",
    follow3: "Follow vancomycin level at 30 minutes before 3rd dose.",
    follow4: "Follow vancomycin level at 30 minutes before 4th dose.",
    intervalHighCl: "q12h (consider q8h in severe infection/high clearance)",
    intervalDaily: "q24h",
    intervalTdm: "One dose, then TDM-guided redosing",
    pleaseComplete: "Please complete all required values.",
    enterAgeScr: "Please enter age and serum creatinine for auto CrCl calculation.",
    badCrcl: "Could not estimate CrCl. Please check the age/SCr values.",
    enterManualCrcl: "Please enter manual CrCl value.",
    enterMaintAbove30: "Please enter maintenance mg/kg for CrCl 30 mL/min and above.",
    estimatedCrcl: "Estimated CrCl (Cockcroft-Gault): {value} mL/min",
    manualCrclUsed: "Manual CrCl used: {value} mL/min",
    loadingRange: "Loading dose range:",
    suggestedLoading: "Suggested loading dose:",
    loadingMinimums: "Loading infusion minimums:",
    maintRange: "Maintenance range:",
    suggestedMaint: "Suggested maintenance:",
    estimatedDaily: "Estimated daily dose:",
    maintMinimums: "Maintenance infusion minimums:",
    atLeast: "at least {time} {hr} and at least {vol} mL diluent",
    autoRounded: "Auto-rounded infusion setup (30-min step): {time} and {vol} mL.",
    nearestRow: "Nearest diagram row: {dose} mg -> {time} {hr} infusion, {vol} mL diluent.",
    loadingOnce: "loading dose once",
    loadingLine: "Vancomycin {dose} mg + NSS {vol} mL IV drip in {time} ({tag})",
    maintenanceLine: "Vancomycin {dose} mg + NSS {vol} mL IV drip in {time} every {interval}",
    noScheduledMaint:
      "No scheduled maintenance dose. Maintenance will be based on the 48-hr vancomycin level and clinical reassessment.",
    mgOnce: "mg once",
    mgDay: "mg/day",
    statusWithin: "Within trough target. Continue current regimen.",
    statusLow: "Subtherapeutic trough. Increase total daily exposure.",
    statusHigh: "Above target trough. Reduce exposure to limit nephrotoxicity risk.",
    statusVeryHigh: "Markedly high trough. Consider holding next dose until level declines.",
    extraLow: "Consider increasing dose and/or shortening interval; check repeat level after new steady-state.",
    extraHigh: "Reduce dose and/or extend interval. Recheck trough before 3rd-4th adjusted dose.",
    extraVeryHigh: "Urgent clinician/pharmacist review recommended; monitor renal function closely.",
    extraDefault: "Recheck trough at steady-state or sooner if renal function changes.",
    targetLowerError: "Target lower must be less than target upper.",
    statusLabel: "Status:",
    currentDailyExposure: "Current daily exposure:",
    doseSame: "Dose suggestion (same interval q{interval}h):",
    doseAlt: "Alternative (q{interval}h):",
    aucMic: "AUC/MIC:",
    target400600: "(target 400-600)",
    pkApprox: "This adjustment uses proportional PK approximation; use institution protocol/AUC software when available."
  },
  th: {
    docTitle: "เครื่องมือคำนวณขนาดยา Vancomycin",
    langButton: "English",
    eyebrow: "ผู้ช่วยแนวทางผู้ป่วยผู้ใหญ่",
    heroTitle: "คำนวณ Vancomycin เริ่มต้น + ปรับตามระดับยา",
    lead:
      "อิงตามแผนภาพที่ให้มา: ขนาดยา loading/maintenance, ช่วงห่างยาตามค่า CrCl, ความปลอดภัยในการให้ยา และการปรับขนาดยาตามระดับ vancomycin ในเลือด",
    warning:
      "ใช้เพื่อช่วยตัดสินใจทางคลินิกเท่านั้น คำสั่งยาสุดท้ายต้องยืนยันโดยแพทย์/เภสัชกร และนโยบายของโรงพยาบาล",
    initialHeading: "1) คำนวณขนาดยาเริ่มต้น",
    weightLabel: "น้ำหนักจริงผู้ป่วย (กก.)",
    crclModeLabel: "วิธีระบุค่า CrCl",
    modeAutoPill: "คำนวณ CrCl อัตโนมัติ",
    modeManualPill: "กรอก CrCl เอง",
    ageLabel: "อายุผู้ป่วย (ปี)",
    sexLabel: "เพศสำหรับสูตร Cockcroft-Gault",
    sexMalePill: "ชาย (แตะเพื่อสลับ)",
    sexFemalePill: "หญิง x0.85 (แตะเพื่อสลับ)",
    scrLabel: "Serum creatinine, SCr (mg/dL)",
    manualCrclLabel: "ค่า CrCl ที่กรอกเอง (mL/min)",
    loadingMgKgLabel: "ขนาด loading ที่ต้องการ (mg/kg)",
    maintMgKgLabel: "ขนาด maintenance ที่ต้องการ (mg/kg/ครั้ง)",
    capLabel: "ใช้ขีดจำกัด: สูงสุด 2,000 mg/ครั้ง และ 4,000 mg/วัน",
    calcInitialBtn: "คำนวณสูตรยาเริ่มต้น",
    crclNote:
      "สูตรคำนวณ CrCl อัตโนมัติ: Cockcroft-Gault = ((140 - อายุ) x น้ำหนัก[kg]) / (72 x SCr) และคูณ 0.85 ในผู้หญิง",
    adjustHeading: "2) ปรับขนาดยาจากระดับ Vancomycin",
    currentDoseLabel: "ขนาดยาปัจจุบัน (mg)",
    currentIntervalLabel: "ช่วงห่างยาปัจจุบัน (ชั่วโมง)",
    troughLabel: "ค่า Ctrough ที่วัดได้ (mg/L)",
    targetLowLabel: "ค่าเป้าหมายต่ำสุดของ trough (mg/L)",
    targetHighLabel: "ค่าเป้าหมายสูงสุดของ trough (mg/L)",
    aucLabel: "ค่า AUC24 (ถ้ามี) (mg·h/L)",
    micLabel: "ค่า MIC (ถ้ามี) (mg/L)",
    calcAdjustBtn: "คำนวณการปรับยา",
    rulesHeading: "สรุปเกณฑ์อ้างอิงจากแผนภาพ",
    rule1: "Loading dose: 20-30 mg/kg (น้ำหนักจริง).",
    rule2: "Maintenance dose: 15-20 mg/kg ต่อครั้ง.",
    rule3: "ช่วงห่างยาตาม CrCl: > 50 mL/min = q8-12h, 30-50 = q24h, < 30 = ให้ครั้งเดียวแล้วติดตามระดับยา.",
    rule4: "ความปลอดภัยการให้ยา: อัตราสูงสุด 10 mg/min, ความเข้มข้นสูงสุด 5 mg/mL.",
    rule5: "การติดตามในแอปนี้: q24h -> เจาะก่อนเข็มที่ 3 30 นาที; CrCl < 30 -> ติดตามระดับยาที่ 48 ชั่วโมงหลัง loading.",
    rule6: "เป้าหมาย trough: 10-20 mg/L; กรณี MRSA เป้าหมาย AUC/MIC 400-600.",
    numpadPrev: "ก่อนหน้า",
    numpadNext: "ถัดไป",
    numpadDone: "เสร็จ",
    orderReady: "คำสั่งยาพร้อมใช้",
    oneDayOrder: "คำสั่งยา 1 วัน",
    continuedOrder: "คำสั่งยาต่อเนื่อง",
    hr: "ชม.",
    follow48: "ติดตามระดับ vancomycin ที่ 48 ชั่วโมงหลังให้ loading dose",
    follow3: "ติดตามระดับ vancomycin ก่อนเข็มที่ 3 30 นาที",
    follow4: "ติดตามระดับ vancomycin ก่อนเข็มที่ 4 30 นาที",
    intervalHighCl: "q12h (พิจารณา q8h หากติดเชื้อรุนแรง/clearance สูง)",
    intervalDaily: "q24h",
    intervalTdm: "ให้ครั้งเดียว แล้วปรับตาม TDM",
    pleaseComplete: "กรุณากรอกข้อมูลที่จำเป็นให้ครบ",
    enterAgeScr: "กรุณากรอกอายุและค่า serum creatinine เพื่อคำนวณ CrCl อัตโนมัติ",
    badCrcl: "ไม่สามารถคำนวณ CrCl ได้ กรุณาตรวจสอบค่าอายุ/SCr",
    enterManualCrcl: "กรุณากรอกค่า CrCl",
    enterMaintAbove30: "กรุณากรอกขนาด maintenance mg/kg สำหรับ CrCl ตั้งแต่ 30 mL/min ขึ้นไป",
    estimatedCrcl: "CrCl ที่คำนวณได้ (Cockcroft-Gault): {value} mL/min",
    manualCrclUsed: "ใช้ค่า CrCl ที่กรอก: {value} mL/min",
    loadingRange: "ช่วงขนาด loading:",
    suggestedLoading: "ขนาด loading ที่แนะนำ:",
    loadingMinimums: "ค่าขั้นต่ำในการให้ loading:",
    maintRange: "ช่วงขนาด maintenance:",
    suggestedMaint: "ขนาด maintenance ที่แนะนำ:",
    estimatedDaily: "ขนาดยารวมต่อวันโดยประมาณ:",
    maintMinimums: "ค่าขั้นต่ำในการให้ maintenance:",
    atLeast: "อย่างน้อย {time} {hr} และ diluent อย่างน้อย {vol} mL",
    autoRounded: "ค่าที่ปัดขึ้นอัตโนมัติ (ทีละ 30 นาที): {time} และ {vol} mL",
    nearestRow: "แถวใกล้เคียงในตาราง: {dose} mg -> ให้ยา {time} {hr}, diluent {vol} mL",
    loadingOnce: "loading dose ครั้งเดียว",
    loadingLine: "Vancomycin {dose} mg + NSS {vol} mL IV drip in {time} ({tag})",
    maintenanceLine: "Vancomycin {dose} mg + NSS {vol} mL IV drip in {time} ทุก {interval}",
    noScheduledMaint:
      "ยังไม่กำหนด maintenance dose ล่วงหน้า ให้พิจารณาจากระดับ vancomycin ที่ 48 ชั่วโมงและประเมินทางคลินิกอีกครั้ง",
    mgOnce: "mg ครั้งเดียว",
    mgDay: "mg/วัน",
    statusWithin: "ระดับ trough อยู่ในเป้าหมาย ให้สูตรยาเดิมต่อได้",
    statusLow: "ระดับ trough ต่ำกว่าเป้าหมาย ควรเพิ่มการได้รับยารวมต่อวัน",
    statusHigh: "ระดับ trough สูงกว่าเป้าหมาย ควรลดการได้รับยาเพื่อลดความเสี่ยงไต",
    statusVeryHigh: "ระดับ trough สูงมาก ควรพิจารณาชะลอเข็มถัดไปจนระดับยาลดลง",
    extraLow: "พิจารณาเพิ่มขนาดยา/ลดช่วงห่างยา และติดตามระดับยาหลังถึง steady state ใหม่",
    extraHigh: "ลดขนาดยาและ/หรือเพิ่มช่วงห่างยา แล้วติดตาม trough ก่อนเข็มที่ 3-4 หลังปรับ",
    extraVeryHigh: "ควรปรึกษาแพทย์/เภสัชกรอย่างเร่งด่วน และติดตามการทำงานของไตใกล้ชิด",
    extraDefault: "ติดตาม trough ที่ steady state หรือเร็วกว่านั้นหากการทำงานไตเปลี่ยน",
    targetLowerError: "ค่าเป้าหมายต่ำสุดต้องน้อยกว่าค่าเป้าหมายสูงสุด",
    statusLabel: "สถานะ:",
    currentDailyExposure: "การได้รับยารวมต่อวันปัจจุบัน:",
    doseSame: "ข้อเสนอแนะขนาดยา (ช่วงห่างเดิม q{interval}h):",
    doseAlt: "ทางเลือก (q{interval}h):",
    aucMic: "ค่า AUC/MIC:",
    target400600: "(เป้าหมาย 400-600)",
    pkApprox: "การคำนวณนี้ใช้การประมาณแบบสัดส่วน PK; หากมี protocol/AUC software ของหน่วยงานให้ใช้อ้างอิงร่วม"
  }
};

let currentLang = localStorage.getItem("vanco-lang") === "th" ? "th" : "en";
let activeInput = null;

const staticMap = [
  ["t-eyebrow", "eyebrow"],
  ["t-hero-title", "heroTitle"],
  ["t-lead", "lead"],
  ["t-warning", "warning"],
  ["t-initial-heading", "initialHeading"],
  ["t-weight-label", "weightLabel"],
  ["t-crcl-mode-label", "crclModeLabel"],
  ["t-age-label", "ageLabel"],
  ["t-sex-label", "sexLabel"],
  ["t-scr-label", "scrLabel"],
  ["t-manual-crcl-label", "manualCrclLabel"],
  ["t-loading-mgkg-label", "loadingMgKgLabel"],
  ["t-maint-mgkg-label", "maintMgKgLabel"],
  ["t-cap-label", "capLabel"],
  ["t-calc-initial-btn", "calcInitialBtn"],
  ["t-crcl-note", "crclNote"],
  ["t-adjust-heading", "adjustHeading"],
  ["t-current-dose-label", "currentDoseLabel"],
  ["t-current-interval-label", "currentIntervalLabel"],
  ["t-trough-label", "troughLabel"],
  ["t-target-low-label", "targetLowLabel"],
  ["t-target-high-label", "targetHighLabel"],
  ["t-auc-label", "aucLabel"],
  ["t-mic-label", "micLabel"],
  ["t-calc-adjust-btn", "calcAdjustBtn"],
  ["t-rules-heading", "rulesHeading"],
  ["t-rule-1", "rule1"],
  ["t-rule-2", "rule2"],
  ["t-rule-3", "rule3"],
  ["t-rule-4", "rule4"],
  ["t-rule-5", "rule5"],
  ["t-rule-6", "rule6"]
];

function tr(key, vars = {}) {
  const dict = I18N[currentLang] || I18N.en;
  const fallback = I18N.en[key] || key;
  const template = dict[key] || fallback;
  return template.replace(/\{(\w+)\}/g, (_, token) => (vars[token] === undefined ? `{${token}}` : vars[token]));
}

function applyStaticTranslation() {
  document.documentElement.lang = currentLang;
  document.title = tr("docTitle");
  languageToggle.textContent = tr("langButton");
  numpadPrev.textContent = tr("numpadPrev");
  numpadNext.textContent = tr("numpadNext");
  numpadDone.textContent = tr("numpadDone");

  for (const [id, key] of staticMap) {
    const el = document.getElementById(id);
    if (el) el.textContent = tr(key);
  }
  refreshModeButtons();
}

function refreshModeButtons() {
  const isAuto = crclModeInput.value === "auto";
  crclModeToggle.classList.remove("mode-auto", "mode-manual");
  crclModeToggle.classList.add(isAuto ? "mode-auto" : "mode-manual");
  crclModeToggle.textContent = isAuto ? tr("modeAutoPill") : tr("modeManualPill");

  const isMale = sexInput.value === "male";
  sexToggle.classList.remove("sex-male", "sex-female");
  sexToggle.classList.add(isMale ? "sex-male" : "sex-female");
  sexToggle.textContent = isMale ? tr("sexMalePill") : tr("sexFemalePill");
}

function roundToNearest(value, step = 250) {
  return Math.round(value / step) * step;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function roundUpToStep(value, step) {
  return Math.ceil(value / step) * step;
}

function formatHours(hours) {
  return Number.isInteger(hours) ? `${hours} ${tr("hr")}` : `${hours.toFixed(1)} ${tr("hr")}`;
}

function calculateCrClCockcroftGault({ age, weight, scr, sex }) {
  let crcl = ((140 - age) * weight) / (72 * scr);
  if (sex === "female") crcl *= 0.85;
  return crcl;
}

function intervalPlanFromCrCl(crcl) {
  if (crcl > 50) {
    return { hours: 12, label: tr("intervalHighCl"), shortLabel: "q12h" };
  }
  if (crcl >= 30) {
    return { hours: 24, label: tr("intervalDaily"), shortLabel: "q24h" };
  }
  return { hours: 24, label: tr("intervalTdm"), shortLabel: tr("intervalTdm") };
}

function initialMonitoringText(crcl, intervalHours) {
  if (crcl < 30) return tr("follow48");
  if (intervalHours === 24) return tr("follow3");
  return tr("follow4");
}

function renderOrderLines(lines) {
  return lines.map((line) => `<p class="order-line">- ${line}</p>`).join("");
}

function renderOrderReady({ oneDayLines, continuedLines }) {
  return `
    <div class="order-highlight">
      <p class="order-title">${tr("orderReady")}</p>
      <div class="order-columns">
        <div class="order-column">
          <p class="order-label">${tr("oneDayOrder")}</p>
          <div class="order-text">${renderOrderLines(oneDayLines)}</div>
        </div>
        <div class="order-column">
          <p class="order-label">${tr("continuedOrder")}</p>
          <div class="order-text">${renderOrderLines(continuedLines)}</div>
        </div>
      </div>
    </div>
  `;
}

function infusionAdvice(doseMg) {
  const minTimeHr = doseMg / 600;
  const minDiluentMl = doseMg / 5;
  const roundedTimeHr = roundUpToStep(minTimeHr, 0.5);
  const roundedDiluentMl = roundUpToStep(minDiluentMl, 50);

  let nearest = INFUSION_TABLE[0];
  for (const row of INFUSION_TABLE) {
    if (Math.abs(row.dose - doseMg) < Math.abs(nearest.dose - doseMg)) {
      nearest = row;
    }
  }
  return { minTimeHr, minDiluentMl, roundedTimeHr, roundedDiluentMl, nearest };
}

function isVisible(el) {
  return !!(el && el.getClientRects().length && getComputedStyle(el).display !== "none");
}

function getVisibleNumInputs() {
  return numInputs.filter((input) => !input.disabled && isVisible(input));
}

function showNumpad() {
  numpad.classList.remove("hidden");
  document.body.classList.add("numpad-open");
}

function hideNumpad() {
  numpad.classList.add("hidden");
  document.body.classList.remove("numpad-open");
}

function getNumpadHeight() {
  return numpad.classList.contains("hidden") ? 0 : numpad.getBoundingClientRect().height;
}

function ensureInputVisible(input, behavior = "smooth") {
  if (!input || !isVisible(input)) return;

  const rect = input.getBoundingClientRect();
  const usableHeight = window.innerHeight - getNumpadHeight();
  const preferredTop = Math.max(14, usableHeight * 0.34);
  const preferredBottom = Math.max(preferredTop + 44, usableHeight * 0.62);

  if (rect.bottom > preferredBottom) {
    window.scrollBy({ top: rect.bottom - preferredBottom, behavior });
    return;
  }
  if (rect.top < preferredTop) {
    window.scrollBy({ top: rect.top - preferredTop, behavior });
  }
}

function setActiveInput(input) {
  if (!input || !isVisible(input)) return;
  if (activeInput === input) {
    showNumpad();
    requestAnimationFrame(() => ensureInputVisible(activeInput));
    return;
  }
  if (activeInput) activeInput.classList.remove("active-input");
  activeInput = input;
  activeInput.classList.add("active-input");
  activeInput.focus({ preventScroll: true });
  showNumpad();
  requestAnimationFrame(() => ensureInputVisible(activeInput));
}

function clearActiveInput() {
  if (!activeInput) return;
  activeInput.classList.remove("active-input");
  activeInput = null;
}

function syncCrclInputMode() {
  const manual = crclModeInput.value === "manual";
  manualCrclWrap.classList.toggle("hidden", !manual);
  ageWrap.classList.toggle("hidden", manual);
  sexWrap.classList.toggle("hidden", manual);
  scrWrap.classList.toggle("hidden", manual);

  if (activeInput && !isVisible(activeInput)) {
    const nextInput = manual ? document.getElementById("crcl") : document.getElementById("age");
    setActiveInput(nextInput);
  }
}

function inputSupportsDecimal(input) {
  const step = input.step || "";
  return step.includes(".") || step === "any";
}

function pushNumericKey(key) {
  if (!activeInput) {
    const first = getVisibleNumInputs()[0];
    if (first) setActiveInput(first);
  }
  if (!activeInput) return;

  let value = activeInput.value || "";
  if (key === ".") {
    if (!inputSupportsDecimal(activeInput) || value.includes(".")) return;
    value = value === "" ? "0." : `${value}.`;
  } else {
    value = value === "0" ? key : `${value}${key}`;
  }
  activeInput.value = value;
  activeInput.dispatchEvent(new Event("input", { bubbles: true }));
  requestAnimationFrame(() => ensureInputVisible(activeInput));
}

function backspaceKey() {
  if (!activeInput) return;
  activeInput.value = (activeInput.value || "").slice(0, -1);
  activeInput.dispatchEvent(new Event("input", { bubbles: true }));
  requestAnimationFrame(() => ensureInputVisible(activeInput));
}

function clearKey() {
  if (!activeInput) return;
  activeInput.value = "";
  activeInput.dispatchEvent(new Event("input", { bubbles: true }));
  requestAnimationFrame(() => ensureInputVisible(activeInput));
}

function moveInput(delta) {
  const inputs = getVisibleNumInputs();
  if (!inputs.length) return;

  let index = inputs.indexOf(activeInput);
  if (index < 0) index = 0;
  const nextIndex = Math.max(0, Math.min(inputs.length - 1, index + delta));
  setActiveInput(inputs[nextIndex]);
}

function showInitialResult(message) {
  initialResult.innerHTML = `<p>${message}</p>`;
}

function showAdjustResult(message) {
  adjustResult.innerHTML = `<p>${message}</p>`;
}

function calculateInitial(event) {
  event.preventDefault();

  const weight = Number(document.getElementById("weight").value);
  const crclMode = crclModeInput.value;
  const age = Number(document.getElementById("age").value);
  const sex = sexInput.value;
  const scr = Number(document.getElementById("scr").value);
  const manualCrcl = Number(document.getElementById("crcl").value);
  const loadingMgKg = Number(document.getElementById("loading-mgkg").value);
  const maintMgKg = Number(document.getElementById("maint-mgkg").value);
  const applyCap = document.getElementById("cap-obese").checked;

  if (!weight || !loadingMgKg) {
    showInitialResult(tr("pleaseComplete"));
    return;
  }

  let crcl;
  let crclLine;
  if (crclMode === "auto") {
    if (!age || !scr) {
      showInitialResult(tr("enterAgeScr"));
      return;
    }
    crcl = calculateCrClCockcroftGault({ age, weight, scr, sex });
    if (!Number.isFinite(crcl) || crcl <= 0) {
      showInitialResult(tr("badCrcl"));
      return;
    }
    crclLine = tr("estimatedCrcl", { value: crcl.toFixed(1) });
  } else {
    if (!manualCrcl) {
      showInitialResult(tr("enterManualCrcl"));
      return;
    }
    crcl = manualCrcl;
    crclLine = tr("manualCrclUsed", { value: crcl.toFixed(1) });
  }

  const loadingRange = [20 * weight, 30 * weight];
  const maintRange = [15 * weight, 20 * weight];
  let selectedLoading = roundToNearest(loadingMgKg * weight, 250);
  let selectedMaint = Number.isFinite(maintMgKg) && maintMgKg > 0 ? roundToNearest(maintMgKg * weight, 250) : 0;

  if (applyCap) {
    selectedLoading = Math.min(selectedLoading, 2000);
    selectedMaint = Math.min(selectedMaint, 2000);
  }

  const intervalPlan = intervalPlanFromCrCl(crcl);
  const loadingInfusion = infusionAdvice(selectedLoading);
  const monitoringText = initialMonitoringText(crcl, intervalPlan.hours);

  const loadingLine = tr("loadingLine", {
    dose: selectedLoading,
    vol: loadingInfusion.roundedDiluentMl,
    time: formatHours(loadingInfusion.roundedTimeHr),
    tag: tr("loadingOnce")
  });

  if (crcl < 30) {
    const orderReadyBlock = renderOrderReady({
      oneDayLines: [loadingLine, monitoringText],
      continuedLines: [tr("noScheduledMaint")]
    });

    initialResult.innerHTML = `
      ${orderReadyBlock}
      <p><strong>${crclLine}</strong></p>
      <p><strong>${tr("loadingRange")}</strong> ${Math.round(loadingRange[0])}-${Math.round(loadingRange[1])} mg</p>
      <p><strong>${tr("suggestedLoading")}</strong> ${selectedLoading} ${tr("mgOnce")}</p>
      <p><strong>${tr("loadingMinimums")}</strong> ${tr("atLeast", {
        time: loadingInfusion.minTimeHr.toFixed(2),
        hr: tr("hr"),
        vol: Math.ceil(loadingInfusion.minDiluentMl)
      })}</p>
      <p class="note">${tr("autoRounded", {
        time: formatHours(loadingInfusion.roundedTimeHr),
        vol: loadingInfusion.roundedDiluentMl
      })}</p>
    `;
    return;
  }

  if (!maintMgKg) {
    showInitialResult(tr("enterMaintAbove30"));
    return;
  }

  const dailyDose = (selectedMaint * 24) / intervalPlan.hours;
  const cappedDailyDose = applyCap ? Math.min(dailyDose, 4000) : dailyDose;
  const finalMaintDose =
    cappedDailyDose < dailyDose
      ? roundToNearest((cappedDailyDose * intervalPlan.hours) / 24, 250)
      : selectedMaint;

  const infusion = infusionAdvice(finalMaintDose);
  const maintenanceLine = tr("maintenanceLine", {
    dose: finalMaintDose,
    vol: infusion.roundedDiluentMl,
    time: formatHours(infusion.roundedTimeHr),
    interval: intervalPlan.shortLabel
  });
  const orderReadyBlock = renderOrderReady({
    oneDayLines: [loadingLine, monitoringText],
    continuedLines: [maintenanceLine]
  });

  initialResult.innerHTML = `
    ${orderReadyBlock}
    <p><strong>${crclLine}</strong></p>
    <p><strong>${tr("loadingRange")}</strong> ${Math.round(loadingRange[0])}-${Math.round(loadingRange[1])} mg</p>
    <p><strong>${tr("suggestedLoading")}</strong> ${selectedLoading} ${tr("mgOnce")}</p>
    <p><strong>${tr("maintRange")}</strong> ${Math.round(maintRange[0])}-${Math.round(maintRange[1])} mg/dose</p>
    <p><strong>${tr("suggestedMaint")}</strong> ${finalMaintDose} mg ${intervalPlan.label}</p>
    <p><strong>${tr("estimatedDaily")}</strong> ${Math.round(cappedDailyDose)} ${tr("mgDay")}</p>
    <p><strong>${tr("maintMinimums")}</strong> ${tr("atLeast", {
      time: infusion.minTimeHr.toFixed(2),
      hr: tr("hr"),
      vol: Math.ceil(infusion.minDiluentMl)
    })}</p>
    <p class="note">${tr("autoRounded", {
      time: formatHours(infusion.roundedTimeHr),
      vol: infusion.roundedDiluentMl
    })}</p>
    <p class="note">${tr("nearestRow", {
      dose: infusion.nearest.dose,
      time: infusion.nearest.timeHours,
      hr: tr("hr"),
      vol: infusion.nearest.diluentMl
    })}</p>
  `;
}

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

function calculateAdjustment(event) {
  event.preventDefault();

  const currentDose = Number(document.getElementById("current-dose").value);
  const currentInterval = Number(document.getElementById("current-interval").value);
  const trough = Number(document.getElementById("trough").value);
  const targetLow = Number(document.getElementById("target-low").value);
  const targetHigh = Number(document.getElementById("target-high").value);
  const auc = Number(document.getElementById("auc").value);
  const mic = Number(document.getElementById("mic").value);

  if (!currentDose || !currentInterval || !trough || !targetLow || !targetHigh) {
    showAdjustResult(tr("pleaseComplete"));
    return;
  }
  if (targetLow >= targetHigh) {
    showAdjustResult(tr("targetLowerError"));
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
  let statusText = tr("statusWithin");
  let extraSafety = tr("extraDefault");

  if (troughState === "low") {
    statusClass = "status-caution";
    statusText = tr("statusLow");
    extraSafety = tr("extraLow");
  } else if (troughState === "high") {
    statusClass = "status-high";
    statusText = tr("statusHigh");
    extraSafety = tr("extraHigh");
  } else if (troughState === "very-high") {
    statusClass = "status-high";
    statusText = tr("statusVeryHigh");
    extraSafety = tr("extraVeryHigh");
  }

  let aucLine = "";
  if (auc && mic) {
    const aucMic = auc / mic;
    const aucClass = aucMic >= 400 && aucMic <= 600 ? "status-ok" : "status-caution";
    aucLine = `<p><strong>${tr("aucMic")}</strong> <span class="${aucClass}">${aucMic.toFixed(1)}</span> ${tr(
      "target400600"
    )}</p>`;
  }

  adjustResult.innerHTML = `
    <p><strong>${tr("statusLabel")}</strong> <span class="${statusClass}">${statusText}</span></p>
    <p><strong>${tr("currentDailyExposure")}</strong> ${Math.round(dailyDose)} ${tr("mgDay")}</p>
    <p><strong>${tr("doseSame", { interval: currentInterval })}</strong> ${Math.max(250, doseSameInterval)} mg</p>
    <p><strong>${tr("doseAlt", { interval: altInterval })}</strong> ${Math.max(250, doseAltInterval)} mg</p>
    <p class="note">${extraSafety}</p>
    ${aucLine}
    <p class="note">${tr("pkApprox")}</p>
  `;
}

function recalcIfResultsShown() {
  if (initialResult.innerHTML.trim()) initialForm.requestSubmit();
  if (adjustResult.innerHTML.trim()) adjustForm.requestSubmit();
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("vanco-lang", lang);
  applyStaticTranslation();
  recalcIfResultsShown();
}

function initNumpad() {
  for (const input of numInputs) {
    input.readOnly = true;
    input.addEventListener("focus", () => setActiveInput(input));
    input.addEventListener("pointerdown", () => setActiveInput(input));
  }

  numpad.addEventListener("pointerdown", (event) => {
    event.preventDefault();
  });

  numpad.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const key = target.dataset.key;
    const action = target.dataset.action;

    if (key) {
      pushNumericKey(key);
      return;
    }
    if (action === "backspace") backspaceKey();
    if (action === "clear") clearKey();
    if (action === "prev") moveInput(-1);
    if (action === "next") moveInput(1);
    if (action === "done") {
      hideNumpad();
      if (activeInput) activeInput.blur();
      clearActiveInput();
    }
  });

  document.addEventListener("pointerdown", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (
      target.closest(".num-input") ||
      target.closest("#numpad") ||
      target.closest("#sex-toggle") ||
      target.closest("#crcl-mode-toggle")
    )
      return;
    hideNumpad();
    clearActiveInput();
  });

  window.addEventListener("resize", () => {
    if (activeInput) ensureInputVisible(activeInput, "auto");
  });
}

function initModeButtons() {
  crclModeToggle.addEventListener("click", () => {
    crclModeInput.value = crclModeInput.value === "auto" ? "manual" : "auto";
    refreshModeButtons();
    syncCrclInputMode();
    setActiveInput(crclModeInput.value === "auto" ? document.getElementById("age") : document.getElementById("crcl"));
  });

  sexToggle.addEventListener("click", () => {
    sexInput.value = sexInput.value === "male" ? "female" : "male";
    refreshModeButtons();
    if (activeInput) {
      showNumpad();
      requestAnimationFrame(() => ensureInputVisible(activeInput));
    }
  });
}

languageToggle.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "th" : "en");
});

initialForm.addEventListener("submit", calculateInitial);
adjustForm.addEventListener("submit", calculateAdjustment);

initNumpad();
initModeButtons();
syncCrclInputMode();
applyStaticTranslation();

setTimeout(() => {
  setActiveInput(document.getElementById("weight"));
}, 80);
