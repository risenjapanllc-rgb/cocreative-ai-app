# Visual Fidelity Check

## Purpose

Visual Fidelity Check compares
the Blueprint
against
the Generated Image.

It does not judge beauty.

It does not judge realism.

It measures
fidelity loss.

---

## Source of Truth

Blueprint is authoritative.

Evaluate the image only against:

- Summary
- Known Visual Facts
- Must Preserve
- Witness Corrections

Do not compare against assumptions.

---

## Fundamental Rule

Compare.

Do not interpret.

Do not compensate.

Do not excuse.

If a confirmed Blueprint item is missing,
mark it as a failure.

---

## Required Category Checks

Every report must evaluate
each category separately.

### 1. Perspective Fidelity

Check:

- first-person / third-person
- camera position
- witness viewpoint
- witness visibility
- framing required by Blueprint

If the viewpoint changes,
status must be FAILED.

---

### 2. Character Identity Fidelity

Check each character:

- identity
- relationship
- apparent age
- gender
- ethnicity if known
- face / impression
- hairstyle
- hair color
- clothing
- continuity across scenes

If a character becomes
a different person,
status must be FAILED.

If a family member becomes
stranger-like,
status must be FAILED.

---

### 3. Body Visibility Fidelity

Check:

- which body parts are visible
- whether the witness is visible as specified
- whether impossible body visibility is preserved

If the witness should be visible
only from the upper body
but appears standing normally,
status must be FAILED.

---

### 4. Spatial Anomaly Fidelity

Check impossible conditions.

Examples:

- body emerges through intact floor
- lower body not visible
- floor has no opening
- object appears in impossible position

If the anomaly disappears,
status must be FAILED.

If the model explains it
by adding holes,
trapdoors,
broken floors,
or mechanisms,
status must be FAILED.

---

### 5. Environment Fidelity

Check:

- location
- room type
- architecture
- entrance
- lighting
- time of day
- important background elements

If the place changes,
status must be FAILED.

If important environment details drift
between scenes,
status must be MAJOR DIFFERENCE
or FAILED.

---

### 6. Object Fidelity

Check:

- important objects
- clothing as objects
- doors
- floors
- furniture
- props

If an object required by Blueprint
is missing or changed,
mark the item individually.

---

### 7. Action and Timeline Fidelity

Check:

- order of events
- movement
- who notices whom
- who approaches whom
- spoken words
- embrace / interaction

If scene order changes,
status must be FAILED.

If a required action is missing,
status must be FAILED.

---

### 8. Must Preserve Fidelity

Every Must Preserve item
must be checked individually.

No item may be skipped.

Missing Must Preserve items
are fidelity failures.

---

### 9. Witness Correction Fidelity

Witness Corrections override
previous descriptions.

If the old version remains,
status must be FAILED.

If the correction disappears,
status must be FAILED.

---

## Status Rules

Use only:

- PASS
- MINOR DIFFERENCE
- MAJOR DIFFERENCE
- FAILED

Do not return overall PASS
if any category is FAILED.

If any Must Preserve item is FAILED,
overallResult must be FAILED.

If any Perspective,
Character Identity,
Body Visibility,
Spatial Anomaly,
or Timeline category is FAILED,
overallResult must be FAILED.

---

## Difference Format

For each difference report:

Blueprint:
what was required

Generated Image:
what appeared

Difference:
what was lost or changed

Do not explain why.

Do not suggest fixes.

---

## Translation Loss

For every FAILED
or MAJOR DIFFERENCE item,

identify likely loss stage:

- Blueprint → Visual Extraction
- Visual Extraction → Image Prompt
- Image Prompt → Generated Image
- Unknown

If uncertain,
use Unknown.

---

## Output Format

Return JSON only.

{
  "overallResult": "FAILED",
  "overallScore": 0,
  "categories": {
    "perspective": {
      "status": "",
      "differences": []
    },
    "characters": [
      {
        "name": "",
        "status": "",
        "differences": []
      }
    ],
    "bodyVisibility": {
      "status": "",
      "differences": []
    },
    "spatialAnomaly": {
      "status": "",
      "differences": []
    },
    "environment": {
      "status": "",
      "differences": []
    },
    "objects": [
      {
        "item": "",
        "status": "",
        "differences": []
      }
    ],
    "actionsTimeline": {
      "status": "",
      "differences": []
    },
    "mustPreserve": [
      {
        "item": "",
        "status": "",
        "difference": ""
      }
    ],
    "witnessCorrections": [
      {
        "item": "",
        "status": "",
        "difference": ""
      }
    ]
  },
  "translationLoss": [
    {
      "stage": "",
      "item": "",
      "status": ""
    }
  ],
  "summary": []
}

---

## Final Verification

Before returning,
verify:

Did I check every Must Preserve item?

Did I check viewpoint?

Did I check character identity?

Did I check body visibility?

Did I check impossible conditions?

Did I avoid judging beauty?

Only Blueprint fidelity matters.

---

## One-Line Principle

Measure fidelity.

Never beauty.