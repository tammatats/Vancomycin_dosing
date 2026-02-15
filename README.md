# Vancomycin Dosing Assistant (Adult)

Small browser app to support:

- Initial vancomycin regimen from weight + CrCl using the provided diagram logic
- Auto CrCl calculation from serum creatinine (Cockcroft-Gault) using age + sex + weight
- Infusion safety checks (max `10 mg/min`, max concentration `5 mg/mL`)
- Follow-up dose adjustment from serum trough level
- Optional AUC/MIC target check (`400-600` for MRSA)

## Run

Open `index.html` in a browser.

## Notes

- Uses **actual body weight** for dose calculations.
- CrCl can be:
  - Auto-calculated with Cockcroft-Gault: `((140 - age) * weight) / (72 * SCr)` and multiply by `0.85` for female.
  - Manually entered if you already have a verified CrCl/eGFR workflow.
- Diagram-based defaults:
  - Loading: `20-30 mg/kg`
  - Maintenance: `15-20 mg/kg/dose`
  - CrCl interval:
    - `>50 mL/min`: `q8-12h` (app defaults to q12h with note for q8h consideration)
    - `30-50 mL/min`: `q24h`
    - `<30 mL/min`: one dose then TDM-guided redosing
- Includes optional cap frequently used in obesity (`max 2000 mg/dose`, `max 4000 mg/day`).

## Safety

This tool is clinical decision support only and does not replace physician/pharmacist judgment or local antimicrobial stewardship policy.
