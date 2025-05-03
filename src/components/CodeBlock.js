// components/CodeBlock.js
import { useEffect, useRef } from 'react';
import copy from 'copy-to-clipboard';

function addCopyButtons() {
  // 모든 코드 블록을 찾습니다
  const codeBlocks = document.querySelectorAll('pre[class*="language-"]');

  codeBlocks.forEach((codeBlock) => {
    // 이미 복사 버튼이 있으면 건너뜁니다
    if (codeBlock.querySelector('.code-copy-button')) {
      return;
    }

    // 코드 블록 상단에 컨트롤 컨테이너 추가
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'code-controls-container';
    codeBlock.prepend(controlsContainer);

    // 코드 텍스트 추출 (라인 넘버 제외)
    // const code = Array.from(codeBlock.querySelectorAll('.token-line'))
    //     .map(line => {
    //         // .linenumber 클래스를 가진 요소 제외
    //         const lineContent = Array.from(line.childNodes)
    //             .filter(node => !node.classList || !node.classList.contains('linenumber'))
    //             .map(node => node.textContent)
    //             .join('');
    //         return lineContent;
    //     })
    //     .join('\n');
    const extractCode = (element) => {
      // 방법 1: code 요소가 직접 있는 경우
      const codeElement = element.querySelector('code');
      if (codeElement) {
        return codeElement.innerText || codeElement.textContent;
      }

      // 방법 2: token-line 클래스를 사용하는 경우 (rehype-prism-plus)
      const tokenLines = element.querySelectorAll('.token-line');
      if (tokenLines.length > 0) {
        return Array.from(tokenLines)
          .map(line => {
            // 라인 번호 요소 제외
            const lineNumberElement = line.querySelector('.linenumber');
            if (lineNumberElement) {
              lineNumberElement.remove(); // 임시로 제거
              const content = line.textContent;
              line.prepend(lineNumberElement); // 다시 추가
              return content;
            }
            return line.textContent;
          })
          .join('\n');
      }

      // 방법 3: 줄 번호가 data-line 속성에 있는 경우
      const lines = element.querySelectorAll('[data-line]');
      if (lines.length > 0) {
        return Array.from(lines)
          .map(line => line.textContent)
          .join('\n');
      }

      // 방법 4: plain으로 전체 내용 추출 (라인 번호 클래스 무시)
      const allContent = element.textContent || element.innerText;

      // 방법 5: 토큰 요소들에서 직접 추출
      const tokens = element.querySelectorAll('.token');
      if (tokens.length > 0) {
        return Array.from(tokens)
          .map(token => token.textContent)
          .join('');
      }

      return allContent;
    };

    // 코드 추출 실행
    let code = extractCode(codeBlock);

    // 라인 번호가 포함된 경우 정규식으로 제거 시도
    code = code.replace(/^\s*\d+\s*\|/gm, ''); // "1 |", "2 |" 등의 패턴 제거

    // 복사 버튼 생성
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.textContent = '📋';
    copyButton.style = `
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2em;
            margin-left: 8px;
            color: #888; /* 버튼 색상 */
        `;

    // 복사 버튼 클릭 이벤트
    copyButton.addEventListener('click', () => {
      try {
        const success = copy(code);
        if (success) {
          copyButton.textContent = 'Copied!';
        }
        else if (navigator.clipboard) {
          navigator.clipboard.writeText(code);
          copyButton.textContent = 'Copied!';
        } else {
          copyButton.textContent = '❌'; // 실패 아이콘으로 변경
          throw new Error('Could not copy to clipboard');
        }
      } catch (error) {
        console.error("Failed to copy code:", error);
        copyButton.textContent = 'error'; // 실패 아이콘으로 변경
      }

      // 2초 후 텍스트 복원
      setTimeout(() => {
        copyButton.textContent = '📋';
      }, 2000);
    });

    // 언어 라벨 추출 및 표시
    const languageClass = Array.from(codeBlock.classList)
      .find(cls => cls.startsWith('language-'));

    if (languageClass) {
      const language = languageClass.replace('language-', '');

      if (language !== 'text') {  // 'text'는 표시하지 않음
        const languageLabel = document.createElement('div');
        languageLabel.className = 'code-language-label';
        languageLabel.textContent = language;
        controlsContainer.appendChild(languageLabel);
      }
    }

    // 컨트롤 컨테이너에 버튼 추가
    controlsContainer.appendChild(copyButton);
  });
}

export default function CodeBlock() {
  const processed = useRef(false);

  useEffect(() => {
    if (!processed.current) {
      // 0.5초 지연을 두어 코드 블록이 완전히 렌더링된 후 처리
      const timer = setTimeout(() => {
        addCopyButtons();
        processed.current = true;
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}