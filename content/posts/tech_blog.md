---
title: "Next.js와 Github Pages를 이용하여 개인 블로그 만들기"
excerpt: ""
date: "2025-05-04"
author: "LimpidusCoruscans"
tags: ["Next.js", "React", "Blog", "MUI", "Material UI"]
coverImage: "/images/nextjs-cover.png"
---

# 주니어 백엔드 개발자의 Next.js 블로그 만들기 여정

최근 나만의 개인 기술 블로그를 만들기 위해 Next.js를 간단히 배우고 사용해보는 여정을 시작했고, 그 과정에서 배운 것들을 기록함으로써 내재화를 높이기 위해 이 글을 작성하게 되었다. 백엔드 위주의 경험이 많아 프론트엔드를 작성하는 것은 비교적 쉽지 않았으나, 이 과정에서 많은 것을 배웠고 백엔드 개발자 관점에서 프론트엔드를 고려하는 면모를 조금이나마 키울 수 있었다. 참고로 학습 및 실습은 Claude Sonnet 3.7 extended think LLM에게 Next.js 강의자의 입장에서 가르쳐달라고 요청하여 수행했다.

## 시작하게 된 계기

소프트웨어 아카데미에서 어느 기업의 현직자에게 멘토링을 받을 때, 테크 블로그를 만들어 배운 것을 기록하는 것이 공부에 매우 도움되니 권장받았다. 그리하여 블로그를 만들어야겠다는 의지가 생겼고, 개발 중 구글링하면 뜨는 여러 블로그들이 떠올랐다. Velog, Tistory 등 다양한 상용 블로그가 있지만, 개발자로서 내 기술 스택을 확장하고 싶었고, 무엇보다 내 손으로 직접 웹페이지를 만들어서 써보고 싶었다. React는 기존에 배워보고 사용해본 적이 있어서, SEO 최적화 및 SSR 등을 할 수 있는 Next.js라는 React 프레임워크를 선택하게 되었다.

## 1장: 프로젝트 개시

가장 먼저 프로젝트를 설정했는데, 이 과정에서 필요한 선택들이 많아 고민이 되었다.

```bash
npx create-next-app my-blog
```

이 단순한 명령어로 시작했지만, 이를 실행한 터미널에는 여러 질문들이 나타났다:

- TypeScript 사용 (블로그를 최대한 빨리 만들고자 내 실력이 완벽하지 않은 Typescript 사용은 보류)
- Tailwind CSS 사용 (Material You 디자인을 적용하고자 해서 거부)
- App Router와 Pages Router 중 어떤 것을 선택할까? (Pages Router가 초보자에게 더 이해하기 쉽다고 해서 선택)

## 2장: 라우팅과 레이아웃에서 겪은 혼란

2장에서는 Next.js의 파일 기반 라우팅 시스템을 이해하는 데 집중했다. 백엔드 개발자로서 Express의 라우터를 사용해 봤지만, Next.js의 방식은 완전히 다른 것이었다. 파일 이름과 구조로 라우트가 자동으로 생성된다는 개념이 처음에는 와닿지 않았다.

또한 디자인에 대한 지식이 부족해서 어려움을 겪었다. Material You 디자인을 구현하기 위해 CSS 모듈을 사용했는데, 솔직히 말하면 디자인 부분은 내가 가장 어려워했던 영역이었다. 프론트엔드 개발이 익숙치 않아서 UI/UX에 대한 감각이 부족했기 때문이다.

```jsx
// 이렇게 단순한 레이아웃 컴포넌트를 만드는 데도 많은 시간이 걸림
export default function Layout({ children, title = "기술 블로그" }) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <footer>© {new Date().getFullYear()} 주니어 개발자의 성장일기</footer>
    </div>
  );
}
```

색상 선택, 여백 조정, 반응형 디자인 등 CSS 관련 작업이 어려웠다. 이전에 React로 웹페이지를 만들 때에는 시각적 요소를 각 잡고 다루지는 않았기 때문이다. 그리하여 LLM에게 질문해가며 레이아웃을 바로잡아갔고, 이 과정에서 시행착오를 겪으며 종국에 내가 원하는 모습에 다다랐을 때는 성취감으로 기뻤다.

## 3장: 마크다운 처리

3장에서는 블로그의 핵심인 마크다운 처리 부분을 구현했다. 이 과정에서는 파일 시스템을 다루고 문자열을 처리하는 작업이 있었다.

그런데 처음부터 문제가 발생했다. Node.js의 `fs` 모듈이 클라이언트 측 JavaScript에서는 작동하지 않는 것이었다.

```javascript
// 이 코드가 브라우저에서 실행될 때 오류가 발생함함
import fs from "fs";
```

이 문제를 해결하기 위해 Next.js의 데이터 페칭 함수(`getStaticProps`, `getStaticPaths` 등`)를 더 깊이 이해해야 했다.
특히 Next.js의 데이터 페칭 함수들이 어떤 시점에 실행되는지 이해하는 것이 중요했다.

- `getStaticProps`: 빌드 시점에 실행되며 페이지에 필요한 데이터를 미리 가져온다. 이 함수는 서버 측에서만 실행되므로 브라우저 API나 클라이언트 측 코드를 포함할 수 없지만, 파일 시스템 접근이나 데이터베이스 쿼리 같은 서버 측 작업은 안전하게 수행할 수 있다.
- `getStaticPaths`: 동적 라우팅을 사용하는 페이지에서 빌드 시 생성할 경로들을 정의한다. 블로그의 각 포스트 페이지를 위해 이 함수를 사용하여 모든 가능한 slug 값을 미리 생성했다.

```jsx
// 서버 측에서만 실행되는 함수 내에서 fs 모듈을 안전하게 사용
export async function getStaticProps() {
  const fs = require("fs");
  // ...
}
```

`fs`를 클라이언트 측에서 불러서 실행하는 대신 빌드 시에 미리 해당 작업을 수행하도록 코드를 변경하였다.

## 4장: 동적 라우팅과 디자인의 심화

4장에서는 동적 라우팅을 구현했다. `[slug].js` 파일을 만들어 각 블로그 포스트를 개별 페이지로 표시하게 되었는데, 이 부분은 생각보다 쉬웠다. Next.js가 정말 직관적으로 설계되어 있다는 것을 느꼈다.

```jsx
// pages/blog/[slug].js
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
```

하지만 이번에도 CSS와 디자인 부분에서 시간을 많이 쏟았다. 반응형 레이아웃을 만들고, 다크 모드를 지원하고, 애니메이션 효과를 추가하는 과정이 쉽지 않았다. 백엔드 개발자로서 CSS에 대한 깊은 이해가 부족했기 때문이다.

### 코드 블록 하이라이팅

일단은 기술 블로그에서 중요한 코드 가독성을 위해 코드 블록 하이라이팅을 개선하는 작업을 진행하였다. 기존에 마크다운에서 제공하는 기본 코드 블록은 너무 단순하여 실제 IDE처럼 보기 좋고 사용하기 편리한 코드 블록으로 개선하고자 했다.

#### 1. 구문 강조 설정

먼저 `rehype-prism-plus` 플러그인을 사용해 구문 강조 기능을 구현했다. 이 플러그인은 다양한 프로그래밍 언어를 지원하고 라인 번호 표시 기능도 제공한다.

```javascript
// lib/posts.js
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';

// MDX 처리 부분
const mdxSource = await serialize(matterResult.content, {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug, // 헤딩에 ID 추가 (목차 기능용)
      [rehypePrismPlus, {
        showLineNumbers: true, // 라인 번호 표시
        ignoreMissing: true, // 알 수 없는 언어 무시
      }]
    ]
  }
});
```

#### 2. 코드 블록 인터랙티브 요소 추가

하지만 구문 강조만으로는 부족했다. 코드를 쉽게 복사할 수 있는 버튼이나 어떤 언어로 작성된 코드인지 표시하는 기능이 필요했다. 이를 위해 DOM 조작을 활용해 CodeBlock 컴포넌트를 구현했다.

CodeBlock 컴포넌트는 다음과 같은 주요 기능을 수행한다:

- 페이지 내 모든 코드 블록(`pre[class*="language-"]`)을 찾아 처리
- 각 코드 블록에 언어 라벨 추가 (JavaScript, Python 등 코드 언어 표시)
- 코드 복사 버튼 추가 및 클립보드 복사 기능 구현
- 라인 번호를 제외한 실제 코드만 추출하는 로직

가장 어려웠던 부분은 다양한 마크다운 렌더러에서 생성하는 HTML 구조에서 라인 번호를 제외하고 순수 코드만 추출하는 부분이었다. 이를 위해 여러 방법을 시도하는 함수를 구현했다:

```javascript
// 코드 텍스트 추출 (라인 넘버 제외)
const extractCode = (element) => {
  // 방법 1: code 요소가 직접 있는 경우
  const codeElement = element.querySelector('code');
  if (codeElement) {
    return codeElement.innerText || codeElement.textContent;
  }
  
  // 방법 2-5: 다양한 HTML 구조에서 코드 추출을 시도하는 로직
  // ...
  
  return allContent;
};
```

복사 버튼은 클릭 시 추출된 코드를 클립보드에 복사하고, 사용자에게 피드백을 제공한다:

```javascript
copyButton.addEventListener('click', () => {
  try {
    const success = copy(code); // copy-to-clipboard 라이브러리 사용
    if (success) {
      copyButton.textContent = 'Copied!';
    }
    // 대체 방법으로 Clipboard API 사용
    else if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      copyButton.textContent = 'Copied!';
    }
  } catch (error) {
    console.error("Failed to copy code:", error);
    copyButton.textContent = 'error';
  }
  
  // 2초 후 텍스트 복원
  setTimeout(() => {
    copyButton.textContent = '📋';
  }, 2000);
});
```

이 컴포넌트는 React의 useRef와 useEffect 훅을 사용해 마운트 후 한 번만 실행되도록 했다. 이로써 사용자가 코드 블록을 더 효과적으로 활용할 수 있게 되었다.

#### 3. CSS 스타일링으로 UI 개선

코드 블록의 모양과 느낌을 IDE와 유사하게 만들기 위해 CSS를 추가했다.

```css
/* 코드 블록 기본 스타일 */
pre[class*="language-"] {
  position: relative;
  margin: 1.5em 0;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 고정된 컨트롤 컨테이너 */
.code-controls-container {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 10px;
  background-color: rgba(45, 45, 45, 0.8);
  backdrop-filter: blur(4px);
  z-index: 10;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/* 언어 라벨 */
.code-language-label {
  position: static;
  margin-right: auto; /* 왼쪽 정렬 */
  background-color: transparent;
  border-radius: 0;
  text-transform: uppercase;
}

/* 코드 블록 복사 버튼 */
.code-copy-button {
  position: static;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 1;
}

.code-copy-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
```

이 스타일링 접근법의 핵심은 `position: sticky`와 `z-index`를 활용한 것이다. sticky 포지셔닝을 사용하면 컨트롤 컨테이너가 스크롤 중에도 코드 블록 상단에 고정되어 사용자가 항상 언어 유형을 확인하고 코드를 복사할 수 있다.

또한 `backdrop-filter: blur(4px)`를 적용하여 모던한 반투명 효과를 주고, 컨트롤 컨테이너가 코드 내용과 시각적으로 구분되도록 했다. 이는 macOS나 Windows의 최신 UI 디자인 트렌드와 일치하는 스타일이다.

라인 넘버 스타일링에도 신경 썼다:

```css
/* 라인 넘버 스타일링 */
.linenumber {
  user-select: none; /* 선택 방지 */
  opacity: 0.5;
  text-align: right;
  min-width: 2.5em;
  display: inline-block;
  padding-right: 1em;
  margin-right: 1em;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}
```

`user-select: none`을 적용하여 사용자가 코드를 복사할 때 라인 넘버가 함께 선택되는 것을 방지했다. 또한 라인 넘버와 실제 코드 사이에 시각적 구분을 위한 얇은 세로선을 추가했다.

최종적으로 D2Coding과 같은 프로그래밍용 고정폭 글꼴을 적용하여 코드 가독성을 높였다:

```css
@font-face {
  font-family: 'D2Coding';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/D2Coding.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.code-line {
  font-family: 'D2Coding', 'Courier New', Courier, monospace;
}
```

이러한 디자인 개선을 통해 코드 블록은 단순한 텍스트 표시 영역에서 VS Code나 IntelliJ와 같은 현대적 코드 에디터를 연상시키는 인터랙티브한 컴포넌트로 변모했다.

#### 4. 테마 적용 및 활성화

마지막으로 Prism.js 테마를 글로벌 스타일에 추가하여 코드 블록의 색상 구성을 설정했다.

```javascript
// _app.js
import "@/styles/globals.css";
import 'prismjs/themes/prism-okaidia.css';

function MyApp({ Component, pageProps }) {
  // 기존 코드 유지
  return <Component {...pageProps} />;
}
```

#### 5. 해결했던 주요 문제들

이 과정에서 몇 가지 흥미로운 문제들을 해결해야 했다:

1. **코드 추출 문제**: 처음에는 단순히 `codeBlock.textContent`로 코드를 추출했지만, 이렇게 하면 라인 번호까지 함께 복사되는 문제가 있었다. 이를 해결하기 위해 DOM 구조를 분석하고 라인 번호 요소를 제외한 내용만 추출하는 로직을 구현했다.
2. **스크롤 시 UI 위치 문제**: 코드가 길어서 가로 스크롤이 필요할 때 복사 버튼과 언어 라벨이 함께 스크롤되어 화면에서 사라지는 문제가 있었다. 이를 `position: sticky`와 `float: right` 조합으로 해결하여 스크롤과 무관하게 항상 보이도록 했다.
3. **다양한 DOM 구조 대응**: rehype-prism-plus가 생성하는 DOM 구조가 예상과 다른 경우가 있었다. 여러 DOM 구조에 대응할 수 있는 추출 로직을 구현하여 이 문제를 해결했다.

이 과정에서 DOM 조작과 React의 useEffect 훅에 대해 더 깊이 이해하게 되었다. 또한 CSS의 position 속성과 스크롤 관련 스타일링에 대한 이해도 깊어졌다. 특히 코드 추출 로직을 구현하면서 많은 시행착오를 겪었는데, 이런 문제 해결 과정이 큰 영감을 주었다.

결과적으로 IDE와 유사한 모양과 기능을 갖춘 코드 블록을 구현했으며, 이는 기술 블로그의 가독성과 사용자 경험을 크게 향상시켰다.

### 다크 모드 구현하기

디자인 심화 과정에서 제일 애 먹은 부분으로, 특히 구현 과정은 예상보다 복잡했다. 단순히 색상 팔레트를 반전시키는 것 이상으로, 사용자 선호도를 감지하고, 상태를 유지하고, 모든 컴포넌트에 테마를 적용하는 과정이 필요했다.

처음에는 React의 Context API와 useState만으로 간단히 구현했다:

```jsx
// 기본적인 테마 전환 기능
const [mode, setMode] = useState('light');

const toggleColorMode = () => {
  setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
};
```

하지만 이 방식에는 두 가지 큰 문제가 있었다:
1. 페이지를 새로고침하면 테마 설정이 초기화됨
2. 시스템 다크 모드 설정을 감지하지 못함

이 문제를 해결하기 위해 로컬 스토리지를 활용하고 시스템 설정을 감지하는 코드를 추가했다:

```jsx
// 개선된 테마 관리 코드
const [mode, setMode] = useState(() => {
  // 클라이언트 측에서만 실행
  if (typeof window !== 'undefined') {
    // 로컬 스토리지에서 저장된 테마 확인
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode) return savedMode;
    
    // 시스템 다크 모드 설정 확인
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
});

// 테마 변경시 로컬 스토리지에 저장
useEffect(() => {
  localStorage.setItem('theme-mode', mode);
}, [mode]);
```

그러나 여전히 초기 렌더링 시 깜빡임 현상이 있었다. 서버에서는 기본값인 라이트 모드로 렌더링되고, 클라이언트에서 다크 모드로 전환되면서 발생하는 문제였다.

최종적으로 next-themes 라이브러리를 도입하여 이 문제를 해결했다:

```jsx
// _app.js에 ThemeProvider 추가
import { ThemeProvider } from 'next-themes';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
```

이 라이브러리는 서버 사이드 렌더링과 클라이언트 사이드 렌더링 간의 일관성을 보장하고, 시스템 설정 감지, 로컬 스토리지 저장 등을 자동으로 처리해주어 개발 과정이 훨씬 수월해졌다.

## 5장: 새로운 도전, 기능 추가하기

5장에서는 태그 시스템, 검색 기능 등 블로그에 필요한 부가 기능들을 추가했다. 이 과정에서 React 훅의 개념을 더 깊이 이해하게 되었고, 상태 관리의 중요성을 깨달았다.

### 태그 시스템 구현

태그 시스템은 블로그 포스트를 분류하고 독자들이 관심 있는 주제를 쉽게 찾을 수 있게 해주는 중요한 기능이다. 구현 과정은 다음과 같았다:

1. 먼저 마크다운 frontmatter에 `tags` 배열을 추가하여 각 포스트의 태그를 정의했다:

```markdown
---
title: "Next.js와 Github Pages를 이용하여 개인 블로그 만들기"
date: "2023-05-03"
author: "LimpidusCoruscans"
tags: ["Next.js", "React", "Blog"]
---
```

2. `/lib/tags.js` 파일을 생성하여 태그 관련 유틸리티 함수들을 작성했다:

```javascript
// getAllTags 함수 - 모든 고유 태그 목록 가져오기
export async function getAllTags() {
  const posts = getAllPosts();
  
  // 모든 포스트에서 태그 추출하고 중복 제거
  const tags = Array.from(
    new Set(
      posts.flatMap(post => post.tags || [])
    )
  ).sort();
  
  return tags;
}

// getPostsByTag 함수 - 특정 태그가 있는 포스트만 필터링
export async function getPostsByTag(tag) {
  const posts = getAllPosts();
  return posts.filter(post => 
    post.tags && post.tags.includes(tag)
  );
}
```

3. 태그별 페이지는 동적 라우팅을 활용하여 구현했다:

```jsx
// pages/tags/[tags].js
export async function getStaticPaths() {
  const tags = await getAllTags();

  return {
    paths: tags.map((tag) => ({
      params: { tags: tag },
    })),
    fallback: false,
  };
}
```

태그 페이지 디자인에는 Material UI의 `Chip` 컴포넌트를 활용했는데, 라이트/다크 모드에 따라 태그 칩의 색상이 자동으로 변경되도록 구현했다:

```jsx
<Chip
  key={tag}
  label={`${tag} (${counts[tag]})`}
  component={Link}
  href={`/tags/${tag}`}
  clickable
  sx={(theme) => ({
    bgcolor: theme.palette.mode === 'light'
      ? 'primary.main'
      : 'background.paper',
    color: theme.palette.mode === 'light'
      ? 'white'
      : 'primary.main',
    // ...기타 스타일
  })}
/>
```

### 검색 기능 구현

검색 기능은 초기에 복잡한 검색 라이브러리를 사용할까 고민했지만, 블로그 포스트 수가 많지 않다는 점을 고려하여 클라이언트 측 검색을 구현했다.

```jsx
// 클라이언트 측 검색 로직
const [searchResults, setSearchResults] = useState([]);
const { q } = router.query; // URL에서 검색어 가져오기

useEffect(() => {
  if (!q) return;
  
  const query = q.toLowerCase();
  
  // 포스트 제목, 내용, 태그에서 검색
  const results = posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(query);
    const contentMatch = post.content.toLowerCase().includes(query);
    const tagMatch = post.tags?.some(tag => 
      tag.toLowerCase().includes(query)
    );
    
    return titleMatch || contentMatch || tagMatch;
  });
  
  setSearchResults(results);
}, [q, posts]);
```

흥미로운 점은 검색 결과를 URL 쿼리 파라미터(`?q=next.js`)에 저장함으로써 검색 결과를 공유하거나 북마크할 수 있게 한 것이다. 이를 위해 Next.js의 `useRouter` 훅을 활용했다:

```jsx
const router = useRouter();

// 검색 폼 제출 핸들러
const handleSubmit = (e) => {
  e.preventDefault();
  router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
};
```

### SEO 최적화

검색 엔진 최적화(SEO)를 위해 각 페이지에 적절한 메타 태그를 추가했다:

```jsx
<Head>
  <title>{tag} Related Posts | My Tech Blog</title>
  <meta name="description" content={`Posts about ${tag}`} />
  <meta property="og:title" content={`${tag} - My Tech Blog`} />
  <meta property="og:description" content={`Browse all posts about ${tag}`} />
  <meta property="og:type" content="website" />
  {/* 기타 SEO 태그들 */}
</Head>
```

태그 페이지와 검색 결과 페이지 모두 사용자 친화적인 UI를 구현하기 위해 노력했으며, 결과가 없을 경우 적절한 안내 메시지를 표시하도록 했다.

## 6장: 정적 사이트 배포

6장에서는 GitHub Pages를 통해 블로그를 배포했는데, 이 과정은 생각보다 복잡했다. Next.js 프로젝트를 정적 HTML로 내보내는 설정, GitHub Actions 워크플로우 설정, 커스텀 도메인 연결 등 많은 단계가 필요했다.

```javascript
// next.config.js
module.exports = {
  output: "export",
  images: {
    unoptimized: true,
  },
};
```

이 과정에서 CI/CD 파이프라인의 중요성과 배포 자동화의 가치를 더 깊이 이해하게 되었다. 백엔드 개발자로서 Github Actions를 이용한 서버 배포 경험은 있었지만, 정적 사이트 배포는 새로운 경험이었다.

여러 번의 시도 끝에 최종적으로 블로그를 성공적으로 배포했을 때 내가 만든 블로그가 실제로 인터넷에 공개되었다는 사실이 너무 설레었으며 이로 인한 기쁨은 정말 컸다.

## 앞으로의 계획

이제 첫 블로그를 만들었지만, 완벽하지는 않다고 생각된다. "여유"가 된다면 앞으로 다음과 같은걸 더 배우고 개선하고자 한다:

1. TypeScript로 코드 리팩토링하기
2. 테스트 코드 작성하기
3. 성능 최적화하기

## 회고

Next.js 블로그 개발 여정은 내게 많은 것을 가르쳐 주었다. 백엔드 개발자로서 프론트엔드 기술을 배우는 것은 처음에는 두렵고 어려웠지만, 이 과정에서 웹 개발의 전체 그림을 더 잘 이해하게 되었다.

가장 큰 깨달음은 백엔드와 프론트엔드의 경계가 점점 흐려지고 있다는 것이다. Next.js와 같은 프레임워크는 두 영역을 자연스럽게 연결해주기 때문에, 현대 개발자는 두 영역 모두에 능숙하면 경쟁력을 가질 수 있지 않을까하는 생각이 들었다.

또한 직접 만들어보는 경험의 중요성을 깨달았다. 튜토리얼을 따라하는 것과 스스로 문제를 해결하며 프로젝트를 완성하는 것은 완전히 다른 경험이었다. 실패와 좌절도 많았지만, 그 과정에서 얻은 배움이 더 값졌다.

마지막으로, 테크 블로그를 만들었으니 쉽지는 않겠지만 내가 배운 것을 정리하여 포스트로 작성하도록 노력해야겠다.
