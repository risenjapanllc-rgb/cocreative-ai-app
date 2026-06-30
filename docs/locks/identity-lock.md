# Identity Lock

## Design Principle

The witness should immediately recognize the character as the same person.

Identity Lock does not optimize for similarity.

Identity Lock optimizes for recognition.

Every generated scene must preserve the witness's recognition of the character.

## Purpose

Identity Lock preserves the identity of every witness character across all generated scenes.

The goal is not visual similarity.

The goal is identity preservation.

---

## Why it exists

Image models naturally redesign characters.

Without explicit constraints, they may change:

* age
* face
* hairstyle
* body type
* clothing
* apparent ethnicity
* expression

This creates identity drift.

Identity Lock exists to prevent that drift.

---

## Identity Drift

Identity Drift is any unintended change that causes a witness to perceive a generated character as a different person.

Identity Drift is measured by witness recognition rather than visual similarity.

---

## Locked Attributes

The following attributes must remain identical unless the testimony explicitly describes change.

### Core Identity

* character id
* role
* relationship

### Appearance

* face
* apparent age
* hairstyle
* hair color
* body shape
* skin tone

### Clothing

* clothing
* accessories
* footwear

### Recognition

The witness should immediately recognize the character as the same person.

Not merely similar.

The same.

---

## Prompt Rule

Every image prompt must include Identity Lock before scene-specific instructions.

Identity preservation has higher priority than artistic variation.

---

## Evaluation

Identity Lock is successful when the witness immediately recognizes the generated character as the same person without explanation.

Success is determined by witness recognition, not by model confidence or visual similarity metrics.

---

## Future

Identity Lock will later support:

* multi-scene consistency
* temporal consistency
* cross-image embedding
* reference-image support



