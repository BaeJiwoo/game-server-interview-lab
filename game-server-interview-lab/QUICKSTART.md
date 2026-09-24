# Quick Start

## 새 GitHub 저장소로 올리기

```bash
git init
git add .
git commit -m "chore: initialize game server interview lab"
git branch -M main
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
```

## GitHub에서 확인할 것

1. `Actions` 탭에서 workflow 실행 허용
2. `Settings → Actions → General`
3. Workflow permissions를 `Read and write permissions`로 설정
4. `Daily Interview Study` workflow를 `Run workflow`로 한 번 실행
5. Issues 탭에 `[Daily Interview] YYYY-MM-DD`가 생성되는지 확인

## 시간 변경

`.github/workflows/daily-study.yml`의 cron을 수정합니다.

현재 설정:

```yaml
- cron: "0 22 * * *"
```

이는 **매일 22:00 UTC = 다음 날 07:00 KST**입니다.

## 추천 학습 방식

GitHub Issue 답변을 먼저 작성한 뒤 `PROMPTS.md`의 AI 면접관 프롬프트로 같은 주제를 다시 말해보세요.

**GitHub = 기록/반복 시스템**  
**AI = 꼬리질문/압박 면접관**

두 역할을 분리하면 학습 기록이 흐트러지지 않습니다.
