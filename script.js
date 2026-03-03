// ---------- คิว ----------
function getQueue() {
  return Number(localStorage.getItem("queue")) || 0;
}

function setQueue(value) {
  localStorage.setItem("queue", value);
}

function bookQueue() {
  let queue = getQueue();
  if (queue >= 10) {
    alert("คิวเต็มแล้ว");
    return;
  }
  queue++;
  setQueue(queue);
  updateQueue();
}

function updateQueue() {
  const el = document.getElementById("queueStatus");
  if (el) {
    el.innerText = getQueue() + " / 10";
  }
}

// ---------- การเงิน ----------
function getData() {
  return JSON.parse(localStorage.getItem("finance")) || [];
}

function saveData(data) {
  localStorage.setItem("finance", JSON.stringify(data));
}

function addTransaction() {
  const type = document.getElementById("type").value;
  const amount = Number(document.getElementById("amount").value);

  if (!amount) return alert("กรอกจำนวนเงิน");

  const data = getData();
  data.push({ type, amount });
  saveData(data);

  document.getElementById("amount").value = "";
  updateFinance();
}

function updateFinance() {
  const data = getData();
  let income = 0;
  let expense = 0;

  data.forEach(item => {
    if (item.type === "income") income += item.amount;
    if (item.type === "expense") expense += item.amount;
  });

  if (document.getElementById("income")) {
    document.getElementById("income").innerText = income;
    document.getElementById("expense").innerText = expense;
    document.getElementById("profit").innerText = income - expense;
  }
}

window.onload = function() {
  updateQueue();
  updateFinance();
};
