// APT 가사 (로제 & 브루노 마스)
// 실제 사용 시 곡에 맞는 가사로 교체
export const LYRICS: string[] = [
  "Uh huh uh huh",
  "아파트 아파트",
  "APT APT",
  "아파트 아파트",
  "APT APT",
  "Where we gonna go?",
  "Where we gonna go now?",
  "Kissy face, kissy face",
  "Sent to your phone",
  "But I'm tryna kiss your lips",
  "for real",
  "Red hearts, red hearts",
  "That's what I'm on",
  "Come give me somethin'",
  "I can feel",
  "Uh huh uh huh",
  "아파트 아파트",
  "Gonna make it hot",
  "in this apartment",
  "APT! APT!",
  "내가 apt 했어",
  "아 파 트",
  "APARTMENT!",
  "시험 망해라~",
  "공부 포기!",
  "학점? 몰라~",
  "F학점 가보자고",
  "시험기간에 이거 보고 있을 시간 있어?",
  "지금 이 시간에도 누군가는 공부 중",
  "근데 넌 여기 있지 ㅋㅋ",
];

export function getRandomLyric(): string {
  return LYRICS[Math.floor(Math.random() * LYRICS.length)];
}
