// canvas-draw.js

function drawTicket(data) {
  const canvas = document.getElementById("ticketCanvas");
  const ctx = canvas.getContext("2d");

  // 动态高度，根据场次数决定
  const matchHeight = 90;
  const extraHeight = 300;
  const totalHeight = extraHeight + data.matches.length * matchHeight;

  // 加载背景图（不拉伸）
  const isShort = data.matches.length <= 2;
  const randomShort = Math.floor(Math.random() * 8) + 1;
  const randomLong = Math.floor(Math.random() * 5) + 1;
  const bgSrc = isShort
    ? `images/bg/bg-short/足短叠${randomShort}.png`
    : `images/bg/bg-long/L_00${randomLong}.png`;

  const bg = new Image();
  bg.src = bgSrc;

  bg.onload = () => {
    canvas.width = bg.width;
    canvas.height = bg.height;
    ctx.drawImage(bg, 0, 0); // 原尺寸绘制背景

    let y = 220; // 避开压条文字
    ctx.fillStyle = "#000";
    ctx.font = "18px Courier New";
    ctx.fillText(`过关方式 ${data.guoguan}    1倍    合计 ${data.jine}元`, 40, y);
    y += 36;

    ctx.font = "16px Courier New";
    data.matches.forEach((match, i) => {
      ctx.fillText(`第${i + 1}场 ${match.weekday}${match.code} ${match.let}`, 40, y);
      y += 24;
      ctx.fillText(`主队：${match.home} vs 客队：${match.away}`, 40, y);
      y += 24;
      ctx.fillText(`${match.bet}@${match.odds}`, 40, y);
      y += 32;
    });

    ctx.font = "14px Courier New";
    ctx.fillText("（选项固定奖金金额为每1元投注对应的奖金金额）", 40, y);
    y += 22;
    ctx.fillText(`本票最高可能固定奖金：${data.max_bonus}`, 40, y);
    y += 22;
    ctx.fillText(`单倍注数：${data.zhushu_info}`, 40, y);
    y += 30;

    for (let i = 0; i < 10; i++) {
      ctx.fillText("********************", 40, y);
      y += 16;
    }

    ctx.fillText(`感谢您为公益事业贡献 ${data.gongyi}元`, 180, y);
    y += 20;
    ctx.fillText(`${data.city}`, 280, y);
    y += 20;
    ctx.fillText(`${data.print_time}`, 420, y);

    const barcode = new Image();
    barcode.src = "images/barcode/条码图1.png";
    barcode.onload = () => {
      ctx.drawImage(barcode, 40, y + 5, 520, 60);
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
