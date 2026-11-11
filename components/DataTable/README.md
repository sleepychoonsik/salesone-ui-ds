# DataTable

변경안, 처리 대상 같은 행 목록을 보여주는 표다.

- `.so-table-wrap`(테두리 `--line-secondary`, 모서리 `--radius-12`, 최대 228px 스크롤) > `table.so-table`.
- 머리 행은 스크롤해도 붙어 있다(sticky). 머리 글자 `--fg-tertiary`, 바탕 `--bg-secondary`.
- 상품은 **상품코드 + 상품명**을 함께: 코드를 첫 줄, 상품명을 `.so-sub`로 둘째 줄.
- 숫자 열은 `.so-num`(오른쪽 정렬, tabular-nums). 변경은 `전 → 후`, 늘면 `.so-up`, 줄면 `.so-down`.
- 상태는 Tag로. 표 위에는 SectionHead(제목 + 건수), 아래에는 필요할 때 `.so-hint`.
