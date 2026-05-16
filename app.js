const initialForm = document.getElementById("initial-form");
const adjustForm = document.getElementById("adjust-form");
const initialResult = document.getElementById("initial-result");
const adjustResult = document.getElementById("adjust-result");
const infusionResult = document.getElementById("infusion-result");
const warfarinResult = document.getElementById("warfarin-result");
const osmoResult = document.getElementById("osmo-result");
const nutritionResult = document.getElementById("nutrition-result");
const antibioticResult = document.getElementById("antibiotic-result");
const languageToggle = document.getElementById("language-toggle");
const initialPanel = document.getElementById("initial-panel");
const adjustPanel = document.getElementById("adjust-panel");
const infusionPanel = document.getElementById("infusion-panel");
const warfarinPanel = document.getElementById("warfarin-panel");
const osmoPanel = document.getElementById("osmo-panel");
const nutritionPanel = document.getElementById("nutrition-panel");
const antibioticPanel = document.getElementById("antibiotic-panel");
const rulesPanel = document.getElementById("rules-panel");
const calculatorSearch = document.getElementById("calculator-search");
const calculatorResults = document.getElementById("calculator-results");
const vancoSubmode = document.getElementById("vanco-submode");
const modeInitialBtn = document.getElementById("mode-initial-btn");
const modeAdjustBtn = document.getElementById("mode-adjust-btn");

const crclModeInput = document.getElementById("crcl-mode");
const crclModeToggle = document.getElementById("crcl-mode-toggle");
const crclModeLeft = document.getElementById("crcl-mode-left");
const crclModeRight = document.getElementById("crcl-mode-right");
const sexInput = document.getElementById("sex");
const sexToggle = document.getElementById("sex-toggle");
const sexLeft = document.getElementById("sex-left");
const sexRight = document.getElementById("sex-right");
const ageWrap = document.getElementById("age-wrap");
const sexWrap = document.getElementById("sex-wrap");
const scrWrap = document.getElementById("scr-wrap");
const manualCrclWrap = document.getElementById("manual-crcl-wrap");
const warfarinTabs = document.getElementById("warfarin-tabs");
const antibioticDrugSearch = document.getElementById("antibiotic-drug-search");
const antibioticDrugInput = document.getElementById("antibiotic-drug");
const antibioticDrugResults = document.getElementById("antibiotic-drug-results");
const antibioticIndicationSelect = document.getElementById("antibiotic-indication");
const antibioticRenalModeSelect = document.getElementById("antibiotic-renal-mode");

const numpad = document.getElementById("numpad");
const numpadPrev = document.getElementById("numpad-prev");
const numpadNext = document.getElementById("numpad-next");
const numpadDone = document.getElementById("numpad-done");
const numInputs = Array.from(document.querySelectorAll(".num-input"));
const isiOSDevice =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isMobileTouchDevice = isiOSDevice || /Android|Mobile/i.test(navigator.userAgent);
const isDesktopInput = !isMobileTouchDevice;
const WARFARIN_TABLET_STRENGTHS = [1, 2, 3, 5];
const THAI_WEEKDAYS = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"];
const WARFARIN_TABLET_STORAGE_KEY = "warfarin-available-tablets";

const WORKFLOWS = {
  initial: {
    panel: initialPanel,
    button: modeInitialBtn,
    firstInputId: "weight",
    form: document.getElementById("initial-form"),
    calculator: "vancomycin"
  },
  adjust: {
    panel: adjustPanel,
    button: modeAdjustBtn,
    firstInputId: "current-dose",
    form: document.getElementById("adjust-form"),
    calculator: "vancomycin"
  },
  infusion: {
    panel: infusionPanel,
    firstInputId: "infusion-weight",
    form: document.getElementById("infusion-form"),
    calculator: "infusion"
  },
  warfarin: {
    panel: warfarinPanel,
    firstInputId: "warfarin-inr",
    form: document.getElementById("warfarin-form"),
    calculator: "warfarin"
  },
  osmo: {
    panel: osmoPanel,
    firstInputId: "osmo-na",
    form: document.getElementById("osmo-form"),
    calculator: "osmo"
  },
  nutrition: {
    panel: nutritionPanel,
    firstInputId: "nutrition-weight",
    form: document.getElementById("nutrition-form"),
    calculator: "nutrition"
  },
  antibiotic: {
    panel: antibioticPanel,
    firstInputId: "antibiotic-crcl",
    form: document.getElementById("antibiotic-form"),
    calculator: "antibiotic"
  }
};

const INFUSION_TABLE = [
  { dose: 500, timeHours: 1, diluentMl: 100 },
  { dose: 750, timeHours: 1.5, diluentMl: 150 },
  { dose: 1000, timeHours: 2, diluentMl: 200 },
  { dose: 1250, timeHours: 2, diluentMl: 250 },
  { dose: 1500, timeHours: 2.5, diluentMl: 300 },
  { dose: 2000, timeHours: 3, diluentMl: 400 }
];

const ANTIBIOTIC_RENAL_DOSING = [
  {
    id: "ceftazidime",
    name: "Ceftazidime",
    indications: [
      {
        name: "Mild - Moderate",
        bands: [
          { min: 50, order: "Ceftazidime 1 g IV q8h" },
          { min: 30, max: 49.999, order: "Ceftazidime 1 g IV q12h" },
          { min: 10, max: 29.999, order: "Ceftazidime 1 g IV q24h" },
          { min: 0, max: 9.999, order: "Ceftazidime 500 mg IV q24h" }
        ],
        hdOrder: "Ceftazidime 500 mg IV q24h; on HD day give after HD"
      },
      {
        name: "Severe",
        bands: [
          { min: 50, order: "Ceftazidime 2 g IV q8h" },
          { min: 30, max: 49.999, order: "Ceftazidime 2 g IV q12h" },
          { min: 10, max: 29.999, order: "Ceftazidime 2 g IV q24h" },
          { min: 0, max: 9.999, order: "Ceftazidime 1 g IV q24h" }
        ],
        hdOrder: "Ceftazidime 1 g IV q24h; on HD day give after HD"
      }
    ]
  },
  {
    id: "cefepime",
    name: "Cefepime",
    indications: [
      {
        name: "CrCl >= 60 standard table",
        bands: [
          { min: 60, order: "Cefepime 2 g IV q8h" },
          { min: 30, max: 59.999, order: "Cefepime 2 g IV q12h" },
          { min: 11, max: 29.999, order: "Cefepime 2 g IV q24h" },
          { min: 0, max: 10.999, order: "Cefepime 1 g IV q24h" }
        ],
        hdOrder: "Cefepime 1 g IV q24h; on HD day give after HD"
      }
    ]
  },
  {
    id: "ceftaroline",
    name: "Ceftaroline",
    indications: [
      {
        name: "Mild - Moderate",
        bands: [
          { min: 50, order: "Ceftaroline 600 mg IV q12h" },
          { min: 31, max: 49.999, order: "Ceftaroline 400 mg IV q12h" },
          { min: 15, max: 30.999, order: "Ceftaroline 300 mg IV q12h" },
          { min: 0, max: 14.999, order: "Ceftaroline 200 mg IV q12h" }
        ],
        hdOrder: "Ceftaroline 200 mg IV q12h"
      },
      {
        name: "Severe",
        bands: [
          { min: 50, order: "Ceftaroline 600 mg IV q8h" },
          { min: 31, max: 49.999, order: "Ceftaroline 400 mg IV q8h" },
          { min: 15, max: 30.999, order: "Ceftaroline 300 mg IV q8h" },
          { min: 0, max: 14.999, order: "Ceftaroline 200 mg IV q8h" }
        ],
        hdOrder: "Ceftaroline 200 mg IV q8h"
      }
    ]
  },
  {
    id: "piperacillin-tazobactam",
    name: "Piperacillin/tazobactam",
    indications: [
      {
        name: "Suspected GNB, drip in 4 hr",
        bands: [
          { min: 50, order: "Piperacillin/tazobactam 4.5 g IV q6-8h (drip in 4 hr)" },
          { min: 41, max: 49.999, order: "Piperacillin/tazobactam 4.5 g IV q6-8h (drip in 4 hr)" },
          { min: 20, max: 40.999, order: "Piperacillin/tazobactam 4.5 g IV q8h (drip in 4 hr)" },
          { min: 10, max: 19.999, order: "Piperacillin/tazobactam 4.5 g IV q12h (drip in 4 hr)" },
          { min: 0, max: 9.999, order: "Piperacillin/tazobactam 4.5 g IV q12h or 2.25 g IV q6h" }
        ],
        hdOrder: "Piperacillin/tazobactam 4.5 g IV q12h PLUS 2.25 g after HD"
      }
    ]
  },
  {
    id: "cefoperazone-sulbactam",
    name: "Cefoperazone/sulbactam",
    indications: [
      {
        name: "Mild - Moderate, non-MDR A. baumannii",
        bands: [
          { min: 50, order: "Cefoperazone/sulbactam 2 g IV q12h" },
          { min: 31, max: 49.999, order: "Cefoperazone/sulbactam 2-4 g IV q12h" },
          { min: 15, max: 30.999, order: "Cefoperazone/sulbactam 2 g IV q12h" },
          { min: 0, max: 14.999, order: "Cefoperazone/sulbactam 1 g IV q12h" }
        ],
        hdOrder: "Cefoperazone/sulbactam 1 g IV q12h; on HD day give after HD",
        note: "Cefoperazone > 4.5 g/day increases bleeding risk."
      },
      {
        name: "Severe, non-MDR A. baumannii",
        bands: [
          { min: 50, order: "Cefoperazone/sulbactam 4 g IV q12h" },
          { min: 31, max: 49.999, order: "Cefoperazone/sulbactam 2-4 g IV q12h" },
          { min: 15, max: 30.999, order: "Cefoperazone/sulbactam 2 g IV q12h" },
          { min: 0, max: 14.999, order: "Cefoperazone/sulbactam 1 g IV q12h" }
        ],
        hdOrder: "Cefoperazone/sulbactam 1 g IV q12h; on HD day give after HD",
        note: "Cefoperazone > 4.5 g/day increases bleeding risk."
      }
    ]
  },
  {
    id: "ceftolozane-tazobactam",
    name: "Ceftolozane/tazobactam",
    indications: [
      {
        name: "Mild - Moderate",
        bands: [
          { min: 50, order: "Ceftolozane/tazobactam 1.5 g IV q8h" },
          { min: 30, max: 49.999, order: "Ceftolozane/tazobactam 750 mg IV q8h" },
          { min: 15, max: 29.999, order: "Ceftolozane/tazobactam 375 mg IV q8h" },
          { min: 0, max: 14.999, order: "Ceftolozane/tazobactam 150 mg IV q8h" }
        ],
        hdOrderLines: ["Ceftolozane/tazobactam 750 mg IV x1", "Then Ceftolozane/tazobactam 150 mg IV q8h; on HD day give after HD"]
      },
      {
        name: "Severe",
        bands: [
          { min: 50, order: "Ceftolozane/tazobactam 3 g IV q8h" },
          { min: 30, max: 49.999, order: "Ceftolozane/tazobactam 1.5 g IV q8h" },
          { min: 15, max: 29.999, order: "Ceftolozane/tazobactam 750 mg IV q8h" },
          { min: 0, max: 14.999, order: "Ceftolozane/tazobactam 450 mg IV q8h" }
        ],
        hdOrderLines: ["Ceftolozane/tazobactam 2.25 g IV x1", "Then Ceftolozane/tazobactam 450 mg IV q8h; on HD day give after HD"]
      }
    ]
  },
  {
    id: "ceftazidime-avibactam",
    name: "Ceftazidime/avibactam",
    indications: [
      {
        name: "Drip in 2 hr",
        bands: [
          { min: 50, order: "Ceftazidime/avibactam 2.5 g IV q8h (drip in 2 hr)" },
          { min: 31, max: 49.999, order: "Ceftazidime/avibactam 1.25 g IV q8h (drip in 2 hr)" },
          { min: 16, max: 30.999, order: "Ceftazidime/avibactam 0.94 g IV q12h (drip in 2 hr)" },
          { min: 10, max: 15.999, order: "Ceftazidime/avibactam 0.94 g IV q24h (drip in 2 hr)" },
          { min: 6, max: 9.999, order: "Ceftazidime/avibactam 0.94 g IV q24h (drip in 2 hr)" },
          { min: 0, max: 5.999, order: "Ceftazidime/avibactam 0.94 g IV q48h (drip in 2 hr)" }
        ],
        hdOrder: "Ceftazidime/avibactam 0.94 g IV q48h; on HD day give after HD"
      }
    ]
  },
  {
    id: "ciprofloxacin",
    name: "Ciprofloxacin",
    indications: [
      {
        name: "Usual doses",
        bands: [
          { min: 50, order: "Ciprofloxacin 400 mg IV q12h" },
          { min: 31, max: 49.999, order: "Ciprofloxacin 400 mg IV q12h (no dosage adjustment)" },
          { min: 0, max: 30.999, order: "Ciprofloxacin 400 mg IV q24h" }
        ],
        hdOrder: "Ciprofloxacin 200-400 mg IV q24h; on HD day give after HD"
      },
      {
        name: "P. aeruginosa",
        bands: [
          { min: 50, order: "Ciprofloxacin 400 mg IV q8h" },
          { min: 31, max: 49.999, order: "Ciprofloxacin 400 mg IV q8h" },
          { min: 0, max: 30.999, order: "Ciprofloxacin 400 mg IV q24h" }
        ],
        hdOrder: "Ciprofloxacin 200-400 mg IV q24h; on HD day give after HD"
      }
    ]
  },
  {
    id: "levofloxacin",
    name: "Levofloxacin",
    indications: [
      {
        name: "Usual doses",
        bands: [
          { min: 50, order: "Levofloxacin 500 mg IV/PO q24h" },
          { min: 20, max: 49.999, order: "Levofloxacin 500 mg IV/PO x1, then 250 mg IV/PO q48h" },
          { min: 0, max: 19.999, order: "Levofloxacin 500 mg IV/PO x1, then 250 mg IV/PO q48h" }
        ],
        hdOrder: "Levofloxacin 500 mg IV/PO x1, then 250 mg IV/PO q48h"
      },
      {
        name: "Severe",
        bands: [
          { min: 50, order: "Levofloxacin 750 mg IV/PO q24h" },
          { min: 20, max: 49.999, order: "Levofloxacin 750 mg IV/PO q48h" },
          { min: 0, max: 19.999, order: "Levofloxacin 750 mg IV/PO x1, then 500 mg IV/PO q48h" }
        ],
        hdOrder: "Levofloxacin 750 mg IV/PO x1, then 500 mg IV/PO q48h"
      }
    ]
  },
  {
    id: "teicoplanin",
    name: "Teicoplanin",
    indications: [
      {
        name: "Septic arthritis or endocarditis",
        bands: [
          { min: 50, order: "Teicoplanin 12 mg/kg IV q12h x 3 doses, then 12 mg/kg IV q24h" },
          { min: 10, max: 49.999, order: "Teicoplanin 12 mg/kg IV q48h" },
          { min: 0, max: 9.999, order: "Teicoplanin 12 mg/kg IV q72h" }
        ],
        hdOrder: "Teicoplanin 12 mg/kg IV q72h"
      },
      {
        name: "Other indications",
        bands: [
          { min: 50, order: "Teicoplanin 6 mg/kg IV q24h" },
          { min: 10, max: 49.999, order: "Teicoplanin 6 mg/kg IV q48h" },
          { min: 0, max: 9.999, order: "Teicoplanin 6 mg/kg IV q72h" }
        ],
        hdOrder: "Teicoplanin 6 mg/kg IV q72h"
      }
    ]
  },
  {
    id: "ertapenem",
    name: "Ertapenem",
    indications: [
      {
        name: "All indications",
        bands: [
          { min: 30, order: "Ertapenem 1 g IV q24h" },
          { min: 0, max: 29.999, order: "Ertapenem 500 mg IV q24h" }
        ],
        hdOrder: "Ertapenem 500 mg IV q24h; on HD day give after HD"
      }
    ]
  },
  {
    id: "imipenem-cilastatin",
    name: "Imipenem/cilastatin",
    indications: [
      {
        name: "All indications",
        bands: [
          { min: 50, order: "Imipenem/cilastatin 1 g IV q8h" },
          { min: 30, max: 49.999, order: "Imipenem/cilastatin 500 mg IV q8h" },
          { min: 15, max: 29.999, order: "Imipenem/cilastatin 500 mg IV q12h" },
          { min: 0, max: 14.999, order: "Do not administer unless hemodialysis is instituted within 48 hr" }
        ],
        hdOrder: "Imipenem/cilastatin 250 mg IV q12h PLUS 250 mg after HD"
      }
    ]
  },
  {
    id: "meropenem",
    name: "Meropenem",
    indications: [
      {
        name: "Mild - Moderate",
        bands: [
          { min: 50, order: "Meropenem 1 g IV q8h" },
          { min: 26, max: 49.999, order: "Meropenem 1 g IV q12h" },
          { min: 10, max: 25.999, order: "Meropenem 500 mg IV q12h" },
          { min: 0, max: 9.999, order: "Meropenem 500 mg IV q24h" }
        ],
        hdOrder: "Meropenem 500 mg IV q24h; on HD day give after HD"
      },
      {
        name: "CNS",
        bands: [
          { min: 50, order: "Meropenem 2 g IV q8h" },
          { min: 26, max: 49.999, order: "Meropenem 1 g IV q8h" },
          { min: 10, max: 25.999, order: "Meropenem 1 g IV q12h" },
          { min: 0, max: 9.999, order: "Meropenem 1 g IV q24h" }
        ],
        hdOrder: "Meropenem 1 g IV q24h; on HD day give after HD"
      }
    ]
  },
  {
    id: "doripenem",
    name: "Doripenem",
    indications: [
      {
        name: "Mild - Moderate",
        bands: [
          { min: 50, order: "Doripenem 500 mg IV q8h" },
          { min: 30, max: 49.999, order: "Doripenem 250 mg IV q8h" },
          { min: 10, max: 29.999, order: "Doripenem 250 mg IV q12h" },
          { min: 0, max: 9.999, order: "Doripenem 250 mg IV q24h" }
        ],
        hdOrder: "Doripenem 250 mg IV q24h; on HD day give after HD"
      },
      {
        name: "Severe",
        bands: [
          { min: 50, order: "Doripenem 1 g IV q8h" },
          { min: 30, max: 49.999, order: "Doripenem 500 mg IV q8h" },
          { min: 10, max: 29.999, order: "Doripenem 500 mg IV q12h" },
          { min: 0, max: 9.999, order: "Doripenem 250 mg IV q12h" }
        ],
        hdOrder: "Doripenem 500 mg IV q24h; on HD day give after HD"
      }
    ]
  },
  {
    id: "colistin",
    name: "Colistin",
    indications: [
      {
        name: "MDR A. baumannii / CRE",
        bands: [
          { min: 80, orderLines: ["Colistin loading dose 300 mg IV x1", "Then Colistin 150 mg IV q8-12h"] },
          { min: 51, max: 79.999, orderLines: ["Colistin loading dose 300 mg IV x1", "Then Colistin 150 mg IV q12h"] },
          { min: 41, max: 50.999, orderLines: ["Colistin loading dose 300 mg IV x1", "Then Colistin 150 mg IV q12h"] },
          { min: 21, max: 40.999, orderLines: ["Colistin loading dose 300 mg IV x1", "Then Colistin 100 mg IV q12h"] },
          { min: 0, max: 20.999, orderLines: ["Colistin loading dose 300 mg IV x1", "Then Colistin 150 mg IV q24h"] }
        ],
        hdOrderLines: ["Colistin loading dose 300 mg IV x1", "Non-HD day: Colistin 150 mg IV q24h", "HD day: Colistin 200 mg IV after HD"]
      }
    ]
  },
  {
    id: "sulbactam",
    name: "Sulbactam",
    indications: [
      { name: "MIC 1", bands: [{ min: 90, order: "Sulbactam 1 g IV q8h" }, { min: 60, max: 89.999, order: "Sulbactam 1 g IV q8h" }, { min: 30, max: 59.999, order: "Sulbactam 1 g IV q12h" }, { min: 0, max: 29.999, order: "Sulbactam 1 g IV q12h" }], hdOrder: "Sulbactam 3 g IV q24h" },
      { name: "MIC 2", bands: [{ min: 90, order: "Sulbactam 1 g IV q8h" }, { min: 60, max: 89.999, order: "Sulbactam 1 g IV q8h" }, { min: 30, max: 59.999, order: "Sulbactam 1 g IV q12h" }, { min: 0, max: 29.999, order: "Sulbactam 1 g IV q12h" }], hdOrder: "Sulbactam 3 g IV q24h" },
      { name: "MIC 4", bands: [{ min: 90, order: "Sulbactam 1 g IV q6h" }, { min: 60, max: 89.999, order: "Sulbactam 1 g IV q8h" }, { min: 30, max: 59.999, order: "Sulbactam 1 g IV q8h" }, { min: 0, max: 29.999, order: "Sulbactam 1 g IV q12h" }], hdOrder: "Sulbactam 3 g IV q24h" },
      { name: "MIC 8", bands: [{ min: 90, order: "Sulbactam 2 g IV q6h" }, { min: 60, max: 89.999, order: "Sulbactam 1 g IV q6h" }, { min: 30, max: 59.999, order: "Sulbactam 1 g IV q8h" }, { min: 0, max: 29.999, order: "Sulbactam 1 g IV q8h" }], hdOrder: "Sulbactam 3 g IV q24h" },
      { name: "MIC 16", bands: [{ min: 90, order: "Sulbactam 3 g IV q6h" }, { min: 60, max: 89.999, order: "Sulbactam 2 g IV q6h" }, { min: 30, max: 59.999, order: "Sulbactam 2 g IV q8h" }, { min: 0, max: 29.999, order: "Sulbactam 1 g IV q6h" }], hdOrder: "Sulbactam 3 g IV q24h" },
      { name: "MIC 32", bands: [{ min: 90, order: "Sulbactam 3 g IV q6h or 12 g continuous infusion over 24h" }, { min: 60, max: 89.999, order: "Sulbactam 3 g IV q6h or 12 g continuous infusion over 24h" }, { min: 30, max: 59.999, order: "Sulbactam 3 g IV q6h" }, { min: 0, max: 29.999, order: "Sulbactam 2 g IV q6h" }], hdOrder: "Sulbactam 3 g IV q24h" },
      { name: "MIC 64", bands: [{ min: 90, order: "Not recommended" }, { min: 60, max: 89.999, order: "Not recommended" }, { min: 30, max: 59.999, order: "Not recommended" }, { min: 0, max: 29.999, order: "Sulbactam 3 g IV q6h" }], hdOrder: "Sulbactam 3 g IV q24h" }
    ],
    note: "According to MIC; consult ID."
  },
  {
    id: "ampicillin-sulbactam",
    name: "Ampicillin/sulbactam",
    indications: [
      {
        name: "Usual doses, drip in 4 hr",
        bands: [
          { min: 50, order: "Ampicillin/sulbactam 1.5-3 g IV q6h (drip in 4 hr)" },
          { min: 30, max: 49.999, order: "Ampicillin/sulbactam 1.5-3 g IV q8h (drip in 4 hr)" },
          { min: 15, max: 29.999, order: "Ampicillin/sulbactam 1.5-3 g IV q12h (drip in 4 hr)" },
          { min: 0, max: 14.999, order: "Ampicillin/sulbactam 1.5-3 g IV q24h (drip in 4 hr)" }
        ],
        hdOrder: "Ampicillin/sulbactam 1.5-3 g IV q24h; on HD day give after HD"
      },
      {
        name: "MDR A. baumannii, MIC 16 mcg/mL",
        bands: [
          { min: 60, order: "Ampicillin/sulbactam 9 g IV q6h (drip in 4 hr)" },
          { min: 50, max: 59.999, order: "Ampicillin/sulbactam 9 g IV q8h (drip in 4 hr)" },
          { min: 30, max: 49.999, order: "Ampicillin/sulbactam 6 g IV q8h (drip in 4 hr)" },
          { min: 0, max: 29.999, order: "Ampicillin/sulbactam 6 g IV q8h (drip in 4 hr)" }
        ],
        hdOrder: "Ampicillin/sulbactam 6 g IV q8h"
      }
    ]
  },
  {
    id: "fosfomycin",
    name: "Fosfomycin",
    indications: [
      {
        name: "MIC 32 mcg/mL (8 g/day), drip in 4 hr",
        bands: [
          { min: 80, order: "Fosfomycin 4 g IV q12h (drip in 4 hr)" },
          { min: 50, max: 79.999, order: "Fosfomycin 3 g IV q12h (drip in 4 hr)" },
          { min: 30, max: 49.999, order: "Fosfomycin 2 g IV q12h (drip in 4 hr)" },
          { min: 15, max: 29.999, order: "Fosfomycin 3 g IV q24h (drip in 4 hr)" },
          { min: 0, max: 14.999, order: "Fosfomycin 2 g IV q24h (drip in 4 hr)" }
        ],
        hdOrder: "Fosfomycin 2 g IV q48h (drip in 4 hr)"
      },
      {
        name: "MIC 64 mcg/mL (16 g/day), drip in 4 hr",
        bands: [
          { min: 80, order: "Fosfomycin 4 g IV q6h (drip in 4 hr)" },
          { min: 50, max: 79.999, order: "Fosfomycin 4 g IV q8h (drip in 4 hr)" },
          { min: 30, max: 49.999, order: "Fosfomycin 4 g IV q12h (drip in 4 hr)" },
          { min: 15, max: 29.999, order: "Fosfomycin 4 g IV q12h (drip in 4 hr)" },
          { min: 0, max: 14.999, order: "Fosfomycin 4 g IV q24h (drip in 4 hr)" }
        ],
        hdOrder: "Fosfomycin 4 g IV q48h (drip in 4 hr)"
      },
      {
        name: "MIC > 64 mcg/mL (24 g/day), drip in 4 hr",
        bands: [
          { min: 80, order: "Fosfomycin 4 g IV q4h (drip in 4 hr)" },
          { min: 50, max: 79.999, order: "Fosfomycin 4 g IV q6h (drip in 4 hr)" },
          { min: 30, max: 49.999, order: "Fosfomycin 4 g IV q8h (drip in 4 hr)" },
          { min: 15, max: 29.999, order: "Fosfomycin 4 g IV q12h (drip in 4 hr)" },
          { min: 0, max: 14.999, order: "Fosfomycin 4 g IV q24h (drip in 4 hr)" }
        ],
        hdOrder: "Fosfomycin 4 g IV q48h (drip in 4 hr)"
      }
    ],
    note: "For MDR pathogen; interpret MIC and indication with ID."
  }
];

const I18N = {
  en: {
    docTitle: "Clinical Calculator Assistant",
    langButton: "ไทย",
    eyebrow: "Adult Protocol Helper",
    heroTitle: "Clinical Dosing + Nutrition Calculator",
    lead: "Phone-first and desktop-friendly tools for vancomycin initial dosing/TDM, infusion rate conversion, warfarin adjustment, serum osmolality, and nutrition goals.",
    warning:
      "Clinical decision support only. Final prescription must be confirmed by physician/pharmacist and local hospital policy.",
    modePrompt: "Search calculator",
    searchLabel: "Search calculators",
    searchPlaceholder: "Search: vanco, antibiotic, warfarin, osmo...",
    noCalculatorResults: "No matching calculators.",
    openCalculator: "Open",
    vancoCalcName: "Vancomycin dosing",
    vancoCalcDesc: "Loading dose, maintenance regimen, CrCl interval, and serum-level adjustment.",
    infusionCalcName: "Infusion rate",
    infusionCalcDesc: "Convert mcg/kg/min to mL/hr from body weight, drug amount, and final volume.",
    warfarinCalcName: "Warfarin adjustment",
    warfarinCalcDesc: "Estimate weekly dose adjustment from current INR and target range.",
    osmoCalcName: "Serum osmolality",
    osmoCalcDesc: "Calculate serum osmolality from sodium, glucose, and BUN.",
    nutritionCalcName: "Nutrition goals",
    nutritionCalcDesc: "Estimate calories, protein, fluid/volume, and an enteral formula plan.",
    antibioticCalcName: "Antibiotic renal dosing",
    antibioticCalcDesc: "Choose an antibiotic, indication, and CrCl to generate a renal-adjusted ready order.",
    vancoSubPrompt: "Choose vancomycin workflow",
    modeInitial: "Loading + initial regimen",
    modeAdjust: "Maintenance / TDM adjustment",
    modeInfusion: "Infusion rate",
    modeWarfarin: "Warfarin",
    modeOsmo: "Serum osmo",
    modeNutrition: "Nutrition",
    initialHeading: "1) Initial Dosing",
    weightLabel: "Actual body weight (kg)",
    crclModeLabel: "CrCl input method",
    modeAutoPill: "Auto-calculate",
    modeManualPill: "Manual",
    ageLabel: "Patient age (years)",
    sexLabel: "Sex for Cockcroft-Gault",
    sexMalePill: "Male",
    sexFemalePill: "Female x0.85",
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
    currentIntervalPlaceholder: "Select interval",
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
    pkApprox: "This adjustment uses proportional PK approximation; use institution protocol/AUC software when available.",
    infusionHeading: "mcg/kg/min to mL/hr",
    infusionWeightLabel: "Body weight (kg)",
    infusionDoseLabel: "Dose (mcg/kg/min)",
    infusionDrugLabel: "Drug amount in bag (mg)",
    infusionVolumeLabel: "Final volume (mL)",
    infusionNeed: "Fill weight, dose, drug amount, and final volume.",
    infusionRate: "Infusion rate:",
    infusionConc: "Concentration:",
    warfarinHeading: "Warfarin adjustment",
    warfarinInrLabel: "Current INR",
    warfarinWeeklyLabel: "Current weekly dose (mg/week)",
    warfarinTargetLowLabel: "Target INR lower",
    warfarinTargetHighLabel: "Target INR upper",
    warfarinTabsLabel: "Available tablet strengths",
    warfarinNeed: "Fill current INR and current weekly dose.",
    warfarinNoTabs: "Select at least one available tablet strength.",
    warfarinInvalidTarget: "Target INR lower must be less than upper.",
    warfarinPlan: "Suggested weekly dose:",
    warfarinRxTitle: "Prescription Ready - click to copy",
    warfarinCopied: "Copied prescription to clipboard.",
    warfarinCopyFailed: "Copy failed. Select and copy manually.",
    warfarinActualWeekly: "Prescription total:",
    warfarinApprox: "Exact tablet-based schedule when feasible; verify against patient-specific plan.",
    warfarinContinue: "Continue current weekly dose.",
    warfarinHoldUrgent: "Hold warfarin and urgent clinician review.",
    warfarinHoldReduce: "Hold 1-2 doses, then reduce weekly dose by about 20%.",
    warfarinReduce: "Reduce weekly dose by about 10%.",
    warfarinIncreaseHigh: "Increase weekly dose by about 15%; consider bridging if high thrombotic risk.",
    warfarinIncrease: "Increase weekly dose by about 10%.",
    warfarinHoldReassess: "hold / reassess",
    warfarinNote: "Protocol-style estimate only. Check bleeding, missed doses, interactions, diet change, and local anticoagulation policy.",
    osmoHeading: "Calculated serum osmolality",
    osmoNaLabel: "Sodium, Na (mEq/L)",
    osmoGlucoseLabel: "Glucose (mg/dL)",
    osmoBunLabel: "BUN (mg/dL)",
    osmoNeed: "Fill Na, glucose, and BUN.",
    osmoResult: "Calculated serum osmolality:",
    nutritionHeading: "Nutrition goals",
    nutritionWeightLabel: "Body weight (kg)",
    nutritionHeightLabel: "Height (cm)",
    nutritionCkdLabel: "CKD",
    nutritionAkiLabel: "AKI",
    nutritionCriticalLabel: "Critical illness",
    nutritionRefeedingLabel: "Risk refeeding",
    nutritionEnteralLabel: "Enteral/oral feeding",
    nutritionNeed: "Fill body weight and height.",
    nutritionBmi: "BMI:",
    nutritionEnergy: "Total calories:",
    nutritionProtein: "Total protein:",
    nutritionVolume: "Estimated fluid/volume:",
    nutritionFormula: "Example enteral plan:",
    nutritionCaution: "Use clinical judgment for fluid restriction, dialysis, electrolytes, glycemic control, and refeeding monitoring.",
    antibioticHeading: "Antibiotic renal dosing",
    antibioticDrugLabel: "Antibiotic",
    antibioticDrugPlaceholder: "Type antibiotic name...",
    antibioticNoDrugResults: "No matching antibiotic.",
    antibioticIndicationLabel: "Indication / regimen",
    antibioticRenalModeLabel: "Renal mode",
    antibioticCrclLabel: "CrCl (mL/min)",
    antibioticNeed: "Select antibiotic/regimen and fill CrCl.",
    antibioticOrderReady: "Order Ready - click to copy",
    antibioticCopied: "Copied order to clipboard.",
    antibioticCopyFailed: "Copy failed. Select and copy the order manually.",
    antibioticCrclUsed: "CrCl used:",
    antibioticRenalModeCrcl: "Non-HD: use CrCl",
    antibioticRenalModeHd: "Intermittent hemodialysis",
    antibioticHdMode: "Intermittent HD dosing used",
    antibioticSourceNote: "Based on the 2024 hospital renal antibiotic dosing table provided by the user. Confirm indication severity, allergy, cultures, dialysis/CRRT status, and ID/pharmacy when needed."
  },
  th: {
    docTitle: "เครื่องมือคำนวณทางคลินิก",
    langButton: "English",
    eyebrow: "ผู้ช่วยแนวทางผู้ป่วยผู้ใหญ่",
    heroTitle: "เครื่องมือคำนวณยาและโภชนบำบัด",
    lead:
      "รองรับการคำนวณ vancomycin เริ่มต้น/TDM, แปลงอัตราให้ยา, ปรับ warfarin, serum osmolality และเป้าหมายโภชนบำบัด ใช้งานได้ทั้งมือถือและเดสก์ท็อป",
    warning:
      "ใช้เพื่อช่วยตัดสินใจทางคลินิกเท่านั้น คำสั่งยาสุดท้ายต้องยืนยันโดยแพทย์/เภสัชกร และนโยบายของโรงพยาบาล",
    modePrompt: "ค้นหาเครื่องคำนวณ",
    searchLabel: "ค้นหาเครื่องคำนวณ",
    searchPlaceholder: "ค้นหา: vanco, antibiotic, warfarin, osmo...",
    noCalculatorResults: "ไม่พบเครื่องคำนวณที่ตรงกัน",
    openCalculator: "เปิด",
    vancoCalcName: "Vancomycin dosing",
    vancoCalcDesc: "คำนวณ loading dose, maintenance regimen, ความถี่ตาม CrCl และปรับตามระดับยา",
    infusionCalcName: "อัตราการให้ยา",
    infusionCalcDesc: "แปลง mcg/kg/min เป็น mL/hr จากน้ำหนัก ปริมาณยา และปริมาตรรวม",
    warfarinCalcName: "ปรับยา Warfarin",
    warfarinCalcDesc: "ประเมินการปรับขนาดยารวมต่อสัปดาห์จาก INR และช่วงเป้าหมาย",
    osmoCalcName: "Serum osmolality",
    osmoCalcDesc: "คำนวณ serum osmolality จาก sodium, glucose และ BUN",
    nutritionCalcName: "เป้าหมายโภชนบำบัด",
    nutritionCalcDesc: "ประเมินพลังงาน โปรตีน ปริมาตร/สารน้ำ และตัวอย่างสูตร enteral",
    antibioticCalcName: "ปรับขนาด antibiotic ตามไต",
    antibioticCalcDesc: "เลือกยา indication และ CrCl เพื่อสร้างคำสั่งยาที่ปรับตาม renal function พร้อมคัดลอก",
    vancoSubPrompt: "เลือก workflow ของ vancomycin",
    modeInitial: "Loading + initial regimen",
    modeAdjust: "Maintenance / TDM adjustment",
    modeInfusion: "อัตราการให้ยา",
    modeWarfarin: "Warfarin",
    modeOsmo: "Serum osmo",
    modeNutrition: "โภชนบำบัด",
    initialHeading: "1) คำนวณขนาดยาเริ่มต้น",
    weightLabel: "น้ำหนักจริงผู้ป่วย (กก.)",
    crclModeLabel: "วิธีระบุค่า CrCl",
    modeAutoPill: "อัตโนมัติ",
    modeManualPill: "กรอกเอง",
    ageLabel: "อายุผู้ป่วย (ปี)",
    sexLabel: "เพศสำหรับสูตร Cockcroft-Gault",
    sexMalePill: "ชาย",
    sexFemalePill: "หญิง x0.85",
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
    currentIntervalLabel: "ความถี่การให้ยาปัจจุบัน (ชั่วโมง)",
    currentIntervalPlaceholder: "เลือกความถี่",
    troughLabel: "ค่า Ctrough ที่วัดได้ (mg/L)",
    targetLowLabel: "ค่าเป้าหมายต่ำสุดของ trough (mg/L)",
    targetHighLabel: "ค่าเป้าหมายสูงสุดของ trough (mg/L)",
    aucLabel: "ค่า AUC24 (ถ้ามี) (mg·h/L)",
    micLabel: "ค่า MIC (ถ้ามี) (mg/L)",
    calcAdjustBtn: "คำนวณการปรับยา",
    rulesHeading: "สรุปเกณฑ์อ้างอิงจากแผนภาพ",
    rule1: "Loading dose: 20-30 mg/kg (น้ำหนักจริง).",
    rule2: "Maintenance dose: 15-20 mg/kg ต่อครั้ง.",
    rule3: "ความถี่ตาม CrCl: > 50 mL/min = q8-12h, 30-50 = q24h, < 30 = ให้ครั้งเดียวแล้วติดตามระดับยา.",
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
    extraLow: "พิจารณาเพิ่มขนาดยา/เพิ่มความถี่การให้ยา และติดตามระดับยาหลังถึง steady state ใหม่",
    extraHigh: "ลดขนาดยาและ/หรือลดความถี่การให้ยา แล้วติดตาม trough ก่อนเข็มที่ 3-4 หลังปรับ",
    extraVeryHigh: "ควรปรึกษาแพทย์/เภสัชกรอย่างเร่งด่วน และติดตามการทำงานของไตใกล้ชิด",
    extraDefault: "ติดตาม trough ที่ steady state หรือเร็วกว่านั้นหากการทำงานไตเปลี่ยน",
    targetLowerError: "ค่าเป้าหมายต่ำสุดต้องน้อยกว่าค่าเป้าหมายสูงสุด",
    statusLabel: "สถานะ:",
    currentDailyExposure: "การได้รับยารวมต่อวันปัจจุบัน:",
    doseSame: "ข้อเสนอแนะขนาดยา (ช่วงห่างเดิม q{interval}h):",
    doseAlt: "ทางเลือก (q{interval}h):",
    aucMic: "ค่า AUC/MIC:",
    target400600: "(เป้าหมาย 400-600)",
    pkApprox: "การคำนวณนี้ใช้การประมาณแบบสัดส่วน PK; หากมี protocol/AUC software ของหน่วยงานให้ใช้อ้างอิงร่วม",
    infusionHeading: "แปลง mcg/kg/min เป็น mL/hr",
    infusionWeightLabel: "น้ำหนักตัว (กก.)",
    infusionDoseLabel: "ขนาดยา (mcg/kg/min)",
    infusionDrugLabel: "ปริมาณยาในถุง (mg)",
    infusionVolumeLabel: "ปริมาตรรวม (mL)",
    infusionNeed: "กรอกน้ำหนัก, ขนาดยา, ปริมาณยาในถุง และปริมาตรรวม",
    infusionRate: "อัตราการให้ยา:",
    infusionConc: "ความเข้มข้น:",
    warfarinHeading: "ปรับยา Warfarin",
    warfarinInrLabel: "INR ปัจจุบัน",
    warfarinWeeklyLabel: "ขนาดยารวมปัจจุบัน (mg/สัปดาห์)",
    warfarinTargetLowLabel: "INR เป้าหมายต่ำสุด",
    warfarinTargetHighLabel: "INR เป้าหมายสูงสุด",
    warfarinTabsLabel: "ขนาดเม็ดที่มี",
    warfarinNeed: "กรอก INR ปัจจุบัน และขนาดยารวมต่อสัปดาห์",
    warfarinNoTabs: "เลือกขนาดเม็ดที่มีอย่างน้อย 1 ขนาด",
    warfarinInvalidTarget: "ค่า INR เป้าหมายต่ำสุดต้องน้อยกว่าค่าสูงสุด",
    warfarinPlan: "ขนาดยาต่อสัปดาห์ที่แนะนำ:",
    warfarinRxTitle: "คำสั่งยาพร้อมใช้ - คลิกเพื่อคัดลอก",
    warfarinCopied: "คัดลอกคำสั่งยาแล้ว",
    warfarinCopyFailed: "คัดลอกไม่สำเร็จ กรุณาเลือกและคัดลอกเอง",
    warfarinActualWeekly: "ขนาดยารวมตามคำสั่ง:",
    warfarinApprox: "เป็นตารางยาตามขนาดเม็ดที่เลือก โดยใช้ครึ่งเม็ดได้เมื่อต้องการ ต้องตรวจทานกับแผนเฉพาะผู้ป่วย",
    warfarinContinue: "ให้ขนาดยารวมต่อสัปดาห์เดิม",
    warfarinHoldUrgent: "งด warfarin และปรึกษาแพทย์อย่างเร่งด่วน",
    warfarinHoldReduce: "งด 1-2 dose แล้วลดขนาดยารวมต่อสัปดาห์ประมาณ 20%",
    warfarinReduce: "ลดขนาดยารวมต่อสัปดาห์ประมาณ 10%",
    warfarinIncreaseHigh: "เพิ่มขนาดยารวมต่อสัปดาห์ประมาณ 15%; พิจารณา bridging หากเสี่ยง thrombosis สูง",
    warfarinIncrease: "เพิ่มขนาดยารวมต่อสัปดาห์ประมาณ 10%",
    warfarinHoldReassess: "งดยา / ประเมินซ้ำ",
    warfarinNote: "เป็นการประเมินตาม protocol เท่านั้น ต้องประเมินเลือดออก ลืมยา interaction อาหาร และแนวทางของหน่วยงานร่วมด้วย",
    osmoHeading: "คำนวณ serum osmolality",
    osmoNaLabel: "Sodium, Na (mEq/L)",
    osmoGlucoseLabel: "Glucose (mg/dL)",
    osmoBunLabel: "BUN (mg/dL)",
    osmoNeed: "กรอก Na, glucose และ BUN",
    osmoResult: "Calculated serum osmolality:",
    nutritionHeading: "เป้าหมายโภชนบำบัด",
    nutritionWeightLabel: "น้ำหนักตัว (กก.)",
    nutritionHeightLabel: "ส่วนสูง (ซม.)",
    nutritionCkdLabel: "CKD",
    nutritionAkiLabel: "AKI",
    nutritionCriticalLabel: "Critical illness",
    nutritionRefeedingLabel: "เสี่ยง refeeding",
    nutritionEnteralLabel: "ให้อาหาร enteral/oral",
    nutritionNeed: "กรอกน้ำหนักและส่วนสูง",
    nutritionBmi: "BMI:",
    nutritionEnergy: "พลังงานรวม:",
    nutritionProtein: "โปรตีนรวม:",
    nutritionVolume: "ปริมาตร/สารน้ำโดยประมาณ:",
    nutritionFormula: "ตัวอย่างสูตร enteral:",
    nutritionCaution: "ใช้ดุลยพินิจร่วมกับข้อจำกัดสารน้ำ dialysis electrolyte glycemic control และการเฝ้าระวัง refeeding",
    antibioticHeading: "ปรับขนาด antibiotic ตามไต",
    antibioticDrugLabel: "Antibiotic",
    antibioticDrugPlaceholder: "พิมพ์ชื่อ antibiotic...",
    antibioticNoDrugResults: "ไม่พบ antibiotic ที่ตรงกัน",
    antibioticIndicationLabel: "Indication / regimen",
    antibioticRenalModeLabel: "Renal mode",
    antibioticCrclLabel: "CrCl (mL/min)",
    antibioticNeed: "เลือกยา/regimen และกรอก CrCl",
    antibioticOrderReady: "คำสั่งยาพร้อมใช้ - คลิกเพื่อคัดลอก",
    antibioticCopied: "คัดลอกคำสั่งยาแล้ว",
    antibioticCopyFailed: "คัดลอกไม่สำเร็จ กรุณาเลือกและคัดลอกคำสั่งยาเอง",
    antibioticCrclUsed: "CrCl ที่ใช้:",
    antibioticRenalModeCrcl: "Non-HD: ใช้ CrCl",
    antibioticRenalModeHd: "Intermittent hemodialysis",
    antibioticHdMode: "ใช้ขนาดยาสำหรับ intermittent HD",
    antibioticSourceNote: "อิงจากตารางปรับขนาด antibiotic ตาม renal function ของโรงพยาบาล version 2024 ที่ผู้ใช้ให้มา ต้องตรวจทาน indication ความรุนแรง allergy culture dialysis/CRRT และปรึกษา ID/เภสัชกรเมื่อจำเป็น"
  }
};

let currentLang = localStorage.getItem("vanco-lang") === "th" ? "th" : "en";
let currentWorkflow = localStorage.getItem("vanco-workflow-mode") || "";
let currentCalculator = localStorage.getItem("clinical-calculator") || "";
let activeInput = null;
let activeActionButton = null;

const staticMap = [
  ["t-eyebrow", "eyebrow"],
  ["t-hero-title", "heroTitle"],
  ["t-lead", "lead"],
  ["t-warning", "warning"],
  ["t-mode-prompt", "modePrompt"],
  ["t-search-label", "searchLabel"],
  ["t-vanco-subprompt", "vancoSubPrompt"],
  ["t-mode-initial", "modeInitial"],
  ["t-mode-adjust", "modeAdjust"],
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
  ["t-current-interval-placeholder", "currentIntervalPlaceholder"],
  ["t-trough-label", "troughLabel"],
  ["t-target-low-label", "targetLowLabel"],
  ["t-target-high-label", "targetHighLabel"],
  ["t-auc-label", "aucLabel"],
  ["t-mic-label", "micLabel"],
  ["t-calc-adjust-btn", "calcAdjustBtn"],
  ["t-infusion-heading", "infusionHeading"],
  ["t-infusion-weight-label", "infusionWeightLabel"],
  ["t-infusion-dose-label", "infusionDoseLabel"],
  ["t-infusion-drug-label", "infusionDrugLabel"],
  ["t-infusion-volume-label", "infusionVolumeLabel"],
  ["t-warfarin-heading", "warfarinHeading"],
  ["t-warfarin-inr-label", "warfarinInrLabel"],
  ["t-warfarin-weekly-label", "warfarinWeeklyLabel"],
  ["t-warfarin-target-low-label", "warfarinTargetLowLabel"],
  ["t-warfarin-target-high-label", "warfarinTargetHighLabel"],
  ["t-warfarin-tabs-label", "warfarinTabsLabel"],
  ["t-osmo-heading", "osmoHeading"],
  ["t-osmo-na-label", "osmoNaLabel"],
  ["t-osmo-glucose-label", "osmoGlucoseLabel"],
  ["t-osmo-bun-label", "osmoBunLabel"],
  ["t-nutrition-heading", "nutritionHeading"],
  ["t-nutrition-weight-label", "nutritionWeightLabel"],
  ["t-nutrition-height-label", "nutritionHeightLabel"],
  ["t-nutrition-ckd-label", "nutritionCkdLabel"],
  ["t-nutrition-aki-label", "nutritionAkiLabel"],
  ["t-nutrition-critical-label", "nutritionCriticalLabel"],
  ["t-nutrition-refeeding-label", "nutritionRefeedingLabel"],
  ["t-nutrition-enteral-label", "nutritionEnteralLabel"],
  ["t-antibiotic-heading", "antibioticHeading"],
  ["t-antibiotic-drug-label", "antibioticDrugLabel"],
  ["t-antibiotic-indication-label", "antibioticIndicationLabel"],
  ["t-antibiotic-renal-mode-label", "antibioticRenalModeLabel"],
  ["t-antibiotic-crcl-label", "antibioticCrclLabel"],
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

function getCalculatorOptions() {
  return [
    {
      id: "vancomycin",
      workflow: "",
      name: tr("vancoCalcName"),
      description: tr("vancoCalcDesc"),
      keywords: "vanco vancomycin loading maintenance trough tdm serum level crcl kidney renal dose"
    },
    {
      id: "infusion",
      workflow: "infusion",
      name: tr("infusionCalcName"),
      description: tr("infusionCalcDesc"),
      keywords: "infusion rate mcg/kg/min ml/hr drip norepinephrine dopamine dobutamine"
    },
    {
      id: "warfarin",
      workflow: "warfarin",
      name: tr("warfarinCalcName"),
      description: tr("warfarinCalcDesc"),
      keywords: "warfarin inr anticoagulation weekly dose adjust"
    },
    {
      id: "osmo",
      workflow: "osmo",
      name: tr("osmoCalcName"),
      description: tr("osmoCalcDesc"),
      keywords: "osmo osmolality serum sodium glucose bun osm"
    },
    {
      id: "nutrition",
      workflow: "nutrition",
      name: tr("nutritionCalcName"),
      description: tr("nutritionCalcDesc"),
      keywords: "nutrition calories protein fluid volume enteral oral bd feed refeeding ckd aki critical"
    },
    {
      id: "antibiotic",
      workflow: "antibiotic",
      name: tr("antibioticCalcName"),
      description: tr("antibioticCalcDesc"),
      keywords:
        "antibiotic renal dose renal dosing crcl ceftriaxone cefepime zosyn piperacillin tazobactam meropenem ertapenem levofloxacin metronidazole linezolid doxycycline azithromycin"
    }
  ];
}

function hideWorkflowPanels() {
  for (const config of Object.values(WORKFLOWS)) {
    config.panel.classList.add("hidden");
  }
  rulesPanel.classList.add("hidden");
  hideNumpad();
  clearActiveTarget();
}

function renderCalculatorResults() {
  const query = calculatorSearch.value.trim().toLowerCase();
  const options = getCalculatorOptions();
  const filtered = options.filter((option) => {
    const haystack = `${option.name} ${option.description} ${option.keywords}`.toLowerCase();
    return !query || haystack.includes(query);
  });

  if (!filtered.length) {
    calculatorResults.innerHTML = `<p class="empty-results">${tr("noCalculatorResults")}</p>`;
    return;
  }

  calculatorResults.innerHTML = filtered
    .map(
      (option) => `
        <button type="button" class="calculator-card ${
          currentCalculator === option.id ? "active" : ""
        }" data-calculator="${option.id}">
          <span class="calculator-copy">
            <strong>${option.name}</strong>
            <span>${option.description}</span>
          </span>
          <span class="calculator-open">${tr("openCalculator")}</span>
        </button>
      `
    )
    .join("");
}

function selectCalculator(calculatorId, { persist = true, focus = true, keepWorkflow = false } = {}) {
  if (!calculatorId) return;
  currentCalculator = calculatorId;
  if (persist) localStorage.setItem("clinical-calculator", calculatorId);
  renderCalculatorResults();

  const isVanco = calculatorId === "vancomycin";
  vancoSubmode.classList.toggle("hidden", !isVanco);

  if (isVanco) {
    if (!keepWorkflow || !["initial", "adjust"].includes(currentWorkflow)) {
      currentWorkflow = "";
      localStorage.removeItem("vanco-workflow-mode");
      hideWorkflowPanels();
      refreshWorkflowButtons();
      return;
    }
    setWorkflow(currentWorkflow, { persist: false, focus });
    return;
  }

  const option = getCalculatorOptions().find((item) => item.id === calculatorId);
  if (option?.workflow) setWorkflow(option.workflow, { persist, focus });
}

function applyStaticTranslation() {
  document.documentElement.lang = currentLang;
  document.title = tr("docTitle");
  languageToggle.textContent = tr("langButton");
  calculatorSearch.placeholder = tr("searchPlaceholder");
  antibioticDrugSearch.placeholder = tr("antibioticDrugPlaceholder");
  antibioticRenalModeSelect.options[0].textContent = tr("antibioticRenalModeCrcl");
  antibioticRenalModeSelect.options[1].textContent = tr("antibioticRenalModeHd");
  numpadPrev.textContent = tr("numpadPrev");
  numpadNext.textContent = tr("numpadNext");
  numpadDone.textContent = tr("numpadDone");

  for (const [id, key] of staticMap) {
    const el = document.getElementById(id);
    if (el) el.textContent = tr(key);
  }
  refreshModeButtons();
  refreshWorkflowButtons();
  renderCalculatorResults();
}

function refreshModeButtons() {
  const isAuto = crclModeInput.value === "auto";
  crclModeToggle.dataset.active = isAuto ? "left" : "right";
  crclModeLeft.textContent = tr("modeAutoPill");
  crclModeRight.textContent = tr("modeManualPill");

  const isMale = sexInput.value === "male";
  sexToggle.dataset.active = isMale ? "left" : "right";
  sexLeft.textContent = tr("sexMalePill");
  sexRight.textContent = tr("sexFemalePill");
}

function refreshWorkflowButtons() {
  for (const [mode, config] of Object.entries(WORKFLOWS)) {
    if (config.button) config.button.classList.toggle("active", currentWorkflow === mode);
  }
}

function setWorkflow(mode, { persist = true, focus = true } = {}) {
  currentWorkflow = mode;
  if (persist) localStorage.setItem("vanco-workflow-mode", mode);

  const hasSelection = Object.prototype.hasOwnProperty.call(WORKFLOWS, mode);
  if (hasSelection) {
    currentCalculator = WORKFLOWS[mode].calculator;
    if (persist) localStorage.setItem("clinical-calculator", currentCalculator);
  }

  for (const [workflowMode, config] of Object.entries(WORKFLOWS)) {
    config.panel.classList.toggle("hidden", mode !== workflowMode);
  }
  vancoSubmode.classList.toggle("hidden", currentCalculator !== "vancomycin");
  rulesPanel.classList.toggle("hidden", !(mode === "initial" || mode === "adjust"));
  refreshWorkflowButtons();
  renderCalculatorResults();

  if (!hasSelection) {
    hideNumpad();
    clearActiveTarget();
    return;
  }

  if (!focus) return;
  const targetInput = document.getElementById(WORKFLOWS[mode].firstInputId);
  setActiveInput(targetInput);
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
  return numInputs.filter(
    (input) => !input.disabled && isVisible(input) && input.dataset.skipNav !== "true"
  );
}

function getVisibleNumInputsInForm(form) {
  return getVisibleNumInputs().filter((input) => input.closest("form") === form);
}

function getActiveForm() {
  if (activeInput?.closest("form")) return activeInput.closest("form");
  if (activeActionButton?.closest("form")) return activeActionButton.closest("form");
  return WORKFLOWS[currentWorkflow]?.form || initialForm;
}

function getNavigationTargets(form) {
  const targets = getVisibleNumInputsInForm(form);
  const submit = form?.querySelector('button[type="submit"]');
  if (submit && isVisible(submit)) targets.push(submit);
  return targets;
}

function showNumpad() {
  if (isDesktopInput) return;
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
  if (activeActionButton) {
    activeActionButton.classList.remove("nav-target-active");
    activeActionButton = null;
  }
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

function setActiveActionButton(button) {
  if (!button || !isVisible(button)) return;
  if (activeInput) {
    activeInput.classList.remove("active-input");
    activeInput = null;
  }
  if (activeActionButton) {
    activeActionButton.classList.remove("nav-target-active");
  }
  activeActionButton = button;
  activeActionButton.classList.add("nav-target-active");
  activeActionButton.focus({ preventScroll: true });
  showNumpad();
  requestAnimationFrame(() => ensureInputVisible(activeActionButton));
}

function clearActiveTarget() {
  if (activeInput) {
    activeInput.classList.remove("active-input");
    activeInput = null;
  }
  if (activeActionButton) {
    activeActionButton.classList.remove("nav-target-active");
    activeActionButton = null;
  }
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

function hasPendingDecimal(input) {
  return input?.dataset.pendingDecimal === "1";
}

function setPendingDecimal(input, pending) {
  if (!input) return;
  input.dataset.pendingDecimal = pending ? "1" : "0";
}

function pushNumericKey(key) {
  if (!activeInput) {
    const first = getVisibleNumInputsInForm(getActiveForm())[0];
    if (first) setActiveInput(first);
  }
  if (!activeInput) return;

  let value = activeInput.value || "";
  if (key === ".") {
    if (!inputSupportsDecimal(activeInput) || value.includes(".") || hasPendingDecimal(activeInput)) return;
    const attempted = value === "" ? "0." : `${value}.`;
    activeInput.value = attempted;

    if (activeInput.value !== attempted) {
      activeInput.value = attempted;
      setPendingDecimal(activeInput, true);
    } else {
      setPendingDecimal(activeInput, false);
    }
  } else {
    if (hasPendingDecimal(activeInput)) {
      if (!value.includes(".")) value = `${value}.`;
      value = `${value}${key}`;
      setPendingDecimal(activeInput, false);
    } else {
      value = value === "0" ? key : `${value}${key}`;
      setPendingDecimal(activeInput, false);
    }
    activeInput.value = value;
  }
  activeInput.dispatchEvent(new Event("input", { bubbles: true }));
  requestAnimationFrame(() => ensureInputVisible(activeInput));
}

function backspaceKey() {
  if (!activeInput) return;
  const value = activeInput.value || "";
  if (hasPendingDecimal(activeInput)) {
    if (value.endsWith(".")) {
      activeInput.value = value.slice(0, -1);
    } else {
      activeInput.value = value.slice(0, -1);
    }
    setPendingDecimal(activeInput, false);
  } else {
    activeInput.value = value.slice(0, -1);
    if (!activeInput.value.includes(".")) setPendingDecimal(activeInput, false);
  }
  activeInput.dispatchEvent(new Event("input", { bubbles: true }));
  requestAnimationFrame(() => ensureInputVisible(activeInput));
}

function clearKey() {
  if (!activeInput) return;
  activeInput.value = "";
  setPendingDecimal(activeInput, false);
  activeInput.dispatchEvent(new Event("input", { bubbles: true }));
  requestAnimationFrame(() => ensureInputVisible(activeInput));
}

function moveInput(delta) {
  const targets = getNavigationTargets(getActiveForm());
  if (!targets.length) return;

  const current = activeInput || activeActionButton;
  let index = targets.indexOf(current);
  if (index < 0) index = delta > 0 ? -1 : 0;

  const nextIndex = Math.max(0, Math.min(targets.length - 1, index + delta));
  const nextTarget = targets[nextIndex];
  if (nextTarget instanceof HTMLButtonElement) {
    setActiveActionButton(nextTarget);
    return;
  }
  setActiveInput(nextTarget);
}

function showInitialResult(message) {
  initialResult.innerHTML = `<p>${message}</p>`;
}

function showAdjustResult(message) {
  adjustResult.innerHTML = `<p>${message}</p>`;
}

function calculateInitial(event) {
  event?.preventDefault();

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
  event?.preventDefault();

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

function calculateInfusion(event) {
  event?.preventDefault();

  const weight = Number(document.getElementById("infusion-weight").value);
  const dose = Number(document.getElementById("infusion-dose").value);
  const drugMg = Number(document.getElementById("infusion-drug-mg").value);
  const volumeMl = Number(document.getElementById("infusion-volume-ml").value);

  if (!weight || !dose || !drugMg || !volumeMl) {
    infusionResult.innerHTML = `<p>${tr("infusionNeed")}</p>`;
    return;
  }

  const concentrationMcgMl = (drugMg * 1000) / volumeMl;
  const rateMlHr = (dose * weight * 60) / concentrationMcgMl;

  infusionResult.innerHTML = `
    <p><strong>${tr("infusionRate")}</strong> ${rateMlHr.toFixed(1)} mL/hr</p>
    <p><strong>${tr("infusionConc")}</strong> ${concentrationMcgMl.toFixed(1)} mcg/mL (${(drugMg / volumeMl).toFixed(
      3
    )} mg/mL)</p>
  `;
}

function roundToHalf(value) {
  return Math.round(value * 2) / 2;
}

function getAvailableWarfarinStrengths() {
  try {
    const saved = JSON.parse(localStorage.getItem(WARFARIN_TABLET_STORAGE_KEY) || "[]");
    const cleaned = saved.filter((strength) => WARFARIN_TABLET_STRENGTHS.includes(Number(strength))).map(Number);
    return cleaned.length ? cleaned : [...WARFARIN_TABLET_STRENGTHS];
  } catch {
    return [...WARFARIN_TABLET_STRENGTHS];
  }
}

function saveAvailableWarfarinStrengths(strengths) {
  localStorage.setItem(WARFARIN_TABLET_STORAGE_KEY, JSON.stringify(strengths));
}

function refreshWarfarinTabletButtons() {
  const available = getAvailableWarfarinStrengths();
  for (const button of warfarinTabs.querySelectorAll(".tablet-option")) {
    const strength = Number(button.dataset.strength);
    button.classList.toggle("active", available.includes(strength));
  }
}

function formatWeekdayGroup(days) {
  if (days.length === 7) return "ทุกวัน";
  if (days.join(",") === THAI_WEEKDAYS.slice(5, 7).join(",")) return "เสาร์ - อาทิตย์";
  if (days.join(",") === THAI_WEEKDAYS.slice(0, 6).join(",")) return "จันทร์ - เสาร์";
  if (days.join(",") === THAI_WEEKDAYS.slice(0, 5).join(",")) return "จันทร์ - ศุกร์";
  if (days.join(",") === THAI_WEEKDAYS.slice(0, 4).join(",")) return "จันทร์ - พฤหัส";
  if (days.join(",") === THAI_WEEKDAYS.slice(4, 7).join(",")) return "ศุกร์ - อาทิตย์";
  return days.join(", ");
}

function preferredDaysForCount(count) {
  const preferredSlots = {
    7: [0, 1, 2, 3, 4, 5, 6],
    6: [0, 1, 2, 3, 4, 5],
    5: [0, 1, 2, 3, 4],
    4: [0, 1, 2, 3],
    3: [4, 5, 6],
    2: [5, 6],
    1: [6]
  };
  return (preferredSlots[count] || THAI_WEEKDAYS.map((_, index) => index)).map((index) => THAI_WEEKDAYS[index]);
}

function makeTabletCombos(strengths) {
  const combos = [{ dose: 0, text: "งดยา", pillCount: 0, score: 0, components: [] }];
  const quantityOptions = [0.5, 1, 1.5, 2];

  function formatQuantity(quantity) {
    return Number.isInteger(quantity) ? `${quantity}` : `${quantity}`;
  }

  function makeComponent(strength, quantity) {
    const dose = strength * quantity;
    const isSplit = !Number.isInteger(quantity);
    const redundantExactStrength = isSplit && strengths.includes(dose);
    return {
      dose,
      text: `warfarin (${strength}) ${formatQuantity(quantity)}*1`,
      pillCount: quantity,
      splitCount: isSplit ? 1 : 0,
      strengthCount: 1,
      components: [{ strength, quantity, dose, text: `warfarin (${strength}) ${formatQuantity(quantity)}*1` }],
      score:
        quantity * 0.05 +
        (isSplit ? 0.6 + strength * 0.02 : 0) +
        (redundantExactStrength ? 12 : 0)
    };
  }

  const singleComponents = [];
  for (const strength of strengths) {
    for (const quantity of quantityOptions) {
      singleComponents.push(makeComponent(strength, quantity));
    }
  }

  combos.push(...singleComponents);
  for (let i = 0; i < singleComponents.length; i += 1) {
    for (let j = i + 1; j < singleComponents.length; j += 1) {
      const first = singleComponents[i];
      const second = singleComponents[j];
      const firstStrength = Number(first.text.match(/\(([\d.]+)\)/)?.[1]);
      const secondStrength = Number(second.text.match(/\(([\d.]+)\)/)?.[1]);
      if (firstStrength === secondStrength) continue;
      if (first.pillCount + second.pillCount > 2) continue;
      combos.push({
        dose: first.dose + second.dose,
        text: `${first.text} + ${second.text}`,
        pillCount: first.pillCount + second.pillCount,
        splitCount: first.splitCount + second.splitCount,
        strengthCount: 2,
        components: [...first.components, ...second.components],
        score: first.score + second.score + 0.5
      });
    }
  }

  const bestByDose = new Map();
  for (const combo of combos) {
    const current = bestByDose.get(combo.dose);
    if (!current || combo.score < current.score || (combo.score === current.score && combo.text.length < current.text.length)) {
      bestByDose.set(combo.dose, combo);
    }
  }
  return [...bestByDose.values()].sort((a, b) => a.dose - b.dose);
}

function buildWarfarinPrescription(targetWeekly, strengths) {
  const combos = makeTabletCombos(strengths);
  const maxDailyDose = Math.max(...combos.map((combo) => combo.dose));
  const roundedTarget = clamp(Math.round(targetWeekly * 2) / 2, 0, maxDailyDose * 7);
  const averageDailyDose = roundedTarget / 7;
  const schedules = [];

  function addSchedule(schedule, pattern) {
    const total = schedule.reduce((sum, combo) => sum + combo.dose, 0);
    if (Math.abs(total - roundedTarget) > 0.001) return;
    schedules.push({ total, schedule: reorderWarfarinSchedule(schedule), pattern });
  }

  for (const combo of combos) {
    addSchedule(Array(7).fill(combo), "same-daily");
  }

  for (const base of combos) {
    if (base.dose <= 0) continue;
    for (const lower of combos) {
      if (lower.dose < 0 || lower.dose >= base.dose) continue;
      for (let lowerDays = 1; lowerDays <= 3; lowerDays += 1) {
        addSchedule([...Array(lowerDays).fill(lower), ...Array(7 - lowerDays).fill(base)], "base-minus-low");
      }
    }
  }

  for (const base of combos) {
    for (const extra of combos) {
      if (extra.dose <= base.dose) continue;
      const increment = extra.dose - base.dose;
      if (increment <= 0) continue;
      const extraDays = (roundedTarget - base.dose * 7) / increment;
    if (Number.isInteger(extraDays) && extraDays >= 1 && extraDays <= 6) {
      addSchedule([...Array(7 - extraDays).fill(base), ...Array(extraDays).fill(extra)], "base-plus-extra");
    }
    const lowerDays = (extra.dose * 7 - roundedTarget) / increment;
    if (Number.isInteger(lowerDays) && lowerDays >= 1 && lowerDays <= 6) {
      addSchedule([...Array(lowerDays).fill(base), ...Array(7 - lowerDays).fill(extra)], "base-minus-low");
    }
  }
  }

  for (const base of combos) {
    if (base.dose <= 0) continue;
    for (const extra of combos) {
      if (extra.dose <= base.dose) continue;
      for (let extraDays = 1; extraDays <= 3; extraDays += 1) {
        addSchedule([...Array(7 - extraDays).fill(base), ...Array(extraDays).fill(extra)], "base-plus-extra");
      }
    }
  }

  for (const base of combos.filter((combo) => combo.dose > 0 && combo.components.length === 1)) {
    for (const booster of combos.filter((combo) => combo.dose > 0 && combo.components.length === 1)) {
      const boostedCombo = {
        dose: base.dose + booster.dose,
        text: `${base.text} + ${booster.text}`,
        pillCount: base.pillCount + booster.pillCount,
        splitCount: base.splitCount + booster.splitCount,
        strengthCount: new Set([...base.components, ...booster.components].map((component) => component.strength)).size,
        components: [...base.components, ...booster.components],
        score: base.score + booster.score + 0.35
      };
      const extraDays = (roundedTarget - base.dose * 7) / booster.dose;
      if (Number.isInteger(extraDays) && extraDays >= 1 && extraDays <= 3) {
        const schedule = [...Array(7 - extraDays).fill(base), ...Array(extraDays).fill(boostedCombo)];
        schedules.push({
          total: roundedTarget,
          schedule: reorderWarfarinSchedule(schedule),
          pattern: "daily-base-plus-booster",
          base,
          booster,
          boosterDays: extraDays
        });
      }
    }
  }

  const mostUsable = schedules.filter((candidate) => scoreWarfarinSchedule(candidate, averageDailyDose) < 45);
  if (mostUsable.length) {
    const bestUsable = mostUsable.sort((a, b) => scoreWarfarinSchedule(a, averageDailyDose) - scoreWarfarinSchedule(b, averageDailyDose))[0];
    return renderWarfarinSchedule(bestUsable);
  }

  if (!schedules.length) {
    const dp = Array.from({ length: 8 }, () => new Map());
    dp[0].set(0, { schedule: [], score: 0 });
    for (let day = 0; day < 7; day += 1) {
      for (const [total, state] of dp[day]) {
        for (const combo of combos) {
          const nextTotal = total + combo.dose;
          const dayScore = (combo.dose - averageDailyDose) ** 2 + combo.score;
          const nextState = { schedule: [...state.schedule, combo], score: state.score + dayScore };
          const current = dp[day + 1].get(nextTotal);
          if (!current || nextState.score < current.score) dp[day + 1].set(nextTotal, nextState);
        }
      }
    }

    const possibleTotals = [...dp[7].keys()];
    const bestTotal = possibleTotals.sort((a, b) => Math.abs(a - roundedTarget) - Math.abs(b - roundedTarget) || b - a)[0];
    schedules.push({ total: bestTotal, schedule: reorderWarfarinSchedule(dp[7].get(bestTotal).schedule), pattern: "fallback" });
  }

  const bestSchedule = schedules.sort((a, b) => scoreWarfarinSchedule(a, averageDailyDose) - scoreWarfarinSchedule(b, averageDailyDose))[0];
  return renderWarfarinSchedule(bestSchedule);
}

function renderWarfarinSchedule(bestSchedule) {
  if (bestSchedule.pattern === "daily-base-plus-booster") {
    const boosterDays = preferredDaysForCount(bestSchedule.boosterDays);
    return {
      total: bestSchedule.total,
      lines: [
        `${bestSchedule.base.text} po hs ทุกวัน`,
        `${bestSchedule.booster.text} po hs ${formatWeekdayGroup(boosterDays)}`
      ]
    };
  }

  const schedule = bestSchedule.schedule;
  const bestTotal = bestSchedule.total;
  const groups = [];

  const uniqueCombos = [];
  for (const combo of schedule) {
    if (combo.dose > 0 && !uniqueCombos.some((item) => item.text === combo.text)) uniqueCombos.push(combo);
  }

  for (const combo of uniqueCombos.sort((a, b) => a.dose - b.dose || a.text.localeCompare(b.text))) {
    const days = schedule
      .map((item, index) => (item.text === combo.text ? THAI_WEEKDAYS[index] : null))
      .filter(Boolean);
    if (days.length) groups.push(`${combo.text} po hs ${formatWeekdayGroup(days)}`);
  }

  return { total: bestTotal, lines: groups.length ? groups : ["งด warfarin po hs ทุกวัน"] };
}

function scoreWarfarinSchedule(candidate, averageDailyDose) {
  const schedule = candidate.schedule;
  const active = schedule.filter((combo) => combo.dose > 0);
  const uniqueTexts = new Set(active.map((combo) => combo.text));
  const strengths = new Set();
  const activeDays = active.length;
  let splitCount = 0;
  let pillCount = 0;
  let variance = 0;

  for (const combo of schedule) {
    variance += (combo.dose - averageDailyDose) ** 2;
    pillCount += combo.pillCount || 0;
    splitCount += combo.splitCount || 0;
    for (const match of combo.text.matchAll(/warfarin \\(([\d.]+)\\)/g)) strengths.add(match[1]);
  }

  let patternScore =
    candidate.pattern === "same-daily"
      ? -100
      : candidate.pattern === "base-plus-extra"
      ? -55
      : candidate.pattern === "base-minus-low"
      ? -58
      : candidate.pattern === "daily-base-plus-booster"
      ? -82
      : 0;
  if (candidate.pattern === "daily-base-plus-booster") {
    patternScore += (candidate.booster?.splitCount || 0) * 35;
    patternScore += (candidate.booster?.pillCount || 0) > 1 ? 16 : 0;
    patternScore += (candidate.base?.splitCount || 0) * 4;
  }
  if (candidate.pattern === "base-minus-low" && uniqueTexts.size === 2) {
    const groups = [...uniqueTexts].map((text) => ({
      count: active.filter((combo) => combo.text === text).length,
      dose: active.find((combo) => combo.text === text)?.dose || 0
    }));
    const smallerGroup = groups.sort((a, b) => a.dose - b.dose)[0];
    if (smallerGroup?.count >= 3) patternScore += 25;
  }
  let extraDayPenalty = 0;
  if ((candidate.pattern === "base-plus-extra" || candidate.pattern === "base-minus-low") && uniqueTexts.size === 2) {
    const groups = [...uniqueTexts].map((text) => ({
      text,
      count: active.filter((combo) => combo.text === text).length,
      dose: active.find((combo) => combo.text === text)?.dose || 0
    }));
    const oneDayGroup = groups.find((group) => group.count === 1);
    const otherGroup = groups.find((group) => group.count !== 1);
    if (oneDayGroup && otherGroup && oneDayGroup.dose > otherGroup.dose * 2.2) extraDayPenalty = 75;
  }
  let sameTabletSplitPenalty = 0;
  if (uniqueTexts.size === 2) {
    const groups = [...uniqueTexts].map((text) => ({
      text,
      count: active.filter((combo) => combo.text === text).length
    }));
    const hasFourThreeSplit = groups.some((group) => group.count === 4) && groups.some((group) => group.count === 3);
    if (hasFourThreeSplit && strengths.size === 1 && splitCount > 0) sameTabletSplitPenalty = 95;
  }
  const preferredSimpleLowDoseBonus =
    uniqueTexts.size === 2 && strengths.size === 1 && activeDays === 7 && splitCount === 0 ? -70 : 0;
  let activeDayPenalty = 0;
  if (activeDays > 0 && activeDays < 7) {
    activeDayPenalty = (7 - activeDays) * 4;
    if (activeDays <= 4) activeDayPenalty += 10;
  }
  return (
    patternScore +
    extraDayPenalty +
    sameTabletSplitPenalty +
    preferredSimpleLowDoseBonus +
    activeDayPenalty +
    uniqueTexts.size * 12 +
    strengths.size * 8 +
    splitCount * 1.5 +
    pillCount * 0.08 +
    variance * 0.12
  );
}

function reorderWarfarinSchedule(schedule) {
  const groups = [];
  for (const combo of schedule) {
    let group = groups.find((item) => item.combo.text === combo.text);
    if (!group) {
      group = { combo, count: 0 };
      groups.push(group);
    }
    group.count += 1;
  }

  const daySlots = Array(7).fill(null);
  const preferredSlots = {
    7: [0, 1, 2, 3, 4, 5, 6],
    6: [0, 1, 2, 3, 4, 5],
    5: [0, 1, 2, 3, 4],
    4: [0, 1, 2, 3],
    3: [4, 5, 6],
    2: [5, 6],
    1: [6]
  };

  for (const group of groups.sort((a, b) => b.count - a.count || a.combo.dose - b.combo.dose)) {
    const preferred = preferredSlots[group.count] || THAI_WEEKDAYS.map((_, index) => index);
    let placed = 0;
    for (const index of preferred) {
      if (!daySlots[index]) {
        daySlots[index] = group.combo;
        placed += 1;
        if (placed === group.count) break;
      }
    }
    for (let index = 0; placed < group.count && index < 7; index += 1) {
      if (!daySlots[index]) {
        daySlots[index] = group.combo;
        placed += 1;
      }
    }
  }

  return daySlots;
}

function calculateWarfarin(event) {
  event?.preventDefault();

  const inr = Number(document.getElementById("warfarin-inr").value);
  const weeklyDose = Number(document.getElementById("warfarin-weekly-dose").value);
  const targetLow = Number(document.getElementById("warfarin-target-low").value);
  const targetHigh = Number(document.getElementById("warfarin-target-high").value);

  if (!inr || !weeklyDose) {
    warfarinResult.innerHTML = `<p>${tr("warfarinNeed")}</p>`;
    return;
  }
  const strengths = getAvailableWarfarinStrengths();
  if (!strengths.length) {
    warfarinResult.innerHTML = `<p>${tr("warfarinNoTabs")}</p>`;
    return;
  }
  if (!targetLow || !targetHigh || targetLow >= targetHigh) {
    warfarinResult.innerHTML = `<p>${tr("warfarinInvalidTarget")}</p>`;
    return;
  }

  let action = tr("warfarinContinue");
  let factor = 1;
  let statusClass = "status-ok";

  if (inr >= 6) {
    action = tr("warfarinHoldUrgent");
    factor = 0;
    statusClass = "status-high";
  } else if (inr > 4) {
    action = tr("warfarinHoldReduce");
    factor = 0.8;
    statusClass = "status-high";
  } else if (inr > targetHigh) {
    action = tr("warfarinReduce");
    factor = 0.9;
    statusClass = "status-caution";
  } else if (inr < 1.5) {
    action = tr("warfarinIncreaseHigh");
    factor = 1.15;
    statusClass = "status-caution";
  } else if (inr < targetLow) {
    action = tr("warfarinIncrease");
    factor = 1.1;
    statusClass = "status-caution";
  }

  const suggestedWeekly = factor > 0 ? roundToHalf(weeklyDose * factor) : 0;
  const doseLine = factor > 0 ? `${suggestedWeekly} mg/week` : tr("warfarinHoldReassess");
  const prescription = buildWarfarinPrescription(suggestedWeekly, strengths);
  const prescriptionText = `${prescription.lines.join("\n")}\n(total ${prescription.total} mg/wk)`;

  warfarinResult.innerHTML = `
    <div class="order-highlight copy-order warfarin-copy-order" role="button" tabindex="0" data-copy="${encodeURIComponent(
      prescriptionText
    )}">
      <p class="order-title">${tr("warfarinRxTitle")}</p>
      <div class="order-text">${renderOrderLines([...prescription.lines, `(total ${prescription.total} mg/wk)`])}</div>
    </div>
    <p><strong>${tr("statusLabel")}</strong> <span class="${statusClass}">${action}</span></p>
    <p><strong>${tr("warfarinPlan")}</strong> ${doseLine}</p>
    <p><strong>${tr("warfarinActualWeekly")}</strong> ${prescription.total} mg/week</p>
    <p class="note">${tr("warfarinApprox")}</p>
    <p class="note">${tr("warfarinNote")}</p>
  `;
}

async function copyWarfarinOrder() {
  const copyTarget = warfarinResult.querySelector(".warfarin-copy-order");
  if (!copyTarget) return;
  const orderText = decodeURIComponent(copyTarget.dataset.copy || "");
  if (!orderText) return;
  try {
    await navigator.clipboard.writeText(orderText);
    copyTarget.classList.add("copied");
    copyTarget.querySelector(".order-title").textContent = tr("warfarinCopied");
  } catch {
    copyTarget.querySelector(".order-title").textContent = tr("warfarinCopyFailed");
  }
}

function calculateOsmo(event) {
  event?.preventDefault();

  const na = Number(document.getElementById("osmo-na").value);
  const glucose = Number(document.getElementById("osmo-glucose").value);
  const bun = Number(document.getElementById("osmo-bun").value);

  if (!na || !glucose || !bun) {
    osmoResult.innerHTML = `<p>${tr("osmoNeed")}</p>`;
    return;
  }

  const osmo = 2 * na + glucose / 18 + bun / 2.8;
  osmoResult.innerHTML = `
    <p><strong>${tr("osmoResult")}</strong> ${osmo.toFixed(1)} mOsm/kg</p>
    <p class="note">Formula: 2 x Na + glucose/18 + BUN/2.8</p>
  `;
}

function calculateNutrition(event) {
  event?.preventDefault();

  const weight = Number(document.getElementById("nutrition-weight").value);
  const height = Number(document.getElementById("nutrition-height").value);
  const hasCkd = document.getElementById("nutrition-ckd").checked;
  const hasAki = document.getElementById("nutrition-aki").checked;
  const isCritical = document.getElementById("nutrition-critical").checked;
  const riskRefeeding = document.getElementById("nutrition-refeeding").checked;
  const isEnteral = document.getElementById("nutrition-enteral").checked;

  if (!weight || !height) {
    nutritionResult.innerHTML = `<p>${tr("nutritionNeed")}</p>`;
    return;
  }

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const kcalPerKg = riskRefeeding ? 10 : isCritical ? 25 : 25;
  let proteinPerKg = 1;
  if (hasCkd && !hasAki && !isCritical) proteinPerKg = 0.8;
  if (hasAki || isCritical) proteinPerKg = 1.3;
  const fluidPerKg = hasCkd || hasAki ? 25 : 30;

  const calories = Math.round(weight * kcalPerKg);
  const protein = Math.round(weight * proteinPerKg);
  const fluid = Math.round(weight * fluidPerKg);

  let formulaLine = "";
  if (isEnteral) {
    const feedsPerDay = 4;
    const formulaKcalMl = 1.5;
    const totalFormulaMl = roundUpToStep(calories / formulaKcalMl, 50);
    const perFeedMl = roundUpToStep(totalFormulaMl / feedsPerDay, 50);
    const actualFormulaMl = perFeedMl * feedsPerDay;
    const waterPerFeedMl = Math.max(0, Math.round(((fluid - actualFormulaMl) / feedsPerDay) / 10) * 10);
    const refeedingPrefix = riskRefeeding ? "Start ~50% goal, advance as tolerated. " : "";
    formulaLine = `<p><strong>${tr("nutritionFormula")}</strong> ${refeedingPrefix}BD 1.5:1 ${perFeedMl} mL x ${feedsPerDay} feeds + water ${waterPerFeedMl} mL/feed</p>`;
  }

  nutritionResult.innerHTML = `
    <p><strong>${tr("nutritionBmi")}</strong> ${bmi.toFixed(1)} kg/m²</p>
    <p><strong>${tr("nutritionEnergy")}</strong> ${calories} kcal/day (${kcalPerKg} kcal/kg/day)</p>
    <p><strong>${tr("nutritionProtein")}</strong> ${protein} g/day (${proteinPerKg.toFixed(1)} g/kg/day)</p>
    <p><strong>${tr("nutritionVolume")}</strong> ${fluid} mL/day (${fluidPerKg} mL/kg/day)</p>
    ${formulaLine}
    <p class="note">${tr("nutritionCaution")}</p>
  `;
}

function getSelectedAntibiotic() {
  return ANTIBIOTIC_RENAL_DOSING.find((drug) => drug.id === antibioticDrugInput.value) || ANTIBIOTIC_RENAL_DOSING[0];
}

function getAntibioticSearchText(drug) {
  return `${drug.name} ${drug.id} ${drug.name.toLowerCase().replace(/[^a-z0-9]+/g, " ")}`;
}

function renderAntibioticDrugResults() {
  const query = antibioticDrugSearch.value.trim().toLowerCase();
  const filtered = ANTIBIOTIC_RENAL_DOSING.filter((drug) => {
    return !query || getAntibioticSearchText(drug).toLowerCase().includes(query);
  });

  if (!filtered.length) {
    antibioticDrugResults.innerHTML = `<p class="inline-empty">${tr("antibioticNoDrugResults")}</p>`;
    return;
  }

  antibioticDrugResults.innerHTML = filtered
    .map(
      (drug) => `
        <button type="button" class="inline-search-option ${
          antibioticDrugInput.value === drug.id ? "active" : ""
        }" data-drug="${drug.id}">
          ${drug.name}
        </button>
      `
    )
    .join("");
}

function selectAntibioticDrug(drugId) {
  const drug = ANTIBIOTIC_RENAL_DOSING.find((item) => item.id === drugId) || ANTIBIOTIC_RENAL_DOSING[0];
  antibioticDrugInput.value = drug.id;
  antibioticDrugSearch.value = drug.name;
  renderAntibioticDrugResults();
  populateAntibioticIndications();
  calculateAntibiotic();
}

function populateAntibioticIndications() {
  const drug = getSelectedAntibiotic();
  antibioticIndicationSelect.innerHTML = drug.indications
    .map((indication, index) => `<option value="${index}">${indication.name}</option>`)
    .join("");
}

function getAntibioticDoseBand(indication, crcl) {
  return indication.bands.find((band) => crcl >= (band.min || 0) && (band.max === undefined || crcl <= band.max));
}

function calculateAntibiotic(event) {
  event?.preventDefault();

  const drug = getSelectedAntibiotic();
  const indication = drug.indications[Number(antibioticIndicationSelect.value)] || drug.indications[0];
  const renalMode = antibioticRenalModeSelect.value;
  const crcl = Number(document.getElementById("antibiotic-crcl").value);

  if (!drug || !indication || (renalMode === "crcl" && !crcl)) {
    antibioticResult.innerHTML = `<p>${tr("antibioticNeed")}</p>`;
    return;
  }

  let orderLines;
  let note = indication.note || drug.note || "";

  if (renalMode === "hd") {
    orderLines = indication.hdOrderLines || (indication.hdOrder ? [indication.hdOrder] : null);
  } else {
    const band = getAntibioticDoseBand(indication, crcl);
    if (!band) {
      antibioticResult.innerHTML = `<p>${tr("antibioticNeed")}</p>`;
      return;
    }
    orderLines = band.orderLines || [band.order];
    note = band.note || note;
  }

  if (!orderLines || !orderLines.length) {
    antibioticResult.innerHTML = `<p>${tr("antibioticNeed")}</p>`;
    return;
  }

  const orderText = orderLines.join("\n");

  antibioticResult.innerHTML = `
    <div class="order-highlight copy-order" role="button" tabindex="0" data-copy="${encodeURIComponent(orderText)}">
      <p class="order-title">${tr("antibioticOrderReady")}</p>
      <div class="order-text">${renderOrderLines(orderLines)}</div>
    </div>
    <p><strong>${renalMode === "hd" ? tr("antibioticHdMode") : tr("antibioticCrclUsed")}</strong> ${
      renalMode === "hd" ? "" : `${crcl.toFixed(0)} mL/min`
    }</p>
    ${note ? `<p class="note">${note}</p>` : ""}
    <p class="note">${tr("antibioticSourceNote")}</p>
  `;
}

async function copyAntibioticOrder() {
  const copyTarget = antibioticResult.querySelector(".copy-order");
  if (!copyTarget) return;
  const orderText = decodeURIComponent(copyTarget.dataset.copy || "");
  if (!orderText) return;
  try {
    await navigator.clipboard.writeText(orderText);
    copyTarget.classList.add("copied");
    copyTarget.querySelector(".order-title").textContent = tr("antibioticCopied");
  } catch {
    copyTarget.querySelector(".order-title").textContent = tr("antibioticCopyFailed");
  }
}

function runCalculatorForMode(mode) {
  if (mode === "initial") calculateInitial();
  if (mode === "adjust") calculateAdjustment();
  if (mode === "infusion") calculateInfusion();
  if (mode === "warfarin") calculateWarfarin();
  if (mode === "osmo") calculateOsmo();
  if (mode === "nutrition") calculateNutrition();
  if (mode === "antibiotic") calculateAntibiotic();
}

function recalcIfResultsShown() {
  if (initialResult.innerHTML.trim()) calculateInitial();
  if (adjustResult.innerHTML.trim()) calculateAdjustment();
  if (infusionResult.innerHTML.trim()) calculateInfusion();
  if (warfarinResult.innerHTML.trim()) calculateWarfarin();
  if (osmoResult.innerHTML.trim()) calculateOsmo();
  if (nutritionResult.innerHTML.trim()) calculateNutrition();
  if (antibioticResult.innerHTML.trim()) calculateAntibiotic();
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("vanco-lang", lang);
  applyStaticTranslation();
  recalcIfResultsShown();
}

function initNumpad() {
  if (isDesktopInput) {
    document.body.classList.add("desktop-input");
    hideNumpad();
    for (const input of numInputs) {
      if (input.type !== "text") input.type = "text";
      input.readOnly = false;
      input.inputMode = "decimal";
      input.addEventListener("focus", () => {
        if (activeInput) activeInput.classList.remove("active-input");
        activeInput = input;
        activeInput.classList.add("active-input");
      });
      input.addEventListener("blur", () => {
        input.classList.remove("active-input");
        if (activeInput === input) activeInput = null;
      });
    }
    return;
  }

  for (const input of numInputs) {
    if (input.type !== "text") input.type = "text";
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
      if (activeActionButton) {
        activeActionButton.click();
        hideNumpad();
        clearActiveTarget();
        return;
      }
      hideNumpad();
      if (activeInput) activeInput.blur();
      clearActiveTarget();
    }
  });

  document.addEventListener("pointerdown", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (
      target.closest(".num-input") ||
      target.closest("#numpad") ||
      target.closest("#sex-toggle") ||
      target.closest("#crcl-mode-toggle") ||
      target.closest('button[type="submit"]')
    )
      return;
    hideNumpad();
    clearActiveTarget();
  });

  window.addEventListener("resize", () => {
    if (activeInput) ensureInputVisible(activeInput, "auto");
    if (activeActionButton) ensureInputVisible(activeActionButton, "auto");
  });
}

function initModeButtons() {
  crclModeToggle.addEventListener("click", () => {
    crclModeInput.value = crclModeInput.value === "auto" ? "manual" : "auto";
    refreshModeButtons();
    syncCrclInputMode();
    runCalculatorForMode("initial");
    setActiveInput(crclModeInput.value === "auto" ? document.getElementById("age") : document.getElementById("crcl"));
  });

  sexToggle.addEventListener("click", () => {
    sexInput.value = sexInput.value === "male" ? "female" : "male";
    refreshModeButtons();
    runCalculatorForMode("initial");
    if (activeInput) {
      showNumpad();
      requestAnimationFrame(() => ensureInputVisible(activeInput));
    }
  });
}

function initWorkflowButtons() {
  for (const [mode, config] of Object.entries(WORKFLOWS)) {
    if (!config.button) continue;
    config.button.addEventListener("click", () => {
      setWorkflow(mode);
      runCalculatorForMode(mode);
    });
  }
}

function initCalculatorSearch() {
  calculatorSearch.addEventListener("input", renderCalculatorResults);
  calculatorResults.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest(".calculator-card");
    if (!card) return;
    selectCalculator(card.dataset.calculator, { keepWorkflow: false });
  });
}

function initAntibioticDosing() {
  selectAntibioticDrug(ANTIBIOTIC_RENAL_DOSING[0].id);
  populateAntibioticIndications();
  antibioticDrugSearch.addEventListener("input", () => {
    renderAntibioticDrugResults();
    const firstMatch = ANTIBIOTIC_RENAL_DOSING.find((drug) =>
      getAntibioticSearchText(drug).toLowerCase().includes(antibioticDrugSearch.value.trim().toLowerCase())
    );
    if (firstMatch) {
      antibioticDrugInput.value = firstMatch.id;
      populateAntibioticIndications();
      calculateAntibiotic();
    }
  });
  antibioticDrugResults.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const option = target.closest(".inline-search-option");
    if (!option) return;
    selectAntibioticDrug(option.dataset.drug);
  });
  antibioticRenalModeSelect.addEventListener("change", calculateAntibiotic);
  antibioticIndicationSelect.addEventListener("change", calculateAntibiotic);
  antibioticResult.addEventListener("click", copyAntibioticOrder);
  antibioticResult.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      copyAntibioticOrder();
    }
  });
}

function initWarfarinTablets() {
  refreshWarfarinTabletButtons();
  warfarinTabs.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".tablet-option");
    if (!button) return;
    const strength = Number(button.dataset.strength);
    let strengths = getAvailableWarfarinStrengths();
    if (strengths.includes(strength)) {
      strengths = strengths.filter((item) => item !== strength);
    } else {
      strengths = [...strengths, strength].sort((a, b) => a - b);
    }
    if (!strengths.length) strengths = [strength];
    saveAvailableWarfarinStrengths(strengths);
    refreshWarfarinTabletButtons();
    calculateWarfarin();
  });
  warfarinResult.addEventListener("click", copyWarfarinOrder);
  warfarinResult.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      copyWarfarinOrder();
    }
  });
}

function bindLiveCalculation(form, calculateFn) {
  form.addEventListener("submit", calculateFn);
  form.addEventListener("input", calculateFn);
  form.addEventListener("change", calculateFn);
}

languageToggle.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "th" : "en");
});

bindLiveCalculation(initialForm, calculateInitial);
bindLiveCalculation(adjustForm, calculateAdjustment);
bindLiveCalculation(document.getElementById("infusion-form"), calculateInfusion);
bindLiveCalculation(document.getElementById("warfarin-form"), calculateWarfarin);
bindLiveCalculation(document.getElementById("osmo-form"), calculateOsmo);
bindLiveCalculation(document.getElementById("nutrition-form"), calculateNutrition);
bindLiveCalculation(document.getElementById("antibiotic-form"), calculateAntibiotic);

initAntibioticDosing();
initWarfarinTablets();
initNumpad();
initModeButtons();
initWorkflowButtons();
initCalculatorSearch();
syncCrclInputMode();
applyStaticTranslation();

if (Object.prototype.hasOwnProperty.call(WORKFLOWS, currentWorkflow)) {
  setWorkflow(currentWorkflow, { persist: false, focus: false });
  setTimeout(() => {
    const targetInput = document.getElementById(WORKFLOWS[currentWorkflow].firstInputId);
    setActiveInput(targetInput);
    runCalculatorForMode(currentWorkflow);
  }, 80);
} else if (currentCalculator) {
  selectCalculator(currentCalculator, { persist: false, focus: false, keepWorkflow: true });
} else {
  hideWorkflowPanels();
}
