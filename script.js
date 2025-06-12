function generateTicket() {
  const canvas = document.getElementById("ticketCanvas");
  const ctx = canvas.getContext("2d");

  const matchInfo = document.getElementById("matchInfo").value;
  const guoguan = document.getElementById("guoguan").value;
  const beishu = document.getElementById("beishu").value;
  const jine = document.getElementById("jine").value;
  const time = document.getElementById("time").value;

  // 背景
  ctx.fillStyle = "#fff0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000";
  ctx.font = "18px Courier New";
  let y = 50;

  ctx.fillText("中国体育彩票", 20, y);
  y += 40;
  ctx.fillText(`过关方式 ${guoguan}    ${beishu}倍    合计 ${jine}元`, 20, y);
  y += 40;

  const lines = matchInfo.split("\n");
  lines.forEach(line => {
    ctx.fillText(line, 20, y);
    y += 30;
  });

  y += 20;
  ctx.fillText(`感谢您为公益事业贡献 0.42元`, 20, y);
  y += 30;
  ctx.fillText(`${time}`, 20, y);
}
