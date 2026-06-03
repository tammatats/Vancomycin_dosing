const initialForm = document.getElementById("initial-form");
const adjustForm = document.getElementById("adjust-form");
const initialResult = document.getElementById("initial-result");
const adjustResult = document.getElementById("adjust-result");
const infusionResult = document.getElementById("infusion-result");
const warfarinResult = document.getElementById("warfarin-result");
const heparinResult = document.getElementById("heparin-result");
const renalResult = document.getElementById("renal-result");
const osmoResult = document.getElementById("osmo-result");
const calciumResult = document.getElementById("calcium-result");
const fibrosisResult = document.getElementById("fibrosis-result");
const freeWaterResult = document.getElementById("free-water-result");
const nutritionResult = document.getElementById("nutrition-result");
const antibioticResult = document.getElementById("antibiotic-result");
const languageToggle = document.getElementById("language-toggle");
const initialPanel = document.getElementById("initial-panel");
const adjustPanel = document.getElementById("adjust-panel");
const infusionPanel = document.getElementById("infusion-panel");
const warfarinPanel = document.getElementById("warfarin-panel");
const heparinPanel = document.getElementById("heparin-panel");
const renalPanel = document.getElementById("renal-panel");
const osmoPanel = document.getElementById("osmo-panel");
const calciumPanel = document.getElementById("calcium-panel");
const fibrosisPanel = document.getElementById("fibrosis-panel");
const freeWaterPanel = document.getElementById("free-water-panel");
const nutritionPanel = document.getElementById("nutrition-panel");
const antibioticPanel = document.getElementById("antibiotic-panel");
const rulesPanel = document.getElementById("rules-panel");
const workflowChooser = document.getElementById("workflow-chooser");
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
const nutritionSexInput = document.getElementById("nutrition-sex");
const nutritionSexToggle = document.getElementById("nutrition-sex-toggle");
const nutritionSexLeft = document.getElementById("nutrition-sex-left");
const nutritionSexRight = document.getElementById("nutrition-sex-right");
const nutritionRouteInput = document.getElementById("nutrition-route");
const nutritionRouteTabs = document.getElementById("nutrition-route-tabs");
const nutritionIntakeInput = document.getElementById("nutrition-intake-percent");
const nutritionIntakeTabs = document.getElementById("nutrition-intake-tabs");
const nutritionPnRouteWrap = document.getElementById("nutrition-pn-route-wrap");
const nutritionPnHoursWrap = document.getElementById("nutrition-pn-hours-wrap");
const nutritionPnFluidWrap = document.getElementById("nutrition-pn-fluid-wrap");
const nutritionPnAdditivesWrap = document.getElementById("nutrition-pn-additives-wrap");
const ageWrap = document.getElementById("age-wrap");
const sexWrap = document.getElementById("sex-wrap");
const scrWrap = document.getElementById("scr-wrap");
const manualCrclWrap = document.getElementById("manual-crcl-wrap");
const warfarinTabs = document.getElementById("warfarin-tabs");
const heparinIndicationTabs = document.getElementById("heparin-indication-tabs");
const heparinOtherWrap = document.getElementById("heparin-other-wrap");
const heparinIndicationSelect = document.getElementById("heparin-indication");
const renalModeInput = document.getElementById("renal-mode");
const renalModeTabs = document.getElementById("renal-mode-tabs");
const renalSexInput = document.getElementById("renal-sex");
const renalSexTabs = document.getElementById("renal-sex-tabs");
const renalWeightWrap = document.getElementById("renal-weight-wrap");
const antibioticDrugSearch = document.getElementById("antibiotic-drug-search");
const antibioticDrugInput = document.getElementById("antibiotic-drug");
const antibioticDrugResults = document.getElementById("antibiotic-drug-results");
const antibioticIndicationSelect = document.getElementById("antibiotic-indication");
const antibioticRenalModeSelect = document.getElementById("antibiotic-renal-mode");
const antibioticCrclMethodSelect = document.getElementById("antibiotic-crcl-method");
const antibioticCrclMethodWrap = document.getElementById("antibiotic-crcl-method-wrap");
const antibioticAgeWrap = document.getElementById("antibiotic-age-wrap");
const antibioticWeightWrap = document.getElementById("antibiotic-weight-wrap");
const antibioticScrWrap = document.getElementById("antibiotic-scr-wrap");
const antibioticSexWrap = document.getElementById("antibiotic-sex-wrap");
const antibioticSexInput = document.getElementById("antibiotic-sex");
const antibioticSexToggle = document.getElementById("antibiotic-sex-toggle");
const antibioticSexLeft = document.getElementById("antibiotic-sex-left");
const antibioticSexRight = document.getElementById("antibiotic-sex-right");
const antibioticCrclWrap = document.getElementById("antibiotic-crcl-wrap");

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
const VIEWPORT_SETTLE_MS = 360;
const WARFARIN_TABLET_STRENGTHS = [1, 2, 3, 5];
const THAI_WEEKDAYS = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"];
const WARFARIN_TABLET_STORAGE_KEY = "warfarin-available-tablets";
const HEPARIN_PROTOCOLS = [
  {
    id: "acute-thrombosis",
    labelKey: "heparinProtocolAcuteThrombosis",
    bolusUnitsKg: 80,
    bolusMax: 10000,
    infusionUnitsKgHr: 18,
    antiXaGoal: "aPTT ratio 1.5-2.5",
    sourceKey: "heparinSourceUw",
    cautionKey: "heparinCautionAcuteThrombosis"
  },
  {
    id: "af-bridge",
    labelKey: "heparinProtocolAfBridge",
    bolusUnitsKg: 70,
    bolusMax: 10000,
    infusionUnitsKgHr: 15,
    antiXaGoal: "aPTT ratio 1.5-2.5",
    sourceKey: "heparinSourceUw",
    cautionKey: "heparinCautionLocal"
  },
  {
    id: "acs",
    labelKey: "heparinProtocolAcs",
    bolusUnitsKg: 60,
    bolusMax: 4000,
    infusionUnitsKgHr: 12,
    infusionMax: 1000,
    antiXaGoal: "aPTT ratio 1.5-2.5",
    sourceKey: "heparinSourceAcs",
    cautionKey: "heparinCautionAcs"
  },
  {
    id: "mechanical-support",
    labelKey: "heparinProtocolMechanicalSupport",
    bolusUnitsKg: 0,
    infusionUnitsKgHr: 15,
    antiXaGoal: "aPTT ratio 1.5-2.5",
    sourceKey: "heparinSourceUw",
    cautionKey: "heparinCautionLocal"
  },
  {
    id: "acute-ischemic-stroke",
    labelKey: "heparinProtocolStroke",
    bolusUnitsKg: 0,
    infusionUnitsKgHr: 12,
    antiXaGoal: "aPTT ratio 1.5-2.5",
    sourceKey: "heparinSourceUw",
    cautionKey: "heparinCautionStroke"
  },
  {
    id: "ultra-low",
    labelKey: "heparinProtocolUltraLow",
    bolusUnitsKg: 0,
    infusionUnitsKgHr: 8,
    antiXaGoal: "aPTT ratio 1.5-2.5",
    sourceKey: "heparinSourceUw",
    cautionKey: "heparinCautionLocal"
  }
];
const HEPARIN_PRIMARY_PROTOCOL_IDS = ["acute-thrombosis", "acs"];

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
  heparin: {
    panel: heparinPanel,
    firstInputId: "heparin-weight",
    form: document.getElementById("heparin-form"),
    calculator: "heparin"
  },
  renal: {
    panel: renalPanel,
    firstInputId: "renal-age",
    form: document.getElementById("renal-form"),
    calculator: "renal"
  },
  osmo: {
    panel: osmoPanel,
    firstInputId: "osmo-na",
    form: document.getElementById("osmo-form"),
    calculator: "osmo"
  },
  calcium: {
    panel: calciumPanel,
    firstInputId: "calcium-measured",
    form: document.getElementById("calcium-form"),
    calculator: "calcium"
  },
  fibrosis: {
    panel: fibrosisPanel,
    firstInputId: "fibrosis-age",
    form: document.getElementById("fibrosis-form"),
    calculator: "fibrosis"
  },
  freeWater: {
    panel: freeWaterPanel,
    firstInputId: "free-water-weight",
    form: document.getElementById("free-water-form"),
    calculator: "freeWater"
  },
  nutrition: {
    panel: nutritionPanel,
    firstInputId: "nutrition-weight",
    form: document.getElementById("nutrition-form"),
    calculator: "nutrition"
  },
  antibiotic: {
    panel: antibioticPanel,
    firstInputId: "antibiotic-age",
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

const ORAL_SUPPLEMENT_REFERENCE = [
  { no: "1.32", name: "Peptamen สูตรดื่ม", kcalMin: 200, kcalMax: 400, price: 290, code: "T01032" },
  { no: "1.33", name: "Peptamen สูตรดื่ม", kcalMin: 401, kcalMax: 600, price: 390, code: "T01033" },
  { no: "1.34", name: "Peptamen สูตรดื่ม", kcalMin: 601, kcalMax: 800, price: 490, code: "T01034" },
  { no: "1.35", name: "Peptamen สูตรดื่ม", kcalMin: 801, kcalMax: 1000, price: 590, code: "T01035" },
  { no: "1.36", name: "Aminoleban-oral สูตรดื่ม", kcalMin: 200, kcalMax: 400, price: 270, code: "T01036" },
  { no: "1.37", name: "Aminoleban-oral สูตรดื่ม", kcalMin: 401, kcalMax: 600, price: 340, code: "T01037" },
  { no: "1.38", name: "Aminoleban-oral สูตรดื่ม", kcalMin: 601, kcalMax: 800, price: 420, code: "T01038" },
  { no: "1.39", name: "Aminoleban-oral สูตรดื่ม", kcalMin: 801, kcalMax: 1000, price: 500, code: "T01039" },
  { no: "1.40", name: "NEO-MUNE vanilla สูตรดื่ม", kcalMin: 200, kcalMax: 400, price: 230, code: "T01040" },
  { no: "1.41", name: "NEO-MUNE vanilla สูตรดื่ม", kcalMin: 401, kcalMax: 600, price: 300, code: "T01041" },
  { no: "1.42", name: "NEO-MUNE vanilla สูตรดื่ม", kcalMin: 601, kcalMax: 800, price: 370, code: "T01042" },
  { no: "1.43", name: "NEO-MUNE vanilla สูตรดื่ม", kcalMin: 801, kcalMax: 1000, price: 440, code: "T01043" },
  { no: "1.44", name: "NEO-MUNE Japanese rice สูตรดื่ม", kcalMin: 200, kcalMax: 400, price: 230, code: "T01044" },
  { no: "1.45", name: "NEO-MUNE Japanese rice สูตรดื่ม", kcalMin: 401, kcalMax: 600, price: 300, code: "T01045" },
  { no: "1.46", name: "NEO-MUNE Japanese rice สูตรดื่ม", kcalMin: 601, kcalMax: 800, price: 370, code: "T01046" },
  { no: "1.47", name: "NEO-MUNE Japanese rice สูตรดื่ม", kcalMin: 801, kcalMax: 1000, price: 440, code: "T01047" },
  { no: "1.48", name: "ONCE Dialyze สูตรดื่ม", kcalMin: 200, kcalMax: 400, price: 200, code: "T01048" },
  { no: "1.49", name: "ONCE Dialyze สูตรดื่ม", kcalMin: 401, kcalMax: 600, price: 270, code: "T01049" },
  { no: "1.50", name: "ONCE Dialyze สูตรดื่ม", kcalMin: 601, kcalMax: 800, price: 330, code: "T01050" },
  { no: "1.51", name: "ONCE Dialyze สูตรดื่ม", kcalMin: 801, kcalMax: 1000, price: 400, code: "T01051" },
  { no: "1.52", name: "Oral Impact สูตรดื่ม", kcalMin: 200, kcalMax: 400, price: 320, code: "T01052" },
  { no: "1.53", name: "Oral Impact สูตรดื่ม", kcalMin: 401, kcalMax: 600, price: 460, code: "T01053" },
  { no: "1.54", name: "Oral Impact สูตรดื่ม", kcalMin: 601, kcalMax: 800, price: 590, code: "T01054" },
  { no: "1.55", name: "Oral Impact สูตรดื่ม", kcalMin: 801, kcalMax: 1000, price: 720, code: "T01055" }
];

const HOSPITAL_DIET_REFERENCE = [
  { diet: "ธรรมดา (Regular diet) Size L", ward: "สามัญ/พิเศษ", cpf: "50:20:30%", calories: 1800 },
  { diet: "ธรรมดา (Regular diet) Size M", ward: "สามัญ/พิเศษ", cpf: "50:20:30%", calories: 1500 },
  { diet: "ธรรมดา (Regular diet) Size S", ward: "สามัญ/พิเศษ", cpf: "50:20:30%", calories: 1200 },
  { diet: "ธรรมดา มุสลิม", ward: "สามัญ/พิเศษ", cpf: "55:15:30%", calories: 1500 },
  { diet: "ธรรมดา มุสลิม", ward: "สามัญ/พิเศษ", cpf: "55:15:30%", calories: 1800 },
  { diet: "อ่อน (Soft diet)", ward: "สามัญ/พิเศษ", cpf: "50:20:30%", calories: 1500 },
  { diet: "ธรรมดา ไทย A", ward: "พิเศษ (VVIP)", cpf: "50:20:30%", calories: 1800 },
  { diet: "อ่อน ไทย B", ward: "พิเศษ (VVIP)", cpf: "50:20:30%", calories: 1500 },
  { diet: "อาหารฝรั่ง", ward: "พิเศษ (VVIP)", cpf: "50:20:30%", calories: 2500 },
  { diet: "อาหารเหลวใส (ธรรมดา)", ward: "สามัญ/พิเศษ", cpf: "C 100%", calories: 600 },
  { diet: "อาหารเหลวใส (เบาหวาน)", ward: "สามัญ/พิเศษ", cpf: "C 100%", calories: 600 },
  { diet: "อาหารเหลวข้น (ธรรมดา)", ward: "สามัญ/พิเศษ", cpf: "50:20:30%", calories: 1100 },
  { diet: "อาหารเหลวข้น (เบาหวาน)", ward: "สามัญ/พิเศษ", cpf: "50:20:30%", calories: 1100 },
  { diet: "โจ๊ก", ward: "สามัญ", cpf: "55:18:27%", calories: 1000 },
  { diet: "โจ๊ก", ward: "พิเศษ", cpf: "52:21:27%", calories: 1300 },
  { diet: "โจ๊ก ถ้วยเล็ก", ward: "พิเศษ", cpf: "46:19:35%", calories: 950 },
  { diet: "โจ๊ก ถ้วยเล็ก", ward: "สามัญ", cpf: "51:18:31%", calories: 650 },
  { diet: "โจ๊ก Stroke ถ้วยใหญ่", ward: "", cpf: "55:18:27%", calories: 1000 },
  { diet: "โจ๊ก Stroke ถ้วยเล็ก", ward: "", cpf: "51:18:31%", calories: 650 },
  { diet: "โจ๊ก (เคมีบำบัด)", ward: "พิเศษ", cpf: "45:20:35%", calories: 1300 },
  { diet: "โจ๊ก (เคมีบำบัด)", ward: "สามัญ", cpf: "45:20:35%", calories: 1000 }
];

const HOSPITAL_DIET_ADDON_REFERENCE = [
  { item: "ซุปข้นโปรตีนสูง", detail: "500 kcal, protein 25 g" },
  { item: "น้ำสมุนไพรโปรตีนสูง", detail: "115 kcal, protein 10 g" },
  { item: "ไอศกรีมโปรตีนสูง", detail: "150 kcal/scoop, protein 9 g/scoop" },
  { item: "น้ำหวาน 120 cc", detail: "1 carb, carbohydrate 15 g" }
];

const PARENTERAL_NUTRITION_REFERENCE = [
  {
    route: "Peripheral PN",
    product: "Nutriflex peri",
    volume: 1250,
    energy: 955,
    osmole: 840,
    glucose: 80,
    amino: 40,
    lipid: 50,
    na: 50,
    k: 30,
    mg: 3,
    ca: 3,
    po4: 7.5,
    cl: 48
  },
  {
    route: "Peripheral PN",
    product: "Nutriflex peri",
    volume: 1875,
    energy: 1435,
    osmole: 840,
    glucose: 120,
    amino: 60,
    lipid: 75,
    na: 75,
    k: 45,
    mg: 4.5,
    ca: 4.5,
    po4: 11.3,
    cl: 72
  },
  {
    route: "Peripheral PN",
    product: "Oliclinomel N4",
    volume: 1500,
    energy: 910,
    osmole: 750,
    glucose: 120,
    amino: 33,
    lipid: 30,
    na: 32,
    k: 24,
    mg: 3.3,
    ca: 3,
    po4: 10.5,
    cl: 50
  },
  {
    route: "Peripheral PN",
    product: "Oliclinomel N4",
    volume: 2000,
    energy: 1215,
    osmole: 750,
    glucose: 160,
    amino: 44,
    lipid: 40,
    na: 42,
    k: 32,
    mg: 4.4,
    ca: 4,
    po4: 14,
    cl: 66
  },
  {
    route: "Peripheral PN",
    product: "SMOF kabiven peri",
    volume: 1448,
    energy: 1000,
    osmole: 850,
    glucose: 103,
    amino: 46,
    lipid: 41,
    na: 36,
    k: 28,
    mg: 4.6,
    ca: 2.3,
    po4: 11.9,
    cl: 32
  },
  {
    route: "Peripheral PN",
    product: "SMOF kabiven peri",
    volume: 1904,
    energy: 1300,
    osmole: 850,
    glucose: 135,
    amino: 60,
    lipid: 54,
    na: 48,
    k: 36,
    mg: 6,
    ca: 3,
    po4: 15.6,
    cl: 42
  },
  {
    route: "Peripheral PN",
    product: "Kabiven peri",
    volume: 1440,
    energy: 1000,
    osmole: 850,
    glucose: 97,
    amino: 34,
    lipid: 51,
    na: 32,
    k: 24,
    mg: 4,
    ca: 2,
    po4: 11,
    cl: 47
  },
  {
    route: "Peripheral PN",
    product: "Kabiven peri",
    volume: 1920,
    energy: 1400,
    osmole: 850,
    glucose: 130,
    amino: 45,
    lipid: 68,
    na: 43,
    k: 32,
    mg: 5.3,
    ca: 2.7,
    po4: 14,
    cl: 62
  },
  {
    route: "Peripheral PN",
    product: "B-fluid",
    volume: 1000,
    energy: 420,
    osmole: 858,
    glucose: 75,
    amino: 30,
    lipid: 0,
    na: 35,
    k: 20,
    mg: 5,
    ca: 5,
    po4: 10,
    cl: 35
  },
  {
    route: "Central PN",
    product: "Nutriflex Central",
    volume: 625,
    energy: 740,
    osmole: 1545,
    glucose: 90,
    amino: 36,
    lipid: 25,
    na: 33.5,
    k: 23.5,
    mg: 2.65,
    ca: 2.65,
    po4: 10,
    cl: 30
  },
  {
    route: "Central PN",
    product: "Nutriflex Central",
    volume: 1250,
    energy: 1475,
    osmole: 1545,
    glucose: 180,
    amino: 72,
    lipid: 50,
    na: 67,
    k: 47,
    mg: 5.3,
    ca: 5.3,
    po4: 20,
    cl: 60
  },
  {
    route: "Central PN",
    product: "Oliclinomel N7",
    volume: 1000,
    energy: 1200,
    osmole: 1450,
    glucose: 160,
    amino: 40,
    lipid: 40,
    na: 32,
    k: 24,
    mg: 2.2,
    ca: 2,
    po4: 7,
    cl: 48
  },
  {
    route: "Central PN",
    product: "Oliclinomel N7",
    volume: 1500,
    energy: 1800,
    osmole: 1450,
    glucose: 240,
    amino: 60,
    lipid: 60,
    na: 48,
    k: 36,
    mg: 3.3,
    ca: 3,
    po4: 10.5,
    cl: 72
  },
  {
    route: "Central PN",
    product: "Oliclinomel N7",
    volume: 2000,
    energy: 2400,
    osmole: 1450,
    glucose: 320,
    amino: 80,
    lipid: 80,
    na: 64,
    k: 48,
    mg: 4.4,
    ca: 4,
    po4: 14,
    cl: 96
  },
  {
    route: "Central PN",
    product: "Olimel N12",
    volume: 650,
    energy: 620,
    osmole: 1270,
    glucose: 47.7,
    amino: 49.4,
    lipid: 22.8,
    na: 22.8,
    k: 19.5,
    mg: 2.6,
    ca: 2.3,
    po4: 9.5,
    cl: 30
  },
  {
    route: "Central PN",
    product: "Olimel N12",
    volume: 1000,
    energy: 950,
    osmole: 1270,
    glucose: 73.3,
    amino: 75.9,
    lipid: 35,
    na: 35,
    k: 30,
    mg: 4,
    ca: 3.5,
    po4: 15,
    cl: 45
  },
  {
    route: "Central PN",
    product: "Olimel N12",
    volume: 1500,
    energy: 1420,
    osmole: 1270,
    glucose: 110,
    amino: 113.9,
    lipid: 52.5,
    na: 52.5,
    k: 45,
    mg: 6,
    ca: 5.3,
    po4: 21.9,
    cl: 68
  },
  {
    route: "Central PN",
    product: "SMOF kabiven central",
    volume: 986,
    energy: 1100,
    osmole: 1500,
    glucose: 125,
    amino: 50,
    lipid: 38,
    na: 40,
    k: 30,
    mg: 5,
    ca: 2.5,
    po4: 12,
    cl: 35
  },
  {
    route: "Central PN",
    product: "SMOF kabiven central",
    volume: 1477,
    energy: 1600,
    osmole: 1500,
    glucose: 187,
    amino: 75,
    lipid: 56,
    na: 60,
    k: 45,
    mg: 7.5,
    ca: 3.8,
    po4: 19,
    cl: 52
  },
  {
    route: "Central PN",
    product: "SMOF kabiven central",
    volume: 1970,
    energy: 2200,
    osmole: 1500,
    glucose: 250,
    amino: 100,
    lipid: 75,
    na: 80,
    k: 60,
    mg: 10,
    ca: 5,
    po4: 25,
    cl: 70
  }
];

const BD_FORMULA_REFERENCE = [
  { company: "Abbott", formula: "BD (1:1)", volume: "200 cc x 3 feeds", protein: 22 },
  { company: "Abbott", formula: "BD DM (1:1)", volume: "200 cc x 3 feeds", protein: 27 },
  { company: "Abbott", formula: "BD (1.2:1)", volume: "200 cc x 3 feeds", protein: 27 },
  { company: "Abbott", formula: "BD DM (1.2:1)", volume: "200 cc x 3 feeds", protein: 32 },
  { company: "Abbott", formula: "BD (1.5:1)", volume: "200 cc x 3 feeds", protein: 33 },
  { company: "Abbott", formula: "BD DM (1.5:1)", volume: "200 cc x 3 feeds", protein: 41 },
  { company: "Nestle", formula: "BD (1:1)", volume: "200 cc x 3 feeds", protein: 25 },
  { company: "Nestle", formula: "BD DM (1:1)", volume: "200 cc x 3 feeds", protein: 28 },
  { company: "Nestle", formula: "BD (1.2:1)", volume: "200 cc x 3 feeds", protein: 30 },
  { company: "Nestle", formula: "BD DM (1.2:1)", volume: "200 cc x 3 feeds", protein: 34 },
  { company: "Nestle", formula: "BD (1.5:1)", volume: "200 cc x 3 feeds", protein: 37 },
  { company: "Nestle", formula: "BD DM (1.5:1)", volume: "200 cc x 3 feeds", protein: 42 },
  { company: "Thai Otsuka", formula: "BD (1:1)", volume: "200 cc x 3 feeds", protein: 27 },
  { company: "Thai Otsuka", formula: "BD DM (1:1)", volume: "200 cc x 3 feeds", protein: 30 },
  { company: "Thai Otsuka", formula: "BD (1.2:1)", volume: "200 cc x 3 feeds", protein: 27 },
  { company: "Thai Otsuka", formula: "BD DM (1.2:1)", volume: "200 cc x 3 feeds", protein: 35 },
  { company: "Thai Otsuka", formula: "BD (1.5:1)", volume: "200 cc x 3 feeds", protein: 40 },
  { company: "Thai Otsuka", formula: "BD DM (1.5:1)", volume: "200 cc x 3 feeds", protein: 44 }
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
    docTitle: "Clinical Order Calculator",
    langButton: "ไทย",
    eyebrow: "Adult Protocol Helper",
    heroTitle: "Clinical Order Calculator",
    modePrompt: "Search calculator",
    searchLabel: "Search calculators",
    searchPlaceholder: "Search: vanco, heparin, antibiotic, calcium, water...",
    noCalculatorResults: "No matching calculators.",
    openCalculator: "Open",
    vancoCalcName: "Vancomycin dosing",
    vancoCalcDesc: "Loading dose, maintenance regimen, CrCl interval, and serum-level adjustment.",
    infusionCalcName: "Infusion rate",
    infusionCalcDesc: "Convert mcg/kg/min to mL/hr from body weight, drug amount, and final volume.",
    warfarinCalcName: "Warfarin adjustment",
    warfarinCalcDesc: "Estimate weekly dose adjustment from current INR and target range.",
    heparinCalcName: "Heparin bolus + drip",
    heparinCalcDesc: "Estimate adult IV unfractionated heparin bolus, drip rate, and pump mL/hr by indication.",
    renalCalcName: "GFR / CrCl",
    renalCalcDesc: "Calculate creatinine-only eGFR or Cockcroft-Gault creatinine clearance.",
    osmoCalcName: "Serum osmolality",
    osmoCalcDesc: "Calculate serum osmolality from sodium, glucose, and BUN.",
    calciumCalcName: "Corrected calcium",
    calciumCalcDesc: "Correct total calcium for low albumin using the standard albumin correction.",
    fibrosisCalcName: "FIB-4 / APRI",
    fibrosisCalcDesc: "Calculate liver fibrosis screening scores from age, AST/ALT, platelets, and AST ULN.",
    freeWaterCalcName: "Free water deficit",
    freeWaterCalcDesc: "Estimate hypernatremia free-water deficit and generate a copy-ready replacement order.",
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
    orderReadyCopy: "Order Ready - click to copy",
    orderLineReady: "Order Ready - click each line to copy",
    orderCopied: "Copied order to clipboard.",
    orderLineCopied: "Copied to clipboard.",
    orderCopyFailed: "Copy failed. Select and copy manually.",
    oneDayOrder: "One-Day Order",
    continuedOrder: "Continued Order",
    hr: "hr",
    follow48: "Follow vancomycin level at 48 hr after loading dose.",
    follow3: "Follow vancomycin level at 30 minutes before 3rd dose.",
    follow4: "Vancomycin level 30 นาทีก่อน dose 4",
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
    vancoAdjustOrderReady: "Order Ready - click each line to copy",
    vancoAdjustCopied: "Copied order line to clipboard.",
    vancoAdjustCopyFailed: "Copy failed. Select and copy manually.",
    vancoHoldLine: "Hold vancomycin dose.",
    vancoHoldFollow: "Follow vancomycin level and reassess before redosing.",
    aucMic: "AUC/MIC:",
    target400600: "(target 400-600)",
    pkApprox: "This adjustment uses proportional PK approximation; use institution protocol/AUC software when available.",
    infusionHeading: "mcg/kg/min to mL/hr",
    infusionWeightLabel: "Body weight (kg)",
    infusionDoseLabel: "Dose (mcg/kg/min)",
    infusionDrugLabel: "Drug amount (mg)",
    infusionVolumeLabel: "Final volume (mL)",
    infusionRateMlHrLabel: "Pump rate (mL/hr)",
    infusionNeed: "Fill body weight, final volume, drug amount, and either mL/hr or mcg/kg/min.",
    infusionBaseNeed: "Fill body weight, final volume, and drug amount.",
    infusionDirectionNeed: "Then fill either mL/hr or infusion rate.",
    infusionMlHrResult: "Calculated mL/hr:",
    infusionDoseResult: "Calculated infusion rate:",
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
    warfarinRxTitle: "Prescription Ready - click each line to copy",
    warfarinCopied: "Copied prescription line to clipboard.",
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
    heparinHeading: "Heparin bolus + drip",
    heparinWeightLabel: "Body weight (kg)",
    heparinIndicationLabel: "Indication / protocol",
    heparinOtherLabel: "Other protocol",
    heparinQuickAcute: "Acute thrombosis",
    heparinQuickAcs: "ACS / STEMI",
    heparinQuickOther: "Others",
    heparinBagUnitsLabel: "Bag units",
    heparinBagVolumeLabel: "Bag volume (mL)",
    heparinProtocolAcuteThrombosis: "Acute thrombosis: DVT / PE",
    heparinProtocolAfBridge: "AF / valve replacement / peri-procedural bridge",
    heparinProtocolAcs: "ACS / STEMI fibrinolysis (capped)",
    heparinProtocolMechanicalSupport: "Mechanical circulatory support",
    heparinProtocolStroke: "Acute ischemic stroke protocol",
    heparinProtocolUltraLow: "Ultra-low intensity",
    heparinNeed: "Fill body weight, bag units, and bag volume.",
    heparinBadBag: "Bag concentration must be greater than zero.",
    heparinOrderReady: "Ready to paste - click box to copy all",
    heparinPrepLine: "Heparin {bagUnits}u + NSS {bagVolume}ml IV",
    heparinBolusLine: "Heparin {dose} u IV bolus then",
    heparinNoBolusLine: "No heparin IV bolus then",
    heparinInfusionLine: "Heparin IV drip rate {mlHr} ml/hr ({unitsHr} u/hr)",
    heparinMonitorLine: "aPTT ratio q6hr (keep 1.5-2.5)",
    heparinBolusResult: "Bolus:",
    heparinInfusionResult: "Initial infusion:",
    heparinPumpRateResult: "Pump rate:",
    heparinConcentrationResult: "Concentration:",
    heparinTargetResult: "Monitoring target:",
    heparinCapApplied: "cap applied",
    heparinNoBolus: "none",
    heparinSourceLabel: "Reference:",
    heparinSourceUw: "UW Medicine adult UFH initiation table.",
    heparinSourceAcs: "ACS dosing uses the capped ACC/AHA UA/NSTEMI UFH dosing table; Merck Manual Professional gives similar ACS/STEMI dosing.",
    heparinCautionAcuteThrombosis: "Therapeutic VTE/acute thrombosis protocols commonly use 80 units/kg bolus and 18 units/kg/hr infusion; local maximum infusion rates vary.",
    heparinCautionAcs: "ACS/STEMI UFH dosing is capped to reduce excess initial dosing; verify concurrent fibrinolytic/PCI plan and antiplatelet regimen.",
    heparinCautionStroke: "UFH is not routine for most acute ischemic stroke patients; use only when explicitly indicated by stroke/neurology protocol.",
    heparinCautionLocal: "Initial UFH intensity, bolus use, monitoring assay, and caps vary by institution. Confirm bleeding risk, platelet count/HIT history, procedures, and local policy.",
    heparinCopied: "Copied heparin order line to clipboard.",
    heparinAllCopied: "Copied heparin order to clipboard.",
    heparinCopyFailed: "Copy blocked. Text selected - press Cmd+C.",
    renalHeading: "GFR / CrCl calculator",
    renalModeLabel: "Calculation",
    renalModeGfr: "GFR",
    renalModeCrcl: "CrCl",
    renalAgeLabel: "Age (years)",
    renalScrLabel: "Serum creatinine, SCr (mg/dL)",
    renalWeightLabel: "Body weight (kg)",
    renalSexLabel: "Sex",
    renalSexMale: "Male",
    renalSexFemale: "Female",
    renalNeedGfr: "Fill age, SCr, and sex to calculate GFR.",
    renalNeedCrcl: "Fill age, SCr, weight, and sex to calculate CrCl.",
    renalGfrResult: "eGFR:",
    renalCrclResult: "CrCl:",
    renalGfrFormula: "GFR uses the 2021 CKD-EPI creatinine equation without race coefficient.",
    renalCrclFormula: "CrCl uses Cockcroft-Gault = ((140 - age) x weight) / (72 x SCr), and x0.85 for female.",
    renalCaution: "Creatinine-based estimates are less reliable with unstable renal function, extremes of muscle mass, pregnancy, amputation, or non-steady-state SCr.",
    osmoHeading: "Calculated serum osmolality",
    osmoNaLabel: "Sodium, Na (mEq/L)",
    osmoGlucoseLabel: "Glucose (mg/dL)",
    osmoBunLabel: "BUN (mg/dL)",
    osmoMeasuredLabel: "Measured serum osmolality (mOsm/kg)",
    osmoNeed: "Fill Na and glucose to calculate effective osmolality.",
    osmoAddBun: "Add BUN to calculate serum osmolality.",
    osmoAddMeasured: "Add measured serum osmolality to calculate osmolal gap.",
    osmoAddBunForGap: "Add BUN to calculate osmolal gap from measured serum osmolality.",
    osmoEffectiveResult: "Effective osmolality:",
    osmoResult: "Calculated serum osmolality:",
    osmoGapResult: "Osmolal gap:",
    osmoGapNormal: "Osmolal gap not elevated by the common >10 cutoff.",
    osmoGapHigh: "Elevated osmolal gap. Consider unmeasured osmoles/toxic alcohols if clinically relevant.",
    osmoEffectiveFormula: "Effective osmolality formula: 2 x Na + glucose/18.",
    osmoSerumFormula: "Calculated serum osmolality formula: 2 x Na + glucose/18 + BUN/2.8.",
    osmoGapFormula: "Osmolal gap formula: measured serum osmolality - calculated serum osmolality.",
    calciumHeading: "Corrected calcium",
    calciumMeasuredLabel: "Measured total calcium (mg/dL)",
    calciumAlbuminLabel: "Serum albumin (g/dL)",
    calciumNeed: "Fill measured calcium and albumin.",
    calciumResult: "Corrected calcium:",
    calciumLow: "Low corrected calcium.",
    calciumNormal: "Corrected calcium within usual reference range.",
    calciumHigh: "High corrected calcium.",
    calciumFormula: "Formula: corrected Ca = measured Ca + 0.8 x (4 - albumin). Usual reference range shown here: 8.5-10.5 mg/dL.",
    fibrosisHeading: "FIB-4 / APRI",
    fibrosisAgeLabel: "Age (years)",
    fibrosisAstLabel: "AST (U/L)",
    fibrosisAltLabel: "ALT (U/L)",
    fibrosisPlateletsLabel: "Platelets (10^9/L)",
    fibrosisAstUlnLabel: "AST upper limit normal (U/L)",
    fibrosisNeed: "Fill age, AST, ALT, platelets, and AST ULN.",
    fibrosisFib4Result: "FIB-4:",
    fibrosisApriResult: "APRI:",
    fibrosisFib4Interpretation: "FIB-4 interpretation:",
    fibrosisApriInterpretation: "APRI interpretation:",
    fibrosisFib4Low: "Low probability of advanced fibrosis by original HCV-derived cutoff (<1.45).",
    fibrosisFib4Indeterminate: "Indeterminate by original cutoff (1.45-3.25); consider clinical context and elastography if needed.",
    fibrosisFib4High: "High probability of advanced fibrosis by original HCV-derived cutoff (>3.25).",
    fibrosisFib4MasldNote: "MASLD/AASLD primary-risk thresholds differ: <1.3 low risk, >2.67 higher risk; age >=65 often uses <2.0 as the lower-risk threshold.",
    fibrosisApriLow: "Low APRI (<0.5); better for ruling out cirrhosis than ruling out all significant disease.",
    fibrosisApriIndeterminate: "Intermediate APRI (0.5-1.5); less clinically decisive.",
    fibrosisApriHigh: "High APRI (>1.5); higher probability of cirrhosis/significant disease.",
    fibrosisApriCirrhosis: "APRI >=2.0 is a more specific cirrhosis threshold in HCV data.",
    fibrosisFib4Formula: "FIB-4 = age x AST / (platelets x sqrt(ALT)). Platelets use 10^9/L.",
    fibrosisApriFormula: "APRI = ((AST / AST ULN) / platelets) x 100. Use local AST ULN if known; 40 U/L is commonly used.",
    fibrosisCaution: "Screening estimate only. Acute hepatitis, cholestasis, alcohol use, thrombocytopenia causes, age extremes, and non-HCV/MASLD populations can shift interpretation.",
    fibrosisSourceNote: "References: Hepatitis C Online FIB-4/APRI calculators and AASLD MASLD noninvasive assessment guidance.",
    freeWaterHeading: "Free water deficit",
    freeWaterWeightLabel: "Body weight (kg)",
    freeWaterNaLabel: "Current Na (mEq/L)",
    freeWaterTargetLabel: "Target Na (mEq/L)",
    freeWaterDurationLabel: "Correction duration (hr)",
    freeWaterTbwLabel: "TBW factor",
    freeWaterRouteLabel: "Replacement route",
    freeWaterTbwAdultMale: "Adult male 0.6",
    freeWaterTbwAdultFemale: "Adult female / elderly male 0.5",
    freeWaterTbwElderlyFemale: "Elderly female 0.45",
    freeWaterTbwLowLeanMass: "Low lean mass 0.4",
    freeWaterRouteD5w: "D5W IV",
    freeWaterRouteEnteral: "Enteral free water",
    freeWaterNeed: "Fill body weight, current Na, target Na, and correction duration.",
    freeWaterTargetError: "Target Na must be lower than current Na for free-water deficit correction.",
    freeWaterResult: "Estimated free water deficit:",
    freeWaterTbwUsed: "Estimated TBW:",
    freeWaterRate: "Replacement rate:",
    freeWaterRateDisplay: "{rate} mL/hr over {duration} hr",
    freeWaterCorrectionRate: "Planned Na decrease:",
    freeWaterCorrectionRateDisplay: "{perDay} mEq/L per 24 hr ({perHour} mEq/L/hr)",
    freeWaterFastWarning: "Warning: planned correction is faster than typical chronic hypernatremia limits.",
    freeWaterOrderReady: "Order Ready - click each line to copy",
    freeWaterD5wOrder: "D5W IV drip {rate} mL/hr for {duration} hr (free water deficit {deficit} L; target Na {target})",
    freeWaterEnteralOrder: "Enteral free water {perDose} mL q{interval}h for {duration} hr (free water deficit {deficit} L; target Na {target})",
    freeWaterMonitorOrder: "Follow serum Na q4-6h during correction and adjust free water rate",
    freeWaterCaution:
      "Formula estimates water deficit only; add ongoing losses and treat hypovolemia first if present. Avoid overly rapid chronic hypernatremia correction.",
    freeWaterFormula: "Formula: free water deficit = TBW x (current Na / target Na - 1). TBW = weight x selected TBW factor.",
    nutritionHeading: "Nutrition goals",
    nutritionWeightLabel: "Body weight (kg)",
    nutritionHeightLabel: "Height (cm)",
    nutritionSexLabel: "Sex for IBW",
    nutritionSexMalePill: "Male",
    nutritionSexFemalePill: "Female",
    nutritionRouteLabel: "Nutrition order type",
    nutritionRouteDiet: "Diet",
    nutritionRouteOns: "ONS",
    nutritionRouteEnteral: "Enteral",
    nutritionRoutePn: "PN",
    nutritionIntakeLabel: "Estimated current intake",
    nutritionCkdLabel: "CKD",
    nutritionAkiLabel: "AKI",
    nutritionCriticalLabel: "Critical illness",
    nutritionRefeedingLabel: "Risk refeeding",
    nutritionPnRouteLabel: "PN route",
    nutritionPnHoursLabel: "PN infusion hours",
    nutritionPnFluidLabel: "PN fluid limit (mL/day, optional)",
    nutritionPnAdditivesLabel: "Add Soluvit/Vitalipid/Addamel",
    nutritionNeed: "Fill body weight and height.",
    nutritionBmi: "BMI:",
    nutritionIbw: "IBW (Devine):",
    nutritionBmi25Weight: "BMI 25 weight:",
    nutritionAdjustedBw: "Adjusted BW (nutrition):",
    nutritionWeightBasis: "Weight basis:",
    nutritionBasisActual: "actual BW",
    nutritionBasisIbw: "IBW",
    nutritionBasisAdjusted: "adjusted BW",
    nutritionEnergy: "Total calories:",
    nutritionProtein: "Total protein:",
    nutritionVolume: "Estimated fluid/volume:",
    nutritionStandardWeightRule: "Weight basis: actual BW for non-obese adult estimate.",
    nutritionNoncriticalObesityRule:
      "Weight basis: obesity/non-ICU uses adjusted BW = BMI25 weight + 0.33 x (actual BW - BMI25 weight), consistent with ESPEN hospital nutrition guidance.",
    nutritionCriticalObesityRule:
      "Weight basis: critical obesity uses ASPEN-style hypocaloric high-protein targets; BMI 30-50 uses 11-14 kcal/kg actual BW, BMI >50 uses 22-25 kcal/kg IBW, protein uses 2.0-2.5 g/kg IBW.",
    nutritionUnderweightRule:
      "Weight basis: underweight uses actual BW. Goal is 30 kcal/kg actual BW and at least 1.2 g/kg actual BW protein, reached cautiously because refeeding risk is higher.",
    nutritionUnderweightCriticalRule:
      "Weight basis: underweight critical illness uses actual BW with cautious early feeding and refeeding monitoring.",
    nutritionSevereUnderweightRule:
      "BMI <16 is high refeeding risk by NICE criteria, so the app starts energy at 10 kcal/kg actual BW. Extreme risk such as BMI <14 or negligible intake >15 days may require 5 kcal/kg/day.",
    nutritionRefeedingWeightRule: "Refeeding risk: starts energy at 10 kcal/kg using the selected energy weight; advance after electrolyte stability.",
    nutritionFormula: "Example enteral plan:",
    nutritionOrderReady: "Feeding Order Ready - click each line to copy",
    nutritionDietOrderReady: "Diet Order Ready - click each line to copy",
    nutritionOnsOrderReady: "ONS Order Ready - click each line to copy",
    nutritionProgressNoteReady: "Nutrition Note Ready - click box to copy all",
    nutritionPnOrderReady: "PN Order Ready - click box to copy all",
    nutritionPnMonitorReady: "PN Monitoring Ready - click box to copy all",
    nutritionPnRecommendation: "Best premixed PN match:",
    nutritionPnAlternatives: "Other available PN bags:",
    nutritionPnNoMatch: "No PN formulation matches the selected route.",
    nutritionPnCaution: "Confirm central/peripheral access, electrolyte replacement, micronutrient compatibility, glycemic control, fluid status, and pharmacy aseptic preparation before prescribing.",
    nutritionReferenceTitle: "Show reference table",
    nutritionReferenceVerify: "Verify diet-size calories against the local hospital/dietitian table before relying on recommendations.",
    nutritionHospitalDietReference: "Hospital oral diet calorie table",
    nutritionPnReference: "Parenteral nutrition composition table",
    nutritionSupplementReference: "Oral/enteral supplement order table",
    nutritionBdReference: "BD formula protein reference",
    nutritionSupplementRecommendation: "Reference match for calorie goal:",
    nutritionNoSupplementMatch: "No oral supplement reference row covers this calorie goal; use calculated BD plan or verify with dietitian.",
    nutritionDeficitSummary: "Nutrition deficit:",
    nutritionCaution: "Use clinical judgment for fluid restriction, dialysis, electrolytes, glycemic control, and refeeding monitoring.",
    antibioticHeading: "Antibiotic renal dosing",
    antibioticDrugLabel: "Antibiotic",
    antibioticDrugPlaceholder: "Type antibiotic name...",
    antibioticPickerLabel: "Select antibiotic",
    antibioticNoDrugResults: "No matching antibiotic.",
    antibioticIndicationLabel: "Indication / regimen",
    antibioticRenalModeLabel: "Renal mode",
    antibioticCrclMethodLabel: "CrCl input method",
    antibioticCrclMethodAuto: "Auto Cockcroft-Gault",
    antibioticCrclMethodManual: "Manual CrCl",
    antibioticAgeLabel: "Age (years)",
    antibioticWeightLabel: "Body weight (kg)",
    antibioticScrLabel: "SCr (mg/dL)",
    antibioticSexLabel: "Sex",
    antibioticSexMale: "Male",
    antibioticSexFemale: "Female",
    antibioticCrclLabel: "CrCl (mL/min)",
    antibioticNeed: "Select antibiotic/regimen and fill CrCl data.",
    antibioticNeedAutoCrcl: "Fill age, body weight, SCr, and sex for auto CrCl.",
    antibioticOrderReady: "Order Ready - click each line to copy",
    antibioticCopied: "Copied order line to clipboard.",
    antibioticCopyFailed: "Copy failed. Select and copy the order manually.",
    antibioticCrclUsed: "CrCl used:",
    antibioticEstimatedCrcl: "Estimated CrCl (Cockcroft-Gault):",
    antibioticManualCrclUsed: "Manual CrCl used:",
    antibioticRenalModeCrcl: "Non-HD: use CrCl",
    antibioticRenalModeHd: "Intermittent hemodialysis",
    antibioticHdMode: "Intermittent HD dosing used",
    antibioticSourceNote: "Based on the 2024 hospital renal antibiotic dosing table provided by the user. Confirm indication severity, allergy, cultures, dialysis/CRRT status, and ID/pharmacy when needed."
  },
  th: {
    docTitle: "Clinical Order Calculator",
    langButton: "English",
    eyebrow: "ผู้ช่วยแนวทางผู้ป่วยผู้ใหญ่",
    heroTitle: "Clinical Order Calculator",
    modePrompt: "ค้นหาเครื่องคำนวณ",
    searchLabel: "ค้นหาเครื่องคำนวณ",
    searchPlaceholder: "ค้นหา: vanco, heparin, antibiotic, calcium, water...",
    noCalculatorResults: "ไม่พบเครื่องคำนวณที่ตรงกัน",
    openCalculator: "เปิด",
    vancoCalcName: "Vancomycin dosing",
    vancoCalcDesc: "คำนวณ loading dose, maintenance regimen, ความถี่ตาม CrCl และปรับตามระดับยา",
    infusionCalcName: "อัตราการให้ยา",
    infusionCalcDesc: "แปลง mcg/kg/min เป็น mL/hr จากน้ำหนัก ปริมาณยา และปริมาตรรวม",
    warfarinCalcName: "ปรับยา Warfarin",
    warfarinCalcDesc: "ประเมินการปรับขนาดยารวมต่อสัปดาห์จาก INR และช่วงเป้าหมาย",
    heparinCalcName: "Heparin bolus + drip",
    heparinCalcDesc: "ประเมิน heparin IV bolus, อัตรา drip และ mL/hr ตาม indication ในผู้ใหญ่",
    renalCalcName: "GFR / CrCl",
    renalCalcDesc: "คำนวณ eGFR จาก creatinine หรือ CrCl แบบ Cockcroft-Gault",
    osmoCalcName: "Serum osmolality",
    osmoCalcDesc: "คำนวณ serum osmolality จาก sodium, glucose และ BUN",
    calciumCalcName: "Corrected calcium",
    calciumCalcDesc: "ปรับค่า total calcium ตาม albumin",
    fibrosisCalcName: "FIB-4 / APRI",
    fibrosisCalcDesc: "คำนวณคะแนนคัดกรอง liver fibrosis จากอายุ AST/ALT platelet และ AST ULN",
    freeWaterCalcName: "Free water deficit",
    freeWaterCalcDesc: "คำนวณ water deficit ใน hypernatremia และสร้างคำสั่งให้สารน้ำพร้อมคัดลอก",
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
    orderReadyCopy: "คำสั่งยาพร้อมใช้ - คลิกเพื่อคัดลอก",
    orderLineReady: "คำสั่งยาพร้อมใช้ - คลิกแต่ละบรรทัดเพื่อคัดลอก",
    orderCopied: "คัดลอกคำสั่งยาแล้ว",
    orderLineCopied: "คัดลอกแล้ว",
    orderCopyFailed: "คัดลอกไม่สำเร็จ กรุณาเลือกและคัดลอกเอง",
    oneDayOrder: "คำสั่งยา 1 วัน",
    continuedOrder: "คำสั่งยาต่อเนื่อง",
    hr: "ชม.",
    follow48: "ติดตามระดับ vancomycin ที่ 48 ชั่วโมงหลังให้ loading dose",
    follow3: "ติดตามระดับ vancomycin ก่อนเข็มที่ 3 30 นาที",
    follow4: "Vancomycin level 30 นาทีก่อน dose 4",
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
    doseSame: "ข้อเสนอแนะขนาดยา (ความถี่เดิม q{interval}h):",
    doseAlt: "ทางเลือก (q{interval}h):",
    vancoAdjustOrderReady: "คำสั่งยาพร้อมใช้ - คลิกแต่ละบรรทัดเพื่อคัดลอก",
    vancoAdjustCopied: "คัดลอกคำสั่งยาบรรทัดนี้แล้ว",
    vancoAdjustCopyFailed: "คัดลอกไม่สำเร็จ กรุณาเลือกและคัดลอกเอง",
    vancoHoldLine: "งด vancomycin dose ถัดไป",
    vancoHoldFollow: "ติดตามระดับ vancomycin และประเมินซ้ำก่อนให้ยาครั้งถัดไป",
    aucMic: "ค่า AUC/MIC:",
    target400600: "(เป้าหมาย 400-600)",
    pkApprox: "การคำนวณนี้ใช้การประมาณแบบสัดส่วน PK; หากมี protocol/AUC software ของหน่วยงานให้ใช้อ้างอิงร่วม",
    infusionHeading: "แปลง mcg/kg/min เป็น mL/hr",
    infusionWeightLabel: "น้ำหนักตัว (กก.)",
    infusionDoseLabel: "Dose (mcg/kg/min)",
    infusionDrugLabel: "ปริมาณยา (mg)",
    infusionVolumeLabel: "ปริมาตรรวม (mL)",
    infusionRateMlHrLabel: "อัตราปั๊ม (mL/hr)",
    infusionNeed: "กรอกน้ำหนัก ปริมาตรรวม ปริมาณยาในถุง และกรอก mL/hr หรือ mcg/kg/min อย่างใดอย่างหนึ่ง",
    infusionBaseNeed: "กรอกน้ำหนัก ปริมาตรรวม และปริมาณยาในถุง",
    infusionDirectionNeed: "จากนั้นกรอก mL/hr หรืออัตรายาอย่างใดอย่างหนึ่ง",
    infusionMlHrResult: "mL/hr ที่คำนวณได้:",
    infusionDoseResult: "อัตรายาที่คำนวณได้:",
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
    warfarinRxTitle: "คำสั่งยาพร้อมใช้ - คลิกแต่ละบรรทัดเพื่อคัดลอก",
    warfarinCopied: "คัดลอกคำสั่งยาบรรทัดนี้แล้ว",
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
    heparinHeading: "Heparin bolus + drip",
    heparinWeightLabel: "น้ำหนักตัว (กก.)",
    heparinIndicationLabel: "Indication / protocol",
    heparinOtherLabel: "Other protocol",
    heparinQuickAcute: "Acute thrombosis",
    heparinQuickAcs: "ACS / STEMI",
    heparinQuickOther: "Others",
    heparinBagUnitsLabel: "จำนวน units ในถุง",
    heparinBagVolumeLabel: "ปริมาตรถุง (mL)",
    heparinProtocolAcuteThrombosis: "Acute thrombosis: DVT / PE",
    heparinProtocolAfBridge: "AF / valve replacement / peri-procedural bridge",
    heparinProtocolAcs: "ACS / STEMI fibrinolysis (มี cap)",
    heparinProtocolMechanicalSupport: "Mechanical circulatory support",
    heparinProtocolStroke: "Acute ischemic stroke protocol",
    heparinProtocolUltraLow: "Ultra-low intensity",
    heparinNeed: "กรอกน้ำหนัก จำนวน units ในถุง และปริมาตรถุง",
    heparinBadBag: "ความเข้มข้นในถุงต้องมากกว่า 0",
    heparinOrderReady: "พร้อมวาง - คลิกในกล่องเพื่อคัดลอกทั้งหมด",
    heparinPrepLine: "Heparin {bagUnits}u + NSS {bagVolume}ml IV",
    heparinBolusLine: "Heparin {dose} u IV bolus then",
    heparinNoBolusLine: "No heparin IV bolus then",
    heparinInfusionLine: "Heparin IV drip rate {mlHr} ml/hr ({unitsHr} u/hr)",
    heparinMonitorLine: "aPTT ratio q6hr (keep 1.5-2.5)",
    heparinBolusResult: "Bolus:",
    heparinInfusionResult: "Initial infusion:",
    heparinPumpRateResult: "อัตราปั๊ม:",
    heparinConcentrationResult: "ความเข้มข้น:",
    heparinTargetResult: "เป้าหมายการติดตาม:",
    heparinCapApplied: "ใช้ cap",
    heparinNoBolus: "ไม่มี",
    heparinSourceLabel: "อ้างอิง:",
    heparinSourceUw: "ตารางเริ่ม UFH ในผู้ใหญ่ของ UW Medicine",
    heparinSourceAcs: "ACS ใช้ขนาด UFH แบบ capped ตามตาราง ACC/AHA UA/NSTEMI และ Merck Manual Professional สรุปขนาด ACS/STEMI ใกล้เคียงกัน",
    heparinCautionAcuteThrombosis: "Protocol สำหรับ VTE/acute thrombosis มักใช้ bolus 80 units/kg และ infusion 18 units/kg/hr; maximum infusion rate แตกต่างตามแต่ละโรงพยาบาล",
    heparinCautionAcs: "ACS/STEMI UFH มี cap เพื่อลดความเสี่ยงการให้ยาเริ่มต้นเกิน ควรตรวจแผน fibrinolytic/PCI และ antiplatelet ร่วมด้วย",
    heparinCautionStroke: "UFH ไม่ใช่การรักษาประจำสำหรับ acute ischemic stroke ส่วนใหญ่ ใช้เฉพาะเมื่อมีข้อบ่งชี้ตาม stroke/neurology protocol",
    heparinCautionLocal: "Intensity, bolus, monitoring assay และ cap ของ UFH แตกต่างตามหน่วยงาน ต้องประเมิน bleeding risk, platelet/HIT history, procedure และ policy โรงพยาบาล",
    heparinCopied: "คัดลอกคำสั่ง heparin แล้ว",
    heparinAllCopied: "คัดลอกคำสั่ง heparin แล้ว",
    heparinCopyFailed: "Browser ไม่อนุญาตให้ copy เลือกข้อความให้แล้ว - กด Cmd+C",
    renalHeading: "GFR / CrCl calculator",
    renalModeLabel: "วิธีคำนวณ",
    renalModeGfr: "GFR",
    renalModeCrcl: "CrCl",
    renalAgeLabel: "อายุ (ปี)",
    renalScrLabel: "Serum creatinine, SCr (mg/dL)",
    renalWeightLabel: "น้ำหนักตัว (กก.)",
    renalSexLabel: "เพศ",
    renalSexMale: "ชาย",
    renalSexFemale: "หญิง",
    renalNeedGfr: "กรอกอายุ SCr และเพศ เพื่อคำนวณ GFR",
    renalNeedCrcl: "กรอกอายุ SCr น้ำหนัก และเพศ เพื่อคำนวณ CrCl",
    renalGfrResult: "eGFR:",
    renalCrclResult: "CrCl:",
    renalGfrFormula: "GFR ใช้สมการ 2021 CKD-EPI creatinine โดยไม่มี race coefficient",
    renalCrclFormula: "CrCl ใช้ Cockcroft-Gault = ((140 - age) x weight) / (72 x SCr), และคูณ 0.85 ในผู้หญิง",
    renalCaution: "ค่าประมาณจาก creatinine อาจคลาดเคลื่อนเมื่อ renal function ไม่คงที่ มวลกล้ามเนื้อผิดปกติมาก ตั้งครรภ์ amputee หรือ SCr ยังไม่ steady state",
    osmoHeading: "คำนวณ serum osmolality",
    osmoNaLabel: "Sodium, Na (mEq/L)",
    osmoGlucoseLabel: "Glucose (mg/dL)",
    osmoBunLabel: "BUN (mg/dL)",
    osmoMeasuredLabel: "Measured serum osmolality (mOsm/kg)",
    osmoNeed: "กรอก Na และ glucose เพื่อคำนวณ effective osmolality",
    osmoAddBun: "กรอก BUN เพิ่มเพื่อคำนวณ serum osmolality",
    osmoAddMeasured: "กรอก measured serum osmolality เพิ่มเพื่อคำนวณ osmolal gap",
    osmoAddBunForGap: "กรอก BUN เพิ่มเพื่อคำนวณ osmolal gap จาก measured serum osmolality",
    osmoEffectiveResult: "Effective osmolality:",
    osmoResult: "Calculated serum osmolality:",
    osmoGapResult: "Osmolal gap:",
    osmoGapNormal: "Osmolal gap ไม่สูงตาม cutoff ทั่วไป >10",
    osmoGapHigh: "Osmolal gap สูง ควรพิจารณา unmeasured osmoles/toxic alcohols หากเข้ากับอาการทางคลินิก",
    osmoEffectiveFormula: "สูตร effective osmolality: 2 x Na + glucose/18",
    osmoSerumFormula: "สูตร calculated serum osmolality: 2 x Na + glucose/18 + BUN/2.8",
    osmoGapFormula: "สูตร osmolal gap: measured serum osmolality - calculated serum osmolality",
    calciumHeading: "Corrected calcium",
    calciumMeasuredLabel: "Total calcium ที่วัดได้ (mg/dL)",
    calciumAlbuminLabel: "Serum albumin (g/dL)",
    calciumNeed: "กรอกค่า calcium และ albumin",
    calciumResult: "Corrected calcium:",
    calciumLow: "Corrected calcium ต่ำ",
    calciumNormal: "Corrected calcium อยู่ในช่วงอ้างอิงทั่วไป",
    calciumHigh: "Corrected calcium สูง",
    calciumFormula: "สูตร: corrected Ca = measured Ca + 0.8 x (4 - albumin). ช่วงอ้างอิงทั่วไปที่ใช้แสดง: 8.5-10.5 mg/dL",
    fibrosisHeading: "FIB-4 / APRI",
    fibrosisAgeLabel: "อายุ (ปี)",
    fibrosisAstLabel: "AST (U/L)",
    fibrosisAltLabel: "ALT (U/L)",
    fibrosisPlateletsLabel: "Platelets (10^9/L)",
    fibrosisAstUlnLabel: "AST upper limit normal (U/L)",
    fibrosisNeed: "กรอกอายุ AST, ALT, platelets และ AST ULN",
    fibrosisFib4Result: "FIB-4:",
    fibrosisApriResult: "APRI:",
    fibrosisFib4Interpretation: "แปลผล FIB-4:",
    fibrosisApriInterpretation: "แปลผล APRI:",
    fibrosisFib4Low: "โอกาส advanced fibrosis ต่ำตาม cutoff เดิมจาก HCV (<1.45)",
    fibrosisFib4Indeterminate: "อยู่ในช่วง indeterminate ตาม cutoff เดิม (1.45-3.25) ควรดูบริบทและพิจารณา elastography หากจำเป็น",
    fibrosisFib4High: "โอกาส advanced fibrosis สูงตาม cutoff เดิมจาก HCV (>3.25)",
    fibrosisFib4MasldNote: "กรณี MASLD/AASLD ใช้ threshold ต่างกัน: <1.3 เสี่ยงต่ำ, >2.67 เสี่ยงสูงกว่า; อายุ >=65 มักใช้ <2.0 เป็น lower-risk threshold",
    fibrosisApriLow: "APRI ต่ำ (<0.5); ช่วย rule out cirrhosis ได้ดีกว่า rule out significant disease ทั้งหมด",
    fibrosisApriIndeterminate: "APRI อยู่ช่วงกลาง (0.5-1.5); แปลผลชี้ขาดได้น้อย",
    fibrosisApriHigh: "APRI สูง (>1.5); โอกาส cirrhosis/significant disease สูงขึ้น",
    fibrosisApriCirrhosis: "APRI >=2.0 เป็น cutoff ที่จำเพาะขึ้นสำหรับ cirrhosis ในข้อมูล HCV",
    fibrosisFib4Formula: "FIB-4 = age x AST / (platelets x sqrt(ALT)). Platelets ใช้หน่วย 10^9/L",
    fibrosisApriFormula: "APRI = ((AST / AST ULN) / platelets) x 100. หากทราบ AST ULN ของ lab ให้ใช้ค่านั้น; 40 U/L ใช้บ่อย",
    fibrosisCaution: "เป็นคะแนนคัดกรองเท่านั้น acute hepatitis, cholestasis, alcohol use, สาเหตุ thrombocytopenia, อายุสุดขั้ว และ population ที่ไม่ใช่ HCV/MASLD อาจทำให้แปลผลคลาดเคลื่อน",
    fibrosisSourceNote: "อ้างอิง: Hepatitis C Online FIB-4/APRI calculators และ AASLD MASLD noninvasive assessment guidance",
    freeWaterHeading: "Free water deficit",
    freeWaterWeightLabel: "น้ำหนักตัว (กก.)",
    freeWaterNaLabel: "Na ปัจจุบัน (mEq/L)",
    freeWaterTargetLabel: "Na เป้าหมาย (mEq/L)",
    freeWaterDurationLabel: "ระยะเวลาปรับแก้ (ชม.)",
    freeWaterTbwLabel: "TBW factor",
    freeWaterRouteLabel: "วิธีให้ free water",
    freeWaterTbwAdultMale: "ผู้ใหญ่ชาย 0.6",
    freeWaterTbwAdultFemale: "ผู้ใหญ่หญิง / ผู้สูงอายุชาย 0.5",
    freeWaterTbwElderlyFemale: "ผู้สูงอายุหญิง 0.45",
    freeWaterTbwLowLeanMass: "มวลกล้ามเนื้อน้อย 0.4",
    freeWaterRouteD5w: "D5W IV",
    freeWaterRouteEnteral: "Enteral free water",
    freeWaterNeed: "กรอกน้ำหนัก Na ปัจจุบัน Na เป้าหมาย และระยะเวลาปรับแก้",
    freeWaterTargetError: "Na เป้าหมายต้องต่ำกว่า Na ปัจจุบันสำหรับการคำนวณ free-water deficit",
    freeWaterResult: "Free water deficit โดยประมาณ:",
    freeWaterTbwUsed: "TBW โดยประมาณ:",
    freeWaterRate: "อัตราให้สารน้ำ:",
    freeWaterRateDisplay: "{rate} mL/hr นาน {duration} ชม.",
    freeWaterCorrectionRate: "อัตราการลด Na ที่วางแผน:",
    freeWaterCorrectionRateDisplay: "{perDay} mEq/L ต่อ 24 ชม. ({perHour} mEq/L/ชม.)",
    freeWaterFastWarning: "คำเตือน: แผนนี้ลด Na เร็วกว่าขีดจำกัดทั่วไปสำหรับ chronic hypernatremia",
    freeWaterOrderReady: "คำสั่งพร้อมใช้ - คลิกแต่ละบรรทัดเพื่อคัดลอก",
    freeWaterD5wOrder: "D5W IV drip {rate} mL/hr นาน {duration} ชม. (free water deficit {deficit} L; target Na {target})",
    freeWaterEnteralOrder: "Enteral free water {perDose} mL q{interval}h นาน {duration} ชม. (free water deficit {deficit} L; target Na {target})",
    freeWaterMonitorOrder: "ติดตาม serum Na q4-6h ระหว่างแก้ไข และปรับอัตรา free water ตามผล",
    freeWaterCaution:
      "สูตรนี้ประเมินเฉพาะ water deficit ต้องรวม ongoing loss และแก้ hypovolemia ก่อนหากมี ระวังการลด Na เร็วเกินไปใน chronic hypernatremia",
    freeWaterFormula: "สูตร: free water deficit = TBW x (Na ปัจจุบัน / Na เป้าหมาย - 1). TBW = น้ำหนัก x TBW factor ที่เลือก",
    nutritionHeading: "เป้าหมายโภชนบำบัด",
    nutritionWeightLabel: "น้ำหนักตัว (กก.)",
    nutritionHeightLabel: "ส่วนสูง (ซม.)",
    nutritionSexLabel: "เพศสำหรับ IBW",
    nutritionSexMalePill: "ชาย",
    nutritionSexFemalePill: "หญิง",
    nutritionRouteLabel: "ชนิดคำสั่งโภชนบำบัด",
    nutritionRouteDiet: "Diet",
    nutritionRouteOns: "ONS",
    nutritionRouteEnteral: "Enteral",
    nutritionRoutePn: "PN",
    nutritionIntakeLabel: "ประเมิน intake ปัจจุบัน",
    nutritionCkdLabel: "CKD",
    nutritionAkiLabel: "AKI",
    nutritionCriticalLabel: "Critical illness",
    nutritionRefeedingLabel: "เสี่ยง refeeding",
    nutritionPnRouteLabel: "เส้นทาง PN",
    nutritionPnHoursLabel: "ชั่วโมงให้ PN",
    nutritionPnFluidLabel: "จำกัดปริมาตร PN (mL/day, optional)",
    nutritionPnAdditivesLabel: "ใส่ Soluvit/Vitalipid/Addamel",
    nutritionNeed: "กรอกน้ำหนักและส่วนสูง",
    nutritionBmi: "BMI:",
    nutritionIbw: "IBW (Devine):",
    nutritionBmi25Weight: "น้ำหนักที่ BMI 25:",
    nutritionAdjustedBw: "Adjusted BW สำหรับ nutrition:",
    nutritionWeightBasis: "Weight basis:",
    nutritionBasisActual: "actual BW",
    nutritionBasisIbw: "IBW",
    nutritionBasisAdjusted: "adjusted BW",
    nutritionEnergy: "พลังงานรวม:",
    nutritionProtein: "โปรตีนรวม:",
    nutritionVolume: "ปริมาตร/สารน้ำโดยประมาณ:",
    nutritionStandardWeightRule: "Weight basis: ใช้ actual BW สำหรับผู้ใหญ่ที่ไม่ obese",
    nutritionNoncriticalObesityRule:
      "Weight basis: obesity/non-ICU ใช้ adjusted BW = น้ำหนักที่ BMI25 + 0.33 x (actual BW - น้ำหนักที่ BMI25) ตาม ESPEN hospital nutrition guidance",
    nutritionCriticalObesityRule:
      "Weight basis: critical obesity ใช้เป้าหมาย hypocaloric high-protein แบบ ASPEN; BMI 30-50 ใช้ 11-14 kcal/kg actual BW, BMI >50 ใช้ 22-25 kcal/kg IBW, protein ใช้ 2.0-2.5 g/kg IBW",
    nutritionUnderweightRule:
      "Weight basis: underweight ใช้ actual BW. เป้าหมาย 30 kcal/kg actual BW และ protein อย่างน้อย 1.2 g/kg actual BW โดยค่อย ๆ เพิ่มเพราะเสี่ยง refeeding มากขึ้น",
    nutritionUnderweightCriticalRule:
      "Weight basis: underweight ใน critical illness ใช้ actual BW พร้อมเริ่ม feeding อย่างระวังและ monitor refeeding",
    nutritionSevereUnderweightRule:
      "BMI <16 เป็น high refeeding risk ตาม NICE criteria จึงเริ่ม energy ที่ 10 kcal/kg actual BW ในแอปนี้; extreme risk เช่น BMI <14 หรือแทบไม่ได้กิน >15 วัน อาจต้องเริ่ม 5 kcal/kg/day",
    nutritionRefeedingWeightRule: "เสี่ยง refeeding: เริ่ม energy 10 kcal/kg โดยใช้ weight basis ที่เลือก แล้ว advance หลัง electrolyte stable",
    nutritionFormula: "ตัวอย่างสูตร enteral:",
    nutritionOrderReady: "คำสั่งอาหารพร้อมใช้ - คลิกแต่ละบรรทัดเพื่อคัดลอก",
    nutritionDietOrderReady: "คำสั่ง diet พร้อมใช้ - คลิกแต่ละบรรทัดเพื่อคัดลอก",
    nutritionOnsOrderReady: "คำสั่ง ONS พร้อมใช้ - คลิกแต่ละบรรทัดเพื่อคัดลอก",
    nutritionProgressNoteReady: "Nutrition note พร้อมใช้ - คลิกกล่องเพื่อคัดลอกทั้งหมด",
    nutritionPnOrderReady: "คำสั่ง PN พร้อมใช้ - คลิกกล่องเพื่อคัดลอกทั้งหมด",
    nutritionPnMonitorReady: "คำสั่งติดตาม PN พร้อมใช้ - คลิกกล่องเพื่อคัดลอกทั้งหมด",
    nutritionPnRecommendation: "ถุง PN premixed ที่เหมาะที่สุด:",
    nutritionPnAlternatives: "ถุง PN อื่นที่มี:",
    nutritionPnNoMatch: "ไม่มีสูตร PN ที่ตรงกับ route ที่เลือก",
    nutritionPnCaution: "ยืนยัน central/peripheral access, การแก้ electrolyte, compatibility ของ micronutrient, glycemic control, fluid status และการเตรียมแบบ aseptic โดย pharmacy ก่อนสั่งใช้",
    nutritionReferenceTitle: "แสดงตารางอ้างอิง",
    nutritionReferenceVerify: "ตรวจสอบ calories ของ diet size กับตารางของโรงพยาบาล/นักกำหนดอาหารก่อนใช้จริง",
    nutritionHospitalDietReference: "ตาราง calories อาหารโรงพยาบาล",
    nutritionPnReference: "ตารางส่วนประกอบ parenteral nutrition",
    nutritionSupplementReference: "ตารางอาหารเสริม oral/enteral",
    nutritionBdReference: "ตาราง protein ของสูตร BD",
    nutritionSupplementRecommendation: "รายการอ้างอิงที่ตรงกับเป้าพลังงาน:",
    nutritionNoSupplementMatch: "ไม่มีแถว oral supplement ที่ครอบคลุมเป้าพลังงานนี้ ให้ใช้แผน BD ที่คำนวณหรือยืนยันกับนักกำหนดอาหาร",
    nutritionDeficitSummary: "Nutrition deficit:",
    nutritionCaution: "ใช้ดุลยพินิจร่วมกับข้อจำกัดสารน้ำ dialysis electrolyte glycemic control และการเฝ้าระวัง refeeding",
    antibioticHeading: "ปรับขนาด antibiotic ตามไต",
    antibioticDrugLabel: "Antibiotic",
    antibioticDrugPlaceholder: "พิมพ์ชื่อ antibiotic...",
    antibioticPickerLabel: "เลือก antibiotic",
    antibioticNoDrugResults: "ไม่พบ antibiotic ที่ตรงกัน",
    antibioticIndicationLabel: "Indication / regimen",
    antibioticRenalModeLabel: "Renal mode",
    antibioticCrclMethodLabel: "วิธีระบุค่า CrCl",
    antibioticCrclMethodAuto: "คำนวณ Cockcroft-Gault",
    antibioticCrclMethodManual: "กรอก CrCl เอง",
    antibioticAgeLabel: "อายุ (ปี)",
    antibioticWeightLabel: "น้ำหนักตัว (กก.)",
    antibioticScrLabel: "SCr (mg/dL)",
    antibioticSexLabel: "เพศ",
    antibioticSexMale: "ชาย",
    antibioticSexFemale: "หญิง",
    antibioticCrclLabel: "CrCl (mL/min)",
    antibioticNeed: "เลือกยา/regimen และกรอกข้อมูล CrCl",
    antibioticNeedAutoCrcl: "กรอกอายุ น้ำหนัก SCr และเพศ เพื่อคำนวณ CrCl อัตโนมัติ",
    antibioticOrderReady: "คำสั่งยาพร้อมใช้ - คลิกแต่ละบรรทัดเพื่อคัดลอก",
    antibioticCopied: "คัดลอกคำสั่งยาบรรทัดนี้แล้ว",
    antibioticCopyFailed: "คัดลอกไม่สำเร็จ กรุณาเลือกและคัดลอกคำสั่งยาเอง",
    antibioticCrclUsed: "CrCl ที่ใช้:",
    antibioticEstimatedCrcl: "CrCl ที่คำนวณได้ (Cockcroft-Gault):",
    antibioticManualCrclUsed: "ใช้ค่า CrCl ที่กรอก:",
    antibioticRenalModeCrcl: "Non-HD: ใช้ CrCl",
    antibioticRenalModeHd: "Intermittent hemodialysis",
    antibioticHdMode: "ใช้ขนาดยาสำหรับ intermittent HD",
    antibioticSourceNote: "อิงจากตารางปรับขนาด antibiotic ตาม renal function ของโรงพยาบาล version 2024 ที่ผู้ใช้ให้มา ต้องตรวจทาน indication ความรุนแรง allergy culture dialysis/CRRT และปรึกษา ID/เภสัชกรเมื่อจำเป็น"
  }
};

let currentLang = localStorage.getItem("vanco-lang") === "th" ? "th" : "en";
let currentWorkflow = localStorage.getItem("vanco-workflow-mode") || "";
let currentCalculator = localStorage.getItem("clinical-calculator") || "";
let currentHeparinProtocol = "acute-thrombosis";
let activeInput = null;
let activeActionButton = null;
let lastInfusionEdited = "";
let viewportAutoScrollSuppressedUntil = 0;

const staticMap = [
  ["t-eyebrow", "eyebrow"],
  ["t-hero-title", "heroTitle"],
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
  ["t-infusion-rate-mlhr-label", "infusionRateMlHrLabel"],
  ["t-infusion-drug-label", "infusionDrugLabel"],
  ["t-infusion-volume-label", "infusionVolumeLabel"],
  ["t-warfarin-heading", "warfarinHeading"],
  ["t-warfarin-inr-label", "warfarinInrLabel"],
  ["t-warfarin-weekly-label", "warfarinWeeklyLabel"],
  ["t-warfarin-target-low-label", "warfarinTargetLowLabel"],
  ["t-warfarin-target-high-label", "warfarinTargetHighLabel"],
  ["t-warfarin-tabs-label", "warfarinTabsLabel"],
  ["t-heparin-heading", "heparinHeading"],
  ["t-heparin-weight-label", "heparinWeightLabel"],
  ["t-heparin-indication-label", "heparinIndicationLabel"],
  ["t-heparin-other-label", "heparinOtherLabel"],
  ["t-heparin-quick-acute", "heparinQuickAcute"],
  ["t-heparin-quick-acs", "heparinQuickAcs"],
  ["t-heparin-quick-other", "heparinQuickOther"],
  ["t-heparin-bag-units-label", "heparinBagUnitsLabel"],
  ["t-heparin-bag-volume-label", "heparinBagVolumeLabel"],
  ["t-renal-heading", "renalHeading"],
  ["t-renal-mode-label", "renalModeLabel"],
  ["t-renal-mode-gfr", "renalModeGfr"],
  ["t-renal-mode-crcl", "renalModeCrcl"],
  ["t-renal-age-label", "renalAgeLabel"],
  ["t-renal-scr-label", "renalScrLabel"],
  ["t-renal-weight-label", "renalWeightLabel"],
  ["t-renal-sex-label", "renalSexLabel"],
  ["t-renal-sex-male", "renalSexMale"],
  ["t-renal-sex-female", "renalSexFemale"],
  ["t-osmo-heading", "osmoHeading"],
  ["t-osmo-na-label", "osmoNaLabel"],
  ["t-osmo-glucose-label", "osmoGlucoseLabel"],
  ["t-osmo-bun-label", "osmoBunLabel"],
  ["t-osmo-measured-label", "osmoMeasuredLabel"],
  ["t-calcium-heading", "calciumHeading"],
  ["t-calcium-measured-label", "calciumMeasuredLabel"],
  ["t-calcium-albumin-label", "calciumAlbuminLabel"],
  ["t-fibrosis-heading", "fibrosisHeading"],
  ["t-fibrosis-age-label", "fibrosisAgeLabel"],
  ["t-fibrosis-ast-label", "fibrosisAstLabel"],
  ["t-fibrosis-alt-label", "fibrosisAltLabel"],
  ["t-fibrosis-platelets-label", "fibrosisPlateletsLabel"],
  ["t-fibrosis-ast-uln-label", "fibrosisAstUlnLabel"],
  ["t-free-water-heading", "freeWaterHeading"],
  ["t-free-water-weight-label", "freeWaterWeightLabel"],
  ["t-free-water-na-label", "freeWaterNaLabel"],
  ["t-free-water-target-label", "freeWaterTargetLabel"],
  ["t-free-water-duration-label", "freeWaterDurationLabel"],
  ["t-free-water-tbw-label", "freeWaterTbwLabel"],
  ["t-free-water-route-label", "freeWaterRouteLabel"],
  ["t-nutrition-heading", "nutritionHeading"],
  ["t-nutrition-weight-label", "nutritionWeightLabel"],
  ["t-nutrition-height-label", "nutritionHeightLabel"],
  ["t-nutrition-sex-label", "nutritionSexLabel"],
  ["t-nutrition-route-label", "nutritionRouteLabel"],
  ["t-nutrition-route-diet", "nutritionRouteDiet"],
  ["t-nutrition-route-ons", "nutritionRouteOns"],
  ["t-nutrition-route-enteral", "nutritionRouteEnteral"],
  ["t-nutrition-route-pn", "nutritionRoutePn"],
  ["t-nutrition-intake-label", "nutritionIntakeLabel"],
  ["t-nutrition-ckd-label", "nutritionCkdLabel"],
  ["t-nutrition-aki-label", "nutritionAkiLabel"],
  ["t-nutrition-critical-label", "nutritionCriticalLabel"],
  ["t-nutrition-refeeding-label", "nutritionRefeedingLabel"],
  ["t-nutrition-pn-route-label", "nutritionPnRouteLabel"],
  ["t-nutrition-pn-hours-label", "nutritionPnHoursLabel"],
  ["t-nutrition-pn-fluid-label", "nutritionPnFluidLabel"],
  ["t-nutrition-pn-additives-label", "nutritionPnAdditivesLabel"],
  ["t-antibiotic-heading", "antibioticHeading"],
  ["t-antibiotic-drug-label", "antibioticDrugLabel"],
  ["t-antibiotic-picker-label", "antibioticPickerLabel"],
  ["t-antibiotic-indication-label", "antibioticIndicationLabel"],
  ["t-antibiotic-renal-mode-label", "antibioticRenalModeLabel"],
  ["t-antibiotic-crcl-method-label", "antibioticCrclMethodLabel"],
  ["t-antibiotic-age-label", "antibioticAgeLabel"],
  ["t-antibiotic-weight-label", "antibioticWeightLabel"],
  ["t-antibiotic-scr-label", "antibioticScrLabel"],
  ["t-antibiotic-sex-label", "antibioticSexLabel"],
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
      id: "heparin",
      workflow: "heparin",
      name: tr("heparinCalcName"),
      description: tr("heparinCalcDesc"),
      keywords: "heparin unfractionated ufh bolus drip infusion anti xa aptt dvt pe vte acs stemi nstemi af bridge stroke anticoagulation"
    },
    {
      id: "renal",
      workflow: "renal",
      name: tr("renalCalcName"),
      description: tr("renalCalcDesc"),
      keywords: "gfr egfr crcl creatinine clearance renal kidney ckd epi cockcroft gault scr"
    },
    {
      id: "osmo",
      workflow: "osmo",
      name: tr("osmoCalcName"),
      description: tr("osmoCalcDesc"),
      keywords: "osmo osmolality serum sodium glucose bun osm"
    },
    {
      id: "calcium",
      workflow: "calcium",
      name: tr("calciumCalcName"),
      description: tr("calciumCalcDesc"),
      keywords: "calcium corrected calcium albumin ca hypocalcemia hypercalcemia"
    },
    {
      id: "fibrosis",
      workflow: "fibrosis",
      name: tr("fibrosisCalcName"),
      description: tr("fibrosisCalcDesc"),
      keywords:
        "fib4 fib-4 apri fibrosis cirrhosis liver hepatitis hcv nafld masld mash ast alt platelet platelets thrombocytopenia"
    },
    {
      id: "freeWater",
      workflow: "freeWater",
      name: tr("freeWaterCalcName"),
      description: tr("freeWaterCalcDesc"),
      keywords: "free water deficit hypernatremia sodium na d5w enteral water dehydration"
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

function calculatorSearchScore(option, query) {
  const name = option.name.toLowerCase();
  const description = option.description.toLowerCase();
  const keywords = option.keywords.toLowerCase();
  const nameWords = name.split(/\s+/);
  const keywordWords = keywords.split(/\s+/);
  const descriptionWords = description.split(/\s+/);

  if (name.startsWith(query)) return 100;
  if (nameWords.some((word) => word.startsWith(query))) return 90;
  if (name.includes(query)) return 80;
  if (keywordWords.some((word) => word === query)) return 75;
  if (keywordWords.some((word) => word.startsWith(query))) return 70;
  if (keywords.includes(query)) return 60;
  if (descriptionWords.some((word) => word.startsWith(query))) return 20;
  if (description.includes(query)) return 10;
  return 0;
}

function isCompactSearchViewport() {
  return window.matchMedia("(max-width: 640px)").matches;
}

function getViewportHeight() {
  return window.visualViewport?.height || window.innerHeight;
}

function suppressViewportAutoScroll(duration = VIEWPORT_SETTLE_MS) {
  viewportAutoScrollSuppressedUntil = Date.now() + duration;
}

function isViewportAutoScrollSuppressed() {
  return Date.now() < viewportAutoScrollSuppressedUntil;
}

function blurFocusedControl() {
  const focused = document.activeElement;
  if (!(focused instanceof HTMLElement)) return;
  if (!focused.matches("input, textarea, select, button")) return;
  focused.blur();
}

function syncCalculatorSearchViewportState() {
  const searchOpen =
    isCompactSearchViewport() &&
    document.activeElement === calculatorSearch &&
    Boolean(calculatorSearch.value.trim());
  document.body.classList.toggle("calculator-search-open", searchOpen);
}

function ensureCalculatorResultsVisible(behavior = "smooth") {
  if (!isCompactSearchViewport()) return;
  if (isViewportAutoScrollSuppressed()) return;
  if (document.activeElement !== calculatorSearch) return;
  if (!calculatorSearch.value.trim()) return;

  const firstResult = calculatorResults.querySelector(".calculator-card, .empty-results");
  if (!firstResult) return;

  const viewportHeight = getViewportHeight();
  const inputRect = calculatorSearch.getBoundingClientRect();
  const resultRect = firstResult.getBoundingClientRect();
  const keyboardCushion = Math.max(72, Math.min(120, viewportHeight * 0.22));
  const bottomLimit = viewportHeight - keyboardCushion;

  if (inputRect.top >= 12 && resultRect.bottom <= bottomLimit) return;

  const panelRect = workflowChooser.getBoundingClientRect();
  const nextScrollTop = Math.max(0, window.scrollY + panelRect.top - 12);
  window.scrollTo({ top: nextScrollTop, behavior });
}

function scheduleCalculatorResultsVisible(behavior = "smooth") {
  if (!isCompactSearchViewport()) return;
  if (isViewportAutoScrollSuppressed()) {
    document.body.classList.remove("calculator-search-open");
    return;
  }
  syncCalculatorSearchViewportState();
  requestAnimationFrame(() => ensureCalculatorResultsVisible(behavior));
  window.setTimeout(() => ensureCalculatorResultsVisible("auto"), 140);
  window.setTimeout(() => ensureCalculatorResultsVisible("auto"), 340);
}

function renderCalculatorResults() {
  const query = calculatorSearch.value.trim().toLowerCase();
  calculatorResults.classList.toggle("has-query", Boolean(query));
  syncCalculatorSearchViewportState();
  if (!query) {
    calculatorResults.innerHTML = "";
    return;
  }

  const options = getCalculatorOptions();
  const filtered = options
    .map((option, index) => ({
      option,
      index,
      score: calculatorSearchScore(option, query)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((item) => item.option);

  if (!filtered.length) {
    calculatorResults.innerHTML = `<p class="empty-results">${tr("noCalculatorResults")}</p>`;
    scheduleCalculatorResultsVisible();
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
          </span>
        </button>
      `
    )
    .join("");
  scheduleCalculatorResultsVisible();
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
  if (option?.workflow) {
    setWorkflow(option.workflow, { persist, focus });
    if (option.workflow === "nutrition") calculateNutrition();
  }
}

function applyStaticTranslation() {
  document.documentElement.lang = currentLang;
  document.title = tr("docTitle");
  languageToggle.textContent = tr("langButton");
  calculatorSearch.placeholder = tr("searchPlaceholder");
  populateHeparinIndications();
  syncHeparinIndicationControls();
  antibioticDrugSearch.placeholder = tr("antibioticDrugPlaceholder");
  antibioticRenalModeSelect.options[0].textContent = tr("antibioticRenalModeCrcl");
  antibioticRenalModeSelect.options[1].textContent = tr("antibioticRenalModeHd");
  antibioticCrclMethodSelect.options[0].textContent = tr("antibioticCrclMethodAuto");
  antibioticCrclMethodSelect.options[1].textContent = tr("antibioticCrclMethodManual");
  syncAntibioticSexControl();
  const freeWaterTbwSelect = document.getElementById("free-water-tbw");
  const freeWaterRouteSelect = document.getElementById("free-water-route");
  if (freeWaterTbwSelect) {
    freeWaterTbwSelect.options[0].textContent = tr("freeWaterTbwAdultMale");
    freeWaterTbwSelect.options[1].textContent = tr("freeWaterTbwAdultFemale");
    freeWaterTbwSelect.options[2].textContent = tr("freeWaterTbwElderlyFemale");
    freeWaterTbwSelect.options[3].textContent = tr("freeWaterTbwLowLeanMass");
  }
  if (freeWaterRouteSelect) {
    freeWaterRouteSelect.options[0].textContent = tr("freeWaterRouteD5w");
    freeWaterRouteSelect.options[1].textContent = tr("freeWaterRouteEnteral");
  }
  numpadPrev.textContent = tr("numpadPrev");
  numpadNext.textContent = tr("numpadNext");
  numpadDone.textContent = tr("numpadDone");

  for (const [id, key] of staticMap) {
    const el = document.getElementById(id);
    if (el) el.textContent = tr(key);
  }
  refreshModeButtons();
  syncRenalControls();
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

  const isNutritionMale = nutritionSexInput.value === "male";
  nutritionSexToggle.dataset.active = isNutritionMale ? "left" : "right";
  nutritionSexLeft.textContent = tr("nutritionSexMalePill");
  nutritionSexRight.textContent = tr("nutritionSexFemalePill");
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

function roundToStep(value, step) {
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

function formatNumberForInput(value, digits) {
  if (!Number.isFinite(value)) return "";
  return Number(value.toFixed(digits)).toString();
}

function formatMlHrInput(value) {
  return formatNumberForInput(value, 1);
}

function formatDoseInput(value) {
  return formatNumberForInput(value, 2);
}

function formatHalfStep(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function calculateCrClCockcroftGault({ age, weight, scr, sex }) {
  let crcl = ((140 - age) * weight) / (72 * scr);
  if (sex === "female") crcl *= 0.85;
  return crcl;
}

function calculateCkdEpi2021Creatinine({ age, scr, sex }) {
  const isFemale = sex === "female";
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const scrRatio = scr / kappa;
  return (
    142 *
    Math.pow(Math.min(scrRatio, 1), alpha) *
    Math.pow(Math.max(scrRatio, 1), -1.2) *
    Math.pow(0.9938, age) *
    (isFemale ? 1.012 : 1)
  );
}

function calculateIdealBodyWeight({ heightCm, sex }) {
  const heightIn = heightCm / 2.54;
  const inchesFromFiveFeet = heightIn - 60;
  const baseWeight = sex === "female" ? 45.5 : 50;
  return Math.max(0, baseWeight + 2.3 * inchesFromFiveFeet);
}

function calculateAdjustedBodyWeight({ actualWeight, idealWeight, factor = 0.4 }) {
  if (actualWeight <= idealWeight) return actualWeight;
  return idealWeight + factor * (actualWeight - idealWeight);
}

function calculateBmiTargetWeight({ heightCm, targetBmi }) {
  const heightM = heightCm / 100;
  return targetBmi * heightM * heightM;
}

function formatWeightBasis(label, weight) {
  return `${label} ${formatNumberForInput(weight, 1)} kg`;
}

function getNutritionTargetPlan({ weight, height, sex, hasCkd, hasAki, isCritical, riskRefeeding }) {
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const ibw = calculateIdealBodyWeight({ heightCm: height, sex });
  const bmi25Weight = calculateBmiTargetWeight({ heightCm: height, targetBmi: 25 });
  const adjustedBw = calculateAdjustedBodyWeight({ actualWeight: weight, idealWeight: bmi25Weight, factor: 0.33 });
  const isUnderweight = bmi < 18.5;
  const isSeverelyUnderweight = bmi < 16;
  const isObese = bmi >= 30;
  const refeedingStart = riskRefeeding || isSeverelyUnderweight;

  let energyWeight = weight;
  let energyBasis = tr("nutritionBasisActual");
  let proteinWeight = weight;
  let proteinBasis = tr("nutritionBasisActual");
  let fluidWeight = weight;
  let fluidBasis = tr("nutritionBasisActual");
  let kcalPerKg = isCritical ? 25 : 25;
  let proteinPerKg = 1;
  let rule = tr("nutritionStandardWeightRule");

  if (hasCkd && !hasAki && !isCritical) proteinPerKg = 0.8;
  if (hasAki || isCritical) proteinPerKg = 1.3;

  if (isUnderweight) {
    energyWeight = weight;
    energyBasis = tr("nutritionBasisActual");
    proteinWeight = weight;
    proteinBasis = tr("nutritionBasisActual");
    fluidWeight = weight;
    fluidBasis = tr("nutritionBasisActual");
    if (isCritical) {
      rule = tr("nutritionUnderweightCriticalRule");
    } else {
      kcalPerKg = 30;
      if (!(hasCkd && !hasAki)) proteinPerKg = Math.max(proteinPerKg, 1.2);
      rule = tr("nutritionUnderweightRule");
    }
    if (isSeverelyUnderweight) {
      rule = `${tr("nutritionSevereUnderweightRule")} ${rule}`;
    }
  } else if (isObese && isCritical) {
    if (bmi > 50) {
      kcalPerKg = 23.5;
      energyWeight = ibw;
      energyBasis = tr("nutritionBasisIbw");
    } else {
      kcalPerKg = 12.5;
      energyWeight = weight;
      energyBasis = tr("nutritionBasisActual");
    }
    proteinPerKg = bmi >= 40 ? 2.5 : 2;
    proteinWeight = ibw;
    proteinBasis = tr("nutritionBasisIbw");
    fluidWeight = adjustedBw;
    fluidBasis = tr("nutritionBasisAdjusted");
    rule = tr("nutritionCriticalObesityRule");
  } else if (isObese) {
    energyWeight = adjustedBw;
    energyBasis = tr("nutritionBasisAdjusted");
    proteinWeight = adjustedBw;
    proteinBasis = tr("nutritionBasisAdjusted");
    fluidWeight = adjustedBw;
    fluidBasis = tr("nutritionBasisAdjusted");
    rule = tr("nutritionNoncriticalObesityRule");
  }

  if (refeedingStart) {
    kcalPerKg = 10;
    if (!isSeverelyUnderweight) rule = `${rule} ${tr("nutritionRefeedingWeightRule")}`;
  }

  const fluidPerKg = hasCkd || hasAki ? 25 : 30;
  const calories = Math.round(energyWeight * kcalPerKg);
  const protein = Math.round(proteinWeight * proteinPerKg);
  const fluid = Math.round(fluidWeight * fluidPerKg);

  return {
    bmi,
    ibw,
    bmi25Weight,
    adjustedBw,
    calories,
    protein,
    fluid,
    kcalPerKg,
    proteinPerKg,
    fluidPerKg,
    energyWeight,
    proteinWeight,
    fluidWeight,
    energyBasis,
    proteinBasis,
    fluidBasis,
    rule,
    refeedingStart
  };
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

function maintenanceMonitoringText(intervalHours) {
  return intervalHours >= 24 ? tr("follow3") : tr("follow4");
}

function renderOrderLines(lines, { copyable = true } = {}) {
  return lines
    .map((line) => {
      if (!copyable) return `<p class="order-line">- ${line}</p>`;
      return `<button type="button" class="order-line copy-line" data-copy="${encodeURIComponent(line)}">- ${line}</button>`;
    })
    .join("");
}

function cleanCopyLabel(label) {
  return label.replace(/:$/, "").trim();
}

function renderCopyResult(label, value, { unit = "", className = "", copyValue = null, copyFull = null } = {}) {
  const cleanLabel = cleanCopyLabel(label);
  const valueText = `${value}${unit ? ` ${unit}` : ""}`;
  const copiedValueText = copyValue || valueText;
  const fullText = copyFull || `${cleanLabel} = ${copiedValueText}`;
  return `
    <div class="copy-result-row ${className}" role="button" tabindex="0" data-copy="${encodeURIComponent(fullText)}">
      <span class="copy-result-label">${cleanLabel} =</span>
      <button type="button" class="copy-result-value" data-copy-value="${encodeURIComponent(copiedValueText)}">${valueText}</button>
    </div>
  `;
}

function renderOrderReady({ oneDayLines, continuedLines }) {
  const continuedIsCopyable = !continuedLines.includes(tr("noScheduledMaint"));
  return `
    <div class="order-highlight vanco-copy-order">
      <p class="order-title">${tr("orderLineReady")}</p>
      <div class="order-columns">
        <div class="order-column">
          <p class="order-label">${tr("oneDayOrder")}</p>
          <div class="order-text">${renderOrderLines(oneDayLines)}</div>
        </div>
        <div class="order-column">
          <p class="order-label">${tr("continuedOrder")}</p>
          <div class="order-text">${renderOrderLines(continuedLines, { copyable: continuedIsCopyable })}</div>
        </div>
      </div>
    </div>
  `;
}

function getCopyLineFromEvent(event, container) {
  const target = event?.target;
  if (target instanceof HTMLElement) {
    const value = target.closest(".copy-result-value");
    if (value && container.contains(value)) return value;
    const row = target.closest(".copy-result-row");
    if (row && container.contains(row)) return row;
    const line = target.closest(".copy-line");
    if (line && container.contains(line)) return line;
  }
  const activeLine = document.activeElement?.closest?.(".copy-line");
  if (activeLine && container.contains(activeLine)) return activeLine;
  return null;
}

function getCopyBlockFromEvent(event, container) {
  const target = event?.target;
  if (!(target instanceof HTMLElement)) return null;
  const block = target.closest(".order-highlight");
  if (!block || !container.contains(block)) return null;
  if (block.dataset.copy) {
    return { block, text: decodeURIComponent(block.dataset.copy) };
  }
  const lines = Array.from(block.querySelectorAll(".copy-line"))
    .map((line) => decodeURIComponent(line.dataset.copy || ""))
    .filter(Boolean);
  if (!lines.length) return null;
  return { block, text: lines.join("\n") };
}

async function writeClipboardText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall back to selection-based copy below.
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.width = "2px";
  textarea.style.height = "2px";
  textarea.style.padding = "0";
  textarea.style.border = "0";
  textarea.style.clipPath = "inset(50%)";
  document.body.appendChild(textarea);
  textarea.focus({ preventScroll: true });
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  textarea.remove();
  if (copied) return true;

  const copyNode = document.createElement("pre");
  copyNode.textContent = text;
  copyNode.style.position = "fixed";
  copyNode.style.top = "0";
  copyNode.style.left = "0";
  copyNode.style.width = "2px";
  copyNode.style.height = "2px";
  copyNode.style.overflow = "hidden";
  copyNode.style.whiteSpace = "pre";
  copyNode.style.userSelect = "text";
  document.body.appendChild(copyNode);

  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(copyNode);
  selection.removeAllRanges();
  selection.addRange(range);
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  selection.removeAllRanges();
  copyNode.remove();
  if (copied) return true;

  return false;
}

function selectCopyText(target) {
  const exactText =
    target?.dataset?.copyValue ? decodeURIComponent(target.dataset.copyValue) : target?.dataset?.copy ? decodeURIComponent(target.dataset.copy) : "";
  if (exactText) {
    const previous = document.getElementById("copy-fallback-field");
    if (previous) previous.remove();
    const textarea = document.createElement("textarea");
    textarea.id = "copy-fallback-field";
    textarea.value = exactText;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    document.body.appendChild(textarea);
    textarea.focus({ preventScroll: true });
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    return;
  }
  const node = target?.classList?.contains("order-highlight") ? target.querySelector(".order-text") : target;
  if (!node) return;
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
}

async function copyOrderLine(event, container, copiedKey = "orderLineCopied", failedKey = "orderCopyFailed") {
  const copyTarget = getCopyLineFromEvent(event, container);
  const copyBlock = copyTarget ? null : getCopyBlockFromEvent(event, container);
  if (!copyTarget && !copyBlock) return;
  const orderText = copyTarget ? decodeURIComponent(copyTarget.dataset.copy || "") : copyBlock.text;
  const valueText = copyTarget ? decodeURIComponent(copyTarget.dataset.copyValue || "") : "";
  const copyText = valueText || orderText;
  if (!copyText) return;
  const title = (copyTarget || copyBlock.block).closest(".order-highlight")?.querySelector(".order-title");
  const copied = await writeClipboardText(copyText);
  if (copied) {
    if (copyTarget) {
      copyTarget.classList.add("copied-line");
    } else {
      for (const line of copyBlock.block.querySelectorAll(".copy-line")) line.classList.add("copied-line");
    }
    if (title) title.textContent = tr(copiedKey);
  } else {
    selectCopyText(copyTarget || copyBlock.block);
    if (title) title.textContent = tr(failedKey);
  }
}

async function copyVancoOrder(event) {
  copyOrderLine(event, initialResult);
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
  if (isViewportAutoScrollSuppressed()) return;

  const rect = input.getBoundingClientRect();
  const usableHeight = getViewportHeight() - getNumpadHeight();
  const preferredTop = Math.max(14, usableHeight * 0.34);
  const preferredBottom = Math.max(preferredTop + 44, usableHeight * 0.62);
  const scrollThreshold = 3;

  if (rect.bottom - preferredBottom > scrollThreshold) {
    window.scrollBy({ top: Math.round(rect.bottom - preferredBottom), behavior });
    return;
  }
  if (preferredTop - rect.top > scrollThreshold) {
    window.scrollBy({ top: Math.round(rect.top - preferredTop), behavior });
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

function showInitialIncomplete(event, message) {
  if (event?.type === "submit") {
    showInitialResult(message);
  } else {
    initialResult.innerHTML = "";
  }
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
    showInitialIncomplete(event, tr("pleaseComplete"));
    return;
  }

  let crcl;
  let crclLine;
  if (crclMode === "auto") {
    if (!age || !scr) {
      showInitialIncomplete(event, tr("enterAgeScr"));
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
      showInitialIncomplete(event, tr("enterManualCrcl"));
      return;
    }
    crcl = manualCrcl;
    crclLine = tr("manualCrclUsed", { value: crcl.toFixed(1) });
  }
  const crclCopyLabel = crclLine.replace(`${crcl.toFixed(1)} mL/min`, "").replace(/[:\s]+$/, "");

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
      ${renderCopyResult(crclCopyLabel, crcl.toFixed(1), { unit: "mL/min" })}
      ${renderCopyResult(tr("loadingRange"), `${Math.round(loadingRange[0])}-${Math.round(loadingRange[1])}`, {
        unit: "mg"
      })}
      ${renderCopyResult(tr("suggestedLoading"), selectedLoading, { unit: tr("mgOnce") })}
      ${renderCopyResult(tr("loadingMinimums"), tr("atLeast", {
        time: loadingInfusion.minTimeHr.toFixed(2),
        hr: tr("hr"),
        vol: Math.ceil(loadingInfusion.minDiluentMl)
      }))}
      <p class="note">${tr("autoRounded", {
        time: formatHours(loadingInfusion.roundedTimeHr),
        vol: loadingInfusion.roundedDiluentMl
      })}</p>
    `;
    return;
  }

  if (!maintMgKg) {
    showInitialIncomplete(event, tr("enterMaintAbove30"));
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
    ${renderCopyResult(crclCopyLabel, crcl.toFixed(1), { unit: "mL/min" })}
    ${renderCopyResult(tr("loadingRange"), `${Math.round(loadingRange[0])}-${Math.round(loadingRange[1])}`, {
      unit: "mg"
    })}
    ${renderCopyResult(tr("suggestedLoading"), selectedLoading, { unit: tr("mgOnce") })}
    ${renderCopyResult(tr("maintRange"), `${Math.round(maintRange[0])}-${Math.round(maintRange[1])}`, {
      unit: "mg/dose"
    })}
    ${renderCopyResult(tr("suggestedMaint"), finalMaintDose, { unit: `mg ${intervalPlan.label}` })}
    ${renderCopyResult(tr("estimatedDaily"), Math.round(cappedDailyDose), { unit: tr("mgDay") })}
    ${renderCopyResult(tr("maintMinimums"), tr("atLeast", {
      time: infusion.minTimeHr.toFixed(2),
      hr: tr("hr"),
      vol: Math.ceil(infusion.minDiluentMl)
    }))}
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
  const recommendedDose = Math.max(250, doseSameInterval);
  const alternativeDose = Math.max(250, doseAltInterval);

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
    aucLine = `
      ${renderCopyResult(tr("aucMic"), aucMic.toFixed(1))}
      <p class="note">${tr("target400600")}</p>
    `;
  }

  const recommendedInfusion = infusionAdvice(recommendedDose);
  const orderLines =
    troughState === "very-high"
      ? [tr("vancoHoldLine"), tr("vancoHoldFollow")]
      : [
          tr("maintenanceLine", {
            dose: recommendedDose,
            vol: recommendedInfusion.roundedDiluentMl,
            time: formatHours(recommendedInfusion.roundedTimeHr),
            interval: `q${currentInterval}h`
          }),
          maintenanceMonitoringText(currentInterval)
        ];
  adjustResult.innerHTML = `
    <div class="order-highlight vanco-adjust-copy-order">
      <p class="order-title">${tr("vancoAdjustOrderReady")}</p>
      <div class="order-text">${renderOrderLines(orderLines)}</div>
    </div>
    <p><strong>${tr("statusLabel")}</strong> <span class="${statusClass}">${statusText}</span></p>
    ${renderCopyResult(tr("currentDailyExposure"), Math.round(dailyDose), { unit: tr("mgDay") })}
    ${renderCopyResult(tr("doseSame", { interval: currentInterval }), recommendedDose, { unit: "mg" })}
    ${renderCopyResult(tr("doseAlt", { interval: altInterval }), alternativeDose, { unit: "mg" })}
    <p class="note">${extraSafety}</p>
    ${aucLine}
    <p class="note">${tr("pkApprox")}</p>
`;
}

async function copyVancoAdjustOrder(event) {
  copyOrderLine(event, adjustResult, "vancoAdjustCopied", "vancoAdjustCopyFailed");
}

function calculateInfusion(event) {
  event?.preventDefault();

  const weightInput = document.getElementById("infusion-weight");
  const rateInput = document.getElementById("infusion-rate-mlhr");
  const doseInput = document.getElementById("infusion-dose");
  const drugInput = document.getElementById("infusion-drug-mg");
  const volumeInput = document.getElementById("infusion-volume-ml");
  const weight = Number(weightInput.value);
  const dose = Number(doseInput.value);
  const rateMlHr = Number(rateInput.value);
  const drugMg = Number(drugInput.value);
  const volumeMl = Number(volumeInput.value);
  const changedId = event?.target?.id;
  const hasWeight = weightInput.value.trim() !== "";
  const hasDose = doseInput.value.trim() !== "";
  const hasRate = rateInput.value.trim() !== "";
  const hasDrug = drugInput.value.trim() !== "";
  const hasVolume = volumeInput.value.trim() !== "";

  if (changedId === "infusion-dose") lastInfusionEdited = "dose";
  if (changedId === "infusion-rate-mlhr") lastInfusionEdited = "mlhr";
  if (!lastInfusionEdited) {
    if (hasDose && !hasRate) lastInfusionEdited = "dose";
    if (hasRate && !hasDose) lastInfusionEdited = "mlhr";
    if (hasDose && hasRate) lastInfusionEdited = "dose";
  }

  if (!hasDrug || !hasVolume || !drugMg || !volumeMl) {
    infusionResult.innerHTML = `<p>${tr("infusionBaseNeed")}</p>`;
    return;
  }

  const concentrationMcgMl = (drugMg * 1000) / volumeMl;
  const concentrationLine = renderCopyResult(tr("infusionConc"), concentrationMcgMl.toFixed(1), {
    unit: `mcg/mL (${(drugMg / volumeMl).toFixed(3)} mg/mL)`
  });

  if (!hasWeight || !weight) {
    infusionResult.innerHTML = `
      ${concentrationLine}
      <p class="note">${tr("infusionBaseNeed")}</p>
    `;
    return;
  }

  let calculatedMlHr = rateMlHr;
  let calculatedDose = dose;
  let solvedLine = "";

  if (lastInfusionEdited === "mlhr") {
    if (!hasRate || !rateMlHr) {
      infusionResult.innerHTML = `
        ${concentrationLine}
        <p class="note">${tr("infusionDirectionNeed")}</p>
      `;
      return;
    }
    calculatedDose = (rateMlHr * concentrationMcgMl) / (weight * 60);
    doseInput.value = formatDoseInput(calculatedDose);
    setPendingDecimal(doseInput, false);
    solvedLine = renderCopyResult(tr("infusionDoseResult"), formatDoseInput(calculatedDose), { unit: "mcg/kg/min" });
  } else {
    if (!hasDose || !dose) {
      infusionResult.innerHTML = `
        ${concentrationLine}
        <p class="note">${tr("infusionDirectionNeed")}</p>
      `;
      return;
    }
    calculatedMlHr = (dose * weight * 60) / concentrationMcgMl;
    rateInput.value = formatMlHrInput(calculatedMlHr);
    setPendingDecimal(rateInput, false);
    solvedLine = renderCopyResult(tr("infusionMlHrResult"), formatMlHrInput(calculatedMlHr), { unit: "mL/hr" });
  }

  infusionResult.innerHTML = `
    ${solvedLine}
    ${concentrationLine}
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

function buildWarfarinPrescription(targetWeekly, strengths, direction = "nearest") {
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
    const bestTotal = possibleTotals.sort((a, b) => {
      const distance = Math.abs(a - roundedTarget) - Math.abs(b - roundedTarget);
      if (distance) return distance;
      if (direction === "lower") return a - b;
      if (direction === "higher") return b - a;
      return b - a;
    })[0];
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
  const doseDirection = factor < 1 ? "lower" : factor > 1 ? "higher" : "nearest";
  const prescription = buildWarfarinPrescription(suggestedWeekly, strengths, doseDirection);

  warfarinResult.innerHTML = `
    <div class="order-highlight warfarin-copy-order">
      <p class="order-title">${tr("warfarinRxTitle")}</p>
      <div class="order-text">
        ${renderOrderLines(prescription.lines)}
        ${renderOrderLines([`(total ${prescription.total} mg/wk)`], { copyable: false })}
      </div>
    </div>
    <p><strong>${tr("statusLabel")}</strong> <span class="${statusClass}">${action}</span></p>
    ${renderCopyResult(tr("warfarinPlan"), doseLine)}
    ${renderCopyResult(tr("warfarinActualWeekly"), prescription.total, { unit: "mg/week" })}
    <p class="note">${tr("warfarinApprox")}</p>
    <p class="note">${tr("warfarinNote")}</p>
  `;
}

async function copyWarfarinOrder(event) {
  copyOrderLine(event, warfarinResult, "warfarinCopied", "warfarinCopyFailed");
}

function populateHeparinIndications() {
  const otherProtocols = HEPARIN_PROTOCOLS.filter((protocol) => !HEPARIN_PRIMARY_PROTOCOL_IDS.includes(protocol.id));
  heparinIndicationSelect.innerHTML = otherProtocols
    .map((protocol) => `<option value="${protocol.id}">${tr(protocol.labelKey)}</option>`)
    .join("");
  if (otherProtocols.some((protocol) => protocol.id === currentHeparinProtocol)) {
    heparinIndicationSelect.value = currentHeparinProtocol;
  } else if (!heparinIndicationSelect.value) {
    heparinIndicationSelect.value = otherProtocols[0]?.id || "";
  }
}

function syncHeparinIndicationControls(activeProtocolId = currentHeparinProtocol) {
  const isPrimary = HEPARIN_PRIMARY_PROTOCOL_IDS.includes(activeProtocolId);
  const activeCategory = isPrimary ? activeProtocolId : "other";
  for (const button of heparinIndicationTabs.querySelectorAll(".choice-option")) {
    button.classList.toggle("active", button.dataset.heparinProtocol === activeCategory);
  }
  heparinOtherWrap.classList.toggle("hidden", isPrimary);
}

function setHeparinProtocol(protocolId) {
  if (protocolId === "other") {
    if (HEPARIN_PRIMARY_PROTOCOL_IDS.includes(currentHeparinProtocol)) {
      const fallback = HEPARIN_PROTOCOLS.find((protocol) => !HEPARIN_PRIMARY_PROTOCOL_IDS.includes(protocol.id));
      currentHeparinProtocol = fallback?.id || "";
      heparinIndicationSelect.value = currentHeparinProtocol;
    } else {
      currentHeparinProtocol = heparinIndicationSelect.value || currentHeparinProtocol;
    }
  } else {
    currentHeparinProtocol = protocolId;
  }
  syncHeparinIndicationControls();
  calculateHeparin();
}

function getHeparinProtocolOptionsForDisplay() {
  return HEPARIN_PROTOCOLS.map(
    (protocol) => `<option value="${protocol.id}">${tr(protocol.labelKey)}</option>`
  ).join("");
}

function getSelectedHeparinProtocol() {
  return HEPARIN_PROTOCOLS.find((protocol) => protocol.id === currentHeparinProtocol) || HEPARIN_PROTOCOLS[0];
}

function describeHeparinProtocol(protocol) {
  const bolusText = protocol.bolusUnitsKg
    ? `${protocol.bolusUnitsKg} units/kg${protocol.bolusMax ? `; max ${protocol.bolusMax} units` : ""}`
    : tr("heparinNoBolus");
  const infusionText = `${protocol.infusionUnitsKgHr} units/kg/hr${
    protocol.infusionMax ? `; max ${protocol.infusionMax} units/hr` : ""
  }`;
  return `${bolusText} + ${infusionText}`;
}

function calculateHeparin(event) {
  event?.preventDefault();

  const weight = Number(document.getElementById("heparin-weight").value);
  const bagUnits = Number(document.getElementById("heparin-bag-units").value);
  const bagVolume = Number(document.getElementById("heparin-bag-volume").value);
  const protocol = getSelectedHeparinProtocol();

  if (!weight || !bagUnits || !bagVolume) {
    heparinResult.innerHTML = `<p>${tr("heparinNeed")}</p>`;
    return;
  }

  const concentration = bagUnits / bagVolume;
  if (!Number.isFinite(concentration) || concentration <= 0) {
    heparinResult.innerHTML = `<p>${tr("heparinBadBag")}</p>`;
    return;
  }

  const rawBolus = protocol.bolusUnitsKg * weight;
  const cappedBolus = protocol.bolusMax ? Math.min(rawBolus, protocol.bolusMax) : rawBolus;
  const bolusDose = protocol.bolusUnitsKg ? roundToNearest(cappedBolus, 100) : 0;
  const bolusCapApplied = Boolean(protocol.bolusMax && rawBolus > protocol.bolusMax);
  const rawInfusion = protocol.infusionUnitsKgHr * weight;
  const cappedInfusion = protocol.infusionMax ? Math.min(rawInfusion, protocol.infusionMax) : rawInfusion;
  const infusionUnitsHr = Math.round(cappedInfusion);
  const infusionCapApplied = Boolean(protocol.infusionMax && rawInfusion > protocol.infusionMax);
  const pumpRate = infusionUnitsHr / concentration;
  const roundedPumpRate = roundToStep(pumpRate, 0.5);
  const deliveredUnitsHr = Math.round(roundedPumpRate * concentration);
  const pumpRateText = formatHalfStep(roundedPumpRate);
  const concentrationText = concentration.toFixed(concentration >= 10 ? 0 : 1);
  const bolusLine = bolusDose
    ? tr("heparinBolusLine", { dose: bolusDose })
    : tr("heparinNoBolusLine");
  const prepLine = tr("heparinPrepLine", {
    bagUnits,
    bagVolume,
    concentration: concentrationText
  });
  const infusionLine = tr("heparinInfusionLine", {
    unitsHr: deliveredUnitsHr,
    mlHr: pumpRateText,
    concentration: concentrationText
  });
  const capNotes = [
    bolusCapApplied ? `${tr("heparinBolusResult")} ${tr("heparinCapApplied")}` : "",
    infusionCapApplied ? `${tr("heparinInfusionResult")} ${tr("heparinCapApplied")}` : ""
  ].filter(Boolean);
  const heparinOrderLines = [prepLine, bolusLine, infusionLine];

  heparinResult.innerHTML = `
    <button type="button" class="order-highlight copy-block heparin-copy-order" data-copy="${encodeURIComponent(
      heparinOrderLines.join("\n")
    )}">
      <p class="order-title">${tr("heparinOrderReady")}</p>
      <div class="order-text">
        ${heparinOrderLines.map((line) => `<p class="order-line copy-line-static">${line}</p>`).join("")}
      </div>
    </button>
    <button type="button" class="order-highlight copy-block heparin-monitor-copy-order" data-copy="${encodeURIComponent(
      tr("heparinMonitorLine")
    )}">
      <p class="order-title">${tr("heparinOrderReady")}</p>
      <div class="order-text">
        <p class="order-line copy-line-static">${tr("heparinMonitorLine")}</p>
      </div>
    </button>
    ${renderCopyResult(tr("heparinTargetResult"), tr("heparinMonitorLine"))}
    ${renderCopyResult(
      tr("heparinBolusResult"),
      bolusDose
        ? `${bolusDose} units (${protocol.bolusUnitsKg} units/kg${bolusCapApplied ? `, ${tr("heparinCapApplied")}` : ""})`
        : tr("heparinNoBolus")
    )}
    ${renderCopyResult(
      tr("heparinInfusionResult"),
      `${infusionUnitsHr} units/hr (${protocol.infusionUnitsKgHr} units/kg/hr${infusionCapApplied ? `, ${tr("heparinCapApplied")}` : ""})`
    )}
    ${renderCopyResult(tr("heparinPumpRateResult"), pumpRateText, { unit: "mL/hr" })}
    ${renderCopyResult(tr("heparinConcentrationResult"), concentrationText, { unit: "units/mL" })}
    <p><strong>${tr("statusLabel")}</strong> ${protocol.antiXaGoal}</p>
    <p class="note">${describeHeparinProtocol(protocol)}</p>
    ${capNotes.length ? `<p class="note">${capNotes.join("; ")}</p>` : ""}
    <p class="note"><strong>${tr("heparinSourceLabel")}</strong> ${tr(protocol.sourceKey)}</p>
    <p class="note">${tr(protocol.cautionKey)}</p>
  `;
}

async function copyHeparinOrder(event) {
  copyOrderLine(event, heparinResult, "heparinAllCopied", "heparinCopyFailed");
}

function syncRenalControls() {
  const mode = renalModeInput.value;
  const sex = renalSexInput.value;
  for (const button of renalModeTabs.querySelectorAll(".choice-option")) {
    button.classList.toggle("active", button.dataset.renalMode === mode);
  }
  for (const button of renalSexTabs.querySelectorAll(".choice-option")) {
    button.classList.toggle("active", button.dataset.renalSex === sex);
  }
  renalWeightWrap.classList.toggle("hidden", mode !== "crcl");
}

function calculateRenal(event) {
  event?.preventDefault();

  const mode = renalModeInput.value;
  const sex = renalSexInput.value;
  const age = Number(document.getElementById("renal-age").value);
  const scr = Number(document.getElementById("renal-scr").value);
  const weight = Number(document.getElementById("renal-weight").value);

  if (mode === "crcl") {
    if (!age || !scr || !weight) {
      renalResult.innerHTML = `<p>${tr("renalNeedCrcl")}</p>`;
      return;
    }
    const crcl = calculateCrClCockcroftGault({ age, weight, scr, sex });
    renalResult.innerHTML = `
      ${renderCopyResult("CrCl", crcl.toFixed(1), { unit: "mL/min" })}
      <p class="note">${tr("renalCrclFormula")}</p>
      <p class="note">${tr("renalCaution")}</p>
    `;
    return;
  }

  if (!age || !scr) {
    renalResult.innerHTML = `<p>${tr("renalNeedGfr")}</p>`;
    return;
  }

  const egfr = calculateCkdEpi2021Creatinine({ age, scr, sex });
  renalResult.innerHTML = `
    ${renderCopyResult("eGFR", egfr.toFixed(1), {
      unit: "mL/min/1.73 m²",
      copyValue: egfr.toFixed(1)
    })}
    <p class="note">${tr("renalGfrFormula")}</p>
    <p class="note">${tr("renalCaution")}</p>
  `;
}

function calculateOsmo(event) {
  event?.preventDefault();

  const naValue = document.getElementById("osmo-na").value.trim();
  const glucoseValue = document.getElementById("osmo-glucose").value.trim();
  const bunValue = document.getElementById("osmo-bun").value.trim();
  const measuredValue = document.getElementById("osmo-measured").value.trim();
  const na = Number(naValue);
  const glucose = Number(glucoseValue);
  const bun = Number(bunValue);
  const measured = Number(measuredValue);
  const hasNa = naValue !== "" && Number.isFinite(na);
  const hasGlucose = glucoseValue !== "" && Number.isFinite(glucose);
  const hasBun = bunValue !== "" && Number.isFinite(bun);
  const hasMeasured = measuredValue !== "" && Number.isFinite(measured);

  if (!hasNa || !hasGlucose) {
    osmoResult.innerHTML = `<p>${tr("osmoNeed")}</p>`;
    return;
  }

  const effectiveOsmo = 2 * na + glucose / 18;
  const serumOsmo = hasBun ? effectiveOsmo + bun / 2.8 : null;
  const osmolalGap = hasBun && hasMeasured ? measured - serumOsmo : null;
  const osmolalGapBlock =
    osmolalGap === null
      ? hasMeasured && !hasBun
        ? `<p class="note">${tr("osmoAddBunForGap")}</p>`
        : hasBun
        ? `<p class="note">${tr("osmoAddMeasured")}</p>`
        : ""
      : `
        ${renderCopyResult(tr("osmoGapResult"), osmolalGap.toFixed(1), { unit: "mOsm/kg" })}
        <p><strong>${tr("statusLabel")}</strong> <span class="${
          osmolalGap > 10 ? "status-high" : "status-ok"
        }">${osmolalGap > 10 ? tr("osmoGapHigh") : tr("osmoGapNormal")}</span></p>
      `;
  osmoResult.innerHTML = `
    ${renderCopyResult(tr("osmoEffectiveResult"), effectiveOsmo.toFixed(1), { unit: "mOsm/kg" })}
    ${
      hasBun
        ? renderCopyResult(tr("osmoResult"), serumOsmo.toFixed(1), { unit: "mOsm/kg" })
        : `<p class="note">${tr("osmoAddBun")}</p>`
    }
    ${osmolalGapBlock}
    <p class="note">${tr("osmoEffectiveFormula")}</p>
    ${hasBun ? `<p class="note">${tr("osmoSerumFormula")}</p>` : ""}
    ${hasBun && hasMeasured ? `<p class="note">${tr("osmoGapFormula")}</p>` : ""}
  `;
}

function calculateCalcium(event) {
  event?.preventDefault();

  const measuredCalcium = Number(document.getElementById("calcium-measured").value);
  const albumin = Number(document.getElementById("calcium-albumin").value);

  if (!measuredCalcium || !albumin) {
    calciumResult.innerHTML = `<p>${tr("calciumNeed")}</p>`;
    return;
  }

  const correctedCalcium = measuredCalcium + 0.8 * (4 - albumin);
  let status = tr("calciumNormal");
  let statusClass = "status-ok";
  if (correctedCalcium < 8.5) {
    status = tr("calciumLow");
    statusClass = "status-caution";
  } else if (correctedCalcium > 10.5) {
    status = tr("calciumHigh");
    statusClass = "status-high";
  }
  const correctedCalciumText = formatNumberForInput(correctedCalcium, 1);

  calciumResult.innerHTML = `
    ${renderCopyResult(tr("calciumResult"), correctedCalciumText, {
      unit: "mg/dL",
      copyValue: correctedCalciumText,
      copyFull: `cCa = ${correctedCalciumText}`
    })}
    <p><strong>${tr("statusLabel")}</strong> <span class="${statusClass}">${status}</span></p>
    <p class="note">${tr("calciumFormula")}</p>
  `;
}

function getFib4Interpretation(score) {
  if (score < 1.45) {
    return { text: tr("fibrosisFib4Low"), className: "status-ok" };
  }
  if (score > 3.25) {
    return { text: tr("fibrosisFib4High"), className: "status-high" };
  }
  return { text: tr("fibrosisFib4Indeterminate"), className: "status-caution" };
}

function getApriInterpretation(score) {
  if (score < 0.5) {
    return { text: tr("fibrosisApriLow"), className: "status-ok" };
  }
  if (score > 1.5) {
    return { text: tr("fibrosisApriHigh"), className: "status-high" };
  }
  return { text: tr("fibrosisApriIndeterminate"), className: "status-caution" };
}

function calculateFibrosis(event) {
  event?.preventDefault();

  const age = Number(document.getElementById("fibrosis-age").value);
  const ast = Number(document.getElementById("fibrosis-ast").value);
  const alt = Number(document.getElementById("fibrosis-alt").value);
  const platelets = Number(document.getElementById("fibrosis-platelets").value);
  const astUln = Number(document.getElementById("fibrosis-ast-uln").value);
  const values = [age, ast, alt, platelets, astUln];

  if (values.some((value) => !Number.isFinite(value) || value <= 0)) {
    fibrosisResult.innerHTML = `<p>${tr("fibrosisNeed")}</p>`;
    return;
  }

  const fib4 = (age * ast) / (platelets * Math.sqrt(alt));
  const apri = ((ast / astUln) / platelets) * 100;
  const fib4Text = formatNumberForInput(fib4, 2);
  const apriText = formatNumberForInput(apri, 2);
  const fib4Interpretation = getFib4Interpretation(fib4);
  const apriInterpretation = getApriInterpretation(apri);
  const apriCirrhosisNote =
    apri >= 2 ? `<p class="note"><strong>${tr("statusLabel")}</strong> ${tr("fibrosisApriCirrhosis")}</p>` : "";

  fibrosisResult.innerHTML = `
    ${renderCopyResult(tr("fibrosisFib4Result"), fib4Text, {
      copyValue: fib4Text,
      copyFull: `FIB-4 = ${fib4Text}`
    })}
    ${renderCopyResult(tr("fibrosisApriResult"), apriText, {
      copyValue: apriText,
      copyFull: `APRI = ${apriText}`
    })}
    <p><strong>${tr("fibrosisFib4Interpretation")}</strong> <span class="${
      fib4Interpretation.className
    }">${fib4Interpretation.text}</span></p>
    <p><strong>${tr("fibrosisApriInterpretation")}</strong> <span class="${
      apriInterpretation.className
    }">${apriInterpretation.text}</span></p>
    ${apriCirrhosisNote}
    <p class="note">${tr("fibrosisFib4MasldNote")}</p>
    <p class="note">${tr("fibrosisFib4Formula")}</p>
    <p class="note">${tr("fibrosisApriFormula")}</p>
    <p class="note">${tr("fibrosisCaution")}</p>
    <p class="note">${tr("fibrosisSourceNote")}</p>
  `;
}

function calculateFreeWater(event) {
  event?.preventDefault();

  const weight = Number(document.getElementById("free-water-weight").value);
  const currentNa = Number(document.getElementById("free-water-na").value);
  const targetNa = Number(document.getElementById("free-water-target").value);
  const duration = Number(document.getElementById("free-water-duration").value);
  const tbwFactor = Number(document.getElementById("free-water-tbw").value);
  const route = document.getElementById("free-water-route").value;

  if (!weight || !currentNa || !targetNa || !duration || !tbwFactor) {
    freeWaterResult.innerHTML = `<p>${tr("freeWaterNeed")}</p>`;
    return;
  }

  if (targetNa >= currentNa) {
    freeWaterResult.innerHTML = `<p>${tr("freeWaterTargetError")}</p>`;
    return;
  }

  const tbw = weight * tbwFactor;
  const deficitL = Math.max(0, tbw * (currentNa / targetNa - 1));
  const rateMlHr = Math.round((deficitL * 1000) / duration);
  const correctionPerDay = ((currentNa - targetNa) / duration) * 24;
  const correctionPerHour = (currentNa - targetNa) / duration;
  const correctionWarning =
    correctionPerDay > 12 || correctionPerHour > 0.5
      ? `<p><strong>${tr("statusLabel")}</strong> <span class="status-high">${tr("freeWaterFastWarning")}</span></p>`
      : "";
  const enteralIntervalHr = 4;
  const enteralDoses = Math.max(1, Math.ceil(duration / enteralIntervalHr));
  const enteralPerDose = roundUpToStep((deficitL * 1000) / enteralDoses, 25);
  const deficitText = deficitL.toFixed(1);
  const orderLine =
    route === "enteral"
      ? tr("freeWaterEnteralOrder", {
          perDose: enteralPerDose,
          interval: enteralIntervalHr,
          duration,
          deficit: deficitText,
          target: targetNa
        })
      : tr("freeWaterD5wOrder", {
          rate: rateMlHr,
          duration,
          deficit: deficitText,
          target: targetNa
        });

  freeWaterResult.innerHTML = `
    <div class="order-highlight free-water-copy-order">
      <p class="order-title">${tr("freeWaterOrderReady")}</p>
      <div class="order-text">${renderOrderLines([orderLine, tr("freeWaterMonitorOrder")])}</div>
    </div>
    ${renderCopyResult(tr("freeWaterResult"), deficitText, { unit: "L" })}
    ${renderCopyResult(tr("freeWaterTbwUsed"), tbw.toFixed(1), { unit: `L (${tbwFactor.toFixed(2)} x ${weight} kg)` })}
    ${renderCopyResult(tr("freeWaterRate"), tr("freeWaterRateDisplay", { rate: rateMlHr, duration }))}
    ${renderCopyResult(tr("freeWaterCorrectionRate"), tr("freeWaterCorrectionRateDisplay", {
      perDay: correctionPerDay.toFixed(1),
      perHour: correctionPerHour.toFixed(2)
    }))}
    ${correctionWarning}
    <p class="note">${tr("freeWaterCaution")}</p>
    <p class="note">${tr("freeWaterFormula")}</p>
  `;
}

async function copyFreeWaterOrder(event) {
  copyOrderLine(event, freeWaterResult);
}

function findOralSupplementForCalories(calories) {
  return ORAL_SUPPLEMENT_REFERENCE.filter((item) => calories >= item.kcalMin && calories <= item.kcalMax);
}

function findClosestOralSupplement(calories) {
  const target = clamp(Math.round(calories), 200, 1000);
  const exact = findOralSupplementForCalories(target);
  if (exact.length) return exact[0];
  return ORAL_SUPPLEMENT_REFERENCE.reduce((best, item) => {
    const itemMid = (item.kcalMin + item.kcalMax) / 2;
    const bestMid = (best.kcalMin + best.kcalMax) / 2;
    return Math.abs(itemMid - target) < Math.abs(bestMid - target) ? item : best;
  }, ORAL_SUPPLEMENT_REFERENCE[0]);
}

function findBestHospitalDiet(calories) {
  return HOSPITAL_DIET_REFERENCE.reduce((best, item) => {
    return Math.abs(item.calories - calories) < Math.abs(best.calories - calories) ? item : best;
  }, HOSPITAL_DIET_REFERENCE[0]);
}

function formatPnNumber(value) {
  if (!Number.isFinite(value)) return "";
  return Number(value.toFixed(1)).toString();
}

function getNutritionPnMatches({ routeMode, calories, protein, fluidLimit }) {
  const routeFiltered = PARENTERAL_NUTRITION_REFERENCE.filter((item) => {
    if (routeMode === "ppn") return item.route === "Peripheral PN";
    if (routeMode === "tpn") return item.route === "Central PN";
    return true;
  });

  return routeFiltered
    .map((item) => {
      const calorieGap = Math.abs(item.energy - calories);
      const proteinGap = Math.abs(item.amino - protein);
      const proteinDeficit = Math.max(0, protein - item.amino);
      const fluidExcess = fluidLimit ? Math.max(0, item.volume - fluidLimit) : 0;
      const score =
        (calorieGap / Math.max(calories, 1)) * 55 +
        (proteinGap / Math.max(protein, 1)) * 20 +
        (proteinDeficit / Math.max(protein, 1)) * 18 +
        (fluidExcess ? 90 + fluidExcess / 30 : 0);
      return { ...item, calorieGap, proteinGap, proteinDeficit, fluidExcess, score };
    })
    .sort((a, b) => a.score - b.score || a.fluidExcess - b.fluidExcess || a.volume - b.volume);
}

function renderNutritionDeficitNote({
  calories,
  protein,
  fluid,
  intakePercent,
  currentKcal,
  deficitKcal,
  currentProtein,
  deficitProtein,
  basisLine
}) {
  const noteLines = [
    `Nutrition goal: ${calories} kcal/day, protein ${protein} g/day, fluid ${fluid} ml/day`,
    basisLine,
    `Estimated current intake: ${intakePercent}% (~${currentKcal} kcal/day, protein ~${currentProtein} g/day)`,
    `Estimated deficit: ${deficitKcal} kcal/day, protein ${deficitProtein} g/day`
  ];
  return `
    <button type="button" class="order-highlight copy-block nutrition-note-copy-order" data-copy="${encodeURIComponent(noteLines.join("\n"))}">
      <p class="order-title">${tr("nutritionProgressNoteReady")}</p>
      <div class="order-text">${noteLines.map((line) => `<p class="order-line copy-line-static">${line}</p>`).join("")}</div>
    </button>
    <p><strong>${tr("nutritionDeficitSummary")}</strong><br>${deficitKcal} kcal/day and ${deficitProtein} g protein/day after estimated intake.</p>
  `;
}

function renderNutritionDietOrder({ calories, protein, intakePercent }) {
  const selectedDiet = findBestHospitalDiet(calories);
  const dietOrderLines = [
    selectedDiet.diet,
    "Record food intake chart",
    intakePercent < 75 ? "If intake <75% goal, add oral nutrition supplement or consult dietitian" : "Continue diet and reassess intake"
  ];
  return `
    <div class="order-highlight nutrition-diet-copy-order">
      <p class="order-title">${tr("nutritionDietOrderReady")}</p>
      <div class="order-text">${renderOrderLines(dietOrderLines)}</div>
    </div>
    <p><strong>${tr("nutritionRouteDiet")} match:</strong><br>${selectedDiet.diet}: ${selectedDiet.calories} kcal/day, C:P:F ${selectedDiet.cpf}</p>
  `;
}

function renderNutritionOnsOrder({ deficitKcal }) {
  const supplement = findClosestOralSupplement(deficitKcal);
  const onsOrderLines = [
    `${supplement.name} ${supplement.kcalMin}-${supplement.kcalMax} kcal/day (${supplement.code})`,
    "Record food intake chart",
    "Reassess intake and tolerance daily"
  ];
  return `
    <div class="order-highlight nutrition-ons-copy-order">
      <p class="order-title">${tr("nutritionOnsOrderReady")}</p>
      <div class="order-text">${renderOrderLines(onsOrderLines)}</div>
    </div>
    <p><strong>${tr("nutritionSupplementRecommendation")}</strong><br>${supplement.name} ${supplement.kcalMin}-${supplement.kcalMax} kcal/day, ${supplement.price} บาท/day, ${supplement.code}</p>
  `;
}

function renderNutritionEnteralOrder({ calories, protein, fluid, deficitKcal, riskRefeeding }) {
  const feedsPerDay = 4;
  const formulaKcalMl = 1.5;
  const enteralCalories = Math.max(deficitKcal, Math.round(calories * 0.5));
  const totalFormulaMl = roundUpToStep(enteralCalories / formulaKcalMl, 50);
  const perFeedMl = roundUpToStep(totalFormulaMl / feedsPerDay, 50);
  const actualFormulaMl = perFeedMl * feedsPerDay;
  const actualFormulaKcal = Math.round(actualFormulaMl * formulaKcalMl);
  const waterPerFeedMl = Math.max(0, Math.round(((fluid - actualFormulaMl) / feedsPerDay) / 10) * 10);
  const totalVolume = actualFormulaMl + waterPerFeedMl * feedsPerDay;
  const feedingOrderLines = [
    `BD (1.5:1) ${perFeedMl}ml x ${feedsPerDay} feeds + น้ำตาม ${waterPerFeedMl}ml/feed (feed provides ~${actualFormulaKcal} kcal/day; target ${calories} kcal/day, TV ${totalVolume} ml/day, TP ${protein} g/day)`
  ];
  if (riskRefeeding) feedingOrderLines.unshift("Start enteral feeding at ~50% goal, advance as tolerated.");
  return `
    <div class="order-highlight nutrition-copy-order">
      <p class="order-title">${tr("nutritionOrderReady")}</p>
      <div class="order-text">${renderOrderLines(feedingOrderLines)}</div>
    </div>
  `;
}

function renderNutritionPnOrder({ calories, protein, fluid, supportCalories, supportProtein, riskRefeeding }) {
  const routeMode = document.getElementById("nutrition-pn-route").value;
  const infusionHours = clamp(Number(document.getElementById("nutrition-pn-hours").value) || 24, 1, 24);
  const fluidLimitInput = Number(document.getElementById("nutrition-pn-fluid").value);
  const fluidLimit = fluidLimitInput > 0 ? fluidLimitInput : fluid;
  const includeAdditives = document.getElementById("nutrition-pn-additives").checked;
  const matches = getNutritionPnMatches({ routeMode, calories: supportCalories, protein: supportProtein, fluidLimit });
  if (!matches.length) return `<p class="note">${tr("nutritionPnNoMatch")}</p>`;

  const selected = matches[0];
  const pnType = selected.route === "Central PN" ? "TPN" : "PPN";
  const access = selected.route === "Central PN" ? "central line/PICC" : "peripheral line";
  const rate = formatPnNumber(roundToStep(selected.volume / infusionHours, 0.5));
  const additiveLine = "Add Soluvit N 1 vial + Vitalipid N Adult 10 ml + Addamel N 10 ml into PN bag";
  const pnOrderLines = [
    `${pnType}: ${selected.product} ${selected.volume} ml IV via ${access} over ${formatPnNumber(infusionHours)} hr`,
    `Rate ${rate} ml/hr`
  ];
  if (includeAdditives) pnOrderLines.push(additiveLine);
  pnOrderLines.push("Prepare under aseptic condition by pharmacy");
  pnOrderLines.push(
    `Provides ${selected.energy} kcal/day, amino acid ${selected.amino} g/day, glucose ${selected.glucose} g/day, lipid ${selected.lipid} g/day`
  );

  const monitorLines = [
    selected.route === "Peripheral PN" ? "Monitor peripheral IV site for phlebitis/infiltration" : "Use dedicated central line/PICC lumen for PN",
    "DTX q6hr",
    "Na/K/Mg/PO4/Ca/Cr daily until stable",
    "LFT/TG weekly"
  ];
  if (riskRefeeding) {
    monitorLines.unshift("Thiamine 100 mg IV/PO before PN then daily");
    monitorLines.push("High refeeding risk: replace K/Mg/PO4 before advancing PN");
  }

  const alternatives = matches
    .slice(1, 4)
    .map(
      (item) =>
        `${item.route === "Central PN" ? "TPN" : "PPN"} ${item.product} ${item.volume} ml: provides ${item.energy} kcal, AA ${item.amino} g, rate ${formatPnNumber(roundToStep(item.volume / infusionHours, 0.5))} ml/hr`
    )
    .join("<br>");
  const fluidWarning =
    selected.fluidExcess > 0
      ? `<p class="note">Selected bag exceeds PN fluid limit by ${formatPnNumber(selected.fluidExcess)} ml/day; choose smaller bag or adjust fluid plan.</p>`
      : "";

  return `
    <button type="button" class="order-highlight copy-block nutrition-pn-copy-order" data-copy="${encodeURIComponent(pnOrderLines.join("\n"))}">
      <p class="order-title">${tr("nutritionPnOrderReady")}</p>
      <div class="order-text">${pnOrderLines.map((line) => `<p class="order-line copy-line-static">${line}</p>`).join("")}</div>
    </button>
    <button type="button" class="order-highlight copy-block nutrition-pn-monitor-copy-order" data-copy="${encodeURIComponent(monitorLines.join("\n"))}">
      <p class="order-title">${tr("nutritionPnMonitorReady")}</p>
      <div class="order-text">${monitorLines.map((line) => `<p class="order-line copy-line-static">${line}</p>`).join("")}</div>
    </button>
    <p><strong>${tr("nutritionPnRecommendation")}</strong><br>${pnType} ${selected.product} ${selected.volume} ml: provides ${selected.energy} kcal of ${calories} target (${supportCalories} kcal support need), AA ${selected.amino} g of ${protein} target (${supportProtein} g support need), volume ${selected.volume} ml of ${fluidLimit} ml limit</p>
    ${alternatives ? `<p><strong>${tr("nutritionPnAlternatives")}</strong><br>${alternatives}</p>` : ""}
    ${fluidWarning}
    <p class="note">${tr("nutritionPnCaution")}</p>
  `;
}

function renderNutritionReferenceTables({ open = false } = {}) {
  const dietRows = HOSPITAL_DIET_REFERENCE.map(
    (item) => `
      <tr>
        <td>${item.diet}</td>
        <td>${item.ward}</td>
        <td>${item.cpf}</td>
        <td>${item.calories}</td>
      </tr>
    `
  ).join("");

  const dietAddonRows = HOSPITAL_DIET_ADDON_REFERENCE.map(
    (item) => `
      <tr>
        <td>${item.item}</td>
        <td>${item.detail}</td>
      </tr>
    `
  ).join("");

  const pnRows = PARENTERAL_NUTRITION_REFERENCE.map(
    (item) => `
      <tr>
        <td>${item.route}</td>
        <td>${item.product}</td>
        <td>${item.volume}</td>
        <td>${item.energy}</td>
        <td>${item.osmole}</td>
        <td>${item.glucose}</td>
        <td>${item.amino}</td>
        <td>${item.lipid}</td>
        <td>${item.na}</td>
        <td>${item.k}</td>
        <td>${item.mg}</td>
        <td>${item.ca}</td>
        <td>${item.po4}</td>
        <td>${item.cl}</td>
      </tr>
    `
  ).join("");

  const supplementRows = ORAL_SUPPLEMENT_REFERENCE.map(
    (item) => `
      <tr>
        <td>${item.no}</td>
        <td>${item.name}</td>
        <td>${item.kcalMin}-${item.kcalMax}</td>
        <td>${item.price}</td>
        <td>${item.code}</td>
      </tr>
    `
  ).join("");

  const bdRows = BD_FORMULA_REFERENCE.map(
    (item) => `
      <tr>
        <td>${item.company}</td>
        <td>${item.formula}</td>
        <td>${item.volume}</td>
        <td>${item.protein}</td>
      </tr>
    `
  ).join("");

  return `
    <details class="reference-panel"${open ? " open" : ""}>
      <summary>${tr("nutritionReferenceTitle")}</summary>
      <p class="note">${tr("nutritionReferenceVerify")}</p>
      <h3>${tr("nutritionHospitalDietReference")}</h3>
      <div class="reference-table-wrap">
        <table class="reference-table">
          <thead>
            <tr>
              <th>Diet</th>
              <th>Ward</th>
              <th>C:P:F</th>
              <th>Total kcal/day</th>
            </tr>
          </thead>
          <tbody>${dietRows}</tbody>
        </table>
      </div>
      <div class="reference-table-wrap">
        <table class="reference-table">
          <thead>
            <tr>
              <th>Add-on</th>
              <th>Energy / protein</th>
            </tr>
          </thead>
          <tbody>${dietAddonRows}</tbody>
        </table>
      </div>
      <h3>${tr("nutritionPnReference")}</h3>
      <div class="reference-table-wrap">
        <table class="reference-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Product</th>
              <th>Volume (mL)</th>
              <th>Energy (kcal)</th>
              <th>Osmole</th>
              <th>Glucose (g)</th>
              <th>Amino A (g)</th>
              <th>Lipid (g)</th>
              <th>Na</th>
              <th>K</th>
              <th>Mg</th>
              <th>Ca</th>
              <th>PO4</th>
              <th>Cl</th>
            </tr>
          </thead>
          <tbody>${pnRows}</tbody>
        </table>
      </div>
      <h3>${tr("nutritionSupplementReference")}</h3>
      <div class="reference-table-wrap">
        <table class="reference-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>รายการ</th>
              <th>kcal/day</th>
              <th>บาท/day</th>
              <th>รหัส รพ.</th>
            </tr>
          </thead>
          <tbody>${supplementRows}</tbody>
        </table>
      </div>
      <h3>${tr("nutritionBdReference")}</h3>
      <div class="reference-table-wrap">
        <table class="reference-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Formula</th>
              <th>Volume</th>
              <th>Protein g/day</th>
            </tr>
          </thead>
          <tbody>${bdRows}</tbody>
        </table>
      </div>
    </details>
  `;
}

function syncNutritionOrderControls() {
  const route = nutritionRouteInput.value;
  for (const button of nutritionRouteTabs.querySelectorAll(".choice-option")) {
    button.classList.toggle("active", button.dataset.nutritionRoute === route);
  }
  for (const button of nutritionIntakeTabs.querySelectorAll(".choice-option")) {
    button.classList.toggle("active", button.dataset.nutritionIntake === nutritionIntakeInput.value);
  }
  const isPn = route === "pn";
  nutritionPnRouteWrap.classList.toggle("hidden", !isPn);
  nutritionPnHoursWrap.classList.toggle("hidden", !isPn);
  nutritionPnFluidWrap.classList.toggle("hidden", !isPn);
  nutritionPnAdditivesWrap.classList.toggle("hidden", !isPn);
}

function calculateNutrition(event) {
  event?.preventDefault();

  const weight = Number(document.getElementById("nutrition-weight").value);
  const height = Number(document.getElementById("nutrition-height").value);
  const nutritionSex = nutritionSexInput.value;
  const hasCkd = document.getElementById("nutrition-ckd").checked;
  const hasAki = document.getElementById("nutrition-aki").checked;
  const isCritical = document.getElementById("nutrition-critical").checked;
  const riskRefeeding = document.getElementById("nutrition-refeeding").checked;
  const nutritionRoute = nutritionRouteInput.value;
  const intakePercent = Number(nutritionIntakeInput.value) || 0;
  syncNutritionOrderControls();

  if (!weight || !height) {
    nutritionResult.innerHTML = `
      <p>${tr("nutritionNeed")}</p>
      ${renderNutritionReferenceTables({ open: true })}
    `;
    return;
  }

  const nutritionPlan = getNutritionTargetPlan({
    weight,
    height,
    sex: nutritionSex,
    hasCkd,
    hasAki,
    isCritical,
    riskRefeeding
  });
  const {
    bmi,
    ibw,
    bmi25Weight,
    adjustedBw,
    calories,
    protein,
    fluid,
    kcalPerKg,
    proteinPerKg,
    fluidPerKg,
    energyWeight,
    proteinWeight,
    fluidWeight,
    energyBasis,
    proteinBasis,
    fluidBasis,
    rule,
    refeedingStart
  } = nutritionPlan;
  const energyBasisText = formatWeightBasis(energyBasis, energyWeight);
  const proteinBasisText = formatWeightBasis(proteinBasis, proteinWeight);
  const fluidBasisText = formatWeightBasis(fluidBasis, fluidWeight);
  const basisSummary = `energy ${energyBasisText}; protein ${proteinBasisText}; fluid ${fluidBasisText}`;
  const basisLine = `${tr("nutritionWeightBasis")} ${basisSummary}`;
  const currentKcal = Math.round((calories * intakePercent) / 100);
  const deficitKcal = Math.max(0, calories - currentKcal);
  const currentProtein = Math.round((protein * intakePercent) / 100);
  const deficitProtein = Math.max(0, protein - currentProtein);
  const supportCalories = Math.max(deficitKcal, Math.round(calories * 0.25));
  const supportProtein = Math.max(deficitProtein, Math.round(protein * 0.25));

  const noteBlock = renderNutritionDeficitNote({
    calories,
    protein,
    fluid,
    intakePercent,
    currentKcal,
    deficitKcal,
    currentProtein,
    deficitProtein,
    basisLine
  });
  let orderBlock = "";
  if (nutritionRoute === "diet") {
    orderBlock = renderNutritionDietOrder({ calories, protein, intakePercent });
  } else if (nutritionRoute === "ons") {
    orderBlock = renderNutritionOnsOrder({ deficitKcal: supportCalories });
  } else if (nutritionRoute === "enteral") {
    orderBlock = renderNutritionEnteralOrder({ calories, protein, fluid, deficitKcal: supportCalories, riskRefeeding: refeedingStart });
  } else if (nutritionRoute === "pn") {
    orderBlock = renderNutritionPnOrder({ calories, protein, fluid, supportCalories, supportProtein, riskRefeeding: refeedingStart });
  }

  nutritionResult.innerHTML = `
    ${orderBlock}
    ${noteBlock}
    ${renderCopyResult(tr("nutritionBmi"), bmi.toFixed(1), { unit: "kg/m²" })}
    ${renderCopyResult(tr("nutritionIbw"), ibw.toFixed(1), { unit: "kg" })}
    ${renderCopyResult(tr("nutritionBmi25Weight"), bmi25Weight.toFixed(1), { unit: "kg" })}
    ${renderCopyResult(tr("nutritionAdjustedBw"), adjustedBw.toFixed(1), { unit: "kg" })}
    <p><strong>${tr("nutritionWeightBasis")}</strong><br>${basisSummary}</p>
    ${renderCopyResult(tr("nutritionEnergy"), calories, {
      unit: `kcal/day (${formatNumberForInput(kcalPerKg, 1)} kcal/kg/day x ${energyBasisText})`
    })}
    ${renderCopyResult(tr("nutritionProtein"), protein, {
      unit: `g/day (${formatNumberForInput(proteinPerKg, 1)} g/kg/day x ${proteinBasisText})`
    })}
    ${renderCopyResult(tr("nutritionVolume"), fluid, {
      unit: `mL/day (${fluidPerKg} mL/kg/day x ${fluidBasisText})`
    })}
    <p class="note">${rule}</p>
    <p class="note">${tr("nutritionCaution")}</p>
    ${renderNutritionReferenceTables()}
  `;
}

async function copyNutritionOrder(event) {
  copyOrderLine(event, nutritionResult);
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
  antibioticDrugSearch.value = "";
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

function syncAntibioticSexControl() {
  const isMale = antibioticSexInput.value === "male";
  antibioticSexToggle.dataset.active = isMale ? "left" : "right";
  antibioticSexLeft.textContent = tr("antibioticSexMale");
  antibioticSexRight.textContent = tr("antibioticSexFemale");
}

function syncAntibioticRenalControls() {
  const usesCrcl = antibioticRenalModeSelect.value === "crcl";
  const autoCrcl = antibioticCrclMethodSelect.value === "auto";
  syncAntibioticSexControl();
  antibioticCrclMethodWrap.classList.toggle("hidden", !usesCrcl);
  antibioticAgeWrap.classList.toggle("hidden", !usesCrcl || !autoCrcl);
  antibioticWeightWrap.classList.toggle("hidden", !usesCrcl || !autoCrcl);
  antibioticScrWrap.classList.toggle("hidden", !usesCrcl || !autoCrcl);
  antibioticSexWrap.classList.toggle("hidden", !usesCrcl || !autoCrcl);
  antibioticCrclWrap.classList.toggle("hidden", !usesCrcl || autoCrcl);

  if (activeInput && !isVisible(activeInput)) {
    const nextInput = autoCrcl ? document.getElementById("antibiotic-age") : document.getElementById("antibiotic-crcl");
    setActiveInput(nextInput);
  }
}

function getAntibioticCrcl() {
  const crclMethod = antibioticCrclMethodSelect.value;
  if (crclMethod === "manual") {
    const manualCrcl = Number(document.getElementById("antibiotic-crcl").value);
    if (!manualCrcl) return { error: tr("enterManualCrcl") };
    return { crcl: manualCrcl, label: tr("antibioticManualCrclUsed") };
  }

  const age = Number(document.getElementById("antibiotic-age").value);
  const weight = Number(document.getElementById("antibiotic-weight").value);
  const scr = Number(document.getElementById("antibiotic-scr").value);
  const sex = antibioticSexInput.value;
  if (!age || !weight || !scr) return { error: tr("antibioticNeedAutoCrcl") };

  const crcl = calculateCrClCockcroftGault({ age, weight, scr, sex });
  if (!Number.isFinite(crcl) || crcl <= 0) return { error: tr("badCrcl") };
  return { crcl, label: tr("antibioticEstimatedCrcl") };
}

function calculateAntibiotic(event) {
  event?.preventDefault();
  syncAntibioticRenalControls();

  const drug = getSelectedAntibiotic();
  const indication = drug.indications[Number(antibioticIndicationSelect.value)] || drug.indications[0];
  const renalMode = antibioticRenalModeSelect.value;
  const crclResult = renalMode === "crcl" ? getAntibioticCrcl() : null;

  if (!drug || !indication) {
    antibioticResult.innerHTML = `<p>${tr("antibioticNeed")}</p>`;
    return;
  }
  if (crclResult?.error) {
    antibioticResult.innerHTML = `<p>${crclResult.error}</p>`;
    return;
  }

  let orderLines;
  let note = indication.note || drug.note || "";

  if (renalMode === "hd") {
    orderLines = indication.hdOrderLines || (indication.hdOrder ? [indication.hdOrder] : null);
  } else {
    const crcl = crclResult.crcl;
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

  antibioticResult.innerHTML = `
    <div class="order-highlight antibiotic-copy-order">
      <p class="order-title">${tr("antibioticOrderReady")}</p>
      <div class="order-text">${renderOrderLines(orderLines)}</div>
    </div>
    ${
      renalMode === "hd"
        ? `<p><strong>${tr("antibioticHdMode")}</strong></p>`
        : renderCopyResult(crclResult.label || tr("antibioticCrclUsed"), crclResult.crcl.toFixed(1), { unit: "mL/min" })
    }
    ${note ? `<p class="note">${note}</p>` : ""}
    <p class="note">${tr("antibioticSourceNote")}</p>
`;
}

async function copyAntibioticOrder(event) {
  copyOrderLine(event, antibioticResult, "antibioticCopied", "antibioticCopyFailed");
}

function runCalculatorForMode(mode) {
  if (mode === "initial") calculateInitial();
  if (mode === "adjust") calculateAdjustment();
  if (mode === "infusion") calculateInfusion();
  if (mode === "warfarin") calculateWarfarin();
  if (mode === "heparin") calculateHeparin();
  if (mode === "renal") calculateRenal();
  if (mode === "osmo") calculateOsmo();
  if (mode === "calcium") calculateCalcium();
  if (mode === "fibrosis") calculateFibrosis();
  if (mode === "freeWater") calculateFreeWater();
  if (mode === "nutrition") calculateNutrition();
  if (mode === "antibiotic") calculateAntibiotic();
}

function recalcIfResultsShown() {
  if (initialResult.innerHTML.trim()) calculateInitial();
  if (adjustResult.innerHTML.trim()) calculateAdjustment();
  if (infusionResult.innerHTML.trim()) calculateInfusion();
  if (warfarinResult.innerHTML.trim()) calculateWarfarin();
  if (heparinResult.innerHTML.trim()) calculateHeparin();
  if (renalResult.innerHTML.trim()) calculateRenal();
  if (osmoResult.innerHTML.trim()) calculateOsmo();
  if (calciumResult.innerHTML.trim()) calculateCalcium();
  if (fibrosisResult.innerHTML.trim()) calculateFibrosis();
  if (freeWaterResult.innerHTML.trim()) calculateFreeWater();
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
        suppressViewportAutoScroll();
        hideNumpad();
        blurFocusedControl();
        clearActiveTarget();
        return;
      }
      suppressViewportAutoScroll();
      hideNumpad();
      blurFocusedControl();
      clearActiveTarget();
    }
  });

  document.addEventListener("pointerdown", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (
      target.closest(".num-input") ||
      target.closest("#numpad") ||
      target.closest("#calculator-search") ||
      target.closest("#calculator-results") ||
      target.closest("#sex-toggle") ||
      target.closest("#nutrition-sex-toggle") ||
      target.closest("#crcl-mode-toggle") ||
      target.closest('button[type="submit"]')
    )
      return;
    if (activeInput || activeActionButton || document.activeElement === calculatorSearch) {
      suppressViewportAutoScroll();
      blurFocusedControl();
    }
    hideNumpad();
    clearActiveTarget();
  });

  window.addEventListener("resize", () => {
    if (isViewportAutoScrollSuppressed()) return;
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

  nutritionSexToggle.addEventListener("click", () => {
    nutritionSexInput.value = nutritionSexInput.value === "male" ? "female" : "male";
    refreshModeButtons();
    runCalculatorForMode("nutrition");
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
  calculatorSearch.addEventListener("focus", () => scheduleCalculatorResultsVisible("auto"));
  calculatorSearch.addEventListener("blur", () => {
    suppressViewportAutoScroll();
    document.body.classList.remove("calculator-search-open");
  });
  window.visualViewport?.addEventListener("resize", () => scheduleCalculatorResultsVisible("auto"));
  calculatorResults.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest(".calculator-card");
    if (!card) return;
    selectCalculator(card.dataset.calculator, { keepWorkflow: false });
  });
}

function initNutritionOrderBuilder() {
  syncNutritionOrderControls();
  nutritionRouteTabs.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".choice-option");
    if (!button) return;
    nutritionRouteInput.value = button.dataset.nutritionRoute;
    syncNutritionOrderControls();
    calculateNutrition();
  });
  nutritionIntakeTabs.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".choice-option");
    if (!button) return;
    nutritionIntakeInput.value = button.dataset.nutritionIntake;
    syncNutritionOrderControls();
    calculateNutrition();
  });
}

function initAntibioticDosing() {
  selectAntibioticDrug(ANTIBIOTIC_RENAL_DOSING[0].id);
  populateAntibioticIndications();
  syncAntibioticRenalControls();
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
  antibioticRenalModeSelect.addEventListener("change", () => {
    syncAntibioticRenalControls();
    calculateAntibiotic();
  });
  antibioticCrclMethodSelect.addEventListener("change", () => {
    syncAntibioticRenalControls();
    calculateAntibiotic();
  });
  antibioticSexToggle.addEventListener("click", () => {
    antibioticSexInput.value = antibioticSexInput.value === "male" ? "female" : "male";
    syncAntibioticSexControl();
    calculateAntibiotic();
  });
  antibioticIndicationSelect.addEventListener("change", calculateAntibiotic);
  bindCopyInteractions(antibioticResult, copyAntibioticOrder);
}

function initHeparinDosing() {
  populateHeparinIndications();
  syncHeparinIndicationControls();
  heparinIndicationTabs.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".choice-option");
    if (!button) return;
    setHeparinProtocol(button.dataset.heparinProtocol);
  });
  heparinIndicationSelect.addEventListener("change", () => {
    currentHeparinProtocol = heparinIndicationSelect.value;
    syncHeparinIndicationControls();
    calculateHeparin();
  });
  bindCopyInteractions(heparinResult, copyHeparinOrder);
}

function initRenalCalculator() {
  syncRenalControls();
  renalModeTabs.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".choice-option");
    if (!button) return;
    renalModeInput.value = button.dataset.renalMode;
    syncRenalControls();
    calculateRenal();
  });
  renalSexTabs.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest(".choice-option");
    if (!button) return;
    renalSexInput.value = button.dataset.renalSex;
    syncRenalControls();
    calculateRenal();
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
  bindCopyInteractions(warfarinResult, copyWarfarinOrder);
}

function bindLiveCalculation(form, calculateFn) {
  form.addEventListener("submit", calculateFn);
  form.addEventListener("input", calculateFn);
  form.addEventListener("change", calculateFn);
}

function bindCopyInteractions(container, handler) {
  let skipNextClick = false;
  container.addEventListener("pointerup", (event) => {
    const target = getCopyLineFromEvent(event, container);
    const block = target ? null : getCopyBlockFromEvent(event, container);
    if (!target && !block) return;
    skipNextClick = true;
    event.preventDefault();
    event.stopPropagation();
    handler(event);
    setTimeout(() => {
      skipNextClick = false;
    }, 0);
  });
  container.addEventListener("click", (event) => {
    if (skipNextClick) {
      skipNextClick = false;
      return;
    }
    handler(event);
  });
  container.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handler(event);
    }
  });
}

function bindResultCopy(container, copiedKey = "orderLineCopied", failedKey = "orderCopyFailed") {
  bindCopyInteractions(container, (event) => copyOrderLine(event, container, copiedKey, failedKey));
}

languageToggle.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "th" : "en");
});

bindLiveCalculation(initialForm, calculateInitial);
bindLiveCalculation(adjustForm, calculateAdjustment);
bindLiveCalculation(document.getElementById("infusion-form"), calculateInfusion);
bindLiveCalculation(document.getElementById("warfarin-form"), calculateWarfarin);
bindLiveCalculation(document.getElementById("heparin-form"), calculateHeparin);
bindLiveCalculation(document.getElementById("renal-form"), calculateRenal);
bindLiveCalculation(document.getElementById("osmo-form"), calculateOsmo);
bindLiveCalculation(document.getElementById("calcium-form"), calculateCalcium);
bindLiveCalculation(document.getElementById("fibrosis-form"), calculateFibrosis);
bindLiveCalculation(document.getElementById("free-water-form"), calculateFreeWater);
bindLiveCalculation(document.getElementById("nutrition-form"), calculateNutrition);
bindLiveCalculation(document.getElementById("antibiotic-form"), calculateAntibiotic);

bindResultCopy(infusionResult);
bindResultCopy(renalResult);
bindResultCopy(osmoResult);
bindResultCopy(calciumResult);
bindResultCopy(fibrosisResult);

bindCopyInteractions(initialResult, copyVancoOrder);
bindCopyInteractions(adjustResult, copyVancoAdjustOrder);
bindCopyInteractions(nutritionResult, copyNutritionOrder);
bindCopyInteractions(freeWaterResult, copyFreeWaterOrder);

initHeparinDosing();
initRenalCalculator();
initAntibioticDosing();
initNutritionOrderBuilder();
initWarfarinTablets();
initNumpad();
initModeButtons();
initWorkflowButtons();
initCalculatorSearch();
syncCrclInputMode();
applyStaticTranslation();

if (Object.prototype.hasOwnProperty.call(WORKFLOWS, currentWorkflow)) {
  const startupWorkflow = currentWorkflow;
  setWorkflow(currentWorkflow, { persist: false, focus: false });
  setTimeout(() => {
    const targetInput = document.getElementById(WORKFLOWS[startupWorkflow].firstInputId);
    setActiveInput(targetInput);
    runCalculatorForMode(startupWorkflow);
  }, 80);
} else if (currentCalculator) {
  selectCalculator(currentCalculator, { persist: false, focus: false, keepWorkflow: true });
} else {
  hideWorkflowPanels();
}
