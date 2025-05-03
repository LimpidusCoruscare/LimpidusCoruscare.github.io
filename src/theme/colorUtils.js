// 미묘한 색상 변형을 생성하는 유틸리티 함수

// 색상을 RGB로 변환
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

// RGB를 Hex로 변환
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// 색상 밝게/어둡게 하기
export function adjustBrightness(hex, percent) {
  const rgb = hexToRgb(hex);
  const factor = percent / 100;

  // RGB 값 조정
  const r = Math.max(0, Math.min(255, Math.round(rgb.r + (factor * 255))));
  const g = Math.max(0, Math.min(255, Math.round(rgb.g + (factor * 255))));
  const b = Math.max(0, Math.min(255, Math.round(rgb.b + (factor * 255))));

  return rgbToHex(r, g, b);
}

// Material You 스타일 팔레트 생성
export function generateMaterialYouPalette(primaryColor) {
  return {
    main: primaryColor,
    light: adjustBrightness(primaryColor, 15),  // 밝은 버전
    dark: adjustBrightness(primaryColor, -15),   // 어두운 버전
    container: adjustBrightness(primaryColor, 45),  // 컨테이너 색상 (매우 밝음)
    onContainer: adjustBrightness(primaryColor, -35), // 컨테이너 위 텍스트 색상 (어두움)
  };
}

// 보조 색상 생성 (보색 기반)
export function generateComplementaryColor(hex) {
  const rgb = hexToRgb(hex);
  const r = 255 - rgb.r;
  const g = 255 - rgb.g;
  const b = 255 - rgb.b;

  return rgbToHex(r, g, b);
}