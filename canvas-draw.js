// canvas-draw.js
function drawTicket(data) {
  const canvas = document.getElementById("ticketCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 1000;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 判断短图还是长图
  const isShort = data.matches.length <= 2;

  // 随机挑选背景图（按目录文件名规则）
  const shortCount = 8; // 你上传了 8 张短图
  const longCount = 5;  // 你上传了 5 张长图
  const randomShort = Math.floor(Math.random() * shortCount) + 1;
  const randomLong = Math.floor(Math.random() * longCount) + 1;

  const bgSrc = isShort
    ? `images/bg/bg-short/足短叠${randomShort}.png`
    : `images/bg/bg-long/L_00${randomLong}.png`;

  const bg = new Image();
  bg.src = bgSrc;

  bg.onload = () => {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    let y = 100;
    ctx.fillStyle = "#000";
    ctx.font = "18px monospace";
    ctx.fillText(`过关方式 ${data.guoguan}    ${data.beishu}倍    合计 ${data.jine}元`, 20, y);
    y += 30;

    ctx.font = "16px monospace";
    data.matches.forEach((match) => {
      ctx.fillText(`第${match.index}场 ${match.weekday}${match.code} ${match.let}`, 20, y);
      y += 22;
      ctx.fillText(`主队：${match.home} Vs 客队：${match.away}`, 20, y);
      y += 22;
      ctx.fillText(`${match.bet}@${match.odds}`, 20, y);
      y += 28;
    });

    ctx.font = "14px monospace";
    ctx.fillText("（选项固定奖金量为每1元投注对应的奖金量）", 20, y);
    y += 22;
    ctx.fillText(`本票最高可能固定奖金：${data.max_bonus}`, 20, y);
    y += 22;
    ctx.fillText(`单倍注数：${data.zhushu_info}`, 20, y);
    y += 28;

    for (let i = 0; i < 10; i++) {
      ctx.fillText("********************", 20, y);
      y += 16;
    }

    ctx.fillText(`感谢您为公益事业贡献 ${data.gongyi}元`, 140, y);
    y += 20;
    ctx.fillText(`${data.city}`, 240, y);
    y += 20;
    ctx.fillText(`${data.print_time}`, 400, y);

    // 条码图
    const barcode = new Image();
    barcode.src = "images/barcode/条码图1.png";
    barcode.onload = () => {
      ctx.drawImage(barcode, 20, y + 5, 560, 50);
    };
  };
}
