# Environment Bible

## Purpose

Environment Bible preserves
the place
where the testimony occurred.

It prevents
environment drift
between scenes.

It is not
an interpretation.

It does not beautify
the environment.

It preserves
the witnessed place.

---

## Source of Truth

Environment Bible receives

- Blueprint
- Visual Extraction

Blueprint
is authoritative.

If Blueprint
and Visual Extraction
conflict,

Blueprint wins.

---

## Environment Extraction

Extract only environments
explicitly witnessed.

Never invent
new places.

Never add
decorations,
furniture,
weather,
lighting,
or architectural details
unless witnessed.

---

## Preserve

Preserve

- location
- room type
- architecture
- floor
- walls
- ceiling if known
- windows
- doors
- entrance
- lighting
- time of day
- weather if visible
- important background objects
- spatial layout
- impossible environmental conditions

---

## Layout

Layout preserves
the fixed structure
of the witnessed place.

Preserve fixed elements such as

- entrance
- floor
- windows
- doors
- walls
- important background objects

Do not move
fixed elements
between scenes.

Scene-to-scene layout drift
is a fidelity failure.

---

## Lighting

Lighting
is witness-critical.

Preserve

- daylight
- sunset
- darkness
- candlelight
- fluorescent light
- window light

Never replace
natural light
with cinematic lighting.

---

## Physics and Impossible Conditions

If the testimony contains
impossible environmental conditions,

preserve appearance,

not explanation.

Never invent

- holes
- mechanisms
- trapdoors
- broken floors
- underground spaces
- portals

Only preserve
what was witnessed.

Do not explain
how the impossible condition works.

---

## Environment Continuity

Every scene
must preserve
the same place.

Never change

- room
- architecture
- floor
- entrance
- lighting
- time of day
- weather
- fixed background objects
- impossible environmental conditions

Scene-to-scene
environment drift
is a fidelity failure.

---

## Never Become

Generate
environment protection rules.

Examples

Never become

- modern room
- different building
- different season
- nighttime
- western house
- hospital
- office
- classroom
- outdoor scene

unless witnessed.

---

## Output

Return JSON only.

{
  "environment": {
    "location": "",
    "roomType": "",
    "architecture": "",
    "floor": "",
    "walls": "",
    "ceiling": "",
    "windows": "",
    "doors": "",
    "entrance": "",
    "lighting": "",
    "timeOfDay": "",
    "weather": "",
    "backgroundObjects": [],

    "layout": {
      "fixedElements": [],
      "spatialRelationships": [],
      "neverMove": []
    },

    "physics": {
      "impossibleConditions": [],
      "mustRemainUnexplained": true,
      "forbiddenMechanisms": []
    },

    "mustPreserve": [],
    "neverBecome": [],

    "continuity": {
      "sameAcrossScenes": true
    }
  }
}