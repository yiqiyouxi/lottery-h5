function generate() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // 清除
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 背景填色
  ctx.fillStyle = "#fff8f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 顶部压条
  ctx.fillStyle = "#d60000";
  ctx.fillRect(0, 0, canvas.width, 80);
  ctx.fillStyle = "yellow";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("恭喜发财 祝君中奖", 140, 30);
  ctx.font = "16px sans-serif";
  ctx.fillText("出票请核对 中奖以票为准", 170, 55);

  // 获取数据
  const matchText = document.getElementById("matchText").value;
  const guoguan = document.getElementById("guoguan").value;
  const jine = document.getElementById("jine").value;
  const bonus = document.getElementById("bonus").value;
  const zhushu = document.getElementById("zhushu").value;

  let y = 100;
  ctx.fillStyle = "#000";
  ctx.font = "18px Courier New";
  ctx.fillText("体彩 爱票", 240, y);
  y += 30;

  ctx.font = "16px Courier New";
  ctx.fillText(`过关方式 ${guoguan}     合计 ${jine}元`, 20, y);
  y += 30;

  matchText.split("\n").forEach(line => {
    if (line.trim() !== "") {
      ctx.fillText(line.trim(), 20, y);
      y += 24;
    }
  });

  y += 10;
  ctx.fillText("(投注过关/倍数/金额)", 20, y);
  y += 24;
  ctx.fillText(`最高可能固定奖金：${bonus}元`, 20, y);
  y += 24;
  ctx.fillText(`单倍注数：${zhushu}`, 20, y);
  y += 24;
  ctx.fillText("********************", 20, y);
  y += 30;

  const now = new Date();
  const timeStr = now.toLocaleDateString("zh-CN") + " " + now.toLocaleTimeString("zh-CN");
  ctx.fillText(timeStr, 20, y);
}

function download() {
  const canvas = document.getElementById("canvas");
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "彩票票据.png";
  a.click();
}
