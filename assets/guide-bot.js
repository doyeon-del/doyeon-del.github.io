/* 포트폴리오 안내 봇 — 키워드 검색 기반(서버·LLM 없음).
   사이트에 실제로 있는 내용만 답하고, 모르면 모른다고 말한다. */
(function () {
  "use strict";

  var KB = [
    {
      keys: ["수상", "상", "성과", "이력", "결과", "실적", "award"],
      answer:
        "수상·성과는 다섯 건이 있어요.\n· SSAFY 해양 X AI 아이디어 해커톤 1위: Port Cast\n· MOVE AI CHALLENGE 2026 물류산업진흥재단 이사장상: 길벗\n· 2026 물류데이터·AI 공모전 최우수상: 대전행 화물의 철도 전환 조건 분석\n· SSAFY 우수 프로젝트 선정: 토끼와 거북목, 라떼는 馬이야",
      links: [["portcast.html", "Port Cast"], ["gilbeot.html", "길벗"], ["rail-shift.html", "대전 분석"], ["turtle-neck.html", "토끼와 거북목"], ["latte.html", "라떼는 馬이야"]]
    },
    {
      keys: ["프로젝트", "뭐", "무엇", "어떤", "목록", "포트폴리오", "소개"],
      answer:
        "주요 프로젝트는 6개예요.\n① 길벗: 화물기사 노하우 AI 인터뷰 (물류산업진흥재단 이사장상)\n② 대전행 화물의 철도 전환 조건 분석 (공모전 최우수상)\n③ 토끼와 거북목: 웹캠 기반 실시간 자세 교정 앱 (SSAFY 우수 프로젝트)\n④ 발효 시뮬레이션 플랫폼 기능 개선 (Pow.Bio 인턴)\n⑤ ETF 데이터 플랫폼 품질 점검 및 운영 개선 (데이터마케팅코리아 인턴)\n⑥ 라떼는 馬이야: AI 경마 예측 연습 플랫폼 (SSAFY 우수 프로젝트, ML 모델)\n추가 프로젝트 섹션에 Port Cast, Olist 분석, BaroFarm, 뉴스 다이제스트 메일러 등이 더 있어요.",
      links: [["index.html#cases", "프로젝트 섹션"]]
    },
    {
      keys: ["etf", "데이터마케팅코리아", "데마코", "불용어", "품질", "명세", "점검", "적재", "크롤러", "버즈"],
      answer:
        "「ETF 데이터 플랫폼 품질 점검 및 운영 개선」: 데이터마케팅코리아 데이터컨설팅팀 인턴(2024.03~06)으로, 자산운용사 ETF 마케팅 데이터 플랫폼의 적재 데이터를 SQL로 점검(빈 값·중복·날짜별·채널별 건수)하고 대시보드 빈 값의 원인을 수집 단계까지 추적했어요. 테이블 30여 개 명세서, 1만 행 불용어 사전, 운영 절차 문서를 남겼습니다. 합성 데이터로 만든 재현 데모도 있어요.",
      links: [["etf-quality.html", "케이스 보기"]]
    },
    {
      keys: ["대전", "철도", "물류", "화물", "공모전", "최우수"],
      answer:
        "「대전행 화물의 철도 전환 조건 분석」: 공개데이터 11종의 생성 방식과 비교 가능 범위를 검토하고, 운송 경로별 비용을 비교해 철도 전환 조건(하역 작업비 임계값)을 도출했어요. 마지막에는 AI에게 결론을 반박시켜 오류 3건을 정정했습니다. 2026 물류데이터·AI 공모전 최우수상이고, 본선 발표자료 27장도 페이지에서 볼 수 있어요.",
      links: [["rail-shift.html", "케이스 보기"]]
    },
    {
      keys: ["토끼", "거북목", "자세", "감지", "electron", "mediapipe", "스트레칭", "지표", "정합성"],
      answer:
        "「토끼와 거북목」: 웹캠 기반 자세 감지·스트레칭 데스크톱 앱이에요. 5인 팀장·FE를 맡아 와이어프레임 약 30개로 기능 기준을 합의하고, Electron 앱을 팀과 함께 개발·배포해 삼성 임직원 대상 사용자 테스트까지 진행했어요. 화면과 서버의 집계 기준 차이로 연속 기록이 달라지던 문제는 지표 정의를 합의해 맞췄고, SSAFY 우수 프로젝트로 선정됐어요.",
      links: [["turtle-neck.html", "케이스 보기"]]
    },
    {
      keys: ["port", "portcast", "포트캐스트", "크레인", "항만", "해양", "하역", "sts", "작업자"],
      answer:
        "「Port Cast」: STS 크레인 작업자의 조작과 작업 환경을 읽어 보조 강도를 바꾸는 AI 아이디어로, SSAFY 해양 X AI 아이디어 해커톤 1위를 받았어요. 시뮬레이션 검증을 맡아 2D 크레인 시뮬레이터와 AI 모델 3개(상태 추정·위험 예측·숙련자 모방)를 만들고 540회 비교 실험을 설계했습니다. 결과는 가상 작업자 시뮬레이션 기준이에요.",
      links: [["portcast.html", "케이스 보기"]]
    },
    {
      keys: ["라떼", "경마", "馬", "lightgbm", "랭킹", "봇", "배당", "정산", "블록체인", "영상", "remotion", "claude"],
      answer:
        "「라떼는 馬이야」: 공공데이터로 학습한 경마 예측 모델을 사용자가 6축 비율로 조정하고, 예측·베팅을 블록체인에 봉인하는 교육용 플랫폼이에요(SSAFY 우수 프로젝트). AI 파트에서 6축 LightGBM 랭킹 파이프라인과 확률 보정, AI 봇 서버를 만들고, 부풀려진 적중률(40.4%→26.6%)과 연승 정산 오류를 찾아 고쳤습니다. 팀 서비스 소개 영상(91.6초)도 Claude Code와 Remotion으로 만들었어요.",
      links: [["latte.html", "케이스 보기"]]
    },
    {
      keys: ["pow", "파우", "실험", "시뮬레이션", "발효", "차트", "연구진"],
      answer:
        "「발효 시뮬레이션 플랫폼 기능 개선」: Pow.Bio(미국) Data Team 인턴(2025.03~06)으로, 연구진이 실험 결과를 비교하려면 화면을 여러 번 오가야 하던 불편을 인터뷰로 확인하고, 여러 실험을 한 차트에 겹쳐 비교하는 기능을 기획·개발했어요. DB→API→화면 데이터 흐름과 사용 방법도 문서화했습니다. React · Chart.js · MUI 기반.",
      links: [["cassie.html", "케이스 보기"]]
    },
    {
      keys: ["길벗", "gilbeot", "해커톤", "화물기사", "stt", "인젝션", "비환각"],
      answer:
        "「길벗」: 화물기사의 암묵지를 음성 인터뷰로 모아 LLM으로 구조화하는 서비스예요. 확인 가능한 것만 추출하는 비환각 원칙, STT 인젝션 방어, 골든 테스트 12케이스가 핵심이고, MOVE AI CHALLENGE 2026에서 물류산업진흥재단 이사장상을 받았습니다.",
      links: [["gilbeot.html", "케이스 보기"]]
    },
    {
      keys: ["바로팜", "barofarm", "신선식품", "마켓", "폐기", "커머스", "관통"],
      answer:
        "「BaroFarm」: 신선식품 직거래 마켓으로, 폐기위험 예측·동적 할인이 차별점이에요. 팀장·백엔드/인프라를 맡아 개발부터 CI, 사이트 운영까지 완주했고 지금도 barofarm.duckdns.org 에서 돌아갑니다.",
      links: [["barofarm.html", "케이스 보기"]]
    },
    {
      keys: ["뉴스", "다이제스트", "메일러", "kafka", "카프카", "멀티에이전트", "에이전트"],
      answer:
        "「경제 뉴스 다이제스트 메일러」: Kafka 3단 토픽과 역할 분리 에이전트 4종(요약·분류·큐레이션·편집)으로 만든 개인 프로젝트예요. 실 Gmail 발송까지 검증했습니다.",
      links: [["news-mailer.html", "케이스 보기"]]
    },
    {
      keys: ["데이터", "분석", "분석가", "sql", "bigquery", "통계", "olist", "코호트"],
      answer:
        "데이터 관리·활용 결과물로는 ETF 플랫폼 품질 점검(SQL·명세·불용어 사전), 대전 철도 전환 분석(공개데이터 11종·경로별 비용 비교), 토끼와 거북목 지표 정의 조율, Olist 코호트 분석(BigQuery+Streamlit), 학위논문(LLM 응답 편향 정량화) 등이 있어요. 통계학 복수전공 기반입니다.",
      links: [["etf-quality.html", "ETF 품질 점검"], ["rail-shift.html", "대전 분석"], ["index.html#works", "추가 프로젝트"]]
    },
    {
      keys: ["ai", "llm", "인공지능", "생성형", "챗봇", "rag"],
      answer:
        "AI 관련 작업은 라떼는 馬이야(6축 LightGBM 랭킹·확률 보정·AI 봇), Port Cast(크레인 보조 AI 3종·시뮬레이션 검증), 길벗(LLM 판단 5단계·비환각), 뉴스 메일러(멀티에이전트), 토끼와 거북목(온디바이스 감지·LLM 리포트 역할 분리), 대전 분석(AI를 반증에 활용), 분리수거 VQA(LoRA 파인튜닝)가 있어요.",
      links: [["latte.html", "라떼는 馬이야"], ["portcast.html", "Port Cast"], ["gilbeot.html", "길벗"], ["news-mailer.html", "뉴스 메일러"]]
    },
    {
      keys: ["기술", "스택", "스킬", "언어", "툴", "react", "spring", "java", "python",
             "파이썬", "자바", "리액트", "스프링", "도커", "쿼리", "다룰", "쓸", "할 줄"],
      answer:
        "주력은 Python · SQL · BigQuery · R · React이고, 프로젝트에서 Java/Spring Boot, TypeScript, Node.js, Next.js, Electron, Kafka, Docker, Streamlit, Tableau를 실제로 썼어요. 프로필 섹션에 정리돼 있습니다.",
      links: [["index.html#about", "프로필"]]
    },
    {
      keys: ["백엔드", "인프라", "배포", "서버", "docker", "ci", "운영"],
      answer:
        "백엔드·인프라 경험은 BaroFarm이 중심이에요. Spring Boot/MyBatis 백엔드 단독 구현, GitHub Actions CI, Docker, Caddy HTTPS, Oracle Cloud VM 운영. 토끼와 거북목도 Jenkins·Docker·EC2 파이프라인으로 배포했습니다(팀).",
      links: [["barofarm.html", "BaroFarm"]]
    },
    {
      keys: ["경력", "인턴", "회사", "네이버", "네이버클라우드", "학력", "전공", "학교", "누구", "이도연", "약력"],
      answer:
        "이도연은 성균관대 문헌정보학·통계학(2021–2026)을 졸업하고 SSAFY 15기 1학기를 수료했어요. 2026.10부터 네이버클라우드에서 MLOps 플랫폼 서비스 기획 인턴으로 일하고 있고, 그 전에 데이터마케팅코리아 데이터컨설팅팀 인턴(ETF 플랫폼 품질 점검)과 Pow.Bio(미국) Data Team 인턴(발효 시뮬레이션 플랫폼 기능 개선)을 거쳤습니다.",
      links: [["etf-quality.html", "ETF 품질 점검"], ["cassie.html", "발효 시뮬레이션 플랫폼 기능 개선"], ["index.html#about", "프로필"]]
    },
    {
      keys: ["자격", "자격증", "어학", "토익", "toeic", "오픽", "opic", "sqld", "adsp",
             "정보처리", "빅데이터분석기사", "기사", "영어"],
      answer:
        "자격증은 빅데이터분석기사 · 정보처리기사 · AICE Associate · SQLD · ADsP 를 가지고 있어요. 어학은 OPIc IH, TOEIC 960 입니다. 프로필 섹션에 정리돼 있어요.",
      links: [["index.html#about", "프로필"]]
    },
    {
      keys: ["협업", "팀워크", "팀", "역할", "리더", "팀장", "소통", "갈등", "설득", "조율"],
      answer:
        "협업은 프로젝트마다 맡은 역할로 확인하실 수 있어요.\n· ETF 품질 점검: 개발운영팀과 크롤러 수정 방향 논의, 데이터 사이언티스트가 쓸 사전·명세 정리\n· 대전 철도 전환 분석: 팀장·발표자\n· 토끼와 거북목: 5인 팀장·FE, 와이어프레임으로 기능 기준을 합의하고 개발·배포·사용자 테스트를 이끔\n· 발효 시뮬레이션 플랫폼: 연구진 인터뷰로 요구를 파악하고, 개발자와 함께 연동 오류를 수정\n· 길벗: 5인 팀에서 AI 파트 전담 / BaroFarm: 2인 팀, 백엔드·인프라와 사이트 운영",
      links: [["index.html#cases", "프로젝트 섹션"], ["turtle-neck.html", "토끼와 거북목"]]
    },
    {
      keys: ["금융", "은행", "보험", "증권", "카드", "결제", "이상거래", "핀테크", "리스크", "자산운용"],
      answer:
        "금융 도메인 작업은 두 가지예요.\n· ETF 데이터 플랫폼 품질 점검: 자산운용사의 ETF 마케팅 데이터 플랫폼에서 적재 데이터를 SQL로 점검하고 대시보드 오류 원인을 추적했습니다 (데이터마케팅코리아 인턴)\n· 카드 결제 이상거래 분석: 2,400만 건 거래를 모니터링에서 드릴다운, 예측까지 잇는 개인 프로젝트 (아직 상세 페이지 없이 '추가 프로젝트'에 한 줄로만 있어요)\n통계학 복수전공과 SQLD·빅데이터분석기사가 기반입니다.",
      links: [["etf-quality.html", "ETF 품질 점검"], ["index.html#works", "추가 프로젝트"]]
    },
    {
      keys: ["강점", "장점", "잘하는", "차별", "어필", "왜 뽑", "특징", "일하는 방식"],
      answer:
        "메인의 '핵심 역량' 세 가지로 정리돼 있어요.\n· 사용자와 문제 이해: Pow.Bio에서 연구진 인터뷰로 실험 비교의 불편을 찾았고, 토끼와 거북목에서는 사용자 테스트 피드백을 반영했어요.\n· 데이터 기반 원인 분석: ETF 플랫폼에서 대시보드 빈 값의 원인을 수집 단계까지 추적했고, 대전 분석에서는 경로별 운송비를 비교해 하역비가 전환을 가르는 조건임을 찾았어요.\n· 구현과 검증: 실험 비교 차트 기능을 직접 개발했고, 토끼와 거북목은 팀과 함께 개발·배포까지, 길벗은 골든 테스트로 AI 판정을 검증했어요.",
      links: [["index.html#who", "핵심 역량"], ["cassie.html", "발효 시뮬레이션 플랫폼"], ["turtle-neck.html", "토끼와 거북목"]]
    },
    {
      keys: ["연락", "이메일", "메일", "깃허브", "github", "contact"],
      answer: "연락은 dlehduslee@naver.com 으로, 코드는 github.com/doyeon-del 에서 볼 수 있어요.",
      links: [["https://github.com/doyeon-del", "GitHub"]]
    }
  ];

  var SUGGESTIONS = ["어떤 프로젝트가 있어요?", "데이터 품질 점검 경험은?", "수상 이력은?", "기술 스택과 자격증은?"];

  function norm(s) {
    return s.toLowerCase().replace(/[^0-9a-z가-힣]/g, " ").replace(/\s+/g, " ").trim();
  }

  function answer(query) {
    var q = norm(query);
    if (!q) return null;
    var best = null, bestScore = 0;
    KB.forEach(function (entry) {
      var score = 0;
      entry.keys.forEach(function (k) {
        if (q.indexOf(k) !== -1) score += k.length >= 2 ? 2 : 1;
      });
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    return bestScore > 0 ? best : null;
  }

  /* ── UI ── */
  var root = document.createElement("div");
  root.className = "gbot";
  root.innerHTML =
    '<button class="gbot-fab" aria-label="포트폴리오 안내 봇 열기">' +
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
    "</button>" +
    '<div class="gbot-panel" hidden>' +
    '<div class="gbot-head"><b>포트폴리오 안내</b><button class="gbot-close" aria-label="닫기">×</button></div>' +
    '<div class="gbot-log"></div>' +
    '<div class="gbot-chips"></div>' +
    '<form class="gbot-form"><input type="text" placeholder="궁금한 것을 물어보세요" aria-label="질문 입력"><button type="submit">묻기</button></form>' +
    "</div>";
  document.body.appendChild(root);

  var fab = root.querySelector(".gbot-fab");
  var panel = root.querySelector(".gbot-panel");
  var log = root.querySelector(".gbot-log");
  var chips = root.querySelector(".gbot-chips");
  var form = root.querySelector(".gbot-form");
  var input = form.querySelector("input");

  function addMsg(text, who, links) {
    var div = document.createElement("div");
    div.className = "gbot-msg " + who;
    text.split("\n").forEach(function (line, i) {
      if (i) div.appendChild(document.createElement("br"));
      div.appendChild(document.createTextNode(line));
    });
    if (links && links.length) {
      var row = document.createElement("div");
      row.className = "gbot-links";
      links.forEach(function (l) {
        var a = document.createElement("a");
        a.href = l[0];
        a.textContent = l[1] + " →";
        if (l[0].indexOf("http") === 0) { a.target = "_blank"; a.rel = "noopener"; }
        row.appendChild(a);
      });
      div.appendChild(row);
    }
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  function ask(q) {
    addMsg(q, "user");
    var hit = answer(q);
    if (hit) {
      addMsg(hit.answer, "bot", hit.links);
    } else {
      addMsg(
        "그 키워드로는 찾지 못했어요. 아래 주제로 물어보시면 안내할 수 있어요: 프로젝트 · 수상 · 기술 스택 · 자격증 · 협업 · 금융 · 강점 · 경력/연락처",
        "bot",
        [["index.html#cases", "프로젝트 섹션"], ["index.html#about", "프로필"]]
      );
    }
  }

  SUGGESTIONS.forEach(function (s) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = s;
    b.addEventListener("click", function () { ask(s); });
    chips.appendChild(b);
  });

  var opened = false;
  fab.addEventListener("click", function () {
    panel.hidden = !panel.hidden;
    if (!panel.hidden && !opened) {
      opened = true;
      addMsg("안녕하세요, 이 포트폴리오의 안내 봇이에요. 사이트에 있는 내용을 키워드로 찾아 알려드립니다.", "bot");
    }
    if (!panel.hidden) input.focus();
  });
  root.querySelector(".gbot-close").addEventListener("click", function () { panel.hidden = true; });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    input.value = "";
    ask(q);
  });
})();
