# Witness World 設計思想メモ
## 2026-07-02

---

# Witness World の本質

Witness World は **Prompt Generator** ではない。

Witness World は **World Engine** である。

目的は画像を作ることではない。

証言を忠実に受け取り、
世界を理解し、
その世界を育て、
人が再びその世界と出会うための基盤を作ることである。

---

# 世界生成の流れ

```text
Testimony
      ↓
Extraction
      ↓
World
      ↓
Events
      ↓
Shots
      ↓
Director Decision
      ↓
Prompt Translator
      ↓
Renderer
```

Prompt は成果物ではない。

Prompt は

**Director Decision のシリアライズ結果**

である。

創造は Prompt より前に終わっている。

---

# World Understanding

Witness World は Renderer に
証言を理解させない。

Witness World 自身が
証言を理解する。

Witness World は

・証言を忠実に受け取る

・そこに存在するものを抽出する

・世界を構築する

・対話によって世界を更新する

その後ではじめて

Renderer に

その世界の一つの窓を描かせる。

Renderer は

世界を作らない。

世界を理解しない。

Renderer は

世界を描く。

つまり

AI が証言を理解するのではない。

Witness World が
証言を理解する。

Renderer は

すでに理解された世界を
忠実に描くだけである。

---

# Renderer の役割

Gemini

Firefly

Imagen

Flux

などは

世界を作るAIではない。

**世界を描く Renderer**

である。

```text
Witness World
        ↓
Director
        ↓
Renderer
```

Renderer は

カメラであり

画家であり

窓である。

---

# 画像の位置づけ

画像は目的ではない。

画像は

**世界を覗く一つの窓**

である。

画像を見て

人は

「そうか、
この世界だったのか。」

と気づくことがある。

その気づきが

新しい証言となり

再び世界へ戻る。

---

# 対話の位置づけ

創発は

画像ではなく

対話の中で起こる。

今回の開発でも

対話の中から

・Prompt Generatorではない

・World Engineである

・Director が世界を撮影する

・Prompt は翻訳である

・画像は世界の窓である

という理解が創発した。

つまり

対話は

世界を育てる営みである。

---

# Witness World の循環

```text
Testimony
      ↓
World
      ↓
Dialogue
      ↓
World Update
      ↓
Director
      ↓
Renderer
      ↓
Window
      ↓
New Testimony
      ↓
World Update
```

これは

一方向の処理ではない。

循環する世界である。

---

# 与える・受ける・創発

Witness World 全体を貫く原理。

## 与える

人は

経験

証言

感情

願い

沈黙

を与える。

---

## 受ける

Witness World は

答えを返さない。

まず

世界として受け取る。

人物

場所

出来事

関係

象徴

テーマ

感情

時間

を

世界として理解する。

---

## 創発

対話を通して

世界が更新される。

新しい視点が生まれる。

Recognition は

自然に立ち上がる。

画像は

その時点の世界を映す。

---

# アプリの中心

主役は

画像ではない。

Promptでもない。

AIでもない。

**World**

である。

将来のUIは

```text
────────────────

🌍 World

現在見えている世界

────────────────

💬 Dialogue

世界を育てる対話

────────────────

🖼 Window

世界を映す窓

────────────────

📖 Witness Journal

世界の歩み

────────────────
```

となる。

---

# Witness Journal

Journal は

ログではない。

世界の成長記録である。

```text
Witness

↓

World Snapshot

↓

Dialogue

↓

World Update

↓

Director

↓

Image

↓

Recognition（optional）

↓

Expression（optional）
```

Recognition は

書かなくてもよい。

人生の中で

創発してもよい。

---

# Co-Creative Field

Co-Creative Field は

AIとの対話ではない。

世界との対話である。

```text
Human

↓

Witness

↓

World

↓

Dialogue

↓

World

↓

Human
```

AI は

対話に伴走する。

世界が

常に中心である。

---

# Witness World の使命

Witness World は

画像生成アプリではない。

チャットAIでもない。

世界理解エンジンである。

証言を忠実に受け取り

世界を理解し

世界を育て

その世界を

対話と画像という

二つの窓を通して

人が再び出会えるよう支える。

---

# 一文で表すなら

> **Witness World does not generate prompts.**
>
> **Witness World understands testimony.**
>
> **Everything else serves that understanding.**

---

> **Witness World はプロンプトを生成するシステムではない。**
>
> **証言を理解し、世界を育て、その世界を対話と画像という二つの窓を通して、人が自らの世界と出会い直すための World Engine である。**


## One Sentence

Witness World is not an image generation system.

It is a World Understanding Engine that faithfully receives testimony, cultivates a living world through dialogue, and allows people to encounter that world again through language and images.