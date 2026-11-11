# Panel

세일즈원 화면 오른쪽 위에 떠 있는 자동화 패널의 틀이다. 모든 북마클릿은 이 틀 하나로 시작한다.

## 구조
- `.so-panel` > `.so-panel__head`(제목·칩·접기·닫기) + `.so-panel__body`(내용) 
- 제목 앞 `.so-panel__dot`(brand 점), 제목 뒤 버전 칩 `.so-chip`(필수, `vX.Y`)과 대상 칩 `.so-chip--neutral`(선택)
- 본문 맨 아래 `.so-panel__foot`: 보조 동작(보고 복사, CSV) `text` 버튼 + **[진단 내용 복사]** `assistive` 버튼(모든 패널 필수)

## 규칙
- 위치 `position:fixed; top:72px; right:16px; z-index: var(--z-panel)`. 헤더를 잡고 끌어 옮길 수 있게 한다.
- 너비 `--panel-width`(452px), 높이는 내용에 맞추고 최대 84vh에서 본문이 스크롤된다.
- 세일즈원(MUI) 스타일과 섞이지 않게 **Shadow DOM** 안에 그린다. `:host`에 토큰 변수 블록을 둔다.
- 그림자는 이 패널 하나에만(`--shadow-panel`). 안쪽 카드·버튼에는 그림자를 쓰지 않는다.
- 같은 패널이 이미 있으면 지우고 새로 띄운다(옛 버전 자동 교체).
