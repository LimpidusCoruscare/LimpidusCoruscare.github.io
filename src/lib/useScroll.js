import { useState, useEffect } from 'react';

/**
 * 스크롤 상태를 관리하는 훅
 * @param {Object} options - 스크롤 감지 옵션
 * @param {number} options.threshold - 스크롤 감지 임계값 (픽셀)
 * @param {boolean} options.trackDirection - 스크롤 방향 감지 여부
 * @returns {Object} 스크롤 상태 객체
 */
export function useScroll({ threshold = 100, trackDirection = false } = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [direction, setDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window === 'undefined') return;

    // 초기값 설정
    setScrollY(window.pageYOffset);
    setLastScrollY(window.pageYOffset);
    setIsScrolled(window.pageYOffset > threshold);

    // 스크롤 이벤트 최적화를 위한 변수
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.pageYOffset;

      // 절대 스크롤 위치 상태 업데이트
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);

      // 스크롤 방향 감지 (옵션이 활성화된 경우)
      if (trackDirection) {
        const newDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        setDirection(newDirection);
        setLastScrollY(currentScrollY);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, trackDirection, lastScrollY]);

  return { scrollY, isScrolled, direction };
}