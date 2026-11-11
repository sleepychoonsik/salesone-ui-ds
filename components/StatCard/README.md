# StatCard

조회 결과를 숫자로 먼저 보여주는 요약 칸이다. 표보다 위에 둔다.

- `.so-stats`(4열 그리드, 간격 `--space-6`) 안에 `.so-stat` 2~4개.
- 라벨은 caption2(11px, `--fg-tertiary`), 값은 heading2(20px 600, tabular-nums).
- 이번 실행에서 **바뀔 것**을 세는 칸만 `--brand`로(`.so-stat--brand`). 대상 수 같은 맥락 숫자는 `--fg`.
- 아직 모르는 값은 `-`로 둔다(0과 구분).
