// 인메모리 세션 스토어 (해커톤용 - EC2 단일 인스턴스)
// globalThis에 붙여서 dev 핫리로드에서도 유지

interface Session {
  id: string;
  freed: boolean;
  createdAt: number;
  clickCount: number;
  volumePercent: number;
}

// globalThis에 세션맵 유지 (dev 핫리로드 대응)
const globalForSessions = globalThis as unknown as {
  __sessions?: Map<string, Session>;
};

if (!globalForSessions.__sessions) {
  globalForSessions.__sessions = new Map<string, Session>();
}

const sessions = globalForSessions.__sessions;

export function createSession(): Session {
  const id = generateId();
  const session: Session = {
    id,
    freed: false,
    createdAt: Date.now(),
    clickCount: 0,
    volumePercent: 10,
  };
  sessions.set(id, session);
  return session;
}

export function getSession(id: string): Session | undefined {
  return sessions.get(id);
}

export function freeSession(id: string): boolean {
  const session = sessions.get(id);
  if (session) {
    session.freed = true;
    return true;
  }
  return false;
}

export function updateSession(
  id: string,
  data: { clickCount?: number; volumePercent?: number }
): void {
  const session = sessions.get(id);
  if (session) {
    if (data.clickCount !== undefined) session.clickCount = data.clickCount;
    if (data.volumePercent !== undefined) session.volumePercent = data.volumePercent;
  }
}

function generateId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
