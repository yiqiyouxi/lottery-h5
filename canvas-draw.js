// canvas-draw.js

function drawTicket(data) {
  const canvas = document.getElementById("ticketCanvas");
  const ctx = canvas.getContext("2d");

  const baseHeight = 300;
  const matchHeight = 90;
  const height = baseHeight + data.matches.length * matchHeight;
  canvas.width = 600;
  canvas.height = height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const isShort = data.matches.length <= 2;
  const randomShort = Math.floor(Math.random() * 8) + 1;
  const randomLong = Math.floor(Math.random() * 5) + 1;
  const bgSrc = isShort
    ? `images/bg/bg-short/足短叠${randomShort}.png`
    : `images/bg/bg-long/L_00${randomLong}.png`;

  const bg = new Image();
  bg.src = bgSrc;

  bg.onload = () => {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    let y = 100;
    ctx.fillStyle = "#000";
    ctx.font = "18px Courier New";
    ctx.fillText(`过关方式 ${data.guoguan}    1倍    合计 ${data.jine}元`, 20, y);
    y += 30;

    ctx.font = "16px Courier New";
    data.matches.forEach((match, i) => {
      ctx.fillText(`第${i + 1}场 ${match.weekday}${match.code} ${match.let}`, 20, y);
      y += 22;
      ctx.fillText(`主队：${match.home} vs 客队：${match.away}`, 20, y);
      y += 22;
      ctx.fillText(`${match.bet}@${match.odds}`, 20, y);
      y += 28;
    });

    ctx.font = "14px Courier New";
    ctx.fillText("（选项固定奖金金额为每1元投注对应的奖金金额）", 20, y);
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

    const barcode = new Image();
    barcode.src = "images/barcode/条码图1.png";
    barcode.onload = () => {
      ctx.drawImage(barcode, 20, y + 5, 560, 50);
    };
  };
}

// 下载图片功能
function downloadTicketImage() {
  const canvas = document.getElementById("ticketCanvas");
  const link = document.createElement("a");
  link.download = `彩票票据_${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
