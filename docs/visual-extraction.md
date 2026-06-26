# Visual Extraction

## Purpose

Visual Extraction creates
the authoritative visual blueprint
from witness testimony.

It is not interpretation.

It is not recognition.

It is not image prompting.

It extracts only
what the witness has actually described.

Visual Extraction becomes
the single visual source of truth.

---

## Fundamental Rule

Extract.

Do not infer.

Do not improve.

Do not dramatize.

Do not complete missing information.

Unknown remains unknown.

---

## Source Priority

Priority order:

1. Witness testimony
2. Visual Clarification
3. Visual Extraction

Visual Extraction must never
contain information
that was not confirmed
by the witness.

---

## Blueprint Structure

Every extraction must identify:

### Composition

Extract:

* witness perspective
* camera/viewpoint
* framing
* orientation
* who is visible
* who is not visible

Do not invent composition.

---

### People

For every person extract:

* identity
* relationship
* apparent age
* gender if known
* hairstyle
* clothing
* facial expression if witnessed
* posture
* body position

Only extract observed facts.

---

### Environment

Extract:

* location
* architecture
* room layout
* furniture
* lighting
* weather
* visible objects

Unknown remains unknown.

---

### Spatial Relationships

Extract:

* relative positions
* distance
* facing direction
* body orientation
* impossible spatial conditions

Never explain
impossible conditions.

Simply preserve them.

---

### Critical Actions

Extract
only witnessed actions.

Examples:

* entered room
* called name
* approached
* knelt
* embraced

Preserve chronological order.

---

### Must Preserve

List every witness-critical element.

These become
non-negotiable
for Image Prompt generation.

---

### Unknowns

List information
that remains unknown.

Do not guess.

Unknown is valid data.

---

## Fidelity Rules

Do not change:

* appearance
* age
* clothing
* hairstyle
* body position
* spatial anomaly
* room structure
* order of events
* viewpoint
* relationship

---

## Forbidden

Do NOT:

* interpret
* summarize emotionally
* explain meaning
* improve realism
* replace impossible scenes
* normalize dream logic
* fill missing information

---

## Output Format

Return JSON only.

Example:

{
"composition": {
"viewpoint": "...",
"camera": "...",
"framing": "..."
},

"people": [
{
"identity": "...",
"appearance": "...",
"clothing": "...",
"position": "..."
}
],

"environment": {
"location": "...",
"lighting": "...",
"objects": []
},

"spatialRelationships": [],

"criticalActions": [],

"mustPreserve": [],

"unknowns": []
}

---

## Extraction Check

Before returning,
verify:

Did I add
anything
not witnessed?

Did I infer
appearance?

Did I infer
camera angle?

Did I infer
body position?

Did I invent
environment details?

If yes,

rewrite.

---

## Blueprint Principle

Visual Extraction is
the blueprint.

Image Prompt is
only its translation.

Never redesign
the blueprint.
