# Co-Creative Field Architecture

## Purpose

Co-Creative Field is designed to support:

* faithful witnessing
* testimony preservation
* pattern visibility
* exploration
* expression
* emergent recognition

Recognition is not generated.

Recognition is not required.

Recognition may emerge:

* during dialogue
* after dialogue
* much later

The purpose of the system
is not to manufacture Recognition.

The purpose of the system
is to create conditions
in which Recognition may emerge.

The Co-Creative Field
supports multiple forms
of expression.

Visual Testimony Studio
is one implementation
of the Expression layer.

Its purpose
is to preserve
a witness's world
through faithful visual reconstruction.

---

## System Flow

Experience
↓
Route Detection
↓
Dialogue Engine
↓
Witness
↓
Extraction
↓
Pattern Recognition
↓
Exploration
↓
Recognition (Optional)
↓
Expression

---

## Visual Flow

Extraction
↓
Visual Extraction
↓
Witness World
↓
Event Extraction
↓
Event Timeline
↓
Importance Analysis
↓
Storyboard Intelligence
↓
Scene Planning
↓
Visual Extraction Fidelity
↓
Lock Layer
↓
Prompt Compiler
↓
Image Prompt Generator
↓
Image Generation
↓
Image Feedback Loop
↓
Image Resonance

---

## Core Layers

### Layer 1: Route Detection

Purpose:

Identify what kind of participant movement
is occurring.

Recognition should never be attempted
before route detection.

Documentation:

* route-detection.md

---

### Layer 2: Dialogue Engine

Purpose:

Select the appropriate response strategy.

Different routes require different forms
of participation.

Documentation:

* dialogue-engine-v2.md

---

### Layer 3: Witness

Purpose:

Receive testimony faithfully.

Documentation:

* cocreative-ai-standard.md

---

### Layer 4: Extraction

Purpose:

Preserve what was given.

Documentation:

* testimony-quality-standard.md

---

### Layer 5: Pattern Recognition

Purpose:

Make patterns visible.

Pattern Recognition is not Recognition.

Documentation:

* pattern-recognition.md

---

### Layer 6: Exploration

Purpose:

Support further seeing.

Do not force closure.

Documentation:

* dialogue-engine-v2.md

---

### Layer 7: Recognition

Purpose:

Support emergent recognition.

Recognition belongs
to the participant.

Recognition may not occur.

Documentation:

* recognition.md

---

### Layer 8: Expression

Purpose:

Allow discoveries to be expressed through:

* language
* image
* testimony
* reflection

Documentation:

* visual-architecture.md

---

## Dialogue Quality System

Dialogue Quality evaluates:

* Testimony Fidelity
* Witness Resonance
* Co-Seeing
* Exploration Quality
* Information Sufficiency
* Closure Readiness

Documentation:

* witness-resonance.md
* testimony-quality-standard.md

---

## Witness World Pipeline

Witness World reconstructs
a remembered world
before any image is generated.

Blueprint
↓
Bible Layer
↓
Event Extraction
↓
Event Timeline
↓
Importance Analysis
↓
Storyboard Intelligence
↓
Scene Planning
↓
Lock Layer
↓
Prompt Compiler
↓
Image Prompt Generator
↓
Image Generation
↓
Witness Reflection

The system does not decide
how many images to generate first.

It first determines
how many scenes
are required
to faithfully preserve
the witness's remembered experience.

---

## Image Quality System

Image Quality evaluates:

* Visual Extraction Fidelity
* Object Fidelity
* Character Fidelity
* Witness Fidelity
* Image Resonance

Documentation:

* visual-extraction-fidelity.md
* image-resonance.md
* image-feedback-loop.md

---

## Core Principle

Fidelity Before Beauty.

Preserve before improving.

Witness before interpreting.

Validate before generating.

Observe before modifying.

Explore before closure.

Recognition cannot be forced.

Recognition belongs
to the participant.

# Witness World Architecture

## Purpose

Witness World is the World Engine of Co-Creative Field.

Its responsibility is not to generate prompts.

Its responsibility is to faithfully understand testimony,
construct a coherent world,
support dialogue,
and provide faithful renderings of that world.

---

# High-Level Flow

```text
Experience
        ↓
Witness
        ↓
Extraction
        ↓
World Construction
        ↓
Dialogue
        ↓
World Update
        ↓
Director Decision
        ↓
Prompt Translation
        ↓
Renderer
        ↓
Witness Journal
```

---

# Core Modules

## World Builder

Constructs the initial world from testimony.

Input

- Character Bible
- Environment Bible
- Scene Bible
- Object Bible

Output

- World Model

---

## World Intelligence

Extracts faithful information from testimony.

Modules

- Character Extractor
- Relationship Extractor
- Timeline Extractor
- Emotion Extractor
- Theme Extractor
- Symbol Extractor

---

## World Updater

Updates an existing world through dialogue.

Input

- World
- Dialogue

Output

- Updated World

---

## Director Engine

Decides how the world should be witnessed visually.

Modules

- Camera Planner
- Subject Planner
- Action Planner
- Composition Planner
- Lighting Planner
- Forbidden Planner

Output

- Director Decision

---

## Prompt Translator

Translates Director Decision into renderer-specific prompts.

Supported renderers

- Gemini
- Firefly
- Imagen
- Flux

The translator never creates the scene.

It only translates.

---

## Renderer

Produces a visual window into the world.

Renderer never understands testimony.

Renderer never creates the world.

Renderer faithfully visualizes the Director Decision.

---

## Witness Journal

Records the evolution of the world.

Each entry contains

- Witness
- World Snapshot
- Dialogue
- Director Snapshot
- Image
- Recognition (optional)
- Expression (optional)

Recognition is never required.

---

# System Principle

The World Model is the single source of truth.

Every downstream component depends on the World.

No downstream component reconstructs the testimony independently.


## Design Principle

The World Model is the single source of truth.

Witness World understands testimony before any renderer is invoked.

Every downstream component serves that understanding.