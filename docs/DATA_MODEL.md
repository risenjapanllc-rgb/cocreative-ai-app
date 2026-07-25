# DATA_MODEL.md
# Witness World Data Model

## Purpose

This document defines the meaning of every major data structure.

It describes semantics, not implementation.

TypeScript defines syntax.

This document defines meaning.

---

# Design Principles

Every model represents one layer of truth.

Earlier models describe witnessed reality.

Later models prepare that reality for rendering.

No model may rewrite an earlier model.

Truth flows forward only.

---

# Visual Extraction

## Purpose

Extract observable information from testimony.

## Contains

- visible facts
- spatial facts
- observed actions
- uncertainty

## Never Contains

- interpretation
- theology
- symbolism
- assumptions

---

# Character Bible

## Purpose

Define witnessed people.

## Contains

- identifier
- witnessed appearance
- witnessed relationships
- witnessed attributes

## Never Contains

- personality
- hidden intentions
- invented emotions
- invented history

---

# Environment Bible

## Purpose

Define witnessed environments.

## Contains

- locations
- weather
- lighting
- spatial layout

## Never Contains

- artistic enhancement
- replacement scenery

---

# Composition Bible

## Purpose

Describe spatial arrangement.

## Contains

- subject positions
- relative distances
- orientation

## Never Contains

- camera movement
- cinematic interpretation

---

# Object Bible

## Purpose

Record witnessed objects.

## Contains

- object identity
- object location
- object state

## Never Contains

- symbolic meaning
- decorative additions

---

# Scene Bible

## Purpose

Freeze one witnessed scene.

## Contains

- people
- environment
- objects
- impossible conditions
- witnessed facts

## Never Contains

- future
- interpretation
- symbolism
- generated content

Scene Bible is immutable.

---

# Event

## Purpose

Represent one event occurring in the current scene.

## Contains

- event description
- participating entities

## Never Contains

- future events
- inferred events

---

# Timeline

## Purpose

Represent only the current moment.

## Contains

- current event
- current state

## Never Contains

- future
- flashback
- merged scenes

---

# Director Decision

## Purpose

Select what should be shown.

## Contains

- framing
- emphasis
- mustShow

## Never Contains

- invented facts
- rewritten witness

---

# Render Contract

## Purpose

Transfer witness truth to rendering.

## Contains

- world facts
- render instructions
- must preserve conditions

## Never Contains

- rewritten witness
- image optimizations that change facts

---

# Prompt

## Purpose

Translate Render Contract into natural language.

## Contains

- rendering description

## Never Contains

- additional story
- invented symbolism
- hidden assumptions

---

# Image

## Purpose

Visual interpretation produced by the model.

## Important

The generated image is NOT truth.

The image is only one possible rendering.

If the image differs from the witness,

the witness remains authoritative.

Never rewrite the Witness World to match an image.
