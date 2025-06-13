// script.js

const matches = [
  {
    index: 1,
    weekday: '周六',
    code: '001',
    home: '恒大',
    away: '国米',
    let: '主队',
    bets: [
      { label: '胜', odds: 1.70 },
      { label: '平', odds: 3.10 },
      { label: '负', odds: 4.20 }
    ]
  },
  {
    index: 2,
    weekday: '周六',
    code: '002',
    home: '拜仁',
    away: '皇马',
    let: '主队',
    bets: [
      { label: '胜', odds: 1.80 },
      { label: '平', odds: 3.25 },
      { label: '负', odds: 3.95 }
    ]
  },
  {
    index: 3,
    weekday: '周六',
    code: '003',
    home: '利物浦',
    away: 'AC米兰',
    let: '主队',
    bets: [
      { label: '胜', odds: 2.10 },
      { label: '平', odds: 3.15 },
      { label: '负', odds: 3.45 }
    ]
  },
  {
    index: 4,
    weekday: '周六',
    code: '004',
    home: '曼联',
    away: '巴黎圣日耳曼',
    let: '主队',
    bets: [
      { label: '胜', odds: 2.30 },
      { label: '平', odds: 3.00 },
      { label: '负', odds: 3.10 }
    ]
  },
  {
    index: 5,
    weekday: '周六',
    code: '005',
    home: '尤文图斯',
    away: '阿森纳',
    let: '主队',
    bets: [
      { label: '胜', odds: 2.50 },
      { label: '平', odds: 2.90 },
      { label: '负', odds: 3.30 }
    ]
  }
];

const selectedBets = [];

function renderMatches() {
  const list = document.getElementById("matchList");
  list.innerHTML = "";
  matches.forEach((match) => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <div><strong>${match.weekday}${match.code}</strong> ${match.home} vs ${match.away}</div>
      <div class="bets">
        ${match.bets.map(b => `<button onclick='selectBet(${match.index}, "${match.weekday}", "${match.code}", "${match.home}", "${match.away}", "${match.let}", "${b.label}", ${b.odds})'>${b.label}@${b.odds}</button>`).join(" ")}
      </div>
    `;
    list.appendChild(card);
  });
}

function selectBet(index, weekday, code, home, away, letType, bet, odds) {
  selectedBets.push({ index, weekday, code, home, away, let: letType, bet, odds });
  updateSelected();
}

function updateSelected() {
  const ul = document.getElementById("selectedBets");
  ul.innerHTML = "";
  selectedBets.forEach((m, i) => {
    const li = document.createElement("li");
    li.textContent = `${m.weekday}${m.code} ${m.home} vs ${m.away} ${m.bet}@${m.odds}`;
    const del = document.createElement("span");
    del.textContent = "删除";
    del.className = "remove-btn";
    del.onclick = () => { selectedBets.splice(i, 1); updateSelected(); };
    li.appendChild(del);
    ul.appendChild(li);
  });
}

function generate() {
  const ticketData = {
    guoguan: document.getElementById("guoguan").value,
    jine: document.getElementById("jine").value,
    max_bonus: document.getElementById("bonus").value,
    zhushu_info: document.getElementById("zhushu").value,
    gongyi: "0.42",
    city: "北京",
    print_time: new Date().toLocaleString("zh-CN", { hour12: false }),
    matches: selectedBets
  };
  drawTicket(ticketData);
}

renderMatches();
