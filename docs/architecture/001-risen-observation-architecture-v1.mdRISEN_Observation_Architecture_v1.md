# RISEN Observation Architecture v1

Version: 1.0
Status: Draft
Last Updated: 2026-07-07

---

# 1. Purpose

RISENは単なる記録システムではない。

Observation（観察事実）をKnowledge（知識）へ変換し、
AI・現場・経営・行政をつなぐ福祉Knowledge Platformを目指す。

```
Google Spreadsheet
介護ソフト
CSV
IoT
        ↓
 Observation
        ↓
 Knowledge
        ↓
 AI Reasoning
        ↓
 支援・行政・経営
```

---

# 2. Design Principles

RISENでは

- 記録そのものではなく「Observation」を保存する
- ObservationからKnowledgeを生成する
- AIは文章ではなくObservationを理解する
- 行政・委員会・AI分析を同じデータから生成する

---

# 3. Observation Model

ObservationはRISENの最小単位である。

```
Observation
├── User
├── Event Type
├── DateTime
├── Summary
├── Memo
├── Source
└── Metadata
```

Observationは事実のみを保存する。

推測・評価・分析は保存しない。

---

# 4. Knowledge Layer

Observationへ意味を付与するためのマスタ群。

## event_categories

大分類

例

- 健康
- 生活
- 支援
- 活動
- 安全
- 権利擁護
- 家族・社会
- その他

---

## event_types

出来事の意味を定義する。

例

- 睡眠
- 排泄
- 食事
- 水分
- 清潔
- 所在確認
- 事故・ヒヤリハット
- 身体拘束・行動制限レビュー

---

## event_mapper

施設固有の表現をRISEN標準へ変換する。

例

```
歯磨き
    ↓
清潔

就寝
    ↓
睡眠

廊下
    ↓
所在確認
```

Mapperは施設ごとに育てる。

コードを書き換えずに運用できることを目的とする。

---

# 5. Review Model

通常のObservationとは別に、
行政・委員会視点のレビューを管理する。

review_types例

- 医療レビュー
- 事故レビュー
- 権利擁護レビュー
- 委員会レビュー

1つのevent_typeに対して
複数review_typeを設定できる。

例

身体拘束

↓

- 権利擁護レビュー
- 委員会レビュー

転倒

↓

- 事故レビュー
- 医療レビュー

---

# 6. Tags

event_typeだけでは不足する情報を保持する。

例

```
清潔

Tags

・全介助
・一部介助
・見守り
・拒否
・本人希望
```

タグは意味を変えずに詳細情報を付加する。

---

# 7. Locations

場所情報を標準化する。

例

- 居室
- 食堂
- 廊下
- 浴室
- トイレ
- 中庭

将来的には

```
Building
Floor
Zone
```

まで管理する。

---

# 8. AI Philosophy

AIは分類器ではない。

Knowledge Builderである。

```
未分類イベント

↓

AI解析

↓

Mapper候補提案

↓

人が承認

↓

Knowledgeへ追加
```

AIは人の判断を補助する。

---

# 9. Administrative Philosophy

行政用資料を別入力しない。

Observationから自動生成する。

対象

- 身体拘束委員会
- 事故委員会
- 感染委員会
- 虐待防止委員会

---

# 10. Design Policy

RISENでは

施設ごとの差異

↓

Mapperで吸収する

制度との差異

↓

Reviewで吸収する

分析との差異

↓

Knowledgeで吸収する

AIはKnowledgeを利用する。

---

# 11. Long-term Vision

```
Observation

        ↓

Knowledge Graph

        ↓

AI Reasoning

        ↓

Recommendation

        ↓

Care Support

        ↓

Management Dashboard

        ↓

Administrative Reports
```

RISENは福祉・介護分野におけるKnowledge Platformを目指す。

---

# 12. Core Principles

RISENは

「データを保存するシステム」

ではなく

「ObservationからKnowledgeを創るシステム」

である。

AIはKnowledgeを利用し、

現場・経営・行政を支援する。

Observationは唯一の事実であり、
KnowledgeはObservationから生成される。

これをRISEN Observation Architectureの基本原則とする。