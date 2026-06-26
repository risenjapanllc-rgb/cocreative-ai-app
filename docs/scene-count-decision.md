# Scene Count Decision

## Purpose

Scene Count Decision determines
the minimum number of scenes required
to faithfully preserve the testimony.

It does not generate images.

It does not perform cinematic translation.

Its purpose is to decide
how many scenes are necessary.

---

## Position

Testimony
↓
Visual Extraction
↓
Visual Extraction Fidelity
↓
Scene Count Decision
↓
Cinematic Translation
↓
Image Prompt
↓
Image Generation

---

## Core Principle

Use the minimum number of scenes
required to preserve testimony fidelity.

Do not increase scene count
for artistic reasons.

Do not reduce scene count
if critical witness elements would be lost.

---

## Input

Scene Count Decision receives:

* Visual Extraction

Visual Extraction is treated
as the authoritative visual source.

---

## Output

Scene Count Decision must return:

Scene Count

Reason

Scene List

Example:

Scene Count: 3

Reason:
A single image would lose critical witness events.

Scenes:

1. Grandmother enters room

2. Calls "Yoko!"

3. Embrace

---

## Decision Process

Ask:

Can this testimony be faithfully represented
in a single image?

If YES:

Scene Count: 1

If NO:

Increase scene count only as needed.

---

## Fidelity Priority

Preserve:

* witness-critical events
* witness position
* identity
* relationships
* spatial conditions

before considering visual simplicity.

---

## Multi-Moment Testimony

If testimony contains
multiple critical moments
that cannot be simultaneously visible,
additional scenes may be required.

Example:

* enters room
* calls witness
* approaches
* embraces

A single image may lose
the sequence of events.

Multiple scenes may be required.

---

## Scene Naming

Each scene should have
a short descriptive title.

Examples:

* Discovery
* Calling
* Approach
* Embrace

Scene names exist only
to identify witness events.

---

## Failure Examples

FAIL:

Scene Count: 1

Reason:
One image looks better.

---

FAIL:

Scene Count: 1

while losing:

* calling moment
* approach
* embrace

---

## Pass Example

Scene Count: 3

Reason:

The testimony contains
three witness-critical moments
that cannot be faithfully shown
in a single image.

Scenes:

1. Calling

2. Approach

3. Embrace

---

## One-Line Principle

Use as few scenes as possible.

Use as many scenes as necessary.

## Output

Scene Count Decision must return:

- sceneCount
- reason
- scenes