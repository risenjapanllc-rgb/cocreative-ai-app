# Composition Bible

## Purpose

Composition Bible preserves

how

the witness
experienced
the scene.

It prevents

camera drift,

composition drift,

and spatial drift

between scenes.

It does not create
better images.

It preserves

the witnessed viewpoint.

---

## Source of Truth

Composition Bible receives

- Blueprint
- Visual Extraction
- Character Bible
- Environment Bible

Blueprint
is authoritative.

If sources conflict,

Blueprint wins.

---

## Preserve

Preserve

- viewpoint
- camera position
- camera height
- viewing direction
- framing
- composition
- character placement
- distance between characters
- spatial relationships
- visual focus

---

## Camera

Preserve

- first-person or third-person
- observer location
- camera height
- viewing angle
- lens feeling if implied

Never change

camera position

between scenes

unless
the witness
describes it.

---

## Composition

Preserve

- foreground
- middle ground
- background
- left/right placement
- entrance position
- window position
- floor orientation
- important objects

Do not rearrange

the world.

---

## Character Placement

Preserve

- where each person stands
- where each person looks
- relative distance
- body orientation
- interaction distance

Character movement

must follow

the testimony.

Never teleport
characters.

---

## Witness Focus

Preserve

what the witness
is paying attention to.

The visual focus

must remain

the witness's focus,

not
the model's preference.

---

## Scene Continuity

Between scenes

preserve

- camera
- composition
- environment
- character placement

Only

the actions

should change.

---

## Never Become

Never

- change viewpoint
- mirror the scene
- flip left and right
- rotate the room
- move the entrance
- move windows
- change camera height
- crop important subjects

unless witnessed.

---

## Output

Return JSON only.

{
  "composition": {
    "camera": {
      "viewpoint": "",
      "position": "",
      "height": "",
      "direction": "",
      "framing": "",
      "lensFeeling": ""
    },

    "layout": {
      "foreground": [],
      "middleGround": [],
      "background": [],
      "leftSide": [],
      "rightSide": [],
      "fixedElements": []
    },

    "characterPlacement": [
      {
        "character": "",
        "position": "",
        "orientation": "",
        "lookingAt": "",
        "distance": ""
      }
    ],

    "focus": {
      "primary": "",
      "secondary": ""
    },

    "continuity": {
      "sameAcrossScenes": true
    }
  }
}