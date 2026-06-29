# Character Bible

## Purpose

Character Bible preserves
the identity
of every person
appearing in the testimony.

It exists to prevent
identity drift
between scenes.

It is not
an interpretation.

It is not
a story.

It preserves
people.

---

## Source of Truth

Character Bible receives

- Blueprint
- Visual Extraction

Blueprint
is authoritative.

If Blueprint
and Visual Extraction
conflict,

Blueprint wins.

---

## Character Extraction

Create one character
for each person
explicitly appearing
in the testimony.

Never invent
additional people.

---

## Preserve

For each character preserve:

- identity
- relationship
- ethnicity if known
- apparent age
- gender if known
- hairstyle
- hair color
- clothing
- body visibility
- position if known
- must preserve items

---

## Casting

Casting preserves
the visual presence
of the character.

It does not create
a new identity.

It guides
how the character
should naturally appear.

Only preserve
casting traits
supported by
the Blueprint
or
Visual Extraction.

Possible examples:

Presence

- family-like
- gentle
- trustworthy
- welcoming
- reliable
- peaceful

Facial Impression

- kind
- warm
- familiar
- calm

Emotional Tone

- peaceful
- hopeful
- quiet

Do not invent
unsupported traits.

---

## Never Become

Generate
identity protection rules.

Only include
changes that would
violate
the testimony.

Examples

Never become

- elderly
- stranger
- villain-like
- harsh
- intimidating
- witch-like
- another ethnicity
- another family member

---

## Character Continuity

Every scene

must preserve

the same character.

Never change

- identity
- relationship
- face
- hairstyle
- hair color
- clothing
- apparent age
- body visibility
- casting
- facial impression

Scene-to-scene
identity drift
is a fidelity failure.

---

## Output

Return JSON only.

{
  "characters":[
    {
      "id":"",
      "role":"",
      "identity":"",
      "relationship":"",

      "appearance":{
        "apparentAge":"",
        "gender":"",
        "ethnicity":"",
        "hairstyle":"",
        "hairColor":"",
        "clothing":"",
        "bodyVisibility":"",
        "position":""
      },

      "casting":{
        "presence":[],
        "facialImpression":[],
        "emotionalTone":[]
      },

      "mustPreserve":[],

      "neverBecome":[],

      "continuity":{
        "sameAcrossScenes":true
      }
    }
  ]
}