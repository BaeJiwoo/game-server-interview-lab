const fs = require('fs');

module.exports = async ({ github, context, core }) => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const bank = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

  // Prevent duplicate issue on repeated manual runs on the same KST date.
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const date = kst.toISOString().slice(0, 10);
  const marker = `[Daily Interview] ${date}`;

  const allIssues = await github.paginate(
    github.rest.issues.listForRepo,
    { owner, repo, state: 'all', per_page: 100 }
  );

  const realIssues = allIssues.filter(i => !i.pull_request);

  if (realIssues.some(i => i.title === marker)) {
    core.info(`Issue already exists: ${marker}`);
    return;
  }

  // Count practice history by domain. Least-practiced domain gets priority.
  const domains = [...new Set(bank.map(q => q.domain))];
  const counts = Object.fromEntries(domains.map(d => [d, 0]));

  for (const issue of realIssues) {
    const m = (issue.body || '').match(/<!-- domain:(.*?) -->/);
    if (m && counts[m[1]] !== undefined) counts[m[1]]++;
  }

  const minCount = Math.min(...Object.values(counts));
  const least = domains.filter(d => counts[d] === minCount);

  // Rotate ties by day so the same domain is not always picked.
  const epochDay = Math.floor(kst.getTime() / 86400000);
  const domain = least[epochDay % least.length];

  const candidates = bank.filter(q => q.domain === domain);

  // Avoid questions already used when possible.
  const usedIds = new Set();
  for (const issue of realIssues) {
    const m = (issue.body || '').match(/<!-- question-id:(.*?) -->/);
    if (m) usedIds.add(m[1]);
  }

  let pool = candidates.filter(q => !usedIds.has(q.id));
  if (pool.length === 0) pool = candidates;

  // Difficulty cycles: 1 -> 2 -> 2 -> 3
  const levelCycle = [1, 2, 2, 3];
  const targetLevel = levelCycle[epochDay % levelCycle.length];
  const sameLevel = pool.filter(q => q.level === targetLevel);
  if (sameLevel.length > 0) pool = sameLevel;

  const q = pool[epochDay % pool.length];

  // Create labels if missing.
  const labelsToEnsure = [
    { name: 'interview-study', color: '1D76DB', description: 'Technical interview study' },
    { name: 'daily', color: '0E8A16', description: 'Daily study issue' }
  ];

  for (const label of labelsToEnsure) {
    try {
      await github.rest.issues.createLabel({ owner, repo, ...label });
    } catch (e) {
      if (e.status !== 422) throw e;
    }
  }

  const followups = q.followups.map((x, i) => `${i + 1}. ${x}`).join('\n');
  const keywords = q.keywords.map(x => `\`${x}\``).join(' ');

  const body = `<!-- question-id:${q.id} -->
<!-- domain:${q.domain} -->

# ${q.question}

**Domain:** ${q.domain}  
**Difficulty:** ${q.level}/3  
**Target:** ${q.target_minutes}분  
**Keywords:** ${keywords}

## 1. 먼저 말로 답하기

문서를 보지 말고 60~90초 동안 소리 내어 답하세요.

## 2. 20초 답변

> 여기에 결론부터 작성

## 3. 90초 답변

### 정의

### 내부 동작

### 장점 / 단점

### 게임 서버에서의 사용 예

## 4. 꼬리질문

${followups}

## 5. 구현 또는 검증

- [ ] 작은 코드로 검증했다.
- [ ] 패킷/메모리/스레드 흐름을 그림으로 설명할 수 있다.
- [ ] 내 프로젝트 경험과 연결했다.

## 6. 자기평가

- [ ] 0 — 모름
- [ ] 1 — 정의
- [ ] 2 — 원리 + trade-off
- [ ] 3 — 구현 + 장애/성능까지 설명

## 7. 오늘의 한 줄 회고

> 가장 헷갈린 부분 / 다시 볼 부분

---

완료했다면 Issue를 닫으세요.
`;

  await github.rest.issues.create({
    owner,
    repo,
    title: marker,
    body,
    labels: ['interview-study', 'daily']
  });

  core.info(`Created ${q.id} / ${q.domain}`);
};
