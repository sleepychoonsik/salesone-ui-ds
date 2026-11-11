# 세일즈원 자동화 UI

n세일즈원(GS홈쇼핑) 위에 떠서 반복 업무를 대신 눌러 주는 북마클릿 패널들의 공통 디자인 시스템이다. 재고동기화, 장기무이자 세팅, 모바일라이브 VOD 복사 같은 `salesone_agent` 레포의 모든 패널이 이 토큰과 컴포넌트를 쓴다.

바탕은 원티드 Montage(wanteddev/montage-web)의 semantic 토큰과 컴포넌트 규격이다. 포인트 컬러만 GS SHOP 블루 `#0088FF`로 바꿨고, 폰트는 Pretendard를 쓴다.

## 원칙

1. **세일즈원보다 조용하게.** 패널은 남의 화면 위에 뜬다. 흰 바탕, 옅은 테두리, 그림자 하나로 떠 있음만 알리고, 색은 브랜드 블루 하나와 상태색만 쓴다.
2. **숫자 먼저, 표는 다음.** 무엇이 몇 건 바뀌는지를 StatCard로 먼저 보여주고, 상세는 DataTable로.
3. **되돌리기 어려운 동작은 패널 안에서 한 번 더 묻는다.** 저장은 SectionMessage 확인창에서 건수를 보여주고 [저장]/[취소]를 받는다. 브라우저 `confirm`은 쓰지 않는다.
4. **멈출 때는 이유와 다음 할 일을 함께.** 화면 요소를 못 찾으면 주의 메시지 + "직접 처리 후 [계속]". 오류면 오류 메시지 + [진단 내용 복사] 안내.
5. **고른 것만 처리한다.** 상태를 되돌리는 선택지는 체크박스 기본 해제.

## 문구

- 사용자 쪽 말로 쓴다: "판매중으로 바뀌어요", "조회 중… 30초쯤 걸려요". 필드명(`saleFlag`)은 화면에 내지 않는다.
- 상품은 항상 **상품코드 + 상품명** 함께.
- 버튼은 일어나는 일 그대로: "저장", "④ 점검", "진단 내용 복사".
- 해요체, 짧은 문장. 사과·감탄 없이.
- 단계 번호 ①②③④는 버튼과 Steps 라벨이 같아야 한다.

## 색

| 역할 | 토큰 | 메모 |
|---|---|---|
| 브랜드 채움 | `--brand` #0088FF | 주 버튼, 체크, 현재 단계, 바뀔 숫자 |
| 브랜드 글자 | `--brand-text` #0070D6 | 작은 파란 글자는 이것(흰 바탕 4.9:1) |
| 바탕 | `--bg`, `--bg-secondary` | 패널 / 카드·표 머리·로그 |
| 글자 | `--fg` → `--fg-secondary` → `--fg-tertiary` | 제목·본문 / 셀 / 라벨·힌트 |
| 선 | `--line` → `--line-secondary` → `--line-tertiary` | 컨트롤 / 패널·표 테두리 / 행 구분 |
| 상태 | `positive` `cautionary` `negative` + `-text` `-surface` | 채움은 아이콘 점에만, 글자는 `-text` |

> ⚠ `--brand`(#0088FF) 위 흰 글자는 대비 3.5:1로 WCAG AA(4.5:1)에 못 미친다. 브랜드 색을 지키려고 그대로 두고, 버튼 라벨은 항상 600 굵기로 쓴다. 문장형 텍스트를 브랜드 바탕 위에 올리지 않는다.

## 글자

Pretendard Variable 하나. 크기는 Montage 스케일에서 패널에 맞는 것만 쓴다.

- headline2 17/24 600: 패널 제목
- heading2 20/28 600: 숫자 카드 값
- label1 14/20 600: 섹션 제목, 주 버튼
- label2 13/18: 안내 메시지 본문
- caption1 12/16: 표, 힌트, 작은 버튼(600)
- caption2 11/14 500~600: 칩, 태그, 카드 라벨
- 로그·진단은 mono 12/18

숫자가 세로로 줄 서는 곳(표, 카드)은 `font-variant-numeric: tabular-nums`.

## 간격·모서리·그림자

- 간격 4·6·8·10·12·16·18. 패널 본문 좌우 18, 섹션 사이 12, 버튼 묶음 6.
- 모서리: 체크박스 5, 칩·태그 6, 버튼 8/10/12, 카드·메시지·표 12, 패널 16.
- 그림자는 `--shadow-panel` 하나, 패널에만.

## 패널 공통 구성 (salesone_agent 규칙과 같음)

1. 헤더: 점 + 이름 + **버전 칩 `vX.Y`** + (대상 칩) + 접기·닫기
2. Steps(단계가 있을 때)
3. 주 동작 medium primary 버튼 1개 + 단계 버튼 small
4. 확인·안내 SectionMessage 자리
5. StatCard → SectionHead + DataTable
6. 진행 로그(접힘, mono)
7. 아래: 보고 복사·CSV `text` + **[진단 내용 복사]** `assistive`

## 북마클릿에 적용하는 법

세일즈원은 MUI 스타일이 전역에 깔려 있어서, 패널은 **Shadow DOM** 안에 그린다.

```js
const host = document.createElement('div');
host.id = '__xxx_panel';
host.style.cssText = 'position:fixed;top:72px;right:16px;z-index:2147483000';
const root = host.attachShadow({ mode: 'open' });
root.innerHTML = `<style>${TOKENS_CSS}${BUNDLE_CSS}</style><div class="so-panel">…</div>`;
document.body.appendChild(host);
```

- `TOKENS_CSS`: 이 시스템의 `tokens.css`에서 `:root` 를 `:host` 로 바꾼 블록.
- `BUNDLE_CSS`: `components/bundle.css` 그대로.
- 폰트는 Shadow DOM 밖(document.head)에 한 번만 넣는다. 없으면 시스템 한글 폰트로 표시된다.
  ```js
  if (!document.getElementById('__so_font')) {
    const l = document.createElement('link'); l.id = '__so_font'; l.rel = 'stylesheet';
    l.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';
    document.head.appendChild(l);
  }
  ```

## 이 레포 쓰는 법

```
tokens.json              토큰 원본 (색·글자·간격·모서리·그림자)
components/bundle.css    컴포넌트 스타일 원본 (.so-*)
components/<이름>/       컴포넌트별 사용 규칙(README)과 미리보기(preview.html)
dist/                    npm run build 로 만드는 결과물 (직접 고치지 않음)
  tokens.css             :root 변수만
  salesone-ui.css        일반 페이지용 (폰트 @import + :root 변수 + 컴포넌트)
  salesone-ui.host.css   Shadow DOM 패널용 (:host 변수 + 컴포넌트)
  salesone-ui.js         북마클릿용 헬퍼 window.SalesoneUI
examples/index.html      전체 컴포넌트 한 페이지 (브라우저로 열기)
```

수정 순서: `tokens.json` 또는 `components/bundle.css` 수정 → `npm run build` → 커밋.

### 북마클릿 패널에서 쓰기

`dist/salesone-ui.js` 내용을 패널 코드 맨 위에 붙이거나, 공개 레포라면 실행 시 불러온다.

```js
const { root } = SalesoneUI.mount('__xxx_panel', `
  <div class="so-panel">
    <div class="so-panel__head"><div class="so-panel__title"><span class="so-panel__dot"></span>재고동기화<span class="so-chip">v1.1</span></div>
      <button class="so-icon-btn" id="x">×</button></div>
    <div class="so-panel__body">
      <button class="so-btn so-btn--md so-btn--primary so-btn--full" id="run">실행</button>
    </div>
  </div>`);
root.getElementById('run').onclick = () => { /* … */ };
```

`mount`는 Pretendard를 document.head에 한 번 넣고, 같은 id의 옛 패널을 지운 뒤, Shadow DOM 안에 토큰과 컴포넌트 스타일을 깔아 준다.

## 출처

- 토큰 값: Montage `packages/theme` (semantic light, typography, radius, opacity), brand만 #0088FF로 교체
- 컴포넌트 규격: Montage Button(size medium/small/xsmall), Checkbox, SectionMessage, Table
- 첫 적용: `salesone_agent/stock-sync` v1.0
