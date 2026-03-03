function initData() {
  if (!localStorage.getItem("finance")) {
    localStorage.setItem("finance", JSON.stringify({
      income: 0,
      expense: 0
    }));
  }

  if (!localStorage.getItem("queueNow")) {
    localStorage.setItem("queueNow", 0);
  }
}

function loadDashboard() {
  const finance = JSON.parse(localStorage.getItem("finance"));
  const queueNow = localStorage.getItem("queueNow");

  document.getElementById("income").innerText = finance.income + " บาท";
  document.getElementById("expense").innerText = finance.expense + " บาท";
  document.getElementById("profit").innerText = (finance.income - finance.expense) + " บาท";
  document.getElementById("queueNow").innerText = queueNow + " / " + CONFIG.queueLimit;
}

initData();

if (document.getElementById("income")) {
  loadDashboard();
}
