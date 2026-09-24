# 8주 게임 서버 기술 면접 로드맵

현재 목표는 **게임 서버 프로그래머 면접에서 기본 CS를 설명하고, 실제 서버 구현 경험까지 연결해서 말할 수 있는 상태**입니다.

## Week 1 — C++ / 메모리 / 자료구조

목표: "문법을 안다"가 아니라 **객체가 언제 만들어지고 언제 파괴되는지 설명**할 수 있어야 합니다.

- Stack / Heap
- RAII
- Pointer / Reference
- smart pointer
- shallow copy / deep copy
- copy / move semantics
- virtual / vtable
- STL vector 내부 동작
- unordered_map / hash collision
- queue / priority_queue
- object lifetime
- memory leak / dangling pointer

**완료 조건**
- `vector` 재할당 과정 설명
- `shared_ptr` 남용 위험 설명
- Move가 복사보다 유리한 상황 설명
- 해시 테이블 충돌 해결 방식 설명
- 서버에서 자료구조를 고를 때 시간복잡도 외 요소까지 설명

---

## Week 2 — OS / Concurrency

목표: **다중 클라이언트를 처리할 때 OS와 CPU 수준에서 어떤 문제가 생기는지 설명**합니다.

- Process / Thread
- Context Switch
- User / Kernel mode
- Virtual Memory
- Page / Cache
- Mutex / Semaphore / Spin Lock
- Deadlock
- Race Condition
- Atomic / CAS
- Memory Ordering 기초
- Thread Pool
- False Sharing
- Producer / Consumer

**완료 조건**
- Mutex와 Spin Lock 선택 기준 설명
- Race condition 재현 예시 설명
- Thread Pool이 필요한 이유 설명
- Lock contention 해결 방향 제시
- Deadlock 4조건 및 회피법 설명

---

## Week 3 — Network / IOCP / epoll

목표: **TCP 패킷이 클라이언트에서 서버 게임 로직까지 도달하는 전체 흐름**을 설명합니다.

- TCP / UDP
- 3-way handshake / 4-way close
- TIME_WAIT
- Nagle / TCP_NODELAY
- partial send / partial recv
- framing
- endian
- serialization
- blocking / non-blocking
- select / poll / epoll
- IOCP
- level-trigger / edge-trigger
- socket buffer
- backpressure
- heartbeat

**완료 조건**
- TCP가 메시지 경계를 보존하지 않는 이유 설명
- 길이 헤더 기반 패킷 조립 코드 설명
- IOCP와 epoll 차이를 completion/readiness 관점으로 설명
- 느린 클라이언트가 서버에 미치는 영향 설명
- 연결 종료 시 pending I/O 정리 전략 설명

---

## Week 4 — Game Server Architecture

목표: 단일 기능이 아니라 **서버 전체 구조를 그림으로 설명**합니다.

- Session
- Packet Dispatcher
- Job Queue
- Room
- Game Loop / Tick
- Zone / Channel / Shard
- Matchmaking
- Stateful vs Stateless
- Gateway
- Auth Server
- Game Server
- Chat Server
- reconnect
- authoritative server
- interest management
- synchronization
- anti-cheat boundary

**완료 조건**
- 로그인 → 로비 → 매칭 → 게임 서버 입장 흐름 설명
- Tick 기반 서버의 장단점 설명
- Room 단위 직렬화 방식 설명
- 게임 서버와 API 서버를 분리하는 이유 설명
- 재접속 시 어떤 상태를 복원해야 하는지 설명

---

## Week 5 — DB / Redis

목표: **정합성, 성능, 장애를 함께 고려**합니다.

- Index
- B-Tree
- Transaction
- ACID
- Isolation Level
- Lock
- Deadlock
- Optimistic / Pessimistic Lock
- connection pool
- Redis String / Hash / Set / Sorted Set
- TTL
- cache-aside
- cache invalidation
- Redis persistence
- ranking
- distributed lock 기본

**완료 조건**
- 인덱스가 쓰기 성능을 낮출 수 있는 이유 설명
- 동시 아이템 구매의 정합성 해결
- Redis 랭킹 구조 설명
- 캐시와 DB 값이 어긋났을 때 정책 설명
- 트랜잭션 격리 수준의 trade-off 설명

---

## Week 6 — C# / .NET / ASP.NET Core

목표: 현재 사용하는 서버 스택을 **런타임 관점에서 설명**합니다.

- Value / Reference type
- GC
- boxing / unboxing
- delegate / lambda / event
- async / await
- Task
- ThreadPool
- SynchronizationContext 개념
- DI lifetime
- ASP.NET Core middleware
- authentication / authorization
- stateless API
- JWT
- EF Core tracking
- DB context lifetime

**완료 조건**
- `async`가 새 스레드를 만든다는 오해 반박
- `await` 전후 실행 흐름 설명
- Singleton/Scoped/Transient 선택 기준 설명
- JWT 인증 흐름 설명
- ASP.NET Core 요청 처리 흐름 설명

---

## Week 7 — System Design / Operations

목표: "작동하는 서버"에서 **운영 가능한 서버**로 시야를 확장합니다.

- Scale up / Scale out
- load balancing
- sticky session
- sharding
- idempotency
- retry
- timeout
- circuit breaker
- logging
- metrics
- tracing
- graceful shutdown
- deployment
- schema migration
- failure recovery

연습 설계:
- 로그인 서버
- 친구 시스템
- 채팅 서버
- 매치메이킹
- 인벤토리
- 랭킹
- 우편함
- 게임 결과 반영

**완료 조건**
- 중복 요청 처리 방법 설명
- 게임 종료 결과 저장 실패 시 전략 설명
- 서버 한 대 장애 시 영향 범위 설명
- 상태 저장 서버 scale-out 전략 설명

---

## Week 8 — 프로젝트 딥다이브 + 모의면접

목표: CS 지식을 **내 프로젝트의 선택과 실패 경험**으로 연결합니다.

반드시 준비할 프로젝트 주제:

1. TCP 게임 서버
   - 패킷 구조
   - 수신 버퍼
   - IO 모델
   - 세션 수명
   - 멀티스레딩 전략

2. ASP.NET Core API 서버
   - 인증
   - DB
   - 응답 구조
   - Unity 연동
   - Stateless 설계

3. Stateful + Stateless 결합 구조
   - 역할 분리
   - 서버 간 데이터 전달
   - 게임 결과 반영
   - 장애 시나리오

4. Redis 활용
   - 캐시
   - 세션
   - 랭킹
   - 임시 상태 저장 중 적절한 사용처 선택

**마지막 주 루틴**
- 월/화: 핵심 질문 20개
- 수: 프로젝트 질문만 30분
- 목: 시스템 설계 1문제
- 금: 60분 모의면접
- 토: 틀린 질문만 재시험
- 일: 1분 자기소개 + 지원동기 + 프로젝트 설명
