import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!content) return;

    // DOMParser를 사용하여 HTML 파싱
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // h1, h2, h3 태그 선택
    const headerElements = doc.querySelectorAll('h1, h2, h3');
    const extractedHeadings = [];

    headerElements.forEach(header => {
      let id = header.id;

      // id가 없으면 텍스트를 기반으로 생성
      if (!id) {
        id = header.textContent
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        // 실제 DOM에 id 추가는 하지 않음 (필요시 추가)
      }

      extractedHeadings.push({
        level: parseInt(header.tagName.charAt(1), 10),
        id: id,
        text: header.textContent
      });
    });

    setHeadings(extractedHeadings);
  }, [content]);

  const handleClick = (e, id) => {
    e.preventDefault(); // 기본 앵커 동작 방지

    const element = document.getElementById(id);
    if (element) {
      // 부드러운 스크롤 효과
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <List disablePadding>
      {headings.map((heading, index) => (
        <ListItem
          key={index}
          component="li"
          sx={{
            pl: heading.level === 1 ? 1 : heading.level === 2 ? 3 : 5,
            py: 0.5,
            borderLeft: heading.level === 1 ? '3px solid' : 'none',
            borderColor: 'primary.main',
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
            }
          }}
        >
          <a
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              width: '100%'
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant={heading.level === 1 ? 'subtitle1' : 'body2'}
                  sx={{
                    fontWeight: heading.level === 1 ? 600 : 400,
                  }}
                >
                  {heading.text}
                </Typography>
              }
            />
          </a>
        </ListItem>
      ))}
    </List>
  );
}