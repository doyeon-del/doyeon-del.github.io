/* 포트폴리오 안내 봇 — 키워드 검색 기반(서버·LLM 없음).
   사이트에 실제로 있는 내용만 답하고, 모르면 모른다고 말한다. */
(function () {
  "use strict";

  var KB = [
    {
      keys: ["수상", "상", "성과", "이력", "결과", "실적", "award"],
      answer:
        "수상·성과는 세 건이 있어요.\n· 2026 물류데이터·AI 공모전 최우수상 — 대전행 화물의 철도 전환 조건 분석\n· MOVE-AI Challenge 해커톤 결선 진출(예선 상위 6팀) — 길벗\n· SSAFY 우수 프로젝트 선정 — 토끼와 거북목",
      links: [["rail-shift.html", "대전 분석"], ["gilbeot.html", "길벗"], ["turtle-neck.html", "토끼와 거북목"]]
    },
    {
      keys: ["프로젝트", "뭐", "무엇", "어떤", "목록", "포트폴리오", "소개"],
      answer:
        "메인 프로젝트는 4개예요.\n① 대전행 화물의 철도 전환 조건 분석 (공모전 최우수상)\n② 길벗 — 화물기사 암묵지 LLM 파이프라인 (해커톤 결선)\n③ 토끼와 거북목 — 웹캠 자세 감지 데스크톱 앱 (SSAFY 우수 프로젝트)\n④ BaroFarm — 신선식품 마켓 (사이트 운영 중)\n그 외 프로젝트 섹션에 뉴스 다이제스트 메일러, Olist 분석, Pow.Bio 인턴 결과물 등이 더 있어요.",
      links: [["index.html#cases", "프로젝트 섹션"]]
    },
    {
      keys: ["대전", "철도", "물류", "화물", "공모전", "최우수"],
      answer:
        "「대전행 화물의 철도 전환 조건 분석」 — 공개데이터 11종으로 철도 전환의 병목을 특정하고, AI에게 결론을 반박시켜 오류 3건을 정정한 공모전 최우수상 수상작이에요. 본선 발표자료 27장도 페이지에서 볼 수 있어요.",
      links: [["rail-shift.html", "케이스 보기"]]
    },
    {
      keys: ["길벗", "gilbeot", "해커톤", "화물기사", "stt", "인젝션", "비환각"],
      answer:
        "「길벗」 — 화물기사의 암묵지를 음성 인터뷰로 모아 LLM으로 구조화하는 서비스예요. 확인 가능한 것만 추출하는 비환각 원칙, STT 인젝션 방어, 골든 테스트 12케이스가 핵심이고 해커톤 결선 진출작입니다.",
      links: [["gilbeot.html", "케이스 보기"]]
    },
    {
      keys: ["토끼", "거북목", "자세", "감지", "electron", "mediapipe", "스트레칭"],
      answer:
        "「토끼와 거북목」 — 웹캠 기반 실시간 자세 감지·스트레칭 데스크톱 앱이에요. 온디바이스 AI(영상 미전송), 개인화 캘리브레이션, 알림 계층 설계가 특징이고 SSAFY 우수 프로젝트로 선정됐어요. 팀장·FE를 맡았습니다.",
      links: [["turtle-neck.html", "케이스 보기"]]
    },
    {
      keys: ["바로팜", "barofarm", "신선식품", "마켓", "폐기", "커머스", "관통"],
      answer:
        "「BaroFarm」 — 신선식품 직거래 마켓으로, 폐기위험 예측·동적 할인이 차별점이에요. 팀장·백엔드/인프라를 맡아 개발부터 CI, 사이트 운영까지 완주했고 지금도 barofarm.duckdns.org 에서 돌아갑니다.",
      links: [["barofarm.html", "케이스 보기"]]
    },
    {
      keys: ["뉴스", "다이제스트", "메일러", "kafka", "카프카", "멀티에이전트", "에이전트"],
      answer:
        "「경제 뉴스 다이제스트 메일러」 — Kafka 3단 토픽과 역할 분리 에이전트 4종(요약·분류·큐레이션·편집)으로 만든 개인 프로젝트예요. 실 Gmail 발송까지 검증했습니다.",
      links: [["news-mailer.html", "케이스 보기"]]
    },
    {
      keys: ["데이터", "분석", "분석가", "sql", "bigquery", "통계", "olist", "코호트"],
      answer:
        "데이터 분석 결과물로는 대전 철도 전환 분석(최우수상), Olist 이커머스 코호트 분석(BigQuery+Streamlit), 카드 결제 이상거래 분석, 학위논문(LLM 응답 편향 정량화) 등이 있어요. 통계학 복수전공 기반입니다.",
      links: [["rail-shift.html", "대전 분석"], ["index.html#works", "그 외 프로젝트"]]
    },
    {
      keys: ["ai", "llm", "인공지능", "생성형", "챗봇", "rag"],
      answer:
        "AI 관련 작업은 길벗(LLM 판단 5단계·비환각), 뉴스 메일러(멀티에이전트), 토끼와 거북목(온디바이스 감지·LLM 리포트 역할 분리), 대전 분석(AI를 반증에 활용), 분리수거 VQA(LoRA 파인튜닝)가 있어요.",
      links: [["gilbeot.html", "길벗"], ["news-mailer.html", "뉴스 메일러"]]
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
        "백엔드·인프라 경험은 BaroFarm이 중심이에요 — Spring Boot/MyBatis 백엔드 단독 구현, GitHub Actions CI, Docker, Caddy HTTPS, Oracle Cloud VM 운영. 토끼와 거북목도 Jenkins·Docker·EC2 파이프라인으로 배포했습니다(팀).",
      links: [["barofarm.html", "BaroFarm"]]
    },
    {
      keys: ["경력", "인턴", "회사", "학력", "전공", "학교", "누구", "이도연", "약력"],
      answer:
        "이도연 — 성균관대 문헌정보학 주전공·통계학 복수전공(2021–2026), SSAFY 15기 진행 중이에요. Pow.Bio(미국) Data Team 인턴과 데이터마케팅코리아 데이터컨설팅팀 인턴을 거쳤습니다.",
      links: [["index.html#about", "프로필"], ["index.html#timeline", "그동안 해온 일들"]]
    },
    {
      keys: ["자격", "자격증", "어학", "토익", "toeic", "오픽", "opic", "sqld", "adsp",
             "정보처리", "빅데이터분석기사", "기사", "영어"],
      answer:
        "자격증은 빅데이터분석기사 · 정보처리기사 · SQLD · ADsP 를 가지고 있어요. 어학은 OPIc IH, TOEIC 960 입니다. 프로필 섹션에 정리돼 있어요.",
      links: [["index.html#about", "프로필"]]
    },
    {
      keys: ["협업", "팀워크", "팀", "역할", "리더", "팀장", "소통", "갈등", "설득"],
      answer:
        "협업은 프로젝트마다 맡은 역할로 확인하실 수 있어요.\n· 대전 철도 전환 분석 — 팀장·발표자\n· 길벗 — 5인 팀에서 AI 파트 전담\n· 토끼와 거북목 — 팀장·FE 전담, 사용자 피드백 27건 반영\n· BaroFarm — 2인 팀, 백엔드·인프라와 사이트 운영\n융합기초프로젝트에서는 혹평받은 초기 아이템을 시장 데이터로 팀을 설득해 피벗시킨 사례가 있어요.",
      links: [["index.html#cases", "프로젝트 섹션"], ["turtle-neck.html", "토끼와 거북목"]]
    },
    {
      keys: ["금융", "은행", "보험", "증권", "카드", "결제", "이상거래", "핀테크", "etf", "리스크"],
      answer:
        "금융 도메인 작업은 두 가지예요.\n· 카드 결제 이상거래 분석 — 2,400만 건 거래를 모니터링에서 드릴다운, 예측까지 잇는 개인 프로젝트 (아직 상세 페이지 없이 '그 외 프로젝트'에 한 줄로만 있어요)\n· 데이터마케팅코리아 인턴 — 고객사 ETF 플랫폼의 버즈 데이터를 매일 수집·점검하고 키워드 추출 정확도를 개선했습니다\n통계학 복수전공과 SQLD·빅데이터분석기사가 기반입니다.",
      links: [["index.html#works", "그 외 프로젝트"]]
    },
    {
      keys: ["강점", "장점", "잘하는", "차별", "어필", "왜 뽑", "특징"],
      answer:
        "사이트에서 확인되는 것만 말씀드리면 세 가지예요.\n· 끝까지 붙듦 — BaroFarm은 개발부터 CI·배포·운영까지 완주해 지금도 돌아가고, 데마코 인턴 작업은 회사 데이터를 못 쓰니 합성 데이터로 재현 데모까지 만들었어요.\n· 결론을 의심함 — 대전 분석에서는 AI에 제 결론을 반박시켜 오류 3건을 직접 정정했고, 논문에서는 큰 표본에서 p-value의 한계를 인지해 효과크기를 함께 보고했습니다.\n· 분석을 남이 쓰게 만듦 — 보고서 대신 Streamlit·R Shiny 대시보드로, 사전과 DB 명세서로 남겼어요.",
      links: [["rail-shift.html", "대전 분석"], ["barofarm.html", "BaroFarm"]]
    },
    {
      keys: ["연락", "이메일", "메일", "깃허브", "github", "contact"],
      answer: "연락은 dlehduslee@naver.com 으로, 코드는 github.com/doyeon-del 에서 볼 수 있어요.",
      links: [["https://github.com/doyeon-del", "GitHub"]]
    }
  ];

  var SUGGESTIONS = ["어떤 프로젝트가 있어요?", "수상 이력은?", "기술 스택과 자격증은?", "금융 관련 경험은?"];

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
        "그 키워드로는 찾지 못했어요. 아래 주제로 물어보시면 안내할 수 있어요 — 프로젝트 · 수상 · 기술 스택 · 자격증 · 협업 · 금융 · 강점 · 경력/연락처",
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
