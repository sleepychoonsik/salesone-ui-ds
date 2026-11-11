# Tag

상태를 글자 + 옅은 바탕으로 보여주는 작은 표식이다. 버전·대상 표시는 같은 모양의 Chip을 쓴다.

| 상태 | 클래스 | 글자 / 바탕 |
|---|---|---|
| 판매중·품절해제 | `.so-tag--on` | `--brand-text` / `--brand-subtle` |
| 일시품절 | `.so-tag--paused` | `--cautionary-text` / `--cautionary-surface` |
| 판매종료 | `.so-tag--ended` | `--fg-tertiary` / `--surface-secondary` |
| 미반영·오류 | `.so-tag--error` | `--negative-text` / `--negative-surface` |

- 높이 20px, 모서리 `--radius-6`, caption2 600.
- 상태 변경은 `전 Tag → 후 Tag` 두 개로 보여준다.
