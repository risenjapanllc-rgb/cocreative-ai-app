# Co-Creative Field v1 Review

## Finding 001

### Q1 should identify scenes, not categories

Current fallback Q1:

1. 最初に強く印象に残った場面
2. 感情が大きく動いた場面
3. もう一度見つめたい場面

Problem:

These are not scenes.
They are abstract categories.

The purpose of Q1 is to help the user select a concrete moment within the experience.

### Example

Dream:

保険会社に勤めていて「お高く止まっている」と指摘される夢。

Current Q1:

1. 最初に強く印象に残った場面
2. 感情が大きく動いた場面
3. もう一度見つめたい場面

Improved Q1:

1. 「お高く止まっている」と指摘された瞬間
2. 「だから飲み会に誘われない」と言われた瞬間
3. 「仕事に来ているだけだ」と言い返した瞬間
4. 相手が去っていった瞬間

Conclusion:

Q1 should always present concrete scenes extracted from the experience.

The role of Q1 is not emotional analysis.

The role of Q1 is scene selection.

---

Status:

Accepted as a design principle for future versions.

Target:

v1.1.1 Scene Extraction Q1

---

## Finding 002

### Meaning and Inquiry are not the same

Current model:

Q1 → Scene  
Q2 → Emotion  
Q3 → Meaning

Observation:

Some experiences do not produce meaning at Q3.

Instead, they produce a living question.

Example:

Core Moment:
「お高く止まっている」と指摘された瞬間

Emotional Core:
視線

Q3 Response:
「どうしてこう言われるのか」

This response is not yet meaning.

It is an inquiry.

Proposed Structure:

Core Meaning:
(when a meaning has emerged)

or

Core Inquiry:
(when the user remains inside a question)

Future Direction:

When a Core Inquiry is detected, the field may continue with an additional question instead of forcing a meaning prematurely.


---

## Finding 003

### Underlying State can emerge from Inquiry

Observation:

Some experiences do not immediately reveal meaning.

Instead, they first reveal a question.

Example:

Core Inquiry:
「なんでそう言われるのだろう」

The inquiry itself pointed toward an underlying state.

Emergent State:

「誤解され、理解されないことへの困惑」

Insight:

The field should not only identify meanings.

It should also help reveal the emotional or subjective state hidden beneath an inquiry.

Possible Flow:

Experience
→ Scene
→ Emotion
→ Inquiry
→ Underlying State
→ Meaning

Example Path:

「なんでそう言われるのだろう」
↓
困惑
↓
誤解され、理解されない感覚
↓
理解への願い

Status:

Accepted as an emerging design principle.

Target:

v1.1.3 Underlying State Extraction
