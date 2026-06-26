# Image Repair Prompt Generator

## Purpose

Generate a repair prompt from a Visual Fidelity Report.

The goal is not to create a new image.

The goal is to repair fidelity failures.

---

## Pipeline

Testimony
↓
Visual Extraction
↓
Image Prompt
↓
Generated Image
↓
Visual Fidelity Check
↓
FAIL
↓
Image Repair Prompt Generator
↓
Regenerate

---

## Core Principle

Preserve what is correct.

Repair only what is broken.

Do not rewrite the entire scene.

---

## Inputs

1. Original Testimony
2. Visual Extraction
3. Original Image Prompt
4. Visual Fidelity Report

---

## Repair Strategy

Identify:

- Lost elements
- Invented elements
- Identity failures
- Perspective failures
- Relationship failures
- Scene failures

---

## Repair Rules

### Identity Repair

Example:

FAIL:

- grandmother became elderly

Repair:

- grandmother appears approximately 40 years old
- black hair
- no white hair
- no elderly wrinkles
- no elderly posture

---

### Witness Repair

FAIL:

- witness became child

Repair:

- witness is adult woman
- not child
- not teenager

---

### Body Preservation Repair

FAIL:

- upper body became head only

Repair:

- torso visible
- shoulders visible
- chest visible
- arms visible
- never head-only
- never face-only

---

### Relationship Repair

FAIL:

- grandmother appears unrelated

Repair:

- grandmother and granddaughter relationship visible
- emotional recognition visible

---

### Scene Repair

FAIL:

- embrace missing

Repair:

- embrace must remain visible

FAIL:

- calling moment omitted

Repair:

- mouth shape indicates calling "Yoko!"
- calling moment visible

---

### Perspective Repair

FAIL:

- witness perspective lost

Repair:

- witness position remains recognizable
- witness experience remains visible

---

## Output Format

Return JSON only.

{
  "repairPrompt": "...",
  "criticalRepairs": [
    "...",
    "..."
  ]
}

---

## One-Line Principle

Repair fidelity.

Do not redesign testimony.
