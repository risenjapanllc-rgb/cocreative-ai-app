# visual-extraction-fidelity.md

## Purpose

Verify that Visual Extraction preserves witness testimony before image generation.

The purpose is not to improve image quality.

The purpose is to detect Witness Fidelity loss before Image Prompt generation.

---

## Principle

Witness before interpreting.

Preserve before improving.

Visual Extraction must preserve testimony before preparing image generation.

---

## Position

Testimony
↓
Witness Resonance
↓
Recognition
↓
Visual Extraction
↓
Visual Extraction Fidelity
↓
Image Prompt
↓
Generated Image

---

## Audit Categories

### 1. Character Fidelity

Verify that character attributes remain faithful to testimony.

#### PASS Example

Testimony:

* young grandmother
* approximately 40 years old

Extraction:

* young grandmother
* approximately 40 years old appearance

Result:

PASS

#### FAIL Example

Testimony:

* young grandmother

Extraction:

* elderly woman

Result:

FAIL

Reason:

Social stereotype replaced testimony.

---

### 2. Relationship Fidelity

Verify that relational identity remains faithful to testimony.

#### PASS Example

Testimony:

* grandmother

Extraction:

* grandmother

Result:

PASS

#### FAIL Example

Extraction:

* middle-aged woman

Result:

FAIL

Reason:

Relationship removed.

---

### 3. Spatial Fidelity

Verify that spatial conditions remain faithful to testimony.

#### PASS Example

Testimony:

* only the witness emerges from the tatami

Extraction:

* only the witness emerges from the tatami surface

Result:

PASS

#### FAIL Example

Extraction:

* both characters emerge from the tatami

Result:

FAIL

Reason:

Witness-specific condition generalized.

---

### 4. Perspective Fidelity

Verify that witness position remains faithful to testimony.

#### PASS Example

Testimony:

* witness experiences the scene directly

Extraction:

* first-person witness perspective

Result:

PASS

#### FAIL Example

Extraction:

* medium shot showing both characters

Result:

FAIL

Reason:

Witness position replaced by observer camera.

---

### 5. Event Fidelity

Verify that witness events remain faithful to testimony.

#### PASS Example

Testimony:

* grandmother says "Yoko!"

Extraction:

* grandmother calls out:
  "Yoko!"

Result:

PASS

#### FAIL Example

Extraction:

* greeting omitted

Result:

FAIL

Reason:

Witness event removed.

---

## Result Levels

### PASS

All witness-critical elements preserved.

Proceed to Image Prompt.

---

### CONDITIONAL PASS

Minor simplification present.

No witness-critical loss.

Proceed with warning.

---

### FAIL

Witness-critical element lost.

Return to Visual Extraction.

Do not proceed to Image Prompt.

---

## Witness-Critical Elements

Elements explicitly stated in testimony have priority over default assumptions.

Examples:

* young grandmother
* witness-only emergence from tatami
* first-person witness perspective
* spoken name ("Yoko!")
* specific clothing
* specific spatial anomaly

These elements must not be removed without explicit justification.

---

## Core Rule

Visual Extraction is not image planning.

Visual Extraction is testimony preservation for image generation.
