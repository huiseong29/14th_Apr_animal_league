// 볼륨 설정
export const INITIAL_GAIN = 0.3;
export const GAIN_INCREMENT = 0.2;
export const MAX_GAIN = 3.0;

// 가사 생성 설정
export const INITIAL_LYRIC_INTERVAL = 800; // ms
export const MIN_LYRIC_INTERVAL = 150; // ms
export const LYRIC_SPEED_MULTIPLIER = 0.75; // 가짜 버튼 클릭마다 interval에 곱함

// 버튼 설정
export const INITIAL_FAKE_BUTTONS = 6;
export const BUTTONS_PER_CLICK = 2; // 클릭당 추가되는 가짜 버튼 수
export const MAX_FAKE_BUTTONS = 30;

// 안무 영상 설정
export const INITIAL_DANCE_VIDEOS = 1;
export const VIDEOS_PER_CLICK = 1;
export const MAX_DANCE_VIDEOS = 8;
export const MIN_VIDEO_SIZE = 80; // px
export const MAX_VIDEO_SIZE = 200; // px

// 네온 색상
export const NEON_COLORS = [
  "#ff006e",
  "#fb5607",
  "#ffbe0b",
  "#3a86ff",
  "#8338ec",
  "#06d6a0",
  "#ff5ebc",
  "#00f5d4",
  "#fee440",
  "#f72585",
];

// 가짜 닫기 버튼 텍스트
export const FAKE_BUTTON_LABELS = [
  "X",
  "닫기",
  "CLOSE",
  "종료",
  "Stop",
  "멈춰!",
  "EXIT",
  "끄기",
  "OFF",
  "제발...",
  "그만!",
  "STOP IT",
  "살려줘",
  "나가기",
  "취소",
];

// 안무 영상 파일 (public/videos/ 에 배치)
export const DANCE_VIDEO_FILES = [
  "/videos/dance-1.webm",
  "/videos/dance-2.webm",
  "/videos/dance-3.webm",
];
