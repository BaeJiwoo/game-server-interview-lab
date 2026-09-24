# Game Server Interview Lab

게임 서버 프로그래머 취업을 위한 **자율 학습 + 기술 면접 훈련 저장소**입니다.

이 저장소의 목표는 지식을 많이 적는 것이 아니라 아래 사이클을 반복하는 것입니다.

> **질문 받기 → 제한 시간 안에 답하기 → 꼬리질문 대비 → 구현/근거 확인 → 회고 → 복습**

## 사용 방법

1. 이 저장소를 GitHub에 올립니다.
2. `Actions`를 활성화합니다.
3. `.github/workflows/daily-study.yml`을 한 번 `Run workflow`로 실행합니다.
4. 이후 매일 오전 7시(KST)에 `Daily Interview` Issue가 자동 생성됩니다.
5. Issue 본문에 답변을 작성하거나 댓글로 답합니다.
6. 스스로 0~3점으로 평가하고 Issue를 닫습니다.
7. 매주 월요일 오전 7시 5분(KST)에 `Weekly Review` Issue가 자동 생성됩니다.

## 하루 학습 루프 — 45~70분

- **5분**: 질문을 보고 말로 먼저 답하기
- **15분**: 답변을 Markdown으로 정리
- **10분**: 꼬리질문 답변
- **10~20분**: 작은 코드/그림/패킷 흐름으로 검증
- **5분**: 자기 평가와 다음 복습 포인트 기록

### 자기평가

| 점수 | 기준 |
|---|---|
| 0 | 용어가 낯설거나 설명하지 못함 |
| 1 | 정의는 말할 수 있음 |
| 2 | 동작 원리와 장단점을 설명할 수 있음 |
| 3 | 구현/디버깅 경험과 트레이드오프까지 설명할 수 있음 |

**면접 준비 기준:** 핵심 질문의 70% 이상을 `2`, 자주 나오는 핵심 질문을 `3`으로 만드는 것을 목표로 합니다.

## 답변 방식

모든 질문은 3단계로 답합니다.

1. **20초 답변** — 정의 + 핵심 차이
2. **90초 답변** — 내부 동작 + 장단점 + 예시
3. **Deep Dive** — 구현, 장애 상황, 성능, 트레이드오프

예:

> Q. IOCP는 무엇인가요?
>
> **20초:** Windows에서 다수의 비동기 I/O 완료 이벤트를 소수의 워커 스레드가 효율적으로 처리하도록 하는 completion-based I/O 모델입니다.
>
> **90초:** WSARecv 같은 비동기 I/O를 등록하면 호출 스레드가 작업 완료를 기다리지 않습니다. I/O가 완료되면 완료 패킷이 Completion Port에 들어가고 워커가 `GetQueuedCompletionStatus` 등으로 꺼내 후속 처리를 합니다. 연결마다 스레드를 둘 필요가 없어 대규모 연결 처리에 유리합니다.
>
> **Deep Dive:** Overlapped 수명, partial send/recv, 패킷 프레이밍, 세션 종료와 pending I/O 정리, 워커 수 정책까지 설명합니다.

## 커리큘럼

| 주차 | 핵심 영역 |
|---|---|
| 1주 | C++ / 메모리 / STL / 객체 수명 |
| 2주 | OS / 스레드 / 동기화 / CPU·캐시 |
| 3주 | TCP·UDP / 패킷 / IOCP·epoll |
| 4주 | 게임 서버 구조 / Tick / Session / Room |
| 5주 | DB / Transaction / Index / Redis |
| 6주 | C# / .NET / async-await / ASP.NET Core |
| 7주 | 시스템 설계 / 확장성 / 장애 대응 |
| 8주 | 프로젝트 딥다이브 / 모의면접 / 약점 보완 |

자세한 내용은 [ROADMAP.md](ROADMAP.md)를 참고하세요.

## 저장소 구조

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── daily-study.yml
│   │   └── mock-interview.yml
│   ├── scripts/
│   │   ├── create-daily-study.js
│   │   └── create-weekly-review.js
│   └── workflows/
│       ├── daily-study.yml
│       └── weekly-review.yml
├── data/
│   └── questions.json
├── docs/
│   ├── answer-framework.md
│   ├── interview-rubric.md
│   ├── mock-interview-guide.md
│   └── project-deep-dive.md
├── notes/
│   └── README.md
├── ROADMAP.md
├── PROMPTS.md
└── README.md
```

## 면접에서 특히 중요한 순서

게임 서버 직무 기준으로 아래 순서를 우선합니다.

**Tier A**
- 네트워크
- OS / 동시성
- C++ 메모리·객체 수명
- 게임 서버 구조
- 자료구조 선택
- DB / Redis

**Tier B**
- C# / .NET
- HTTP / ASP.NET Core
- 시스템 설계
- 장애 대응 / 로그 / 모니터링

**Tier C**
- 언어 문법 암기
- 희귀 알고리즘
- 특정 프레임워크 API 암기

## 권장 규칙

- 정답을 보기 전에 **무조건 입으로 먼저 말한다.**
- 답변은 **결론부터** 말한다.
- "장점이 있습니다"에서 끝내지 않고 **왜 그런지** 말한다.
- 경험 질문에는 **실제 프로젝트 사례**를 연결한다.
- 모르는 질문은 아는 척하지 않고 **어디까지 아는지 경계**를 말한다.
- 같은 질문을 외우기보다 **꼬리질문을 버티는 구조적 이해**를 만든다.

## GitHub Actions 권한

자동 Issue 생성을 위해 저장소에서 다음을 확인하세요.

`Settings → Actions → General → Workflow permissions → Read and write permissions`

공개 저장소/조직 정책에 따라 설정 위치나 허용 범위가 다를 수 있습니다.
