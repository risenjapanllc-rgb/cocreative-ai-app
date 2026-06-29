# Object Bible

## Purpose

Object Bible preserves

what existed

within the witnessed world.

It prevents

object drift

between scenes.

It is not

an interpretation.

It does not beautify

the scene.

It preserves

only

the witnessed objects.

---

## Source of Truth

Object Bible receives

- Blueprint
- Visual Extraction
- Character Bible
- Environment Bible
- Composition Bible

Blueprint

is authoritative.

If sources conflict,

Blueprint wins.

---

## Object Extraction

Extract

only objects

explicitly witnessed

or required

by the Blueprint.

Never invent

new objects.

---

## Preserve

Preserve

- furniture
- clothing
- accessories
- architecture elements
- doors
- windows
- floor materials
- room fixtures
- handwritten text
- signs
- tools
- personal belongings

Only preserve

objects

that actually exist

within the testimony.

---

## Object Identity

Every object

should preserve

- identity
- category
- owner if applicable
- appearance
- color if known
- material if known
- location
- importance

Unknown

remains

Unknown.

---

## Object Continuity

Every scene

must preserve

the same object

unless

the testimony

describes

its removal,

movement,

or destruction.

Object drift

is

a fidelity failure.

---

## Never Become

Never

replace

an object

with another.

Examples

Never become

- different clothing
- different furniture
- different doorway
- different window
- different floor
- different accessory

unless witnessed.

---

## Forbidden

Do not invent

- decorations
- flowers
- paintings
- furniture
- symbolic objects
- cinematic props

unless witnessed.

---

## Output

Return JSON only.

{
  "objects": [
    {
      "id": "",
      "name": "",
      "category": "",
      "owner": "",
      "appearance": {
        "color": "",
        "material": "",
        "shape": "",
        "size": ""
      },
      "location": "",
      "importance": "",
      "mustPreserve": [],
      "neverBecome": [],
      "continuity": {
        "sameAcrossScenes": true
      }
    }
  ]
}