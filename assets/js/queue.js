function loadQueue() {
  let queueNow = parseInt(localStorage.getItem("queueNow"));
  const limit = CONFIG.queueLimit;

  if (!queueNow) {
    queueNow = 0;
    localStorage.setItem("queueNow", 0);
  }

  updateDisplay(queueNow, limit);

  const btn = document.getElementById("bookBtn");

  btn.addEventListener("click", function () {
    if (queueNow < limit) {
      queueNow++;
      localStorage.setItem("queueNow", queueNow);
      updateDisplay(queueNow, limit);
    }

    if (queueNow >= limit) {
      btn.disabled = true;
      btn.innerText = "คิวเต็มแล้ว";
    }
  });

  if (queueNow >= limit) {
    btn.disabled = true;
    btn.innerText = "คิวเต็มแล้ว";
  }
}

function updateDisplay(now, limit) {
  document.getElementById("queueNow").innerText = now + " / " + limit;

  const percent = (now / limit) * 100;
  document.getElementById("progressFill").style.width = percent + "%";
}

if (document.getElementById("bookBtn")) {
  loadQueue();
}
