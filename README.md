# textlint-rule-no-space-between-full-width

[![npm version](https://badge.fury.io/js/textlint-rule-no-space-between-full-width.svg)](https://www.npmjs.com/package/textlint-rule-no-space-between-full-width)

A textlint rule to disallow spaces between full-width characters.

## Why?

LLMs like Claude sometimes insert unwanted spaces between full-width Japanese characters (e.g., `コア リポジトリ` instead of `コアリポジトリ`). This rule automatically removes those spaces.

## Difference from `textlint-rule-ja-no-space-between-full-width`

The existing `textlint-rule-ja-no-space-between-full-width` (included in `textlint-rule-preset-ja-spacing`) explicitly excludes katakana compound words, allowing spaces like `カタカナ コンパウンド`. This rule does NOT exclude katakana, treating all full-width characters equally.

| Input             | ja-no-space-between-full-width | no-space-between-full-width |
| ----------------- | ------------------------------ | --------------------------- |
| `コア リポジトリ` | `コア リポジトリ` (unchanged)  | `コアリポジトリ` (fixed)    |
| `日本語 テキスト` | `日本語テキスト` (fixed)       | `日本語テキスト` (fixed)    |

## Install

```bash
npm install textlint-rule-no-space-between-full-width
```

## Usage

### Via `.textlintrc`

```json
{
  "rules": {
    "no-space-between-full-width": true
  }
}
```

### Via CLI

```bash
textlint --rule no-space-between-full-width README.md
```

## Full-width character ranges

This rule targets spaces between any of the following Unicode ranges:

- `\u3000-\u303F`: CJK symbols and punctuation
- `\u3040-\u309F`: Hiragana
- `\u30A0-\u30FF`: Katakana
- `\u4E00-\u9FFF`: CJK unified ideographs (Kanji)
- `\uFF00-\uFFEF`: Halfwidth and fullwidth forms

## License

MIT
