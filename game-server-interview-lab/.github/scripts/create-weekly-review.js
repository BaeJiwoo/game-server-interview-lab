module.exports = async ({ github, context, core }) => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const date = kst.toISOString().slice(0, 10);
  const title = `[Weekly Review] ${date}`;

  const issues = await github.paginate(
    github.rest.issues.listForRepo,
    { owner, repo, state: 'all', per_page: 100 }
  );

  const realIssues = issues.filter(i => !i.pull_request);

  if (realIssues.some(i => i.title === title)) {
    core.info(`Weekly review already exists: ${title}`);
    return;
  }

  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);

  const recentDaily = realIssues.filter(i => {
    if (!i.title.startsWith('[Daily Interview]')) return false;
    return new Date(i.created_at) >= sevenDaysAgo;
  });

  const byDomain = {};
  let closed = 0;
  let open = 0;

  for (const issue of recentDaily) {
    const m = (issue.body || '').match(/<!-- domain:(.*?) -->/);
    const domain = m ? m[1] : 'Unknown';
    byDomain[domain] = (byDomain[domain] || 0) + 1;
    if (issue.state === 'closed') closed++;
    else open++;
  }

  const domainRows = Object.entries(byDomain)
    .sort((a, b) => b[1] - a[1])
    .map(([d, c]) => `| ${d} | ${c} |`)
    .join('\n') || '| - | 0 |';

  const openList = recentDaily
    .filter(i => i.state === 'open')
    .map(i => `- #${i.number} ${i.title}`)
    .join('\n') || '- 없음';

  // Ensure label
  try {
    await github.rest.issues.createLabel({
      owner, repo,
      name: 'weekly-review',
      color: '5319E7',
      description: 'Weekly interview study review'
    });
  } catch (e) {
    if (e.status !== 422) throw e;
  }

  const body = `# 이번 주 면접 준비 회고

## 자동 집계

- 생성된 Daily Issue: **${recentDaily.length}**
- 완료: **${closed}**
- 미완료: **${open}**

| Domain | Count |
|---|---:|
${domainRows}

## 아직 안 닫은 문제

${openList}

## 이번 주 가장 약했던 3개

1.
2.
3.

## 다시 답해볼 질문

- [ ]
- [ ]
- [ ]

## 프로젝트와 연결해서 새로 설명할 수 있게 된 것

-

## 다음 주 우선순위

1.
2.
3.

## 10분 미니 모의면접

- [ ] 약한 질문 3개를 랜덤으로 뽑았다.
- [ ] 검색 없이 답했다.
- [ ] 각 답변을 0~3점으로 다시 평가했다.

> 원칙: 새로운 범위를 계속 추가하기보다 0~1점 질문을 2점 이상으로 끌어올린다.
`;

  await github.rest.issues.create({
    owner,
    repo,
    title,
    body,
    labels: ['weekly-review']
  });

  core.info(`Created weekly review for ${date}`);
};
