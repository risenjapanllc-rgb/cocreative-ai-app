# PIPELINE.md
# Witness World Processing Pipeline

## Purpose

This document defines the responsibility of every stage in the Witness World pipeline.

Each stage has one responsibility.

No stage may perform the responsibility of another stage.

If information is missing,
the stage must preserve uncertainty instead of inventing facts.

---

# Overall Flow

Dream / Testimony

↓

Visual Extraction

↓

Character Bible

↓

Environment Bible

↓

Composition Bible

↓

Object Bible

↓

Scene Bible

↓

Event Builder

↓

Timeline

↓

Director

↓

Render Contract

↓

Prompt Translator

↓

OpenAI Image API

---

# Stage 1 — Visual Extraction

## Input

Raw testimony.

## Output

Observed visual facts.

## Responsibilities

- Extract visible information.
- Preserve uncertainty.
- Record observations only.

## Forbidden

- Interpretation
- Storytelling
- Symbolism
- Theology
- Image prompting

---

# Stage 2 — Character Bible

## Input

Visual Extraction

## Output

Character definitions.

## Responsibilities

- Record witnessed people.
- Preserve identities.
- Preserve relationships.

## Forbidden

- Invent appearance
- Invent emotions
- Invent personality

---

# Stage 3 — Environment Bible

## Input

Visual Extraction

## Output

Environment definition.

## Responsibilities

- Record locations.
- Record spatial facts.
- Record atmosphere only if witnessed.

## Forbidden

- Invent scenery
- Beautify locations
- Replace locations

---

# Stage 4 — Composition Bible

## Responsibilities

Describe spatial composition.

## Forbidden

- Camera decisions
- Artistic interpretation

---

# Stage 5 — Object Bible

## Responsibilities

Record witnessed objects.

## Forbidden

- Decorative additions
- Symbolic substitutions

---

# Stage 6 — Scene Bible

## Purpose

Freeze one witnessed moment.

## Responsibilities

- Preserve facts.
- Preserve impossible conditions.
- Preserve witness fidelity.

## Forbidden

- Editing
- Interpretation
- Event creation
- Image optimization

Scene Bible is immutable.

---

# Stage 7 — Event Builder

## Responsibilities

Identify the current event occurring within the witnessed scene.

## Forbidden

- Create new events
- Predict future events
- Merge multiple events

---

# Stage 8 — Timeline

## Responsibilities

Represent only the current moment.

## Forbidden

- Future
- Flashback
- Time compression

---

# Stage 9 — Director

## Responsibilities

Choose what to observe.

Determine framing.

Determine visual emphasis.

## Forbidden

- Invent actions
- Invent poses
- Invent events
- Modify witness facts

Director is an observer, not a storyteller.

---

# Stage 10 — Render Contract

## Responsibilities

Prepare rendering instructions while preserving world facts.

## Forbidden

- Rewrite witness facts
- Simplify impossible conditions
- Modify characters for image convenience

---

# Stage 11 — Prompt Translator

## Responsibilities

Translate the Render Contract into a prompt.

Translation only.

## Forbidden

- New information
- Storytelling
- Prompt engineering that changes meaning

---

# Stage 12 — OpenAI Image API

## Responsibilities

Render the prompt.

The model may fail.

Pipeline data must never be rewritten to compensate for model behavior.

---

# Design Principle

Earlier stages define truth.

Later stages express truth.

Truth always flows forward.

Truth never flows backward.

If an image fails,

investigate the pipeline,

not the testimony.
