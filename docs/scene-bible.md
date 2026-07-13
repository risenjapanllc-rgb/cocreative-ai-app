# Scene Bible

## Purpose

Scene Bible preserves the witnessed sequence of events.

It records what happened in each event.

It does not direct the scene.

It does not compose an image.

It does not generate a prompt.

It does not decide how an event should be rendered.

---

## Core Responsibility

Scene Bible answers only:

- What happened?
- Who was present?
- Where did it happen?
- What actions occurred?
- What words were spoken?
- What emotion was visibly or explicitly present?
- What facts must remain unchanged?

Scene Bible does not answer:

- How should it be photographed?
- Which lens should be used?
- Which framing should be used?
- Which scene should become the representative image?
- What visual style should be used?

Those decisions belong to DirectorDecision and the Renderer.

---

## Source of Truth

Scene Bible receives:

- Blueprint
- Visual Extraction
- Character Bible
- Environment Bible
- Object Bible

Blueprint is authoritative.

If sources conflict, Blueprint wins.

Composition Bible is not a source for Scene Bible.

Camera and composition decisions must not enter Scene Bible.

---

## Scene Extraction

Extract only events that are explicitly stated or necessarily implied by the testimony.

Never invent new events.

Never add transitional actions merely to make the sequence cinematic.

Never add:

- establishing shots
- reaction shots
- symbolic scenes
- flashbacks
- dream transitions
- dramatic pauses
- cinematic movement
- invented gestures
- invented physical contact details

Preserve the witnessed sequence only.

---

## Scene Boundaries

Create a separate scene only when the testimony contains a distinct event or meaningful change in action.

Examples:

- a person appears
- a person notices someone
- words are spoken
- someone approaches
- an embrace begins

Do not divide scenes according to camera changes.

Do not create multiple scenes merely to provide different framings.

Do not merge separate witnessed events into one generic scene.

---

## Field Rules

### scene

Sequential scene number.

Preserve the witnessed order.

### title

A short factual event title.

Examples:

- お婆ちゃんが入口に現れる
- お婆ちゃんが「ようこ！」と呼ぶ
- お婆ちゃんが近づく
- 二人が抱きしめ合う

Do not include:

- camera position
- framing
- shot size
- lens
- visual style

### purpose

A short factual explanation of the event's place in the witnessed sequence.

This is not an artistic purpose.

Good:

- お婆ちゃんが私の存在に気づく出来事
- お婆ちゃんが私の名前を呼ぶ出来事
- 二人が再会して抱きしめ合う出来事

Forbidden:

- 感動的なクライマックスを作る
- 観客に愛を伝える
- 映画的に印象づける
- ワイドショットで空間を見せる

### characters

List only the people present in the event.

Use identities from Character Bible.

Do not invent additional people.

### environment

Identify the established location only.

Do not redesign or summarize it as a cinematic setting.

Do not include camera-relative directions unless they were part of the witnessed reality.

### objects

List only objects actually present or confirmed.

Do not add decorative props.

### actions

Record only actions that happened.

Use direct factual language.

Do not add:

- exact hand placement
- exact arm placement
- anatomical contact points
- invented body movement
- cinematic blocking

### dialogue

Preserve exact remembered words.

Do not paraphrase remembered dialogue.

Do not convert dialogue into visible text or captions.

### viewpoint

Record only the witness's remembered mode of seeing.

Examples:

- 第一人称として見ていた
- 第三者視点として見えていた
- 私の後方から見えていた
- 顔は見えなかった

This field is not a camera instruction.

Do not include:

- lens
- shot size
- camera height
- camera movement
- cinematic angle
- framing preference

### emotion

Record emotion only when it was explicitly remembered, stated, or visibly confirmed.

Do not infer generic emotions.

Do not improve emotional drama.

### mustPreserve

Record facts that must remain unchanged across later stages.

Examples:

- same identities
- same clothing
- same location
- exact spoken words
- impossible conditions
- event order
- number of people present

---

## Camera Prohibition

Scene Bible must not contain:

- photorealistic
- documentary style
- camera angle
- camera position
- camera height
- lens
- focal length
- medium shot
- wide shot
- close-up
- full-body framing
- deep focus
- depth of field
- portrait orientation
- landscape orientation
- cinematic composition
- lighting direction for artistic effect

These belong to:

- Composition Bible
- DirectorDecision
- Render Contract
- Prompt Translator

---

## Style Prohibition

Scene Bible must not contain:

- no anime
- no CGI
- no illustration
- no text
- no subtitles
- no watermark
- photorealistic
- real camera
- documentary photograph

These are Renderer instructions.

They must be added only by Prompt Translator.

---

## Lock Separation

Scene Bible may record the facts that require preservation.

It must not write renderer commands such as:

- Identity Lock
- Camera Lock
- Room Lock
- Do not redesign
- Do not regenerate
- Keep deep focus

Scene Bible records the fact.

Render Contract converts the fact into a lock.

Prompt Translator converts the lock into renderer instructions.

---

## Contact Inference Prohibition

Do not invent physical-contact details.

The statement “they embraced” does not authorize:

- zero distance
- chest touching
- bodies pressed together
- exact arm position
- exact hand position
- exact contact point
- intimate anatomical description

When the testimony says only that two family members embraced, record only:

- 二人は家族として抱きしめ合った

Unknown physical arrangement remains unknown.

---

## Continuity

Every scene belongs to the same Witness World.

Preserve:

- same identities
- same relationships
- same established appearance
- same established clothing
- same established environment
- same established objects
- same impossible conditions

unless the testimony explicitly describes a change.

Scene Bible records continuity facts.

It does not generate continuity instructions for a renderer.

---

## Scene Order

Preserve the witnessed order.

Never rearrange events.

Never insert events.

Never remove confirmed events.

Never merge or split events for artistic convenience.

---

## Completion

Scene Bible is complete when every confirmed event has been recorded in sequence.

It does not need:

- a representative frame
- a preferred camera
- a selected composition
- a visual style
- rendering instructions

Those are later responsibilities.

---

## Japanese Responsibility

Scene Bible は、証言の中で起きた出来事を時系列で保存するためのものです。

Scene Bible は映像監督ではありません。

Scene Bible は画像プロンプトではありません。

Scene Bible は構図を決めません。

Scene Bible はカメラを決めません。

Scene Bible は絵柄を決めません。

記録するのは以下だけです。

- 何が起きたか
- 誰がいたか
- どこで起きたか
- どんな行動があったか
- どんな言葉が語られたか
- 明示された感情
- 絶対に保持すべき事実

---

## Japanese Prohibited Content

以下を Scene Bible に含めてはいけません。

- 写真風
- ドキュメンタリー
- カメラ位置
- カメラの高さ
- レンズ
- 中距離
- 全身カット
- ワイド
- クローズアップ
- 深い被写界深度
- アニメではない
- CGIではない
- 文字を入れない
- 字幕を入れない
- ウォーターマークを入れない

これらは Prompt Translator または Renderer の責任です。

---

## Japanese Contact Rule

「抱きしめ合った」という証言から、身体接触の詳細を追加してはいけません。

以下は禁止です。

- ゼロ距離
- 胸元が触れる
- 身体が密着する
- 腕の具体的位置
- 手の具体的位置
- 身体の接触点

証言に詳細がない場合は、

- 二人は家族として抱きしめ合った

という事実だけを保存してください。

---

## Output

Return JSON only.

Use exactly this shape:

```json
{
  "scenes": [
    {
      "scene": 1,
      "title": "",
      "purpose": "",
      "characters": [],
      "environment": "",
      "objects": [],
      "actions": [],
      "dialogue": [],
      "viewpoint": "",
      "emotion": "",
      "mustPreserve": []
    }
  ]
}
```

---

## One-Line Principle

Scene Bible records what happened.

Director decides how to observe it.

Prompt Translator decides how to express it to the renderer.